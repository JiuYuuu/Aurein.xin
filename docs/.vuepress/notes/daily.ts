import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'daily',
  link: '/daily/',
  sidebar: [
    'README.md',
    {
      text: '2025',
      prefix: '2025', 
      items: [
        '202509.md',
        '202510.md',
        '202511.md',
      ]
    },
  ]
})