## ADDED Requirements

### Requirement: 行動裝置 sidebar 顯示完整章節頁面樹狀導覽
系統 SHALL 在行動裝置（視窗寬度 `< 768px`）的漢堡選單展開後，sidebar 中 MUST 顯示 `site/content/lessons/` 下所有章節頁面的樹狀導覽連結，其順序與桌機版 sidebar 一致（由各頁面 front matter 的 `weight` 欄位控制）。

此行為 SHALL 透過覆寫 Hextra 主題的 sidebar partial（`site/layouts/partials/sidebar.html`）實現：將行動版與桌機版各自獨立的 `<ul>` 合併為一個統一清單，不傳入 `toc` 參數。

#### Scenario: 行動裝置 sidebar 顯示章節連結
- **WHEN** 視窗寬度為 375px（手機），使用者點擊漢堡選單按鈕
- **THEN** 展開的 sidebar MUST 包含 `site/content/lessons/` 下所有章節頁面的連結（如 `/lessons/ch0-warmup/`、`/lessons/ch1-vibe-coding/` 等）

#### Scenario: 行動裝置 sidebar 連結順序正確
- **WHEN** 視窗寬度為 375px，使用者展開 sidebar
- **THEN** 章節連結 MUST 依 weight 順序排列：導言（-1）→ 0. 課前暖身（1）→ 1. Vibe Coding（2）→ 以此類推

#### Scenario: 桌機版 sidebar 行為不受影響
- **WHEN** 視窗寬度 `>= 768px`
- **THEN** sidebar MUST 持續顯示完整章節頁面樹狀導覽，與修改前行為一致
