# Skills Toolbox

个人 `Claude Code` 技能库 — 写作风格、内容创作、开发工具。自用为主，持续迭代。

**12** skills · **5** categories

---

### Grain Plan · 谷雨计划内容创作链路

| Skill | Description | Trigger |
|-------|-------------|---------|
| **[grain-plan-writer](grain-plan-writer/)** | 公众号长文写作 — 含流水线调度，自动编排 research → topic-gen → writing → proofreading | 写文章、稿子、帮我写 |
| **[grain-research](grain-research/)** | 结构化调研 — 增量保存到文件，防会话截断丢失 | 调研、查一下、搜索资料 |
| **[grain-topic-gen](grain-topic-gen/)** | 选题生成 — 3-4个方向，含标题、大纲、优劣分析 | 选题、写什么、方向 |
| **[grain-proofreading](grain-proofreading/)** | 三轮审校 — 6类AI腔识别，目标AI检测率<30% | 审校、去AI味、校对 |
| **[grain-material-search](grain-material-search/)** | 个人素材库 — 从历史内容搜索可复用的真实素材 | 素材、案例、之前写过的 |

创作流水线：`research → topic-gen → plan-writer → proofreading`

### X/Twitter · 推特运营

| Skill | Description | Trigger |
|-------|-------------|---------|
| **[dashen-x-battle-plan-v2](dashen-x-battle-plan-v2/)** | X内容作战计划 — 数据分析 + 30天计划 + 执行复盘，支持首次分析/7天复盘/季度复盘 | 内容作战计划、X创作计划 |
| **[high-impact-promo-posts](high-impact-promo-posts/)** | 多平台推广帖 — 追热点、要互动，覆盖小红书/公众号/头条/X | 写推广帖、追热点 |

### Writing Style · 写作风格

| Skill | Description | Trigger |
|-------|-------------|---------|
| **[xiaojohn-style-writer](xiaojohn-style-writer/)** | 小约翰可汗风格 — 北方口语、高信息密度、评书式叙事、结尾升华 | 小约翰风格、通辽风格 |
| **[chinese-multi-platform-content](chinese-multi-platform-content/)** | 一稿多平台适配 — X/公众号/小红书/头条，平台化格式和语气调整 | 多平台发布、适配 |

### Design · 设计

| Skill | Description | Trigger |
|-------|-------------|---------|
| **[huashu-design](huashu-design/)** | HTML设计能力 — 原型/Demo/幻灯片/动画，20种设计哲学，支持导出MP4/GIF | 做原型、设计Demo、HTML演示 |

### System · 系统工具

| Skill | Description | Trigger |
|-------|-------------|---------|
| **[bobby-sweeper](bobby-sweeper/)** | 会话临时文件清理 — 三级安全风险评估，确认后执行清理 | 清理临时文件 |
| **[self-review](self-review/)** | 周复盘 — 分析任务模式，生成改进策略，更新记忆 | 周复盘、自我进化 |

---

### Install · 安装

```bash
# 克隆到本地
git clone git@github.com:zhangluka/bobby-skills.git

# 链接到 Claude Code skills 目录
ln -s $(pwd)/skills/* ~/.claude/skills/

# 或只安装单个 skill
ln -s $(pwd)/skills/bobby-sweeper ~/.claude/skills/
```

### Structure · 目录结构

```
skills/
├── grain-plan-writer/          # 公众号长文写作（含流水线）
├── grain-research/             # 结构化调研
├── grain-topic-gen/            # 选题生成
├── grain-proofreading/         # 三轮审校
├── grain-material-search/      # 个人素材库
├── dashen-x-battle-plan-v2/    # X内容作战计划
├── high-impact-promo-posts/    # 多平台推广帖
├── xiaojohn-style-writer/      # 小约翰可汗风格
├── chinese-multi-platform-content/  # 一稿多平台适配
├── huashu-design/              # HTML设计能力
├── bobby-sweeper/              # 临时文件清理
└── self-review/                # 周复盘
```

---

自用技能库，持续迭代中。每个 skill 遵循 [Claude Code SKILL.md 规范](https://docs.anthropic.com/en/docs/claude-code/skills)，可直接通过 `/skill-name` 调用。
