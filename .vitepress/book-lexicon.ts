/**
 * 序卷「名谱总表」：本书定名 ↔ 今世通称（enRoot）。
 * 定义列为悬停用的一行摘要；与 `chapters/00-序卷-名法与写法.md` 第三节表一致。
 */
export type BookLexiconEntry = {
  zh: string
  enRoot: string
  def: string
}

export const BOOK_LEXICON: BookLexiconEntry[] = [
  /* —— 三、机行世界之定名（表列，所司何事即 def）—— */
  { zh: '格物取证', enRoot: 'RAG', def: '自外取证，以证当前所论。' },
  { zh: '通器约', enRoot: 'MCP', def: '诸器往来、借调、授受之约。' },
  { zh: '稽迹簿', enRoot: 'audit log', def: '留痕以备后查之簿。' },
  { zh: '大言机', enRoot: 'LLM', def: '善于成辞、归纳、推衍的言智根器。' },
  { zh: '周行环', enRoot: 'agent loop', def: '见势、熟虑、发用、回照之往复环。' },
  { zh: '义纹库', enRoot: 'vector store', def: '义纹所藏之府。' },
  { zh: '机行', enRoot: 'agentic system', def: '能在局中持续行事的一整套系统。' },
  { zh: '久忆', enRoot: 'persistent memory', def: '跨轮跨事久留不散的忆藏。' },
  { zh: '当界', enRoot: 'context window', def: '此刻可容可照的边界。' },
  { zh: '前缘', enRoot: 'context', def: '当前一切任务缘起与相关之物。' },
  { zh: '成程', enRoot: 'workflow', def: '预铺好的做事章法。' },
  { zh: '忆藏', enRoot: 'memory', def: '旧事、旧例、旧错、旧规所寄之府。' },
  { zh: '提衡', enRoot: 'harness', def: '提其纲、衡其重、令其可久行的外壳骨架。' },
  { zh: '收简', enRoot: 'compaction', def: '把长长行迹收紧为可续之骨。' },
  { zh: '权界', enRoot: 'permissions', def: '何位能至何处的边界。' },
  { zh: '行时', enRoot: 'runtime', def: '真正在时中流转、接事、出手之场。' },
  { zh: '主使', enRoot: 'orchestration', def: '统众位、分轻重、总收束的调度之法。' },
  { zh: '批允门', enRoot: 'approval gate', def: '关键处须人批允方可越门而行之制。' },
  { zh: '机使', enRoot: 'agent', def: '承事而行的一位之体。' },
  { zh: '发器', enRoot: 'tool call', def: '正式差遣器用出手。' },
  { zh: '回轴', enRoot: 'rollback', def: '事失其正后退回前轴之法。' },
  { zh: '沙匣', enRoot: 'sandbox', def: '先试手、后出界的限地。' },
  { zh: '习法', enRoot: 'skills', def: '练熟后可再调、可传、可组的专门做法。' },
  { zh: '器用', enRoot: 'tool', def: '可借力而成事之外器。' },
  { zh: '省衡', enRoot: 'eval', def: '校其曲直、验其成败之法。' },
  { zh: '义纹', enRoot: 'embedding', def: '文义之隐纹。' },

  /* —— 正文仍用到的其它定名（非第三节表，或与表互补）—— */
  { zh: '器制', enRoot: 'tooling', def: '围绕器用的接入、运使、留痕、审度所成法制。' },
  { zh: '立据', enRoot: 'grounding', def: '立其足、据其所凭；可治浮辞，未必治妄心。' },
  { zh: '发端语', enRoot: 'prompt', def: '提示仅为发端，不可代工夫。' },
  { zh: '规约', enRoot: 'protocol', def: '有法度又有相接之束；通器约为其中一类大约。' },
  { zh: '走失', enRoot: 'drift', def: '行时既久而渐失本意。' },
  { zh: '长程', enRoot: 'long-horizon', def: '不求花样而求能久用。' },
  { zh: '智机', enRoot: 'AI', def: '序卷以「智机」代称 AI。' },
  { zh: '治制', enRoot: 'governance', def: '非一时操作，乃制度与治理之合。' },
  { zh: '论域', enRoot: 'discourse', def: '可讨论、可争辩、可立义之场域。' },
  { zh: '题务', enRoot: 'task', def: '序卷定名。' },
  { zh: '能事', enRoot: 'capability', def: '序卷定名。' },
  { zh: '心体', enRoot: 'principle layer', def: '系统内在判准之本；阳明心学之核心语。' }
]

/** 最长词优先，避免「格物」截断「格物取证」等 */
export const BOOK_LEXICON_LONGEST_FIRST: BookLexiconEntry[] = [...BOOK_LEXICON].sort(
  (a, b) => b.zh.length - a.zh.length
)
