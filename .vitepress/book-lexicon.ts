/**
 * 序卷「名谱总表」：本书定名 ↔ 今世通称（enRoot）。
 * 定义列为悬停用的一行摘要，细节以 `chapters/00-序卷-名法与写法.md` 为准。
 */
export type BookLexiconEntry = {
  zh: string
  enRoot: string
  def: string
}

export const BOOK_LEXICON: BookLexiconEntry[] = [
  { zh: '格物取证', enRoot: 'RAG', def: '《大学》格物精神接入外证；于物中取其可证者。' },
  { zh: '通器约', enRoot: 'MCP', def: '使诸器相接之大约；通而有约、接而有束。' },
  { zh: '知行环', enRoot: 'Agent Loop', def: '知与行相互印证的往复回路；代今世所谓循环、回路。' },
  { zh: '宿藏', enRoot: 'Persistent Memory', def: '可跨时而留、跨卷而续的深层忆藏；能成学亦能成蔽。' },
  { zh: '文心', enRoot: 'LLM', def: '能生言成句布章之核；近心发用，不即心体。' },
  { zh: '提衡', enRoot: 'Harness', def: '提挈诸层使之不散，又衡持进退、约束行时。' },
  { zh: '程次', enRoot: 'Workflow', def: '有路数、有先后的程途与序列。' },
  { zh: '行者', enRoot: 'Agent', def: '能审势、取器、反照、再动者；取其能动不止能言。' },
  { zh: '统理', enRoot: 'Orchestration', def: '多位并行时总摄贯串、分理不乱。' },
  { zh: '器用', enRoot: 'Tools', def: '可施行之器。' },
  { zh: '器制', enRoot: 'Tooling', def: '围绕器用的接入、运使、留痕、审度所成法制。' },
  { zh: '习法', enRoot: 'Skills', def: '可炼成模块、可教后学、可按需唤起的门类之术。' },
  { zh: '忆藏', enRoot: 'Memory', def: '所记而藏；寻常忆藏之层。' },
  { zh: '当界', enRoot: 'Context Window', def: '当前所临之界；一念所及、一时所容。' },
  { zh: '约要', enRoot: 'Compaction', def: '约其繁而存其要，以免长程行时之后路乱。' },
  { zh: '立据', enRoot: 'Grounding', def: '立其足、据其所凭；可治浮辞，未必治妄心。' },
  { zh: '象库', enRoot: 'Vector Store', def: '语义索引之所蓄；藏其象。' },
  { zh: '意纹', enRoot: 'Embeddings', def: '语义潜纹之所寓；达其意。' },
  { zh: '试围', enRoot: 'Sandbox', def: '试其可为而以围限之。' },
  { zh: '戒绳', enRoot: 'Guardrails', def: '戒其不可越，如绳墨可依。' },
  { zh: '省衡', enRoot: 'Eval', def: '察而核之，又权衡衡定。' },
  { zh: '行时', enRoot: 'Runtime', def: '系统真正运行所在之时。' },
  { zh: '心体', enRoot: 'Principle Layer', def: '系统内在判准之本；阳明心学之核心语。' },
  { zh: '发端语', enRoot: 'Prompt', def: '提示仅为发端，不可代工夫。' },
  { zh: '规约', enRoot: 'Protocol', def: '有法度又有相接之束；通器约为其中一类大约。' },
  { zh: '走失', enRoot: 'Drift', def: '行时既久而渐失本意。' },
  { zh: '长程', enRoot: 'Long-horizon', def: '不求花样而求能久用。' },
  { zh: '智机', enRoot: 'AI', def: '序卷以「智机」代称 AI。' },
  { zh: '治制', enRoot: 'governance', def: '非一时操作，乃制度与治理之合。' },
  { zh: '论域', enRoot: 'discourse', def: '可讨论、可争辩、可立义之场域。' },
  { zh: '题务', enRoot: 'task', def: '序卷定名。' },
  { zh: '能事', enRoot: 'capability', def: '序卷定名。' }
]

/** 最长词优先，避免「格物」截断「格物取证」等 */
export const BOOK_LEXICON_LONGEST_FIRST: BookLexiconEntry[] = [...BOOK_LEXICON].sort(
  (a, b) => b.zh.length - a.zh.length
)
