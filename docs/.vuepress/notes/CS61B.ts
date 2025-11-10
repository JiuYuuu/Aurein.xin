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
        'week1.md',
        'week021.md'
      ]
    },
    {
      text: 'HW 的解决方案',
      prefix: 'HW&Proj/',
      items: [
        'HW0a.md',
        'HW0b.md',
      
      ]
    },
    {
      text: 'lab 和 proj 的解决方案',
      prefix: 'HW&Proj/',
      items: [
        'proj0.md',
        'lab02.md'
      ]
    }
  ]
})