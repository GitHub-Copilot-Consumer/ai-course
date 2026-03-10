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