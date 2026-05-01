---
name: self-review
description: Weekly self-evolution review - analyze task patterns, generate improvement strategies, update memories
user-invocable: true
---

# Self-Review: Claude Code 自我进化复盘

## 触发方式

- 手动: `/self-review`
- 自动: 每周日 22:00 由 Cron 触发

## 复盘流程

### Phase 1: 数据收集

1. 读取 `~/.claude/evolution/task-log.jsonl` — 获取本周所有任务日志
2. 扫描 `~/.claude/transcripts/` — 找到本周的会话记录文件（按文件修改时间过滤）
3. 读取 `~/.claude/projects/-Users-bobby/memory/` — 当前记忆状态

### Phase 2: 模式分析

分析以下维度：

**任务成功率**
- 有多少任务顺利完成？
- 有多少任务需要用户中途纠正？

**用户纠正分类**
- 方向性错误（理解需求有误）
- 执行性错误（方向对但方法不对）
- 遗漏性错误（忘了做某件事）
- 风格性错误（沟通方式不对）

**高频任务类型**
- 哪类任务出现最多？
- 哪类任务耗时最长？
- 哪类任务最容易出错？

**工具使用模式**
- 哪些工具使用最频繁？
- 是否有应该用但没用的工具？
- 是否有过度使用的工具？

### Phase 3: 诊断报告

生成复盘报告，保存到 `~/.claude/evolution/reflections/YYYY-WNN.md`：

```markdown
# 周复盘报告 YYYY-WNN

## 概要
- 本周会话数: N
- 任务日志条目: N
- 用户纠正次数: N

## 关键发现
1. [发现1]
2. [发现2]
3. [发现3]

## 模式识别
- [模式1]: [描述]
- [模式2]: [描述]

## 改进建议
1. [建议1] → 写入策略文件
2. [建议2] → 写入策略文件
3. [建议3] → 更新记忆
```

### Phase 4: 策略更新

根据诊断结果，更新以下文件：

1. **策略文件** (`~/.claude/evolution/strategies/feedback_*.md`)
   - 如果发现新的行为模式，创建新策略文件
   - 如果已有策略文件，追加或修正

2. **记忆文件** (`~/.claude/projects/-Users-bobby/memory/`)
   - 更新 feedback 记忆（如果发现了新的用户偏好或纠正）
   - 更新 user_profile（如果有新的用户信息）
   - 更新 MEMORY.md 索引

3. **指标文件** (`~/.claude/evolution/metrics.json`)
   - 更新本周统计数据

4. **数据清理**（仅在有效进化后执行）
   - 有效进化 = 本次复盘生成了报告 + 更新了至少一条策略
   - 调用 `python3 ~/.claude/evolution/cleanup.py`
   - 该脚本会：清空 task-log.jsonl、删除 4 周前的 reflections
   - 如果本次复盘未提取出任何模式，**不要清理**，数据留待下次分析

### Phase 5: 输出摘要

向用户展示简短的复盘摘要（不超过 10 行），包括：
- 最重要的发现
- 采取的改进行动
- 下周关注重点

## 原则

- 写声明式事实，不写指令
- 每个策略不超过 2000 字符
- 优先记录能减少用户重复纠正的发现
- 不保存任务进度或工作日志
- 复盘报告保留 4 周，过期自动清理
