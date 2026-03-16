## Why

現有 ch0～ch5 各章節內容僅為概念摘要（每章 20–35 行），缺乏具體的執行步驟、指令範例與動手實作說明。學員在上課或自修時無法直接照著操作，需要補充細節到「照著做就能執行」的程度。

## What Changes

- **ch0-warmup.md**：補充三階段演進的具體歷史背景、常見災難現場的實際案例與解法建議、課程目標的預期學習成果。
- **ch1-copilot.md**：補充 Context Awareness 的操作示範（如何控制 `#file`、`#selection`）、各 Prompt 技巧的範例對比（壞 vs 好 Prompt）、`copilot-instructions.md` 的完整範本與設定步驟、Lab 的逐步操作指引。
- **ch2-sdd.md**：補充 TDD vs SDD 的對比說明、Code Entropy 的量化示範、OpenSpec 初始化與基本流程的指令步驟、與 Agile/CI 整合的具體設定方式。
- **ch3-openspec.md**：補充每個 OPSX 指令的詳細說明與輸出範例、Lab 練習的完整逐步指引（包含預期輸出）、Multitasking 場景的操作流程。
- **ch4-opencode.md**：補充 OpenCode 安裝與設定步驟（含 API Key 設定）、Ollama 本地模型安裝流程、混合架構的切換操作方式、Lab 的完整指令步驟。
- **ch5-team.md**：補充模型選擇決策樹的具體條件、`openspec/` 目錄結構標準範本、導入 Roadmap 每個階段的具體行動項目、Code Review checklist 範本。

## Capabilities

### New Capabilities

- `ch0-detailed-content`：ch0 暖身章節詳細內容，包含演進背景、災難案例與學習目標。
- `ch1-detailed-content`：ch1 Copilot 章節詳細內容，含操作步驟、Prompt 範例與 Lab 指引。
- `ch2-detailed-content`：ch2 SDD 章節詳細內容，含指令步驟、概念對比與整合方式。
- `ch3-detailed-content`：ch3 OpenSpec 章節詳細內容，含 OPSX 指令詳解與完整 Lab 流程。
- `ch4-detailed-content`：ch4 OpenCode 章節詳細內容，含安裝步驟、模型設定與 Lab 流程。
- `ch5-detailed-content`：ch5 團隊導入章節詳細內容，含決策樹、目錄範本與 Roadmap 行動項目。

### Modified Capabilities

- `course-content-pages`：六個課程頁面內容大幅擴充，由摘要升級為完整可操作的教學文件。

## Impact

- 修改 `site/content/lessons/ch0-warmup.md` ～ `ch5-team.md` 共 6 個檔案
- 每個章節篇幅預計從 20–35 行擴充至 150–300 行
- 不影響 Hugo 設定、導航結構、佈景主題或任何程式碼
- 不新增頁面，僅擴充現有頁面內容
