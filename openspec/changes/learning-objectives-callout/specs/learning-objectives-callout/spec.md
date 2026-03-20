## ADDED Requirements

### Requirement: 學習目標區塊使用 callout shortcode 呈現
每個章節的「學習目標」段落 SHALL 使用 Hextra `callout` shortcode 包裹，並帶有 `emoji="🎯"` 參數，以使其在頁面中視覺上顯著區分於一般正文段落。

#### Scenario: callout shortcode 包裹引言與條列
- **WHEN** Hugo 渲染任一課程章節頁面
- **THEN** 學習目標的引言句「本章結束後，你將能夠：」與 bold-verb 條列項 SHALL 被包裹在 `{{< callout emoji="🎯" >}}...{{< /callout >}}` 內

#### Scenario: 標題保留在 callout 外
- **WHEN** Hugo 渲染任一課程章節頁面
- **THEN** `## 學習目標` 標題 SHALL 出現在 callout shortcode 之前（而非在其內部），使 ToC 可正常生成錨點

#### Scenario: 分隔符保留在 callout 後
- **WHEN** Hugo 渲染任一課程章節頁面
- **THEN** `---` 水平分隔符 SHALL 緊接在 `{{< /callout >}}` 之後，確保 Presentation Mode 的 slide 切割邏輯不受影響

### Requirement: 適用範圍涵蓋所有 14 個章節檔案
callout 格式 SHALL 套用至以下明確列舉的檔案清單，不多不少：

- `site/content/sdd/ch0-warmup.md`
- `site/content/sdd/ch1-vibe-coding.md`
- `site/content/sdd/ch2-mvp-to-spec.md`
- `site/content/sdd/ch3-openspec.md`
- `site/content/sdd/ch4-coding-agent.md`
- `site/content/sdd/ch5-verify-observe.md`
- `site/content/sdd/ch6-team.md`
- `site/content/agent/ch1-model-fundamentals.md`
- `site/content/agent/ch2-agent-architecture.md`
- `site/content/agent/ch3-coding-agent-ecosystem.md`
- `site/content/agent/ch4-custom-tools.md`
- `site/content/agent/ch5-custom-skills.md`
- `site/content/agent/ch6-custom-agents.md`
- `site/content/agent/ch7-mcp-overview.md`

#### Scenario: SDD 章節正確套用
- **WHEN** 打開 `site/content/sdd/` 下任一章節（ch0–ch6）
- **THEN** 其 `## 學習目標` 區塊 SHALL 符合上述 callout 格式規範

#### Scenario: Agent 章節正確套用
- **WHEN** 打開 `site/content/agent/` 下任一章節（ch1–ch7）
- **THEN** 其 `## 學習目標` 區塊 SHALL 符合上述 callout 格式規範（骨架條列內容不變）
