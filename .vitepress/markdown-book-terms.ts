import type MarkdownIt from 'markdown-it'
import type StateCore from 'markdown-it/lib/rules_core/state_core.mjs'

import { BOOK_LEXICON_LONGEST_FIRST, type BookLexiconEntry } from './book-lexicon.js'

/** 与 `reference/book-name.txt` 一致；名谱自动包裹须跳过此串，以免拆开「OS」。 */
const CANONICAL_BOOK_NAME = '龙场OS'

type MdToken = {
  type: string
  tag: string
  nesting: number
  content: string
  block: boolean
  hidden: boolean
  children: MdToken[] | null
}

type MdStateCore = {
  tokens: MdToken[]
  Token: new (type: string, tag: string, nesting: number) => MdToken
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function escapeAttr(text: string): string {
  return escapeHtml(text).replaceAll('\n', ' ').replaceAll('\r', '')
}

function buildTitle(entry: BookLexiconEntry): string {
  return `${entry.enRoot} — ${entry.def}`
}

function splitTextToTokens(content: string, Token: MdStateCore['Token']): MdToken[] {
  const out: MdToken[] = []
  let pos = 0

  while (pos < content.length) {
    if (content.startsWith(CANONICAL_BOOK_NAME, pos)) {
      const t = new Token('text', '', 0)
      t.content = CANONICAL_BOOK_NAME
      out.push(t)
      pos += CANONICAL_BOOK_NAME.length
      continue
    }

    let matched: BookLexiconEntry | undefined

    for (const entry of BOOK_LEXICON_LONGEST_FIRST) {
      if (content.startsWith(entry.zh, pos)) {
        matched = entry
        break
      }
    }

    if (matched) {
      const title = buildTitle(matched)
      const t = new Token('html_inline', '', 0)
      t.content = `<code class="book-term" title="${escapeAttr(title)}" data-en="${escapeAttr(matched.enRoot)}" data-def="${escapeAttr(matched.def)}">${escapeHtml(matched.zh)}</code>`
      out.push(t)
      pos += matched.zh.length
      continue
    }

    let next = pos + 1
    while (next < content.length) {
      let wouldMatch = false
      for (const entry of BOOK_LEXICON_LONGEST_FIRST) {
        if (content.startsWith(entry.zh, next)) {
          wouldMatch = true
          break
        }
      }
      if (wouldMatch) break
      next += 1
    }

    const slice = content.slice(pos, next)
    const textTok = new Token('text', '', 0)
    textTok.content = slice
    out.push(textTok)
    pos = next
  }

  return out
}

function transformInlineChildren(children: MdToken[], Token: MdStateCore['Token']): MdToken[] {
  let linkDepth = 0
  const next: MdToken[] = []

  for (const child of children) {
    if (child.type === 'link_open') linkDepth += 1

    if (child.type === 'text' && linkDepth === 0) {
      next.push(...splitTextToTokens(child.content, Token))
    } else {
      next.push(child)
    }

    if (child.type === 'link_close') linkDepth -= 1
  }

  return next
}

/** 将名谱定名（中文）包为行内 code，并附带 title / data-* 供悬停释义。 */
export function markdownBookTerms(md: MarkdownIt): void {
  md.core.ruler.after('inline', 'book-defined-terms', (state: StateCore) => {
    const s = state as unknown as MdStateCore
    const { Token } = s

    for (const token of s.tokens) {
      if (token.type === 'inline' && token.children) {
        token.children = transformInlineChildren(token.children as MdToken[], Token)
      }
    }
  })
}
