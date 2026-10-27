"""Extract the supplied character faithfully; no generated replacement face.
Developed by AK Labs. Requires Pillow and OpenCV only for asset preparation.
"""
from pathlib import Path
import cv2
import numpy as np
from PIL import Image

root = Path(__file__).resolve().parent.parent
out = root / 'assets' / 'web'
out.mkdir(exist_ok=True)
source = Image.open(root / 'assets/pack-v3/personagens_caricaturas_v1.png').convert('RGB')
# Bottom right sprite in the supplied 1024 x 1536 cast sheet.
crop = np.array(source.crop((674, 1006, 1017, 1534)))
bgr = cv2.cvtColor(crop, cv2.COLOR_RGB2BGR)
mask = np.full(bgr.shape[:2], cv2.GC_PR_BGD, np.uint8)
# Shape-guided seeds keep the dark beanie, pompom, shoes and black outlines.
# These coordinates follow the supplied silhouette; they do not redraw it.
outline = np.array([(160,12),(182,25),(180,40),(225,40),(260,65),(274,89),
    (281,120),(271,140),(276,156),(263,181),(229,205),(216,210),
    (233,264),(265,277),(282,253),(310,253),(321,271),(313,295),
    (291,305),(260,304),(235,307),(216,291),(207,325),(233,405),
    (235,454),(282,460),(310,472),(294,490),(258,510),(221,511),
    (200,481),(196,443),(169,401),(129,421),(99,451),(109,471),
    (117,482),(80,497),(49,474),(30,452),(36,436),(63,419),
    (72,399),(103,355),(119,330),(91,325),(69,297),(60,322),
    (55,339),(32,348),(14,336),(10,317),(20,299),(29,282),
    (47,231),(69,196),(96,178),(130,166),(139,148),(132,134),
    (132,119),(144,109),(140,91),(141,65),(145,40),(138,29),(140,17)],np.int32)
shape = np.zeros(bgr.shape[:2],np.uint8)
cv2.fillPoly(shape,[outline],255)
mask[shape>0]=cv2.GC_PR_FGD
mask[cv2.erode(shape,np.ones((11,11),np.uint8))>0]=cv2.GC_FGD
mask[:2,:]=mask[-2:,:]=mask[:,:2]=mask[:,-2:]=cv2.GC_BGD
cv2.grabCut(bgr, mask, None, np.zeros((1,65)), np.zeros((1,65)), 8, cv2.GC_INIT_WITH_MASK)
alpha = np.where((mask == 1) | (mask == 3), 255, 0).astype('uint8')
# Keep the largest silhouette and remove isolated background islands.
n, labels, stats, _ = cv2.connectedComponentsWithStats(alpha)
if n > 1:
    alpha = np.where(labels == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]), 255, 0).astype('uint8')
sprite = Image.fromarray(np.dstack((crop, alpha)))
box = sprite.getbbox()
sprite.crop(box).save(out / 'flavio.png')
for name, dest in [('RIO_BAILE_NA_LAJE', 'rio'), ('BRASILIA_CASA_DO_PAI', 'brasilia'), ('BUENOS_AIRES_CASA_ROSADA', 'buenos-aires'), ('ORLANDO_PARQUE', 'orlando')]:
    im = Image.open(root / f'assets/pack-v3/referencias/{name}.png')
    # Reference thumbnails only; gameplay uses original independent scenes.
    im.crop((0, 160, im.width, im.height)).save(out / f'{dest}.webp', quality=85)
print('Prepared supplied cast sprite and four reference thumbnails.')
