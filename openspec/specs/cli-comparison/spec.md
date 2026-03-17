# cli-comparison Specification

## Purpose

定義 `site/content/lessons/ch-intro-ai.md` 中「主流 Coding Agent CLI 比較」節的需求，確保讀者在理解 Coding Agent 概念後能獲得清晰的工具全景圖，並理解本課程選用 OpenCode + GitHub Copilot LLM 的理由。

## Requirements

### Requirement: CLI 比較節存在於導言章節
`site/content/lessons/ch-intro-ai.md` 正文 SHALL 包含標題為「主流 Coding Agent CLI 比較」的 H2 節，位置 MUST 在「什麼是 Coding Agent」節之後、「小結」節之前。

#### Scenario: CLI 比較節標題存在
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 正文
- **THEN** MUST 包含文字「主流 Coding Agent CLI 比較」作為章節標題

---

### Requirement: 版本 Disclaimer 存在
CLI 比較節 SHALL 包含版本 disclaimer 文字，明確標注「此比較基於 2026 年初的版本」或語意等同的說明，以告知讀者資訊的時效性。

#### Scenario: Disclaimer 文字存在
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 中的 CLI 比較節
- **THEN** MUST 包含「2026 年初」字串

---

### Requirement: 五個工具的比較表
CLI 比較節 SHALL 包含一個 Markdown 表格，該表格 MUST 涵蓋以下五個工具（以列呈現）：
1. Claude Code CLI（Anthropic）
2. Codex CLI（OpenAI）
3. Gemini CLI（Google）
4. GitHub Copilot CLI（GitHub）
5. OpenCode（社群開源）

表格 MUST 包含以下七個比較維度（以欄呈現）：
1. 工具名稱
2. 開源
3. 預設模型（廠商）
4. 多模型支援
5. Fallback 能力
6. Subagent 支援
7. 廠商鎖定風險

#### Scenario: 表格包含所有五個工具
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 中的比較表
- **THEN** MUST 同時包含「Claude Code」、「Codex CLI」、「Gemini CLI」、「GitHub Copilot」、「OpenCode」五個工具名稱

#### Scenario: 表格包含多模型支援維度
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 中的比較表
- **THEN** MUST 包含「多模型」欄位，且 Claude Code、Codex CLI、Gemini CLI 的對應值 MUST 標示為「否」或等同語意，OpenCode 的對應值 MUST 標示為「是」或等同語意（75+ 供應商）

#### Scenario: 廠商鎖定風險欄位存在
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 中的比較表
- **THEN** MUST 包含「廠商鎖定」相關欄位，OpenCode 的值 MUST 標示為「低」，Claude Code 與 Codex CLI 的值 MUST 標示為「高」

---

### Requirement: 模型支援光譜 ASCII 圖
CLI 比較節 SHALL 包含一個 ASCII code block 圖，以橫向光譜呈現五個工具從「單一廠商鎖定」到「完全模型無關」的相對位置。

#### Scenario: 模型支援光譜圖存在
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 中的 CLI 比較節
- **THEN** MUST 包含以 ` ``` ` 包裹的 ASCII 圖，且圖中 MUST 同時出現「單一廠商」和「模型無關」或語意等同的標籤

---

### Requirement: 本課程工具選擇說明
CLI 比較節 SHALL 包含說明段落，明確說明本課程選用「OpenCode + GitHub Copilot 提供的 LLM」的理由，理由 MUST 涵蓋：多模型彈性、不受廠商鎖定、隱私（程式碼不經第三方伺服器）三個面向中的至少兩個。

#### Scenario: 課程工具選擇說明存在
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 中的 CLI 比較節
- **THEN** MUST 包含「本課程」字串，並在「本課程的選擇」段落中說明選用 OpenCode 的理由，理由段落 MUST 包含「OpenCode」文字
