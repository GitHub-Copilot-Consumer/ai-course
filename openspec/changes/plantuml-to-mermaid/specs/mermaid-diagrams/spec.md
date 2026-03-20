## ADDED Requirements

### Requirement: 課程頁面使用 Mermaid fenced code block 呈現圖表

課程頁面 SHALL 使用 ` ```mermaid ` fenced code block 語法撰寫圖表，由 Hextra 主題原生支援，於瀏覽器端渲染，無需外部 API 或自定義 render hook。

以下 3 個課程 Markdown 檔案 SHALL 包含 Mermaid fenced code block：
- `site/content/sdd/ch0-warmup.md`
- `site/content/sdd/ch2-mvp-to-spec.md`
- `site/content/sdd/ch3-openspec.md`

#### Scenario: 課程頁面圖表在瀏覽器中可見

- **WHEN** 使用者在瀏覽器中開啟含有 Mermaid 圖表的課程頁面
- **THEN** 圖表 SHALL 以 SVG 形式正確顯示，不顯示原始 Mermaid 文字

#### Scenario: Mermaid block 存在於課程內容

- **WHEN** 讀取 `ch0-warmup.md`、`ch2-mvp-to-spec.md`、`ch3-openspec.md`
- **THEN** 每個檔案 SHALL 至少包含一個以 ` ```mermaid ` 開頭的 fenced code block

#### Scenario: 無 PlantUML block 殘留

- **WHEN** 讀取所有 `site/content/sdd/*.md` 檔案
- **THEN** 不得存在任何以 ` ```plantuml ` 開頭的 fenced code block

### Requirement: 移除 PlantUML 自定義 layout 檔案

下列兩個檔案 SHALL 不存在於專案中：
- `site/layouts/_default/_markup/render-codeblock-plantuml.html`
- `site/layouts/shortcodes/plantuml.html`

#### Scenario: PlantUML render hook 已刪除

- **WHEN** 檢查 `site/layouts/_default/_markup/` 目錄
- **THEN** 不得存在 `render-codeblock-plantuml.html` 檔案

#### Scenario: PlantUML shortcode 已刪除

- **WHEN** 檢查 `site/layouts/shortcodes/` 目錄
- **THEN** 不得存在 `plantuml.html` 檔案

### Requirement: Mermaid 圖表測試覆蓋課程內容與渲染行為

測試 SHALL 驗證：
1. 所有指定課程檔案包含 ` ```mermaid ` block（unit 測試）
2. 無 ` ```plantuml ` block 殘留（unit 測試）
3. PlantUML layout 檔案已刪除（unit 測試）
4. 瀏覽器中 Mermaid 圖表渲染為可見 SVG（E2E 測試）

Unit 測試 SHALL 位於 `site/tests/mermaid/mermaid.test.js`。
E2E 測試 SHALL 位於 `site/tests/e2e/mermaid-rendering.e2e.js`。

#### Scenario: Unit 測試驗證 Mermaid block 存在

- **WHEN** 執行 `npm test` in `site/`
- **THEN** `mermaid.test.js` SHALL 通過，驗證 ch0、ch2、ch3 各含 Mermaid block

#### Scenario: Unit 測試驗證 PlantUML 已清除

- **WHEN** 執行 `npm test` in `site/`
- **THEN** `mermaid.test.js` SHALL 通過，驗證所有內容檔案無 ` ```plantuml ` block，且兩個 PlantUML layout 檔案不存在

#### Scenario: E2E 測試驗證 Mermaid SVG 渲染

- **WHEN** 執行 Playwright E2E 測試
- **THEN** `mermaid-rendering.e2e.js` SHALL 通過，驗證 ch0、ch2、ch3 頁面均可見 Mermaid SVG，且無原始 Mermaid 文字顯示
