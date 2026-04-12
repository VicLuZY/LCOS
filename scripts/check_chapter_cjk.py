#!/usr/bin/env python3
"""Fail if any chapter is too short or the whole book is too small."""

from __future__ import annotations

import pathlib
import re
import sys

MIN_CJK_PER_CHAPTER = 5000
MIN_TOTAL_CJK = 100000


def main() -> None:
    root = pathlib.Path(__file__).resolve().parents[1]
    chapter_dir = root / "chapters"
    pat = re.compile(r"[\u4e00-\u9fff]")
    failures: list[tuple[str, int]] = []
    total = 0

    for path in sorted(chapter_dir.glob("*.md")):
        if path.name == "index.md":
            continue
        text = path.read_text(encoding="utf-8")
        count = len(pat.findall(text))
        total += count
        if count < MIN_CJK_PER_CHAPTER:
            failures.append((path.name, count))

    if failures:
        print(
            f"Chapter CJK count failures (< {MIN_CJK_PER_CHAPTER}, U+4E00–U+9FFF):",
            file=sys.stderr,
        )
        for name, count in failures:
            print(f"  {name}: {count}", file=sys.stderr)
        raise SystemExit(1)

    if total < MIN_TOTAL_CJK:
        print(
            f"Book CJK total failure (< {MIN_TOTAL_CJK}, U+4E00–U+9FFF): {total}",
            file=sys.stderr,
        )
        raise SystemExit(1)

    print(
        "OK: all chapter markdown files satisfy the per-chapter floor and the book meets the total CJK floor."
    )


if __name__ == "__main__":
    main()
