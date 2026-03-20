## Context

課程網站使用 Hugo + Hextra 主題，目前以自定義 render hook 呼叫 Kroki API（外部服務）在建置時將 PlantUML 轉換為 SVG。Hextra v0.12 原生支援 Mermaid（透過內建的 `render-codeblock-mermaid.html`），無需任何自定義程式碼即可渲染圖表。

目前共有 5 個 PlantUML 圖表分散於 3 個課程 Markdown 檔案，以及 2 個自定義 layout 檔案、對應測試與 OpenSpec specs。

## Goals / Non-Goals

**Goals:**
- 將所有 5 個 PlantUML 圖表轉換為等效的 Mermaid 語法
- 移除 Kroki API 依賴（建置時無需外部網路）
- 移除自定義 render hook 與 shortcode
- 以 Mermaid 測試取代 PlantUML 測試（unit + E2E）
- 更新 OpenSpec specs 與 README

**Non-Goals:**
- 改變圖表的語義或視覺意圖（僅技術轉換）
- 移除 `config.yaml` 中的 `unsafe: true`（保留以備未來使用）
- 重新設計課程頁面版面

## Decisions

### 決策 1：課程路線圖使用 `graph LR` + subgraph 呈現分區

**PlantUML** 以 `note top of` 附加在節點上，標示「Greenfield 階段」與「Brownfield 階段」。

**Mermaid** 無原生 note 概念，替代方案：
- A) `graph LR` + `subgraph` 將步驟分組為 Greenfield / Brownfield 兩個視覺群組
- B) 以標注節點（dashed border）模擬 note
- C) 移除 note，改以圖表外的 Markdown 文字說明

**決策：選 A（subgraph）**。Subgraph 語義上更準確地表達兩個學習階段的分界，視覺效果優於 B，且不損失語義（不同於 C）。MVP 轉折點改以邊標籤（edge label）`|"MVP 誕生，轉折點"|` 呈現。

### 決策 2：footer 移至圖表外的 blockquote

PlantUML 的 `footer` 語法在 Mermaid 無對應。將原 footer 文字「附錄：工具安裝（OpenSpec CLI、OpenCode、Ollama）」改為圖表正下方的 Markdown blockquote（`> 附錄：...`）。

### 決策 3：使用 `classDef` 保留每個節點的個別色彩

PlantUML 以 `#hex` 直接標記節點背景色。Mermaid 使用 `classDef` + `:::className` 語法達成相同效果，為每個步驟節點定義獨立的顏色類別。

### 決策 4：activity diagram 轉為 `graph TD`（含回圈）

TDD 流程的 Red→Green→Refactor→（重複）回圈，以 Mermaid `graph TD` 加上顯式反向邊（`C -->|重複| A`）表達。SDD 四步驟為線性流程，直接轉換。

### 決策 5：刪除 PlantUML layout 檔案，不重構為 Mermaid hook

由於 Hextra 已內建 Mermaid render hook，不需要也不應建立自定義 Mermaid render hook。直接刪除 `render-codeblock-plantuml.html` 與 `plantuml.html` shortcode。

### 決策 6：測試策略——以顯式檔案路徑清單取代 pattern 偵測

Unit 測試以固定的檔案路徑清單（constants）驗證：
- 所有 Mermaid 圖表檔案中 ` ```mermaid` block 的存在性
- 所有 PlantUML layout 檔案已不存在
- 所有內容檔案中不再含有 ` ```plantuml` block

E2E 測試驗證 Mermaid 圖表在瀏覽器中可見（SVG 渲染，非原始文字）。

## Risks / Trade-offs

- **[Risk] Mermaid subgraph 樣式受 Hextra 主題 CSS 影響** → 實作後在亮色/暗色模式下目視驗收
- **[Risk] `<capability>` 中的 `<` 符號在 Mermaid label 需 HTML 跳脫** → 使用 `&lt;` 或 `"` 引號包裹節點文字
- **[Risk] 中文字在 Mermaid 節點中的換行** → Mermaid 使用 `<br/>` 替代 PlantUML 的 `\n`，已確認支援

## Migration Plan

1. 先寫失敗測試（Red phase）：斷言 Mermaid blocks 存在、PlantUML blocks 不存在
2. 轉換 Markdown 內容（Green phase）：將 5 個 ```plantuml 改為 ```mermaid
3. 刪除 PlantUML layout 檔案
4. 更新 config.yaml 說明
5. 更新 OpenSpec specs
6. 更新 README
7. 執行 E2E 測試確認瀏覽器渲染正確

**Rollback**: 所有變更在 git history 中，可 `git revert` 回到 PlantUML 版本。

## Open Questions

（無——所有設計決策已在 Explore session 中確認）
