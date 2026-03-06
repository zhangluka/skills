# 小约翰可汗风格文案写手 (xiaojohn-style-writer)

用于 Cursor 的 Agent Skill：让 AI 按 B 站 UP 主「小约翰可汗」的风格写作，输出纯中文内容。

## 功能说明

- **风格**：北方口语、高信息密度、让步转折句式、废话文学、超长戏谑称号、大厂黑话魔改、通辽宇宙、评书式叙事、结尾理想主义升华。
- **适用场景**：视频解说稿、日常吐槽、博客润色、朋友圈/社交媒体文案等，篇幅与用户需求或输入规模相当。
- **适用主题**：历史事件、国家/人物小传、硬核狠人、产品吐槽、事件评论、生活感慨等。

## 安装方式（Cursor）

### 方式一：复制到个人 skills 目录（推荐）

```bash
# 克隆本仓库后，将本文件夹复制到 Cursor 个人 skills 目录
cp -r xiaojohn-style-writer ~/.cursor/skills/
```

安装后，在所有项目中都可使用该 skill。

### 方式二：复制到项目内

```bash
# 在项目根目录创建 .cursor/skills，并放入本 skill
mkdir -p .cursor/skills
cp -r xiaojohn-style-writer .cursor/skills/
```

仅当前项目内的 Cursor 会加载该 skill。

## 使用方式

在 Cursor 对话中说出触发意图即可，例如：

- 「用小约翰风格写一段智利 1973 年政变的解说稿」
- 「按通辽风格吐槽一下某某产品/服务」
- 「用小约翰风格润色这段博客」
- 「写一条小约翰风格的朋友圈文案」

AI 会按本 skill 的规则输出纯中文内容，长短与你的需求或输入规模相当，无需额外说明。

## 文件结构

```
xiaojohn-style-writer/
├── README.md     # 本说明（开源/安装用）
├── SKILL.md      # Cursor Agent Skill 主文件
└── examples.md   # 风格示例与句式参考
```

## 开源协议

与仓库保持一致，供学习与二次使用。

## 致谢

风格原型来自 B 站 UP 主 [小约翰可汗](https://space.bilibili.com/206214)，本 skill 仅作模仿练习与创作辅助，与 UP 本人无关联。
