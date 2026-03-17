## ADDED Requirements

### Requirement: 新增 everything-claude-code 資源頁面
系統 SHALL 在 `site/content/resources/everything-claude-code.md` 提供一個繁體中文說明頁面，介紹 `everything-claude-code` 專案及其與 OpenCode 的整合方式。

#### Scenario: 頁面存在且可被 Hugo 渲染
- **WHEN** Hugo 建置執行時
- **THEN** `site/content/resources/everything-claude-code.md` 存在，Hugo 建置成功（exit code 0），且不產生 `everything-claude-code.md` 相關的錯誤或警告

#### Scenario: 頁面 frontmatter 正確
- **WHEN** 讀取 `site/content/resources/everything-claude-code.md` 的 YAML frontmatter
- **THEN** 包含 `title`、`weight: 2`、`description`、`showToc: true` 四個欄位，且值均不為空

### Requirement: 頁面包含專案簡介區塊
`everything-claude-code.md` SHALL 包含一個「專案簡介」區塊（`## 專案簡介` 或等效標題），說明此專案是一個支援 Claude Code、OpenCode、Cursor 等工具的 agent harness 系統，並包含 GitHub 連結 `https://github.com/affaan-m/everything-claude-code`。

#### Scenario: 專案簡介區塊存在
- **WHEN** 讀取頁面內容
- **THEN** 頁面中存在包含「agent harness」或「agent 強化」相關說明的段落，且包含完整 GitHub URL

### Requirement: 頁面包含核心元件說明
`everything-claude-code.md` SHALL 包含一個介紹核心元件的區塊，以表格或清單形式列出以下五個元件名稱及其功能說明：Skills、Hooks、Commands、Rules、Instincts。

#### Scenario: 五個核心元件均出現在頁面中
- **WHEN** 讀取頁面內容
- **THEN** 頁面中包含 "Skills"、"Hooks"、"Commands"、"Rules"、"Instincts" 這五個詞彙，每個均附有功能說明文字

### Requirement: 頁面包含安裝方式說明
`everything-claude-code.md` SHALL 包含安裝方式說明，明確區分「Plugin 安裝」與「手動安裝」兩種方式，各自包含步驟說明。

#### Scenario: 兩種安裝方式均有說明
- **WHEN** 讀取頁面內容
- **THEN** 頁面中包含 Plugin 安裝（含 npm install 指令）與手動安裝的說明段落

### Requirement: 頁面包含 OpenCode 整合說明
`everything-claude-code.md` SHALL 包含與 OpenCode 整合的專屬區塊，說明整合步驟及至少兩個實際使用場景範例。

#### Scenario: OpenCode 整合區塊存在
- **WHEN** 讀取頁面內容
- **THEN** 頁面中存在以 "OpenCode" 為主題的區塊，包含整合步驟說明

#### Scenario: 使用場景範例存在
- **WHEN** 讀取頁面內容
- **THEN** 頁面中包含至少兩個具體的使用場景或範例（如 Skills 整合、Hooks 自動化等）
