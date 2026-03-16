## 1. 確認現狀與前置準備

- [x] 1.1 讀取 `site/content/lessons/`、`site/content/assignments/`、`site/content/resources/` 下所有 `.md` 檔案 front matter，建立 hugo-book 特有參數（`bookHidden`、`bookFlatSection`、`bookCollapseSection`）的使用清單
- [x] 1.2 確認 `.github/workflows/deploy.yml` 是否包含 Go 環境安裝步驟（`actions/setup-go`），記錄結果以利後續調整

## 2. 移除 hugo-book submodule

- [x] 2.1 執行 `git submodule deinit -f site/themes/hugo-book` 移除 submodule 初始化
- [x] 2.2 執行 `git rm -f site/themes/hugo-book` 移除 submodule 目錄追蹤
- [x] 2.3 編輯 `.gitmodules`，移除 `[submodule "site/themes/hugo-book"]` 區塊（3 行）
- [x] 2.4 執行 `git commit -m "chore: remove hugo-book submodule"` 提交變更

## 3. 安裝 Hextra 主題（Hugo Module）

- [x] 3.1 在 `site/` 目錄執行 `hugo mod get github.com/imfing/hextra`，更新 `site/go.mod` 加入 hextra 依賴
- [x] 3.2 確認 `site/go.mod` 包含 `github.com/imfing/hextra` require 條目
- [x] 3.3 執行 `git commit -m "feat: add hextra as hugo module dependency"` 提交 go.mod 變更

## 4. 更新 Hugo 設定

- [x] 4.1 編輯 `site/config.yaml`：移除 `theme: "hugo-book"` 欄位
- [x] 4.2 編輯 `site/config.yaml`：移除 `params.BookSection: "lessons"` 欄位
- [x] 4.3 編輯 `site/config.yaml`：新增 `module.imports` 區塊，內容為 `- path: github.com/imfing/hextra`
- [x] 4.4 在 `site/` 執行 `hugo server --buildDrafts` 確認本地建置無錯誤
- [x] 4.5 執行 `git commit -m "feat: configure hextra theme via hugo module"` 提交設定變更

## 5. 移除 hugo-book 自訂 partial

- [x] 5.1 刪除 `site/layouts/_partials/docs/menu-filetree.html`
- [x] 5.2 確認 `site/layouts/_partials/docs/` 目錄下無其他 hugo-book 專用檔案（若目錄為空，一併移除）
- [x] 5.3 執行 `git commit -m "chore: remove hugo-book custom partial menu-filetree"` 提交變更

## 6. 清理 Content front matter

- [x] 6.1 依據 1.1 清單，逐一編輯含有 hugo-book 特有參數的 `.md` 檔案，移除 `bookHidden`、`bookFlatSection`、`bookCollapseSection` 欄位
- [x] 6.2 執行 `hugo -s site/ --minify` 確認建置成功
- [x] 6.3 執行 `git commit -m "chore: remove hugo-book front matter params from content"` 提交變更

## 7. 更新 CI/CD 工作流

- [x] 7.1 編輯 `.github/workflows/deploy.yml`：在 `Setup Hugo` 步驟之前新增 `actions/setup-go@v5` 步驟（Go 1.21+），以支援 Hugo Module 下載
- [x] 7.2 確認 `deploy.yml` 中 `checkout` 步驟的 `submodules: true` 改為 `submodules: false`（hugo-book 已移除）
- [x] 7.3 執行 `git commit -m "ci: add go setup for hugo module support, remove submodule init"` 提交 workflow 變更

## 8. 驗證與文件更新

- [x] 8.1 在本地執行 `hugo -s site/ --minify` 確認 `site/public/index.html` 存在且無錯誤
- [x] 8.2 更新 `README.md`：將主題安裝說明從 `git submodule update --init` 改為 `hugo mod get github.com/imfing/hextra`
- [x] 8.3 執行 `git commit -m "docs: update README with hextra theme installation instructions"` 提交文件變更
