## Why

目前網站僅承載單一課程「從 AI 輔助到規格驅動 (SDD) 實戰攻略」，但隨著課程內容擴展，需要將「Model、Agent 與 Coding Agent」拆分為獨立的第二門課程，並同步將 repo 更名為 `ai-courses`，使網站成為可承載多門課程的平台。

## What Changes

- **BREAKING** 將 `site/content/lessons/` 目錄重新命名為 `site/content/sdd/`，所有 `/lessons/` URL 改為 `/sdd/`
- 移除 SDD 課程的導言章節（`ch-intro-ai.md`），其內容將由新的 Agent 課程覆蓋；SDD 課程的 `ch0-warmup.md` 加入交叉連結指向 Agent 課程
- 將 `site/content/lessons/appendix-setup.md` 提升為獨立的 top-level section `site/content/appendix/`，與 `resources/` 同層級
- 新增 `site/content/agent/` section，承載第二門課程「Agent 整合與自訂擴展」（初始為骨架結構，ch1–ch7）
- 改寫首頁（`_index.md`）從單課程章節列表改為多課程選擇頁
- 更新 `site/config.yaml` 導航選單，加入兩門課程及附錄的入口
- 修正所有內部連結、測試檔案路徑，以及 layout 中的 stale comment
- 更新 GitHub Actions deploy workflow 中的 `GITHUB_PAGES_URL` 對應 repo 改名（`ai-sdd-course` → `ai-courses`）

## Capabilities

### New Capabilities

- `multi-course-platform`: 網站支援多門課程並存，首頁為課程選擇頁，各課程為獨立 Hugo section，共用 layouts 與 resources
- `agent-course-skeleton`: 第二門課程「Agent 整合與自訂擴展」的骨架結構，包含 `_index.md` 與 ch1–ch7 章節檔案（僅含 front matter 與學習目標 placeholder）
- `appendix-top-level`: 附錄從 SDD 課程內的頁面提升為獨立 top-level section（`/appendix/`），供兩門課程共用

### Modified Capabilities

- `site-navigation`: 主選單從「課程章節 → /lessons/」改為兩門課程各自入口（`/sdd/`、`/agent/`）及附錄（`/appendix/`）；sidebar 同步更新
- `homepage-course-index`: 首頁從單課程章節列表改為多課程選擇頁，列出兩門課程的描述與連結
- `course-content-pages`: SDD 課程章節頁面的 URL base path 從 `/lessons/` 改為 `/sdd/`；`appendix-setup` 頁面移至 `/appendix/setup/`

## Impact

- 所有指向 `/lessons/` 的內部連結需更新為 `/sdd/`（涉及 `site/content/` 下多個 Markdown 檔案、`site/config.yaml`）
- E2E 測試（`site/tests/e2e/`）與 unit 測試中的路徑需同步更新
- GitHub Pages 部署 URL 隨 repo 改名而變更（`ai-sdd-course` → `ai-courses`）
- `site/layouts/partials/presentation-mode.html` 中的 stale comment 需修正
- 現有 specs（`site-navigation`、`homepage-course-index`、`course-content-pages`）的 requirements 將被此 change 的 delta specs 覆蓋
