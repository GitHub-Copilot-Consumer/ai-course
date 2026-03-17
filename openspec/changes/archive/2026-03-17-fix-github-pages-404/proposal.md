## Why

GitHub Actions 已成功執行並將網站部署至 `gh-pages` branch，但存取 `https://github-copilot-consumer.github.io/ai-sdd-course/` 仍回傳 404。根本原因是 GitHub Repository 的 Pages 設定尚未指向正確的來源（`gh-pages` branch），或存在其他設定不一致問題導致 Pages 無法正確提供內容。

## What Changes

- 診斷並確認 GitHub Pages source 設定是否指向 `gh-pages` branch（`/(root)`）
- 若 Pages source 設定錯誤，透過 workflow 使用 `peaceiris/actions-gh-pages@v3` 的 `enable_jekyll: false` 確保正確行為
- 在 `gh-pages` branch 根目錄加入 `.nojekyll` 檔案，避免 GitHub Pages 的 Jekyll 處理干擾 Hugo 產生的靜態資源
- 確認 workflow checkout 步驟使用 `submodules: recursive` 或 `submodules: false`（目前為 `false`，hextra 為 Hugo module 而非 git submodule，此設定正確）
- 驗證 `GITHUB_PAGES_URL` 環境變數格式正確（`https://github-copilot-consumer.github.io/ai-sdd-course/`）

## Capabilities

### New Capabilities

- `github-pages-nojekyll`: 確保 `gh-pages` branch 包含 `.nojekyll` 檔案，讓 GitHub Pages 直接提供 Hugo 靜態資源而不經 Jekyll 處理

### Modified Capabilities

- `github-pages-deploy`: 在部署步驟加入 `enable_jekyll: false`（即自動建立 `.nojekyll`），確保部署後 Pages 可正常存取

## Impact

- `.github/workflows/deploy.yml`：部署步驟新增 `enable_jekyll: false` 參數
- GitHub Repository Settings：需確認 Pages source 設定為 `gh-pages` branch（手動操作，無法由 workflow 自動化）
- `openspec/specs/github-pages-deploy/spec.md`：更新需求以反映 `.nojekyll` 機制
