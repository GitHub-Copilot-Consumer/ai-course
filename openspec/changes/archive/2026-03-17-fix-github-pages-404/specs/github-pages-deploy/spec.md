## MODIFIED Requirements

### Requirement: GitHub Actions 部署工作流程檔案
系統 SHALL 建立 `.github/workflows/deploy.yml`，定義 Hugo 網站的 CI/CD 流程，其 MUST 包含以下明確設定：

- **觸發條件**：`on: push: branches: [main]`（僅 push 至 `main` branch 時觸發）
- **Job 權限**：`deploy` job MUST 宣告 `permissions: contents: write`，確保 `GITHUB_TOKEN` 有權限 push 至 `gh-pages` branch
- **建置步驟順序**：
  1. `actions/checkout@v4`（含 `submodules: false` 與 `fetch-depth: 0`）
  2. `actions/setup-go@v5`（`go-version: '1.21'`，供 Hugo Module 使用）
  3. `peaceiris/actions-hugo@v2`（`hugo-version: '0.147.0'`，`extended: true`）
  4. 執行 `hugo -s site/ --minify -b ${{ env.GITHUB_PAGES_URL }}`
  5. `peaceiris/actions-gh-pages@v3`（`publish_dir: ./site/public`，`github_token: ${{ secrets.GITHUB_TOKEN }}`，`enable_jekyll: false`）

#### Scenario: 工作流程檔案存在且包含必要步驟
- **WHEN** 讀取 `.github/workflows/deploy.yml`
- **THEN** 檔案 MUST 存在，且 MUST 包含 `permissions: contents: write`、`go-version: '1.21'`、`hugo-version: '0.147.0'`、`hugo -s site/ --minify`、`-b ${{ env.GITHUB_PAGES_URL }}`、`publish_dir: ./site/public`、`enable_jekyll: false` 等明確字串

#### Scenario: Deploy job 具備寫入權限
- **WHEN** GitHub Actions 執行 `deploy` job
- **THEN** `GITHUB_TOKEN` MUST 具備 `contents: write` 權限，使 `peaceiris/actions-gh-pages@v3` 能夠成功 push 至 `gh-pages` branch（不得回傳 403）

#### Scenario: 部署步驟停用 Jekyll 處理
- **WHEN** 讀取 `.github/workflows/deploy.yml` 的部署步驟
- **THEN** `peaceiris/actions-gh-pages@v3` 步驟 MUST 包含 `enable_jekyll: false` 參數
