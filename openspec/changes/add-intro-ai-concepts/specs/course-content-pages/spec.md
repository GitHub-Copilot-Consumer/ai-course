## MODIFIED Requirements

### Requirement: 各章節內容頁面
系統 SHALL 建立以下明確命名的 7 個章節頁面（新增導言章節），每個頁面對應課程大綱的一個章節：

| 檔案路徑 | 對應章節 |
|----------|---------|
| `hugo/content/chapters/ch-intro-ai.md` | 導言：理解 Model、Agent 與 Coding Agent |
| `hugo/content/chapters/ch0-warmup.md` | 0. 課前暖身：AI 輔助開發的現況與痛點 |
| `hugo/content/chapters/ch1-copilot.md` | 1. GitHub Copilot Chat：從「對話」到「生產力」 |
| `hugo/content/chapters/ch2-sdd.md` | 2. 解決雜亂無章：引入 SDD (Spec-Driven Development) |
| `hugo/content/chapters/ch3-openspec.md` | 3. (實戰) OpenSpec 與 OPSX 工作流 |
| `hugo/content/chapters/ch4-opencode.md` | 4. 跨越生態系：從 Copilot 遷移至 OpenCode |
| `hugo/content/chapters/ch5-team.md` | 5. 團隊導入策略與最佳實踐 |

每個章節頁面的 front matter MUST 包含：
- `title`：對應章節完整標題
- `weight`：對應章節排序數值（導言為 -1，ch0 為 0，ch1~ch5 為 1~5）
- `description`：章節引言

每個章節頁面正文 MUST 包含對應章節的完整內容（含子節、列點、表格）。

#### Scenario: 章節頁面集合完整性
- **WHEN** 列出 `hugo/content/chapters/` 目錄
- **THEN** MUST 包含 `_index.md`、`ch-intro-ai.md`、`ch0-warmup.md`、`ch1-copilot.md`、`ch2-sdd.md`、`ch3-openspec.md`、`ch4-opencode.md`、`ch5-team.md` 共 8 個檔案（_index.md + 7 個章節頁面）

#### Scenario: 導言章節排序在最前
- **WHEN** Hugo 以 weight 排序 `hugo/content/chapters/` 的頁面
- **THEN** `ch-intro-ai.md`（weight: -1）MUST 排在 `ch0-warmup.md`（weight: 0）之前

#### Scenario: 章節頁面 front matter 正確
- **WHEN** 讀取 `hugo/content/chapters/ch3-openspec.md`
- **THEN** front matter MUST 包含 `title`（含「OpenSpec」字串）、`weight: 3`、`description` 等欄位
