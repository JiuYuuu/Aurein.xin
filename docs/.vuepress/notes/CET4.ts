import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'CET4',
  link: '/CET4/',
  sidebar: [
    'README.md',
    {
      text: '笔记',
      prefix: '', 
      items: [
        'translate.md',
        'writing.md'
      ]
    }
  ]
})