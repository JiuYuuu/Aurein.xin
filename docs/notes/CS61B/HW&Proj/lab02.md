---
title: Lab02
createTime: 2025/11/05 15:19:22
permalink: /CS61B/lab021/
---
> 本 lab 主要教你怎么使用 调试器 ，通过 debugger 获取炸弹的密码，三个阶段层层渐进，手把手教你 debug

# Phase 0
教你如何使用断点
文档写的真的很清晰，真的是保姆式教学，先贴个链接吧
[Lab 02: Debugging (Part 1)](https://sp25.datastructur.es/labs/lab02/)

## Breakpoints

断点，就是每行代码前面行数那，点一下就可以变小红点。
当调试器运行到此处时暂停
它的作用是让你在程序运行过程中
- **实时观察代码执行状态**
- 逐步执行代码，理解流程
- 定位 bug 或逻辑错误
- 配合可视化工具理解数据结构

# Phase 1

二阶段主要教你使用可视化的插件调试
其中提到了`of()`的用法，将在正课笔记提到

# Phase 2

三阶段 介绍了，当你遇到大数字循环时，按顺序测试每一个循环的值显然不是明智的方法，接下来可以用 debugger 里内置的 condition 填写
![](https://cdn.jsdelivr.net/gh/JiuYuuu/Blog-images/CS61B/week0/lab02-1.png)