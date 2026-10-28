"""Separate generated full-body sprites and pack one transparent atlas per destination.
Developed by AK Labs. Does not repaint faces, clothing or supplied identities.
"""
from pathlib import Path
import json,math
from PIL import Image
import cv2,numpy as np

root=Path(__file__).resolve().parent.parent
source=root/'assets/npc-regional-v1'
out=root/'assets/web/crowd'
preview=root/'work/regional-preview'
preview.mkdir(parents=True,exist_ok=True)
regions=['rio','brasilia','buenos-aires','orlando']
atlases={}
for region in regions:
    im=Image.open(source/f'{region}-source.png').convert('RGBA')
    rgba=np.array(im);solid=(rgba[:,:,3]>64).astype('uint8')
    count,labels,stats,centers=cv2.connectedComponentsWithStats(solid)
    # A shoe can touch the next character's hair by a pixel. Separate the
    # narrowest alpha bridge before assigning whole silhouettes to cells.
    for label in range(1,count):
        x,y,w,h,area=stats[label]
        if area<im.width*im.height*.004 or h<im.height*.4:continue
        middle=y+h//2;lo=max(y,middle-28);hi=min(y+h,middle+28)
        cut=lo+int(np.argmin(np.sum(labels[lo:hi]==label,axis=1)))
        solid[cut,labels[cut]==label]=0
    count,labels,stats,centers=cv2.connectedComponentsWithStats(solid)
    bodies=[]
    for label in range(1,count):
        x,y,w,h,area=stats[label]
        if area<im.width*im.height*.004:continue
        if h<im.height*.12 or w<im.width*.035:continue
        row=min(3,int(centers[label][1]/im.height*4));col=min(3,int(centers[label][0]/im.width*4))
        if x==0 or y==0 or x+w==im.width or y+h==im.height:
            raise RuntimeError(f'{region}: clipped character at row {row}, column {col}')
        mask=cv2.dilate((labels==label).astype('uint8'),np.ones((3,3),np.uint8))
        clean=rgba.copy();clean[:,:,3]=np.where(mask,rgba[:,:,3],0)
        sprite=Image.fromarray(clean).crop((max(0,x-2),max(0,y-2),min(im.width,x+w+2),min(im.height,y+h+2)))
        # Remove detached fragments introduced at the one-pixel row split.
        cutout=np.array(sprite)
        _,parts,part_stats,_=cv2.connectedComponentsWithStats((cutout[:,:,3]>128).astype('uint8'))
        largest=1+int(np.argmax(part_stats[1:,cv2.CC_STAT_AREA]))
        keep=cv2.dilate((parts==largest).astype('uint8'),np.ones((3,3),np.uint8))
        cutout[:,:,3]=np.where(keep,cutout[:,:,3],0)
        sprite=Image.fromarray(cutout);sprite=sprite.crop(sprite.getbbox())
        bodies.append((row,col,sprite))
    bodies.sort(key=lambda b:(b[0],b[1]))
    if len(bodies)!=16 or len({(row,col) for row,col,_ in bodies})!=16:
        raise RuntimeError(f'{region}: expected sixteen separate full characters, found {[(r,c) for r,c,_ in bodies]}')
    cell_w,cell_h,cols=288,432,4
    atlas=Image.new('RGBA',(cols*cell_w,4*cell_h));frames=[]
    for i,(row,col,sprite) in enumerate(bodies):
        sprite.thumbnail((cell_w-20,cell_h-20),Image.Resampling.LANCZOS)
        x=(i%cols)*cell_w+(cell_w-sprite.width)//2;y=(i//cols)*cell_h+cell_h-10-sprite.height
        atlas.alpha_composite(sprite,(x,y))
        frames.append({'id':f'{region}-{i:02d}','group':region,'atlas':region,'striped':False,'heightScale':1,'x':x,'y':y,'w':sprite.width,'h':sprite.height,'sourceId':i})
    atlas.save(out/f'{region}-v1.webp',quality=92,method=6)
    # Stripe labels are checked against the actual sheet, never assumed from a prompt.
    metadata=source/'labels.json'
    if not metadata.exists():raise RuntimeError('Inspect artwork and supply labels.json before packing')
    labels_by_region=json.loads(metadata.read_text(encoding='utf-8-sig'))[region]
    for f in frames:
        f['striped']=f['sourceId'] in labels_by_region['striped']
        f['heightScale']=labels_by_region.get('heightScale',{}).get(str(f['sourceId']),1)
    atlases[region]={'src':f'./assets/crowd/{region}-v1.webp','width':atlas.width,'height':atlas.height,'frames':frames}
    (out/f'{region}-v1.json').write_text(json.dumps(atlases[region],indent=2),encoding='utf-8')
    bg=Image.new('RGBA',atlas.size,'#f1eadb');bg.alpha_composite(atlas)
    bg.convert('RGB').save(preview/f'{region}.jpg',quality=94)
    print(region,len(frames),'characters,',int((out/f'{region}-v1.webp').stat().st_size/1024),'KB')
(root/'frontend/regional-npc-data.mjs').write_text('// Generated regional sprite metadata. Developed by AK Labs.\nexport const REGIONAL_ATLASES='+json.dumps(atlases,separators=(',',':'))+';\n',encoding='utf-8')
