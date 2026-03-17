## ADDED Requirements

### Requirement: 章節標題與定位反映 Vibe Coding 方法論
`ch1-vibe-coding.md`（原 `ch1-copilot.md`）的標題 SHALL 改為「Vibe Coding 與快速原型」，description SHALL 改為「用 AI 工具快速迭代出 MVP，掌握 Greenfield 階段的最佳實踐。」

#### Scenario: 學習者看到 Ch1 標題
- **WHEN** 學習者進入 Ch1
- **THEN** 標題 SHALL 為「Vibe Coding 與快速原型」，description 包含「MVP」與「Greenfield」

### Requirement: Ch1 包含 Vibe Coding 方法論段落
Ch1 SHALL 新增一個完整的「Vibe Coding 方法論」段落，包含：定義（用 AI 對話快速迭代，不追求完美架構，目的是驗證想法）、適用場景（原型、POC、Spike）、操作心法（快速迭代、邊做邊驗證、不要過度設計）。

#### Scenario: 學習者學習 Vibe Coding 的定義
- **WHEN** 學習者閱讀 Vibe Coding 方法論段落
- **THEN** 內容 SHALL 包含明確的定義，說明 Vibe Coding 是「用 AI 快速迭代、驗證假設、不求完美架構」的方法

#### Scenario: 學習者了解 Vibe Coding 的適用場景
- **WHEN** 學習者閱讀適用場景說明
- **THEN** SHALL 列出至少三種適用場景（原型、POC、Spike），並說明哪些場景不適用

### Requirement: Ch1 包含 Prototype 退出條件
Ch1 SHALL 新增「Prototype 退出條件」段落，明確說明三個退出信號：核心假設已驗證、利害關係人確認方向正確、開始出現「我不確定這段 code 在幹嘛」的感覺。

#### Scenario: 學習者了解何時停止 Vibe Coding
- **WHEN** 學習者閱讀退出條件段落
- **THEN** SHALL 列出至少三個具體的退出信號，每個信號有清楚的描述

### Requirement: Ch1 保留 Copilot 操作與 Prompt Engineering 內容
Ch1 SHALL 保留現有的 Context Awareness（`#file`、`#selection`、`@workspace`）、Prompt Engineering（Role Prompting、CoT、Negative Prompting）、`copilot-instructions.md` 建立等內容，這些內容是 Vibe Coding 的基礎工具。

#### Scenario: 學習者找到 Prompt Engineering 技巧
- **WHEN** 學習者閱讀 Ch1
- **THEN** Role Prompting、Chain of Thought、Negative Prompting 三個技巧 SHALL 均存在

### Requirement: Ch1 Lab B 改為 Vibe Coding MVP 實作
Ch1 的 Lab B SHALL 改為「用 Copilot Vibe Code 一個完整 MVP」，讓學習者從零用 Vibe Coding 做出能跑的版本，Done criteria 結尾 SHALL 包含提示語：「看看你的 code，你能自信地說你完全理解每一行嗎？下一章我們來面對這個問題。」

#### Scenario: 學習者完成 Lab B
- **WHEN** 學習者完成 Ch1 Lab B
- **THEN** 學習者有一個能動的 MVP，且 Done criteria 包含引導至 Ch2 轉折點的提示語

### Requirement: 原檔名 ch1-copilot.md 更名為 ch1-vibe-coding.md
舊檔案 `ch1-copilot.md` SHALL 重新命名為 `ch1-vibe-coding.md`，舊檔案 SHALL 被刪除。

#### Scenario: 更名後舊檔不存在
- **WHEN** 更名完成後
- **THEN** `site/content/lessons/ch1-copilot.md` SHALL 不存在，`site/content/lessons/ch1-vibe-coding.md` SHALL 存在
