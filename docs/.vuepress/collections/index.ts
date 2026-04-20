import { defineCollections } from 'vuepress-theme-plume'
import read from './read'
import agent from './agent'
import CET4 from './CET4'
import cs61B from './cs61B'
import daily from './daily'
import games from './games'


export default defineCollections([
    { type: 'post', 
      dir: 'blog', 
      title: '博客',
      autoFrontmatter: {
        title: true,
        createTime: true,
        permalink: true
      } },
  read,
  agent,
  CET4,
  cs61B,
  daily,
  games
])