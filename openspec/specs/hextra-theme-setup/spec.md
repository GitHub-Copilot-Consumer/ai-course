# hextra-theme-setup Specification

## Purpose

TBD - created by syncing change 'switch-theme-to-hextra'. Update Purpose after archive.

## Requirements

### Requirement: Hextra 主題以 Hugo Module 方式引入
系統 SHALL 在 `site/go.mod` 中記錄 `github.com/imfing/hextra` 依賴，並在 `site/config.yaml` 的 `module.imports` 中明確指定 `path: github.com/imfing/hextra`，以 Hugo Module 機制載入 Hextra 主題。`site/config.yaml` 中 SHALL NOT 存在 `theme: "hugo-book"` 欄位。

#### Scenario: go.mod 包含 hextra 依賴
- **WHEN** 讀取 `site/go.mod`
- **THEN** 檔案 MUST 包含 `github.com/imfing/hextra` 的 require 條目

#### Scenario: config.yaml 包含 module imports
- **WHEN** 讀取 `site/config.yaml`
- **THEN** `module.imports` 陣列 MUST 包含 `path: github.com/imfing/hextra` 條目，且 `theme: "hugo-book"` SHALL NOT 存在

---
### Requirement: Hugo 建置使用 Hextra 主題成功
系統 SHALL 在執行 `hugo -s site/` 時，以 Hextra 主題完成建置且無錯誤退出，並產生 `site/public/` 目錄。

#### Scenario: Hugo 本機建置成功
- **WHEN** 在專案根目錄執行 `hugo -s site/ --minify`
- **THEN** 建置 MUST 無錯誤退出，且 `site/public/index.html` MUST 存在

---
### Requirement: 移除 hugo-book 專用自訂 partial
系統 SHALL 移除 `site/layouts/_partials/docs/menu-filetree.html`，改由 Hextra 原生側欄處理導覽結構，不再依賴 hugo-book 的 `bookHidden` 參數過濾機制。

#### Scenario: hugo-book 自訂 partial 不存在
- **WHEN** 查詢 `site/layouts/_partials/docs/menu-filetree.html`
- **THEN** 該檔案 SHALL NOT 存在

---
### Requirement: Content front matter 移除 hugo-book 特有參數
系統 SHALL 確保 `site/content/` 下所有 `.md` 檔案的 front matter 中，不存在以下 hugo-book 專有參數：`bookHidden`、`bookFlatSection`、`bookCollapseSection`。

#### Scenario: 章節頁面無 bookHidden 參數
- **WHEN** 讀取 `site/content/lessons/` 下所有 `.md` 檔案的 front matter
- **THEN** 所有檔案 SHALL NOT 包含 `bookHidden`、`bookFlatSection`、`bookCollapseSection` 欄位

#### Scenario: 其他目錄頁面無 bookHidden 參數
- **WHEN** 讀取 `site/content/assignments/` 與 `site/content/resources/` 下所有 `.md` 檔案的 front matter
- **THEN** 所有檔案 SHALL NOT 包含 `bookHidden`、`bookFlatSection`、`bookCollapseSection` 欄位
