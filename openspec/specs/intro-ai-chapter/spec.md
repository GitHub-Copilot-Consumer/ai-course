# intro-ai-chapter Specification

## Purpose

TBD - created by archiving change 'add-intro-ai-concepts'. Update Purpose after archive.

## Requirements

### Requirement: 導言章節 Hugo 頁面
系統 SHALL 建立 `hugo/content/chapters/ch-intro-ai.md`，作為課程導言章節，其 front matter MUST 包含：
- `title`：`導言：理解 Model、Agent 與 Coding Agent`
- `weight`：`-1`（確保排序在 ch0 之前）
- `description`：「在學習工具操作前，先理解 AI 工具背後的運作機制。」
- `showToc`：`true`

#### Scenario: 導言章節檔案存在且排序正確
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md`
- **THEN** front matter MUST 包含 `weight: -1`，確保在 Hugo 章節列表中排在最前


<!-- @trace
source: add-intro-ai-concepts
updated: 2026-03-11
code:
  - site/public/tags/index.html
  - site/content/lessons/ch1-copilot.md
  - site/content/lessons/_index.md
  - hugo/content/chapters/ch4-opencode.md
  - hugo/content/_index.md
  - hugo/hugo.yaml
  - site/public/resources/index.xml
  - hugo/content/chapters/ch0-warmup.md
  - hugo/content/chapters/ch5-team.md
  - site/public/lessons/ch2-sdd/index.html
  - site/content/lessons/ch-intro-ai.md
  - site/themes/hugo-book/
  - site/public/categories/index.html
  - site/public/lessons/ch3-openspec/index.html
  - site/public/resources/commands/index.html
  - site/public/lessons/index.xml
  - site/content/_index.md
  - site/public/404.html
  - site/public/en.search-data.min.11d8fd6c789e124cfa714dc97b60c1da6ed1f7378df1a86aad25dbd2927b9e47.json
  - site/public/lessons/ch5-team/index.html
  - site/public/icons/toc.svg
  - hugo/content/appendix/commands.md
  - site/public/en.search.min.c266608cea2076427ca0be0db5767ba354b56d62c5e0f873d52a4fed991722c8.js
  - hugo/themes/PaperMod
  - site/content/lessons/ch2-sdd.md
  - site/content/lessons/ch0-warmup.md
  - site/public/en.search.min.dffeb14f7d8d7a7341184255bd8b109d325e8e12ece1663ceacb200a26f3804a.js
  - hugo/content/chapters/ch1-copilot.md
  - site/content/lessons/ch5-team.md
  - site/content/resources/commands.md
  - site/layouts/_partials/docs/menu-filetree.html
  - site/public/en.search.min.44c39d3316fe030debb8bc83d6e6ec8d01774e7952f0ee873a6512cb08460ebc.js
  - hugo/content/chapters/ch2-sdd.md
  - site/config.yaml
  - site/public/categories/index.xml
  - site/public/tags/index.xml
  - site/content/lessons/ch3-openspec.md
  - hugo/content/chapters/_index.md
  - site/public/lessons/ch-intro-ai/index.html
  - site/public/assignments/index.html
  - site/public/sitemap.xml
  - site/content/resources/_index.md
  - site/public/lessons/ch1-copilot/index.html
  - site/public/en.search-data.min.a9215e26ea6939e03a42794dbe388c9919801d47a181e9f071d0234b43c1421e.json
  - hugo/content/appendix/_index.md
  - site/public/lessons/index.html
  - site/public/icons/backward.svg
  - site/public/lessons/ch0-warmup/index.html
  - site/public/assignments/index.xml
  - hugo/archetypes/default.md
  - site/public/en.search-data.min.41a9dac731a154f571b4d3ef182cff85131a57726997dd1e0e583337ded821c2.json
  - site/public/index.xml
  - hugo/content/chapters/ch3-openspec.md
  - site/public/index.html
  - site/content/lessons/ch4-opencode.md
  - site/public/icons/forward.svg
  - site/public/lessons/ch4-opencode/index.html
  - site/public/resources/index.html
  - README.md
-->

---
### Requirement: 導言章節投影片切分結構
`site/content/lessons/ch-intro-ai.md` SHALL 包含恰好 11 個 `---` 分隔符（Markdown 水平線），將文章切分為 12 個投影片頁面。分隔符 SHALL 出現在以下位置（依文章從上到下的順序）：

1. 在「Token 與 Context Window」H3 末尾之後、「機率生成機制（為何輸出不穩定）」H3 之前
2. 在「溫度參數（Temperature）」段落末尾之後、「## 2. 什麼是 Agent」H2 之前
3. 在 Agent Loop ASCII code block 之後、「### ReAct 模式」H3 之前
4. 在「Memory 類型」表格之後、「## 3. 什麼是 Coding Agent」H2 之前
5. 在「Codebase 搜尋」工具說明段落之後、「### 與一般 Chat 的差異」H3 之前
6. 在「為何 Coding Agent 需要規格」段落之後、「## 4. 主流 Coding Agent CLI 比較」H2 之前
7. 在「模型支援光譜」ASCII code block 之後、「### 功能比較表」H3 之前
8. 在功能比較表之後、「### 觀察重點」H3 之前
9. 在「Subagent 架構差異」表格之後、「**Fallback 能力的重要性**」加粗標題之前
10. 在「本課程的選擇」段落之後、「## 小結」H2 之前
11. 文章已有的現有 `---` 分隔符 SHALL 保留在「## 1. Language Model (LLM) 基礎」H2 之前（即導言 blockquote 與三個問題列表之後）

#### Scenario: 簡報模式產生 12 張投影片
- **WHEN** 使用者對 `/lessons/ch-intro-ai/` 頁面進入簡報模式
- **THEN** 簡報模式 SHALL 建立恰好 12 張 `div.presentation-slide`

#### Scenario: 文章 `---` 分隔符數量正確
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 原始內容
- **THEN** 檔案中以獨立行出現的 `---` 分隔符 SHALL 恰好出現 11 次（不含 front matter 的 `---`）

#### Scenario: 文章文字內容不變
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 並移除所有 `---` 行
- **THEN** 剩餘文字內容 SHALL 與修改前完全相同

<!-- @trace
source: split-intro-ai-slides
updated: 2026-03-17
-->

---
### Requirement: LLM 基礎內容
導言章節正文 MUST 包含「Language Model (LLM) 基礎」段落，涵蓋以下三個子主題：
- Token 與 Context Window：說明 Context Window 決定 AI「能記住什麼」
- 機率生成機制：解釋為何 AI 輸出不穩定（非確定性輸出）
- 溫度參數（Temperature）：說明創意（高溫）與精確（低溫）的取捨

#### Scenario: LLM 基礎段落包含必要子主題
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md` 正文
- **THEN** MUST 包含「Token」、「Context Window」、「溫度」等關鍵詞的說明段落


