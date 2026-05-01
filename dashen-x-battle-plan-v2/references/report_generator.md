# HTML报告生成参考手册

## 品牌标识规范 · dashen.wang

所有HTML报告必须植入 **dashen.wang / AI最严厉的父亲** 品牌。

### 品牌标识位置

| 位置 | 要求 |
|------|------|
| **封面** | 纯文字品牌标识，居中或左对齐 |
| **页脚** | 每页底部：`AI最严厉的父亲 · dashen.wang` |
| **末页** | 完整品牌声明 + dashen.wang 域名 |

### 封面品牌标识（纯文字）

```html
<div class="text-logo">
  <span class="text-logo-cn">AI最严厉的父亲</span>
  <span class="text-logo-en">dashen.wang</span>
</div>
```

### 文字Logo CSS

```css
.text-logo {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.text-logo-cn {
  font-size: 22px;
  font-weight: bold;
  color: #111;
  letter-spacing: 1px;
  line-height: 1.2;
}
.text-logo-en {
  font-size: 12px;
  color: #888;
  letter-spacing: 3px;
  font-family: 'Courier New', monospace;
}
```

### 页脚品牌规范（HTML版）

页脚用固定div实现，不依赖 `@page`（浏览器不支持）：

```html
<div class="report-footer">
  <span>AI最严厉的父亲 · dashen.wang</span>
  <span>{NICKNAME} 内容作战计划</span>
  <span>dashen.wang · 数据驱动创作</span>
</div>
```

```css
.report-footer {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid #eee;
  font-size: 11px;
  color: #bbb;
  margin-top: 24px;
}
```

### 末页品牌声明

```html
<div class="brand-footer" style="text-align: center; padding: 32px 0; border-top: 1px solid #eee; margin-top: 40px;">
  <div class="text-logo" style="display: inline-flex; flex-direction: column; align-items: center; margin-bottom: 12px;">
    <span class="text-logo-cn" style="font-size: 18px; font-weight: bold; color: #111; letter-spacing: 1px;">AI最严厉的父亲</span>
    <span class="text-logo-en" style="font-size: 11px; color: #888; letter-spacing: 3px; font-family: 'Courier New', monospace;">dashen.wang</span>
  </div>
  <p>本报告由 <strong>AI最严厉的父亲</strong> 内容作战系统生成</p>
  <p style="color: #aaa; font-size: 11px;">dashen.wang · @dashen_wang · 内容作战计划 · 数据驱动创作</p>
</div>
```

---

## 渲染方式

直接生成HTML文件，用浏览器打开即可，无需安装额外依赖。

```python
def save_html(html_content: str, handle: str) -> str:
    """生成HTML文件并返回路径"""
    filename = f"{handle.lstrip('@')}_作战计划_{date.today().isoformat()}.html"
    output_path = f"/mnt/user-data/outputs/{filename}"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    return output_path
```

---

## HTML基础模板

以下是完整的HTML CSS框架。**所有变量用 `{VAR}` 标记**，在Python中用 `.format()` 或 f-string替换。

### CSS规范（固定不变）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{NICKNAME} 内容作战计划</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, "Helvetica Neue", "PingFang SC", "Noto Sans CJK SC", "WenQuanYi Zen Hei", sans-serif;
  font-size: 14px;
  color: #111;
  line-height: 1.7;
  background: #f5f5f5;
  padding: 0;
}

.report-container {
  max-width: 820px;
  margin: 0 auto;
  background: white;
  padding: 40px 48px;
  min-height: 100vh;
}

