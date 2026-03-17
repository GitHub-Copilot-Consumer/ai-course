## Context

簡報模式（`chapter-presentation-mode`）已實作完成，能將 Markdown 文件以全螢幕投影片形式呈現。然而現有實作有兩個可讀性問題：

1. **字型與間距**：h1 為 2rem、h2 為 1.5rem，在全螢幕環境下偏小。行距雖有 1.75，但各元素之間的垂直 margin 依賴 Hextra theme 預設值，在簡報情境下偏緊。
2. **內容密度**：Markdown 章節包含詳細的操作步驟、Lab 說明等，適合文件閱讀但過於密集，不適合投影片。現有機制（`---` 分隔）無法在不影響文件閱讀的情況下精準控制哪些內容應出現在投影片中。

架構現況：所有簡報邏輯集中在 `site/layouts/partials/presentation-mode.html`（inline CSS + JS），並有一份同步的可測試模組 `site/tests/presentation-mode/presentation-mode.js`。

## Goals / Non-Goals

**Goals:**
- 提升投影片標題與內文的字型大小與元素間距
- 允許 Markdown 作者用 `<div class="no-slide">` 標記文件專用內容（簡報時隱藏）
- 允許 Markdown 作者用 `<!-- split -->` 提示將過長投影片拆分為多頁
- 維持既有的所有測試通過，新功能有對應的 Jest 測試

**Non-Goals:**
- 不引入外部簡報框架（Reveal.js、Slidev 等）
- 不新增 Hugo shortcode（避免增加 Hugo 模板依賴）
- 不實作自動溢出偵測（作者手動控制分頁，不依賴 JS 量測 viewport 高度）
- 不處理 `slide-only`（簡報模式專用內容）的 JS 行為，僅提供 CSS

## Decisions

### 決策 1：以 DOM Comment Node 偵測 `<!-- split -->`

**選擇**：在 `buildSlides()` 中，以 `node.nodeType === Node.COMMENT_NODE && node.nodeValue.trim() === 'split'` 偵測 split 提示。

**原因**：Hugo 的 Goldmark renderer 預設會保留 HTML comment 節點（`<!-- ... -->`）在 DOM 輸出中。Comment node 不影響一般文件閱讀，也不需要額外 CSS。相較於使用 `<span class="split-hint" hidden>` 等元素，comment node 最乾淨。

**替代方案**：使用自訂 `<span class="slide-split">` — 拒絕，因為會污染文件 DOM。

**常數定義**：新增 `SLIDE_SPLIT_COMMENT = 'split'`，集中於常數區段。

---

### 決策 2：以 CSS `display:none` 實作 `.no-slide` 過濾，JS 跳過具此 class 的節點

**選擇**：`buildSlides()` 在將節點加入投影片分組時，跳過 `node.classList?.contains('no-slide')` 為 true 的節點（Element nodes）。一般文件檢視時，`.no-slide` 元素正常顯示（無 CSS 隱藏），僅在投影片建構階段被排除。

**原因**：Markdown 原生支援 inline HTML，`<div class="no-slide">` 可直接在 `.md` 檔中使用，無需 Hugo shortcode。作者在文件閱讀時仍可看到這些內容，只有進入簡報時才被過濾。

**替代方案**：Hugo shortcode `{{< no-slide >}}` — 拒絕，需新增 `layouts/shortcodes/no-slide.html`，增加 Hugo 模板耦合。

**常數定義**：新增 `NO_SLIDE_CLASS = 'no-slide'`，集中於常數區段。

---

### 決策 3：字型大小採絕對值 rem 調整，不使用 CSS clamp / viewport units

**選擇**：直接調大現有 CSS 屬性值：h1 → 3rem、h2 → 2rem、h3 → 1.5rem、body/li → 1.25rem。段落與標題間距以明確的 `margin-top` 值設定（而非依賴 Hextra 繼承）。

**原因**：全螢幕簡報的目標解析度固定（投影機 1080p/4K），clamp 帶來不必要的複雜性。明確數值易讀、易覆蓋、易測試。

---

### 決策 4：`<!-- split -->` 在投影片建構時，於同一個 `<hr>` 分組內再次切割

**選擇**：`buildSlides()` 先以 `<hr>` 分割為粗群組，再對每個粗群組內部以 comment node（`SLIDE_SPLIT_COMMENT`）再次切割，最終 flatten 為單一投影片陣列。

**原因**：與現有的 `<hr>` 邏輯完全分層，不干擾現有行為。`<!-- split -->` 節點本身不進入任何投影片分組（類似 `<hr>` 的處理方式）。

## Risks / Trade-offs

- **Goldmark comment 保留行為**：若 Hugo config 啟用了 `markup.goldmark.renderer.unsafe: false`（預設值），HTML comment 理論上仍會保留，但需在實作後確認。→ 緩解：task 中加入 Hugo 本地建置驗證步驟。
- **`.no-slide` 與 block-level DOM 結構**：Markdown 中的 `<div class="no-slide">` 必須用空行與 Markdown 內容隔開，否則 Goldmark 可能不將其識別為 block HTML。→ 緩解：在 spec 與文件範例中明確說明此限制。
- **split 後的孤立群組**：若 `<!-- split -->` 放在群組最前或最後，可能產生空投影片。→ 緩解：`buildSlides()` 過濾空群組（長度為 0 的分組不加入結果）。

## Migration Plan

1. 修改 `presentation-mode.html` CSS（字型、間距）— 無 breaking change，純視覺
2. 修改 `presentation-mode.html` JS，新增常數與過濾邏輯
3. 同步更新 `tests/presentation-mode/presentation-mode.js`
4. 為新功能補充 Jest 測試
5. 選擇性在一個章節（如 `ch0-warmup.md`）加入 `<!-- split -->` 範例，驗證作者工作流
6. 無需資料庫 migration 或部署步驟異動（純靜態 Hugo site）

## Open Questions

- 無。所有設計決策已在 Explore 討論中確定。
