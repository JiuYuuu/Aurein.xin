import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: "doc",
  dir: 'notes/read',
  title: '读书笔记',
  linkPrefix: '/read/',
  sidebar: [
    "README.md",
    {
      text: '《文心》',
      prefix: 'literature/wenxin', // 路径前缀（对应 docs/read/literature/wenxin/ 文件夹）
      items: [
        'section1.md',
      ]
    },
    {
      text: '文学',
      prefix: 'literature', // 路径前缀（对应 docs/read/literature/ 文件夹）
      //collapsed: true,       // 折叠开关
      items: [
        'weicheng.md',          
        // 'ditan.md',             
        // 'TheLittlePrince.md'    
      ]
    },
    
  ]

})