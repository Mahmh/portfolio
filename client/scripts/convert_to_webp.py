"""
Recursively convert all .jpg, .jpeg, and .png images under root_dir to WebP,
then delete the originals. Skips .svg and any existing .webp files.
Usage: `python convert_to_webp.py [path_to_img_dir] [quality]`
"""
from pathlib import Path
from PIL import Image
import sys

def convert_and_cleanup(root_dir: Path, quality: int = 80):
    for img_path in root_dir.rglob('*'):
        if img_path.suffix.lower() in ('.jpg', '.jpeg', '.png'):
            webp_path = img_path.with_suffix('.webp')
            if webp_path.exists():
                print(f"⚡️ Skipping (already exists) {webp_path}")
                continue

            try:
                print(f"🔄 Converting {img_path} → {webp_path}")
                with Image.open(img_path) as img:
                    img.save(webp_path, 'WEBP', quality=quality, lossless=False)
                img_path.unlink()  # delete the original file
                print(f"✅ Deleted original {img_path}")
            except Exception as e:
                print(f"❌ Failed to convert {img_path}: {e}")

if __name__ == "__main__":
    img_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('img')
    q = int(sys.argv[2]) if len(sys.argv) > 2 else 80
    convert_and_cleanup(img_dir, quality=q)
