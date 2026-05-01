---
name: chinese-multi-platform-content
description: Adapt a single article for multiple Chinese social platforms (X, 公众号, 小红书, 今日头条) with platform-specific formatting and tone.
triggers:
  - 多平台发布
  - 公众号 小红书 头条
  - multi-platform content
  - 跨平台发布
  - 适配多个平台
---

# Chinese Multi-Platform Content Adaptation

When user wants to publish the same article across multiple Chinese platforms, create platform-specific versions.

## Platform Characteristics

### X (Twitter)
- **Length**: Short, punchy. Thread or X Article format.
- **Tone**: Casual, developer-oriented, English terms OK.
- **Format**: Hook title, personal opening, concise sections, engagement CTA at end.
- **Hashtags**: Yes, at the end (#AIAgent #VibeCoding etc.)
- **Emojis**: Minimal, strategic.

### 公众号 (WeChat Official Account)
- **Length**: Longest version. Deep, polished, full reading experience.
- **Tone**: More literary, personal voice, storytelling. Chinese audience prefers 起承转合 structure.
- **Format**: Strong opening hook → personal anecdote → detailed sections → reflection → CTA.
- **Hashtags**: None needed (WeChat doesn't use them).
- **Emojis**: Very minimal, if any.
- **Key**: Section breaks with `---`, longer paragraphs acceptable, metaphors appreciated.

### 小红书 (RED/Xiaohongshu)
- **Length**: Shortest. Scannable, visual-first.
- **Tone**: Casual, friendly, tutorial-style. "姐妹/宝子们" vibe.
- **Format**: Emoji-heavy title → short punchy sections → numbered lists → CTA.
- **Hashtags**: Many, at the end (10-15 relevant tags).
- **Emojis**: Heavy use throughout (📌🔥💡⚠️🎯🧠 etc.)
- **Key**: Tables work well. Think "infographic in text form."

### 今日头条 (Toutiao)
- **Length**: Medium-long. Algorithm favors completion rate.
- **Tone**: 接地气 but informative. Avoid jargon without explanation.
- **Format**: Long title with suspense/numbers → short paragraphs → clear subheadings → discussion CTA.
- **Hashtags**: None (Toutiao doesn't use them).
- **Emojis**: None (readers dislike them).
- **Key**: Title is CRITICAL for algorithm. Make it curiosity-driven. Explain all technical terms. Short paragraphs for mobile reading.

## Workflow

1. Read/understand the source article fully
2. Create 4 separate files named `{topic}-{platform}版.md`
3. Save all to Desktop (user's preference for output files)
4. Present a comparison table showing key differences

## File Naming Convention
- `{topic}-中文版.md` → X version
- `{topic}-公众号版.md` → WeChat
- `{topic}-小红书版.md` → RED
- `{topic}-头条版.md` → Toutiao

## Pitfalls
- **Don't just translate** — adapt voice, length, and structure per platform
- **头条 title length** — should be 20-30 chars, curiosity-driven, often with numbers
- **小红书** — images are critical but we can only provide text; remind user to add visuals
- **公众号** — user's account "谷雨计划" focuses on AI+personal growth; match that positioning
- **X** — user's account @grainrain_young positions as "会画画的AI开发者"; match that voice
- **Always ask before saving files** to user's local system (user preference)
