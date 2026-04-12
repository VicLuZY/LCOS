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

const bookItems = getBookItems().sort((a, b) => a.order - b.order)

function itemsByOrderRange(min: number, max: number): DefaultTheme.SidebarItem[] {
  return bookItems.filter((item) => item.order >= min && item.order <= max)
}

/** 与母稿「四大章」分界对齐：卷五收口、卷八为第二章中枢、卷十三起第三章、卷廿起第四章。 */
const prefaceItem = bookItems.filter((item) => item.order === 0)
const firstChapterLink = prefaceItem[0]?.link ?? '/00-序卷-名法与写法'

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
        text: '序卷',
        items: prefaceItem
      },
      {
        text: '第一章　人物与龙场（第一大章）',
        collapsed: false,
        items: itemsByOrderRange(1, 5)
      },
      {
        text: '第二章　机行前史与行上诸器（第二大章）',
        collapsed: false,
        items: itemsByOrderRange(6, 12)
      },
      {
        text: '第三章　心学入系统设计（第三大章）',
        collapsed: false,
        items: itemsByOrderRange(13, 19)
      },
      {
        text: '第四章　未来论与收束（第四大章）',
        collapsed: false,
        items: itemsByOrderRange(20, 27)
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
