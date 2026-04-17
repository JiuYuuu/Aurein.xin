---
title: Agent S05-Skills
createTime: 2026/04/17 16:42:23
permalink: /Study/Agent/Skills/
---
> _"用到什么知识, 临时加载什么知识"_ -- 通过 tool_result 注入, 不塞 system prompt

# 问题

你希望智能体遵循特定领域的工作流: git 约定、测试模式、代码审查清单。全塞进系统提示太浪费 -- 10 个技能, 每个 2000 token, 就是 20,000 token, 大部分跟当前任务毫无关系
# 解决方案
```
System prompt (Layer 1 -- always present):
+--------------------------------------+
| You are a coding agent.              |
| Skills available:                    |
|   - git: Git workflow helpers        |  ~100 tokens/skill
|   - test: Testing best practices     |
+--------------------------------------+

When model calls load_skill("git"):
+--------------------------------------+
| tool_result (Layer 2 -- on demand):  |
| <skill name="git">                   |
|   Full git workflow instructions...  |  ~2000 tokens
|   Step 1: ...                        |
| </skill>                             |
+--------------------------------------+
```
Layer 1 ： 系统提示中放技能名称（低成本） Layer 2 ：tool_result 中按需放完整内容

# 工作原理

##### 每个技能是一个目录, 包含 `SKILL.md` 文件和 YAML frontmatter
```
skills/
  pdf/
    SKILL.md       # ---\n name: pdf\n description: Process PDF files\n ---\n ...
  code-review/
    SKILL.md       # ---\n name: code-review\n description: Review code\n ---\n ...
```
- 将大模型的 prompt 和 python 业务代码彻底物理解耦
- 方便添加新的 skills


##### SkillLoader 递归扫描 `SKILL.md` 文件, 用目录名作为技能标识
```python
class SkillLoader:
    # 传入路径，扫描 skills 注册 meta 字典
    def __init__(self, skills_dir: Path):
        self.skills = {}
    # rglob 递归搜索，找出路径下所有 SKILL.mds
    # 使用 sorted 防御性编程，去除操作系统的随机性等
    # 保证了 Agent 行为的绝对确定性
        for f in sorted(skills_dir.rglob("SKILL.md")):
            text = f.read_text()
    # 文档切片，上半部分为 meta 字典，下半部分为 body 字符串
    # python 中 _ 开头意味着私有方法
            meta, body = self._parse_frontmatter(text)
    # 查找字典内的 name 如果没有则去拿父文件夹的文件名作为 name
            name = meta.get("name", f.parent.name)
            self.skills[name] = {"meta": meta, "body": body}
    # 遍历上一步的词典，提取 skill 名和简介，拼接为字符串
    def get_descriptions(self) -> str:
        lines = []
    # 遍历 skills 打包好的 tuple
        for name, skill in self.skills.items():
            desc = skill["meta"].get("description", "")
            lines.append(f"  - {name}: {desc}")
        return "\n".join(lines)
    # Layer2 核心
    def get_content(self, name: str) -> str:
    # 查字典：去 self.skills 里找键为 "code-review" 的数据包
        skill = self.skills.get(name)
    # 防幻觉
        if not skill:
            return f"Error: Unknown skill '{name}'."
    # 格式化字符串，拼接数据
    # 它取出 skill 里的 'body'
        return f"<skill name=\"{name}\">\n{skill['body']}\n</skill>"
```

##### 第一层写入系统提示。第二层不过是 dispatch map 中的又一个工具
```python
SYSTEM = f"""You are a coding agent at {WORKDIR}.
Skills available:
{SKILL_LOADER.get_descriptions()}"""

TOOL_HANDLERS = {
    # ...base tools...
    "load_skill": lambda **kw: SKILL_LOADER.get_content(kw["name"]),
}
```
模型知道有哪些技能 (便宜), 需要时再加载完整内容 (贵)