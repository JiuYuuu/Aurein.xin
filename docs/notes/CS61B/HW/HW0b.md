---
title: HW0b
createTime: 2025/09/27 17:21:58
permalink: /CS61B/hwob/
---
：：：warning 
这是一篇未完成文章
：：：

# JavaExercises

## 简单数组训练
#### 任务一
返回数组 array \[1, 2, 3, 4, 5, 6]
```java
/** Returns an array [1, 2, 3, 4, 5, 6] */  
public static int[] makeDice() {  
    // TODO: Fill in this function.  
    return new int[]{1, 2, 3, 4, 5, 6};  
}
```
#### 任务二
\* Returns the order depending on the customer.  
 \*  If the customer is Ergun, return \["beyti", "pizza", "hamburger", "tea"]. 
 \*  If the customer is Erik, return \["sushi", "pasta", "avocado", "coffee"]. 
 \*  In any other case, return an empty String\[] of size 3. 
 ```java
 public static String[] takeOrder(String customer) {  
    // TODO: Fill in this function.  
    if ("Ergun".equals(customer)) {  
        return new String[]{"beyti", "pizza", "hamburger", "tea"};  
    } else if ("Erik".equals(customer)) {  
        return new String[]{"sushi", "pasta", "avocado", "coffee"};  
    } else {  
        return new String[3];  
    }  
}
 ```
 
 #### 任务三
返回给定数组中**最大元素**和**最小元素**之间的**正差值**。假定给定的数组是非空的
```java
public static int findMinMax(int[] array) {  
    // TODO: Fill in this function.  
    int min = array[0];  
    int max = array[0];  
    for (int i : array) {  
        if (i > max) {  
            max = i;  
        }  
        if (i < min) {  
            min = i;  
        }  
    }  
    return max - min;
}
```
 思路是新建两个变量分别储存最大值与最小值，遍历后更新变量的值
#### 任务四 冰雹序列

**目标**: 使用**递归**来计算从输入数字 `n` 开始的**冰雹序列 (hailstone sequence)**，并将该序列以一个整数列表（`List<Integer>`）的形式返回。

**冰雹序列的规则如下**：

1. 从一个正整数 `n` 开始。
    
2. 如果 `n` 是**偶数**，则将 `n` 除以 2。
    
3. 如果 `n` 是**奇数**，则将 `n` 乘以 3 再加 1。
    
4. 重复这个过程，直到 `n` 变为 1。

```java
private static List<Integer> hailstoneHelper(int x, List<Integer> list) {  
    // TODO: Fill in this function.  
    list.add(x);  
    if (x == 1){  
        return list;  
    }  
  
    if (x % 2 ==0) {  
        return  hailstoneHelper(x / 2, list);  
    } else {  
        return hailstoneHelper(x * 3 + 1, list);  
    }  
}
```

采用了递归的思想

# ListExpercises

## 任务一：返回总和
/** Returns the total sum in a list of integers \*/

```java
public static int sum(List<Integer> L) {  
    // TODO: Fill in this function.  
    int sum = 0;  
    for (int num : L){  
        sum += num;  
    } return sum;  
}
```

## 任务二：返回列表内偶数
/** Returns a list containing the even numbers of the given list \*/

```java
public static List<Integer> evens(List<Integer> L) {  
    // TODO: Fill in this function.  
  List<Integer> evens = new ArrayList<>();  
  for (int num : L){  
      if (num % 2 == 0){  
        evens.add(num);  
      }  
  } return evens;  
}
```

## 任务三： 返回两列表内相同的数
/** Returns a list containing the common item of the two given lists \*/
第一种，嵌套循环
```java
public static List<Integer> common(List<Integer> L1, List<Integer> L2) {  
    List<Integer> common = new ArrayList<>();  
    for (int num1 : L1){  
        for (int num2 : L2){  
            if (num1 == num2){  
                common.add(num1);  
                break;  
            }  
        }  
    } return common;  
}
```
第二种，contains
```java
public static List<Integer> common(List<Integer> L1, List<Integer> L2){
	List<Integer> common = new Arrary<>();
	for (int num1 : L1){
		if (L2.contains(num1)){
			common.add(num1)
		}
	} return common;

}
```

## 任务四 返回字符 c 在列表出现的次数

```java
public static int countOccurrencesOfC(List<String> words, char c) {  
    // TODO: Fill in this function.  
    int times = 0;  
    for (String word : words) {  
        for (char letter : word.toCharArray()) {  
            if (letter == c) {  
            times++;  
            }  
        }  
    } return times;  
}
```
还可以使用charAt进行查找　　　　