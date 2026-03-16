## ADDED Requirements

### Requirement: ch1 頁面包含 Context Awareness 操作說明
`site/content/lessons/ch1-copilot.md` 的「Copilot 運作心智模型」段落 SHALL 補充以下 Context 控制方式的具體操作步驟：
- `#file`：引用特定檔案的語法與使用時機
- `#selection`：選取程式碼片段的操作方式
- `@workspace`：啟用全專案搜尋的前提條件
- 每種方式 MUST 附上使用範例（一行 Prompt 示範）

#### Scenario: Context 控制方式有操作範例
- **WHEN** 讀取 `site/content/lessons/ch1-copilot.md`
- **THEN** 正文 MUST 包含 `#file`、`#selection`、`@workspace` 三種方式的使用範例

### Requirement: ch1 Prompt 技巧含壞 vs 好對比
`site/content/lessons/ch1-copilot.md` 的「進階 Prompt Engineering 技巧」段落 SHALL 為 Role Prompting、Chain of Thought、Negative Prompting 三個技巧各補充：
- 壞 Prompt 範例（以 code block 呈現）
- 好 Prompt 範例（以 code block 呈現）
- 差異說明（1–2 句）

#### Scenario: 每個 Prompt 技巧有壞/好對比
- **WHEN** 讀取 `site/content/lessons/ch1-copilot.md`
- **THEN** Role Prompting、Chain of Thought、Negative Prompting 各自 MUST 有壞範例與好範例的 code block

### Requirement: ch1 copilot-instructions.md 含完整設定步驟
`site/content/lessons/ch1-copilot.md` 的「企業級指令深挖」段落 SHALL 補充 `.github/copilot-instructions.md` 的：
- 建立步驟（3 步以內的逐步指引）
- 最小可用範本（以 code block 呈現，含角色定義、語言規範、禁止事項三個段落）
- 生效驗證方式（如何確認 Copilot 已讀取該檔案）

#### Scenario: copilot-instructions.md 範本存在於章節
- **WHEN** 讀取 `site/content/lessons/ch1-copilot.md`
- **THEN** 正文 MUST 包含 `.github/copilot-instructions.md` 的 code block 範本，且範本 MUST 包含角色定義段落

### Requirement: ch1 Lab 含逐步操作指引
`site/content/lessons/ch1-copilot.md` 的「Lab 實戰」段落 SHALL 展開為：
- 前置條件清單（需安裝哪些工具、版本需求）
- Lab A「建立 Prompt Library」的逐步步驟（至少 4 步）
- Lab B「精準 Prompt 修復 Bug」的逐步步驟（含具體 Bug 情境描述）
- 每個 Lab 的預期完成標準（Done criteria）

#### Scenario: Lab 有逐步步驟
- **WHEN** 讀取 `site/content/lessons/ch1-copilot.md`
- **THEN** Lab 段落 MUST 包含編號步驟清單（`1.`、`2.` 格式），且步驟數量 MUST 不少於 4
