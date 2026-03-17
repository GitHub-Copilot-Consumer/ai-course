## 1. 測試先行：新增常數與過濾邏輯的測試

- [x] 1.1 在 `site/tests/presentation-mode/presentation-mode.test.js` 新增測試群組：驗證 `NO_SLIDE_CLASS` 常數存在且值為 `'no-slide'`
- [x] 1.2 新增測試：`buildSlides()` 應跳過 class 為 `no-slide` 的 Element 節點（含 no-slide div 的投影片區段，其他內容正常出現）
- [x] 1.3 新增測試：`buildSlides()` 中 no-slide div 不存在時行為與修改前相同
- [x] 1.4 在 `site/tests/presentation-mode/presentation-mode.test.js` 新增測試群組：驗證 `SLIDE_SPLIT_COMMENT` 常數存在且值為 `'split'`
- [x] 1.5 新增測試：含一個 `<!-- split -->` 的粗群組被拆分為 2 張投影片，comment 節點不出現在任何投影片中
- [x] 1.6 新增測試：含兩個 `<!-- split -->` 的粗群組被拆分為 3 張投影片
- [x] 1.7 新增測試：`<!-- split -->` 在群組開頭或結尾時，空群組被過濾不產生空投影片
- [x] 1.8 新增測試：`<hr>` 與 `<!-- split -->` 組合情境（2 個 hr + 1 個 split → 4 張投影片）
- [x] 1.9 確認所有新增測試在此階段 **失敗**（Red phase）並執行 `npm test`
- [x] 1.10 git commit: `test(presentation-mode): add tests for no-slide filtering and split hint`

## 2. 實作：更新可測試模組 `presentation-mode.js`

- [x] 2.1 在 `site/tests/presentation-mode/presentation-mode.js` 常數區段新增 `const NO_SLIDE_CLASS = 'no-slide';`
- [x] 2.2 新增 `const SLIDE_SPLIT_COMMENT = 'split';`
- [x] 2.3 修改 `buildSlides()`：在將節點推入 currentGroup 前，以 `node.classList?.contains(NO_SLIDE_CLASS)` 判斷，若為 true 則跳過
- [x] 2.4 修改 `buildSlides()`：每個 `<hr>` 產生的粗群組處理完後，以 `SLIDE_SPLIT_COMMENT` 對 comment 節點再次切割為子群組，子群組 flatten 後加入最終陣列
- [x] 2.5 修改 `buildSlides()`：過濾空群組（僅含空白文字節點或長度 0 的群組不加入結果）
- [x] 2.6 更新 `module.exports`，將 `NO_SLIDE_CLASS` 與 `SLIDE_SPLIT_COMMENT` 新增至匯出物件
- [x] 2.7 執行 `npm test`，確認所有測試通過（Green phase）
- [x] 2.8 git commit: `feat(presentation-mode): add no-slide filtering and split hint logic`

## 3. 同步更新 `presentation-mode.html`

- [x] 3.1 在 `site/layouts/partials/presentation-mode.html` 的 JS 常數區段新增 `const NO_SLIDE_CLASS = 'no-slide';` 與 `const SLIDE_SPLIT_COMMENT = 'split';`
- [x] 3.2 將 `presentation-mode.html` 的 `buildSlides()` 實作與步驟 2.3–2.5 同步（no-slide 過濾 + split 拆分 + 空群組過濾）
- [x] 3.3 在 `<style>` 區段新增 CSS：`.content .slide-only { display: none; }`（slide-only 在文件頁面中隱藏）
- [x] 3.4 git commit: `feat(presentation-mode): sync html partial with no-slide and split logic`

## 4. CSS 排版升級

- [x] 4.1 在 `site/layouts/partials/presentation-mode.html` 的 `<style>` 區段，更新 `.presentation-slide h1` font-size 為 `3rem`
- [x] 4.2 更新 `.presentation-slide h2` font-size 為 `2rem`
- [x] 4.3 新增 `.presentation-slide h3 { font-size: 1.5rem; }`（原無明確設定）
- [x] 4.4 更新 `.presentation-slide p, .presentation-slide li` font-size 為 `1.25rem`，line-height 為 `1.8`
- [x] 4.5 新增各標題的 margin 規則：h1 `margin-top: 0; margin-bottom: 0.75rem`；h2 `margin-top: 2rem; margin-bottom: 0.75rem`；h3 `margin-top: 1.5rem; margin-bottom: 0.75rem`
- [x] 4.6 新增 `.presentation-slide p { margin-bottom: 1rem; }`
- [x] 4.7 git commit: `style(presentation-mode): increase heading sizes and improve spacing`

## 5. 驗證與範例

- [x] 5.1 在 `site/content/lessons/ch0-warmup.md` 中，選擇一個內容較密集的投影片區段，加入 `<!-- split -->` 範例，驗證作者工作流可行
- [x] 5.2 執行 `npm test` 確認全部測試通過，coverage 不低於 80%
- [x] 5.3 git commit: `docs(ch0-warmup): add split hint example for dense slide`

## 6. 收尾

- [x] 6.1 更新 `README.md`，在簡報模式說明段落補充 `.no-slide` 與 `<!-- split -->` 的使用方式
- [x] 6.2 git commit: `docs(readme): document no-slide and split hint authoring patterns`
