---
title: 从零开始的博客搭建（逐渐完善中）
tags:
    - Blog
createTime: 2025/06/19 20:25:31
permalink: /article/hc71u2i5/
---

::: warning
这是一篇未完成的文章
:::

在学习过程中，输出是相当重要的一环。无论是记录技术心得、记录日常生活，还是整理知识体系，拥有一个博客都是将零散知识系统化的最佳方式。本教程将提供一份搭建博客的参考与思路，面向行业内外的朋友们共同交流。


::: tip

本教程是基于 VuePress 中 plume 主题的博客建设流程；

本教程包含部署至 GitHub Pages 以及云服务器上两种方式，适合小白使用。

:::

## 一. 准备工作

::: tip

如果你准备在 GitHub Pages 部署请无视此条

:::

1. 你可以在国内几家大云服务器商里购买云服务器，如阿里云、腾讯云、京东云、华为云等。本教程使用的是华为云的服务器,配置如下：

```
服务器名称：华为云Flexus云服务器
区域：华北-北京四
规格：2核2G 40GB 2M 100G
计费模式：包年/包月 | 1年
镜像： Debian 11.1.0 64bit
```

2. 域名的购买：同上述运营商选一家购买即可



## 二.  在本地安装前置环境

由于本教程使用的是 vuepress ，需要安装他的前置软件，可以参考官网中的文档

