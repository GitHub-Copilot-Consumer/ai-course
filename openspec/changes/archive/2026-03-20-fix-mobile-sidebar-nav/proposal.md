## Why

手機版 (`< 768px`) 的漢堡選單展開後，sidebar 只顯示兩個頂層導覽項目（「課程章節」與「相關資源」），而非完整的章節頁面清單。這是 Hextra 主題的預設行為，但對課程網站的使用者而言，行動裝置上無法直接跳到特定章節，嚴重影響導覽體驗。

## What Changes

- 新增 `site/layouts/partials/sidebar.html`，覆寫 Hextra 主題的 sidebar partial
- 將手機版與桌機版各自獨立的 `<ul>` 合併為單一清單，讓行動裝置也能顯示完整章節頁面樹狀導覽
- 不修改任何其他佈局、設定或 CSS 檔案

## Capabilities

### New Capabilities
- `mobile-sidebar-nav`: 行動裝置 sidebar 顯示完整章節頁面樹狀導覽（與桌機版相同內容）

### Modified Capabilities
- `site-navigation`: sidebar 在行動裝置上的顯示行為變更（requirement 新增：手機版 MUST 呈現章節頁面連結）

## Impact

- **新增檔案**: `site/layouts/partials/sidebar.html`（覆寫 Hextra `github.com/imfing/hextra@v0.12.1` 的 `layouts/_partials/sidebar.html`）
- **升級風險**: 若未來升級 Hextra，需手動比對覆寫檔與新版主題的差異
- **無破壞性變更**: 桌機版 sidebar 行為不受影響
