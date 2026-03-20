## ADDED Requirements

### Requirement: 課程以卡片網格呈現
首頁 SHALL 使用 `hextra/feature-grid` shortcode（cols="2"）將課程包裹在 2 欄網格容器中。

#### Scenario: 桌面版顯示 2 欄
- **WHEN** 使用者在桌面寬度（≥640px）載入首頁
- **THEN** 頁面顯示 2 欄並排的課程卡片網格

#### Scenario: 手機版自動降為單欄
- **WHEN** 使用者在手機寬度（<640px）載入首頁
- **THEN** 頁面顯示單欄堆疊的課程卡片

### Requirement: 每個課程呈現為 feature-card
每個課程 SHALL 使用 `hextra/feature-card` shortcode 呈現，並帶有以下參數：
- `title`：課程全名（含 emoji）
- `subtitle`：1-2 句課程說明
- `link`：課程 landing page 路徑

具體卡片定義如下（以明確清單為準）：

1. `title="📘 從 AI 輔助到規格驅動 (SDD) 實戰攻略"` / `link="/sdd/"`
2. `title="🤖 Agent 整合與自訂擴展"` / `link="/agent/"`

#### Scenario: SDD 課程卡片可點擊
- **WHEN** 使用者點擊 SDD 課程卡片
- **THEN** 頁面導向 `/sdd/`

#### Scenario: Agent 課程卡片可點擊
- **WHEN** 使用者點擊 Agent 課程卡片
- **THEN** 頁面導向 `/agent/`

#### Scenario: 卡片顯示正確標題
- **WHEN** 首頁渲染完成
- **THEN** 頁面中可見「從 AI 輔助到規格驅動 (SDD) 實戰攻略」與「Agent 整合與自訂擴展」兩個標題

### Requirement: 首頁不再列出個別章節連結
首頁的課程區塊 SHALL NOT 包含個別章節的連結清單（ch0、ch1 等）。章節導航由進入課程後的 sidebar 提供。

#### Scenario: 首頁不含章節連結
- **WHEN** 首頁渲染完成
- **THEN** 頁面中不出現 `/sdd/ch0-warmup/`、`/sdd/ch1-vibe-coding/` 等個別章節路徑的連結

### Requirement: 參考資料區塊維持 Markdown 連結
參考資料區塊（附錄、相關資源）SHALL 維持現有純 Markdown 連結格式，不使用 shortcode。

#### Scenario: 參考資料連結存在
- **WHEN** 首頁渲染完成
- **THEN** 頁面中可見指向 `/appendix/setup/` 與 `/resources/` 的連結
