import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'Games',
  link: '/Games/',
  sidebar: [
    'README.md',
  
    {
      text: '生涯',
      prefix: '', 
      items: [
        '2025news.md'
      ]
    },
  ]
})