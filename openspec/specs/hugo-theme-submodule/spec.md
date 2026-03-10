# hugo-theme-submodule Specification

## Purpose

TBD - created by archiving change 'fix-hugo-theme-module-download'. Update Purpose after archive.

## Requirements

### Requirement: 主題必須以 git submodule 管理
系統 SHALL 在 `site/themes/hugo-book` 以 git submodule 形式加入 Hugo Book 主題，且 submodule URL 為 `https://github.com/alex-shpak/hugo-book`。

#### Scenario: 取得主題來源
- **WHEN** 初始化或更新專案
- **THEN** 可透過 git submodule 取得 `site/themes/hugo-book`


<!-- @trace
source: fix-hugo-theme-module-download
updated: 2026-03-10
code:
  - site/themes/hugo-book/
  - index.md
-->

---
### Requirement: Hugo 設定需使用 hugo-book 主題
系統 SHALL 在 Hugo 設定中指定 `theme: "hugo-book"`，並以 submodule 的主題來源建置網站。

#### Scenario: 建置使用指定主題
- **WHEN** 執行 Hugo 建置
- **THEN** Hugo 使用 `hugo-book` 主題完成建置


<!-- @trace
source: fix-hugo-theme-module-download
updated: 2026-03-10
code:
  - site/themes/hugo-book/
  - index.md
-->

---
### Requirement: 初始化文件需提供 submodule 指令
系統 SHALL 在初始化與更新指引中，明確列出 submodule 下載與更新步驟。

#### Scenario: 文件提供 submodule 指引
- **WHEN** 使用者依照初始化或更新指引
- **THEN** 文件中包含 git submodule 的新增或更新指令

<!-- @trace
source: fix-hugo-theme-module-download
updated: 2026-03-10
code:
  - site/themes/hugo-book/
  - index.md
-->