## Context

課程首頁 `site/content/_index.md` 目前以純 Markdown 呈現兩個課程（SDD 實戰攻略、Agent 整合與自訂擴展），使用 `##` 標題、說明段落、章節 bullet list 與水平線分隔。Hextra 主題（v0.12.1）內建 `hextra/feature-grid` 與 `hextra/feature-card` shortcode，支援著陸頁風格的大型卡片網格，完全符合需求，無需任何自訂元件。

## Goals / Non-Goals

**Goals:**
- 將首頁課程列表替換為 2 欄 `hextra/feature-grid` 卡片佈局
- 每個課程（SDD、Agent）呈現為一張 `hextra/feature-card`，帶有 title、subtitle、link
- 響應式：手機版自動降為單欄（Hextra 已內建）
- 參考資料區塊維持原本 Markdown 連結，不變動

**Non-Goals:**
- 修改任何 layout 模板、CSS 或自訂元件
- 修改 `/sdd/` 或 `/agent/` 子頁面
- 在首頁展示個別章節連結
- 新增圖片、tag 或其他 card 裝飾元素

## Decisions

### 決策 1：使用 `hextra/feature-card` 而非 `cards`/`card`

**選擇**：`hextra/feature-grid` + `hextra/feature-card`

**理由**：
- `hextra/feature-card` 為著陸頁風格，卡片面積大、有圓角（rounded-3xl）與玻璃漸層效果，視覺更吸引人
- `cards`/`card` 為文件導航風格，設計緊湊，適合大量小項目，不適合只有 2 個大課程的場景
- 使用者明確偏好「大面積的著陸頁風格」

**備選方案**：`cards`/`card` shortcode——已排除，視覺風格不符。

### 決策 2：cols="2" 固定兩欄

**選擇**：`{{< hextra/feature-grid cols="2" >}}`

**理由**：目前只有兩個課程，2 欄並排是最自然的佈局。未來新增課程時可直接增加 card，grid 會自動處理換行。手機版由 Hextra 的 `max-sm:grid-cols-1` 自動降為單欄。

### 決策 3：章節列表從首頁移除

**選擇**：首頁 card 只呈現課程標題與 1-2 句 subtitle，不列章節

**理由**：
- `hextra/feature-card` 的 subtitle 不支援巢狀 Markdown 列表
- 章節導航由進入課程後的 Hextra sidebar 自動提供（`/sdd/` 與 `/agent/` 已設 `cascade: type: docs`）
- 首頁保持簡潔，降低認知負擔

## Risks / Trade-offs

- **[風險] 使用者習慣看首頁章節清單** → 緩解：sidebar 在進入課程後仍提供完整章節導航，體驗不中斷
- **[風險] Hextra 主題升級破壞 shortcode 介面** → 緩解：shortcode 為主題公開 API，版本釘定在 go.mod，風險極低
- **[取捨] subtitle 長度限制** → feature-card 的 subtitle 以 1-2 句為宜，詳細課程描述改由各課程的 `_index.md` 承載

## Migration Plan

1. 修改 `site/content/_index.md`，以 shortcode 替換純 Markdown 課程區塊
2. 本地執行 `hugo server` 確認渲染結果
3. 執行現有 E2E 測試確認無回歸
4. 直接合併至 main（trunk-based，無 feature branch）

**Rollback**：Git revert 單一 commit 即可完全還原，無任何外部狀態變更。

## Open Questions

（無）
