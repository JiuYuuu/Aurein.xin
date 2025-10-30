---
title: 计科入门指南
tags:
    - Blog
createTime: 2025/10/27 14:32:14
permalink: /article/cs/
---
::: warning
这是一篇尚未完成的文章
:::
# 前言
> 本文是一份面向计科萌新的入门指南，尤其适合零基础的朋友参考

本文旨在分享学习计算机过程中的通用知识和基本素养。
工欲善其事，必先利其器。掌握高效的工具和方法至关重要，本文将介绍些能提升你效率的工具，而其中最关键的一项，就是学会如何提问：
# 提问
如何提问是计科学习中必备的技能，你在日常开发中难免会遇到许多问题，而这时，如何将你所遇到的问题用清晰简洁的文字描述出来会显得十分重要。首先阅读这篇文章[提问的智慧](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)，掌握其中的技巧，这将大大提升你问题解决的效率和概率。

其次，AI 将是你学习路上最好的老师之一，学会向 AI 提问会极大提升你学习的效率。相当一部分问题你问 AI 几十秒钟就可以立马解决，而去问社群、朋友，首先他们理解问题需要时间，回答你的疑问也需要时间，效率会明显的降低。
目前主流的模型有很多，在此推荐一些国内的优秀模型：[Kimi](https://www.kimi.com/zh/)、[通义千问](https://www.tongyi.com/)、[DeepSeek](https://yuanbao.tencent.com/)。
同时也非常推荐国外的大模型，如 GPT、Gemini、Copilot等。在处理代码能力上国外几家大模型的能力还是优于国内的。

# Git & GitHub
这两个工具对于程序员来说非常重要的工具之一，接下来将介绍这两个工具的用途：
## Git
想象一下你正在写一篇重要的论文或报告。你可能会在电脑上保存很多个版本：

- `论文_v1.doc`
- `论文_v2_改了开头.doc`
- `论文_最终版.doc`
- `论文_打死也不改了版.doc`

是不是很乱？万一你突然发现 v2 里的某段写得最好，想把它找回来，就会很麻烦。
**而 Git 就是来解决这个问题的**

- **用途：** 它是一个“版本控制工具”。简单说，它就是你代码的存档系统

#### 为什么你必须用它？

1. 随时存档 (Commit)： 你每写完一个功能或修复一个错误，就可以用 Git 创建一次存档（commit）。你可以随时读档，回到之前存的档

2. 无限次后悔 (Reset/Revert)： 当你不小心把代码改崩了，或者发现新写的烂透了，你可以使用 Git 一键回到昨天、上周、甚至上个月的任何一个正常版本

3. 团队协作 (Branch & Merge)： 这是 Git 最强大的功能。想象你和朋友 A、朋友 B 要一起开发一个网站
- 你可以开一条“分身”A（术语叫 branch 分支）去写登录功能
- 朋友 B 可以同时开“分身”B 去改网站的颜色
- 你们俩同时进行，互不干扰。
- 最后，你们都写完后，Git 可以帮你们把A和B的成果“合并”（merge）回主项目上

#### **总结**
Git 是安装在你电脑上的一个软件，用来管理你项目的历史版本，让你能安全、高效地修改代码，并且能和别人一起工作而不冲突。作为计科新人，一定要养成多使用 Git 的习惯，有很多时候 Git 能救一命！！

## GitHub
GitHub 作为全球最大的同性社交网站，同样也是一名程序员必不可少的工具，首先我们先要来了解 GitHub 是什么？他是做什么用的？

你用 Git 在你自己的电脑上管理了项目，那么你可能会面临以下**问题**：
- 我的电脑**突然坏了**，我的代码怎么办！！
- 我想在**多设备**的情况下同步开发怎么办
- 我做了一个超级牛x的项目，你们都过来试试
- 我想和地球另一端的朋友协同开发一个项目

而 **GitHub 就是来解决这些问题的**

#### 你为什么必须使用它？
它是一个网站。它是一个使用 Git 作为基础的、全球最大的代码托管平台
1. **云端备份 (Push)**： 你可以把本地用 Git 管理的项目推送（push）到 GitHub 上。这就像是把你的代码存进了云盘，电脑坏了也不怕丢

2. **团队开发 (Pull Request)**： GitHub 是团队协作的中心。你的朋友在 GitHub 上看到你写的“分身”代码，他可以帮你检查（Code Review），提出修改意见，然后你们点击一个“合并”按钮，就能把代码安全地合并到主项目里。

3. **程序员的“简历”和“资源库”** ：
    GitHub 同时是全球最大的开源社区。你可以找到无数高质量的开源项目（甚至老乡鸡的菜谱）
    你也可以把你自己的项目放在 GitHub 上。当你去找工作时，面试官会打开你的 GitHub 主页，看你都做过什么项目。这是一个展示你技术实力的最佳名片。

## 你的日常工作流
在**本地电脑**上用 Git 来**管理版本**，然后把你的代码**推送**到 GitHub 网站上进行备份和团队协作

接下来，将介绍 GitHub **具体用法：**
#### 如何使用 GitHub
来到[这个网站](https://github.com/)，点击右上角 `Sign up`
![](https://cdn.jsdelivr.net/gh/JiuYuuu/Blog-images/CS/github.png)
注册完成后，来到这个页面：
![](https://cdn.jsdelivr.net/gh/JiuYuuu/Blog-images/CS/git.png)
(不是这啥啊我咋看不懂)
点击 Top repositories 一旁的绿色按钮 New 就可以创建新的仓库了（repositories）
![](https://cdn.jsdelivr.net/gh/JiuYuuu/Blog-images/CS/gitr.png)
填写基本信息，之后你的代码就可以上传到这个仓库了

#### 如何安装 Git ？
点击下方链接快速学习：
[Git 的安装教程（详解每个步骤）](https://blog.csdn.net/Passerby_Wang/article/details/120767020?ops_request_misc=%7B%22request%5Fid%22%3A%22169673342216800182730025%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=169673342216800182730025&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-4-120767020-null-null.142%5Ev95%5EchatgptT3_1&utm_term=%E5%AE%89%E8%A3%85git&spm=1018.2226.3001.4187)

#### 我咋用它们啊？
作为一名萌新，面对全是命令行的内容难免会感到无从下手，复杂的 git 命令完全不会敲，文件完全找不到怎么办啊
那么我将向你推荐一个 GUI 旷世神作———— [GitHub DESKTOP](https://desktop.github.com/download/)
通过这个软件，你可以一键 commit 一键 push 到 GitHub，操作简单，十分容易上手，纯 GUI 的操作界面完全适合刚入门的萌新使用。等熟悉了 Git 的基本流程后，再去学习相关的命令行会轻松不少
![](https://cdn.jsdelivr.net/gh/JiuYuuu/Blog-images/CS/gitdes.png)


# IDE（集成开发环境）
> 我想写 c、cpp、python、java！！我用什么软件写好啊？

那我们就不得不提大名鼎鼎的 JetBrains 公司了
相较于 VSCode ，私认为，这种 IDE 最适合萌新进行使用，因为：
- 智能代码补全
- 简易的环境配置
- 内置优秀的开发工具
- 丰富的插件社区
等等
![](https://cdn.jsdelivr.net/gh/JiuYuuu/Blog-images/CS/jet.png)
看到上面的软件了吗，想写啥就选啥，环境也不用你配啥都不用干，开箱即用
下载地址：[JetBrains](https://www.jetbrains.com/)

#### 教育优惠的申请
> 不是啊佬，这只能试用咋办啊，花钱订阅吗，用破解吗？

那我们就不得不提一个东西了，教育优惠，你申请完这个 pack 后，JetBrains家绝大部分东西你都能免费用了
以下是焚诀教程：
[高校学生免费使用jetbrains产品指南（保姆级教程）](https://blog.csdn.net/m0_63451989/article/details/131743070)

# 编程教程
> 我想去学语言，我该去哪学呢？

首先是第一个网站
- [菜鸟教程](https://www.runoob.com/)
    这个网站涵盖了绝大部分主流语言的基础教程，你可以通过其中的教程稍微熟悉一下你要学的语言
- [CS自学指南](https://csdiy.wiki/)
    只能说是我的白月光，入坑公开课的源头
- 官方文档
    想要深入去学习一门语言，学会看官方文档是必不可少的。

#### 语言问题
> 你推荐的课程都是英文的，我看不懂咋整啊？

这里推荐一个翻译的插件 Trancy ， 你可以在各大浏览器的拓展里下载到
现在展示一下本插件的基本功能，主要包含如划词划句翻译、**视频双语字幕**、生词本等功能
![](https://cdn.jsdelivr.net/gh/JiuYuuu/Blog-images/CS/fuc1.png)
![](https://cdn.jsdelivr.net/gh/JiuYuuu/Blog-images/CS/fuc2.png)
其中最推荐的是 ai 字幕功能啊，由于它可以自定义翻译引擎，你可以用自己的 ai 的 api 导入进去，非常的好用切方便
# 命令行
明天再写，累了
# 咋做笔记？
做好笔记也是你学习路程中不可缺少的一部分

#### Markdown
Markdown 是一门十分易上手的标记语言
你在这个网站上看见的所有文章都是由 Markdown 语言编写的。为什么要先介绍这门语言呢，因为 目前主流的笔记软件都是使用 Markdown 语言的，如 Notion、Obsidian 等等
在这个网站，你可以了解到这门语言的基本用法[Markdownwn基本语法](https://markdown.com.cn/basic-syntax/)，里面还有在线编译器，可以上手简单试一试

#### Obsidian
我是 Obsidian 的忠实拥护者！！！
在使用了 notion、语雀等一堆笔记软件后，我发现还是 obsidian 最适合我