[VuePress官网](https://vuepress.vuejs.org/zh/)

**本地安装前置环境**

- 安装Node.js

     [Node.js官网](https://nodejs.org/zh-cn) 在其中下载并安装好，然后验证环境是否配置成功
     win+r 输入 cmd 运行命令提示符，依次输入以下指令：

     ```bash
     node -v
     npm -v
     ```

​	如果返回对应的版本号，则证明安装成功

- 安装 git 

  在 [Git官网](https://git-scm.com/) 下载并安装在本地，安装后验证：

  ```bash
  git --version
  ```

  如果返回对应的版本号，则证明安装成功

## 三. 在本地创建你的第一个 VuePress 项目

本教程使用的是 Plume 主题 [Plume官网](https://theme-plume.vuejs.press/)

:::: steps

1. 选择一个工作目录
   在你的电脑上找一个位置，用来存放你的博客项目

2. 运行创建的命令

  - 在刚刚选定的目录中，右键空白处选择在终端中打开

    <img src="D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-06-25_00-53-57.png" style="zoom: 33%;" />
  - 运行主题提供的 命令行工具，帮助您构建一个基本项目。使用以下命令， 启动 安装向导

  ```bash
  npm create vuepress-theme-plume@latest
  ```

启动后， 回答下列问题：

```
┌  Welcome to VuePress and vuepress-theme-plume !
│
◇  Select a language to display / 选择显示语言
│  简体中文
│
◇  您想在哪里初始化 VuePress？
│  ./my-project
│
◇  站点名称：
│  My Vuepress Site
│
◇  站点描述信息：
│  My Vuepress Site Description
│
◇  是否使用多语言？
│  No
│
◇  请选择站点默认语言
│  简体中文
│
◇  是否使用 TypeScript？
│  Yes
│
◇  请选择打包工具
│  Vite
│
◇  部署方式：
│  Custom
│
◇  是否初始化 git 仓库？
│  Yes
│
◇  是否安装依赖？
│  Yes
│
◇   🎉 创建成功!
│
└  🔨 执行以下命令即可启动：
      cd ./my-project
      pnpm run docs:dev
```



3. 预览主页

   执行完上述命令后，使用以下命令可在本地浏览器预览

   ```bash
   npm run docs:dev
   ```

   返回：

   ```bash
   > urblog@1.0.0 docs:dev
   > vuepress dev docs
   
   ✔ Initializing and preparing data - done in 778ms
   
     vite v6.3.5 dev server running at:
   
     ➜  Local:   http://localhost:8080/
     ➜  Network: http://**.***.**.***:8080/
     ➜  Network: http://***.***.***.***:8080/
     ➜  Network: http://***.***.***.*:8080/
     ➜  Network: http://***.***.***.*:8080/
   
   ```

   ctrl + 右键单击 在浏览器打开

4. 个性化网站

​      详细配置参考 Plume 主题文档 [Plume文档](https://theme-plume.vuejs.press/guide/intro/)

::::

点此跳转至部署在 [Github](#github) 的流程 



##  四. 配置服务器

1. 进入已购买的服务器配置页（以华为云为例） 首先点击重置密码，输入新的密码。之后使用 CloudShell 远程登陆

![](D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-06-25_00-07-05.png)

![](D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-06-25_00-09-16.png)

2. 安装基本前置软件

   登录云服务器执行以下命令

::::steps

1. 更新软件包

```bash
sudo apt update
```

2. 安装 Git

```bash
sudo apt install git -y
```

3. 安装 Node.js  和 npm

```bash
#安装 curl
sudo apt install -y curl gnupg2
#下载并执行安装脚本
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
#安装 Node.js 和 npm
sudo apt-get install -y nodejs
```

安装完成后，使用 `node -v`和`npm -v `来验证是否成功

4. 安装宝塔

[宝塔面板官网](https://www.bt.cn/new/index.html)

使用以下命令安装：

```bash
sudo wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh && bash install_panel.sh ed8484bec
```

等待读条，安装完成后：

```bash
==================================================================
Congratulations! Installed successfully!
=============注意：首次打开面板浏览器将提示不安全=================

 请选择以下其中一种方式解决不安全提醒
 1、下载证书，地址：https://dg2.bt.cn/ssl/baota_root.pfx，双击安装,密码【www.bt.cn】
 2、点击【高级】-【继续访问】或【接受风险并继续】访问
 教程：https://www.bt.cn/bbs/thread-117246-1-1.html
 mac用户请下载使用此证书：https://dg2.bt.cn/ssl/mac.crt

========================面板账户登录信息==========================

 【云服务器】请在安全组放行 ***** 端口
 外网面板地址: **********
 内网面板地址: ********
 username: *********
 password: *********

==================================================================
```

前往服务器安全组去放行宝塔给出的的端口，顺便可以用一键放通常用端口

![](D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-06-27_17-44-20.png)

之后打开宝塔外网面板地址，输入宝塔账号密码登入

进入后，选择左侧栏中 **网站**，安装 Nginx ，使用默认极速安装即可。

在安装结束后，点击添加**HTML项目**后，再点击下方绿色按钮**添加HTML项目**

在绑定域名中填写你购买的域名，默认根目录是`/www/wwwroot/绑定域名` ，你可以更改到 dist 文件夹

## 五. 域名解析

前往你所购买的域名商中，添加域名的解析,这里我使用的是阿里云的域名

![](D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-07-13_19-46-10.png)

## 六. 备案

当你输入你的域名会发现当前网站不可访问

![](D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-07-13_19-52-57.png)

然后前往云服务器供应商按照给出的指引备案即可，可能需要15天左右

备案完成后需要在30天内去**全国互联网安全管理服务平台**进行公安备案

## 部署至 GitHub Pages 的流程 {#github}

GitHub 为我们提供了免费的静态网页托管服务，无需购买服务器与域名，但在国内访问存在速度缓慢甚至无法连接的问题

GitHub Pages 相关的限制在这[GitHub Pages limits ](https://docs.github.com/zh/pages/getting-started-with-github-pages/github-pages-limits)

### 新建 GitHub 仓库

前往 GitHub ，创建一个新的公开仓库，以 `<你的用户名>.github.io` 格式命名

### 使用 GitHub Desktop 图形化操作

::::steps

1. 下载安装 GitHub Desktop 软件

​	进入官网 [GitHub Desktop](https://github.com/apps/desktop) 下载安装软件

2. 打开程序，登录账号

​	在软件登录你的 GitHub 账号

3. 克隆项目至本地

![](D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-07-13_20-02-18.png)

4. 上传Page

将你项目生成的 dist 文件放到此路径下，添加描述后，点击 commit ，之后点击右上 Pull orign同步到 GitHub 。

![](D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-07-13_20-07-47.png)

![](D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-07-13_20-07-59.png)

5. 设置 GitHub

   按照图中的顺序点击，最后点 Visit site 即可访问页面

![](D:\website\blog\Blog-Images\Blog-images\Blog-web\Snipaste_2025-09-16_23-51-25.png)
