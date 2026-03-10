## ADDED Requirements

### Requirement: 首頁內容頁面
系統 SHALL 建立 `hugo/content/_index.md`，作為網站首頁，其 front matter MUST 包含：
- `title`：`從 AI 輔助到規格驅動 (SDD) 實戰攻略`
- `description`：課程簡介說明
- 正文 MUST 包含課程總覽摘要，列出 0–5 章節標題及連結

#### Scenario: 首頁檔案存在且包含必要欄位
- **WHEN** 讀取 `hugo/content/_index.md`
- **THEN** front matter MUST 包含 `title` 欄位，且正文 MUST 包含指向各章節的 Markdown 連結

### Requirement: 章節索引頁面
系統 SHALL 建立 `hugo/content/chapters/_index.md`，作為章節列表頁，其 front matter MUST 包含：
- `title`：`課程章節`
- `description`：章節列表說明

#### Scenario: 章節索引頁存在
- **WHEN** 讀取 `hugo/content/chapters/_index.md`
- **THEN** 檔案 MUST 存在且 front matter MUST 包含 `title: 課程章節`

### Requirement: 各章節內容頁面
系統 SHALL 建立以下明確命名的 6 個章節頁面，每個頁面對應 `index.md` 的一個 `##` 章節：

| 檔案路徑 | 對應章節 |
|----------|---------|
| `hugo/content/chapters/ch0-warmup.md` | 0. 課前暖身：AI 輔助開發的現況與痛點 |
| `hugo/content/chapters/ch1-copilot.md` | 1. GitHub Copilot Chat：從「對話」到「生產力」 |
| `hugo/content/chapters/ch2-sdd.md` | 2. 解決雜亂無章：引入 SDD (Spec-Driven Development) |
| `hugo/content/chapters/ch3-openspec.md` | 3. (實戰) OpenSpec 與 OPSX 工作流 |
| `hugo/content/chapters/ch4-opencode.md` | 4. 跨越生態系：從 Copilot 遷移至 OpenCode |
| `hugo/content/chapters/ch5-team.md` | 5. 團隊導入策略與最佳實踐 |

每個章節頁面的 front matter MUST 包含：
- `title`：對應章節完整標題
- `weight`：對應章節編號（0–5），用於排序
- `description`：章節引言（取自 `> 引言` 區塊）

每個章節頁面正文 MUST 包含原 `index.md` 對應章節的完整內容（含子節、列點、表格）。

#### Scenario: 章節頁面集合完整性
- **WHEN** 列出 `hugo/content/chapters/` 目錄
- **THEN** MUST 包含 `_index.md`、`ch0-warmup.md`、`ch1-copilot.md`、`ch2-sdd.md`、`ch3-openspec.md`、`ch4-opencode.md`、`ch5-team.md` 共 7 個檔案（_index.md + 6 個章節頁面）

#### Scenario: 章節頁面 front matter 正確
- **WHEN** 讀取 `hugo/content/chapters/ch3-openspec.md`
- **THEN** front matter MUST 包含 `title`（含「OpenSpec」字串）、`weight: 3`、`description` 等欄位

### Requirement: 附錄內容頁面
系統 SHALL 建立以下附錄頁面：

| 檔案路徑 | 內容 |
|----------|------|
| `hugo/content/appendix/_index.md` | 附錄索引頁，front matter 含 `title: 附錄` |
| `hugo/content/appendix/commands.md` | 常用 OPSX 指令速查，內容取自 `index.md` 附錄章節 |

`commands.md` front matter MUST 包含：
- `title`：`常用 OPSX 指令速查`
- `weight`：`1`

#### Scenario: 附錄指令速查頁存在且內容完整
- **WHEN** 讀取 `hugo/content/appendix/commands.md`
- **THEN** 正文 MUST 包含 `/opsx:explore`、`/opsx:ff`、`/opsx:apply`、`/opsx:verify` 等指令說明
