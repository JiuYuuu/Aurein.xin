---
title: 课程环境的搭建
createTime: 2025/09/24 17:14:27
permalink: /CS61B/week0/
---
> 本篇记录 CS61B 课程环境的搭建，旨在帮助友人快速上手本门课程。因为官方文档内有相当一部分是只有校内的人才可以弄，所以这也算一个精简配环境的教程

[61B lab1配置环境](https://sp21.datastructur.es/materials/lab/lab1setup/lab1setup)  
先贴一个官网。


# 安装 IDEA
首先去 [JetBrains](https://www.jetbrains.com/idea/download/) 安装 IDEA
安装完毕后，在 `Plugins` 中安装 `Java Visualizer`

# Clone 框架代码
可以使用 Desktop 直接 clone 到本地
```shell
$ git remote add skeleton https://github.com/Berkeley-CS61B/skeleton-sp21.git
```
::: warning 不要尝试配置文档内 SSH 的相关内容，好多人弄了很久都没配出来，建议直接跳过
:::

# 安装 JDK
安装课程要求的 JDK17
![](https://cdn.jsdelivr.net/gh/JiuYuuu/Blog-images/CS61B/week0/IDEA.png)

# 注册 Gradescope
来到网址[Gradescope](http://gradescope.com/) 注册账号  
注册账号时，填写学习时，请写 `UC Berkeley`
课程代码为 `MB7ZPY` 按要求来即可完成注册
# 完成练习 提交代码
::: warning 特别注意，请不要在 IDEA 中直接把整个框架代码当作一个项目打开！！如要做 lab1 ，请单独把他作为一个项目打开。
:::

你首先要完成一个很简单的题目
[选择右侧栏步骤 D 查看题目要求](https://sp21.datastructur.es/materials/lab/lab1/lab1)
修改完代码后，来到 Gradescope 链接你的 GitHub 仓库， 提交你修改完毕后的代码，系统会给你自动打分

# 结语

以上就是配置环境的最精简流程，主要是过一遍作业提交的流程。