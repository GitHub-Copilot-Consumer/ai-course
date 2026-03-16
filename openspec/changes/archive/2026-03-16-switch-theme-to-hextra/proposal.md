## Why

目前 `site/` 使用 hugo-book 主題，雖然功能完整，但 Hextra 提供更現代的視覺設計（Tailwind CSS）、內建深色模式、全文搜尋、以及更適合文件型課程網站的排版。更換為 Hextra 可讓課程網站外觀更具專業感，並降低自訂 partial 的維護負擔。

## What Changes

- 移除 `site/themes/hugo-book` git submodule，改以 Hugo Module 方式引入 Hextra 主題
- 更新 `site/config.yaml`（或新增 `site/hugo.toml`）以使用 Hextra 主題設定
- 更新 `site/go.mod` 以加入 Hextra module 依賴
- 移除 `site/layouts/_partials/docs/` 下針對 hugo-book 的自訂 partial（如 `menu-filetree.html`），改用 Hextra 原生側欄
- 調整 `site/content/` 下各頁面 front matter（如 `bookHidden` → Hextra 對應參數）
- 更新 `.gitmodules` 移除 hugo-book submodule 記錄
- 更新 `README.md` 中關於主題安裝的說明

## Capabilities

### New Capabilities
- `hextra-theme-setup`: 以 Hugo Module 方式整合 Hextra 主題，包含設定、go.mod 更新與內容 front matter 遷移

### Modified Capabilities
- `hugo-theme-submodule`: 主題管理機制由 git submodule (hugo-book) 改為 Hugo Module (hextra)，submodule 記錄與設定需同步更新

## Impact

- `site/themes/hugo-book/`：移除 git submodule
- `site/.gitmodules` / 根目錄 `.gitmodules`：移除 hugo-book 條目
- `site/go.mod`：新增 hextra module 依賴
- `site/config.yaml`：更換 `theme` 設定
- `site/layouts/`：移除 hugo-book 專用自訂 partial
- `site/content/`：front matter 欄位遷移（`bookHidden` 等 hugo-book 特有參數）
- `.github/workflows/deploy.yml`：可能需調整 git submodule 初始化步驟
- `README.md`：更新主題安裝說明
