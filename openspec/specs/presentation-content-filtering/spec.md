# presentation-content-filtering Specification

## Purpose

Defines how content is filtered during presentation mode, including elements that should be excluded from slides (`no-slide`) and elements that should only appear in slides (`slide-only`).

## Requirements

### Requirement: no-slide class 內容在簡報模式中被過濾
JavaScript 常數 `NO_SLIDE_CLASS = 'no-slide'` SHALL 定義於常數區段。`buildSlides()` 在將節點加入投影片分組時，SHALL 跳過 `node.classList?.contains(NO_SLIDE_CLASS)` 為 true 的 Element 節點。被跳過的節點 SHALL NOT 出現在任何 `div.presentation-slide` 的內容中。

#### Scenario: no-slide div 不出現在投影片內容中
- **WHEN** 章節 Markdown 中包含 `<div class="no-slide">...</div>` 包覆的內容
- **THEN** `buildSlides()` 建立的投影片陣列中，任何投影片 SHALL NOT 包含 class 為 `no-slide` 的元素

#### Scenario: no-slide div 前後的內容正常出現在同一張投影片中
- **WHEN** 一個 `---` 分隔的投影片區段內，有 `<div class="no-slide">` 被夾在兩個段落之間
- **THEN** no-slide div 前後的段落 SHALL 出現在同一張投影片中，no-slide div 本身 SHALL NOT 出現

#### Scenario: 不含 no-slide 的節點不受影響
- **WHEN** 章節 Markdown 中沒有 `<div class="no-slide">` 元素
- **THEN** `buildSlides()` 的行為 SHALL 與修改前完全相同

---

### Requirement: no-slide 內容在一般文件檢視時正常顯示
`#presentation-overlay` 外的 `.no-slide` 元素 SHALL NOT 被 CSS 隱藏或以任何方式影響一般文件頁面的顯示。`.no-slide` class 本身在 Overlay 外 SHALL 沒有任何 CSS 宣告。

#### Scenario: 一般文件頁面中 no-slide 內容可見
- **WHEN** 使用者在一般（非簡報）文件檢視模式下開啟章節頁面
- **THEN** class 為 `no-slide` 的 div 內容 SHALL 正常渲染並可見

---

### Requirement: slide-only class 元素在一般文件檢視時隱藏
CSS SHALL 定義 `.content .slide-only { display: none; }` 規則，使 `.content` 容器內 class 為 `slide-only` 的元素在一般文件頁面中不可見。（簡報模式的 JS 行為不在本 capability 範圍內，此 requirement 僅涵蓋 CSS 層面。）

#### Scenario: slide-only 元素在文件頁面中不可見
- **WHEN** 使用者在一般文件檢視模式下開啟章節頁面，頁面含有 `<div class="slide-only">` 元素
- **THEN** 該元素的 computed `display` SHALL 為 `none`
