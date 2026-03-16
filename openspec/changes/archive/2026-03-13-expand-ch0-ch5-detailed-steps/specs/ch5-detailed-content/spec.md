## ADDED Requirements

### Requirement: ch5 模型選擇決策樹含具體條件
`site/content/lessons/ch5-team.md` 的「模型選擇決策樹」段落 SHALL 補充：
- 以流程圖（ASCII art 或 Markdown 格式）呈現決策邏輯
- 判斷條件 MUST 包含：任務類型（規劃/實作/機密）、資料敏感度、成本預算
- 每個終態節點 MUST 對應一個具體的模型推薦（如：Claude 3.5 Sonnet、GPT-4o mini、Llama 3 Local）

#### Scenario: 決策樹含判斷條件與模型推薦
- **WHEN** 讀取 `site/content/lessons/ch5-team.md`
- **THEN** 正文 MUST 包含以流程圖格式呈現的決策樹，且 MUST 包含至少 3 個不同的模型推薦終態

### Requirement: ch5 包含 openspec 目錄結構標準範本
`site/content/lessons/ch5-team.md` 的「專案結構標準化」段落 SHALL 補充：
- `openspec/` 目錄完整結構的 code block（tree 格式，包含 `specs/`、`changes/`、`adr/` 等子目錄）
- `.github/prompts/` 目錄的建議內容清單（至少 3 個 prompt 檔案的命名建議）
- 一個最小可用的 `openspec/config.yaml` 範本（code block）

#### Scenario: 目錄結構含 tree 格式 code block
- **WHEN** 讀取 `site/content/lessons/ch5-team.md`
- **THEN** 正文 MUST 包含 `openspec/` 目錄的 tree 格式 code block，且 MUST 包含 `specs/` 與 `changes/` 子目錄

### Requirement: ch5 導入 Roadmap 含每階段具體行動項目
`site/content/lessons/ch5-team.md` 的「導入 Roadmap」段落 SHALL 為每個階段補充具體行動項目清單：
- Week 1-2（工具安裝與觀念對齊）：至少 4 個具體行動（如：Workshop 議程、安裝 Checklist）
- Week 3-4（小模組試行）：至少 3 個具體行動（如：選定 Pilot 模組標準、Review 機制）
- Month 2+（整合 CI/CD）：至少 3 個具體行動（如：GitHub Actions 設定、Code Review Checklist）
每個行動項目 MUST 有負責角色（如：Tech Lead、All engineers）

#### Scenario: Roadmap 各階段含行動項目與負責角色
- **WHEN** 讀取 `site/content/lessons/ch5-team.md`
- **THEN** Roadmap 段落 MUST 包含「負責角色」說明，且每個階段 MUST 有至少 3 個具體行動項目

### Requirement: ch5 包含人機協作邊界的具體範例
`site/content/lessons/ch5-team.md` 的「人機協作邊界」段落 SHALL 補充：
- 以表格形式列出至少 6 個具體任務類型，標注「人負責」或「AI 負責」
- 「灰色地帶」說明（需要人主導但 AI 可輔助的任務，如 Spec Review）
- Code Review Checklist 範本（以 Markdown checklist 格式呈現，至少 5 個項目）

#### Scenario: 人機協作表格有具體任務分類
- **WHEN** 讀取 `site/content/lessons/ch5-team.md`
- **THEN** 正文 MUST 包含 Markdown 表格，表格 MUST 同時包含「人負責」與「AI 負責」欄位，且 MUST 有至少 6 個任務列
