## Context

目前網站是以單一 Hugo section（`site/content/lessons/`）承載唯一一門課程。網站 title、首頁、導航全部圍繞該課程設計。

現狀：
- `site/content/lessons/` 含 9 個章節（含導言與附錄）
- 首頁為靜態章節列表，URL 全部以 `/lessons/` 開頭
- `config.yaml` 主選單只有「課程章節 → /lessons/」
- GitHub repo 名稱為 `ai-sdd-course`，GitHub Pages URL 為 `github-copilot-consumer.github.io/ai-sdd-course/`

此 change 將網站架構從「單一課程站」演進為「多課程平台」，同步新增 Agent 課程骨架。

## Goals / Non-Goals

**Goals:**
- 將 `lessons/` 重命名為 `sdd/`，建立 `sdd/`、`agent/`、`appendix/` 三個並列 top-level sections
- 首頁改為課程選擇頁，列出兩門課程與附錄的入口
- 建立 Agent 課程的骨架（`_index.md` + ch1–ch7 檔案，各含 front matter 與 placeholder 內容）
- 附錄提升為獨立 section，路徑改為 `/appendix/setup/`
- 更新所有內部連結、測試路徑、config 導航
- 更新 deploy workflow 對應 repo 改名

**Non-Goals:**
- 撰寫 Agent 課程的實際教學內容（只建骨架）
- 更動 `resources/` section 的結構或內容
- 動態生成首頁課程列表（維持靜態 Markdown，符合 ADR-001 精神）
- 更改 Hugo theme 或 layouts 的視覺設計

## Decisions

### 決策 1：目錄命名 — `sdd/` 而非 `lessons/`

選擇 `sdd/` 作為 SDD 課程的 section 名稱（URL: `/sdd/`），而非維持 `lessons/`。

**理由**：`lessons/` 是一個通用名稱，在多課程情境下無法區分課程。`sdd/` 直接對應課程主題，讓 URL 具有語意（`/sdd/ch1-vibe-coding/` vs `/agent/ch1-model-fundamentals/`）。

**替代方案考慮**：
- 保留 `lessons/` 並加 subdirectory（`lessons/sdd/`）：URL 層級過深，Hugo sidebar 需要額外設定
- 使用 `course-sdd/`：較冗長，無必要

### 決策 2：附錄提升為 top-level section

附錄從 `sdd/appendix-setup.md`（URL: `/sdd/appendix-setup/`）移至 `appendix/setup.md`（URL: `/appendix/setup/`），與 `resources/`、`sdd/`、`agent/` 並列。

**理由**：附錄（工具安裝）是兩門課程共用的參考資料，放在 `sdd/` 下在語意上是錯誤的。提升為 top-level 後，任何課程都可以直接連結 `/appendix/setup/`。

**明確的路徑對應**：

| 舊路徑 | 新路徑 |
|--------|--------|
| `site/content/lessons/appendix-setup.md` | `site/content/appendix/setup.md` |
| `/lessons/appendix-setup/` | `/appendix/setup/` |

### 決策 3：導言（ch-intro-ai.md）移除而非保留精簡版

從 SDD 課程中完全移除 `ch-intro-ai.md`，在 `ch0-warmup.md` 開頭加入一段「建議先修 Agent 課程」的交叉連結提示。

**理由**：導言的完整內容將在 Agent 課程中更深入地呈現。保留精簡版會造成兩門課程內容重疊，維護成本高且對學生造成混淆。

**ch0-warmup.md 交叉連結文字**：
```
> 本課程假設你已了解 LLM、Agent 與 Coding Agent 的基本概念。
> 若尚未接觸，建議先修「[Agent 整合與自訂擴展](/agent/)」課程的基礎章節。
```

### 決策 4：首頁設計 — 靜態課程選擇頁

首頁改為靜態 Markdown 的課程選擇頁，列出兩門課程，各含標題、一行描述、連結。維持靜態而非動態生成。

**理由**：符合 ADR-001 的靜態維護原則。Hugo data file 或 shortcode 動態生成雖然可以消除人工同步負擔，但目前不在本 change 的範圍內。

