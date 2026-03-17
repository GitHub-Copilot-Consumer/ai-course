# Spec: plantuml-rendering

## Purpose

本 spec 定義 Hugo 靜態網站中 PlantUML 圖表的渲染能力。透過 Kroki API，將 Markdown 中的 PlantUML 語法於建置時轉換為 SVG，並直接內嵌於輸出的 HTML 頁面中。

---

## Requirements

### Requirement: PlantUML code block 渲染為 SVG
Hugo 頁面 SHALL 將 Markdown 中以 ` ```plantuml ` fenced code block 包裹的 PlantUML 語法，於建置時（build time）透過 Kroki API 渲染為 SVG，並將 SVG 直接內嵌於輸出的 HTML 頁面中。

渲染機制 SHALL 透過 Hugo render hook `site/layouts/_default/_markup/render-codeblock-plantuml.html` 實現，使用 `resources.GetRemote` 以 POST 方式呼叫 `https://kroki.io/plantuml/svg`，body 為 PlantUML 原始文字。

#### Scenario: 正常渲染 PlantUML 圖表
- **WHEN** Markdown 頁面包含 ` ```plantuml ` fenced code block，內容為有效的 PlantUML 語法
- **THEN** 建置後的 HTML 中 SHALL 包含對應的 `<svg>` 元素，且圖表視覺正確呈現

#### Scenario: Kroki API 回傳 SVG 內容
- **WHEN** render hook 以 POST 方式呼叫 `https://kroki.io/plantuml/svg`，body 為 PlantUML 文字
- **THEN** Kroki SHALL 回傳 `Content-Type: image/svg+xml` 的 SVG 字串
- **THEN** render hook SHALL 將該 SVG 字串以 `safeHTML` 輸出至 HTML

#### Scenario: Kroki API 呼叫失敗
- **WHEN** `resources.GetRemote` 呼叫失敗（網路錯誤或 API 回傳非 2xx）
- **THEN** Hugo 建置 SHALL 輸出警告訊息（`warnf`），不中斷整體建置
- **THEN** 該圖表位置 SHALL 顯示原始 PlantUML 程式碼（fallback），以 `<pre><code>` 包裹

---

### Requirement: PlantUML shortcode 支援
Hugo 頁面 SHALL 支援 `{{< plantuml >}}` shortcode，其功能與 render hook 相同，作為備援語法。

Shortcode SHALL 位於 `site/layouts/shortcodes/plantuml.html`，使用與 render hook 相同的 Kroki API 呼叫機制。

#### Scenario: 使用 shortcode 插入圖表
- **WHEN** Markdown 頁面使用 `{{< plantuml >}}PlantUML 內容{{< /plantuml >}}` 語法
- **THEN** 建置後的 HTML 中 SHALL 包含對應的 `<svg>` 元素

---

### Requirement: Hugo Goldmark 允許 HTML 輸出
Hugo 的 Goldmark Markdown 渲染器 SHALL 設定 `markup.goldmark.renderer.unsafe: true`，以允許 render hook 輸出原始 HTML（SVG 內容）。

#### Scenario: Goldmark unsafe 模式已啟用
- **WHEN** `site/config.yaml` 中 `markup.goldmark.renderer.unsafe` 設為 `true`
- **THEN** render hook 輸出的 `<svg>` 元素 SHALL 正確嵌入 HTML，不被 Goldmark 過濾

---

### Requirement: 課程頁面包含 PlantUML 圖表範例
至少一個課程 Markdown 頁面 SHALL 包含有效的 PlantUML 圖表（使用 fenced code block），作為範例與驗證。

圖表類型 SHALL 涵蓋至少一種流程圖（activity diagram 或 flowchart）或架構圖（component/deployment diagram）。

#### Scenario: 課程頁面圖表可預覽
- **WHEN** 使用者在瀏覽器中開啟包含 PlantUML 圖表的課程頁面
- **THEN** 圖表 SHALL 以 SVG 形式正確顯示，不顯示原始 PlantUML 文字

#### Scenario: 靜態建置後圖表保持可見
- **WHEN** 執行 `hugo --minify` 完成靜態建置
- **THEN** 輸出的 HTML 檔案 SHALL 內嵌 SVG，無需 JavaScript 即可顯示圖表
