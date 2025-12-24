---
title: WEEK2 - SLLists, Nested Classes, Sentinel Nodes
createTime: 2025/11/21 09:12:35
permalink: /CS61B/week22/
---

## IntNode

首先来看 IntNode 的代码

```java
public class IntNode {
    public int item;      // 数据 (通常改名叫 item)
    public IntNode next;  // 指向下一个的指针 (通常改名叫 next)

    public IntNode(int i, IntNode n) {
        item = i;
        next = n;
    }
}
```

为什么要这么写？这就涉及到一个思想——封装

在 IntList 中，我们要对其管理是一件很麻烦且容易犯错的事情，裸露的 IntList 需要用户去直接操控节点，而 IntNode 相当于一个中介，它指向底层裸漏的递归列表，用户只需要配合 SLList 就可以直接对链表进行操作



## SLList

首先来看单链表的的代码

```java
public class SLList {
  private static class IntNode;
    public int item;
    public IntNode next;
  
  public IntNode(int i, IntNode n) {
    item = i;
    next = n;
  }

  private IntNode first;

  public SLList(int x) {
    first = new IntNode(x, null);
  }

  public void addFirst(int x){
    first = new IntNode(x, first);
  }

  public int getFirst() {
    return first.item;
  }
}
```

由此见得，用户在访问链表，添加数据时相较于 IntList 已经变得十分的方便



### addLast and Size()

在根据上文可以得出，
