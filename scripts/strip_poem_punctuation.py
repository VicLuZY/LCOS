#!/usr/bin/env python3
"""Remove punctuation from opening-poem HTML blocks (classical verse without 句读)."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHAPTERS = ROOT / "chapters"

# Fullwidth / CJK punctuation and spacing to drop in poem lines
_PUNCT_RE = re.compile(
    r"[\s，。、；：？！…—·．「」『』《》〈〉【】〔〕"
    r""",.;:?!'"()\[\]{}＂＇（）［］｛｝\u3000]+"""
)


def strip_poem_text(s: str) -> str:
    return _PUNCT_RE.sub("", s).strip()


def process_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    if "opening-poem-col" not in text:
        return False

    def repl_col(m: re.Match[str]) -> str:
        inner = strip_poem_text(m.group(2))
        return f'{m.group(1)}{inner}{m.group(3)}'

    new_text = re.sub(
        r'(<p class="opening-poem-col">)([^<]*)(</p>)',
        repl_col,
        text,
    )
    cols = re.findall(r'<p class="opening-poem-col">([^<]*)</p>', new_text)
    if cols:
        sr_plain = " ".join(cols)
        new_text = re.sub(
            r'(<p class="opening-poem-sr-only">)([^<]*)(</p>)',
            lambda m: f'{m.group(1)}{sr_plain}{m.group(3)}',
            new_text,
            count=1,
        )
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main() -> None:
    n = 0
    for path in sorted(CHAPTERS.glob("*.md")):
        if path.name == "index.md":
            continue
        if process_file(path):
            print("ok:", path.name)
            n += 1
    print("updated:", n, "files")


if __name__ == "__main__":
    main()
