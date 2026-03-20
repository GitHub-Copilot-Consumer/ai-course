## 1. 測試先行：建立驗證基準

- [x] 1.1 確認現有測試全數通過：執行 `npm test` 與 Playwright E2E 測試，記錄基準通過狀態
- [x] 1.2 更新 E2E 測試路徑：將 `site/tests/e2e/mobile-sidebar-nav.e2e.js`、`site/tests/e2e/plantuml-rendering.e2e.js`、`site/tests/e2e/presentation-mode.e2e.js` 中所有 `/lessons/` 路徑改為 `/sdd/`
- [x] 1.3 更新 unit 測試路徑：將 `site/tests/intro-ai-slides/intro-ai-slides.test.js` 與 `site/tests/cli-comparison/cli-comparison.test.js` 中的 `../../content/lessons/` 改為 `../../content/sdd/`；並更新 `intro-ai-slides.test.js` 以反映 `ch-intro-ai.md` 已移至 Agent 課程（指向 `../../content/agent/ch1-model-fundamentals.md` 或移除該測試案例）
- [x] 1.4 git commit：`test: update test paths for lessons→sdd migration`

## 2. 目錄結構遷移

- [x] 2.1 使用 `git mv site/content/lessons site/content/sdd` 搬移 SDD 課程目錄（保留 git 歷史）
- [x] 2.2 在 `site/content/sdd/` 中刪除 `ch-intro-ai.md`
- [x] 2.3 建立 `site/content/appendix/` 目錄，使用 `git mv site/content/sdd/appendix-setup.md site/content/appendix/setup.md` 搬移附錄檔案
- [x] 2.4 建立 `site/content/appendix/_index.md`，front matter 包含 `title: 附錄` 與 `cascade:\n  type: docs`
- [x] 2.5 更新 `site/content/appendix/setup.md` 的 front matter：`weight` 設為 `1`（其餘 front matter 欄位保持原值）
- [x] 2.6 git commit：`feat: migrate lessons/ to sdd/, extract appendix as top-level section`

## 3. 建立 Agent 課程骨架

- [x] 3.1 建立 `site/content/agent/_index.md`，front matter 包含 `title: Agent 整合與自訂擴展`、`cascade:\n  type: docs`，以及課程簡介正文
- [x] 3.2 建立 `site/content/agent/ch1-model-fundamentals.md`（title: `1. LLM 原理與模型選型`，weight: 1，description，showToc: true，學習目標 placeholder）
- [x] 3.3 建立 `site/content/agent/ch2-agent-architecture.md`（title: `2. Agent 架構：ReAct、Memory 與 Context`，weight: 2）
- [x] 3.4 建立 `site/content/agent/ch3-coding-agent-ecosystem.md`（title: `3. Coding Agent 生態系與 OpenCode 架構`，weight: 3）
- [x] 3.5 建立 `site/content/agent/ch4-custom-tools.md`（title: `4. Tools 概念與 OpenCode Plugin 簡介`，weight: 4）
- [x] 3.6 建立 `site/content/agent/ch5-custom-skills.md`（title: `5. Skills 系統：Agent Skills 標準與實作`，weight: 5）
- [x] 3.7 建立 `site/content/agent/ch6-custom-agents.md`（title: `6. Custom Agent 與 Commands 設計`，weight: 6）
- [x] 3.8 建立 `site/content/agent/ch7-mcp-overview.md`（title: `7. MCP 概念與 Agent 整合`，weight: 7）
- [x] 3.9 git commit：`feat: add agent course skeleton (ch1-ch7)`

## 4. 更新設定與導航

- [x] 4.1 更新 `site/config.yaml` 主選單：將原「課程章節 → /lessons/」替換為以下 4 個項目（依 weight 排序）：SDD 實戰攻略 `/sdd/` weight:10、Agent 整合與自訂擴展 `/agent/` weight:20、附錄 `/appendix/` weight:30、相關資源 `/resources/` weight:40
- [x] 4.2 更新 `site/config.yaml` sidebar 選單：加入「附錄 → /appendix/」weight:5，保留「相關資源 → /resources/」weight:10
- [x] 4.3 更新 `site/config.yaml` 的 `title` 為 `AI 課程平台`
- [x] 4.4 git commit：`feat: update config.yaml for multi-course navigation`

## 5. 更新首頁與內部連結

- [x] 5.1 改寫 `site/content/_index.md`：front matter `title` 改為 `AI 課程平台`；正文改為多課程選擇頁格式，包含兩門課程區塊（各含連結與描述）及底部的附錄、相關資源連結
- [x] 5.2 更新 `site/content/sdd/_index.md`：確認 title 為 `從 AI 輔助到規格驅動 (SDD) 實戰攻略`，保留 `cascade: type: docs`
- [x] 5.3 在 `site/content/sdd/ch0-warmup.md` 正文開頭加入 Agent 課程交叉連結提示（blockquote 格式，含 `/agent/` 連結）
- [x] 5.4 更新 `site/content/resources/client-observability.md` 中 2 處 `/lessons/ch5-verify-observe/` 連結，改為 `/sdd/ch5-verify-observe/`
- [x] 5.5 更新 `site/content/sdd/ch4-coding-agent.md` 中指向 `../appendix-setup` 的相對連結，改為 `/appendix/setup/`
- [x] 5.6 修正 `site/layouts/partials/presentation-mode.html` line 2 的 stale comment（移除或更新 `Injected into site/layouts/lessons/single.html` 的錯誤說明）
- [x] 5.7 git commit：`feat: update homepage to multi-course platform, fix internal links`

## 6. 驗證建置與測試

- [x] 6.1 執行 `hugo -s site/ --minify` 確認建置無錯誤，檢查 `site/public/` 下 MUST NOT 存在 `lessons/` 目錄
- [x] 6.2 執行 `npm test`（Jest unit tests）確認全數通過
- [x] 6.3 啟動 `hugo server -s site/` 後執行 Playwright E2E 測試，確認 `/sdd/`、`/agent/`、`/appendix/` 路徑均可存取
- [x] 6.4 人工確認：瀏覽首頁，確認兩門課程區塊、附錄連結均正確顯示
- [x] 6.5 人工確認：瀏覽 `/sdd/ch0-warmup/`，確認 sidebar 顯示 7 個章節（無導言），且開頭有 Agent 課程交叉連結
- [x] 6.6 git commit：`test: verify multi-course structure, all tests passing`

## 7. 部署設定更新

- [x] 7.1 更新 `.github/workflows/deploy.yml` 中的 `GITHUB_PAGES_URL`：將 `ai-sdd-course` 改為 `ai-courses`（完整 URL 改為 `https://github-copilot-consumer.github.io/ai-courses/`）
- [x] 7.2 在 GitHub UI 中將 repo 從 `ai-sdd-course` 改名為 `ai-courses`（⚠️ 手動步驟）
- [x] 7.3 在本地執行 `git remote set-url origin git@github-asus:GitHub-Copilot-Consumer/ai-courses.git` 更新 remote URL（⚠️ 手動步驟）
- [x] 7.4 git commit：`ci: update deploy workflow for repo rename to ai-courses`

## 8. 收尾

- [x] 8.1 更新 `openspec/adr/ADR-001-homepage-course-list-sync.md`：更新「現行章節清單」表格，反映雙課程結構（SDD: `/sdd/` 7 個章節；Agent: `/agent/` 7 個骨架）；說明 ADR 規範現適用於 `sdd/` 和 `agent/` 兩個 section
- [x] 8.2 更新 `README.md`，反映 repo 改名與多課程平台架構
- [x] 8.3 git commit：`docs: update ADR-001 and README for multi-course platform`
