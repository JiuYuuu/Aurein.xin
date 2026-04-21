---
title: Agent S01-Loop
createTime: 2026/03/31 16:19:08
tags:
    - Agent
permalink: /Study/Agent/agentLoop/
---

 > _"One loop & Bash is all you need"_ -- 一个工具 + 一个循环 = 一个智能体。

## 问题
大模型可以帮你推理代码，但是它不能帮你直接跑测试，生成文件，每一次工具的调用实际上都是你手动把结果粘贴回大模型，在这其中你自己粘贴回去的过程就是循环，如果没有一层代码在中间反复做这件事，那大模型只能是一个“会说话的程序”，而不是一个“会干活的 Agent”
所以核心目标只有一个：
**把“模型 + 工具”连接成一个能持续推进任务的主循环**

## 关键数据结构
#### 1. Message
在最小教学版，可以暂时将消息理解为
```python
{"role": "user", "content": "..."}
{"role": "assistant", "content": [...]}
```
**消息历史不是聊天记录展示层，而是模型下一轮要读的工作上下文**
#### 2. Tool Result Block
当工具执行完后，我们要把它包装回消息流
```python
{
    "type": "tool_result",
    "tool_use_id": "...",
    "content": "...",
}
```
`tool_use_id`的作用就是 **告诉模型“这条结果对应的是你刚才哪一次工具调用”**
#### 3. LoopState
在 Agent 开发里， 不要只使用零散的局部变量，否则在后期维护时将是地狱难度  
最小也应该是显示收拢出一个循环状态
```python
state = {
    "messages": [...],
    "turn_count": 1,
    "transition_reason": None,
}
```
这里的 `transition_reason` 先只需要理解成：

> 这一轮结束后，为什么要继续下一轮

最小教学版只用一种原因就够了：

```python
"tool_result"
```
也就是：
> 因为刚执行完工具，所以要继续
## 解决方案

```
+--------+      +-------+      +---------+
|  User  | ---> |  LLM  | ---> |  Tool   |
| prompt |      |       |      | execute |
+--------+      +---+---+      +----+----+
                    ^                |
                    |   tool_result  |
                    +----------------+
                    (loop until stop_reason != "tool_use")
                    
                    
while stop_reason == "tool_use":
	response = LLM(messages, tools)
	execute tools
	append results
	
This is the core loop: feed tool results back to the model
until the model decides to stop. Production agents layer
policy, hooks, and lifecycle controls on top.
```

## 最小实现
**第一步： 准备初始消息**
用户的请求首先进入 `message`
```python
messages = [{"role": "user", "content": query}]
```
**第二步：调用模型**
把消息历史、system prompt 和工具定义一起发给模型：
```python
response = client.messages.create(
    model=MODEL,
    system=SYSTEM,
    messages=messages,
    tools=TOOLS,
    max_tokens=8000,
)
```
**第三步：追加 assistant 回复**
```python
messages.append({"role": "assistant", "content": response.content})
```

这一步非常重要
很多初学者会只关心“最后有没有答案”，忽略把 assistant 回复本身写回历史。  
这样一来，下一轮上下文就会断掉
**第四步：如果模型调用了工具，就执行**
```python
results = []
for block in response.content:
    if block.type == "tool_use":
        output = run_bash(block.input["command"])
        results.append({
            "type": "tool_result",
            "tool_use_id": block.id,
            "content": output,
        })
```
**第五步：把工具结果作为新消息写回去**
```python
messages.append({"role": "user", "content": results})
```
然后下一轮重新发给模型

**完整的实现如下**
最小 agent loop：
```python
def agent_loop(state):
    while True:
        response = client.messages.create(
            model=MODEL,
            system=SYSTEM,
            messages=state["messages"],
            tools=TOOLS,
            max_tokens=8000,
        )

        state["messages"].append({
            "role": "assistant",
            "content": response.content,
        })

        if response.stop_reason != "tool_use":
            state["transition_reason"] = None
            return

        results = []
        for block in response.content:
            if block.type == "tool_use":
                output = run_tool(block)
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": output,
                })

        state["messages"].append({"role": "user", "content": results})
        state["turn_count"] += 1
        state["transition_reason"] = "tool_result"
```
旧版本：
```python
def agent_loop(query):
  # 用户 prompt 作为第一条消息 
    messages = [{"role": "user", "content": query}]
    while True:
  # 将消息和工具定义一起发给 LLM 
        response = client.messages.create(
            model=MODEL, system=SYSTEM, messages=messages,
            tools=TOOLS, max_tokens=8000,
        )
  # 追加助手响应。检查 stop_reason -- 如果模型没有调用工具，则结束
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason != "tool_use":
            return
  # 执行每个工具调用，收集结果，作为 user 消息追加，回到第 2 步
        results = []
        for block in response.content:
            if block.type == "tool_use":
                output = run_bash(block.input["command"])
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": output,
                })
        messages.append({"role": "user", "content": results})
```

