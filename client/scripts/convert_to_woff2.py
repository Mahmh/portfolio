"""
Convert all TTF fonts in a directory to WOFF2 format for better performance.
Usage: `python convert_to_woff2.py [path_to_fonts_dir]`
"""
from fontTools.ttLib import TTFont
from pathlib import Path
import sys

def convert_ttf_to_woff2(ttf_path: Path):
    """
    Convert a single .ttf font file to .woff2.
    """
    font = TTFont(str(ttf_path))
    font.flavor = 'woff2'  # Brotli-compressed output
    out_path = ttf_path.with_suffix('.woff2')
    font.save(str(out_path))
    print(f"Converted {ttf_path.name} -> {out_path.name}")


def convert_directory_to_woff2(fonts_dir: Path):
    """
    Convert all .ttf files in the given directory (non-recursive) to .woff2.
    """
    if not fonts_dir.is_dir():
        print(f"Error: {fonts_dir} is not a valid directory.")
        return

    ttf_files = list(fonts_dir.glob('*.ttf'))
    if not ttf_files:
        print(f"No .ttf files found in {fonts_dir}.")
        return

    for ttf_file in ttf_files:
        convert_ttf_to_woff2(ttf_file)


if __name__ == "__main__":
    fonts_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('fonts')
    convert_directory_to_woff2(fonts_dir)
