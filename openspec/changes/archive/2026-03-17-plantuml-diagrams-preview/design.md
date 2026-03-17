## Context

本課程網站使用 Hugo 搭配 Hextra 主題。目前課程教材中需要呈現流程圖與架構圖，但缺乏統一的圖表格式，也無法在 Hugo 渲染的頁面中直接預覽。PlantUML 是業界常用的文字式圖表工具，可用純文字描述 UML 圖、流程圖、時序圖與架構圖。

目前 Hugo 原生不支援 PlantUML 渲染，需透過自訂 shortcode 或整合外部渲染服務來實現。Kroki（https://kroki.io）是一個公開的圖表渲染 API，支援 PlantUML，且不需要本地 Java 環境。

## Goals / Non-Goals

**Goals:**
- 在 Hugo 頁面中支援 PlantUML 語法，能渲染為 SVG 圖像
- 不依賴本地 Java 環境（使用 Kroki API 做遠端渲染）
- 課程作者可在 Markdown 中以 `{{< plantuml >}}` shortcode 插入圖表
- 圖表在靜態 Hugo 建置產出（public/）中正確顯示，無需 JavaScript

**Non-Goals:**
- 即時編輯／預覽（WYSIWYG editor）
- 支援 Mermaid 或其他圖表格式
- 自架 Kroki / PlantUML server

## Decisions

### 決策 1：使用 Hugo Shortcode 而非 Markdown Code Fence

Hugo 不支援透過 Goldmark extension 直接處理特定 code fence，但支援自訂 shortcode。因此採用 `{{< plantuml >}}` shortcode。

- **替代方案**：使用 `render-codeblock-plantuml` hook（Hugo 0.119+ 支援），可讓 ````plantuml` code fence 自動渲染
- **決策**：優先採用 code block render hook（`render-codeblock-plantuml.html`），語法更自然，與標準 Markdown 一致；同時提供 shortcode 作為備援
- **理由**：render hook 讓作者直接用 ````plantuml` fenced code block，不需記憶 shortcode 語法，與 VS Code PlantUML 插件、GitHub 等工具的習慣一致

### 決策 2：使用 Kroki API 渲染（遠端，build time）

渲染時機選擇：
- **Build time**（Hugo 建置時呼叫 Kroki API）：靜態輸出，無執行期依賴，適合靜態網站托管
- **Runtime**（瀏覽器端 JS 呼叫 Kroki）：需要 JS，但減少建置時間

**決策**：Build time 渲染，在 Hugo render hook 中使用 `resources.GetRemote` 呼叫 Kroki API，將 SVG 內嵌至 HTML

- **理由**：靜態輸出無執行期依賴，符合課程網站的靜態部署需求；SVG 直接內嵌讓圖表在離線也能顯示
- **Kroki URL 格式**：`https://kroki.io/plantuml/svg/<base64url-encoded-diagram>`

### 決策 3：PlantUML 內容以 Base64url 編碼傳送至 Kroki

Kroki GET API 使用 deflate + base64url 編碼圖表內容。Hugo template 中使用 `base64Encode` 搭配 `urlquery` 可部分實現，但 Kroki 需要特定的 zlib deflate 壓縮格式。

**決策**：改用 Kroki 的 POST API（`https://kroki.io/plantuml/svg`，body 為 PlantUML 文字），Hugo 的 `resources.GetRemote` 支援 POST 請求，不需壓縮編碼

- **理由**：POST API 直接傳送原始 PlantUML 文字，無需在 Hugo template 中實作 deflate 壓縮，實作簡單可靠

## Risks / Trade-offs

- **外部 API 依賴** → Kroki 公開服務可能不穩定或有速率限制；緩解：Hugo 的 `resources.GetRemote` 預設會快取回應，多次建置不會重複呼叫
- **建置時間增加** → 每個 PlantUML 圖表需一次 HTTP 請求；緩解：Hugo resource 快取機制，後續建置直接使用快取 SVG
- **SVG 安全性** → 內嵌第三方 SVG 有 XSS 風險；緩解：Kroki 為知名開源工具，SVG 內容由自己的 PlantUML 原始碼產生，風險可接受
- **離線建置失敗** → 若 Kroki API 無法連線，建置會失敗；緩解：使用 Hugo 的 `errorf` / `warnf` 處理錯誤，可設定 fallback 顯示原始碼

## Migration Plan

1. 新增 `site/layouts/_default/_markup/render-codeblock-plantuml.html`（render hook）
2. 新增 `site/layouts/shortcodes/plantuml.html`（shortcode，備援）
3. 在 `site/config.yaml` 加入 `unsafe: true`（允許 HTML 輸出，Goldmark 設定）
4. 在至少一個課程頁面中加入 PlantUML 圖表範例，驗證渲染效果
5. 建置驗證：`hugo --minify` 確認圖表正確嵌入 HTML

**Rollback**：刪除 render hook 與 shortcode 檔案即可完全回復，不影響現有頁面內容

## Open Questions

- 課程頁面中哪些流程圖與架構圖需要優先新增？（可在後續 task 中決定）
- 是否需要支援 PlantUML 主題（skin）自訂，使圖表風格與課程網站一致？
