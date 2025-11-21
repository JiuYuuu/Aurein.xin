---
title: week2 References, Recursion, IntLists
createTime: 2025/11/07 14:23:22
permalink: /CS61B/week21/
---

## 前言
首先由一道题目引入这节课的正题：
```java
public static void main(String[] args) {
	Walrus walrus = new Walrus(3500, 10.5);
	int x = 9;
	dostuff(walrus, x);
	System.out.println(walrus);
	System.out.println(x);
public static void dostuff(Walrus W, int x){
	W.weight = W.weight - 100;
	x = x - 5;
```
那么 该程序会输出什么？
```java
3400 
9
```
为什么 x 的值会输出为 9 呢 而不是 4？为什么 Walrus 的值会发生变化呢
`dostuff` 方法**成功**地将 `walrus` 的体重从 3500 修改为了 3400。 但是，它**没能**将 `x` 的值从 9 修改为 4。

**为什么？** 答案在于 Java 如何在内存中处理这两种完全不同的变量类型：**原始类型 (Primitive Types)** 和**引用类型 (Reference Types)**。

# Declaring a Variable

当你声明一个特定的变量时， Java 会自动为其找到一个连续的内存块，其大小刚好可以容纳该类型的数据，例如，如果你声明一个 int 类型的变量，就会获得一个 32 位的内存块；如果你声明一个 byte 类型的变量，则会获得一个 8 位的内存块。Java 中每种数据类型所占用的位数各不相同

为了方便理解，我们将其比喻为一个盒子，除了预留内存外，Java解释器还会在内部表中创建一个条目，将每个变量名映射到该盒子中第一个比特的位置
# The Golden Rule of Equals (GRoE)

> **`b = a` 永远只做一件事：把 `a` 盒子里的位元 (bits) 原封不动地复制到 `b` 盒子里**

这个法则是理解一切的关键。它如何应用，完全取决于盒子里装的是什么
# Primitive type
### 是什么？
**原始类型**是 Java 中内置的 8 种基本类型，如 int、double、boolean等
### 储存
名为变量的 “盒子” 将存储着值本身
每种不同的数据类型所占用的内存大小是不一样的，
如表所示

| 类型类别 | 数据类型      | 占用空间 | 默认值      | 说明                      |
| ---- | --------- | ---- | -------- | ----------------------- |
| 整数类型 | `byte`    | 1字节  | 0        | 范围：-128 到 127，适合节省空间    |
|      | `short`   | 2字节  | 0        | 范围：-32,768 到 32,767     |
|      | `int`     | 4字节  | 0        | 最常用的整数类型                |
|      | `long`    | 8字节  | 0L       | 范围更大，结尾需加 `L`           |
| 浮点类型 | `float`   | 4字节  | 0.0f     | 单精度，结尾需加 `f`            |
|      | `double`  | 8字节  | 0.0      | 双精度，默认浮点类型              |
| 字符类型 | `char`    | 2字节  | '\u0000' | 存储单个字符，使用单引号            |
| 布尔类型 | `boolean` | 1位   | false    | 只有 `true` 和 `false` 两个值 |
### 为什么 x 没有变？

简单理解：
`main` 这个方法里有一个 叫 `x`的盒子，里面的值是 9
在调用 `dostuff` 时，Java 为其参数创造了新的盒子、独立的盒子`x_method`
Java 将盒子内的位元 9 复制到  `x_method`
在 `dostuff` 方法执行后，修改的值时 `x_method` 内的值，而 `main` 中的值没有变过

# Reference Types

### 是什么？
引用类型是 Java 中除了基本类型以外的所有类型。它们**引用**堆内存中的对象，而不是直接存储值
以下为常见的类型：

|类型类别|示例|特点说明|
|---|---|---|
|类（Class）|`String`, `Scanner`, 自定义类|最常见的引用类型，使用 `new` 创建对象|
|接口（Interface）|`List`, `Runnable`|定义行为规范，不能直接实例化|
|数组（Array）|`int[]`, `String[]`|所有数组都是引用类型，即使是 `int[]`|
|枚举（Enum）|`DayOfWeek`, 自定义枚举|特殊的类，表示有限常量集合|
|注解（Annotation）|`@Override`, `@Deprecated`|编译器和运行时使用的元数据|
- **存储的是对象的地址（引用）**，而不是对象本身
    
- **默认值为** `null`，表示未引用任何对象
    
- **可以调用方法**，因为它们是对象
    
- **支持继承、多态、接口实现等面向对象特性**

### 存储
Reference types盒子里装的并非是的对象本身，而是**指向对象**的 地址和箭头

### Object Instantiation

