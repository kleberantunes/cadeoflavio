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
crop = np.array(source.crop((674, 1018, 1017, 1534)))
bgr = cv2.cvtColor(crop, cv2.COLOR_RGB2BGR)
mask = np.zeros(bgr.shape[:2], np.uint8)
cv2.grabCut(bgr, mask, (8, 4, 320, 502), np.zeros((1,65)), np.zeros((1,65)), 8, cv2.GC_INIT_WITH_RECT)
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
