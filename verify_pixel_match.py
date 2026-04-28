#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageStat


ROOT = Path(__file__).resolve().parent
CHROME = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
REFERENCE = ROOT / "figma-exact-1x.png"
SCREENSHOT = ROOT / "site-exact-check.png"
DIFF = ROOT / "site-vs-figma-diff.png"
URL = f"file://{ROOT / 'index.html'}"
WINDOW_WIDTH = 2140
WINDOW_HEIGHT = 1188


def main() -> int:
    if not CHROME.exists():
        print(f"Chrome not found: {CHROME}", file=sys.stderr)
        return 1

    command = [
        str(CHROME),
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--no-first-run",
        "--no-default-browser-check",
        f"--window-size={WINDOW_WIDTH},{WINDOW_HEIGHT}",
        f"--screenshot={SCREENSHOT}",
        URL,
    ]
    subprocess.run(command, check=True)

    reference = Image.open(REFERENCE).convert("RGB")
    captured = Image.open(SCREENSHOT).convert("RGB")
    left = (captured.width - reference.width) // 2
    top = (captured.height - reference.height) // 2
    screenshot = captured.crop(
        (left, top, left + reference.width, top + reference.height)
    )
    diff = ImageChops.difference(reference, screenshot)
    diff.save(DIFF)

    changed = sum(1 for pixel in diff.getdata() if pixel != (0, 0, 0))
    total = reference.width * reference.height
    stat = ImageStat.Stat(diff)

    print(f"sizes: reference={reference.size} screenshot={screenshot.size}")
    print(f"diff bbox: {diff.getbbox()}")
    print(f"changed pixels: {changed}/{total} ({changed / total * 100:.8f}%)")
    print(f"mean diff: {[round(value, 8) for value in stat.mean]}")
    return 0 if changed == 0 else 2


if __name__ == "__main__":
    raise SystemExit(main())
