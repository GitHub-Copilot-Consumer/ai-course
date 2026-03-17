## ADDED Requirements

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
