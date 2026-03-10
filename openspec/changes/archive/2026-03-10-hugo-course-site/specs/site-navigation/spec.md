## ADDED Requirements

### Requirement: 主選單導覽設定
系統 SHALL 在 `hugo/hugo.yaml` 的 `menu.main` 中設定以下明確的導覽項目清單：

| 名稱 | URL | Weight |
|------|-----|--------|
| 課程章節 | `/chapters/` | 1 |
| 附錄 | `/appendix/` | 2 |

導覽項目 MUST 以 `weight` 欄位控制顯示順序（數字小者優先）。

#### Scenario: 導覽選單包含兩個項目
- **WHEN** 讀取 `hugo/hugo.yaml` 的 `menu.main` 區塊
- **THEN** MUST 包含 `identifier: chapters` 與 `identifier: appendix` 兩個項目，且各自的 `url` 分別為 `/chapters/` 與 `/appendix/`

### Requirement: 首頁呈現章節導覽連結
系統 SHALL 在首頁（`hugo/content/_index.md`）正文中明確列出以下 6 個章節連結，使用 Hugo 相對路徑格式：

- `[0. 課前暖身](/chapters/ch0-warmup/)`
- `[1. GitHub Copilot Chat](/chapters/ch1-copilot/)`
- `[2. 引入 SDD](/chapters/ch2-sdd/)`
- `[3. OpenSpec 與 OPSX 工作流](/chapters/ch3-openspec/)`
- `[4. 跨越生態系](/chapters/ch4-opencode/)`
- `[5. 團隊導入策略](/chapters/ch5-team/)`

#### Scenario: 首頁包含所有章節連結
- **WHEN** 讀取 `hugo/content/_index.md`
- **THEN** 正文 MUST 包含指向 `/chapters/ch0-warmup/`、`/chapters/ch1-copilot/`、`/chapters/ch2-sdd/`、`/chapters/ch3-openspec/`、`/chapters/ch4-opencode/`、`/chapters/ch5-team/` 的連結

### Requirement: 章節頁面目錄（TOC）啟用
系統 SHALL 確保 PaperMod 的目錄功能於所有章節頁面中可用，透過 `hugo/hugo.yaml` 全域設定 `params.ShowToc: true`。各章節頁面如需覆蓋，可在個別 front matter 中設定 `showToc: false`，但預設 MUST 為啟用狀態。

#### Scenario: 全域 TOC 設定為啟用
- **WHEN** 讀取 `hugo/hugo.yaml`
- **THEN** `params.ShowToc` MUST 為 `true`
