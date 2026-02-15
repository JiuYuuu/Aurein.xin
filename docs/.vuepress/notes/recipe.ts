import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'recipe',
  link: '/recipe/',
  sidebar: [
    'README.md',
    'BigVegetable.md'
  ]
})