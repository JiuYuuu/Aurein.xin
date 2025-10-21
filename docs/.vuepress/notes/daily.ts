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
        '202510.md'
      ]
    },
    {
      text: '树洞',
      prefix: '树洞/',
      items: [
        'BlueMood.md'
      ]
    }
  ]
})