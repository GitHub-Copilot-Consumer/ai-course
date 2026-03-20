## ADDED Requirements

### Requirement: Agent 課程骨架章節清單
`site/content/agent/` section SHALL 包含以下明確清單中的骨架章節檔案，每個檔案 MUST 包含完整的 front matter（`title`、`weight`、`description`、`showToc: true`）與至少一個「學習目標」placeholder 段落：

| 檔案 | Title | Weight |
|------|-------|--------|
| `ch1-model-fundamentals.md` | 1. LLM 原理與模型選型 | 1 |
| `ch2-agent-architecture.md` | 2. Agent 架構：ReAct、Memory 與 Context | 2 |
| `ch3-coding-agent-ecosystem.md` | 3. Coding Agent 生態系與 OpenCode 架構 | 3 |
| `ch4-custom-tools.md` | 4. Tools 概念與 OpenCode Plugin 簡介 | 4 |
| `ch5-custom-skills.md` | 5. Skills 系統：Agent Skills 標準與實作 | 5 |
| `ch6-custom-agents.md` | 6. Custom Agent 與 Commands 設計 | 6 |
| `ch7-mcp-overview.md` | 7. MCP 概念與 Agent 整合 | 7 |

#### Scenario: agent section 包含所有 7 個章節骨架
- **WHEN** 列出 `site/content/agent/` 目錄下的 `.md` 檔案
- **THEN** MUST 包含以下明確清單中的所有 7 個檔案：
  `ch1-model-fundamentals.md`、`ch2-agent-architecture.md`、`ch3-coding-agent-ecosystem.md`、`ch4-custom-tools.md`、`ch5-custom-skills.md`、`ch6-custom-agents.md`、`ch7-mcp-overview.md`

#### Scenario: 每個章節骨架的 front matter 完整
- **WHEN** 讀取 `site/content/agent/` 下的任意章節 `.md` 檔案
- **THEN** front matter MUST 包含 `title`、`weight`（正整數）、`description`、`showToc: true` 欄位

#### Scenario: ch1 weight 正確設定
- **WHEN** 讀取 `site/content/agent/ch1-model-fundamentals.md` 的 front matter
- **THEN** `weight` MUST 為 `1`
