## 1. Hugo 設定與基礎建設

- [x] 1.1 撰寫失敗測試：驗證 `site/config.yaml` 中 `markup.goldmark.renderer.unsafe` 為 `true`
- [x] 1.2 在 `site/config.yaml` 新增 `markup.goldmark.renderer.unsafe: true` 設定
- [x] 1.3 確認測試通過，git commit（`feat: enable goldmark unsafe rendering for html output`）

## 2. PlantUML Render Hook 實作

- [x] 2.1 撰寫失敗測試：驗證 `site/layouts/_default/_markup/render-codeblock-plantuml.html` 存在
- [x] 2.2 建立 `site/layouts/_default/_markup/render-codeblock-plantuml.html`，以 `resources.GetRemote` POST 至 `https://kroki.io/plantuml/svg`，將回傳 SVG 以 `safeHTML` 輸出
- [x] 2.3 實作 fallback 邏輯：API 失敗時以 `warnf` 輸出警告，並顯示原始程式碼 `<pre><code>`
- [x] 2.4 確認測試通過，git commit（`feat: add plantuml render hook using kroki api`）

## 3. PlantUML Shortcode 實作

- [x] 3.1 撰寫失敗測試：驗證 `site/layouts/shortcodes/plantuml.html` 存在
- [x] 3.2 建立 `site/layouts/shortcodes/plantuml.html`，使用與 render hook 相同的 Kroki POST API 呼叫邏輯
- [x] 3.3 確認測試通過，git commit（`feat: add plantuml shortcode as fallback syntax`）

## 4. 課程頁面新增 PlantUML 圖表範例

- [x] 4.1 撰寫失敗測試：驗證至少一個課程 Markdown 頁面包含 ` ```plantuml ` fenced code block
- [x] 4.2 在適合的課程頁面（例如 `site/content/lessons/`）新增 PlantUML 流程圖或架構圖範例（至少一個 activity diagram 或 component diagram）
- [x] 4.3 確認測試通過，git commit（`docs: add plantuml diagram examples to lesson pages`）

## 5. 整合驗證與建置測試

- [x] 5.1 執行 `hugo --minify` 確認建置成功，輸出 HTML 中包含 `<svg>` 元素
- [x] 5.2 撰寫 E2E 測試（Playwright）：開啟含 PlantUML 圖表的頁面，驗證 `<svg>` 元素存在且可見
- [x] 5.3 確認測試覆蓋率 ≥ 80%，git commit（`test: add e2e test for plantuml diagram rendering`）

## 6. 文件更新

- [x] 6.1 更新 `README.md`，說明 PlantUML 使用方式（fenced code block 語法與 shortcode 語法）
- [x] 6.2 git commit（`docs: update README with plantuml usage instructions`）
