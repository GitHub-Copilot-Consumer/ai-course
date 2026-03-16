## ADDED Requirements

### Requirement: 簡報模式進入按鈕顯示
每個 `/lessons/` 下的單一章節頁面（`layouts/lessons/single.html`）SHALL 在頁面標題區域渲染一個「進入簡報模式」按鈕，按鈕 id 為 `btn-enter-presentation`。該按鈕 SHALL 始終可見（非隱藏），且僅出現在 lessons 類型的單頁 layout 中。

#### Scenario: 章節頁面顯示簡報按鈕
- **WHEN** 使用者開啟任意 `/lessons/<chapter>/` 頁面
- **THEN** 頁面標題旁 SHALL 出現 id 為 `btn-enter-presentation` 的按鈕，文字為「簡報模式」

#### Scenario: 非 lessons 頁面不顯示簡報按鈕
- **WHEN** 使用者開啟 `/assignments/` 或 `/resources/` 頁面
- **THEN** 頁面 SHALL NOT 包含 `btn-enter-presentation` 元素

---

### Requirement: 投影片切割機制
JavaScript SHALL 在進入簡報模式時，以常數 `SLIDE_SEPARATOR_TAG = 'HR'` 對應的 `<hr>` 元素為邊界，將 `PRESENTATION_CONTENT_SELECTOR = '.content'` 容器下的直接子節點（DOM childNodes）分組為投影片陣列。每個分組為一個 `<div class="presentation-slide">` 節點。`<hr>` 元素本身 SHALL NOT 被包含進任何投影片分組。

#### Scenario: 含分隔符的頁面切割為多張投影片
- **WHEN** 章節 Markdown 中有 N 個 `---` 分隔符（對應 N 個 `<hr>`）
- **THEN** 簡報模式 SHALL 建立 N+1 張投影片（`div.presentation-slide`）

#### Scenario: 無分隔符的頁面產生單張投影片
- **WHEN** 章節 Markdown 中沒有任何 `---` 分隔符
- **THEN** 簡報模式 SHALL 建立 1 張投影片，包含頁面所有內容

#### Scenario: hr 元素不出現在投影片內容中
- **WHEN** 投影片切割完成後
- **THEN** 任何 `div.presentation-slide` 內 SHALL NOT 包含 `<hr>` 元素

---

### Requirement: 全螢幕簡報覆蓋層
點擊「簡報模式」按鈕後，系統 SHALL 建立 id 為 `presentation-overlay` 的覆蓋層（`position: fixed; inset: 0; z-index: 9999`），並呼叫 `document.documentElement.requestFullscreen()` 進入全螢幕。覆蓋層 SHALL 顯示當前投影片內容。

#### Scenario: 點擊按鈕進入全螢幕
- **WHEN** 使用者點擊 `btn-enter-presentation` 按鈕
- **THEN** `presentation-overlay` SHALL 出現在 DOM 中
- **THEN** `document.fullscreenElement` SHALL 不為 null（已進入全螢幕）
- **THEN** 第一張投影片（index 0）SHALL 顯示在覆蓋層中

---

### Requirement: 投影片導覽控制
簡報覆蓋層 SHALL 提供以下導覽機制：
- id 為 `btn-prev-slide` 的「上一張」按鈕：點擊後顯示前一張投影片（若已是第一張則無動作）
- id 為 `btn-next-slide` 的「下一張」按鈕：點擊後顯示下一張投影片（若已是最後一張則無動作）
- id 為 `slide-progress` 的進度指示器：顯示格式為 `{current} / {total}`（例如 `3 / 10`）
- 鍵盤左方向鍵（`ArrowLeft`）：等同點擊「上一張」
- 鍵盤右方向鍵（`ArrowRight`）：等同點擊「下一張」

#### Scenario: 點擊下一張切換投影片
- **WHEN** 當前為第 N 張投影片（N < total），使用者點擊 `btn-next-slide`
- **THEN** 顯示第 N+1 張投影片
- **THEN** `slide-progress` 文字更新為 `{N+1} / {total}`

#### Scenario: 點擊上一張切換投影片
- **WHEN** 當前為第 N 張投影片（N > 1），使用者點擊 `btn-prev-slide`
- **THEN** 顯示第 N-1 張投影片
- **THEN** `slide-progress` 文字更新為 `{N-1} / {total}`

#### Scenario: 已是最後一張時點擊下一張無動作
- **WHEN** 當前為最後一張投影片，使用者點擊 `btn-next-slide`
- **THEN** 當前投影片 SHALL 保持不變，`slide-progress` 不變

#### Scenario: 已是第一張時點擊上一張無動作
- **WHEN** 當前為第一張投影片，使用者點擊 `btn-prev-slide`
- **THEN** 當前投影片 SHALL 保持不變，`slide-progress` 不變

#### Scenario: 鍵盤右鍵切換到下一張
- **WHEN** 簡報模式啟用中，使用者按下 `ArrowRight`
- **THEN** 行為 SHALL 等同點擊 `btn-next-slide`

#### Scenario: 鍵盤左鍵切換到上一張
- **WHEN** 簡報模式啟用中，使用者按下 `ArrowLeft`
- **THEN** 行為 SHALL 等同點擊 `btn-prev-slide`

---

### Requirement: 退出簡報模式
系統 SHALL 提供以下退出機制：
- 覆蓋層內 id 為 `btn-exit-presentation` 的「退出」按鈕
- 鍵盤 `Escape` 鍵（瀏覽器全螢幕原生 Escape 亦會觸發 `fullscreenchange` 事件）

退出後，`presentation-overlay` SHALL 從 DOM 中移除，頁面回到原始滾動狀態，鍵盤事件監聽器 SHALL 被移除。

#### Scenario: 點擊退出按鈕離開簡報模式
- **WHEN** 簡報模式啟用中，使用者點擊 `btn-exit-presentation`
- **THEN** `presentation-overlay` SHALL 從 DOM 中移除
- **THEN** `document.fullscreenElement` SHALL 為 null（已退出全螢幕）

#### Scenario: 按 Escape 鍵離開簡報模式
- **WHEN** 簡報模式啟用中，使用者按下 `Escape`
- **THEN** `presentation-overlay` SHALL 從 DOM 中移除

#### Scenario: 退出後鍵盤事件不再觸發切換
- **WHEN** 使用者已退出簡報模式，按下 `ArrowRight`
- **THEN** 頁面 SHALL NOT 切換投影片（事件監聽器已移除）
