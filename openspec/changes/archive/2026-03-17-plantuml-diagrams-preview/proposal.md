## Why

課程教材中的流程圖與架構圖目前缺乏統一的圖表格式，學生無法直接在瀏覽器中預覽圖表內容。引入 PlantUML 支援，讓課程頁面的流程圖與架構圖能以標準化方式撰寫，並可即時在 Hugo 網站中渲染預覽。

## What Changes

- 在 Hugo 網站中整合 PlantUML 渲染能力，支援在 Markdown 內容中使用 PlantUML code block
- 新增 Hugo shortcode 或設定，讓 `plantuml` code fence 能在頁面中渲染為 SVG/PNG 圖像
- 課程內容（lessons）中的流程圖與架構圖改以 PlantUML 格式撰寫
- 確保 PlantUML 圖表在 Hugo 建置後可於瀏覽器中正確預覽（不需本地安裝 Java）

## Capabilities

### New Capabilities
- `plantuml-rendering`: 在 Hugo 網站中支援 PlantUML 圖表渲染，透過 Kroki 公開 API 或本地 PlantUML server 將 PlantUML 語法轉換為 SVG，嵌入於課程頁面中

### Modified Capabilities
<!-- 無現有 spec 需要修改需求層級 -->

## Impact

- `site/layouts/partials/` 或 `site/layouts/shortcodes/`：新增 PlantUML shortcode 的 Hugo template
- `site/static/`：可能新增 JS 或 CSS 以支援圖表渲染
- `site/content/lessons/`：現有課程 Markdown 頁面新增 PlantUML 圖表範例
- 不依賴本地 Java 環境，使用 Kroki API（https://kroki.io）作為渲染服務，無需額外基礎設施
- 不影響現有 Hugo 建置流程與 CI/CD 管線