当我们使用 new（例如 Dog、Walrus、Planet）实例化一个对象时，Java 首先会为类的每个实例变量分配一个存储空间，并用**默认值**填充。然后构造函数通常（但并非总是）会将这些存储空间中的值替换为其他值
### 为何 walrus 按引用值传递了？

同样使用黄金法则可以了解
#  Parameter Passing

当你将参数传递给函数时，实际上也只是在复制比特位。换句话说，GRoE 同样适用于参数传递。这种复制比特位的方式通常被称为“按值传递”。在 Java 中，我们始终是按值传递的。

# Arrays.equals vs. ==

在 Java 中，`==` 运算符直接比较的是两个内存单元中的二进制位
例如
```java
int[] x = new int[]{0, 1, 2, 95, 4};
int[] y = new int[]{0, 1, 2, 95, 4};
System.out.println(x == y); //false
```
所以返回 false ，对此，我们可以使用：
```java
Array.equals(x, y); //true
```

# IntList

在理解了 海豹谜题 后，我们可以自己着手构建列表类了

首先实现一个基本的列表类：
```java
public class IntList {
    public int first;
    public IntList rest;  // 它不存储 `IntList` 对象本身，而是存储一个指向“堆内存”中另一个 `IntList` 对象的地址

    public IntList(int f, IntList r) {
        first = f;
        rest = r;
    }
}
```

使用 火车 的类比来理解 IntList

```java
public class IntList {  
    public int head;     // 这节车厢装载的“货物”（一个整数）  
    public IntList tail; // 指向“下一节车厢”的“连接器”  
  
    // 构造方法  
    public IntList(int h, IntList t) {  
        head = h;  
        tail = t;  
    }  
  
	// 1. 创建最后一节车厢 (30) // 它的 "head" 是 30, "tail" 是 null (表示结束) 
	IntList L3 = new IntList(30, null); 
	// 2. 创建倒数第二节车厢 (20) // 它的 "head" 是 20, "tail" 指向 L3 (30那节车厢) 
	IntList L2 = new IntList(20, L3); 
	// 3. 创建第一节车厢 (10) // 它的 "head" 是 10, "tail" 指向 L2 (20那节车厢)
	IntList L1 = new IntList(10, L2); 
	 // L1 就是我们整个列表的“火车头” // IntList L = L1; 
}
```
链式调用：
```java
IntList L = new IntList(10, new IntList(20, new IntList(30, null)));
```

```text
L (指向第一节车厢)
 | 
 V
 +----------+ +----------+ +----------+ 
 | head: 10 | | head: 20 | | head: 30 | 
 | tail: ---|--->| tail: ---|--->| tail: null | 
 +----------+ +----------+ +----------+
```
精简写法：
```java
IntList lst = IntList.of(1, 2, 3);
// 无法直接修改 lst 中的元素值
// lst.first = 4; // 这通常会导致编译错误或运行时异常
```
但是 `of` 这种写法有部分局限性：
首先是 ：
- 不可变性
-  固定长度，无法使用 `add` `remove` 等语法

## size
如何获取列表的大小？看下列倒序创建的列表
```java
public class IntList {
    public int first;
    public IntList rest;  

    public IntList(int f, IntList r) {
        first = f;
        rest = r;
    }
    public static void main(String[] args) {
	    IntList L = new IntList(15, null);
	    L = new IntList(10, L);
	    L = new IntList(5, L);
    }
}

```
我们将第一个表称为 A，第二个为 B，以此类推
### 递归
使用**递归**的方法获取列表大小
```java
public int size() {
	if (this.rest == null) {
		return 1;
	}
	return 1 + this.rest.size()
}

System.out.println(L.size());  // 3
```
拆解一下运行的过程：
首先 `this.rest` 第一个传入的 `A.rest`，显然它指向的是 `B`，并不等于 null，于是程序向下执行  
`B.rest.size()` 显然并不知道大小，于是 再次 来到 `if` 行  
然而`B.rest` 显然是指向 `C` 的   
于是继续转向 `if` 行，  显然 `C.rest` 是 null 返回 1  
转到 return 行， 1 + C.size( )  
于是又回到了头上  
显然， `C.rest` 是 null，于是返回 1
最后得出 1 + 2 = 3

### 迭代
使用**迭代**的方式获得
```java
public int iterativeSize() {
	IntList L = this;
	
	int totalSize = 0;
	while (p != null) {
		totalSize += 1;
		p = p.rest
	}
	return totalSize;
}
```

## get

那么如何获取列表内的元素呢？

```java
public int get(int i) {
	if (i == 0) {
		return this.first;
	}
	return this.rest.get(i - 1);
}
```
依旧递归