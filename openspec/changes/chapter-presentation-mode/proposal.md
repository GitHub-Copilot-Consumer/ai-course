## Why

課程章節目前以長滾動頁面呈現，不適合講師在課堂上進行簡報教學。需要一個「簡報模式」讓講師能以全螢幕逐段展示章節內容，提升課堂教學體驗。

## What Changes

- 每個章節頁面新增「進入簡報模式」按鈕
- 點擊按鈕後，頁面切換為全螢幕簡報視圖
- 章節內容依 `---` 分隔符切割為多張投影片
- 支援鍵盤（方向鍵）及螢幕按鈕進行投影片切換
- 支援 ESC 或按鈕退出簡報模式
- 顯示當前投影片進度（例如 3 / 10）

## Capabilities

### New Capabilities

- `chapter-presentation-mode`: 章節頁面的全螢幕簡報模式，含投影片切割、導覽控制與進退場機制

### Modified Capabilities

（無）

## Impact

- 影響 Hugo 主題 `hextra` 的章節頁面 layout（需在 `site/layouts/` 覆寫或使用 Hugo partial）
- 新增 JavaScript 控制器處理簡報邏輯（投影片切割、鍵盤事件、全螢幕 API）
- 新增 CSS 處理全螢幕簡報樣式
- 不影響既有章節的 Markdown 內容結構
- 不影響靜態網站建置流程（Hugo build / GitHub Pages deploy）
