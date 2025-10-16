import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'Games',
  link: '/Games/',
  sidebar: [
    'README.md',
  
    {
      text: '2025 Steam 新品节评测',
      prefix: '', 
      items: [
        '2025news.md',
        'zui_jiu.md'
      ]
    },
  ]
})