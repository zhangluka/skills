# Skills Toolbox

个人 `Claude Code` 技能库 — 写作风格、内容创作、开发工具。自用为主，持续迭代。

**5** skills · **3** categories · **~860** lines of SKILL.md

---

### Writing Style · 写作风格

| Skill | Description | Trigger |
|-------|-------------|---------|
| **[xiaojohn-style-writer](xiaojohn-style-writer/)** | 小约翰可汗风格写作 — 北方口语、高信息密度、让步转折句式、评书式叙事、结尾升华。适用于视频脚本、日常吐槽、博客润色、朋友圈文案。 | `/xiajohn-style-writer` |
| **[grain-plan-writer](grain-plan-writer/)** | 谷雨计划公众号长文写作 — 从素材到成稿的完整工作流。支持 PDF、brief、新闻链接、语音转文字等多种输入形式。 | `/grain-plan-writer` |
| **[cp-style-writer](cp-style-writer/)** | 博客风格写作 — 专业但诙谐幽默，悬念式标题、口语化开头、数据引用、结尾升华。适用于科技评测、行业分析、数码评论。 | `/cp-style-writer` |

### Development · 开发工具

| Skill | Description | Trigger |
|-------|-------------|---------|
| **[bobby-sweeper](bobby-sweeper/)** | 会话临时文件清理 — 扫描 Claude Code 产生的临时文件，三级安全风险评估（安全/注意/危险），确认后执行清理，释放磁盘空间。 | `/bobby-sweeper` |

### Code Generation · 代码生成

| Skill | Description | Trigger |
|-------|-------------|---------|
| **[ai-template-generator](ai-template-generator/)** | AI 驱动项目模板生成 — 通过结构化文档 + AI 模型生成企业级项目模板，替代传统 CLI 初始化。支持 React、Vue、Node.js 等技术栈。 | `/ai-template-generator` |

---

### Install · 安装

```bash
# 克隆到本地
git clone git@github.com:zhangluka/skills.git

# 链接到 Claude Code skills 目录
ln -s $(pwd)/skills/* ~/.claude/skills/

# 或只安装单个 skill
ln -s $(pwd)/skills/bobby-sweeper ~/.claude/skills/
```

### Structure · 目录结构

```
skills/
├── xiaojohn-style-writer/
│   └── SKILL.md
├── grain-plan-writer/
│   └── SKILL.md
├── cp-style-writer/
│   └── SKILL.md
├── bobby-sweeper/
│   └── SKILL.md
└── ai-template-generator/
    ├── SKILL.md
    ├── docs/
    └── examples/
```

---

自用技能库，持续迭代中。每个 skill 遵循 [Claude Code SKILL.md 规范](https://docs.anthropic.com/en/docs/claude-code/skills)，可直接通过 `/skill-name` 调用。
