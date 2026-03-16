## Context

本課程網站使用 Hugo 靜態網站生成器，搭配 `hextra` 主題（v0.12.1，透過 Hugo Modules 引入）。章節內容存放於 `site/content/lessons/` 下，每個章節為一個 Markdown 檔案，以 `---` 水平分隔線區隔各段落主題。

目前章節頁面以單一長滾動頁面呈現，適合學生自習閱讀，但不適合講師課堂投影。本設計在不改動任何 Markdown 內容的前提下，透過 Hugo layout 覆寫與前端 JavaScript，為每個章節頁面加入可選用的全螢幕簡報模式。

## Goals / Non-Goals

**Goals:**
- 在 `site/layouts/lessons/` 覆寫 hextra 的 single 頁面 partial，注入簡報按鈕
- 使用瀏覽器原生 Fullscreen API 進入全螢幕
- 以 `<hr>` 元素（由 Markdown `---` 生成）為分隔點，將 `.content` 區塊切割為多個投影片
- 支援鍵盤左右方向鍵與 `Escape` 退出
- 顯示上一張 / 下一張按鈕與投影片進度指示（例如 `3 / 10`）
- 純 vanilla JS + CSS，無額外 npm 依賴
- 對 Hugo build 與 GitHub Pages 部署流程零影響

**Non-Goals:**
- 不支援觸控手勢（swipe）
- 不修改章節 Markdown 內容
- 不為 `lessons` 以外的頁面類型（assignments、resources）套用此功能
- 不支援投影片動畫過場效果
- 不儲存使用者上次的投影片位置

## Decisions

### 決策一：使用 Hugo layouts 覆寫而非修改主題 submodule

**選擇：** 在 `site/layouts/lessons/single.html` 建立 layout 覆寫檔，繼承 hextra 原始 baseof 結構，並注入簡報相關 HTML/JS/CSS。

**理由：** hextra 透過 Hugo Modules 引入，不應直接修改 module 源碼（升級時會被覆蓋）。Hugo 的 layout 覆寫機制允許我們在 `site/layouts/` 建立同路徑檔案以覆蓋主題預設行為，這是 Hugo 的標準擴充方式。

**替代方案考量：** 修改 `themes/hextra/` — 被排除，因為主題是 go module，無本地副本。

---

### 決策二：以 `<hr>` 為投影片分隔點（明確查找，非 pattern matching）

**選擇：** JavaScript 初始化時，讀取 `#content` 內的 `.content` 容器，以所有 `<hr>` 元素為分隔點，將 DOM 節點分組為投影片陣列。

**具體機制：**
1. 取得 `.content` 下所有直接子節點列表
2. 遍歷子節點，遇到 `HR` 標籤時建立新的投影片群組
3. 每個投影片群組對應一個 `<div class="presentation-slide">` 容器
4. 將所有 `.presentation-slide` 放入 `#presentation-container`

**理由：** Markdown 中的 `---` 已是語意分隔（用於章節間分界），以 `<hr>` 為邊界是明確、可預測的切割機制，不依賴正則表達式或標題層級猜測。

---

### 決策三：簡報覆蓋層使用 `position: fixed` + Fullscreen API

**選擇：** 進入簡報模式時，建立一個 `#presentation-overlay` div（`position: fixed; inset: 0`），並呼叫 `document.documentElement.requestFullscreen()`。

**理由：** Fullscreen API 在現代瀏覽器（Chrome、Firefox、Safari）均有良好支援。`position: fixed` 確保覆蓋層在全螢幕前後皆能正確遮蓋頁面。使用 `document.documentElement` 作為全螢幕目標，避免特定元素全螢幕的跨瀏覽器差異。

---

### 決策四：JS 與 CSS 以 Hugo partial 形式注入

**選擇：** 在 `site/layouts/partials/presentation-mode.html` 建立 partial，包含內聯 `<style>` 與 `<script>`，在 lessons single layout 中以 `{{ partial "presentation-mode.html" . }}` 引入。

**理由：** 保持 layout 覆寫檔簡潔，簡報相關邏輯集中在單一 partial 檔，易於維護。不需要額外的資產打包流程（無 Hugo Pipes / npm build step），符合「零影響 Hugo build」的目標。

---

### 決策五：投影片編號常數化管理

**選擇：** JS 中以 `SLIDE_SEPARATOR_TAG = 'HR'` 常數明確指定分隔標籤名稱；以 `PRESENTATION_CONTENT_SELECTOR = '.content'` 常數指定內容容器選擇器。

**理由：** 遵循 design rules：使用明確常數而非硬編碼字串散落各處，提高可維護性。

## Risks / Trade-offs

- **[風險] hextra 未來版本可能改變 `.content` class 或 DOM 結構** → 緩解：在 partial 中以 `PRESENTATION_CONTENT_SELECTOR` 常數集中管理，更新時只需改一處。
- **[風險] 若某章節無任何 `---` 分隔符，整個頁面會成為單張投影片** → 可接受：功能仍正常，只是投影片只有一張；不需特殊處理。
- **[取捨] 內聯 CSS/JS 無法被瀏覽器快取** → 接受：此功能的 CSS/JS 體積極小（< 5KB），對頁面效能影響可忽略，換取部署簡單性。
