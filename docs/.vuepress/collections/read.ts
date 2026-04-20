import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: "doc",
  dir: 'notes/read',
  title: '读书笔记',
  linkPrefix: '/read/',
  sidebar: [
    "README.md",
    {
      text: '文学',
      prefix: 'literature', // 路径前缀（对应 docs/read/literature/ 文件夹）
      //collapsed: true,       // 比如文学类你看得慢，可以默认折叠起来
      items: [
        'weicheng.md',          // 围城
        'ditan.md',             // 我与地坛
        'TheLittlePrince.md'    // 小王子
      ]
    }
  ]

})