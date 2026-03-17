---
title: "導言：理解 Model、Agent 與 Coding Agent"
weight: -1
description: 在學習工具操作前，先理解 AI 工具背後的運作機制。
showToc: true
---

> 在學習工具操作前，先理解 AI 工具背後的運作機制。

許多人開始用 GitHub Copilot 或 OpenCode 時，會直接跳進工具操作。但當 AI 輸出奇怪的結果、或無法理解「為什麼要這樣做」時，往往是因為缺乏基礎心智模型。

這個導言章節回答三個問題：
1. **Model 是什麼？** ── Language Model 怎麼運作
2. **Agent 是什麼？** ── 如何從 Model 進化成能自主行動的 Agent
3. **Coding Agent 是什麼？** ── 為什麼它比一般 Chat 更強大

---

## 1. Language Model (LLM) 基礎

### Token 與 Context Window

LLM 不是逐字閱讀文字，而是以 **Token** 為單位處理。Token 大約對應半個英文單字或一個中文字。

更重要的是 **Context Window**（上下文視窗）──這是模型在一次對話中「能記住的最大範圍」。

```
┌──────────────────────────────────────────────┐
│              Context Window                  │
│                                              │
│  你之前說的話  ──▶  模型目前看到的  ──▶  回答  │
│                                              │
│  超出 Context Window 的內容 = 模型看不到      │
└──────────────────────────────────────────────┘
```

**實際影響：** 這就是為什麼長對話後 AI 會「忘記」早期的內容──它不是真的忘記，而是那些 Token 已超出視窗範圍。

---

### 機率生成機制（為何輸出不穩定）

LLM 不是查表式系統，**每次輸出都是機率抽樣**。面對同一個問題，模型在計算下一個 Token 時，有多個候選答案，最終輸出哪個字取決於機率分佈。

### 溫度參數（Temperature）

**溫度（Temperature）** 控制這個機率分佈的「平坦程度」：

| 溫度 | 特性 | 適合場景 |
|------|------|---------|
| 低（0.0–0.3） | 集中、穩定、可重現 | 程式碼生成、格式化輸出 |
| 高（0.7–1.0） | 多樣、創意、不可預測 | 腦力激盪、文案創作 |

**對開發者的意義：** 在 Copilot 和 OpenCode 的程式碼生成場景，通常使用低溫度以確保輸出穩定。

---

## 2. 什麼是 Agent

Model 本身只能「接收輸入、產生輸出」。但現實任務需要多個步驟、需要存取外部資訊、需要執行動作。

**Agent = Model + Tools + Loop**

```
┌─────────────────────────────────────────────────┐
│                  Agent Loop                     │
│                                                 │
│   ┌─────────┐   思考/決策    ┌─────────────┐   │
│   │         │ ─────────────▶ │             │   │
│   │  Model  │                │    Tools    │   │
│   │         │ ◀───────────── │             │   │
│   └─────────┘   觀察結果      └─────────────┘   │
│        │                           │            │
│        │    任務完成？              │            │
│        ▼                           ▼            │
│   ┌─────────┐              讀檔 / 搜尋 / API    │
│   │  Loop   │              執行終端機指令        │
│   └─────────┘                                  │
└─────────────────────────────────────────────────┘
```

---

### ReAct 模式

目前最主流的 Agent 運作模式是 **ReAct**（Reason + Act）：

1. **Reason（推理）** ── 分析當前狀況，決定下一步
2. **Act（行動）** ── 呼叫工具執行動作（如：讀取檔案）
3. **Observe（觀察）** ── 取得工具回傳的結果
4. **Repeat（重複）** ── 根據觀察結果，繼續推理，直到任務完成

這個循環讓 Agent 能處理需要多個步驟的複雜任務，而不只是單一問答。

### Memory 類型

Agent 有兩種記憶方式：

