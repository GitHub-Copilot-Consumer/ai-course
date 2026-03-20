# site-navigation Specification

## Purpose

TBD - created by archiving change 'hugo-course-site'. Update Purpose after archive.

## Requirements

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


<!-- @trace
source: hugo-course-site
updated: 2026-03-10
code:
  - site/content/_index.md
  - site/content/resources/_index.md
  - hugo/content/chapters/ch-intro-ai.md
  - site/public/icons/forward.svg
  - site/public/lessons/ch1-copilot/index.html
  - site/public/sitemap.xml
  - site/public/categories/index.html
  - site/public/tags/index.xml
  - README.md
  - site/content/lessons/ch3-openspec.md
  - site/public/icons/backward.svg
  - site/config.yaml
  - site/public/assignments/index.xml
  - site/public/lessons/ch5-team/index.html
  - site/public/lessons/index.xml
  - site/public/resources/index.xml
  - site/public/en.search.min.c266608cea2076427ca0be0db5767ba354b56d62c5e0f873d52a4fed991722c8.js
  - site/public/lessons/ch4-opencode/index.html
  - site/public/resources/commands/index.html
  - site/public/en.search.min.dffeb14f7d8d7a7341184255bd8b109d325e8e12ece1663ceacb200a26f3804a.js
  - site/content/lessons/_index.md
  - site/public/lessons/ch2-sdd/index.html
  - site/public/en.search-data.min.a9215e26ea6939e03a42794dbe388c9919801d47a181e9f071d0234b43c1421e.json
  - site/public/tags/index.html
  - site/themes/hugo-book/
  - site/public/en.search-data.min.11d8fd6c789e124cfa714dc97b60c1da6ed1f7378df1a86aad25dbd2927b9e47.json
  - site/public/categories/index.xml
  - site/content/lessons/ch1-copilot.md
  - site/content/lessons/ch2-sdd.md
  - site/public/lessons/ch3-openspec/index.html
  - site/content/lessons/ch4-opencode.md
  - site/public/lessons/index.html
  - .github/workflows/deploy.yml
  - site/content/lessons/ch0-warmup.md
  - site/public/index.html
  - .gitmodules
  - site/public/404.html
  - site/public/resources/index.html
  - site/content/resources/commands.md
  - site/content/lessons/ch5-team.md
  - site/public/icons/toc.svg
  - site/layouts/_partials/docs/menu-filetree.html
  - site/public/index.xml
  - site/public/lessons/ch0-warmup/index.html
  - site/public/assignments/index.html
-->

---
### Requirement: 首頁呈現章節導覽連結
系統 SHALL 在首頁（`site/content/_index.md`）正文中明確列出以下 9 個章節連結，使用 Hugo 相對路徑格式：

- `[導言：理解 Model、Agent 與 Coding Agent](/lessons/ch-intro-ai/)`
- `[0. 課前暖身：AI 輔助開發的現況與痛點](/lessons/ch0-warmup/)`
- `[1. Vibe Coding 與快速原型](/lessons/ch1-vibe-coding/)`
- `[2. 從 MVP 到規格 — 歡迎來到 Brownfield](/lessons/ch2-mvp-to-spec/)`
- `[3. Technical Spec 與 OpenSpec 工作流](/lessons/ch3-openspec/)`
- `[4. Coding Agent 結構化開發](/lessons/ch4-coding-agent/)`
- `[5. 驗證、測試與可觀測性](/lessons/ch5-verify-observe/)`
- `[6. 團隊導入策略與最佳實踐](/lessons/ch6-team/)`
- `[附錄：工具安裝與環境設定](/lessons/appendix-setup/)`

#### Scenario: 首頁包含所有章節連結
- **WHEN** 讀取 `site/content/_index.md`
- **THEN** 正文 MUST 包含指向 `/lessons/ch-intro-ai/`、`/lessons/ch0-warmup/`、`/lessons/ch1-vibe-coding/`、`/lessons/ch2-mvp-to-spec/`、`/lessons/ch3-openspec/`、`/lessons/ch4-coding-agent/`、`/lessons/ch5-verify-observe/`、`/lessons/ch6-team/`、`/lessons/appendix-setup/` 的連結


<!-- @trace
source: hugo-course-site
updated: 2026-03-10
code:
  - site/content/_index.md
  - site/content/resources/_index.md
  - hugo/content/chapters/ch-intro-ai.md
  - site/public/icons/forward.svg
  - site/public/lessons/ch1-copilot/index.html
  - site/public/sitemap.xml
  - site/public/categories/index.html
  - site/public/tags/index.xml
  - README.md
  - site/content/lessons/ch3-openspec.md
  - site/public/icons/backward.svg
  - site/config.yaml
  - site/public/assignments/index.xml
  - site/public/lessons/ch5-team/index.html
  - site/public/lessons/index.xml
  - site/public/resources/index.xml
  - site/public/en.search.min.c266608cea2076427ca0be0db5767ba354b56d62c5e0f873d52a4fed991722c8.js
  - site/public/lessons/ch4-opencode/index.html
  - site/public/resources/commands/index.html
  - site/public/en.search.min.dffeb14f7d8d7a7341184255bd8b109d325e8e12ece1663ceacb200a26f3804a.js
  - site/content/lessons/_index.md
  - site/public/lessons/ch2-sdd/index.html
  - site/public/en.search-data.min.a9215e26ea6939e03a42794dbe388c9919801d47a181e9f071d0234b43c1421e.json
  - site/public/tags/index.html
  - site/themes/hugo-book/
  - site/public/en.search-data.min.11d8fd6c789e124cfa714dc97b60c1da6ed1f7378df1a86aad25dbd2927b9e47.json
  - site/public/categories/index.xml
  - site/content/lessons/ch1-copilot.md
  - site/content/lessons/ch2-sdd.md
  - site/public/lessons/ch3-openspec/index.html
  - site/content/lessons/ch4-opencode.md
  - site/public/lessons/index.html
  - .github/workflows/deploy.yml
  - site/content/lessons/ch0-warmup.md
  - site/public/index.html
  - .gitmodules
  - site/public/404.html
  - site/public/resources/index.html
  - site/content/resources/commands.md
  - site/content/lessons/ch5-team.md
  - site/public/icons/toc.svg
  - site/layouts/_partials/docs/menu-filetree.html
  - site/public/index.xml
  - site/public/lessons/ch0-warmup/index.html
  - site/public/assignments/index.html
