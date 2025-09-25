---
title: week1
createTime: 2025/09/24 18:57:46
permalink: /CS61B/week1/
---

> 终于也是重启 CS61B 的学习之旅了，听的是 CS61B SP25 的课程，做的 project 等均来源于 CS61B SP21。WEEK1 将主要以 JAVA 的基础语法为主，笔记主要用于建立个人知识库，可能写自己薄弱的地方居多。

#### 学习流程
在开始之前，面对课程表上密密麻麻的项目，很容易无从下手，我们应该优先梳理并想出适合自己的学习流程。
##### 一.  读 Reading 了解课程梗概
Reading 中会包含 video、slides 。要提前阅读并了解本周将要学习什么
##### 二. 看 Guide 过一遍整体总结体系

##### 三. Discussion
题多，练手
##### 四. lab 与最后的 Assignments/Exams
 Project 2中仅项目说明的单词量就达到了1.4w，对于我这种英文苦手，读完理解完项目说明再去接手代码耗的时间就远远超过课程老师的预计时间

# JAVA 基础语法

## 基本结构

首先，看经典程序 Hello 的结构
```java
public class Hello {
	public static void main (String[], args) {
		System.out.println("Hello,world!");
	}
}
```
由此，我们可以了解这门语言的基础结构：
- 在 Java 中，所有程序都是由一个个类组成的
- 文件名必须与类名一致
- public 表示 这是一个公共的类，可以被外部使用
- 一个程序必须包含 main 方法，我们把第二行拆开来看
	1. `static` 静态方法，表明这是一个类，而非对象
	2. `void` 表示返回的值
	3. `String[], args`  是方法的参数，
- 第三行为输出函数，类似于`printf` `cout`

## Java 的工作流程

如果我们要在 terminal 运行一个 Java 程序，我们将以下的流程运行它：
插入图片

```shell
$ javac Hello.java
$ java Hello
Hello,world!
```

# 基本语法

基础循环、条件等函数与 c 一致

# Static vs. Non-Static Methods

Java 中所有的代码必须是类的一部分，绝大部分的代码都是在 method 中编写

## 理解概念

- `Static Methods` 属于**类** （所有对象共享一份）
- `Non-Static Methods` 属于对象 （每个对象有自己的独一份）

举例理解：
#### Instance Method：
```java
class Student {
    String name;
    int age;
}

```
使用：
```java
Student s1 = new Student();
s1.name = "Alice";
s1.age = 18;

Student s2 = new Student();
s2.name = "Bob";
s2.age = 20;

```
这里的 name 和 age 都属于对象，不同的学生对象有不一样的值

#### Static Method：
```java
class Student {
    String name;
    int age;

    static String school = "Peking University";
}

```
使用：
```java
Student s1 = new Student();
s1.name = "Alice";

Student s2 = new Student();
s2.name = "Bob";

System.out.println(s1.school); // Peking University
System.out.println(s2.school); // Peking University

// 修改
Student.school = "Tsinghua University";

System.out.println(s1.school); // Tsinghua University
System.out.println(s2.school); // Tsinghua University

```
由此可以看出 `school` 是静态变量，属于类，所有的对象都共享这一个值