# AI 課程平台 (ai-courses)

多課程學習平台，包含以下兩門課程：

1. **從 AI 輔助到規格驅動 (SDD) 實戰攻略** — 從 Greenfield MVP 到 Brownfield 可維護產品的完整旅程
2. **Agent 整合與自訂擴展** — OpenCode Skills、Tools 與 Custom Agent 設計（骨架）

---

## Hugo 靜態網站

本專案包含以 [Hugo](https://gohugo.io/) 建置的課程網站，位於 `site/` 目錄，使用 [Hextra](https://github.com/imfing/hextra) 主題（Hugo Module）。

### 目錄結構

```
site/
├── content/
│   ├── _index.md                  # 首頁（多課程選擇頁）
│   ├── sdd/
│   │   ├── _index.md              # SDD 課程首頁
│   │   ├── ch0-warmup.md          # Ch0：AI 開發三階段演進、Vibe Coding 的價值、課程路線圖
│   │   ├── ch1-vibe-coding.md     # Ch1：Vibe Coding 方法論、Prototype 退出條件
│   │   ├── ch2-mvp-to-spec.md     # Ch2：MVP → Proposal → Brownfield 轉折點
│   │   ├── ch3-openspec.md        # Ch3：Technical Spec 與 OpenSpec 工作流
│   │   ├── ch4-coding-agent.md    # Ch4：Coding Agent 結構化開發、Plan Mode
│   │   ├── ch5-verify-observe.md  # Ch5：Spec 驗證、AI 輔助測試、Observability
│   │   └── ch6-team.md            # Ch6：團隊導入策略、完整生命週期回顧
│   ├── agent/
│   │   ├── _index.md              # Agent 課程首頁
│   │   ├── ch1-model-fundamentals.md    # Ch1：LLM 原理與模型選型（骨架）
│   │   ├── ch2-agent-architecture.md   # Ch2：ReAct、Memory 與 Context（骨架）
│   │   ├── ch3-coding-agent-ecosystem.md  # Ch3：Coding Agent 生態系與 OpenCode（骨架）
│   │   ├── ch4-custom-tools.md    # Ch4：Tools 概念與 Plugin 簡介（骨架）
│   │   ├── ch5-custom-skills.md   # Ch5：Skills 系統與 Agent Skills 標準（骨架）
│   │   ├── ch6-custom-agents.md   # Ch6：Custom Agent 與 Commands 設計（骨架）
│   │   └── ch7-mcp-overview.md    # Ch7：MCP 概念與 Agent 整合（骨架）
│   ├── appendix/
│   │   ├── _index.md              # 附錄首頁
│   │   └── setup.md               # 工具安裝：OpenSpec CLI、OpenCode、Ollama
│   ├── assignments/               # 作業
│   └── resources/
│       ├── commands.md            # 常用 OPSX 指令速查
│       ├── everything-claude-code.md
│       ├── agent-skills-standard.md
│       └── client-observability.md
├── themes/
└── config.yaml                    # Hugo 設定（title: AI 課程平台）
```

### SDD 課程結構

| 章節 | 主題 | 階段 |
|------|------|------|
| Ch0 | AI 開發三階段、Vibe Coding 的價值、課程路線圖 | Greenfield |
| Ch1 | Vibe Coding 方法論、Prototype 退出條件 | Greenfield |
| Ch2 | MVP → Proposal → Brownfield 轉折點 | 轉折點 |
| Ch3 | Technical Spec、OpenSpec 工作流 | Brownfield |
| Ch4 | Coding Agent 結構化開發、Plan Mode | Brownfield |
| Ch5 | Verify、AI 測試、Observability、Archive | Brownfield |
| Ch6 | 團隊導入策略 | 規模化 |
| 附錄 | 工具安裝（OpenSpec CLI、OpenCode、Ollama） | 參考 |

### 本機開發

**前置需求：** Hugo v0.120+ extended、Go 1.21+

```bash
# 啟動本機開發伺服器（Hugo Module 會自動下載 Hextra 主題）
hugo server -s site/

# 瀏覽 http://localhost:1313
```

### Hextra 主題覆寫（Partial Override）

本專案覆寫了 Hextra 的 sidebar partial，以修正行動裝置上側欄不顯示章節連結的問題：

- **覆寫檔案**：`site/layouts/partials/sidebar.html`
- **對應上游**：`github.com/imfing/hextra@v0.12.1/layouts/_partials/sidebar.html`
- **變更內容**：將原本兩個分離的 `<ul>` 合併為單一 `<ul>`，讓章節連結在行動裝置與桌機均可見。

> **升級注意**：升級 Hextra 版本後，需手動比對並重新套用本覆寫。

### 更新主題

```bash
hugo mod get -u github.com/imfing/hextra
```

### 建置

```bash
hugo -s site/ --minify
# 輸出至 site/public/（已加入 .gitignore，不納入版控）
```

### 部署

推送至 `main` branch 後，GitHub Actions 會自動建置並部署至 GitHub Pages（`gh-pages` branch）。

**線上網站：** https://github-copilot-consumer.github.io/ai-courses/

**首次設定步驟：**

1. 確認 `.github/workflows/deploy.yml` 中的 `GITHUB_PAGES_URL` 已更新為正確網址：
   ```yaml
   env:
     GITHUB_PAGES_URL: https://github-copilot-consumer.github.io/ai-courses/
   ```

2. Push 至 `main` branch，觸發 GitHub Actions 工作流程

3. 至 GitHub Repository Settings > Pages，設定：
   - **Source**：`Deploy from branch`
   - **Branch**：`gh-pages`（root）

**注意：**
- Workflow 使用 `enable_jekyll: false`，確保 `gh-pages` branch 包含 `.nojekyll`
- 若更改 Repository 名稱，需同步更新 `deploy.yml` 中的 `GITHUB_PAGES_URL`

---

## 簡報模式

每個課程章節頁面右上角有「▶ 簡報模式」按鈕，點擊後以全螢幕投影片形式呈現頁面內容。

### 投影片切割

Markdown 中的 `---`（水平分隔線）作為投影片邊界，每個 `---` 產生一頁投影片。

### 過濾文件專用內容（`.no-slide`）

若有段落適合文件閱讀、但不應出現在投影片，可用 `<div class="no-slide">` 包覆。

### 拆分過長投影片（`<!-- split -->`）

若單張投影片內容太多，可在 `---` 之間插入 `<!-- split -->` 來手動分頁。

---

## Mermaid 圖表

課程頁面中的流程圖使用 [Mermaid](https://mermaid.js.org/) 撰寫，由 [Hextra](https://imfing.github.io/hextra/) 主題原生支援，於瀏覽器端渲染，無需外部 API 或額外設定。

---

## OpenSpec

本專案使用 OpenSpec 進行規格驅動開發。

```bash
# 安裝
npm install -g @fission-ai/openspec

# 查看變更狀態
openspec status --change multi-course-restructure

# 列出所有變更
openspec list
```

規格文件位於 `openspec/changes/`。
