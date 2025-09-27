import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'TV',
  link: '/TV/',
  sidebar: [
    'README.md',
    {
      text: '电影',
      prefix: '', 
      items: [
        'hana.md'
      ]
    },
    {
      text: '电视剧',
      prefix: '',
      items: [
        ''
      ]
    }
  ]
})