## Why

現有 `everything-claude-code-resource` spec 只涵蓋頁面的基本存在性與初始五個核心元件，但頁面已大幅擴充，新增了 Agents 的 OpenCode 機制說明、Skills 的按需載入機制與路徑相容性說明、Context Engineering 六大原則、AgentShield 安全掃描工具，以及 MiniClaw 設計哲學等章節。需要補充 spec 以反映頁面的實際內容，確保未來修改有明確的驗收標準。

## What Changes

- 更新 `everything-claude-code-resource` spec，新增對五個章節的 Requirement 與 Scenario
- 新增 Agents 章節的需求：涵蓋 OpenCode 原生 Agent 機制（主代理/子代理、Markdown 定義、JSON 設定、相容 Claude 路徑）
- 新增 Skills 章節的需求：涵蓋 OpenCode 的按需載入機制、六種搜尋路徑（含 Claude 相容路徑）、SKILL.md frontmatter 規範、權限控制
- 新增 Context Engineering 章節的需求：涵蓋六大原則（Token 最佳化、壓縮策略、記憶持久化、漸進式精煉、模式切換、模型路由）
- 新增 AgentShield 章節的需求：涵蓋三種使用模式與掃描類別說明
- 新增 MiniClaw 章節的需求：涵蓋設計哲學說明與最小權限原則對比表

## Capabilities

### New Capabilities

無（本次為更新現有頁面的 spec，不新增獨立 capability）

### Modified Capabilities

- `everything-claude-code-resource`：擴充頁面需求，新增 Agents OpenCode 機制、Skills 按需載入與相容路徑、Context Engineering、AgentShield、MiniClaw 五個章節的 Requirements 與 Scenarios

## Impact

- 修改 `openspec/specs/everything-claude-code-resource/spec.md`（補充新 Requirements）
- 不影響任何程式碼或 Hugo 建置邏輯
- 不涉及 API、依賴或其他系統