<!-- @trace
source: add-intro-ai-concepts
updated: 2026-03-11
code:
  - site/public/tags/index.html
  - site/content/lessons/ch1-copilot.md
  - site/content/lessons/_index.md
  - hugo/content/chapters/ch4-opencode.md
  - hugo/content/_index.md
  - hugo/hugo.yaml
  - site/public/resources/index.xml
  - hugo/content/chapters/ch0-warmup.md
  - hugo/content/chapters/ch5-team.md
  - site/public/lessons/ch2-sdd/index.html
  - site/content/lessons/ch-intro-ai.md
  - site/themes/hugo-book/
  - site/public/categories/index.html
  - site/public/lessons/ch3-openspec/index.html
  - site/public/resources/commands/index.html
  - site/public/lessons/index.xml
  - site/content/_index.md
  - site/public/404.html
  - site/public/en.search-data.min.11d8fd6c789e124cfa714dc97b60c1da6ed1f7378df1a86aad25dbd2927b9e47.json
  - site/public/lessons/ch5-team/index.html
  - site/public/icons/toc.svg
  - hugo/content/appendix/commands.md
  - site/public/en.search.min.c266608cea2076427ca0be0db5767ba354b56d62c5e0f873d52a4fed991722c8.js
  - hugo/themes/PaperMod
  - site/content/lessons/ch2-sdd.md
  - site/content/lessons/ch0-warmup.md
  - site/public/en.search.min.dffeb14f7d8d7a7341184255bd8b109d325e8e12ece1663ceacb200a26f3804a.js
  - hugo/content/chapters/ch1-copilot.md
  - site/content/lessons/ch5-team.md
  - site/content/resources/commands.md
  - site/layouts/_partials/docs/menu-filetree.html
  - site/public/en.search.min.44c39d3316fe030debb8bc83d6e6ec8d01774e7952f0ee873a6512cb08460ebc.js
  - hugo/content/chapters/ch2-sdd.md
  - site/config.yaml
  - site/public/categories/index.xml
  - site/public/tags/index.xml
  - site/content/lessons/ch3-openspec.md
  - hugo/content/chapters/_index.md
  - site/public/lessons/ch-intro-ai/index.html
  - site/public/assignments/index.html
  - site/public/sitemap.xml
  - site/content/resources/_index.md
  - site/public/lessons/ch1-copilot/index.html
  - site/public/en.search-data.min.a9215e26ea6939e03a42794dbe388c9919801d47a181e9f071d0234b43c1421e.json
  - hugo/content/appendix/_index.md
  - site/public/lessons/index.html
  - site/public/icons/backward.svg
  - site/public/lessons/ch0-warmup/index.html
  - site/public/assignments/index.xml
  - hugo/archetypes/default.md
  - site/public/en.search-data.min.41a9dac731a154f571b4d3ef182cff85131a57726997dd1e0e583337ded821c2.json
  - site/public/index.xml
  - hugo/content/chapters/ch3-openspec.md
  - site/public/index.html
  - site/content/lessons/ch4-opencode.md
  - site/public/icons/forward.svg
  - site/public/lessons/ch4-opencode/index.html
  - site/public/resources/index.html
  - README.md
