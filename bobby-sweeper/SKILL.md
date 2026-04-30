---
name: bobby-sweeper
description: Bobby Sweeper — 扫描并清理当前 Claude Code 会话产生的临时文件，识别安全风险与删除影响，生成报告后按确认执行清理。
user-invocable: true
---

# Cleanup: 会话临时文件清理

## 触发方式

- `/bobby-sweeper` — 扫描并清理本次会话产生的临时文件
- `/bobby-sweeper --dry-run` — 仅扫描报告，不执行清理
- `/bobby-sweeper --all` — 跳过逐项确认，清理所有可清理项

## 执行流程

### Phase 1: 确定会话时间窗口

```bash
# 获取当前会话的启动时间（近似值）
# 用最近一个 plan/task 文件的最早创建时间，或 history.jsonl 最后一条的时间往前推
stat -f "%Sm" -t "%Y%m%d%H%M%S" ~/.claude/history.jsonl
```

取最近 4 小时内修改过的文件作为"本次会话"的范围。如果用户指定了 `--all`，则扫描所有临时文件（不限时间窗口）。

### Phase 2: 扫描以下位置

按类别逐一扫描，记录文件路径、大小、修改时间：

**A. 计划文件** — `~/.claude/plans/`
```bash
find ~/.claude/plans/ -type f -mmin -240 2>/dev/null
```

**B. 任务文件** — `~/.claude/tasks/`
```bash
find ~/.claude/tasks/ -type f -mmin -240 2>/dev/null
```

**C. Worktrees** — `.claude/worktrees/`（在当前项目目录下）
```bash
find .claude/worktrees/ -maxdepth 1 -mindepth 1 -type d 2>/dev/null
# 并检查 git worktree list
git worktree list 2>/dev/null | grep ".claude/worktrees"
```

**D. 定时任务** — `~/.claude/scheduled_tasks.json`
```bash
cat ~/.claude/scheduled_tasks.json 2>/dev/null
```
如果有内容，列出所有 scheduled jobs。

**E. Shell 快照** — `~/.claude/shell-snapshots/`
```bash
find ~/.claude/shell-snapshots/ -type f -mmin -240 2>/dev/null
```

**F. Session 环境文件** — `~/.claude/session-env/`
```bash
find ~/.claude/session-env/ -type f -mmin -240 2>/dev/null
```

**G. Paste 缓存** — `~/.claude/paste-cache/`
```bash
find ~/.claude/paste-cache/ -type f -mmin -240 2>/dev/null
```

**H. File History** — `~/.claude/file-history/`
```bash
find ~/.claude/file-history/ -type f -mmin -240 2>/dev/null
```

**I. 备份文件** — `~/.claude/backups/`
```bash
find ~/.claude/backups/ -type f -mmin -240 2>/dev/null
```

**J. 当前工作目录中的临时产物**
```bash
# 常见临时文件模式
find . -maxdepth 2 -type f \( \
  -name "*.tmp" -o -name "*.temp" -o -name ".~*" -o \
  -name "*.bak" -o -name "*~" -o -name "*.swp" \
\) -mmin -240 2>/dev/null | grep -v node_modules | grep -v .git
```

**K. 后台任务输出** — 检查是否有残留的 background task output 文件
```bash
find /tmp -maxdepth 2 -name "claude-*" -type f -mmin -240 2>/dev/null
```

### Phase 3: 生成报告

用以下格式向用户展示扫描结果：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🧹 会话临时文件扫描报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

扫描时间窗口: 最近 4 小时

┌─────────────────┬────────┬──────────────┐
│ 类别            │ 文件数 │ 总大小       │
├─────────────────┼────────┼──────────────┤
│ 计划文件        │   3    │  12.4 KB     │
│ 任务文件        │   5    │   8.2 KB     │
│ Worktrees       │   1    │   2.3 MB     │
│ 定时任务        │   2    │    320 B     │
│ Shell 快照      │   4    │   1.1 KB     │
│ Session 环境    │   1    │    512 B     │
│ Paste 缓存      │   0    │      -       │
│ File History    │  12    │  45.6 KB     │
│ 备份文件        │   2    │   3.8 KB     │
│ 工作目录临时文件│   0    │      -       │
│ /tmp 产物       │   1    │    128 B     │
├─────────────────┼────────┼──────────────┤
│ 合计            │  31    │   2.5 MB     │
└─────────────────┴────────┴──────────────┘

