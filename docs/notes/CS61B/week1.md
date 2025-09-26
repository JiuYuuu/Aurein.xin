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

# Lists in Java
list 在 Java 中是一种接口
使用语法如下：
```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ListExample {
    public static void main(String[] args) {
        // 1. 声明和初始化
        // 推荐的写法：面向接口编程
        // 这样如果以后想换成LinkedList，只需要改`new`后面的部分即可
        List<String> userNames = new ArrayList<>();

        // 2. 添加元素 (add)
        userNames.add("Alice");    // 添加到列表末尾 -> [Alice]
        userNames.add("Bob");      // -> [Alice, Bob]
        userNames.add("Charlie");  // -> [Alice, Bob, Charlie]
        userNames.add(1, "David"); // 在索引为1的位置插入 -> [Alice, David, Bob, Charlie]

        System.out.println("初始化后的列表: " + userNames);

        // 3. 获取元素 (get)
        String firstUser = userNames.get(0); // 获取索引为0的元素
        System.out.println("第一个用户是: " + firstUser); // 输出: Alice

        // 4. 修改元素 (set)
        userNames.set(2, "Robert"); // 将索引为2的元素(Bob)修改为Robert
        System.out.println("修改后的列表: " + userNames); // -> [Alice, David, Robert, Charlie]

        // 5. 删除元素 (remove)
        userNames.remove(3); // 删除索引为3的元素(Charlie)
        // userNames.remove("Alice"); // 也可以直接删除指定的对象
        System.out.println("删除后的列表: " + userNames); // -> [Alice, David, Robert]

        // 6. 获取列表大小 (size)
        System.out.println("当前用户数量: " + userNames.size()); // 输出: 3

        // 7. 遍历列表 (Iteration) - 最常用的是 for-each 循环
        System.out.println("--- 遍历所有用户 ---");
        for (String name : userNames) {
            System.out.println(name);
        }
    }
}
```
## 概念
List 有以下关键词：
- 集合
- 有序 可以用 index 精准访问
- 允许元素重复 可以向 list 中添加重复的元素

## ArrayList vs LinkedList
最常用的两个实现类就是 `ArrayList`和`LinkedList`，由于实现的原理不同，导致它们在性能上有差异

### ArrayList
内部是`动态数组`
优势： 
- 查询快，通过 index 访问的速度很极快
缺点：
- 增删慢：列表的中间插入或删除元素效率低，因为需要移动大量元素
适用于`读多写少`的场景，当你需要频繁索引某个元素时，而不怎么在中间添加或者删除元素时优选。在不知道用什么时，`ArraryList`为首选
### LinkedList
内部是`双向链表`
优势：
- 增删快: 在列表的任意位置插入或删除元素效率高，只需要修改相邻节点的指针即可
缺点：
- 查询慢: 根据索引访问元素效率低，需要从头或尾开始遍历
使用场景: 写多读少的场景。当你需要频繁地在列表的开头、结尾或中间进行插入和删除操作时，LinkedList 的性能优势会非常明显

# Abstract Data Types vs. Concrete Implementations

