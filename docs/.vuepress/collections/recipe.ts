import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: 'notes/recipe',
  title: 'Recipe',
  linkPrefix: '/recipe/',
  autoFrontmatter: {
    permalink: false,
  },
  sidebar: [
    'README.md',
    'BigVegetable'
  ]
})