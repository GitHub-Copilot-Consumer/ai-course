## ADDED Requirements

### Requirement: 導言章節 Hugo 頁面
系統 SHALL 建立 `hugo/content/chapters/ch-intro-ai.md`，作為課程導言章節，其 front matter MUST 包含：
- `title`：`導言：理解 Model、Agent 與 Coding Agent`
- `weight`：`-1`（確保排序在 ch0 之前）
- `description`：「在學習工具操作前，先理解 AI 工具背後的運作機制。」
- `showToc`：`true`

#### Scenario: 導言章節檔案存在且排序正確
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md`
- **THEN** front matter MUST 包含 `weight: -1`，確保在 Hugo 章節列表中排在最前

### Requirement: LLM 基礎內容
導言章節正文 MUST 包含「Language Model (LLM) 基礎」段落，涵蓋以下三個子主題：
- Token 與 Context Window：說明 Context Window 決定 AI「能記住什麼」
- 機率生成機制：解釋為何 AI 輸出不穩定（非確定性輸出）
- 溫度參數（Temperature）：說明創意（高溫）與精確（低溫）的取捨

#### Scenario: LLM 基礎段落包含必要子主題
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md` 正文
- **THEN** MUST 包含「Token」、「Context Window」、「溫度」等關鍵詞的說明段落

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

### Requirement: Coding Agent 特性內容
導言章節正文 MUST 包含「什麼是 Coding Agent」段落，說明 Coding Agent 是 Agent 特化於程式碼領域的版本，並 MUST 明確列出以下三種 Coding Agent 專屬工具：
- 檔案讀寫（讀取與修改程式碼檔案）
- 終端機執行（執行指令、測試、建置）
- Codebase 搜尋（理解專案結構）

段落 MUST 以小結引橋到後續課程，說明「為何 Coding Agent 需要規格」。

#### Scenario: Coding Agent 專屬工具列舉完整
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md` 正文
- **THEN** MUST 包含「檔案讀寫」或「讀寫檔案」、「終端機」、「搜尋」相關的工具說明

#### Scenario: 引橋段落存在
- **WHEN** 讀取 `hugo/content/chapters/ch-intro-ai.md` 正文末尾
- **THEN** MUST 包含連結或引導語句，指向後續章節（如「下一章」或「規格驅動」的提及）
