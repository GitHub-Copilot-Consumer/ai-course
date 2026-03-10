## ADDED Requirements

### Requirement: GitHub Actions 部署工作流程檔案
系統 SHALL 建立 `.github/workflows/deploy.yml`，定義 Hugo 網站的 CI/CD 流程，其 MUST 包含以下明確設定：

- **觸發條件**：`on: push: branches: [main]`（僅 push 至 `main` branch 時觸發）
- **建置步驟順序**：
  1. `actions/checkout@v4`（含 `submodules: true` 與 `fetch-depth: 0`）
  2. `peaceiris/actions-hugo@v2`（`hugo-version: '0.120.4'`，`extended: true`）
  3. 執行 `hugo -s hugo/ --minify`
  4. `peaceiris/actions-gh-pages@v3`（`publish_dir: ./hugo/public`，`github_token: ${{ secrets.GITHUB_TOKEN }}`）

#### Scenario: 工作流程檔案存在且包含必要步驟
- **WHEN** 讀取 `.github/workflows/deploy.yml`
- **THEN** 檔案 MUST 存在，且 MUST 包含 `submodules: true`、`hugo-version: '0.120.4'`、`hugo -s hugo/ --minify`、`publish_dir: ./hugo/public` 等明確字串

### Requirement: 建置指令正確引用子目錄
Hugo 建置指令 SHALL 使用 `hugo -s hugo/` 明確指定網站根目錄為 `hugo/` 子目錄，而非專案根目錄。`--minify` flag MUST 包含以縮減輸出檔案大小。

#### Scenario: 建置指令格式正確
- **WHEN** 讀取 `.github/workflows/deploy.yml` 的建置步驟
- **THEN** 建置指令 MUST 為 `hugo -s hugo/ --minify`（完整字串匹配）

### Requirement: 部署目標為 gh-pages branch
系統 SHALL 將建置產出（`hugo/public/`）部署至同一 Repository 的 `gh-pages` branch，透過 `peaceiris/actions-gh-pages@v3` 的 `publish_branch: gh-pages` 設定（預設值，可省略但行為 MUST 一致）。

#### Scenario: 部署目標設定正確
- **WHEN** 讀取 `.github/workflows/deploy.yml` 的部署步驟
- **THEN** `publish_dir` MUST 為 `./hugo/public`，`github_token` MUST 使用 `${{ secrets.GITHUB_TOKEN }}`
