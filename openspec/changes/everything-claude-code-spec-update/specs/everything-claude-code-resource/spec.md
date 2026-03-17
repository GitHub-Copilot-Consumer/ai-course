## ADDED Requirements

### Requirement: 頁面包含 Agents 章節（OpenCode 原生機制）
`everything-claude-code.md` SHALL 包含第一章「Agents」，說明 OpenCode 原生的 Agent 機制，包含主代理與子代理的區別、Markdown 定義方式、JSON 設定方式、工具權限控制，以及 OpenCode 自動相容 Claude Code `~/.claude/agents/` 路徑的機制。

#### Scenario: 主代理與子代理說明存在
- **WHEN** 讀取頁面的「Agents」章節
- **THEN** 頁面中包含「主代理（Primary Agent）」與「子代理（Subagent）」的說明，並列出 `build`、`plan`（主代理）及 `general`、`explore`（子代理）四個 OpenCode 內建 Agent 名稱

#### Scenario: Markdown 定義 Agent 的四個搜尋路徑均列出
- **WHEN** 讀取頁面中「用 Markdown 定義自訂 Agent」的說明
- **THEN** 頁面明確列出以下四個路徑：`~/.config/opencode/agents/<name>.md`、`.opencode/agents/<name>.md`、`~/.claude/agents/<name>.md`、`.claude/agents/<name>.md`

#### Scenario: Claude Code 相容路徑說明存在
- **WHEN** 讀取頁面中關於 Agent 部署路徑的說明
- **THEN** 頁面明確說明 OpenCode 會自動讀取 `~/.claude/agents/` 目錄，ECC 安裝到 Claude Code 的 Agents 可直接在 OpenCode 使用

#### Scenario: JSON 設定 Agent 範例存在
- **WHEN** 讀取頁面中「用 JSON 設定 Agent 行為」的說明
- **THEN** 頁面包含 `opencode.json` 的 JSON 設定範例，示範如何透過 `agent` 鍵設定 Agent 的 `model`、`mode`、`tools` 屬性

#### Scenario: 工具權限控制說明存在
- **WHEN** 讀取頁面中「Agent 的工具權限控制」的說明
- **THEN** 頁面包含 `permission` 設定的 JSON 範例，說明如何針對特定指令設定 `allow`/`ask` 權限等級

### Requirement: 頁面包含 Skills 章節（按需載入與六種搜尋路徑）
`everything-claude-code.md` SHALL 包含第二章「Skills」，說明 OpenCode 的按需載入機制（非全量注入）、六種搜尋路徑（含 Claude 相容路徑）、SKILL.md frontmatter 規範，以及 Skill 的存取權限設定。

#### Scenario: 按需載入機制說明存在
- **WHEN** 讀取頁面中「OpenCode 中的 Skills 機制」說明
- **THEN** 頁面明確說明 OpenCode 透過內建 `skill` 工具按需載入 Skills，而非在對話開始時全部注入 context

#### Scenario: 六種搜尋路徑以優先順序表格列出
- **WHEN** 讀取頁面中「搜尋路徑」的說明
- **THEN** 頁面以表格形式列出以下六個路徑，按優先順序排列：`.opencode/skills/`、`~/.config/opencode/skills/`、`.claude/skills/`、`~/.claude/skills/`、`.agents/skills/`、`~/.agents/skills/`

#### Scenario: Claude 相容路徑說明存在
- **WHEN** 讀取頁面中關於 Skills 搜尋路徑的說明
- **THEN** 頁面明確說明 OpenCode 會讀取 `~/.claude/skills/` 下的 ECC Skills，ECC 安裝到 Claude Code 後 OpenCode 可直接使用全部 102 個 Skills 而無需重複安裝

#### Scenario: SKILL.md frontmatter 必填欄位說明存在
- **WHEN** 讀取頁面中「SKILL.md 的格式規範」說明
- **THEN** 頁面包含 YAML frontmatter 範例，說明 `name` 必須與目錄名稱一致，且僅允許小寫字母、數字與單一連字號的命名規則

#### Scenario: Skill 存取權限設定說明存在
- **WHEN** 讀取頁面中「設定 Skill 的存取權限」說明
- **THEN** 頁面包含 `opencode.json` 的 `permission.skill` 設定範例，示範 `*`（允許全部）、`internal-*`（拒絕）、`experimental-*`（詢問）三種權限設定

### Requirement: 頁面包含 Context Engineering 章節（六大原則）
`everything-claude-code.md` SHALL 包含第三章「Context Engineering」，依序說明以下六大原則：Token 最佳化、Context 壓縮策略、記憶持久化、漸進式 Context 精煉、Context 模式切換、模型路由，並各附具體機制說明或設定範例。