**首頁結構**：
- 網站標題：`AI 課程平台`
- 兩個課程卡片區塊（各含 title + description + 章節入口連結）
- 底部連結：附錄、相關資源

### 決策 5：config.yaml 主選單結構

**新選單結構**：

| 名稱 | URL | Weight |
|------|-----|--------|
| SDD 實戰攻略 | `/sdd/` | 10 |
| Agent 整合與自訂擴展 | `/agent/` | 20 |
| 附錄 | `/appendix/` | 30 |
| 相關資源 | `/resources/` | 40 |

Sidebar 選單更新為：
| 名稱 | URL | Weight |
|------|-----|--------|
| 附錄 | `/appendix/` | 5 |
| 相關資源 | `/resources/` | 10 |

### 決策 6：Agent 課程骨架的章節清單

Agent 課程初始建立以下 7 個章節骨架（僅含 front matter 與學習目標 placeholder）：

| 檔案 | Title | Weight |
|------|-------|--------|
| `ch1-model-fundamentals.md` | 1. LLM 原理與模型選型 | 1 |
| `ch2-agent-architecture.md` | 2. Agent 架構：ReAct、Memory 與 Context | 2 |
| `ch3-coding-agent-ecosystem.md` | 3. Coding Agent 生態系與 OpenCode 架構 | 3 |
| `ch4-custom-tools.md` | 4. Tools 概念與 OpenCode Plugin 簡介 | 4 |
| `ch5-custom-skills.md` | 5. Skills 系統：Agent Skills 標準與實作 | 5 |
| `ch6-custom-agents.md` | 6. Custom Agent 與 Commands 設計 | 6 |
| `ch7-mcp-overview.md` | 7. MCP 概念與 Agent 整合 | 7 |

### 決策 7：更新 ADR-001 的章節清單

ADR-001 記錄了首頁需與 lesson 檔案同步的規則，且包含一份「現行章節清單」。此 change 需要更新 ADR-001 中的清單，反映新的雙課程結構。

**舊清單**（`/lessons/` 路徑，9 個項目）→ **新清單**（SDD: `/sdd/` 8 個項目；Agent: `/agent/` 7 個骨架）

## Risks / Trade-offs

- **[Risk] `/lessons/` URL 失效影響外部連結** → 目前為課程教學材料，外部連結可能性低；GitHub Pages 不支援自動 redirect，接受此影響。若日後有需求，可以在 `static/` 加入 `_redirects` 或 meta refresh 頁面。

- **[Risk] 測試路徑更新遺漏** → 以明確清單列出所有需更新的測試檔案（見 Decisions），並在 tasks 中設計驗證步驟（hugo build + 跑測試）。

- **[Risk] ADR-001 同步責任擴大** → 現在有兩門課程的 section 需要同步，ADR-001 的規範需一併更新以涵蓋 `sdd/` 和 `agent/`。

- **[Trade-off] 靜態首頁維護負擔** → 每新增課程或更動章節，首頁需手動更新。此為已知的設計取捨，符合 ADR-001 的既定方向。

## Migration Plan

1. **git mv** `site/content/lessons/` → `site/content/sdd/`（Hugo 只認目錄結構，git mv 保留歷史）
2. 從 `sdd/` 移除 `ch-intro-ai.md`，從 `sdd/` 移動 `appendix-setup.md` → `appendix/setup.md`
3. 建立新目錄（`appendix/`、`agent/`）與對應 `_index.md`
4. 更新所有內部連結與設定（config.yaml、_index.md、各章節中的交叉引用）
5. 修正測試路徑
6. hugo build 驗證
7. 更新 deploy.yml 的 GITHUB_PAGES_URL
8. Git remote URL 在 GitHub rename 後手動更新

**Rollback**：git revert 整個 commit 即可回復，無資料庫或外部服務異動。

## Open Questions

- GitHub repo 改名（`ai-sdd-course` → `ai-courses`）需手動在 GitHub UI 操作，不在自動化範圍內。
- Agent 課程的實際內容撰寫為後續 change，本 change 只建骨架。
