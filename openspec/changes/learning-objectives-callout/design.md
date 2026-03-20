## Context

網站使用 Hugo + Hextra v0.12.1 主題（vendored at `site/_vendor/github.com/imfing/hextra/`）。Hextra 內建 `callout` shortcode，支援 `type`（default/info/warning/error/important）、`emoji`、`icon` 三個參數。

目前所有章節（14 個檔案）的學習目標以此固定結構呈現：

```markdown
## 學習目標

本章結束後，你將能夠：

- **動詞** 能力描述
- ...

---
```

目標是在不異動課程內容、不影響 ToC、不破壞 Presentation Mode 的前提下，讓此區塊視覺上更醒目。

## Goals / Non-Goals

**Goals:**
- 將所有 14 個章節的「學習目標」內容包入 `{{< callout emoji="🎯" >}}` shortcode
- 保留 `## 學習目標` 標題在 callout 外（維持 ToC 錨點）
- 保留 `---` 分隔符在 callout 後（維持 Presentation Mode slide 切割）
- callout 內容：引言句 + 原有 bold-verb 條列項，格式不變

**Non-Goals:**
- 不修改 callout shortcode 定義本身
- 不調整其他章節內容或結構
- 不為不同章節選用不同的 callout type（統一使用 emoji 🎯，不指定 type）
- 不修改 Agent 章節的骨架條列內容（skeleton 內容本身不變）

## Decisions

### D1：保留 `## 學習目標` 標題在 callout 外

**決策**：`## 學習目標` 標題保持獨立，callout 只包裹引言句與條列。

**理由**：Hugo 的 ToC（`showToc: true`）透過 Markdown 標題生成錨點。若把標題移入 callout shortcode 內，Hugo 不會將其納入 ToC，導致頁面右側目錄遺失「學習目標」項目。

**替代方案考慮**：在 callout 內用 `**學習目標**` 粗體代替標題 → 捨棄，因為會失去 ToC 錨點且不符合現有頁面結構慣例。

### D2：使用 `emoji="🎯"` 而非 `type`

**決策**：`{{< callout emoji="🎯" >}}`，不指定 `type`。

**理由**：Hextra 的 `type` 預設對應語義（info = 資訊、warning = 警告等），學習目標屬於「目標/導引」語義，沒有完全對應的 type。使用 emoji 可傳達「目標」意涵，同時維持中性的視覺色彩（不誤導為警告或錯誤）。

**替代方案考慮**：`type="info"` → 藍色 info 框語義上可接受但缺少辨識度；`type="important"` → 紫色，過於強調；自訂 icon → 需確認 Hextra icon 名稱，較複雜。

### D3：以明確的檔案清單驅動，不使用 glob 批次替換

**決策**：tasks.md 列出所有 14 個檔案的明確路徑，逐一處理。

**理由**：章節結構（SDD ch0–ch6 vs Agent ch1–ch7）與學習目標的位置（行號）因檔案而略有差異（例如 ch3-openspec.md 的學習目標在 line 38，其餘多在 line 10）。明確清單可確保每個檔案都被正確處理，避免 pattern matching 遺漏或誤傷。

## Risks / Trade-offs

- **Presentation Mode 相容性** → callout shortcode 最終渲染為 `<div>` 區塊，位於 `---` 分隔符之前，Presentation Mode 的 slide 切割邏輯基於 `<hr>` 標籤，不受影響。低風險。
- **Hugo 渲染** → `config.yaml` 已設定 `goldmark.renderer.unsafe: true`，支援 shortcode 內嵌 HTML，callout 可正常渲染。低風險。
- **未來內容更新** → 新增章節時需手動套用 callout 格式。可透過更新 `archetypes/default.md` 範本解決（超出本次 scope，但可作為 follow-up）。

## Migration Plan

1. 修改 `site/content/sdd/` 的 7 個檔案（ch0–ch6）
2. 修改 `site/content/agent/` 的 7 個檔案（ch1–ch7）
3. 在本機執行 `hugo server` 確認各章節渲染正確
4. 執行現有 E2E 測試（`npm test` in `site/`）確認無回歸
5. commit + push（trunk-based，直接合入 main）

**Rollback**：git revert 單一 commit 即可還原，無資料遷移風險。
