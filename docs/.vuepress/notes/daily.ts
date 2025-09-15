import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'daily',
  link: '/daily/',
  sidebar: [
    'README.md',
    {
      text: '2025-9',
      prefix: '2025-9/', 
      items: [
        '202509.md',
      ]
    }
  ]
})