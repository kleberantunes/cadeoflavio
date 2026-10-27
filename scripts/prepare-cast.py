"""Prepare supplied transparent sprites without changing faces or colors.
Developed by AK Labs. Original files remain in assets/personagens-fornecidos.
"""
from pathlib import Path
import json
import cv2
import numpy as np
from PIL import Image

root=Path(__file__).resolve().parent.parent
source=root/'assets/personagens-fornecidos'
out=root/'assets/web/cast'
out.mkdir(parents=True,exist_ok=True)
manifest=[]

def prepare(im, name, origin):
    rgba=np.array(im.convert('RGBA'))
    solid=(rgba[:,:,3]>80).astype('uint8')
    n,labels,stats,_=cv2.connectedComponentsWithStats(solid)
    if n<2: raise ValueError(f'No silhouette in {name}')
    main=1+np.argmax(stats[1:,cv2.CC_STAT_AREA])
    keep=cv2.dilate((labels==main).astype('uint8'),np.ones((3,3),np.uint8))
    rgba[:,:,3]=np.where(keep,rgba[:,:,3],0)
    # Crop transparent padding and disconnected fragments from adjacent panels.
    sprite=Image.fromarray(rgba)
    sprite=sprite.crop(sprite.getbbox())
    sprite.save(out/f'{name}.png',optimize=True)
    manifest.append({'id':name,'source':origin,'width':sprite.width,'height':sprite.height})
    return sprite

poses={
    'standing':'01_em_pe.png','chair':'03_cadeira_de_praia.png',
    'flag':'04_bandeira_americana.png','car':'05_dentro_do_carro.png',
    'celebrating':'06_comemorando.png','pointing':'07_apontando.png',
}
previews=[]
for name,file in poses.items():
    previews.append((name,prepare(Image.open(source/file),name,file)))

sheet=Image.open(source/'Nove Caricaturas Políticas em Grade.png')
boxes=[(0,0,350,515),(350,0,690,515),(690,0,1024,515),
       (0,513,366,1027),(366,513,693,1027),(693,513,1024,1027),
       (0,1024,352,1536),(352,1024,674,1536),(674,1018,1024,1536)]
for i,box in enumerate(boxes):
    name=f'cast-{i+1:02}' if i<8 else 'classic'
    previews.append((name,prepare(sheet.crop(box),name,'Nove Caricaturas Políticas em Grade.png')))
(out/'provenance.json').write_text(json.dumps({'author':'Developed by AK Labs','sprites':manifest},ensure_ascii=False,indent=2),encoding='utf-8')

# Contact sheet is local QA only and is never shipped to the game.
check=Image.new('RGB',(1000,660),'#e3e9d5')
from PIL import ImageDraw
d=ImageDraw.Draw(check)
for i,(label,im) in enumerate(previews):
    im.thumbnail((170,180))
    x=(i%5)*200+(200-im.width)//2;y=(i//5)*220+18
    check.paste(im,(x,y),im)
    d.text(((i%5)*200+12,(i//5)*220+202),label,fill='black')
(root/'work').mkdir(exist_ok=True)
check.save(root/'work/cast-check.png')
print(f'Prepared {len(manifest)} supplied sprites with alpha and source provenance.')
