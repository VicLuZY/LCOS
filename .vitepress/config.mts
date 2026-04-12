import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig, type DefaultTheme } from 'vitepress'

import { markdownBookTerms } from './markdown-book-terms.js'

type BookItem = DefaultTheme.SidebarItem & {
  order: number
}

const chapterDir = fileURLToPath(new URL('../chapters/', import.meta.url))

function extractTitle(filePath: string, fallback: string): string {
  const content = readFileSync(filePath, 'utf8')
  const match = content.match(/^#\s+(.+)$/m)

  return match?.[1].trim() ?? fallback
}

function getBookItems(): BookItem[] {
  return readdirSync(chapterDir)
    .filter((entry) => entry.endsWith('.md') && entry !== 'index.md')
    .sort((left, right) => left.localeCompare(right, 'zh-CN'))
    .map((filename) => {
      const fallback = filename.replace(/^\d+-/, '').replace(/\.md$/, '')
      const order = Number.parseInt(filename, 10)

      return {
        order,
        text: extractTitle(path.join(chapterDir, filename), fallback),
        link: `/${filename.replace(/\.md$/, '')}`
      }
    })
}

const bookItems = getBookItems()
const guideItems = bookItems.filter((item) => item.order <= 1)
const volumeItems = bookItems.filter((item) => item.order >= 2 && item.order <= 19)
const appendixItems = bookItems.filter((item) => item.order >= 20)
const firstChapterLink =
  bookItems.slice().sort((a, b) => a.order - b.order)[0]?.link ?? '/00-序卷-名法与写法'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(markdownBookTerms)
    }
  },
  lang: 'zh-CN',
  title: '龙场OS',
  description: '《龙场OS》定名说字本：阳明学与机行之映照',
  base: '/LCOS/',
  appearance: 'dark',
  srcDir: 'chapters',
  outDir: '.vitepress/dist',
  lastUpdated: false,
  cleanUrls: false,
  themeConfig: {
    siteTitle: '龙场OS',
    footer: {
      copyright: '© Victor Lü, 2026'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '从序卷开始', link: firstChapterLink }
    ],
    sidebar: [
      {
        text: '导读',
        items: guideItems
      },
      {
        text: '正卷',
        items: volumeItems
      },
      {
        text: '附录',
        items: appendixItems
      }
    ],
    outline: [2, 3],
    outlineTitle: '本章结构',
    docFooter: {
      prev: '上一章',
      next: '下一章'
    },
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/VicLuZY/LCOS' }
    ]
  }
})
