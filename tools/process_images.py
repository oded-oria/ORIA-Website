"""Crop, resize and export the villa photos used on the site.

Usage (from the repository root, needs Pillow: pip install pillow):
    python tools/process_images.py

Put the original photos in images/ (the raw originals are deliberately NOT committed),
then describe each one in JOBS below:
    output-name: (source file, thumbnail crop box, thumbnail widths, full-size crop box or None)
Crop boxes are fractions of the original (left, top, right, bottom). Gallery tiles are 4:5,
wide tiles 8:5, the hero 3:4. Each job writes <name>-<width>.jpg/.webp and, for gallery
photos, <name>-full.jpg for the photo viewer. Update the width/height/alt attributes in
index.html to match whatever you change here.
"""
from PIL import Image, ImageOps
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images")
def wa(i):
    sec, _, rest = i.partition(" ")
    return os.path.join(ROOT, f"WhatsApp Image 2026-09-19 at 13.05.{sec}{(' '+rest) if rest else ''}.jpeg")
# name: (source, thumb box, thumb widths, full box or None)
JOBS = {
 "terrace-daybeds-sea-view":       (wa("19 (5)"), (0,.22,1,.97),        [480,800,1152], None),
 "entrance-door-sea-view":         (wa("20 (1)"), (0,.12,1,.823),       [600,900],      None),
 "sunken-lounge-infinity-pool":    (wa("22 (3)"), (0,.22,1,.923),       [480,800,1152], (.03,.10,1,1)),
 "sun-loungers-infinity-pool":     (wa("21 (2)"), (.12,.27,1,.889),     [480,800],      (.12,.10,1,.95)),
 "infinity-pool-edge-sea":         (wa("21 (3)"), (.04,.17,.97,.824),   [480,800],      (.04,.05,.97,.90)),
 "outdoor-dining-pergola-sea-view":(wa("18 (1)"), (0,.10,1,.803),       [480,800],      (0,0,1,1)),
 "daybeds-parasol-island-view":    (wa("22 (4)"), (0,.07,1,.773),       [480,800],      (0,0,1,.82)),
 "villa-pool-terrace-sunset":      (wa("18"),     (0,.03,1,.863),       [800,1200,1600],(0,.03,1,.863)),
 "front-door-terrace-view":        (wa("19 (3)"), (0,.18,1,.883),       [480,800],      (0,0,1,1)),
 "stone-wing-pergola-seating":     (wa("22"),     (0,.12,1,.823),       [480,800],      (0,.05,1,.85)),
 "living-room-kitchen-pool-view":  (wa("19 (2)"), (0,.20,1,.903),       [480,800],      (0,.10,1,1)),
 "living-room-tv-sea-view":        (wa("21"),     (0,.28,1,.983),       [480,800],      (0,.25,1,1)),
 "villa-aerial-visualisation":     (os.path.join(ROOT,"Image2.jpg"), (0,0,1,1), [800,1200,1600], (0,0,1,1)),
}
def crop(im, box):
    w, h = im.size
    return im.crop((round(box[0]*w), round(box[1]*h), round(box[2]*w), round(box[3]*h)))
manifest = {}
for name, (src, tbox, widths, fbox) in JOBS.items():
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    t = crop(im, tbox)
    entry = {"thumbs": [], "full": None, "ratio": round(t.width/t.height, 4)}
    for w in widths:
        w = min(w, t.width)
        r = t.resize((w, round(t.height*w/t.width)), Image.LANCZOS)
        r.save(os.path.join(ROOT, f"{name}-{w}.jpg"), "JPEG", quality=78, optimize=True, progressive=True)
        r.save(os.path.join(ROOT, f"{name}-{w}.webp"), "WEBP", quality=76, method=6)
        entry["thumbs"].append([w, r.height])
    if fbox:
        f = crop(im, fbox)
        mw = 1600 if f.width > f.height else 1152
        if f.width > mw: f = f.resize((mw, round(f.height*mw/f.width)), Image.LANCZOS)
        f.save(os.path.join(ROOT, f"{name}-full.jpg"), "JPEG", quality=82, optimize=True, progressive=True)
        entry["full"] = [f.width, f.height]
    manifest[name] = entry
for k,v in manifest.items(): print(k, v)
