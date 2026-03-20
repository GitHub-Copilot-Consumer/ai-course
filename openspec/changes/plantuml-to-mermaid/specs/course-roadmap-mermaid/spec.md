## ADDED Requirements

### Requirement: 課程路線圖以 Mermaid graph LR 搭配 subgraph 呈現

`site/content/sdd/ch0-warmup.md` 的「課程路線圖」區段 SHALL 使用 Mermaid `graph LR` fenced code block，以 subgraph 分隔 Greenfield 與 Brownfield 兩個學習階段，取代原有的 PlantUML 圖表。

圖表 SHALL 包含以下結構：
- **subgraph `greenfield`**（Greenfield 階段）：包含步驟 01～03（導言、Ch0、Ch1）
- **subgraph `brownfield`**（Brownfield 階段）：包含步驟 04～08（Ch2、Ch3、Ch4、Ch5、Ch6）
- 8 個步驟節點使用圓角矩形（`()`），以 `<br/>` 換行呈現多行文字
- 每個步驟節點 SHALL 使用 `classDef` 指定個別背景色彩，對應 PlantUML 版本的色票：
  - step1: `#F7B7B7`（粉紅）
  - step2: `#FBD2A6`（橙）
  - step3: `#CFE9B5`（綠）
  - step4: `#C7E5F4`（天藍）
  - step5: `#BFD6F2`（藍）
  - step6: `#B6C7EE`（靛藍）
  - step7: `#AEB9E8`（紫藍）
  - step8: `#A5ACE1`（紫）
- step3 到 step4 的連接邊 SHALL 包含邊標籤 `"MVP 誕生，轉折點"`
- 圖表正下方 SHALL 有一行 Markdown blockquote：`> 附錄：工具安裝（OpenSpec CLI、OpenCode、Ollama）`

#### Scenario: 圖表節點完整

- **WHEN** 讀取 `ch0-warmup.md`
- **THEN** Mermaid block 中 SHALL 包含 8 個步驟文字：導言、Ch0、Ch1、Ch2、Ch3、Ch4、Ch5、Ch6

#### Scenario: Subgraph 分區存在

- **WHEN** 讀取 `ch0-warmup.md`
- **THEN** Mermaid block 中 SHALL 包含 `subgraph` 關鍵字，且存在 "Greenfield 階段" 與 "Brownfield 階段" 兩個 subgraph label

#### Scenario: MVP 轉折點邊標籤存在

- **WHEN** 讀取 `ch0-warmup.md`
- **THEN** Mermaid block 中 SHALL 包含文字 "MVP 誕生，轉折點"

#### Scenario: 個別節點色彩定義存在

- **WHEN** 讀取 `ch0-warmup.md`
- **THEN** Mermaid block 中 SHALL 包含 `classDef` 指令，且包含色值 `#F7B7B7`

#### Scenario: Footer 改為 blockquote

- **WHEN** 讀取 `ch0-warmup.md` 路線圖區段後方
- **THEN** SHALL 存在一行以 `>` 開頭且包含「附錄：工具安裝」的 Markdown blockquote

#### Scenario: 原 PlantUML block 已移除

- **WHEN** 讀取 `ch0-warmup.md`
- **THEN** 不得存在以 ` ```plantuml ` 開頭的 fenced code block
