## 1. 測試先行：撰寫 E2E 測試

- [x] 1.1 在 `site/tests/` 新增 `learning-objectives-callout.spec.js`，驗證 SDD ch0 頁面的學習目標區塊渲染為 callout `<div>`（帶有 Hextra callout CSS class），且 `## 學習目標` 標題仍出現在 callout 外
- [x] 1.2 擴充上述測試，涵蓋 Agent ch1 頁面（骨架頁），確認同樣符合 callout 格式
- [x] 1.3 執行 `npm test` 確認新測試預期失敗（紅燈）

## 2. 修改 SDD 章節

- [x] 2.1 修改 `site/content/sdd/ch0-warmup.md`：在「本章結束後，你將能夠：」引言句前插入 `{{< callout emoji="🎯" >}}`，在最後一個條列項後插入 `{{< /callout >}}`
- [x] 2.2 修改 `site/content/sdd/ch1-vibe-coding.md`：同上格式
- [x] 2.3 修改 `site/content/sdd/ch2-mvp-to-spec.md`：同上格式
- [x] 2.4 修改 `site/content/sdd/ch3-openspec.md`：同上格式（注意學習目標位於 line 38，而非 line 10）
- [x] 2.5 修改 `site/content/sdd/ch4-coding-agent.md`：同上格式
- [x] 2.6 修改 `site/content/sdd/ch5-verify-observe.md`：同上格式
- [x] 2.7 修改 `site/content/sdd/ch6-team.md`：同上格式
- [x] 2.8 執行 `hugo server` 目視確認 SDD 各章節學習目標呈現為 callout 框，`---` 分隔符位於 callout 後，ToC 中「學習目標」錨點正常

## 3. 修改 Agent 章節

- [x] 3.1 修改 `site/content/agent/ch1-model-fundamentals.md`：同上格式（骨架條列內容不變）
- [x] 3.2 修改 `site/content/agent/ch2-agent-architecture.md`：同上格式
- [x] 3.3 修改 `site/content/agent/ch3-coding-agent-ecosystem.md`：同上格式
- [x] 3.4 修改 `site/content/agent/ch4-custom-tools.md`：同上格式
- [x] 3.5 修改 `site/content/agent/ch5-custom-skills.md`：同上格式
- [x] 3.6 修改 `site/content/agent/ch6-custom-agents.md`：同上格式
- [x] 3.7 修改 `site/content/agent/ch7-mcp-overview.md`：同上格式

## 4. 驗證與提交

- [x] 4.1 執行 `npm test` 確認所有測試通過（包含 1.1、1.2 新增的測試，綠燈）
- [x] 4.2 確認 Presentation Mode 在 SDD ch0、ch1 正常切換 slide（學習目標 callout 不影響 `<hr>` 切割點）
- [x] 4.3 `git add` + `git commit`（conventional commit：`feat(content): wrap 學習目標 in callout shortcode across all 14 chapters`）
