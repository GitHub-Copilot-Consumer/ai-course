# presentation-slide-splitting Specification

## Purpose

Defines the `<!-- split -->` comment mechanism that allows a single `<hr>`-delimited slide section to be further subdivided into multiple slides, providing finer-grained control over slide boundaries.

## Requirements

### Requirement: split comment 將單張投影片拆分為多頁
JavaScript 常數 `SLIDE_SPLIT_COMMENT = 'split'` SHALL 定義於常數區段。`buildSlides()` 在以 `<hr>` 切割出粗群組後，SHALL 對每個粗群組內部再次掃描，遇到 `node.nodeType === Node.COMMENT_NODE && node.nodeValue.trim() === SLIDE_SPLIT_COMMENT` 的節點時，SHALL 在該節點處切割，將粗群組拆分為多個子群組。`<!-- split -->` comment 節點本身 SHALL NOT 被包含進任何投影片分組。最終所有子群組 flatten 為投影片陣列的一部分。

#### Scenario: 含一個 split 的投影片被拆分為兩頁
- **WHEN** 一個 `---` 分隔的投影片區段內包含一個 `<!-- split -->`
- **THEN** `buildSlides()` SHALL 將該區段拆分為 2 張投影片
- **THEN** `<!-- split -->` 節點本身 SHALL NOT 出現在任何投影片的內容中

#### Scenario: 含兩個 split 的投影片被拆分為三頁
- **WHEN** 一個 `---` 分隔的投影片區段內包含兩個 `<!-- split -->`
- **THEN** `buildSlides()` SHALL 將該區段拆分為 3 張投影片

#### Scenario: 不含 split 的投影片不受影響
- **WHEN** 一個 `---` 分隔的投影片區段內沒有 `<!-- split -->`
- **THEN** 該區段 SHALL 產生 1 張投影片，行為與修改前完全相同

#### Scenario: split 與 hr 組合計算正確的總投影片數
- **WHEN** 章節有 2 個 `---` 分隔符（原本 3 張投影片），其中第 2 個區段內有 1 個 `<!-- split -->`
- **THEN** 總投影片數 SHALL 為 4（2 個 hr 產生 3 個粗群組，其中 1 個再被 split 一次）

---

### Requirement: split 產生的空群組被過濾
若 `<!-- split -->` 節點放置在群組最前方或最後方，產生的空節點群組（長度為 0 或僅含空白文字節點）SHALL 被 `buildSlides()` 過濾，不加入最終投影片陣列。

#### Scenario: split 在群組開頭不產生空投影片
- **WHEN** 一個 `---` 分隔的投影片區段以 `<!-- split -->` 開頭
- **THEN** `buildSlides()` SHALL NOT 產生空的投影片群組

#### Scenario: split 在群組結尾不產生空投影片
- **WHEN** 一個 `---` 分隔的投影片區段以 `<!-- split -->` 結尾
- **THEN** `buildSlides()` SHALL NOT 產生空的投影片群組