-->

---
### Requirement: 章節頁面目錄（TOC）啟用
系統 SHALL 確保 PaperMod 的目錄功能於所有章節頁面中可用，透過 `hugo/hugo.yaml` 全域設定 `params.ShowToc: true`。各章節頁面如需覆蓋，可在個別 front matter 中設定 `showToc: false`，但預設 MUST 為啟用狀態。

#### Scenario: 全域 TOC 設定為啟用
- **WHEN** 讀取 `hugo/hugo.yaml`
- **THEN** `params.ShowToc` MUST 為 `true`

<!-- @trace
source: hugo-course-site
updated: 2026-03-10
code:
  - site/content/_index.md
  - site/content/resources/_index.md
  - hugo/content/chapters/ch-intro-ai.md
  - site/public/icons/forward.svg
  - site/public/lessons/ch1-copilot/index.html
  - site/public/sitemap.xml
  - site/public/categories/index.html
  - site/public/tags/index.xml
  - README.md
  - site/content/lessons/ch3-openspec.md
  - site/public/icons/backward.svg
  - site/config.yaml
  - site/public/assignments/index.xml
  - site/public/lessons/ch5-team/index.html
  - site/public/lessons/index.xml
  - site/public/resources/index.xml
  - site/public/en.search.min.c266608cea2076427ca0be0db5767ba354b56d62c5e0f873d52a4fed991722c8.js
  - site/public/lessons/ch4-opencode/index.html
  - site/public/resources/commands/index.html
  - site/public/en.search.min.dffeb14f7d8d7a7341184255bd8b109d325e8e12ece1663ceacb200a26f3804a.js
  - site/content/lessons/_index.md
  - site/public/lessons/ch2-sdd/index.html
  - site/public/en.search-data.min.a9215e26ea6939e03a42794dbe388c9919801d47a181e9f071d0234b43c1421e.json
  - site/public/tags/index.html
  - site/themes/hugo-book/
  - site/public/en.search-data.min.11d8fd6c789e124cfa714dc97b60c1da6ed1f7378df1a86aad25dbd2927b9e47.json
  - site/public/categories/index.xml
  - site/content/lessons/ch1-copilot.md
  - site/content/lessons/ch2-sdd.md
  - site/public/lessons/ch3-openspec/index.html
  - site/content/lessons/ch4-opencode.md
  - site/public/lessons/index.html
  - .github/workflows/deploy.yml
  - site/content/lessons/ch0-warmup.md
  - site/public/index.html
  - .gitmodules
  - site/public/404.html
  - site/public/resources/index.html
  - site/content/resources/commands.md
  - site/content/lessons/ch5-team.md
  - site/public/icons/toc.svg
  - site/layouts/_partials/docs/menu-filetree.html
  - site/public/index.xml
  - site/public/lessons/ch0-warmup/index.html
  - site/public/assignments/index.html
-->

---
### Requirement: 課程 sidebar 排序規則
課程頁面的 sidebar 順序 SHALL 由各頁面 front matter 中的 `weight` 欄位控制，且所有課程頁面的 `weight` 值 MUST 為非零正整數（≥ 1）或負整數，不得使用 `0`，以避免 Hugo 將其視為未設定而排至最後。

此排序規則 MUST 同時適用於桌機版（`>= 768px`）與行動版（`< 768px`）的 sidebar 顯示。

課程頁面的 `weight` 值 MUST 依照以下明確清單設定：

| 檔案 | weight |
|------|--------|
| `site/content/lessons/ch-intro-ai.md` | `-1` |
| `site/content/lessons/ch0-warmup.md` | `1` |
| `site/content/lessons/ch1-vibe-coding.md` | `2` |
| `site/content/lessons/ch2-mvp-to-spec.md` | `3` |
| `site/content/lessons/ch3-openspec.md` | `4` |
| `site/content/lessons/ch4-coding-agent.md` | `5` |
| `site/content/lessons/ch5-verify-observe.md` | `6` |
| `site/content/lessons/ch6-team.md` | `7` |
| `site/content/lessons/appendix-setup.md` | `8` |

#### Scenario: sidebar 顯示順序正確（桌機版）
- **WHEN** 瀏覽 `/lessons/` 頁面，視窗寬度 `>= 768px`
- **THEN** 左側 sidebar MUST 依 weight 順序顯示所有章節連結

#### Scenario: sidebar 顯示順序正確（行動版）
- **WHEN** 瀏覽 `/lessons/` 頁面，視窗寬度 `< 768px`，使用者展開 sidebar
- **THEN** sidebar MUST 依 weight 順序顯示所有章節連結

#### Scenario: ch0-warmup 不排在最後
- **WHEN** 讀取 `site/content/lessons/ch0-warmup.md` 的 front matter
- **THEN** `weight` MUST 為 `1`（非 `0`）