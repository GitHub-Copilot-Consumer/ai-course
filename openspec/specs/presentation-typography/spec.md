# presentation-typography Specification

## Purpose

Defines font sizes, line heights, and vertical spacing for elements within `.presentation-slide` in the presentation overlay, ensuring readable and well-proportioned slide content.

## Requirements

### Requirement: 投影片標題字型大小
在 `#presentation-overlay` 覆蓋層中，`.presentation-slide` 內的標題元素 SHALL 套用以下字型大小：h1 為 3rem、h2 為 2rem、h3 為 1.5rem。這些規格 SHALL 定義於 `presentation-mode.html` 的 inline `<style>` 中，並覆蓋 Hextra theme 的預設值。

#### Scenario: h1 在投影片中顯示為 3rem
- **WHEN** 簡報模式啟用，當前投影片包含 `<h1>` 元素
- **THEN** 該 `<h1>` 的 computed `font-size` SHALL 為 3rem（48px at 16px base）

#### Scenario: h2 在投影片中顯示為 2rem
- **WHEN** 簡報模式啟用，當前投影片包含 `<h2>` 元素
- **THEN** 該 `<h2>` 的 computed `font-size` SHALL 為 2rem（32px at 16px base）

#### Scenario: h3 在投影片中顯示為 1.5rem
- **WHEN** 簡報模式啟用，當前投影片包含 `<h3>` 元素
- **THEN** 該 `<h3>` 的 computed `font-size` SHALL 為 1.5rem（24px at 16px base）

---

### Requirement: 投影片內文字型大小與行距
`.presentation-slide` 內的 `<p>` 與 `<li>` 元素 SHALL 套用 font-size 為 1.25rem、line-height 為 1.8。

#### Scenario: 段落文字顯示為 1.25rem
- **WHEN** 簡報模式啟用，當前投影片包含 `<p>` 元素
- **THEN** 該 `<p>` 的 computed `font-size` SHALL 為 1.25rem

#### Scenario: 清單項目顯示為 1.25rem
- **WHEN** 簡報模式啟用，當前投影片包含 `<li>` 元素
- **THEN** 該 `<li>` 的 computed `font-size` SHALL 為 1.25rem

---

### Requirement: 投影片標題垂直間距
`.presentation-slide` 內的 h1、h2、h3 SHALL 有明確的上方 margin，使各區段之間有足夠的視覺呼吸空間。具體值：h1 `margin-top: 0`（投影片頂部不需要額外間距）、h2 `margin-top: 2rem`、h3 `margin-top: 1.5rem`。所有標題的 `margin-bottom` SHALL 為 0.75rem。

#### Scenario: h2 與上方內容之間有 2rem 間距
- **WHEN** 簡報模式啟用，當前投影片的 `<h2>` 上方有其他內容
- **THEN** 該 `<h2>` 的 `margin-top` SHALL 為 2rem

#### Scenario: 投影片第一個 h1 無多餘上方間距
- **WHEN** 簡報模式啟用，投影片第一個元素為 `<h1>`
- **THEN** 該 `<h1>` 的 `margin-top` SHALL 為 0

---

### Requirement: 投影片段落垂直間距
`.presentation-slide p` SHALL 有 `margin-bottom: 1rem`，相鄰段落之間 SHALL 有清晰的視覺分隔。

#### Scenario: 連續段落之間有足夠間距
- **WHEN** 簡報模式啟用，投影片包含兩個相鄰的 `<p>` 元素
- **THEN** 兩個段落之間的間距（第一個 `<p>` 的 margin-bottom）SHALL 為 1rem
