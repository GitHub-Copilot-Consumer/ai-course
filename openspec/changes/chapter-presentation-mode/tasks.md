## 1. 測試框架設置

- [x] 1.1 在 `site/` 下建立 `tests/presentation-mode/` 目錄，初始化測試環境（選用 Playwright 或 jsdom + Jest，以可對靜態 HTML 執行 DOM 測試為準）
- [x] 1.2 撰寫測試前置輔助函式：載入包含 `<hr>` 的靜態 HTML fixture，模擬 `.content` 容器結構
- [x] 1.3 git commit: `test: add presentation mode test scaffolding`

## 2. Presentation Mode Partial（核心邏輯）

- [x] 2.1 建立 `site/layouts/partials/presentation-mode.html`，定義常數 `SLIDE_SEPARATOR_TAG = 'HR'` 與 `PRESENTATION_CONTENT_SELECTOR = '.content'`
- [x] 2.2 實作 `buildSlides()` 函式：以 `<hr>` 為邊界，將 `.content` 子節點分組為 `div.presentation-slide` 陣列（不含 `<hr>` 本身）
- [x] 2.3 為 `buildSlides()` 撰寫單元測試：驗證 N 個 `<hr>` 產生 N+1 張投影片、無 `<hr>` 產生 1 張、投影片內無 `<hr>` 元素
- [x] 2.4 實作 `createOverlay()` 函式：建立 `#presentation-overlay`，包含 `#btn-exit-presentation`、`#btn-prev-slide`、`#slide-progress`、`#btn-next-slide`、及投影片內容容器
- [x] 2.5 實作 `showSlide(index)` 函式：顯示指定投影片內容，更新 `#slide-progress` 為 `{current} / {total}`
- [x] 2.6 為 `showSlide()` 撰寫單元測試：驗證進度文字格式、邊界投影片（第一張、最後一張）的正確顯示
- [x] 2.7 git commit: `feat: implement slide building and overlay creation`

## 3. 導覽控制與鍵盤事件

- [x] 3.1 實作 `nextSlide()` / `prevSlide()` 函式：邊界保護（第一張不往前、最後一張不往後）
- [x] 3.2 為 `nextSlide()` / `prevSlide()` 撰寫單元測試：驗證邊界行為（已是最後/第一張時不移動）
- [x] 3.3 實作鍵盤事件監聽器：`ArrowRight` → `nextSlide()`，`ArrowLeft` → `prevSlide()`，`Escape` → `exitPresentation()`
- [x] 3.4 為鍵盤事件撰寫測試：驗證 ArrowRight/ArrowLeft 觸發正確行為、退出後 ArrowRight 不再切換投影片
- [ ] 3.5 git commit: `feat: add keyboard navigation for presentation mode`

## 4. 進入與退出全螢幕

- [x] 4.1 實作 `enterPresentation()` 函式：呼叫 `buildSlides()`、`createOverlay()`、`showSlide(0)`、`document.documentElement.requestFullscreen()`
- [x] 4.2 實作 `exitPresentation()` 函式：從 DOM 移除 `#presentation-overlay`、呼叫 `document.exitFullscreen()`（若當前為全螢幕）、移除鍵盤事件監聽器
- [x] 4.3 監聽 `fullscreenchange` 事件：當 `document.fullscreenElement` 為 null 時自動呼叫 `exitPresentation()`（處理瀏覽器原生 Escape 退出）
- [x] 4.4 為進退場撰寫整合測試：驗證進入後 overlay 存在、退出後 overlay 移除、退出後鍵盤事件解除
- [ ] 4.5 git commit: `feat: implement enter/exit fullscreen presentation mode`

## 5. Hugo Layout 覆寫

- [x] 5.1 建立 `site/layouts/lessons/single.html`，繼承 hextra baseof 結構，在 `.content` 標題區域注入 `<button id="btn-enter-presentation">簡報模式</button>`
- [x] 5.2 在 `single.html` 末尾以 `{{ partial "presentation-mode.html" . }}` 引入簡報 partial
- [x] 5.3 在 `presentation-mode.html` 中加入簡報覆蓋層與投影片的 CSS 樣式（`position: fixed`、全螢幕排版、導覽按鈕樣式、進度指示器樣式）
- [ ] 5.4 git commit: `feat: add lessons single layout with presentation mode button`

## 6. 建置驗證與整合測試

- [ ] 6.1 執行 `hugo --source site` 確認靜態網站建置無錯誤
- [ ] 6.2 撰寫端到端測試：以 Playwright 開啟本地建置後的章節頁面，驗證按鈕存在、點擊後 overlay 出現、導覽按鈕可正常切換投影片
- [ ] 6.3 確認測試覆蓋率 ≥ 80%（所有單元測試 + 整合測試合計）
- [ ] 6.4 git commit: `test: add e2e tests for presentation mode`

## 7. 文件更新

- [ ] 7.1 更新 `README.md`，在功能說明區塊加入「簡報模式」說明（一段，含使用方式）
- [ ] 7.2 git commit: `docs: update README with presentation mode feature`
