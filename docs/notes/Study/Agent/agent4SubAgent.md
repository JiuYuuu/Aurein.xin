---
title: Agent S04-SubAgent
createTime: 2026/04/17 16:41:03
permalink: /Study/Agent/subAgent/
---
> _"大任务拆小, 每个小任务干净的上下文"_ -- 子智能体用独立 messages[], 不污染主对话。

# 问题
在前面的代码我们得知，Agent 的记忆是通过 `message.append()`来维持的  
LLM 本身是无状态的，以我们必须把之前聊过的所有话、执行过的所有命令和结果，打包成一个的 `messages` 数组，每次都完整地发给它  
因此如果 当 Agent 去寻找这个项目用了什么测试框架 ，连续调用了 5 次 `read_file` 工具，读取了 `package.json`、`tox.ini`、`tests/` 目录下的几个大文件。这 5 个文件的源代码加起来可能有上万个字符；这些过程会被永久地塞进主 Agent 的 `messages` 数组里。随着它继续干其他活，这个数组会越来越胖，就会导致以下问题：
- API 费用大爆炸
- 上下文超载
- 注意力稀释
因此 我们需要 子 Agent 来解决以上的问题

# 解决方案
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

# 工作原理
父智能体有一个 `task` 工具。子智能体拥有除 `task` 外的所有基础工具 (禁止递归生成)
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