---
title: everything-claude-code 資源介紹
weight: 2
description: 介紹 everything-claude-code agent harness 系統及其與 OpenCode 的整合方式
showToc: true
---

## 專案簡介

**everything-claude-code**（簡稱 ECC）是一個由 [Affaan Mustafa](https://x.com/affaanmustafa) 開發的開源 **agent harness 強化系統**，為 Anthropic Hackathon（Cerebral Valley x Anthropic，2026 年 2 月）的得獎作品，目前已累積超過 80,000 GitHub Stars、10,000+ forks。

此專案並非單純的設定檔集合，而是一套完整的**效能優化框架**：結合 Skills（工作流程模組）、Instincts（學習型行為記憶）、Memory Optimization（記憶持久化）、Security Scanning（安全掃描），以及 Research-First Development（研究優先開發哲學）。

**GitHub：** [https://github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

### 支援的工具

| 工具 | 支援狀態 |
|------|---------|
| Claude Code | ✅ 完整支援（主要平台） |
| OpenCode | ✅ 完整支援（v1.3.0 起，12 agents、24 commands、16 skills） |
| Cursor | ✅ 支援 |
| Codex CLI / App | ✅ 支援（v1.6.0 起） |

---

## 核心元件概覽

ECC 由五個互相協作的核心元件組成：

| 元件 | 說明 |
|------|------|
| **Skills** | 可重複使用的工作流程模組，封裝特定領域知識，如 TDD、Debug、Code Review |
| **Hooks** | 事件驅動的自動化觸發器，在 agent 生命週期特定節點自動執行 |
| **Commands** | 自訂斜線指令（slash commands），觸發 Skills 或複雜操作 |
| **Rules** | 行為規範，確保 AI 在指定限制內運作（強制遵循） |
| **Instincts** | 從過去 session 自動學習抽取的行為記憶，帶信心評分 |

---

## 第一章：Agents（專業子代理人）

### 什麼是 Agent？

在 ECC 的架構中，Agent 是一種**具有特定角色與限制範圍的子代理人（subagent）**，由主 Claude 實例（Orchestrator）按需委派任務。每個 Agent 都有：

- 明確的專業角色定義（職責邊界）
- 允許使用的工具清單（工具權限範圍）
- 特定的決策判斷標準

這種設計讓每個 Agent 保持「單一職責」，避免 context 被無關資訊污染，同時讓主 agent 能夠並行處理多個任務。

### ECC 內建的 Agents

ECC 提供超過 21 個預定義 Agent，以下是主要類別：

#### 開發流程 Agents

| Agent 檔案 | 職責 |
|-----------|------|
| `planner.md` | 功能實作計畫分解，將需求轉為可執行 tasks |
| `architect.md` | 系統設計決策，評估架構方案的取捨 |
| `tdd-guide.md` | 測試驅動開發引導，確保先寫測試再實作 |
| `refactor-cleaner.md` | 清除 dead code、整理無用的 .md 說明檔 |
| `doc-updater.md` | 偵測程式碼變更並同步更新技術文件 |

#### 品質保證 Agents

| Agent 檔案 | 職責 |
|-----------|------|
| `code-reviewer.md` | 程式碼品質與安全性稽核 |
| `security-reviewer.md` | 漏洞分析與安全風險評估 |
| `build-error-resolver.md` | 建置錯誤診斷與修復 |
| `e2e-runner.md` | Playwright E2E 測試執行與報告 |

#### 語言專屬 Agents

| Agent 檔案 | 職責 |
|-----------|------|
| `go-reviewer.md` | Go 程式碼審查（Go idioms、concurrency 模式） |
| `go-build-resolver.md` | Go 建置錯誤解決 |
| `python-reviewer.md` | Python 程式碼審查 |
| `database-reviewer.md` | 資料庫設計與 Supabase 整合審查 |

### 如何設定 Agent

以 `planner.md` 為例，Agent 定義的典型結構：

```markdown
# Planner Agent

你是一個功能實作規劃師。你的工作是：
1. 接收用戶功能需求
2. 拆解為可執行的子任務清單
3. 評估每個任務的依賴關係
4. 產出帶有優先順序的任務計畫

## 允許的工具
- Read（讀取現有程式碼）
- Glob（搜尋相關檔案）
- 禁止直接修改程式碼（寫入操作由其他 agent 執行）

## 輸出格式
以 Markdown checklist 格式輸出，每個任務包含預估複雜度。
```

Agent 透過 `~/.claude/agents/`（Claude Code）或 `.opencode/agents/`（OpenCode）路徑部署。

### OpenCode 的 Agent 機制

OpenCode 原生支援兩種類型的 Agent，與 ECC 的設計哲學高度契合：

**主代理（Primary Agent）**：直接與使用者互動，可透過 `Tab` 鍵切換。OpenCode 內建 `build`（完整工具存取）與 `plan`（受限，不可直接修改檔案）兩種。

**子代理（Subagent）**：由主代理透過 Task 工具委派任務，或由使用者在訊息中用 `@` 提及呼叫。OpenCode 內建 `general` 與 `explore`（唯讀）兩種。

#### 用 Markdown 定義自訂 Agent

OpenCode 支援直接用 `.md` 檔案定義 Agent，存放於：
- 全域：`~/.config/opencode/agents/<name>.md`
- 專案：`.opencode/agents/<name>.md`
- 相容 Claude Code：`~/.claude/agents/<name>.md` 或 `.claude/agents/<name>.md`

> **重要：OpenCode 會自動讀取 Claude Code 的 `~/.claude/agents/` 目錄**，因此 ECC 安裝到 Claude Code 的 Agents 可以直接在 OpenCode 中使用，無需重複設定。

以 `security-reviewer.md` 為例：

```markdown
---
description: Performs security audits and identifies vulnerabilities
mode: subagent
tools:
  write: false
  edit: false
---

You are a security expert. Focus on identifying potential security issues.

Look for:
- Input validation vulnerabilities
- Authentication and authorization flaws
- Data exposure risks
- Dependency vulnerabilities
```

檔案名稱即為 Agent 名稱（`security-reviewer`），可用 `@security-reviewer` 直接呼叫。

#### 用 JSON 設定 Agent 行為

也可在 `opencode.json` 中設定或覆寫 Agent 選項：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "plan": {
      "model": "anthropic/claude-haiku-4-20250514"
    },
    "security-reviewer": {
      "description": "Reviews code for security vulnerabilities",
      "mode": "subagent",
      "model": "anthropic/claude-opus-4-20250514",
      "tools": {
        "write": false,
        "edit": false,
        "bash": false
      }
    }
  }
}
```

#### Agent 的工具權限控制

OpenCode 提供細粒度的權限管理，可精確控制每個 Agent 能執行的操作：

```json
{
  "agent": {
    "build": {
      "permission": {
        "bash": {
          "*": "ask",
          "git status": "allow",
          "git diff": "allow"
        }
      }
    }
  }
}
```

這種設計對應到 ECC 的「最小權限」哲學——每個 Agent 只獲得完成任務所需的最低存取權。

---

## 第二章：Skills（工作流程模組）

### Skills 的本質

Skills 是 ECC 中最重要的元件之一。它們是**儲存為 Markdown 文件的工作流程定義**，當 AI 接到特定類型任務時，自動載入對應 Skill 以獲得精確的執行指引。

本質上，Skills 是**領域知識的結構化封裝**：將原本需要在對話中重複描述的「怎麼做」抽取出來，變成可重複使用、可版本控管的工作流程。

### Skills 的目錄結構

```
skills/
├── tdd-workflow/         # 測試驅動開發（含 README.md 與輔助模板）
├── security-review/      # 安全稽核清單
├── coding-standards/     # 語言最佳實踐
├── continuous-learning/  # 從 session 自動抽取模式
├── continuous-learning-v2/ # 升級版：帶信心評分的 Instinct 學習
├── backend-patterns/     # API、資料庫、快取模式
├── frontend-patterns/    # React、Next.js 模式
├── eval-harness/         # 驗證迴圈評估
├── verification-loop/    # 持續驗證
├── iterative-retrieval/  # 子代理人漸進式 context 精煉
├── strategic-compact/    # 手動 context 壓縮建議
├── golang-patterns/      # Go 慣用法
├── django-patterns/      # Django 模型與視圖模式
├── python-patterns/      # Python 最佳實踐
├── springboot-patterns/  # Java Spring Boot 模式
├── e2e-testing/          # Playwright E2E 模式
├── deployment-patterns/  # CI/CD、Docker、健康檢查
├── api-design/           # REST API 設計規範
├── skill-stocktake/      # 稽核現有 Skills 品質
└── configure-ecc/        # 互動式安裝精靈
```

v1.8.0 目前提供超過 **102 個 Skills**，涵蓋 TypeScript、Python、Go、Swift、Java、Perl、PHP 等語言生態。

### Skills 的工作原理

Skills 的載入方式是「Prompt Injection」——在 AI 收到特定觸發詞或 `/command` 時，系統將 Skill 的 Markdown 內容注入到 context 中，讓 AI 依此執行。

```
使用者：/tdd "add user authentication"
         ↓
