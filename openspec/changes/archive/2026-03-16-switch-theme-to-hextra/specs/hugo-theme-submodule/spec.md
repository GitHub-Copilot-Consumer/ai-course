## MODIFIED Requirements

### Requirement: 主題必須以 git submodule 管理
系統 SHALL NOT 以 git submodule 方式管理 `site/themes/hugo-book`。`.gitmodules` 中 MUST NOT 存在 `[submodule "site/themes/hugo-book"]` 條目，且 `site/themes/hugo-book/` 目錄 SHALL NOT 存在於版本庫中。主題改由 Hugo Module 機制引入，依賴記錄於 `site/go.mod`。

#### Scenario: hugo-book submodule 已移除
- **WHEN** 讀取專案根目錄的 `.gitmodules`
- **THEN** MUST NOT 包含 `[submodule "site/themes/hugo-book"]` 條目

#### Scenario: hugo-book themes 目錄不存在
- **WHEN** 查詢 `site/themes/hugo-book/` 目錄
- **THEN** 該目錄 SHALL NOT 被 git 追蹤（untracked 或不存在）

---
### Requirement: Hugo 設定需使用 hugo-book 主題
系統 SHALL 在 `site/config.yaml` 的 `module.imports` 中指定 `path: github.com/imfing/hextra`，以 Hugo Module 機制使用 Hextra 主題建置網站。`theme: "hugo-book"` 欄位 SHALL NOT 存在於設定檔中。

#### Scenario: 建置使用 Hextra 主題
- **WHEN** 執行 `hugo -s site/ --minify`
- **THEN** Hugo 使用 Hextra 主題完成建置，且 `site/public/index.html` MUST 存在

---

## REMOVED Requirements

### Requirement: 初始化文件需提供 submodule 指令
**Reason**: hugo-book submodule 已移除，改用 Hugo Module 機制，不再需要 git submodule 相關初始化指令。
**Migration**: README.md 中的主題安裝說明 SHALL 改為描述 Hugo Module 下載機制（`hugo mod get github.com/imfing/hextra`），移除 `git submodule update --init` 步驟。
