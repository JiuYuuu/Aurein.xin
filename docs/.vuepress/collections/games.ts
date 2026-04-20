import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'notes/Games',
  title: 'Games',
  linkPrefix: '/Games/',
  autoFrontmatter: {
    permalink: false,
  },
  sidebar: [
    'README.md',
    {
      text: '买啥游戏了？',
      collapsed: false,
      items: [
        'expenditure'
      ]
    },
    {
      text: 'Minecraft 相关',
      prefix: 'MC/',
      collapsed: false,
      items: [
        'mcserver',
        'logs'
      ]
    },
    {
      text: '2025 Steam 新品节评测',
      collapsed: false,
      items: [
        '2025news',
        'zui_jiu'
      ]
    }
  ]
})