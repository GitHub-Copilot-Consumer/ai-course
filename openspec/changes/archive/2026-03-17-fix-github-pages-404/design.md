## Context

GitHub Actions workflow (`deploy.yml`) 已成功建置 Hugo 網站並透過 `peaceiris/actions-gh-pages@v3` 推送至 `gh-pages` branch（`62be113` 確認存在）。然而存取 `https://github-copilot-consumer.github.io/ai-sdd-course/` 仍回傳 404。

當前狀態：
- `gh-pages` branch 存在於 remote（已確認）
- GitHub Actions 執行成功（無 403 或建置錯誤）
- 問題發生在部署後，Pages 無法正確提供內容

可能原因（依優先順序）：
1. **GitHub Repository Pages source 未設定為 `gh-pages` branch**（最可能）：Repository Settings → Pages → Source 可能仍設為 `main` 或未設定
2. **Jekyll 處理干擾**：GitHub Pages 預設啟用 Jekyll 處理，會忽略 `_` 開頭的目錄（Hugo 輸出的 `_` 資源目錄會被略過），導致 CSS/JS 遺失或路由錯誤
3. **`gh-pages` branch 尚未包含 `.nojekyll`**：`peaceiris/actions-gh-pages@v3` 預設不加入 `.nojekyll`，需明確設定

## Goals / Non-Goals

**Goals:**
- 確保 `peaceiris/actions-gh-pages@v3` 在部署時自動加入 `.nojekyll` 至 `gh-pages` branch 根目錄
- 提供清楚的手動操作說明，確認 GitHub Repository Pages source 設定正確
- 修改 `deploy.yml` 加入 `enable_jekyll: false`（即 `force_orphan: true` + `.nojekyll`）

**Non-Goals:**
- 不自動化 GitHub Repository Settings 設定（GitHub API 操作超出此 workflow 範疇）
- 不更換部署方式（維持 `peaceiris/actions-gh-pages@v3`）
- 不更改 Hugo 主題或內容

## Decisions

### 決策一：使用 `enable_jekyll: false` 而非手動建立 `.nojekyll`

**選擇**：在 `peaceiris/actions-gh-pages@v3` 步驟加入 `enable_jekyll: false`

**理由**：`peaceiris/actions-gh-pages@v3` 的 `enable_jekyll: false` 參數會自動在 `gh-pages` branch 根目錄建立 `.nojekyll` 檔案。這是官方建議方式，比手動建立更可靠且不易出錯。

**替代方案考慮**：
- 手動在 workflow 中 `touch site/public/.nojekyll` → 可行但冗餘，已有 action 參數支援
- 切換至 `actions/deploy-pages` → 需要額外設定 GitHub Pages environment，改動幅度更大

### 決策二：Repository Pages Source 設定為手動步驟而非自動化

**選擇**：在 tasks.md 中記錄為手動驗證步驟，並提供清楚說明

**理由**：GitHub Repository Settings 無法透過 git commit 或 workflow 自動設定，需由 repository admin 在 GitHub UI 操作。此操作只需執行一次，且已有 `gh-pages` branch 存在後即可設定。

## Risks / Trade-offs

- **[風險] Pages source 已正確設定，但 `.nojekyll` 缺失導致 `_` 資源路徑 404** → 緩解：`enable_jekyll: false` 同時解決兩個問題
- **[風險] `enable_jekyll: false` 需要重新觸發 workflow** → 緩解：任何 push 至 `main` 即可觸發，影響最小
- **[取捨] 無法自動驗證 Pages source 設定** → 在 tasks.md 中加入明確的手動驗證步驟，確保不遺漏
