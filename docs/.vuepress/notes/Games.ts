import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'Games',
  link: '/Games/',
  sidebar: [
    'README.md',
    {
      text: '买啥游戏了？',
      prefix: '',
      items: [
        'expenditure.md'
      ]
    },
    {
      text: 'Minecraft 相关',
      prefix: 'MC/',
      items: [
        'mcserver.md',
        'logs.md'
      ]
    },
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