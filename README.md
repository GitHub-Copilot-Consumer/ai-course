# 從 AI 輔助到規格驅動 (SDD) 實戰攻略

**GitHub Copilot 與 OpenSpec/OpenCode 深度整合**

---

## Hugo 靜態網站

本專案包含以 [Hugo](https://gohugo.io/) 建置的課程網站，位於 `site/` 目錄，使用 [Hextra](https://github.com/imfing/hextra) 主題（Hugo Module）。

### 目錄結構

```
site/
├── content/
│   ├── _index.md              # 首頁
│   ├── lessons/
│   │   ├── _index.md          # 課程章節列表頁
│   │   ├── ch-intro-ai.md     # 導言：理解 Model、Agent 與 Coding Agent（含主流 CLI 比較）
│   │   ├── ch0-warmup.md      # 第 0 章
│   │   ├── ch1-copilot.md     # 第 1 章
│   │   ├── ch2-sdd.md         # 第 2 章
│   │   ├── ch3-openspec.md    # 第 3 章
│   │   ├── ch4-opencode.md    # 第 4 章
│   │   └── ch5-team.md        # 第 5 章
│   ├── assignments/           # 作業
│   └── resources/
│       └── commands.md        # 常用 OPSX 指令速查
├── themes/                    # (不使用 submodule，主題由 Hugo Module 管理)
└── config.yaml                # Hugo 設定檔
```

### 本機開發

**前置需求：** Hugo v0.120+ extended、Go 1.21+

```bash
# 啟動本機開發伺服器（Hugo Module 會自動下載 Hextra 主題）
hugo server -s site/

# 瀏覽 http://localhost:1313
```

### 更新主題

```bash
# 更新 Hextra 至最新版本
hugo mod get -u github.com/imfing/hextra
```

### 建置

```bash
hugo -s site/ --minify
# 輸出至 site/public/（已加入 .gitignore，不納入版控）
```

### 部署

推送至 `main` branch 後，GitHub Actions 會自動建置並部署至 GitHub Pages（`gh-pages` branch）。

**線上網站：** https://github-copilot-consumer.github.io/ai-sdd-course/

**首次設定步驟：**

1. 確認 `.github/workflows/deploy.yml` 中的 `GITHUB_PAGES_URL` 已更新為正確網址：
   ```yaml
   env:
     GITHUB_PAGES_URL: https://<owner>.github.io/<repo>/
   ```
   本專案為：`https://github-copilot-consumer.github.io/ai-sdd-course/`

2. Push 至 `main` branch，觸發 GitHub Actions 工作流程

3. 至 GitHub Repository Settings > Pages，設定：
   - **Source**：`Deploy from branch`
   - **Branch**：`gh-pages`（root）

4. 稍待片刻後，站點將發佈於 `https://github-copilot-consumer.github.io/ai-sdd-course/`

**注意：**
- Workflow 使用 `enable_jekyll: false`，確保 `gh-pages` branch 包含 `.nojekyll`，讓 GitHub Pages 直接提供 Hugo 靜態資源而不經 Jekyll 處理
- 若更改 Repository 名稱，需同步更新 `deploy.yml` 中的 `GITHUB_PAGES_URL`
- 私有 Repository 需要 GitHub 付費方案才能使用 GitHub Pages
- 本機開發使用 `hugo server -s site/`，不受 `GITHUB_PAGES_URL` 影響

---

## OpenSpec 規格

本專案使用 OpenSpec 進行規格驅動開發。

```bash
# 安裝
npm install -g @fission-ai/openspec

# 查看變更狀態
openspec status --change hugo-course-site

# 列出所有變更
openspec list
```

規格文件位於 `openspec/changes/hugo-course-site/`。
