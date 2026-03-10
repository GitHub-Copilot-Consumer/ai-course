# 從 AI 輔助到規格驅動 (SDD) 實戰攻略

**GitHub Copilot 與 OpenSpec/OpenCode 深度整合**

---

## Hugo 靜態網站

本專案包含以 [Hugo](https://gohugo.io/) 建置的課程網站，位於 `site/` 目錄，使用 [hugo-book](https://github.com/alex-shpak/hugo-book) 主題。

### 目錄結構

```
site/
├── content/
│   ├── _index.md              # 首頁
│   ├── lessons/
│   │   ├── _index.md          # 課程章節列表頁
│   │   ├── ch-intro-ai.md     # 導言：理解 Model、Agent 與 Coding Agent
│   │   ├── ch0-warmup.md      # 第 0 章
│   │   ├── ch1-copilot.md     # 第 1 章
│   │   ├── ch2-sdd.md         # 第 2 章
│   │   ├── ch3-openspec.md    # 第 3 章
│   │   ├── ch4-opencode.md    # 第 4 章
│   │   └── ch5-team.md        # 第 5 章
│   ├── assignments/           # 作業
│   └── resources/
│       └── commands.md        # 常用 OPSX 指令速查
├── themes/hugo-book/          # Hugo Book 主題 (git submodule)
└── config.yaml                # Hugo 設定檔
```

### 本機開發

**前置需求：** Hugo v0.120+ extended

```bash
# 初次 clone 需初始化 submodule
git submodule update --init --recursive

# 啟動本機開發伺服器
hugo server -s site/

# 瀏覽 http://localhost:1313
```

### 建置

```bash
hugo -s site/ --minify
# 輸出至 site/public/（已加入 .gitignore，不納入版控）
```

### 部署

推送至 `main` branch 後，GitHub Actions 會自動建置並部署至 GitHub Pages（`gh-pages` branch）。

設定流程：
1. Push to `main`
2. 至 GitHub Repo Settings > Pages，將 Source 設為 `gh-pages` branch

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
