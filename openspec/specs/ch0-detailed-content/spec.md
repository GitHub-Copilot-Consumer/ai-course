# ch0-detailed-content Specification

## Purpose

TBD - created from change 'expand-ch0-ch5-detailed-steps'.

## Requirements

### Requirement: ch0 頁面包含完整學習目標
`site/content/lessons/ch0-warmup.md` 正文 SHALL 包含「學習目標」段落，列出本章結束後學員 MUST 能達成的具體能力（至少 3 項）。

#### Scenario: 學習目標段落存在
- **WHEN** 讀取 `site/content/lessons/ch0-warmup.md`
- **THEN** 正文 MUST 包含 `## 學習目標` 標題，且其下方 MUST 列出至少 3 個條列項目

### Requirement: ch0 三階段演進含背景說明
`site/content/lessons/ch0-warmup.md` 的「AI 開發三階段演進」段落 SHALL 為每個階段（Autocomplete、Chat、Spec-Driven）補充：
- 代表工具名稱
- 典型使用場景描述（1–2 句）
- 主要限制說明（1–2 句）

#### Scenario: 三階段各含代表工具與說明
- **WHEN** 讀取 `site/content/lessons/ch0-warmup.md` 的演進段落
- **THEN** 正文 MUST 在 Autocomplete、Chat、Spec-Driven 三個階段下各自包含代表工具名稱與限制說明

### Requirement: ch0 常見災難現場含解法建議
`site/content/lessons/ch0-warmup.md` 的「常見災難現場」段落 SHALL 為每個問題補充：
- 具體情境描述（如：PRD 在 Slack，Spec 在 Notion，Code 在 Copilot Chat 各自獨立）
- 對應的初步解法方向（1–2 句，引導至本課程方法論）

#### Scenario: 災難現場含解法
- **WHEN** 讀取 `site/content/lessons/ch0-warmup.md`
- **THEN** 「常見災難現場」段落下的每個問題項目 MUST 包含解法說明文字