-->

---
### Requirement: Agent 架構內容
導言章節正文 MUST 包含「什麼是 Agent」段落，明確說明 Agent = Model + Tools + Loop，並 MUST 包含 ASCII code block 圖解，呈現 Model → Tools → Loop 的循環關係。段落 MUST 包含：
- ReAct 模式說明：Reason → Act → Observe → Repeat 的四步驟
- Memory 類型說明：區分 In-context Memory 與 External Memory

#### Scenario: Agent 架構圖解存在
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md` 正文
- **THEN** MUST 包含以 ` ``` ` 包裹的 ASCII 圖解，且圖解中 MUST 同時出現「Model」、「Tools」、「Loop」三個標籤

#### Scenario: ReAct 模式四步驟完整
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md` 正文
- **THEN** MUST 包含「Reason」、「Act」、「Observe」等步驟說明


<!-- @trace
source: add-intro-ai-concepts
updated: 2026-03-11
code:
  - site/public/tags/index.html
  - site/content/lessons/ch1-copilot.md
  - site/content/lessons/_index.md
  - hugo/content/chapters/ch4-opencode.md
  - hugo/content/_index.md
  - hugo/hugo.yaml
  - site/public/resources/index.xml
  - hugo/content/chapters/ch0-warmup.md
  - hugo/content/chapters/ch5-team.md
  - site/public/lessons/ch2-sdd/index.html
  - site/content/lessons/ch-intro-ai.md
  - site/themes/hugo-book/
  - site/public/categories/index.html
  - site/public/lessons/ch3-openspec/index.html
  - site/public/resources/commands/index.html
  - site/public/lessons/index.xml
  - site/content/_index.md
  - site/public/404.html
  - site/public/en.search-data.min.11d8fd6c789e124cfa714dc97b60c1da6ed1f7378df1a86aad25dbd2927b9e47.json
  - site/public/lessons/ch5-team/index.html
  - site/public/icons/toc.svg
  - hugo/content/appendix/commands.md
  - site/public/en.search.min.c266608cea2076427ca0be0db5767ba354b56d62c5e0f873d52a4fed991722c8.js
  - hugo/themes/PaperMod
  - site/content/lessons/ch2-sdd.md
  - site/content/lessons/ch0-warmup.md
  - site/public/en.search.min.dffeb14f7d8d7a7341184255bd8b109d325e8e12ece1663ceacb200a26f3804a.js
  - hugo/content/chapters/ch1-copilot.md
  - site/content/lessons/ch5-team.md
  - site/content/resources/commands.md
  - site/layouts/_partials/docs/menu-filetree.html
  - site/public/en.search.min.44c39d3316fe030debb8bc83d6e6ec8d01774e7952f0ee873a6512cb08460ebc.js
  - hugo/content/chapters/ch2-sdd.md
  - site/config.yaml
  - site/public/categories/index.xml
  - site/public/tags/index.xml
  - site/content/lessons/ch3-openspec.md
  - hugo/content/chapters/_index.md
  - site/public/lessons/ch-intro-ai/index.html
  - site/public/assignments/index.html
  - site/public/sitemap.xml
  - site/content/resources/_index.md
  - site/public/lessons/ch1-copilot/index.html
  - site/public/en.search-data.min.a9215e26ea6939e03a42794dbe388c9919801d47a181e9f071d0234b43c1421e.json
  - hugo/content/appendix/_index.md
  - site/public/lessons/index.html
  - site/public/icons/backward.svg
  - site/public/lessons/ch0-warmup/index.html
  - site/public/assignments/index.xml
  - hugo/archetypes/default.md
  - site/public/en.search-data.min.41a9dac731a154f571b4d3ef182cff85131a57726997dd1e0e583337ded821c2.json
  - site/public/index.xml
  - hugo/content/chapters/ch3-openspec.md
  - site/public/index.html
  - site/content/lessons/ch4-opencode.md
  - site/public/icons/forward.svg
  - site/public/lessons/ch4-opencode/index.html
  - site/public/resources/index.html
  - README.md
-->

---
### Requirement: Coding Agent 特性內容
導言章節正文 MUST 包含「什麼是 Coding Agent」段落，說明 Coding Agent 是 Agent 特化於程式碼領域的版本，並 MUST 明確列出以下三種 Coding Agent 專屬工具：
- 檔案讀寫（讀取與修改程式碼檔案）
- 終端機執行（執行指令、測試、建置）
- Codebase 搜尋（理解專案結構）

段落 MUST 以小結引橋到後續課程，說明「為何 Coding Agent 需要規格」。

正文 MUST 在「什麼是 Coding Agent」節之後、「小結」節之前，包含一個標題為「主流 Coding Agent CLI 比較」的 H2 節，該節的完整需求由 `cli-comparison` spec 定義。

#### Scenario: Coding Agent 專屬工具列舉完整
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md` 正文
- **THEN** MUST 包含「檔案讀寫」或「讀寫檔案」、「終端機」、「搜尋」相關的工具說明