#### Scenario: Token 最佳化原則說明存在
- **WHEN** 讀取頁面中「原則一：Token 最佳化」說明
- **THEN** 頁面說明 MCP Server 管理策略（設定檔可有 20-30 個 MCP，但每 session 僅啟用 5-10 個），並包含停用非必要 MCP 的 JSON 設定範例

#### Scenario: Context 壓縮策略說明存在（含兩種機制）
- **WHEN** 讀取頁面中「原則二：Context 壓縮策略」說明
- **THEN** 頁面說明「手動壓縮（strategic-compact Skill）」與「自動壓縮 Hook（PreCompact Hook）」兩種機制，並包含 PreCompact Hook 的 JSON 設定範例

#### Scenario: 記憶持久化說明存在（含 SessionStart 與 Stop Hook）
- **WHEN** 讀取頁面中「原則三：記憶持久化」說明
- **THEN** 頁面說明透過 SessionStart Hook 讀取 MEMORY.md 注入 context，以及 Stop Hook 抽取 session 資訊寫入 MEMORY.md 的機制，並包含對應的 JavaScript 程式碼範例

#### Scenario: 漸進式 Context 精煉三階段說明存在
- **WHEN** 讀取頁面中「原則四：漸進式 Context 精煉」說明
- **THEN** 頁面說明三個階段：高層次搜尋（Glob + 目錄結構）→ 關鍵檔案精讀（Read 指定段落）→ 按需深入，對應 `iterative-retrieval` Skill

#### Scenario: 三種 Context 模式說明存在
- **WHEN** 讀取頁面中「原則五：Context 模式切換」說明
- **THEN** 頁面以表格列出 `dev.md`、`review.md`、`research.md` 三種模式及其使用時機

#### Scenario: 模型路由表格存在
- **WHEN** 讀取頁面中「原則六：模型路由」說明
- **THEN** 頁面以表格說明 Claude Haiku（快速格式化）、Claude Sonnet（一般開發）、Claude Opus（複雜架構）三種模型的適用場景

### Requirement: 頁面包含 AgentShield 章節（三種使用模式）
`everything-claude-code.md` SHALL 包含第四章「AgentShield」，說明其核心數據（1,282 個測試、98% 覆蓋率、102 條規則）、五個掃描類別，以及標準掃描、自動修復、Opus 三代理人深度分析三種使用模式的指令。

#### Scenario: AgentShield 核心數據存在
- **WHEN** 讀取頁面的「AgentShield」章節
- **THEN** 頁面包含以下數據：1,282 個測試案例、98% 程式碼覆蓋率、102 條靜態分析規則

#### Scenario: 五個掃描類別均列出
- **WHEN** 讀取頁面中 AgentShield 掃描範圍說明
- **THEN** 頁面以表格列出以下五個類別：Secrets Detection、Permission Auditing、Hook Injection Analysis、MCP Server Risk Profiling、Agent Config Review

#### Scenario: 三種使用模式的指令均存在
- **WHEN** 讀取頁面中「三種使用模式」說明
- **THEN** 頁面包含以下三個指令：`npx ecc-agentshield scan`（標準模式）、`npx ecc-agentshield scan --fix`（自動修復）、`npx ecc-agentshield scan --opus --stream`（Opus 深度模式）

#### Scenario: Opus 三代理人管線角色說明存在
- **WHEN** 讀取頁面中 Opus 深度分析模式的說明
- **THEN** 頁面說明三個代理人的角色：紅隊（攻擊者）尋找漏洞鏈、藍隊（防守者）評估防護措施、稽核師產出風險報告

### Requirement: 頁面包含 MiniClaw 章節（設計哲學）
`everything-claude-code.md` SHALL 包含第五章「MiniClaw 哲學」，明確說明 MiniClaw 是設計哲學而非產品，並包含一個對比最大化整合與 MiniClaw 原則的表格，以及最小權限（Least Agency）實踐說明。

#### Scenario: MiniClaw 為哲學非產品的說明存在
- **WHEN** 讀取頁面的「MiniClaw 哲學」章節
- **THEN** 頁面明確說明 MiniClaw 不是一個產品或工具，而是一套設計哲學，並提及其源自《The Hidden Danger of OpenClaw》文章

#### Scenario: 最小攻擊面對比表格存在（七個維度）
- **WHEN** 讀取頁面中「核心原則：最少攻擊面」的說明
- **THEN** 頁面包含對比表格，列出以下七個設計維度：存取點數量、執行環境、介面、Skills 來源、網路暴露、爆炸半徑、安全姿態，並分別說明高風險設計與 MiniClaw 原則的差異

#### Scenario: Least Agency 最小權限實踐清單存在
- **WHEN** 讀取頁面中「最小權限（Least Agency）」說明
- **THEN** 頁面列出以下四項實踐：Agent 預設唯讀（需要寫入時顯式授權）、每個 Skill 工具存取範圍事先明確定義、Hook 腳本必須逐行稽核、MCP server 連接外部服務時明確記錄存取範圍
