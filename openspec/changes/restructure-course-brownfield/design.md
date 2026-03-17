## Context

本課程（`site/content/lessons/`）目前包含導言 + 6 個章節，以 Hugo 靜態網站呈現。現有課程將 SDD 從 Ch0 就開始鋪陳，並在 Ch2 正式引入，但整體敘事假設學習者是從零開始的 Greenfield 開發。

根據課程設計討論，需要重構為兩個明確的階段：
1. **Greenfield 階段**（導言、Ch0、Ch1、Ch2 前半）：以 Vibe Coding 快速迭代 MVP 為主
2. **Brownfield 階段**（Ch2 後半開始）：以 SDD 在既有 codebase 上持續開發為主

現有檔案清單：
- `_index.md`、`ch-intro-ai.md`、`ch0-warmup.md`、`ch1-copilot.md`
- `ch2-sdd.md`、`ch3-openspec.md`、`ch4-opencode.md`、`ch5-team.md`

## Goals / Non-Goals

**Goals:**
- 重構課程敘事，使 Greenfield/Brownfield 分界清晰，以 MVP 誕生為轉折點
- 讓 SDD 定位為 Brownfield 的生存之道，而非「一開始就要做的事」
- 新增 Vibe Coding 方法論為 Ch1 核心內容
- 新增 Ch5：驗證、測試與可觀測性（含 openspec verify、AI 測試、Observability、AI Debug）
- 將工具安裝步驟從 Ch4 抽離至獨立附錄，讓主線章節聚焦概念與操作
- 保留所有現有的技術內容（Prompt Engineering、OPSX 指令、OpenCode 等），只調整定位與敘事

**Non-Goals:**
- 不新增工具教學（OpenCode 和 OpenSpec 的核心指令已足夠）
- 不改變 Hugo 網站結構或 front matter 格式
- 不引入新的 AI 工具
- 不撰寫 Lab 所需的 demo 專案程式碼（Lab 設計只到說明層次）

## Decisions

### D1：章節重新命名與編號

將以下檔案重新命名，明確反映新定位：

| 原檔名 | 新檔名 | 說明 |
|--------|--------|------|
| `ch1-copilot.md` | `ch1-vibe-coding.md` | 定位從「工具使用」改為「方法論」 |
| `ch2-sdd.md` | `ch2-mvp-to-spec.md` | 定位從「SDD 引入」改為「轉折點」 |
| `ch4-opencode.md` | `ch4-coding-agent.md` | 定位從「工具遷移」改為「結構化開發」 |
| `ch5-team.md` | `ch6-team.md` | 編號後移，讓新 Ch5 插入 |

新增檔案：
- `ch5-verify-observe.md`：全新章節
- `appendix-setup.md`：工具安裝附錄

**理由**：檔名直接反映學習者心智模型，減少認知跳躍。

---

### D2：Ch2 的轉折點設計方式

Ch2 是課程最關鍵的章節，負責讓學習者從「Vibe Coding 好爽」切換到「我需要 SDD」。

**決定**：以 Lab 驅動轉折，而非純粹說教。

- Ch1 Lab 刻意讓學習者 vibe code 出一個「能動但自己都看不懂」的 MVP
- Ch2 開場請學習者打開 Ch1 的 code，回答三個問題：「你知道每個函式的設計意圖嗎？需求改了你知道改哪裡嗎？三個月後同事看得懂嗎？」
- 學習者親身感受到「不確定」的感覺，才引入 SDD 和 Proposal 的概念

**替代方案**：用案例故事（即現有的「災難現場」）→ 被放棄，因為故事是被動接收，Lab 是主動體驗，後者更能建立共鳴。

---

### D3：Proposal = MVP 結晶（方案 C）

**決定**：`proposal.md` 定位為「從 MVP 中回推出的正式需求」，而非預先撰寫的 PRD。

這改變了 proposal.md 的撰寫時機語意：不是「你想做什麼」，而是「你從原型中確認了什麼」。

**替代方案 A**：直接使用現有 proposal.md 定義（Why/What）→ 語意不完全符合「Vibe Coding 後回推」的敘事。  
**替代方案 B**：引入更 upstream 的 PRD 概念 → 增加課程複雜度，超出 SDD 範疇。

---

### D4：工具安裝集中到附錄

**決定**：將 OpenSpec CLI 安裝（原 Ch2/Ch3）、OpenCode 安裝與 API Key 設定、Ollama 安裝（原 Ch4）統一移至 `appendix-setup.md`。

主線章節改為在需要時以一行提示引導讀者：「請先完成附錄的工具安裝」。

**理由**：安裝步驟打斷敘事節奏，且容易過時。集中管理便於更新，不影響概念章節。

---

### D5：Ch5 的 Observability 範圍

**決定**：Ch5 的 Observability 不是完整的 observability 課程，而是「如何用 AI 工具為 brownfield 建立基礎可觀測性」。

涵蓋三個層次：
1. Spec 驗證（openspec verify + drift detection）
2. 測試（AI 輔助測試生成，TDD + SDD 並用）
3. 運行時可觀測性（structured logging、error tracking）+ AI Debug（/opsx:explore）

最後收尾為 `openspec archive`（驗證完就歸檔）。

## Risks / Trade-offs

- **[Risk] 舊連結失效**：章節重新命名後，如果有其他章節互相引用（如 Ch0 提到「見 Ch1」），連結會失效。→ 修改時同步搜尋並更新所有交叉引用。

- **[Risk] Hugo weight 衝突**：Ch5 插入後，Ch6 的 weight 需要更新，若有其他隱性排序依賴可能錯亂。→ 實作時以 weight 值明確檢查所有章節排序。

- **[Trade-off] Observability 章節深度**：Ch5 的 Observability 段落若寫得太淺，學習者覺得沒收穫；太深則偏離課程核心。→ 定位為「AI 如何幫你做這件事」，而非 Observability 本身的完整教學。

- **[Trade-off] Lab 缺乏實際 demo 專案**：課程重構計畫中，Lab 需要一個既有的 brownfield demo 專案。目前決定先不處理，只描述 Lab 場景。→ 未來需要補充 demo 專案，這是已知限制。
