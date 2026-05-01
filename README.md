<div align="center">

# Bobby's Skills

**Claude Code 个人技能库**

`写作` · `内容` · `设计` · `工具`

12 skills · 自用为主 · 持续迭代

</div>

---

## Grain Plan · 谷雨计划内容创作链路

一套从调研到发布的完整内容流水线。

```
research → topic-gen → plan-writer → proofreading
```

| Skill | 一句话 | 触发词 |
|:------|:-------|:-------|
| **[grain-plan-writer](grain-plan-writer/)** | 公众号长文写作，含流水线调度和发布配套 | `写文章` `帮我写` `稿子` |
| **[grain-research](grain-research/)** | 结构化调研，增量保存防丢失 | `调研` `查一下` `搜索资料` |
| **[grain-topic-gen](grain-topic-gen/)** | 生成3-4个选题方向，含标题和优劣分析 | `选题` `写什么` `方向` |
| **[grain-proofreading](grain-proofreading/)** | 三轮审校去AI味，目标检测率<30% | `审校` `去AI味` `校对` |
| **[grain-material-search](grain-material-search/)** | 从历史内容搜索可复用素材 | `素材` `之前写过的` `案例` |

---

## X/Twitter · 推特运营

| Skill | 一句话 | 触发词 |
|:------|:-------|:-------|
| **[dashen-x-battle-plan-v2](dashen-x-battle-plan-v2/)** | 数据分析 + 30天计划 + 执行复盘 | `内容作战计划` `X创作计划` |
| **[high-impact-promo-posts](high-impact-promo-posts/)** | 追热点推广帖，覆盖小红书/公众号/头条/X | `写推广帖` `追热点` |

---

## Writing · 写作风格

| Skill | 一句话 | 触发词 |
|:------|:-------|:-------|
| **[xiaojohn-style-writer](xiaojohn-style-writer/)** | 小约翰可汗风格：北方口语、评书叙事、结尾升华 | `小约翰风格` `通辽风格` |
| **[chinese-multi-platform-content](chinese-multi-platform-content/)** | 一稿多平台适配：X/公众号/小红书/头条 | `多平台发布` `适配` |

---

## Design · 设计

| Skill | 一句话 | 触发词 |
|:------|:-------|:-------|
| **[huashu-design](huashu-design/)** | HTML做原型/Demo/幻灯片/动画，20种设计哲学，导出MP4/GIF | `做原型` `设计Demo` `HTML演示` |

---

## System · 系统工具

| Skill | 一句话 | 触发词 |
|:------|:-------|:-------|
| **[bobby-sweeper](bobby-sweeper/)** | 清理会话临时文件，三级安全评估 | `清理临时文件` |
| **[self-review](self-review/)** | 周复盘：分析任务模式，生成改进策略 | `周复盘` `自我进化` |

---

## Install

```bash
git clone git@github.com:zhangluka/bobby-skills.git
cd bobby-skills

# 全部安装
ln -s $(pwd)/* ~/.claude/skills/

# 或只装一个
ln -s $(pwd)/grain-plan-writer ~/.claude/skills/
```

---

每个 skill 遵循 [Claude Code SKILL.md 规范](https://docs.anthropic.com/en/docs/claude-code/skills)，可通过 `/skill-name` 直接调用。