#### Scenario: 引橋段落存在
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md` 正文末尾
- **THEN** MUST 包含連結或引導語句，指向後續章節（如「下一章」或「規格驅動」的提及）

#### Scenario: CLI 比較節位置正確
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 正文結構
- **THEN** 「主流 Coding Agent CLI 比較」H2 節 MUST 出現在「什麼是 Coding Agent」H2 節之後，且在「小結」H2 節之前

<!-- @trace
source: add-intro-ai-concepts
updated: 2026-03-11
code:
  - site/public/tags/index.html
  - site/content/lessons/ch1-copilot.md
  - site/content/lessons/_index.md
  - hugo/content/chapters/ch4-opencode.md
  - hugo/content/_index.md
  - hugo/hugo.yaml
  - site/public/resources/index.xml
  - hugo/content/chapters/ch0-warmup.md
  - hugo/content/chapters/ch5-team.md
  - site/public/lessons/ch2-sdd/index.html
  - site/content/lessons/ch-intro-ai.md
  - site/themes/hugo-book/
  - site/public/categories/index.html
  - site/public/lessons/ch3-openspec/index.html
  - site/public/resources/commands/index.html
  - site/public/lessons/index.xml
  - site/content/_index.md
  - site/public/404.html
  - site/public/en.search-data.min.11d8fd6c789e124cfa714dc97b60c1da6ed1f7378df1a86aad25dbd2927b9e47.json
  - site/public/lessons/ch5-team/index.html
  - site/public/icons/toc.svg
  - hugo/content/appendix/commands.md
  - site/public/en.search.min.c266608cea2076427ca0be0db5767ba354b56d62c5e0f873d52a4fed991722c8.js
  - hugo/themes/PaperMod
  - site/content/lessons/ch2-sdd.md
  - site/content/lessons/ch0-warmup.md
  - site/public/en.search.min.dffeb14f7d8d7a7341184255bd8b109d325e8e12ece1663ceacb200a26f3804a.js
  - hugo/content/chapters/ch1-copilot.md
  - site/content/lessons/ch5-team.md
  - site/content/resources/commands.md
  - site/layouts/_partials/docs/menu-filetree.html
  - site/public/en.search.min.44c39d3316fe030debb8bc83d6e6ec8d01774e7952f0ee873a6512cb08460ebc.js
  - hugo/content/chapters/ch2-sdd.md
  - site/config.yaml
  - site/public/categories/index.xml
  - site/public/tags/index.xml
  - site/content/lessons/ch3-openspec.md
  - hugo/content/chapters/_index.md
  - site/public/lessons/ch-intro-ai/index.html
  - site/public/assignments/index.html
  - site/public/sitemap.xml
  - site/content/resources/_index.md
  - site/public/lessons/ch1-copilot/index.html
  - site/public/en.search-data.min.a9215e26ea6939e03a42794dbe388c9919801d47a181e9f071d0234b43c1421e.json
  - hugo/content/appendix/_index.md
  - site/public/lessons/index.html
  - site/public/icons/backward.svg
  - site/public/lessons/ch0-warmup/index.html
  - site/public/assignments/index.xml
  - hugo/archetypes/default.md
  - site/public/en.search-data.min.41a9dac731a154f571b4d3ef182cff85131a57726997dd1e0e583337ded821c2.json
  - site/public/index.xml
  - hugo/content/chapters/ch3-openspec.md
  - site/public/index.html
  - site/content/lessons/ch4-opencode.md
  - site/public/icons/forward.svg
  - site/public/lessons/ch4-opencode/index.html
  - site/public/resources/index.html
  - README.md
-->