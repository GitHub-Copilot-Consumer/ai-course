## Why

`ch-intro-ai.md` 目前是一篇連續的長文，沒有任何 `---` 分隔符，導致進入簡報模式時整篇文章只產生一張投影片，無法有效作為授課簡報使用。透過依照內容邏輯加入 `---` 分隔符，將文章切分為 12 頁投影片，讓講師可以在課堂中逐頁呈現概念。

## What Changes

- 在 `site/content/lessons/ch-intro-ai.md` 的適當位置加入 `---` 分隔符，將文章切分為 12 頁投影片
- 不修改任何文字內容或 front matter，僅調整分隔符位置
- 切分後簡報模式應產生 12 張 `div.presentation-slide`

## Capabilities

### New Capabilities

（無，此為既有內容的結構調整，不引入新 capability）

### Modified Capabilities

- `intro-ai-chapter`：在原有頁面內容中加入 `---` 分隔符，使其符合簡報切分需求（不變更任何文字需求，僅新增投影片切分結構需求）

## Impact

- 僅影響 `site/content/lessons/ch-intro-ai.md` 一個檔案
- 不影響 `chapter-presentation-mode` 的 JS 邏輯，不影響 Hugo 建置設定
- 依賴 `chapter-presentation-mode` spec 定義的 `---` → `<hr>` 切割機制