| 類型 | 說明 | 例子 |
|------|------|------|
| **In-context Memory** | 存在 Context Window 內的短期記憶 | 當前對話歷史、已讀取的檔案內容 |
| **External Memory** | 存在 Context Window 外的持久記憶 | 資料庫、向量搜尋索引、外部檔案 |

---

## 3. 什麼是 Coding Agent

Coding Agent 是 **Agent 特化於程式碼領域**的版本。它在 Model + Tools + Loop 的基礎上，配備了一組專門為程式開發設計的工具。

### Coding Agent 的三種專屬工具

**1. 檔案讀寫**
能夠讀取、建立、修改專案中的任何檔案。這讓 Agent 能「看到」整個 codebase，而不只是你貼進 Chat 框的那一段程式碼。

**2. 終端機執行**
能夠執行 shell 指令：跑測試、執行建置、安裝套件、查看 git log。Agent 能觀察指令輸出並根據結果調整行動。

**3. Codebase 搜尋**
能夠在整個專案中搜尋函式、類別、變數定義。Agent 在修改程式碼前，會先理解它在整個系統中的位置。

---

### 與一般 Chat 的差異

```
一般 Chat（如 ChatGPT 網頁）：
  你 ──▶ 貼上程式碼 ──▶ 模型回答 ──▶ 你手動複製貼上

Coding Agent（如 OpenCode）：
  你 ──▶ 描述任務 ──▶ Agent 自主讀檔、修改、執行測試、修正錯誤 ──▶ 完成
```

Coding Agent 的強大之處在於它能在 **完整的專案上下文**中行動，而不是盲目回答孤立的問題。

### 為何 Coding Agent 需要規格

這裡有一個根本問題：Agent 越自主，越需要清楚的**目標定義**。

如果你告訴 Agent「幫我改進這個功能」，它會根據自己的理解做決定。這些決定可能偏離你的真實意圖，且隨著 Agent 的自主行動鏈越長，偏差只會累積。

這個問題在 **Brownfield** 場景（既有 codebase）中尤其嚴重。Brownfield 開發的特點是：

- **歷史包袱**：程式碼裡有隱性的設計決策、過時的邏輯、或未記錄的業務規則
- **影響半徑難以預估**：一個看似簡單的修改，可能牽動十幾個依賴模組
- **AI 沒有「過去記憶」**：每次開啟新對話，Agent 對這個 codebase 的理解都是從零開始

沒有規格的 Brownfield Coding Agent，就像一個空降的工程師，既看不到完整的設計脈絡，也不知道「什麼動了會出事」。

**這正是本課程接下來要解決的問題。** 從下一章開始，我們將走過兩個階段：先用 **Vibe Coding** 快速迭代出 MVP，再用 **規格驅動開發（SDD）** 讓 MVP 成為可維護、可追蹤的產品──讓 Coding Agent 不只是聰明，而是可預測、可驗證。

---

## 4. 主流 Coding Agent CLI 比較

> 此比較基於 2026 年初的版本，AI 工具迭代迅速，各工具功能持續演進。

目前市場上有五個主流的 Coding Agent CLI 工具。了解它們的差異，有助於理解本課程的工具選擇，也讓你在未來能根據團隊需求做出有依據的決策。

### 模型支援光譜

各工具在「模型支援彈性」上有顯著差異：

```
單一廠商鎖定 ◀──────────────────────────────────▶ 完全模型無關
     │                                                   │
     ▼                                                   ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Claude   │  │ Codex    │  │ Gemini   │  │ Copilot  │  │ OpenCode │
│ Code     │  │  CLI     │  │  CLI     │  │  CLI     │  │          │
│(Anthropic│  │(OpenAI   │  │(Google   │  │(多廠商但 │  │(75+ 供應 │
│  only)   │  │  only)   │  │  only)   │  │限平台)   │  │  商)     │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
    高鎖定        高鎖定        中鎖定        中鎖定          低鎖定
```

---

### 功能比較表

