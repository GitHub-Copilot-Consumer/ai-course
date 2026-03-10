## Why

課程大綱目前僅以 Markdown 文件形式存在，缺乏適合公開展示或學員自學的網頁介面。建立 Hugo 靜態網站可將課程內容結構化呈現，提升閱讀體驗並方便後續維護與擴充。

## What Changes

- 新增 Hugo 靜態網站專案，以 `index.md` 課程大綱為基礎產生網頁內容
- 建立首頁，呈現課程總覽與各章節導覽
- 各章節（0–5）建立獨立頁面，含詳細說明與 Lab 練習內容
- 建立附錄頁面，收錄常用 OPSX 指令速查
- 設定 Hugo 主題與基本站台資訊（標題、語言等）
- 建立 CI/CD 工作流程（GitHub Actions）自動部署至 GitHub Pages

## Capabilities

### New Capabilities

- `hugo-site-scaffold`: 初始化 Hugo 專案結構，含設定檔、主題、layouts 與靜態資源
- `course-content-pages`: 將課程大綱各章節轉換為 Hugo content 頁面
- `site-navigation`: 建立課程章節導覽選單與首頁索引
- `github-pages-deploy`: 設定 GitHub Actions workflow 自動建置並部署至 GitHub Pages

### Modified Capabilities

（無現有規格需修改）

## Impact

- 新增 `hugo/` 目錄作為 Hugo 網站根目錄
- 新增 `.github/workflows/deploy.yml` CI/CD 工作流程
- 需安裝 Hugo（建議 v0.120+）作為開發依賴
- 不影響現有 `openspec/` 規格文件結構
