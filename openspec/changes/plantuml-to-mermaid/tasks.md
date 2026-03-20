## 1. Red Phase：撰寫失敗測試

- [x] 1.1 建立 `site/tests/mermaid/mermaid.test.js`，以固定常數清單（`MERMAID_CONTENT_FILES`、`PLANTUML_LAYOUT_FILES`）定義待驗證的檔案路徑，斷言：(a) ch0、ch2、ch3 各含 ` ```mermaid ` block；(b) 所有內容檔案無 ` ```plantuml ` block；(c) `render-codeblock-plantuml.html` 與 `plantuml.html` 不存在
- [x] 1.2 建立 `site/tests/e2e/mermaid-rendering.e2e.js`，以 Playwright 斷言 ch0、ch2、ch3 頁面存在可見的 Mermaid SVG，且不顯示原始 Mermaid 文字
- [x] 1.3 執行 `npm test`（unit）確認新測試失敗（Red）；確認舊 `plantuml.test.js` 可繼續運行（不刪除）
- [x] 1.4 git commit: `test(mermaid): add failing unit and e2e tests for mermaid migration`

## 2. Green Phase：轉換圖表內容

- [x] 2.1 轉換 `site/content/sdd/ch0-warmup.md`
- [x] 2.2 轉換 `site/content/sdd/ch2-mvp-to-spec.md`
- [x] 2.3 轉換 `site/content/sdd/ch3-openspec.md`
- [x] 2.4 執行 `npm test`（unit）確認 mermaid.test.js 通過（Green）
- [x] 2.5 git commit: `feat(diagrams): convert all plantuml diagrams to mermaid`

## 3. 移除 PlantUML 基礎設施

- [x] 3.1 刪除 `site/layouts/_default/_markup/render-codeblock-plantuml.html`
- [x] 3.2 刪除 `site/layouts/shortcodes/plantuml.html`
- [x] 3.3 更新 `site/config.yaml`：將 L34 的註解由 `# Required to allow render hooks (e.g., plantuml) to output raw HTML/SVG` 改為 `# Required to allow render hooks to output raw HTML`
- [x] 3.4 刪除舊有 unit 測試 `site/tests/plantuml/plantuml.test.js`（整個 `plantuml/` 目錄）
- [x] 3.5 刪除舊有 E2E 測試 `site/tests/e2e/plantuml-rendering.e2e.js`
- [x] 3.6 執行 `npm test`（unit）確認所有測試仍通過
- [x] 3.7 git commit: `refactor(plantuml): remove plantuml render hook, shortcode, and tests`

## 4. 更新 OpenSpec Specs

- [x] 4.1 刪除 `openspec/specs/plantuml-rendering/` 目錄（整個資料夾）
- [x] 4.2 刪除 `openspec/specs/course-roadmap-plantuml/` 目錄（整個資料夾）
- [x] 4.3 在 `openspec/specs/mermaid-diagrams/` 建立新 spec，內容由 `openspec/changes/plantuml-to-mermaid/specs/mermaid-diagrams/spec.md` 轉換（移除 delta 標頭，改為正式 spec 格式）
- [x] 4.4 在 `openspec/specs/course-roadmap-mermaid/` 建立新 spec，內容由 `openspec/changes/plantuml-to-mermaid/specs/course-roadmap-mermaid/spec.md` 轉換（同上）
- [x] 4.5 git commit: `docs(openspec): replace plantuml specs with mermaid specs`

## 5. 更新 README 與收尾

- [ ] 5.1 更新 `README.md`：將「PlantUML 圖表」區段（L142-146）改為說明 Mermaid/Hextra 原生支援，移除 Kroki 相關說明
- [ ] 5.2 執行完整測試套件（unit + E2E）確認全部通過
- [ ] 5.3 git commit: `docs(readme): update diagram section to reflect mermaid migration`