| 工具 | 開源 | 預設模型（廠商） | 多模型支援 | Fallback 能力 | Subagent 支援 | Native Tools | 廠商鎖定風險 |
|------|------|-----------------|-----------|--------------|--------------|-------------|------------|
| **Claude Code CLI** | 否 | Claude（Anthropic） | 否 | 僅限 Opus/Sonnet/Haiku 間切換 | 原生（自訂 agent + 委派） | Read/Write/Bash/Glob/Grep/WebFetch | 高 |
| **Codex CLI** | 是 | GPT-5-Codex（OpenAI） | 否 | 有限 | 有限（偏向雲端委派） | Read/Write/Bash/Grep | 高 |
| **Gemini CLI** | 是 | Gemini（Google） | 否 | Auto-routing（Pro/Flash 間切換） | 透過 ADK 擴充 | Read/Write/Terminal/Grep/WebFetch | 中 |
| **GitHub Copilot CLI** | 否 | 多模型（GPT/Claude/Gemini） | 是（限平台內） | 可手動切換可用模型 | 內建（Explore/Plan/Build/Code-review） | Read/Write/Bash/Glob/Grep/WebFetch | 中 |
| **OpenCode** | 是 | 使用者自選（75+ 供應商） | 是（完全自訂） | 可設定主/備模型組合 | 原生（General/Explore + 自訂 agent） | Read/Write/Edit/Bash/Glob/Grep/WebFetch/GoogleSearch | 低 |

---

### 觀察重點

**多模型支援的本質差異**

表面上 Claude Code、Codex CLI、Gemini CLI 都是「強大的工具」，但它們的模型支援都受限於自家廠商。這意味著：

- 如果 Anthropic API 出問題，Claude Code 無法切換到 GPT 或 Gemini
- 定價由廠商決定，你沒有議價空間
- 如果你的程式碼含有敏感資訊，你必須信任該廠商的隱私政策

**Subagent 架構差異**

Subagent 是進階 Coding Agent 的核心能力，各工具實作方式不同：

| 工具 | Subagent 實作方式 |
|------|-----------------|
| Claude Code | Markdown 檔定義，獨立 context window、工具集、system prompt |
| GitHub Copilot | 內建專用 agent（按任務類型分工） |
| OpenCode | Built-in（General/Explore）+ 完全自訂 agent，支援 Agent Teams |
| Codex CLI | 偏向雲端沙盒委派，本地 subagent 支援有限 |

---

**Fallback 能力的重要性**

生產環境中，API rate limit 或臨時故障是常態。能夠自動 fallback 到備用模型，是工具可靠性的重要指標。只有 OpenCode 支援跨廠商的主/備模型完全自訂配置。

### 本課程的選擇

本課程選用 **OpenCode + GitHub Copilot 提供的 LLM**，理由如下：

1. **多模型彈性**：OpenCode 支援 75+ 模型供應商，可依任務特性選擇最適合的模型（如推理任務用 Claude Opus、快速迭代用 Gemini Flash）
2. **不受廠商鎖定**：切換模型不需要更換工具，學到的操作習慣與方法論可跨模型複用
3. **隱私保護**：程式碼直接傳送至你選擇的 AI 供應商，不經過 OpenCode 的伺服器

這也說明了為什麼本課程的方法論（規格驅動開發）是工具無關的——不管你未來用哪個工具，清晰的規格都能讓 Agent 交付更可預期的結果。

---

## 小結

```
LLM（機率生成引擎）
    +
Tools（讀檔、執行、搜尋）
    +
Loop（ReAct 循環）
    ║
    ▼
Coding Agent（自主完成程式開發任務）
    │
    │  Greenfield 階段：快速迭代
    ▼
Vibe Coding ──▶ MVP 誕生
    │
    │  MVP 之後：Brownfield 開始
    │  自主需要方向，既有 codebase 需要規格
    ▼
規格驅動開發（SDD）── 讓 MVP 成為可維護的產品
```

理解了這條脈絡，你對 Copilot 和 OpenCode 的每一個行為都會有更清晰的解釋。讓我們繼續。
