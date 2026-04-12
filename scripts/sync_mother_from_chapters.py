#!/usr/bin/env python3
"""Resync 龙场OS_book_draft.md body from chapters/*.md (excluding index.md)."""

from __future__ import annotations

import pathlib


def strip_frontmatter(markdown: str) -> str:
    """Remove a leading YAML block so the mother manuscript body stays single-frontmatter."""
    text = markdown.strip()
    if not text.startswith("---"):
        return text
    end = text.find("\n---\n", 3)
    if end == -1:
        return text
    return text[end + len("\n---\n") :].lstrip()


def main() -> None:
    root = pathlib.Path(__file__).resolve().parents[1]
    mother = root / "龙场OS_book_draft.md"
    chapter_dir = root / "chapters"

    raw = mother.read_text(encoding="utf-8")
    if not raw.startswith("---"):
        raise SystemExit("Mother draft is missing YAML frontmatter.")

    end = raw.find("\n---\n", 3)
    if end == -1:
        raise SystemExit("Mother draft frontmatter is not closed.")

    frontmatter = raw[: end + len("\n---\n")]

    parts: list[str] = []
    for path in sorted(chapter_dir.glob("*.md"), key=lambda p: p.name):
        if path.name == "index.md":
            continue
        parts.append(strip_frontmatter(path.read_text(encoding="utf-8")))

    mother.write_text(frontmatter + "\n\n" + "\n\n---\n\n".join(parts) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