/* COVER */
.cover { padding: 48px 0 32px 0; margin-bottom: 32px; border-bottom: 2px solid #111; }
.cover-top { border-top: 3px solid #111; border-bottom: 1px solid #111; padding: 20px 0 16px 0; margin-bottom: 24px; }
.cover-eyebrow { font-size: 11px; letter-spacing: 3px; color: #666; margin-bottom: 8px; }
.cover-title { font-size: 36px; font-weight: bold; line-height: 1.2; color: #111; }
.cover-subtitle { font-size: 16px; color: #444; margin-top: 8px; }
.cover-meta { font-size: 11px; color: #888; margin-top: 8px; border-top: 1px solid #ddd; padding-top: 8px; }
.cover-kpi { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid #111; margin: 24px 0; }
.kpi-cell { padding: 16px 14px; border-right: 1px solid #ccc; }
.kpi-cell:last-child { border-right: none; }
.kpi-label { font-size: 10px; color: #888; letter-spacing: 1px; margin-bottom: 4px; }
.kpi-value { font-size: 28px; font-weight: bold; color: #111; line-height: 1; }
.kpi-unit { font-size: 11px; color: #666; }
.cover-desc { font-size: 13px; color: #555; border-left: 3px solid #111; padding-left: 14px; line-height: 1.8; }
.cover-bottom { border-top: 1px solid #111; padding-top: 10px; display: flex; justify-content: space-between; font-size: 11px; color: #888; margin-top: 24px; }
.cover-bottom .brand { font-size: 14px; font-weight: bold; color: #111; }

/* TYPOGRAPHY */
.section-break { margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; }
.part-label { font-size: 10px; letter-spacing: 3px; color: #888; margin-bottom: 6px; }
h1 { font-size: 28px; font-weight: bold; color: #111; border-bottom: 2px solid #111; padding-bottom: 8px; margin-bottom: 20px; }
h2 { font-size: 18px; font-weight: bold; color: #111; margin-top: 28px; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid #ddd; }
h3 { font-size: 15px; font-weight: bold; color: #111; margin-top: 20px; margin-bottom: 8px; }
p { margin-bottom: 10px; color: #222; }
.lead { font-size: 15px; color: #333; margin-bottom: 16px; }

/* TABLES */
table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px; }
thead tr { background: #111; color: white; }
thead th { padding: 10px 12px; text-align: left; font-weight: bold; font-size: 11px; }
thead th.center { text-align: center; }
tbody tr:nth-child(even) { background: #f7f7f7; }
td { padding: 8px 12px; color: #222; vertical-align: middle; border-bottom: 1px solid #e8e8e8; }
td.center { text-align: center; }
td.bold { font-weight: bold; }
td.muted { color: #888; font-size: 11px; }
.top-row td { background: #f0f0f0; font-weight: bold; }

/* CALLOUT */
.callout { border-left: 3px solid #111; padding: 12px 16px 12px 18px; margin: 12px 0; background: #fafafa; }
.callout-title { font-size: 13px; font-weight: bold; color: #111; margin-bottom: 4px; }
.callout p { font-size: 13px; color: #444; margin: 0; }

/* FINDINGS */
.findings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0 20px 0; }
.finding { border: 1px solid #ddd; padding: 14px 16px; }
.finding-num { font-size: 28px; font-weight: bold; color: #111; line-height: 1; margin-bottom: 4px; }
.finding-title { font-size: 13px; font-weight: bold; color: #111; margin-bottom: 6px; }
.finding p { font-size: 11px; color: #555; margin: 0; line-height: 1.6; }

/* STREAM BLOCKS */
.stream-block { margin-bottom: 20px; }
.stream-header { background: #111; color: white; padding: 10px 16px; font-size: 15px; font-weight: bold; }
.stream-body { border: 1px solid #ddd; border-top: none; display: grid; grid-template-columns: 1fr 1fr; }
.stream-col { padding: 12px 16px; }
.stream-col:first-child { border-right: 1px solid #eee; }
.stream-meta { font-size: 10px; color: #888; margin-bottom: 6px; }
.stream-val { font-size: 13px; color: #222; margin-bottom: 8px; }
.stream-tactics { font-size: 11px; color: #444; }
.stream-tactics li { margin-bottom: 4px; list-style: none; }
.stream-tactics li::before { content: "— "; color: #999; }

/* TEMPLATES */
.template-section { margin-bottom: 20px; }
.tmpl-header { font-size: 14px; font-weight: bold; border-bottom: 2px solid #111; padding-bottom: 6px; margin-bottom: 12px; }
.tmpl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.tmpl-card { border: 1px solid #e0e0e0; padding: 12px 14px; }
.tmpl-num { font-size: 10px; font-weight: bold; color: #999; margin-bottom: 6px; }
.tmpl-text { font-size: 12px; color: #333; line-height: 1.7; white-space: pre-wrap; }

/* MISC */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.type-tag { display: inline-block; padding: 2px 8px; font-size: 10px; font-weight: bold; border: 1px solid #999; color: #333; }
.do-list { list-style: none; margin: 8px 0; }
.do-list li { font-size: 13px; padding: 6px 0; border-bottom: 1px solid #f0f0f0; }
.do-list li.yes::before { content: "✓  "; font-weight: bold; color: #111; }
.do-list li.no::before { content: "✗  "; font-weight: bold; color: #aaa; }
.do-list li.no { color: #aaa; }
.checklist { list-style: none; }
.checklist li { font-size: 13px; padding: 6px 0; border-bottom: 1px solid #f0f0f0; color: #333; }
.checklist li::before { content: "□  "; color: #bbb; }
.final-note { border-top: 2px solid #111; border-bottom: 1px solid #ddd; padding: 20px 0; margin-top: 24px; text-align: center; font-size: 13px; color: #555; line-height: 1.9; }
.final-note .sig { font-weight: bold; color: #111; margin-top: 8px; font-size: 14px; }
.formula-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0; }
.formula-card { border: 1px solid #ddd; padding: 14px 16px; }
.formula-label { font-size: 10px; font-weight: bold; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
.formula-rule { font-size: 13px; font-weight: bold; color: #111; margin-bottom: 6px; }
.formula-eg { font-size: 11px; color: #666; }

/* FOOTER */
.report-footer {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid #eee;
  font-size: 11px;
  color: #bbb;
  margin-top: 32px;
}
</style>
</head>
<body>
<div class="report-container">
  <!-- 报告内容在这里 -->
</div>
</body>
</html>
```

---

## HTML内容生成策略

**不要硬编码HTML字符串**。用Python动态生成HTML的各个部分，然后组合。

### Python生成框架

```python
def generate_html(data: dict) -> str:
    """
    data 包含所有分析结果和用户输入
    """
    sections = []
    sections.append(render_css(data))
    sections.append(render_cover(data))
    sections.append(render_part1_analysis(data))
    sections.append(render_part2_strategy(data))
    sections.append(render_part3_framework(data))
    sections.append(render_part4_calendar(data))
    sections.append(render_part5_templates(data))
    sections.append(render_part6_guide(data))
    sections.append(render_part7_kpi(data))
    return '\n'.join(sections)
```

### 各部分渲染要点

**封面**
- 显示昵称、handle、粉丝数、分析时间
- KPI四格：总曝光、单帖最高、新增关注、回复帖占比

**Part 1 数据分析**
- 类型对比表：按avg_imp降序排列，最高的标记为top-row
- 核心发现：自动根据数据生成4条findings
  - Finding 1：最强内容类型（avg_imp最高的非链接非回复类）
  - Finding 2：回复帖占比问题（如果 > 30%）
  - Finding 3：爆款规律（从TOP帖提炼共同特征）
  - Finding 4：月度趋势诊断
- TOP帖表：涨粉TOP 8

**Part 2 流量战略**
- 根据用户选择的方向动态生成stream-block
- 每个方向：定位/目标/节奏/选题5条

**Part 3 每日框架**
- 固定6时段表
- 配比表：根据用户的流量方向调整占比

**Part 4 30天日历**
- 日期从"计划开始日"起算（默认明天）
- 长文题目基于用户的主题方向生成
- 每行：日期 + 长文主题 + 类型tag + 短推配比

**Part 5 短推模板**
- 根据用户的流量方向，每类生成6条模板
- 模板要体现用户账号的风格（从bio和TOP帖推断）

**Part 6 长文指南**
- 爆款公式：从TOP帖提炼，给出A/B/C/D四个公式
- 结构模板：6段式
- DO/DON'T：12条（6+6）

**Part 7 KPI + 执行**
- 目标基于当前数据 × 合理增长系数
  - 粉丝目标：当前粉丝 × 1.5（若当前<1000）或 × 1.3（若>10000）
  - 月新增：取历史最佳月份
  - 日均曝光：取历史最佳月均值

---

## 30天日历生成逻辑

```python
from datetime import date, timedelta

def generate_calendar(start_date: date, directions: list, account_context: dict) -> list:
    """
    返回30天的日历数据
    每天：{date, weekday, long_article_topic, content_type, tweet_ratio}
    """
    calendar = []
    
    # 方向轮换规则（确保各方向均匀分布）
    # directions示例：['AI圈', '泛流量', '币圈', '擦边']
    # 按7天为一组，每组内安排一次擦边，其余按其他方向轮换
    
    for i in range(30):
        d = start_date + timedelta(days=i)
        weekday = ['周一','周二','周三','周四','周五','周六','周日'][d.weekday()]
        
        # 确定当天主题方向（擦边每周1次，其余方向轮换）
        if i % 7 == 2:  # 每周三做擦边
            day_type = '擦边/情感'
        else:
            # 从其他方向循环
            other_dirs = [d for d in directions if '擦边' not in d]
            day_type = other_dirs[i % len(other_dirs)]
        
        # 配比根据当天类型调整
        ratio = build_ratio(day_type, directions)
        
        calendar.append({
            'date': f"{d.month}月{d.day}日",
            'weekday': weekday,
            'type': day_type,
            'ratio': ratio,
        })
    
    return calendar

def build_ratio(primary_type: str, all_directions: list) -> str:
    """生成当天15条短推的配比描述"""
    # 主方向多，辅助方向少
    # 示例输出："AI×5 币圈×4 泛×4 擦×2"
    ...
```

---

## 长文题目生成

长文题目必须根据账号具体情况动态生成，不能复用模板账号的题目。

**生成原则：**
1. 从账号的主方向取3/7，泛流量取2/7，辅助方向取1/7，擦边取1/7
2. 题目必须带"钩子"——反差/数字/冲突/悬念
3. 结合用户的真实业务（从bio、TOP帖、用户输入推断）

**题目生成prompt（内嵌调用）：**
```
基于以下账号信息，生成30个长文题目：
- 昵称：{nickname}，Handle：{handle}
- Bio：{bio}
- 主要流量方向：{directions}
- 历史爆款帖（参考风格）：{top_posts}
- 要求：每个题目自带传播力，有冲突/数字/反差，符合该账号人设
- 格式：纯列表，每行一个，不加序号
```

---

## 短推模板生成

模板要匹配账号的说话方式：
- 从TOP帖和bio推断账号的语言风格（粗口/文艺/专业/接地气）
- 每类模板的语气要一致
- `[方括号内容]` 是用户需要填写的变量部分

**模板类型对应账号方向：**
- AI圈 → AI工具/案例/洞见模板
- 币圈 → 链上数据/交易逻辑模板
- 搞钱/副业 → 收益晒单/踩坑/免费教模板
- 泛流量 → 情绪共鸣/反常识/人生观察模板
- 擦边/情感 → 高暗示/AI秘书/反差模板

---

## 完整渲染示例

见同目录下已经生成过的两个账号（Stanley和Luffy）的报告结构。
核心要点：
1. 所有文字动态填充，不硬编码
2. 类型分析表从 `type_stats` 动态生成行数
3. 流量战略板块从 `directions` 动态生成数量
4. 30天日历全部动态生成
5. 模板根据账号风格调整口吻

---

## 执行复盘专用章节 HTML模板

### 执行纪律评分页

```html
<!-- 执行纪律评分 — 7天/季度复盘专用 -->
<div class="section-break"></div>
<div class="part-label">执行复盘</div>
<h1>执行纪律评分</h1>

<!-- 大评分数字 -->
<div style="text-align:center; margin: 32px 0;">
  <div style="font-size: 72px; font-weight: bold; line-height:1; color:#111;">{SCORE}</div>
  <div style="font-size: 16px; color:#888; margin-top: 8px;">执行等级 · 本期综合评分</div>
</div>

<hr style="border:none; border-top:2px solid #111; margin: 24px 0;">

<!-- 三项拆解 -->
<table>
  <thead>
    <tr>
      <th>评分维度</th>
      <th class="center">计划目标</th>
      <th class="center">实际完成</th>
      <th class="center">达成率</th>
      <th class="center">判定</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="bold">每日长文</td>
      <td class="center">1篇/天 × 30天 = 30篇</td>
      <td class="center">{ACTUAL_LONG}篇</td>
      <td class="center">{LONG_RATE}%</td>
      <td class="center">{LONG_OK}</td>
    </tr>
    <tr>
      <td class="bold">每日短推</td>
      <td class="center">15条/天 × 30天 = 450条</td>
      <td class="center">{ACTUAL_SHORT}条</td>
      <td class="center">{SHORT_RATE}%</td>
      <td class="center">{SHORT_OK}</td>
    </tr>
    <tr>
      <td class="bold">回复帖比例</td>
      <td class="center">≤ 20%</td>
      <td class="center">{ACTUAL_REPLY}%</td>
      <td class="center">—</td>
      <td class="center">{REPLY_OK}</td>
    </tr>
  </tbody>
</table>

<!-- 评级说明 + 诊断意见 -->
<div class="callout">
  <div class="callout-title">诊断：{SCORE_LABEL}</div>
  <p>{SCORE_COMMENT}</p>
</div>
```

### 评级说明映射（Python生成时使用）

```python
SCORE_META = {
    'A': {
        'label': '严格执行',
        'comment': '执行率超过85%，数据高度可信。本期的数据结果可以直接用来校准下一期计划，不需要打折扣。',
    },
    'B': {
        'label': '基本执行',
        'comment': '执行率60-84%，数据有参考价值但有偏差。重点看哪个维度拖了后腿，针对性调整节奏。',
    },
    'C': {
        'label': '执行不稳定',
        'comment': '执行率30-59%，这期的数据结论参考价值有限。先找到没执行的原因——是计划太重？节奏不对？还是外部因素？',
    },
    'D': {
        'label': '计划形同虚设',
        'comment': '执行率不足30%。先不急着看数据结论，最紧迫的事是找到执行障碍。下一期计划先大幅减量，找到可持续的最低执行量。',
    },
}
```

### KPI达成率对比表

```html
<h2>KPI达成率</h2>
<table>
  <thead>
    <tr>
      <th>指标</th>
      <th class="center">上期预测目标</th>
      <th class="center">本期实际</th>
      <th class="center">达成率</th>
      <th class="center">判定</th>
    </tr>
  </thead>
  <tbody>
    <!-- 动态生成，每个KPI一行 -->
    <!-- 达成率 >= 100% → "超额完成"，80-99% → "基本达成"，< 80% → "未达标" -->
  </tbody>
</table>

<!-- 超预期 / 低预期 的帖子 -->
<h3>本期意外表现</h3>
<!-- 超预期：曝光超出预测均值50%以上的帖子 -->
<!-- 低预期：曝光低于预测均值50%以下且类型是主力方向的帖子 -->
```

### 季度复盘：账号成长轨迹表

```html
<h2>账号成长轨迹</h2>
<table>
  <thead>
    <tr>
      <th>分析期次</th>
      <th class="center">日期</th>
      <th class="center">粉丝数</th>
      <th class="center">平均曝光</th>
      <th class="center">回复比例</th>
      <th class="center">执行评分</th>
      <th class="center">主力内容</th>
    </tr>
  </thead>
  <tbody>
    <!-- 从护照的analyses数组动态生成，每期一行 -->
    <!-- 用top-row标记增长最快的那一期 -->
  </tbody>
</table>
```

### 内容疲劳检测提示框

```html
<!-- 只在有疲劳信号时才渲染此块 -->
<div class="callout" style="border-left-color: #999;">
  <div class="callout-title">内容疲劳警示</div>
  <p>以下内容类型在过去 {N} 期呈现连续下滑趋势，建议本期降低发布比例，引入新选题角度：</p>

  <!-- 每个疲劳类型一行：类型名 + 下滑幅度 + 建议 -->
</div>
```

---

## 护照JSON文件生成

HTML报告生成完毕后，同时生成更新后的护照JSON：

```python
import json

def deliver_passport(passport: dict, handle: str) -> str:
    """生成护照文件并返回路径"""
    filename = f"{handle.lstrip('@')}_passport.json"
    output_path = f"/mnt/user-data/outputs/{filename}"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(passport, f, ensure_ascii=False, indent=2)
    return output_path
```

交付时同时呈现HTML报告和护照JSON：
```python
# present_files([html_path, passport_path])
```
