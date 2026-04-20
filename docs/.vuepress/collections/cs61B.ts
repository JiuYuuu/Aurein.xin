import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  
  
  dir: 'notes/Study/CS61B', 
  
  title: 'CS61B 课程笔记',
  
  linkPrefix: '/Study/CS61B/', 
  

  autoFrontmatter: {
    permalink: true, 
  },

  sidebar: [
    'README.md', 
    {
      text: '课程笔记',
      collapsed: false, 
      items: [
        'week0',
        'week1',
        'week021',
        'week022'
      ]
    },
    {
      text: 'HW 的解决方案',
      prefix: 'HW&Proj/', 
      collapsed: true,
      items: [
        'HW0a',
        'HW0b',
      ]
    },
    {
      text: 'lab 和 proj 的解决方案',
      prefix: 'HW&Proj/', 
      collapsed: false,
      items: [
        'proj0',
        'lab02'
      ]
    }
  ]
})