详细文件列表:
  [A] 计划文件 (3)
      • ~/.claude/plans/abc123.md  (4.2 KB, 2h ago)
      • ~/.claude/plans/def456.md  (5.1 KB, 1h ago)
      • ~/.claude/plans/ghi789.md  (3.1 KB, 30m ago)
  [D] 定时任务 (2)
      • job-1: "*/5 * * * *" — check build status
      • job-2: "0 9 * * *" — morning standup
  ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Phase 3.5: 安全风险评估

对扫描到的每个文件/类别进行安全分析，输出风险等级和删除影响。

**风险等级定义**：

| 等级 | 含义 | 图标 |
|------|------|------|
| 🟢 安全 | 纯临时缓存，删除无任何副作用 | SAFE |
| 🟡 注意 | 删除后可能影响当前会话体验，但不丢数据 | WARN |
| 🔴 危险 | 可能包含未保存的工作、未提交的代码、或不可恢复的数据 | DANGER |

**逐类评估逻辑**：

```
[A] 计划文件 (~/.claude/plans/)
    风险: 🟢 安全
    理由: 纯会话产物，计划内容已执行或废弃，删除不影响任何持久状态
    释放空间: 报告大小

[B] 任务文件 (~/.claude/tasks/)
    风险: 🟡 注意
    理由: 如果有 status=pending 的任务，删除后会丢失待办事项
    检查: cat 文件内容，搜索 "status": "pending" 或 "status": "in_progress"
    如果有未完成任务 → 升级为 🔴，列出具体任务名
    如果全部 completed → 降为 🟢

[C] Worktrees (.claude/worktrees/)
    风险: 🔴 危险
    理由: 可能包含未提交的代码变更、未推送的分支
    检查: git worktree list → 对每个 worktree 执行 git status --short
    有未提交变更 → 🔴 危险 + 列出变更文件数
    无未提交变更但有未推送 commit → 🟡 注意 + 列出 ahead commit 数
    干净 → 🟢 安全

[D] 定时任务 (~/.claude/scheduled_tasks.json)
    风险: 🟡 注意
    理由: 用户可能有意设置的周期性任务
    检查: 列出所有 job 的 prompt 内容和 cron 表达式
    始终展示给用户确认，不自动清理

[E] Shell 快照 (~/.claude/shell-snapshots/)
    风险: 🟢 安全
    理由: 环境快照，会话结束即无用

[F] Session 环境 (~/.claude/session-env/)
    风险: 🟢 安全
    理由: 会话级环境变量，不影响持久配置

[G] Paste 缓存 (~/.claude/paste-cache/)
    风险: 🟢 安全
    理由: 粘贴板临时缓存，内容已在目标位置使用

[H] File History (~/.claude/file-history/)
    风险: 🟢 安全
    理由: 文件编辑历史快照，用于 undo，但 undo 在会话内完成
    例外: 如果用户当前会话仍有未完成的编辑工作 → 🟡

[I] 备份文件 (~/.claude/backups/)
    风险: 🟡 注意
    理由: 备份文件可能是用户主动创建的恢复点
    检查: 检查备份文件的创建方式（自动 vs 手动）
    自动备份且有更新的备份存在 → 🟢
    唯一备份 → 🟡 + 提示用户确认

[J] 工作目录临时文件
    风险: 🟡 注意（默认）
    理由: 工作目录中的文件可能被其他工具引用
    检查:
    - .swp/.swo 文件 → 检查是否有对应 vim 进程在运行 (pgrep -f "vim.*filename")
      有进程 → 🔴（正在编辑的文件）
      无进程 → 🟢
    - .bak 文件 → 检查原文件是否已存在且完整
      原文件存在 → 🟢
      原文件缺失 → 🔴（备份可能是唯一的恢复路径）
    - *.tmp → 检查文件大小和内容（head -1）
      空文件或纯数据 → 🟢
      包含代码/配置 → 🟡

[K] /tmp 产物
    风险: 🟢 安全
    理由: 后台任务输出，任务完成即无用
```

