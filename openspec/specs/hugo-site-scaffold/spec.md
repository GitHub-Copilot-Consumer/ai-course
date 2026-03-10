# hugo-site-scaffold Specification

## Purpose

TBD - created by archiving change 'hugo-course-site'. Update Purpose after archive.

## Requirements

### Requirement: Hugo 專案目錄結構初始化
系統 SHALL 在專案根目錄下建立 `hugo/` 子目錄，包含完整的 Hugo 靜態網站標準結構，其目錄清單如下：
- `hugo/content/`：存放所有內容頁面
- `hugo/layouts/`：存放自訂版面（若需覆蓋主題預設）
- `hugo/static/`：存放靜態資源（圖片、favicon 等）
- `hugo/themes/PaperMod/`：PaperMod 主題（git submodule）
- `hugo/hugo.yaml`：Hugo 網站設定檔

#### Scenario: 確認目錄結構存在
- **WHEN** 執行 `ls hugo/` 於專案根目錄
- **THEN** 應顯示 `content/`、`layouts/`、`static/`、`themes/`、`hugo.yaml` 等項目


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
### Requirement: Hugo 設定檔 hugo.yaml 內容
系統 SHALL 建立 `hugo/hugo.yaml`，其內容 MUST 包含以下明確欄位：
- `baseURL`：設為 `/`（部署時依實際 Repo 更新）
- `languageCode`：設為 `zh-TW`
- `title`：設為 `從 AI 輔助到規格驅動 (SDD) 實戰攻略`
- `theme`：設為 `PaperMod`
- `params.homeInfoParams.Title`：設為課程標題
- `params.homeInfoParams.Content`：設為課程簡介一行說明
- `params.ShowToc`：設為 `true`
- `params.TocOpen`：設為 `false`（預設收合）
- `menu.main`：包含 `課程章節` 與 `附錄` 兩個導覽項目，分別指向 `/chapters/` 與 `/appendix/`

#### Scenario: hugo.yaml 包含必要欄位
- **WHEN** 讀取 `hugo/hugo.yaml` 檔案
- **THEN** 檔案 MUST 包含 `baseURL`、`languageCode: zh-TW`、`title`、`theme: PaperMod`、`params.ShowToc: true` 等欄位

#### Scenario: Hugo 本機建置成功
- **WHEN** 執行 `hugo -s hugo/ --minify`
- **THEN** 建置 MUST 無錯誤退出，且 `hugo/public/` 目錄 MUST 被產生


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
### Requirement: PaperMod 主題以 git submodule 安裝
系統 SHALL 以 git submodule 方式將 PaperMod 主題安裝至 `hugo/themes/PaperMod/`，且 `.gitmodules` 檔案 MUST 存在於專案根目錄並記錄此 submodule。

#### Scenario: Submodule 設定存在
- **WHEN** 讀取專案根目錄的 `.gitmodules` 檔案
- **THEN** MUST 包含 `[submodule "hugo/themes/PaperMod"]` 區塊，且 `url` 指向 `https://github.com/adityatelange/hugo-PaperMod.git`

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