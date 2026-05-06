---
title: Agent S04-SubAgent
createTime: 2026/04/17 16:41:03
permalink: /Study/Agent/subAgent/
---
> _"大任务拆小, 每个小任务干净的上下文"_ -- 子智能体用独立 messages[], 不污染主对话。

## 问题
在前面的代码我们得知，Agent 的记忆是通过 `message.append()`来维持的  
LLM 本身是无状态的，以我们必须把之前聊过的所有话、执行过的所有命令和结果，打包成一个的 `messages` 数组，每次都完整地发给它  
因此如果 当 Agent 去寻找这个项目用了什么测试框架 ，连续调用了 5 次 `read_file` 工具，读取了 `package.json`、`tox.ini`、`tests/` 目录下的几个大文件。这 5 个文件的源代码加起来可能有上万个字符；这些过程会被永久地塞进主 Agent 的 `messages` 数组里。随着它继续干其他活，这个数组会越来越胖，就会导致以下问题：
- API 费用大爆炸
- 上下文超载
- 注意力稀释
因此 我们需要 子 Agent 来解决以上的问题

## 解决方案
```
Parent agent                     Subagent
+------------------+             +------------------+
| messages=[...]   |             | messages=[]      | <-- fresh
|                  |  dispatch   |                  |
| tool: task       | ----------> | while tool_use:  |
|   prompt="..."   |             |   call tools     |
|                  |  summary    |   append results |
|   result = "..." | <---------- | return last text |
+------------------+             +------------------+

Parent context stays clean. Subagent context is discarded.
```
## 关键数据结构
```python
class SubagentContext:
    messages: list
    tools: list
    handlers: dict
    max_turns: int
```
- `messages`：子智能体自己的上下文
- `tools`：子智能体可以调用哪些工具
- `handlers`：这些工具到底对应哪些 Python 函数
- `max_turns`：防止子智能体无限跑
## 工作原理
1. 父智能体有一个 `task` 工具。子智能体拥有除 `task` 外的所有基础工具 (禁止递归生成)
```python
    # 拼接 
PARENT_TOOLS = CHILD_TOOLS + [
    {"name": "task",
    # 生成一个带有全新上下文的子智能体
     "description": "Spawn a subagent with fresh context.",
     "input_schema": {
         "type": "object",
         "properties": {"prompt": {"type": "string"}},
         "required": ["prompt"],
     }},
]
```
2. **子智能体使用自己的消息列表**
```python
def run_subagent(prompt: str) -> str:
    sub_messages = [{"role": "user", "content": prompt}]
    ...
```
这就是隔离的关键。
不是共享父智能体的 `messages`，而是从一份新的列表开始  
3. 子智能体只拿必要工具
子智能体通常不需要拥有和父智能体完全一样的能力。
最小版本里，常见做法是：
- 给它文件读取、搜索、bash 之类的基础工具
- 不给它继续派生子智能体的能力
这样可以防止它无限递归
4. 只把结果带回父智能体
子智能体做完事后，不把全部内部历史写回去，而是返回一段总结
```python
return {
    "type": "tool_result",
    "tool_use_id": block.id,
    "content": summary_text,
}
```
## 循环
子智能体 `message = [] `， 运行自己的循环。只有最终文本返回给智能体
```python
def run_subagent(prompt: str) -> str:
    # 上下文物理隔绝
    sub_messages = [{"role": "user", "content": prompt}]
    for _ in range(30):  # safety limit 防止死循环
        response = client.messages.create(
            model=MODEL, system=SUBAGENT_SYSTEM, # 专属提示词
            messages=sub_messages,
            tools=CHILD_TOOLS, max_tokens=8000,  # 工具箱传入
        )
        sub_messages.append({"role": "assistant",
                             "content": response.content})
        if response.stop_reason != "tool_use":   # 任务完结判定
            break
        results = []     # 与主 Agent 的思路一致
        for block in response.content:
            if block.type == "tool_use":
                handler = TOOL_HANDLERS.get(block.name)
                output = handler(**block.input)
                results.append({"type": "tool_result",
                    "tool_use_id": block.id,
                    "content": str(output)[:50000]})
        sub_messages.append({"role": "user", "content": results})
        # 信息蒸馏
    return "".join(
        b.text for b in response.content if hasattr(b, "text")
    ) or "(no summary)"
```