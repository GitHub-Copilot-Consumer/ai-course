## Why

簡報模式目前的字型大小與行距對全螢幕簡報而言偏小、偏緊，且所有文件內容（包含詳細操作步驟、實驗說明等）都會出現在投影片中，造成單張投影片資訊過於密集，不適合做為課堂教學使用。

## What Changes

- 調大投影片標題（h1/h2/h3）字型大小，提升可讀性
- 增加標題、段落、清單之間的垂直間距
- 新增 `.no-slide` HTML class 機制：Markdown 中以 `<div class="no-slide">` 包覆的內容在簡報模式中會被過濾，但在一般文件檢視時仍可見
- 新增 `<!-- split -->` 分頁提示機制：作者可在單張投影片內插入 `<!-- split -->` 來手動拆分過長的投影片為多頁
- CSS 在一般文件檢視時隱藏 `.slide-only` 內容（簡報模式下則顯示），為未來需要使用提供支援

## Capabilities

### New Capabilities

- `presentation-typography`: 投影片的字型大小與行距視覺規格
- `presentation-content-filtering`: 以 `.no-slide` class 在簡報模式中過濾指定內容
- `presentation-slide-splitting`: 以 `<!-- split -->` 提示將單張投影片拆分為多頁

### Modified Capabilities

- `chapter-presentation-mode`: 投影片切割機制需延伸支援 `<!-- split -->` 節點與 `.no-slide` 節點的處理

## Impact

- `site/layouts/partials/presentation-mode.html`：CSS 排版調整 + JS 邏輯（`.no-slide` 過濾、`<!-- split -->` 拆分）
- `site/tests/presentation-mode/presentation-mode.js`：與 HTML partial 保持同步的可測試模組
- `site/tests/presentation-mode/presentation-mode.test.js`：新增對應測試案例
- 所有 `site/content/lessons/*.md`：作者可按需在內容中加入 `<div class="no-slide">` 或 `<!-- split -->`
