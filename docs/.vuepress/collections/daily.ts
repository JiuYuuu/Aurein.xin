import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'notes/daily',
  title: '日常',
  linkPrefix: '/daily/',
  autoFrontmatter: {
    permalink: false,
  },
  sidebar: [
    'README.md',
    {
      text: '2025',
      prefix: '2025/',
      collapsed: false,
      items: [
        '202509',
        '202510',
        '202511'
      ]
    },
    {
      text: '2026',
      prefix: '2026/',
      collapsed: false,
      items: [
        '202601',
        '202603',
        '202604'
      ]
    },
    {
      text: '30DAY 推歌挑战',
      prefix: '2025/',
      collapsed: false,
      items: [
        'songs'
      ]
    }
  ]
})