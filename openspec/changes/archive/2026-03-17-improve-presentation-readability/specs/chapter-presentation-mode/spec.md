## MODIFIED Requirements

### Requirement: 投影片切割機制
JavaScript SHALL 在進入簡報模式時，以常數 `SLIDE_SEPARATOR_TAG = 'HR'` 對應的 `<hr>` 元素為邊界，將 `PRESENTATION_CONTENT_SELECTOR = '.content'` 容器下的直接子節點（DOM childNodes）分組為投影片陣列。

每個 `<hr>` 邊界產生的粗群組，SHALL 再以常數 `SLIDE_SPLIT_COMMENT = 'split'` 對應的 HTML comment 節點（`nodeType === Node.COMMENT_NODE && nodeValue.trim() === SLIDE_SPLIT_COMMENT`）為邊界進一步切割為子群組。

在加入投影片分組時，SHALL 跳過 `classList?.contains(NO_SLIDE_CLASS)` 為 true 的 Element 節點（其中 `NO_SLIDE_CLASS = 'no-slide'`）。

空節點群組（長度為 0 或僅含空白文字節點）SHALL 被過濾，不加入最終投影片陣列。

`<hr>` 元素、`<!-- split -->` comment 節點、class 為 `no-slide` 的元素本身 SHALL NOT 被包含進任何投影片分組。每個分組為一個 `<div class="presentation-slide">` 節點。

#### Scenario: 含分隔符的頁面切割為多張投影片
- **WHEN** 章節 Markdown 中有 N 個 `---` 分隔符（對應 N 個 `<hr>`）
- **THEN** 簡報模式 SHALL 建立至少 N+1 張投影片（`div.presentation-slide`）

#### Scenario: 無分隔符的頁面產生單張投影片
- **WHEN** 章節 Markdown 中沒有任何 `---` 分隔符，也沒有 `<!-- split -->`
- **THEN** 簡報模式 SHALL 建立 1 張投影片，包含所有非 no-slide 內容

#### Scenario: hr 元素不出現在投影片內容中
- **WHEN** 投影片切割完成後
- **THEN** 任何 `div.presentation-slide` 內 SHALL NOT 包含 `<hr>` 元素

#### Scenario: no-slide 元素不出現在投影片內容中
- **WHEN** 投影片切割完成後
- **THEN** 任何 `div.presentation-slide` 內 SHALL NOT 包含 class 為 `no-slide` 的元素

#### Scenario: split comment 不出現在投影片內容中
- **WHEN** 投影片切割完成後
- **THEN** 任何 `div.presentation-slide` 內 SHALL NOT 包含 nodeValue 為 `split` 的 comment 節點