**输出格式**（追加到 Phase 3 报告之后）：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔒 安全风险评估
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟢 安全可删（可大胆清理）:
  [A] 计划文件          3 个  12.4 KB
  [E] Shell 快照        4 个   1.1 KB
  [F] Session 环境      1 个    512 B
  [G] Paste 缓存        0 个      -
  [K] /tmp 产物         1 个    128 B
  小计: 可安全释放 14.1 KB，无任何副作用

🟡 需要确认（删除前请检查）:
  [B] 任务文件          5 个   8.2 KB
      ⚠ 2 个任务仍为 pending 状态
        → "Fix auth bug" (pending, 2h ago)
        → "Add unit tests" (pending, 1h ago)
      建议: 完成或放弃这些任务后再清理
  [I] 备份文件          2 个   3.8 KB
      ⚠ config.json.bak 是唯一备份，原文件存在且完整 → 安全
  [D] 定时任务          2 个    320 B
      ⚠ 需逐项确认

🔴 高风险（强烈建议保留）:
  [C] Worktrees         1 个   2.3 MB
      ⚠ worktree "feature-x" 有 3 个未提交变更
        → M src/auth.ts
        → M src/config.ts
        → ?? src/new-helper.ts
      建议: 先提交或 stash 变更，再清理

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📊 总结
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  可安全释放:  14.1 KB  (🟢 无风险)
  需确认后释放: 12.3 KB  (🟡 低风险)
  建议保留:     2.3 MB  (🔴 有未提交工作)
  潜在总释放:   2.5 MB

  结论: 大胆删 🟢 项，🟡 项按需确认，🔴 项先处理工作再清理
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Phase 4: 确认并清理

**默认模式**（无 `--all` 标志）：

按类别逐一询问用户是否清理。使用 AskUserQuestion 工具，选项包括：
- "全部清理" — 清理该类别下所有文件
- "跳过" — 保留该类别
- "选择性清理" — 列出文件让用户逐个选择

**`--all` 模式**：

基于 Phase 3.5 风险评估结果自动决策：
- 🟢 安全项 → 自动清理，无需确认
- 🟡 注意项 → 展示摘要后询问一次"是否清理所有注意项"
- 🔴 危险项 → 始终逐项确认，绝不自动删除

具体规则：
- Worktrees：有未提交变更 → 拒绝删除，提示用户先处理代码
- 定时任务：始终展示 job 内容，逐项确认
- 当前工作目录中的文件：有风险升级为 🔴 的项 → 拒绝删除
- 其余 🟡 项：展示影响摘要后批量确认

**清理操作**：

```bash
# A. 计划文件
rm -f <files>

# B. 任务文件
rm -f <files>

# C. Worktrees（需要先退出再删除）
git worktree remove <path> --force 2>/dev/null
rm -rf <path>

# D. 定时任务
# 读取 scheduled_tasks.json，删除指定 job，写回文件
# 如果全部删除，写入空对象 {}

# E. Shell 快照
rm -f <files>

# F. Session 环境
rm -f <files>

# G. Paste 缓存
rm -f <files>

# H. File History
rm -f <files>

# I. 备份文件
rm -f <files>

# J. 工作目录临时文件
rm -f <files>

# K. /tmp 产物
rm -f <files>
```

### Phase 5: 确认报告

清理完成后，输出简洁的确认：

```
✅ 清理完成
  已删除: 28 个文件, 释放 2.5 MB
  已保留: 3 个文件（worktrees — 用户确认保留）
  定时任务: 已清除 2 个 job
```

## 安全规则

1. **永远不删除**：`~/.claude/CLAUDE.md`、`settings.json`、`settings.local.json`、`history.jsonl`、记忆文件、进化数据、transcripts、skills
2. **永远不删除**：当前项目中的源代码文件、配置文件、`node_modules`、`.git`
3. **Worktree 删除前**：必须 `git status` 检查是否有未提交变更，有则警告用户
4. **定时任务删除前**：显示 job 内容让用户确认
5. **不确定时**：跳过并报告"已跳过 N 个可疑文件"
6. **`--dry-run` 模式**：只报告不操作，用于预览

## 参数处理

- 无参数：扫描 + 逐项确认清理
- `--dry-run`：仅扫描报告
- `--all`：扫描 + 自动清理（高风险项仍确认）
- 如用户说"清理 plans"或"只清 worktree"等，只处理指定类别
