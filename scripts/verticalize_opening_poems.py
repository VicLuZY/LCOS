#!/usr/bin/env python3
"""Rewrite opening-poem blocks: traditional Chinese + vertical columns (RTL column order)."""

from __future__ import annotations

import html
import re
import sys
from pathlib import Path

try:
    from opencc import OpenCC
except ImportError:
    print("Install: pip install opencc-python-reimplemented", file=sys.stderr)
    raise

ROOT = Path(__file__).resolve().parents[1]
CHAPTERS = ROOT / "chapters"
CC = OpenCC("s2tw")

PAT = re.compile(
    r'<div class="opening-poem">\s*<p class="opening-poem-lines">(.*?)</p>\s*</div>',
    re.DOTALL,
)


def transform_block(inner: str) -> str | None:
    parts = re.split(r"<br\s*/?>\s*", inner, flags=re.I)
    lines: list[str] = []
    for part in parts:
        t = html.unescape(part).strip()
        if t:
            lines.append(t)
    if not lines:
        return None
    trad_lines = [CC.convert(ln) for ln in lines]
    sr = " ".join(trad_lines)
    cols = [
        "    <p class=\"opening-poem-col\">" + html.escape(ln, quote=False) + "</p>"
        for ln in trad_lines
    ]
    return (
        '<div class="opening-poem opening-poem-vertical" lang="zh-Hant">\n'
        "  <p class=\"opening-poem-sr-only\">" + html.escape(sr, quote=False) + "</p>\n"
        '  <div class="opening-poem-columns" aria-hidden="true">\n'
        + "\n".join(cols)
        + "\n"
        "  </div>\n"
        "</div>"
    )


def main() -> None:
    for path in sorted(CHAPTERS.glob("*.md")):
        if path.name == "index.md":
            continue
        text = path.read_text(encoding="utf-8")
        if "opening-poem-lines" not in text:
            continue
        m = PAT.search(text)
        if not m:
            print("skip (no match):", path.name)
            continue
        new_block = transform_block(m.group(1))
        if not new_block:
            print("skip (empty poem):", path.name)
            continue
        path.write_text(PAT.sub(new_block, text, count=1), encoding="utf-8")
        print("ok:", path.name)


if __name__ == "__main__":
    main()
