"""Pack generated transparent people into a runtime atlas, without repainting.
Developed by AK Labs. Requires Pillow, NumPy and OpenCV for authoring only.
"""
from pathlib import Path
import json,math
from PIL import Image,ImageDraw
import numpy as np,cv2

root=Path(__file__).resolve().parent.parent
source=root/'assets/npc-art-v3'
out=root/'assets/web/crowd'
out.mkdir(parents=True,exist_ok=True)
sources=[('casual','npc-casual-source.png',{1,5,7,10,11}),('city','npc-city-source.png',{3,10,11,12}),('festival','npc-festival-source.png',{5,8,11,15})]
sprites=[]
for group,name,striped in sources:
    im=Image.open(source/name).convert('RGBA');a=np.array(im)
    solid=(a[:,:,3]>64).astype('uint8')
    n,labels,stats,_=cv2.connectedComponentsWithStats(solid)
    # A few shoes and adjacent hair touch by a pixel between rows. Split at
    # the narrowest alpha bridge; do not cut the musician's wide guitar.
    for label in range(1,n):
        x,y,w,h,area=stats[label]
        if area<10000 or h<550:continue
        middle=y+h//2;lo=max(y,middle-30);hi=min(y+h,middle+30)
        sums=np.sum(labels[lo:hi]==label,axis=1)
        cut=lo+int(np.argmin(sums))
        solid[cut,labels[cut]==label]=0
    n,labels,stats,centroids=cv2.connectedComponentsWithStats(solid)
    bodies=[]
    for label in range(1,n):
        x,y,w,h,area=stats[label]
        if area<10000:continue
        row=min(3,int(centroids[label][1]/im.height*4))
        col=min(3,int(centroids[label][0]/im.width*4))
        # The first generated sheet clips the shoes of its final row.
        # Omit those four rather than shipping truncated silhouettes.
        if group=='casual' and row==3:continue
        mask=cv2.dilate((labels==label).astype('uint8'),np.ones((3,3),np.uint8))
        rgba=a.copy();rgba[:,:,3]=np.where(mask,a[:,:,3],0)
        sprite=Image.fromarray(rgba).crop((max(0,x-2),max(0,y-2),min(im.width,x+w+2),min(im.height,y+h+2)))
        clean=np.array(sprite)
        count,parts,part_stats,_=cv2.connectedComponentsWithStats((clean[:,:,3]>160).astype('uint8'))
        largest=1+int(np.argmax(part_stats[1:,cv2.CC_STAT_AREA]))
        main=cv2.dilate((parts==largest).astype('uint8'),np.ones((3,3),np.uint8))
        clean[:,:,3]=np.where(main,clean[:,:,3],0)
        sprite=Image.fromarray(clean)
        sprite=sprite.crop(sprite.getbbox())
        bodies.append((row,col,sprite))
    for row,col,sprite in sorted(bodies,key=lambda b:(b[0],b[1])):
        sprites.append((group,row*4+col,sprite,row*4+col in striped,1.12 if group=='festival' and row*4+col==6 else 1))

if len(sprites)!=44:raise RuntimeError(f'Expected 44 complete people; found {len(sprites)}')
cell_w,cell_h,cols=288,432,8
atlas=Image.new('RGBA',(cols*cell_w,math.ceil(len(sprites)/cols)*cell_h))
frames=[]
for i,(group,source_id,sprite,striped,height_scale) in enumerate(sprites):
    sprite.thumbnail((cell_w-12,cell_h-12),Image.Resampling.LANCZOS)
    x=(i%cols)*cell_w+(cell_w-sprite.width)//2;y=(i//cols)*cell_h+cell_h-6-sprite.height
    atlas.alpha_composite(sprite,(x,y))
    frames.append({'id':i,'group':group,'striped':striped,'heightScale':height_scale,'x':x,'y':y,'w':sprite.width,'h':sprite.height,'sourceId':source_id})
atlas.save(out/'people-v3.webp',quality=92,method=6)
(out/'frames-v3.json').write_text(json.dumps({'width':atlas.width,'height':atlas.height,'frames':frames},indent=2),encoding='utf-8')
(root/'frontend/npc-data.mjs').write_text('// Generated sprite coordinates. Developed by AK Labs.\nexport const NPC_ATLAS="./assets/crowd/people-v3.webp";\nexport const NPC_FRAMES='+json.dumps(frames,separators=(',',':'))+';\n',encoding='utf-8')
preview=Image.new('RGBA',atlas.size,'#eee9db');preview.alpha_composite(atlas)
preview.convert('RGB').resize((1152,1296)).save(root/'work/npc-atlas-preview.jpg',quality=94)
print(f'Packed {len(frames)} people in {atlas.width} x {atlas.height}; WebP {(out/"people-v3.webp").stat().st_size//1024} KB')
