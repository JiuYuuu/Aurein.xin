---
title: HW0a
createTime: 2025/09/26 20:23:50
permalink: /CS61B/ngeo9u0i/
---
> 题目来源于 sp25 的 HW

项目一：打印右对齐星号矩阵
```java
public static void starTriangle() {  
    // TODO: Fill in this function  
    for (int i = 1;i <= 5; i++) {  
        for (int j = 0; j < 5 - i; j++) {  
            System.out.print(" ");  
        }  
        for (int j = 1;j <= i;j++) {  
            System.out.print("*");  
        }  
        System.out.println();  
    }  
}
```

输出结果：
```java
    *
   **
  ***
 ****
*****
```
反思：主要就是熟悉 Java 这门语言的条件循环


## 项目二  PrintIndexed
任务要求：

这个函数接收一个字符串 `s` 作为参数。你需要遍历这个字符串，对于每一个字符，打印出该字符，并紧接着打印出它的“反向索引”

Example: printIndexed("hello") -> h4e3l2l1o0

在开始前，我们需要了解一个方法 `s.charAt(i)`
意思是 **"character at"**（...位置上的字符）
功能十分直接：获取字符串 `s` 中指定索引 `i` 位置上的字符
```java
public static void printIndexed(String s) {  
    // TODO: Fill in this function  
    for (int i = 0; i < s.length(); i++) {  
        int index = s.length() - 1 - i;  
        System.out.print("" + s.charAt(i) + index);  
    }  
}
```
反思：这次的问题出在了结果的输出上
`print(char + int)`
当你使用 `+` 号连接一个 `char` 和一个 `int` 时，Java 不会把它们当作字符串拼在一起。它会执行**数学加法**运算
所以，我们要用到**字符串拼接**
- 在表达式的开头加上一个空字符串 `""`
```java
// 错误的方式 (数学加法)
System.out.print(s.charAt(i) + index);

// 正确的方式 (字符串拼接)
System.out.print("" + s.charAt(i) + index);
```

## 项目三
任务要求：
返回一个新的字符串，其中给定字符串的每个字符都被重复两次。 *
示例：stutter("hello") -> "hheelllloo"
```java
public static String stutter(String s) {  
    // TODO: Fill in this function  
    String result = "";  
    for (int i = 0; i < s.length(); i++) {  
        char ch = s.charAt(i);  
        result =   result + ch + ch;  
    }  
    return result;  
}
```
反思：使用简单的字符串拼接即可完成。但是用这种方式写会导致 IDEA 出现黄色警告：循环中的字符串串联 '+' 问了下 AI 说是可以用 `StringBuilder` 解决，稍后可以去了解一下

## 项目四
任务要求：
* 判断一个笛卡尔坐标 (x, y) 所在的象限。 
* 返回值： * 1 代表第一象限 (x > 0, y > 0)， 
* 2 代表第二象限 (x < 0, y > 0)，
* 3 代表第三象限 (x < 0, y < 0)， 
* 4 代表第四象限 (x > 0, y < 0)， 
* 0 如果该点位于坐标轴上

```java
public static int quadrant(int x, int y) {  
    // TODO: Fill in this function  
    if (x > 0 && y > 0) {  
        return 1;  
    } else if (x < 0 && y > 0) {  
        return 2;  
    }  else if (x < 0 && y < 0) {  
        return 3;  
    } else if (x > 0 && y < 0) {  
        return 4;  
    } else {  
        return 0;  
    }  
}
```