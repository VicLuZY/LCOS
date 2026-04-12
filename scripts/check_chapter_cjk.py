#!/usr/bin/env python3
"""Fail if any chapters/*.md (except index.md) has fewer than 10000 CJK unified ideographs."""

from __future__ import annotations

import pathlib
import re
import sys


def main() -> None:
    root = pathlib.Path(__file__).resolve().parents[1]
    chapter_dir = root / "chapters"
    pat = re.compile(r"[\u4e00-\u9fff]")
    failures: list[tuple[str, int]] = []

    for path in sorted(chapter_dir.glob("*.md")):
        if path.name == "index.md":
            continue
        text = path.read_text(encoding="utf-8")
        count = len(pat.findall(text))
        if count < 10000:
            failures.append((path.name, count))

    if failures:
        print("Chapter CJK count failures (< 10000, U+4E00–U+9FFF):", file=sys.stderr)
        for name, count in failures:
            print(f"  {name}: {count}", file=sys.stderr)
        raise SystemExit(1)

    print("OK: all chapter markdown files have >= 10000 CJK characters.")


if __name__ == "__main__":
    main()
