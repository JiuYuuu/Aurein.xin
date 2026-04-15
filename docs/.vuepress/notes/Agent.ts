import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'Study/Agent',
  link: 'Study/Agent/',
  sidebar: [

    {
      text: '笔记',
      prefix: '', 
      items: [
        'agent1Loop.md',
        'agent2Tools.md'
      ]
    }
  ]
})