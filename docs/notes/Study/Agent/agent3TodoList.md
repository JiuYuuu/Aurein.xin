---
title: Agent S03-ToDoWrite
createTime: 2026/04/17 16:30:38
permalink: /Study/Agent/ToDoWirte/
---
>_"没有计划的 agent 走哪算哪"_ -- 先列步骤再动手, 完成率翻倍

## 问题
在多步任务中，模型会丢失任务  
因为上下文膨胀会导致系统提示的影响力逐渐被稀释。现在的 LLM 底层都是基于 Transformer 框架的，核心是 注意力机制
- **注意力分配：** 当模型阅读上下文时，它会给每一个词分配一个“注意力权重”
- **近因效应（Recency Bias）：** 模型天生更容易关注**最近发生的事情**（即对话历史的最末端）
- **稀释效应：** 一开始，你的 System Prompt（比如：“你是一个严谨的重构专家，必须按步骤来”）在上下文中很显眼。但当中间塞进了几万字的工具执行日志后，System Prompt 被挤到了极遥远的“古代”。模型在计算注意力分布时，给系统提示词分配的权重变得微乎其微，它“忘了”自己的最初人设
一个 10 步重构可能做完 1-3 步就开始即兴发挥, 因为 4-10 步已经被挤出注意力了

## 解决方案
```
+--------+      +-------+      +---------+
|  User  | ---> |  LLM  | ---> | Tools   |
| prompt |      |       |      | + todo  |
+--------+      +---+---+      +----+----+
                    ^                |
                    |   tool_result  |
                    +----------------+
                          |
              +-----------+-----------+
              | TodoManager state     |
              | [ ] task A            |
              | [>] task B  <- doing  |
              | [x] task C            |
              +-----------------------+
                          |
              if rounds_since_todo >= 3:
                inject <reminder> into tool_result
```
## 关键数据结构
1. PlanItem
最小条目可以为：
```python
{
    "content": "Read the failing test",
    "status": "pending" | "in_progress" | "completed",
    "activeForm": "Reading the failing test",
}
```
这里的字段分别表示：

- `content`：这一步要做什么
- `status`：这一步现在处在什么状态
- `activeForm`：当它正在进行中时，可以用更自然的进行时描述

2.  PlanningState
除了计划条目本身，还应该有一点最小运行状态：

```python
{
    "items": [...],
    "rounds_since_update": 0,
}
```

`rounds_since_update` 的意思很简单：

> 连续多少轮过去了，模型还没有更新这份计划。

3. 状态约束
**同一时间，最多一个 in_progress**
强制模型聚焦于当前一步

# 最小实现
### 第一步：准备一个计划管理器

```python
class TodoManager:
    def __init__(self):
        self.items = []
```
### 第二步：允许模型整体更新当前计划

```python
def update(self, items: list) -> str:
    validated = []
    in_progress_count = 0

    for item in items:
        status = item.get("status", "pending")
        if status == "in_progress":
            in_progress_count += 1
        validated.append({
            "content": item["content"],
            "status": status,
            "activeForm": item.get("activeForm", ""),
        })

    if in_progress_count > 1:
        raise ValueError("Only one item can be in_progress")

    self.items = validated
    return self.render()
```
### 第三步：把计划渲染成可读文本

```python
def render(self) -> str:
    lines = []
    for item in self.items:
        marker = {
            "pending": "[ ]",
            "in_progress": "[>]",
            "completed": "[x]",
        }[item["status"]]
        lines.append(f"{marker} {item['content']}")
    return "\n".join(lines)
```

### 第四步：把 `todo` 接成一个工具

```python
TOOL_HANDLERS = {
    "read_file": run_read,
    "write_file": run_write,
    "edit_file": run_edit,
    "bash": run_bash,
    "todo": lambda **kw: TODO.update(kw["items"]),
}
```
### 第五步：如果连续几轮没更新计划，就提醒

```python
if rounds_since_update >= 3:
    results.insert(0, {
        "type": "text",
        "text": "<reminder>Refresh your plan before continuing.</reminder>",
    })
```

这一步的核心意义不是“催促”本身，而是：

> 系统开始把“计划状态是否失活”也看成主循环的一部分。

## 实现

```python
# TodoManager 存储带状态的项目。同一时间只允许一个 in_progress
class TodoManager:
    def update(self, items: list) -> str:
        validated, in_progress_count = [], 0
        for item in items:
            status = item.get("status", "pending")
            if status == "in_progress":
                in_progress_count += 1
            validated.append({"id": item["id"], "text": item["text"],
                              "status": status})
        if in_progress_count > 1:
            raise ValueError("Only one task can be in_progress")
        self.items = validated
        return self.render()
```

```python
# 模型连续 3 轮以上不调用 `todo` 时注入提醒
if rounds_since_todo >= 3 and messages:
    last = messages[-1]
    if last["role"] == "user" and isinstance(last.get("content"), list):
        last["content"].insert(0, {
            "type": "text",
            # xml 标签
            "text": "<reminder>Update your todos.</reminder>",
        })
```