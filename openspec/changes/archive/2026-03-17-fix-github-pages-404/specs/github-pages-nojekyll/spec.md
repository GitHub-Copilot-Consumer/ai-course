## ADDED Requirements

### Requirement: gh-pages branch 包含 .nojekyll 檔案
`gh-pages` branch 根目錄 SHALL 包含 `.nojekyll` 空檔案，透過 `peaceiris/actions-gh-pages@v3` 的 `enable_jekyll: false` 參數自動建立。此機制 MUST 確保 GitHub Pages 不啟動 Jekyll 處理，直接提供 Hugo 產生的靜態資源（包含 `_` 開頭的目錄如 `_headers`、`_redirects` 等）。

#### Scenario: 部署後 gh-pages branch 存在 .nojekyll
- **WHEN** GitHub Actions workflow 執行完成並 push 至 `gh-pages` branch
- **THEN** `gh-pages` branch 根目錄 MUST 包含 `.nojekyll` 檔案（可透過 `git show gh-pages:.nojekyll` 或 GitHub UI 確認）

#### Scenario: GitHub Pages 不啟動 Jekyll 處理
- **WHEN** GitHub Pages 從 `gh-pages` branch 提供內容
- **THEN** Hugo 產生的所有靜態資源（包含 CSS、JS、圖片）MUST 可正常存取，不因 Jekyll 過濾而 404