系統載入 tdd-workflow/SKILL.md 內容
         ↓
AI 依 Skill 定義的步驟執行：
  1. 先寫 failing test
  2. 實作最小可過測試的程式碼
  3. 重構
  4. 重複循環
```

### OpenCode 中的 Skills 機制

OpenCode 將 Skills 視為原生的「代理技能」系統，透過內建的 `skill` 工具按需載入——**不是在對話開始時全部注入**，而是讓 Agent 在需要時主動呼叫。

#### 搜尋路徑（含 Claude 相容路徑）

OpenCode 會自動掃描以下所有路徑，**包含 Claude Code 和 ECC 使用的路徑**：

| 優先順序 | 路徑 | 說明 |
|---------|------|------|
| 1 | `.opencode/skills/<name>/SKILL.md` | 專案級 OpenCode Skills |
| 2 | `~/.config/opencode/skills/<name>/SKILL.md` | 全域 OpenCode Skills |
| 3 | `.claude/skills/<name>/SKILL.md` | 專案級 Claude 相容路徑 |
| 4 | `~/.claude/skills/<name>/SKILL.md` | 全域 Claude 相容路徑 |
| 5 | `.agents/skills/<name>/SKILL.md` | 專案級 Agents 相容路徑 |
| 6 | `~/.agents/skills/<name>/SKILL.md` | 全域 Agents 相容路徑 |

> **重點：** OpenCode 會讀取 `~/.claude/skills/` 下的 ECC Skills，意即將 ECC 安裝到 Claude Code 後，OpenCode 可以**直接使用全部 102 個 Skills，不需要重複安裝**。

對於專案本地路徑，OpenCode 從當前工作目錄**向上遍歷到 git 根目錄**，逐層掃描所有符合的 `skills/*/SKILL.md`。

#### SKILL.md 的格式規範

每個 `SKILL.md` 必須以 YAML frontmatter 開頭：

```markdown
---
name: tdd-workflow
description: Test-driven development workflow enforcing Red-Green-Refactor cycle
license: MIT
compatibility: opencode
---

## 何時使用
需要實作新功能或修復 bug 時，確保先有測試再有實作。

## 執行步驟
1. 寫一個 failing test（紅燈）
2. 實作最小可過測試的程式碼（綠燈）
3. 重構（清理）
4. 重複直到功能完成
```

**名稱規則**：`name` 必須與目錄名稱一致，僅允許小寫字母、數字與單一連字號（`^[a-z0-9]+(-[a-z0-9]+)*$`）。

#### Agent 如何載入 Skill

OpenCode 在 `skill` 工具的描述中列出所有可用 Skills：

```xml
<available_skills>
  <skill>
    <name>tdd-workflow</name>
    <description>Test-driven development workflow enforcing Red-Green-Refactor cycle</description>
  </skill>
  <skill>
    <name>security-review</name>
    <description>Security checklist for identifying common vulnerabilities</description>
  </skill>
</available_skills>
```

Agent 根據任務需求主動呼叫：

```
skill({ name: "tdd-workflow" })
```

這種「按需載入」的設計避免了在 session 開始時把所有 Skill 內容一次性塞入 context，是 Context Engineering 的重要一環。

#### 設定 Skill 的存取權限

可在 `opencode.json` 中控制哪些 Skill 可被存取：

```json
{
  "permission": {
    "skill": {
      "*": "allow",
      "internal-*": "deny",
      "experimental-*": "ask"
    }
  }
}
```

也可針對特定 Agent 覆寫權限，或直接在 Agent 的 Markdown frontmatter 中設定：

```markdown
---
description: Readonly code reviewer
mode: subagent
permission:
  skill:
    "security-*": "allow"
    "deploy-*": "deny"
tools:
  skill: false   # 完全停用 skill 工具（若此 Agent 不需要）
---
```

呼叫方式：在對話中說「使用 tdd-workflow skill」，或觸發對應的 `/command`。

---

## 第三章：Context Engineering（情境工程）

### 為什麼 Context 管理至關重要

Claude Code 的 context window 約為 200k tokens，但實際可用量取決於已載入的工具、MCP server 定義、Rules、以及對話歷史。一個設定不當的環境中，**可用 context 可能只有理論上限的 35%**。

ECC 的 Context Engineering 策略圍繞幾個核心原則：

### 原則一：Token 最佳化

**MCP Server 管理：**
MCP server 定義在初始化時會佔用大量 token。ECC 建議：
- 設定檔中可有 20-30 個 MCP
- 但每個 session 僅啟用 5-10 個
- 關閉非必要 MCP 可釋放大量 context 空間

**規則：同時啟用的工具數量保持在 80 個以下。**

```json
// ~/.claude/settings.json 停用非必要的 MCP
{
  "disabledMcpServers": ["AbletonMCP", "magic", "clickhouse"]
}
```

**System Prompt 精簡：**
CLAUDE.md（或 OpenCode 的 system prompt）應保持精簡：
- 移除重複說明
- 用「引用」代替「複製」——在 CLAUDE.md 中用 `@skill tdd-workflow` 引用，而非複製全文
- 善用 Codemaps（程式碼地圖）讓 AI 快速導航而不需讀取整個檔案

### 原則二：Context 壓縮策略（Strategic Compaction）

長 session 中 context 會「腐化」——AI 對早期討論的記憶變得模糊。ECC 提供兩種應對機制：

**手動壓縮（strategic-compact Skill）：**
在長 session 中呼叫 `/compact` 指令，AI 會：
1. 分析哪些 context 仍然重要
2. 建議壓縮哪些部分
3. 保留關鍵決策與進行中任務的狀態

**自動壓縮 Hook（PreCompact Hook）：**
```json
{
  "PreCompact": [
    {
      "hooks": [
        {
          "type": "command",
          "command": "node scripts/hooks/pre-compact.js"
        }
      ]
    }
  ]
}
```
在系統觸發自動壓縮前，`pre-compact.js` 會先將當前狀態存入持久化記憶檔，確保重要資訊不遺失。

### 原則三：記憶持久化（Memory Persistence）

ECC 透過 Hooks 實現跨 session 的記憶持久化，解決每次開啟新 session 都要重新建立 context 的問題：

**Session 開始時（SessionStart Hook）：**
```javascript
// scripts/hooks/session-start.js
const memoryPath = path.join(projectRoot, '.claude', 'MEMORY.md');
if (fs.existsSync(memoryPath)) {
  const memory = fs.readFileSync(memoryPath, 'utf8');
  // 將記憶注入到 context
  process.stdout.write(memory);
}
```

**Session 結束時（Stop Hook）：**
```javascript
// scripts/hooks/session-end.js
// 從 session 中抽取：
// - 重要決策
// - 待完成任務
// - 發現的模式
// 寫入 MEMORY.md 供下次使用
```

### 原則四：漸進式 Context 精煉（Iterative Retrieval）

當子代理人需要理解大型程式碼庫時，不應一次載入所有相關檔案（context bomb）。`iterative-retrieval` Skill 定義了一個漸進式的資訊收集策略：

```
階段 1：高層次搜尋（Glob + 目錄結構）
         ↓ 找到候選檔案
階段 2：關鍵檔案精讀（Read 指定段落）
         ↓ 確認相關模式
階段 3：按需深入（只讀真正需要的部分）
```

這種方式避免了「一次讀取所有相關檔案」的 context 浪費。

### 原則五：Context 模式切換

ECC 的 `contexts/` 目錄提供三種**動態 system prompt 注入 context**：

| Context 模式 | 內容 | 使用時機 |
|------------|------|---------|
| `dev.md` | 開發模式指引（TDD、建置流程） | 寫新功能時 |
| `review.md` | 程式碼審查模式（安全、效能、可讀性） | PR review 時 |
| `research.md` | 探索模式（廣度優先、記錄發現） | 調查陌生程式庫時 |

切換方式（Claude Code）：
```bash
/context switch dev      # 切換為開發模式
/context switch review   # 切換為審查模式
```

### 原則六：模型路由（Model Routing）

不同任務應使用不同規格的模型，以節省 token 成本：

| 任務類型 | 建議模型 | 原因 |
|---------|---------|------|
| 快速格式化、簡單問答 | Claude Haiku | 成本低，速度快 |
| 一般開發任務 | Claude Sonnet | 平衡效能與成本 |
| 複雜架構設計、安全分析 | Claude Opus | 最強推理能力 |

ECC v1.8.0 新增的 `/model-route` 指令可幫助 AI 自動選擇合適模型。

---

## 第四章：AgentShield（安全掃描工具）

### 背景

AgentShield 是 Affaan Mustafa 在 ECC 開發過程中，因發現 AI agent 設定存在大量安全漏洞而開發的**安全稽核工具**，同樣是 Anthropic Hackathon 的成果之一。

核心資料：
- **1,282 個測試案例**
- **98% 程式碼覆蓋率**
- **102 條靜態分析規則**
- 可直接透過 `npx ecc-agentshield` 執行，無需安裝

### AgentShield 掃描的範圍

AgentShield 對以下五個類別進行掃描：

| 掃描類別 | 說明 | 規則數量 |
|---------|------|---------|
| **Secrets Detection** | 偵測硬編碼的 API key、密碼、Token（14 種模式） | ~25 條 |
| **Permission Auditing** | 稽核 agent 的工具權限是否過度寬鬆 | ~20 條 |
| **Hook Injection Analysis** | 分析 hooks 是否存在指令注入風險 | ~22 條 |
| **MCP Server Risk Profiling** | 評估 MCP server 設定的風險等級 | ~18 條 |
| **Agent Config Review** | 審查 agent 定義、skill 內容、rules 設定 | ~17 條 |

### 三種使用模式

**快速掃描（標準模式）：**
```bash
npx ecc-agentshield scan
```
執行靜態分析，輸出 A-F 等級評分（類似 SSL 安全評分）。

**自動修復模式：**
```bash
npx ecc-agentshield scan --fix
```
對安全的問題（如移除 hardcoded secret 的佔位符）自動套用修復。

**深度分析模式（Opus 三代理人模式）：**
```bash
npx ecc-agentshield scan --opus --stream
```
啟動三個 Claude Opus 代理人組成的「紅隊/藍隊/稽核師」管線：
- **紅隊（攻擊者）**：主動尋找可利用的漏洞鏈
- **藍隊（防守者）**：評估現有防護措施的有效性
- **稽核師**：綜合兩方分析，產出優先級排序的風險報告

**輸出格式：**
```bash
npx ecc-agentshield scan --format json   # CI/CD 管線整合
npx ecc-agentshield scan --format html   # 可讀性報告
npx ecc-agentshield scan --format md     # Markdown 報告
```
當發現 Critical 問題時，exit code 為 2，可作為 CI/CD 的 build gate。

### 在 Claude Code / OpenCode 中使用

透過 ECC 的 `security-scan` Skill，可在 agent 對話中直接觸發掃描：

```
/security-scan
```

或明確指定掃描目標：

```
/security-scan --deep   # 啟用 Opus 深度模式
/security-scan --ci     # 輸出 JSON 格式供 CI 使用
```

### 為什麼需要 AgentShield？

AI agent 設定檔（CLAUDE.md、settings.json、hooks.json）往往包含：
- 潛在的 prompt injection 漏洞
- 過度寬鬆的工具權限（agent 能讀取不需要的系統資源）
- hooks 中的 shell injection 風險
- MCP server 連接到不可信任的外部服務

隨著 agent 自動化程度提高，這些設定上的細節疏忽可能導致嚴重的安全後果。AgentShield 的目標是讓安全稽核像執行 lint 一樣簡單。

---

## 第五章：MiniClaw 哲學（安全設計原則）

### MiniClaw 是什麼？

MiniClaw **不是一個產品或工具**，而是 Affaan 在分析 AI agent 安全風險後，提出的一套**極簡主義 agent 設計哲學**。

這個概念源自他在《The Hidden Danger of OpenClaw》文章中，對比分析了大型多通道 agent 系統（OpenClaw）與精簡安全設計（MiniClaw）的差異。

### 核心原則：最少攻擊面

| 設計維度 | 最大化整合（高風險） | MiniClaw 原則（低風險） |
|---------|-----------------|----------------------|
| **存取點數量** | 多個（Telegram、Discord、X、Email、Browser） | 單一（SSH） |
| **執行環境** | 主機系統，廣泛存取 | 容器化，嚴格限制 |
| **介面** | 視覺化 Dashboard | 無頭終端機（tmux） |
| **Skills 來源** | 社群市集（未審核） | 手動稽核，僅本地 |
| **網路暴露** | 多個服務埠 | 僅 SSH（Tailscale mesh） |
| **爆炸半徑** | 所有 agent 可存取資源 | 隔離至專案目錄 |
| **安全姿態** | 隱性（不知道暴露了什麼） | 顯性（每個權限都是主動選擇） |

### MiniClaw 實踐範例

作者本人的實際設定：

```
Mac Mini（無頭，24/7 運行）
├── 僅 SSH 存取（ed25519 金鑰認證，無密碼）
├── Tailscale mesh（無對外開放 port）
├── tmux session（持久化，斷線重連不失狀態）
├── Claude Code with ECC 設定
│   ├── 手動稽核的 Skills（每個 Skill 逐行審閱）
│   ├── 僅用於品質閘控的 Hooks（非外部通道存取）
│   └── 預設唯讀權限的 Agents
└── 無多通道整合
    └── 無 Telegram、無 Discord、無 X、無 Email 自動化
```

### 最小權限（Least Agency）

MiniClaw 呼應 OWASP Agentic Applications Top 10 中的**「最小代理原則」（Least Agency）**：

> 只授予 agent 執行安全、有界限任務所需的最低自主性。

具體實踐：
- Agent 預設為**唯讀**，需要寫入時顯式授權
- 每個 Skill 的工具存取範圍**事先明確定義**
- Hook 腳本必須**逐行稽核**，不安裝未讀過的社群 Hook
- MCP server 連接外部服務時，**明確記錄**其存取範圍

### 便利性與安全性的取捨

MiniClaw 哲學並非主張「不使用 agent 自動化」，而是強調：

**連接 agent 到通訊管道（Telegram、Discord 等）時，你在用安全換取便利——這是真實的取捨，你應該在充分了解風險的情況下做出選擇。**

對於技術使用者，MiniClaw 模式提供「90% 的生產力，5% 的攻擊面」。

---

## 安裝方式

### Plugin 安裝（推薦）

最簡便的方式是透過 Claude Code Plugin 系統安裝：

```bash
# 加入 marketplace
/plugin marketplace add affaan-m/everything-claude-code

# 安裝 plugin
/plugin install everything-claude-code@everything-claude-code
```

完成後可立即存取 21 個 Agents、102 個 Skills、52 個 Commands。

### 手動安裝

若需要選擇性安裝或客製化設定：

```bash
# 1. Clone 專案
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# 2. 安裝依賴
npm install

# 3. 安裝語言對應的 Rules（選擇你的語言）
./install.sh typescript          # macOS/Linux
./install.sh typescript python   # 多語言
./install.sh --target cursor typescript  # 指定目標工具

# Windows PowerShell
.\install.ps1 typescript
```

### Hook 環境控制

ECC v1.8.0 新增了 Hook 執行時期控制，可在不修改設定檔的情況下調整行為：

```bash
# 設定 Hook 嚴格程度（minimal | standard | strict）
export ECC_HOOK_PROFILE=standard

# 停用特定 Hook（逗號分隔）
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"
```

---

## 與 OpenCode 整合

### 整合步驟

**方式一：Plugin 設定（推薦）**

在 OpenCode 設定檔（`~/.config/opencode/config.json` 或 `.opencode/config.json`）中加入：

```json
{
  "plugins": [
    "everything-claude-code"
  ]
}
```

重啟 OpenCode 後，Plugin 中的 Skills、Commands、Agents 等元件自動載入。

**方式二：手動路徑設定**

若使用手動安裝，可在設定中指定元件路徑：

```json
{
  "skillsDir": "/path/to/everything-claude-code/skills",
  "hooksDir": "/path/to/everything-claude-code/hooks"
}
```

---

### 使用場景範例

#### 場景一：Skills 整合——套用 TDD 工作流程

`tdd-workflow` Skill 讓 OpenCode 自動遵循紅綠重構（Red-Green-Refactor）循環。

啟用後在對話中呼叫：

```
/tdd "add user authentication"
```

OpenCode 會依 Skill 的步驟定義：先寫 failing test、再最小化實作、最後重構，並透過 TodoWrite 工具標記每個步驟的進度。

#### 場景二：Hooks 自動化——提交前品質閘控

透過 PostToolUse Hook，每次編輯 TypeScript 檔案後自動觸發型別檢查：

```json
{
  "PostToolUse": [
    {
      "matcher": "Edit && (.ts|.tsx)",
      "hooks": [
        {
          "type": "command",
          "command": "tsc --noEmit"
        }
      ]
    }
  ]
}
```

若型別檢查失敗，Hook 的回傳會自動通知 OpenCode 進行修復，形成自我修正迴圈。

#### 場景三：Agent 委派——安全稽核子代理人

當需要對一批檔案進行安全審查時，可委派給 `security-reviewer` Agent：

```
請使用 security-reviewer agent 檢查 src/api/ 目錄下所有 endpoint 的認證邏輯
```

`security-reviewer` Agent 具有唯讀存取權限，僅能讀取程式碼而不能修改，降低誤操作風險。

#### 場景四：Context 工程——Session 記憶持久化

在長期專案中，透過 ECC 的記憶持久化 Hook，每次關閉 session 前自動記錄：
- 當前進行的任務清單
- 重要架構決策
- 下次應繼續的位置

下次開啟 session 時，這些資訊自動注入 context，AI 能立即繼續之前的工作而不需重新說明背景。

---

## 延伸資源

- **GitHub 倉庫：** [https://github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- **短篇指南：** [The Shorthand Guide](https://github.com/affaan-m/everything-claude-code/blob/main/the-shortform-guide.md)（設定基礎、Hooks、Subagents）
- **長篇指南：** [The Longform Guide](https://github.com/affaan-m/everything-claude-code/blob/main/the-longform-guide.md)（Token 優化、記憶持久化、並行化）
- **安全指南：** [The OpenClaw Security Guide](https://github.com/affaan-m/everything-claude-code/blob/main/the-openclaw-guide.md)（Agent 安全風險分析）
- **AgentShield on npm：** [ecc-agentshield](https://www.npmjs.com/package/ecc-agentshield)
- **版本參考：** v1.8.0（Mar 2026）
- **授權：** MIT License
