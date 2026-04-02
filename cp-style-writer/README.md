# 博客风格写作助手 (cp-style-writer)

用于 Cursor 的 Agent Skill：让 AI 按博客风格写作，输出纯中文内容。

## 功能说明

- **风格**：专业但诙谐幽默的博客文风
- **特点**：悬念式标题、口语化开头、插入语词库（讲真、有一说一、翻译成人话）、让步转折、数据引用、结尾升华
- **适用场景**：科技产品评测、行业事件分析、数码评论、互联网热点解读等
- **适用主题**：科技产品、互联网事件、行业分析、数码评测等

## 安装方式（Cursor）

### 方式一：复制到个人 skills 目录（推荐）

```bash
# 克隆本仓库后，将本文件夹复制到 Cursor 个人 skills 目录
cp -r cp-style-writer ~/.cursor/skills/
```

安装后，在所有项目中都可使用该 skill。

### 方式二：复制到项目内

```bash
# 在项目根目录创建 .cursor/skills，并放入本 skill
mkdir -p .cursor/skills
cp -r cp-style-writer .cursor/skills/
```

仅当前项目内的 Cursor 会加载该 skill。

## 使用方式

在 Cursor 对话中说出触发意图即可，例如：

- 「用博客风格写一篇 iPhone 评测」
- 「按博客风格分析一下这次 AI 模型的更新」
- 「用博客风格写一个数码产品的开箱体验」
- 「写一篇博客风格的行业观察」

AI 会按本 skill 的规则输出纯中文内容，长短与你的需求或输入规模相当，无需额外说明。

## 文件结构

```
cp-style-writer/
├── README.md     # 本说明（开源/安装用）
├── SKILL.md      # Cursor Agent Skill 主文件
└── examples.md   # 风格示例与句式参考
```

## 开源协议

与仓库保持一致，供学习与二次使用。