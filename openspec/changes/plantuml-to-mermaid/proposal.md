## Why

目前課程網站使用 PlantUML（透過 Kroki API 在建置時轉換為 SVG）渲染圖表，這需要外部網路依賴、自定義 render hook、shortcode 及 Goldmark unsafe 模式。Hextra 原生支援 Mermaid，可直接在瀏覽器端渲染，無需外部 API，可移除所有自定義圖表基礎設施。

## What Changes

- 將 5 個 PlantUML fenced code block（`ch0-warmup.md`、`ch2-mvp-to-spec.md`、`ch3-openspec.md`）轉換為等效的 Mermaid 語法
- 刪除 Hugo render hook：`site/layouts/_default/_markup/render-codeblock-plantuml.html`
- 刪除 Hugo shortcode：`site/layouts/shortcodes/plantuml.html`
- 更新 `site/config.yaml`：移除 PlantUML 相關說明
- 更新測試：將 PlantUML 測試改寫為 Mermaid 測試（unit + E2E）
- 更新 `README.md`：將圖表說明從 PlantUML/Kroki 改為 Mermaid/Hextra
- 更新 OpenSpec specs：將 `plantuml-rendering` 與 `course-roadmap-plantuml` 替換為 Mermaid 對應版本

## Capabilities

### New Capabilities

- `mermaid-diagrams`: 課程頁面使用 Mermaid fenced code block 呈現圖表，由 Hextra 原生支援，無需自定義 render hook 或外部 API
- `course-roadmap-mermaid`: 課程路線圖以 Mermaid `graph LR` + subgraph 呈現，包含 Greenfield/Brownfield 分區與 MVP 轉折點標籤

### Modified Capabilities

（無需求層級變更，僅實作技術替換）

## Impact

- 移除 Kroki API 建置時網路依賴（加速建置、消除外部服務風險）
- 移除 2 個自定義 Hugo layout 檔案
- `site/config.yaml` 中的 `unsafe: true` 保留（供其他潛在用途），僅更新說明
- 測試檔案重新命名並改寫：`plantuml.test.js` → `mermaid.test.js`、`plantuml-rendering.e2e.js` → `mermaid-rendering.e2e.js`
- 舊有 OpenSpec specs（`plantuml-rendering`、`course-roadmap-plantuml`）以新 Mermaid specs 取代
