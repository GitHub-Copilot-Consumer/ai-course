## Why

每個章節的「學習目標」段落目前以普通 Markdown `##` 標題加清單呈現，視覺上與正文其他段落沒有明顯區別，學員容易跳過。將其包入 Hextra callout shortcode 後，顯示為帶色框與圖示的醒目區塊，能立即吸引注意並強調「進入本章前，先確認你預期學到什麼」的學習意圖。

## What Changes

- 在所有課程章節中，將 `## 學習目標` 段落的內容包入 `{{< callout emoji="🎯" >}}` shortcode
- 保留 `## 學習目標` 標題（獨立在 callout 外），以維持 Table of Contents 的錨點
- callout 內容為「本章結束後，你將能夠：」引言加上原有的 bold-verb 條列項
- 影響範圍：`site/content/sdd/` 共 7 個章節（ch0–ch6）；`site/content/agent/` 共 7 個章節（ch1–ch7），合計 14 個檔案

## Capabilities

### New Capabilities

- `learning-objectives-callout`: 定義學習目標區塊的呈現規格——使用 Hextra callout shortcode 包裹，emoji 🎯，保留 `## 學習目標` 標題於 callout 外以維持 ToC，callout 內容包含引言句與 bold-verb 條列

### Modified Capabilities

<!-- 無現有 spec 需異動（這是純呈現層調整，不改變課程內容或 spec-level 行為） -->

## Impact

- **content 檔案**：`site/content/sdd/ch0-warmup.md`、`ch1-vibe-coding.md`、`ch2-mvp-to-spec.md`、`ch3-openspec.md`、`ch4-coding-agent.md`、`ch5-verify-observe.md`、`ch6-team.md`；`site/content/agent/ch1-model-fundamentals.md`～`ch7-mcp-overview.md`（共 14 個）
- **無 API 變動**：純 content 修改，不影響 Hugo layouts、shortcodes 定義或 Go 程式碼
- **相依性**：Hextra `callout` shortcode 已內建於 `_vendor/github.com/imfing/hextra/`，無需新增依賴
- **Presentation Mode**：callout 區塊位於 `---` 分隔符之前，不影響簡報模式的 slide 切割邏輯
