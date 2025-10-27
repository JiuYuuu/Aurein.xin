import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'CS61B',
  link: '/CS61B/',
  sidebar: [
    'README.md',
    {
      text: '课程笔记',
      prefix: '', 
      items: [
        'week0.md',
        'week1.md'
      ]
    },
    {
      text: 'HW 的解决方案与思考',
      prefix: 'HW/',
      items: [
        'HW0a.md',
        'HW0b.md',
      ]
    }
  ]
})