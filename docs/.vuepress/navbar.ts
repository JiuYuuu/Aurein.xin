/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  { 
    text: '关于我', 
    items: [
      { text: '介绍', link: '/about/' },
      { text: 'Q&A', link: '/qa/' }
    ]
  },
  {
    text: '日常',
    items:[
      { 
        text: '阅读记录', link: '/notes/read/README.md'
      },
      {
        text: '生活', link: '/notes/daily/README.md'
      },
      {
        text: 'TV', link: '/notes/TV/README.md'
      },
      {
        text: 'Games', link: 'notes/Games/README.md'
      }
    ]
  },
  {
    text: '笔记',
    items: [
      { text: 'CS61B', link: '/notes/CS61B/README.md' },
      {text: 'CET4', link: '/notes/CET4/README.md'}
    ]
  },
])
