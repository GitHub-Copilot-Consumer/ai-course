## ADDED Requirements

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

### Requirement: PaperMod 主題以 git submodule 安裝
系統 SHALL 以 git submodule 方式將 PaperMod 主題安裝至 `hugo/themes/PaperMod/`，且 `.gitmodules` 檔案 MUST 存在於專案根目錄並記錄此 submodule。

#### Scenario: Submodule 設定存在
- **WHEN** 讀取專案根目錄的 `.gitmodules` 檔案
- **THEN** MUST 包含 `[submodule "hugo/themes/PaperMod"]` 區塊，且 `url` 指向 `https://github.com/adityatelange/hugo-PaperMod.git`
