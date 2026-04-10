import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'read',
  link: '/read/',
  sidebar: [
    'README.md',
    {
      text: 'CS',
      prefix: 'cs/', 
      items: [
        'csnet.md',
      ]
    },
    {
      text: '文学',
      prefix: 'literature/', 
      items: [
        'weicheng.md',
        'ditan.md',
        'TheLittlePrince'
      ]
    },
  ]
})