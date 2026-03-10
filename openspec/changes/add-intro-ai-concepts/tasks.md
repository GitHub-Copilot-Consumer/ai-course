## 1. 建立導言章節 Hugo 頁面

- [x] 1.1 建立 `hugo/content/chapters/ch-intro-ai.md`，front matter 包含 `title: 導言：理解 Model、Agent 與 Coding Agent`、`weight: -1`、`description`、`showToc: true`
- [x] 1.2 在頁面正文加入「Language Model (LLM) 基礎」段落，涵蓋 Token 與 Context Window、機率生成機制（非確定性輸出說明）、溫度參數（創意 vs 精確取捨）
- [x] 1.3 在頁面正文加入「什麼是 Agent」段落，以 code block 包住 ASCII 圖解（Model → Tools → Loop 循環），明確標示三個標籤：`Model`、`Tools`、`Loop`
- [x] 1.4 在 Agent 段落中加入 ReAct 模式說明（Reason → Act → Observe → Repeat），與 Memory 類型說明（In-context / External）
- [x] 1.5 在頁面正文加入「什麼是 Coding Agent」段落，明確列出三種專屬工具：檔案讀寫、終端機執行、Codebase 搜尋
- [x] 1.6 在 Coding Agent 段落末尾加入小結引橋句，提及「為何 Coding Agent 需要規格」以銜接後續課程

## 2. 更新課程大綱

- [x] 2.1 在 `index.md` 的 Ch0 段落之前，插入新章節「導言：理解 Model、Agent 與 Coding Agent」的描述，包含三個子主題（LLM 基礎、Agent 架構、Coding Agent 特性）的說明

## 3. 驗收

- [x] 3.1 執行 `hugo server -s hugo/` 確認導言章節頁面可正常存取，且在章節列表中排在 Ch0 之前
- [x] 3.2 確認 `hugo/content/chapters/` 目錄共有 8 個檔案（`_index.md` + 7 個章節頁面，含新增的 `ch-intro-ai.md`）
- [x] 3.3 執行 `hugo -s hugo/ --minify` 確認建置無錯誤
- [ ] 3.4 git commit: `feat: add intro chapter on Model, Agent, and Coding Agent concepts`
