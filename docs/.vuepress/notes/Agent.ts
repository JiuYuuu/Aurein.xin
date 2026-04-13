import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'Study/Agent',
  link: 'Study/Agent/',
  sidebar: [

    {
      text: '笔记',
      prefix: '', 
      items: [
        'agentLoop.md'
      ]
    }
  ]
})