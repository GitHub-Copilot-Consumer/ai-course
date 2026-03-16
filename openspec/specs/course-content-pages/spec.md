# course-content-pages Specification

## Purpose

TBD - created by archiving change 'hugo-course-site'. Update Purpose after archive.

## Requirements

### Requirement: 首頁內容頁面
系統 SHALL 建立 `hugo/content/_index.md`，作為網站首頁，其 front matter MUST 包含：
- `title`：`從 AI 輔助到規格驅動 (SDD) 實戰攻略`
- `description`：課程簡介說明
- 正文 MUST 包含課程總覽摘要，列出 0–5 章節標題及連結

#### Scenario: 首頁檔案存在且包含必要欄位
- **WHEN** 讀取 `hugo/content/_index.md`
- **THEN** front matter MUST 包含 `title` 欄位，且正文 MUST 包含指向各章節的 Markdown 連結


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
### Requirement: 章節索引頁面
系統 SHALL 建立 `hugo/content/chapters/_index.md`，作為章節列表頁，其 front matter MUST 包含：
- `title`：`課程章節`
- `description`：章節列表說明

#### Scenario: 章節索引頁存在
- **WHEN** 讀取 `hugo/content/chapters/_index.md`
- **THEN** 檔案 MUST 存在且 front matter MUST 包含 `title: 課程章節`


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
### Requirement: 各章節內容頁面
系統 SHALL 維護以下明確命名的章節頁面（同 existing spec），且每個頁面正文 MUST 包含對應章節的完整內容，具體要求如下：

| 檔案路徑 | 最小行數 | 必含內容 |
|----------|---------|---------|
| `site/content/lessons/ch0-warmup.md` | 100 行 | 學習目標段落、三階段演進各含代表工具、災難現場含解法 |
| `site/content/lessons/ch1-copilot.md` | 150 行 | Context 控制操作說明、Prompt 壞/好對比、copilot-instructions.md 範本、Lab 逐步步驟 |
| `site/content/lessons/ch2-sdd.md` | 130 行 | TDD vs SDD 對比表格、openspec 初始化步驟含輸出、CI/CD 整合 GitHub Actions 範本 |
| `site/content/lessons/ch3-openspec.md` | 200 行 | 每個 OPSX 指令的輸出範例、環境初始化目錄結構圖、Lab A 完整 5 步驟、多工並行示意 |
| `site/content/lessons/ch4-opencode.md` | 150 行 | 安裝步驟含 API Key 設定、Ollama 安裝流程、Plan/Build 模式切換、Lab 離線步驟 |
| `site/content/lessons/ch5-team.md` | 150 行 | 模型決策樹流程圖、openspec 目錄 tree 格式、Roadmap 含負責角色、人機協作表格 |

每個章節頁面的 front matter MUST 保持不變（`title`、`weight`、`description`、`showToc: true`）。

#### Scenario: 章節頁面內容完整性 - ch3
- **WHEN** 讀取 `site/content/lessons/ch3-openspec.md`
- **THEN** 正文 MUST 包含 `/opsx:apply` 指令的 code block 輸出範例，且總行數 MUST 不少於 200 行

#### Scenario: 章節頁面 front matter 不變
- **WHEN** 讀取任意一個 `site/content/lessons/ch*.md`
- **THEN** front matter MUST 包含原有 `title`、`weight`、`description`、`showToc: true` 欄位，且值與原本一致


<!-- @trace
source: add-intro-ai-concepts
updated: 2026-03-11
code:
  - site/public/tags/index.html
  - site/content/lessons/ch1-copilot.md
  - site/content/lessons/_index.md
  - hugo/content/chapters/ch4-opencode.md
  - hugo/content/_index.md
  - hugo/hugo.yaml
  - site/public/resources/index.xml
  - hugo/content/chapters/ch0-warmup.md
  - hugo/content/chapters/ch5-team.md
  - site/public/lessons/ch2-sdd/index.html
  - site/content/lessons/ch-intro-ai.md
  - site/themes/hugo-book/
  - site/public/categories/index.html
  - site/public/lessons/ch3-openspec/index.html
  - site/public/resources/commands/index.html
  - site/public/lessons/index.xml
  - site/content/_index.md
  - site/public/404.html
  - site/public/en.search-data.min.11d8fd6c789e124cfa714dc97b60c1da6ed1f7378df1a86aad25dbd2927b9e47.json
  - site/public/lessons/ch5-team/index.html
  - site/public/icons/toc.svg
  - hugo/content/appendix/commands.md
  - site/public/en.search.min.c266608cea2076427ca0be0db5767ba354b56d62c5e0f873d52a4fed991722c8.js
  - hugo/themes/PaperMod
  - site/content/lessons/ch2-sdd.md
  - site/content/lessons/ch0-warmup.md
  - site/public/en.search.min.dffeb14f7d8d7a7341184255bd8b109d325e8e12ece1663ceacb200a26f3804a.js
  - hugo/content/chapters/ch1-copilot.md
  - site/content/lessons/ch5-team.md
  - site/content/resources/commands.md
  - site/layouts/_partials/docs/menu-filetree.html
  - site/public/en.search.min.44c39d3316fe030debb8bc83d6e6ec8d01774e7952f0ee873a6512cb08460ebc.js
  - hugo/content/chapters/ch2-sdd.md
  - site/config.yaml
  - site/public/categories/index.xml
  - site/public/tags/index.xml
  - site/content/lessons/ch3-openspec.md
  - hugo/content/chapters/_index.md
  - site/public/lessons/ch-intro-ai/index.html
  - site/public/assignments/index.html
  - site/public/sitemap.xml
  - site/content/resources/_index.md
  - site/public/lessons/ch1-copilot/index.html
  - site/public/en.search-data.min.a9215e26ea6939e03a42794dbe388c9919801d47a181e9f071d0234b43c1421e.json
  - hugo/content/appendix/_index.md
  - site/public/lessons/index.html
  - site/public/icons/backward.svg
  - site/public/lessons/ch0-warmup/index.html
  - site/public/assignments/index.xml
  - hugo/archetypes/default.md
  - site/public/en.search-data.min.41a9dac731a154f571b4d3ef182cff85131a57726997dd1e0e583337ded821c2.json
  - site/public/index.xml
  - hugo/content/chapters/ch3-openspec.md
  - site/public/index.html
  - site/content/lessons/ch4-opencode.md
  - site/public/icons/forward.svg
  - site/public/lessons/ch4-opencode/index.html
  - site/public/resources/index.html
  - README.md
-->

---
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
