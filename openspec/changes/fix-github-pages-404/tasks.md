## 1. 驗證目前 GitHub Pages 設定

- [x] 1.1 登入 GitHub，前往 `GitHub-Copilot-Consumer/ai-sdd-course` → Settings → Pages，確認 Source 是否設定為 `gh-pages` branch（`/(root)`）；若非，手動修改並儲存
- [x] 1.2 確認 `gh-pages` branch 目前是否包含 `.nojekyll`：執行 `git show origin/gh-pages:.nojekyll`，記錄結果

## 2. 修改 Workflow 加入 enable_jekyll: false

- [x] 2.1 在 `.github/workflows/deploy.yml` 的 `peaceiris/actions-gh-pages@v3` 步驟中，加入 `enable_jekyll: false` 參數
- [x] 2.2 讀取修改後的 `deploy.yml`，確認包含 `enable_jekyll: false` 字串（對應 spec: github-pages-deploy Scenario「部署步驟停用 Jekyll 處理」）
- [x] 2.3 git commit：`fix(ci): disable Jekyll processing to fix GitHub Pages 404`

## 3. 測試驗證

- [x] 3.1 push 至 `main` branch，觸發 GitHub Actions workflow
- [x] 3.2 確認 Actions 執行成功（無 build error、無 deploy error）
- [x] 3.3 確認 `gh-pages` branch 根目錄出現 `.nojekyll` 檔案（執行 `git fetch origin && git show origin/gh-pages:.nojekyll`）
- [x] 3.4 等待 GitHub Pages 更新（通常 1-2 分鐘），存取 `https://github-copilot-consumer.github.io/ai-sdd-course/`，確認回傳 200 而非 404

## 4. 同步文件

- [x] 4.1 同步 `openspec/specs/github-pages-deploy/spec.md`（執行 `openspec sync-specs fix-github-pages-404` 或手動將 delta spec 合併至 main spec）
- [x] 4.2 更新 `README.md`，加入 GitHub Pages 存取 URL 說明
- [x] 4.3 git commit：`docs: update README with GitHub Pages URL and .nojekyll fix`
