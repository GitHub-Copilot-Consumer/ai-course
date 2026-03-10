## 1. Git 與 Hugo 環境初始化

- [x] 1.1 確認 Hugo 版本 >= 0.120.0，若未安裝則執行 `brew install hugo`（或對應平台安裝指令）
- [x] 1.2 在專案根目錄初始化 git repo（若尚未初始化）：`git init`
- [x] 1.3 建立 Hugo 專案目錄結構：`hugo new site hugo`（在專案根目錄執行）
- [x] 1.4 以 git submodule 安裝 PaperMod 主題：`git submodule add -f https://github.com/adityatelange/hugo-PaperMod.git hugo/themes/PaperMod`
- [x] 1.5 確認 `.gitmodules` 存在且包含 PaperMod submodule 設定
- [x] 1.6 git commit: `feat: init hugo project with PaperMod theme`

## 2. Hugo 設定檔建立

- [x] 2.1 刪除 `hugo/hugo.toml`（hugo new site 預設產生），改建立 `hugo/hugo.yaml`
- [x] 2.2 在 `hugo/hugo.yaml` 設定以下欄位：`baseURL: /`、`languageCode: zh-TW`、`title`、`theme: PaperMod`
- [x] 2.3 在 `hugo/hugo.yaml` 設定 `params.homeInfoParams.Title` 與 `params.homeInfoParams.Content`
- [x] 2.4 在 `hugo/hugo.yaml` 設定 `params.ShowToc: true`、`params.TocOpen: false`
- [x] 2.5 在 `hugo/hugo.yaml` 設定 `menu.main` 包含 `課程章節`（url: `/chapters/`, weight: 1）與 `附錄`（url: `/appendix/`, weight: 2）兩個項目
- [x] 2.6 本機執行 `hugo -s hugo/ --minify` 確認建置無錯誤
- [x] 2.7 git commit: `feat: add hugo.yaml with PaperMod config and navigation menu`

## 3. 首頁與章節索引內容頁面

- [x] 3.1 建立 `hugo/content/_index.md`，front matter 含 `title`、`description`，正文含 6 個章節連結（依 site-navigation spec 定義的路徑格式）
- [x] 3.2 建立 `hugo/content/chapters/_index.md`，front matter 含 `title: 課程章節`
- [x] 3.3 建立 `hugo/content/appendix/_index.md`，front matter 含 `title: 附錄`
- [x] 3.4 本機執行 `hugo server -s hugo/` 確認首頁與導覽可正常存取
- [x] 3.5 git commit: `feat: add homepage and section index pages`

## 4. 課程章節內容頁面

- [x] 4.1 建立 `hugo/content/chapters/ch0-warmup.md`，front matter 含 `title`（第 0 章標題）、`weight: 0`、`description`（章節引言），正文含完整章節內容
- [x] 4.2 建立 `hugo/content/chapters/ch1-copilot.md`，front matter 含 `title`（第 1 章標題）、`weight: 1`、`description`，正文含完整章節內容
- [x] 4.3 建立 `hugo/content/chapters/ch2-sdd.md`，front matter 含 `title`（第 2 章標題）、`weight: 2`、`description`，正文含完整章節內容
- [x] 4.4 建立 `hugo/content/chapters/ch3-openspec.md`，front matter 含 `title`（第 3 章標題）、`weight: 3`、`description`，正文含完整章節內容（含 OPSX 指令表格）
- [x] 4.5 建立 `hugo/content/chapters/ch4-opencode.md`，front matter 含 `title`（第 4 章標題）、`weight: 4`、`description`，正文含完整章節內容
- [x] 4.6 建立 `hugo/content/chapters/ch5-team.md`，front matter 含 `title`（第 5 章標題）、`weight: 5`、`description`，正文含完整章節內容
- [x] 4.7 確認 `hugo/content/chapters/` 共有 7 個檔案（`_index.md` + 6 個章節頁面）
- [x] 4.8 git commit: `feat: add course chapter content pages (ch0-ch5)`

## 5. 附錄內容頁面

- [x] 5.1 建立 `hugo/content/appendix/commands.md`，front matter 含 `title: 常用 OPSX 指令速查`、`weight: 1`，正文包含所有 OPSX 指令說明（`/opsx:explore`、`/opsx:new`、`/opsx:ff`、`/opsx:apply`、`/opsx:verify`、`/opsx:archive`）
- [x] 5.2 本機執行 `hugo server -s hugo/` 確認附錄頁面可正常存取
- [x] 5.3 git commit: `feat: add appendix commands reference page`

## 6. GitHub Actions CI/CD 部署設定

- [x] 6.1 建立 `.github/workflows/` 目錄（若不存在）
- [x] 6.2 建立 `.github/workflows/deploy.yml`，包含以下步驟：checkout（submodules: true, fetch-depth: 0）、setup-hugo（version: 0.120.4, extended: true）、build（hugo -s hugo/ --minify）、deploy（publish_dir: ./hugo/public, github_token）
- [x] 6.3 確認 `deploy.yml` 的觸發條件為 `on: push: branches: [main]`
- [x] 6.4 git commit: `feat: add github actions workflow for hugo deployment`

## 7. 驗收與收尾

- [x] 7.1 執行 `hugo -s hugo/ --minify` 確認最終建置無警告或錯誤
- [x] 7.2 執行 `hugo server -s hugo/` 並手動驗證：首頁、6 個章節頁面、附錄頁面、主選單導覽均可正常存取
- [x] 7.3 確認 `hugo/public/` 目錄不需提交至版本控制（應加入 `.gitignore`）
- [x] 7.4 更新 `README.md`，說明 Hugo 網站結構、本機開發指令（`hugo server -s hugo/`）與部署流程
- [x] 7.5 git commit: `docs: update README with hugo site setup and deployment instructions`
