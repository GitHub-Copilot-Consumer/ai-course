## Context

OpenSpec 的 skill 體系目前涵蓋 greenfield 流程（new → ff → apply → verify → archive），但缺乏引導既有專案（brownfield）導入的 skill。

既有的 `.opencode/skills/` 目錄下包含：
- `openspec-explore` — 探索模式
- `openspec-new-change` — 建立新 change
- `openspec-propose` — 快速產生所有 artifacts
- `openspec-continue-change` — 繼續下一個 artifact
- `openspec-apply-change` — 實作任務
- `openspec-verify-change` — 驗證實作
- `openspec-archive-change` — 歸檔
- `openspec-sync-specs` — 同步主 specs
- `openspec-bulk-archive-change` — 批次歸檔

這些 skills 都假設使用者知道自己在做什麼。Brownfield 情境的核心挑戰是：在未有任何 spec 的既有 codebase 上，AI 和使用者都容易在「了解現狀」這步跳過，直接進入改動，造成規格漂移。

## Goals / Non-Goals

**Goals:**
- 新增 `openspec-brownfield-onboarding` skill：一次性初始化，引導 Phase 1 + Phase 2
- 新增 `.opencode/commands/opsx-brownfield-onboard.md` command：作為 onboarding 的明確入口，讓使用者可透過 `/opsx-brownfield-onboard` 觸發
- 新增 `openspec-retro-spec` skill：反覆執行的逆向補規格流程（Phase 3），明確說明為何跳過 apply
- 新增 `openspec-retro-spec-guard` skill：獨立的 guard skill，由 AI 查詢 `openspec/specs/` 自動判斷目標模組是否需要先執行 Retro-Spec

**Non-Goals:**
- 不修改 OpenSpec CLI 或任何 Hugo 站台內容
- 不強制改變 greenfield 使用者的流程
- 不自動偵測 brownfield 專案（由使用者主動觸發）

## Decisions

### 決策 1：拆成兩個獨立 skill，而非一個大型 brownfield skill

**選擇**：`openspec-brownfield-onboarding`（一次性）+ `openspec-retro-spec`（反覆執行）分開

**理由**：
- Onboarding 只做一次，Retro-Spec 會反覆執行（每個模組一次）
- 合在一起會讓 skill 過於龐大，且使用時機不同
- 符合現有 skills 的設計哲學（每個 skill 單一職責）

**備選**：單一 `openspec-brownfield` skill — 被排除，因為使用者在第一次之後就不需要 onboarding 部分

### 決策 2：Retro-Spec skill 明確列出「不跑 apply」的理由

**選擇**：在 skill 中明確以警示區塊說明 Retro-Spec 跳過 apply 的邏輯

**理由**：
- 這是最容易犯的錯誤（AI 預設會跑 apply）
- 明確說明比隱性跳過更能讓使用者理解流程
- 減少 AI 自行判斷是否要 apply 的模糊地帶

### 決策 3：Retro-Spec guard 獨立成一個 skill，而非嵌入 openspec-new-change

**選擇**：新增獨立 `openspec-retro-spec-guard` skill，由 AI 查詢 `openspec/specs/` 自動判斷

**理由**：
- Guard 邏輯（查 specs 目錄 → 判斷 → 建議路徑）是一個完整的職責，獨立成 skill 更符合單一職責原則
- AI 可以主動查詢 `openspec/specs/` 目錄，不需要詢問使用者「你有沒有 Retro-Spec」，減少不必要的對話來回
- 獨立 skill 讓使用者可以在任何時機主動呼叫 guard，不僅限於 new-change 流程；未來也方便在其他 skills 中組合使用
- 不修改既有 `openspec-new-change` 可降低引入 regression 的風險

**備選**：嵌入 `openspec-new-change` 的 guard — 被排除，因為修改既有 skill 有 regression 風險，且「詢問使用者」比「AI 自動查詢」多了一個不必要的對話步驟

### 決策 4：Onboarding 使用 command 作為入口，而非純 AI 意圖識別

**選擇**：新增 `.opencode/commands/opsx-brownfield-onboard.md`，讓使用者透過 `/opsx-brownfield-onboard` 觸發

**理由**：
- Onboarding 是一個明確的「一次性操作入口」，使用者需要知道有這個功能的存在
- OpenCode 的 command 清單（輸入 `/` 後可瀏覽）提供了可探索性（discoverability）
- 與其他 OpenSpec skills 不同：explore、new-change 等 skills 是 AI 根據意圖自動判斷使用的，但 onboarding 是使用者主動發起的一次性行為，更適合有明確的 slash command 入口
- Command 本身只是一個薄包裝（thin wrapper），prompt 委派給 skill 執行，不重複定義邏輯

**備選**：純 AI 意圖識別（同其他 skills）— 被排除，因為 onboarding 不是 AI 自然流入的情境，使用者需要主動知道並觸發它；若沒有明確入口，使用者容易找不到這個功能

## Risks / Trade-offs

- **[風險] Retro-Spec 產生的 spec 不準確** → 緩解：skill 中強調 Human Review 是必要步驟，AI 看不見沒寫在 code 裡的業務知識
- **[風險] retro-spec-guard 的目錄查詢可能有誤判** → 緩解：`openspec/specs/` 有對應目錄不代表一定有完整 Retro-Spec，guard 應同時檢查目錄是否存在且非空；若不確定，建議使用者確認
- **[取捨] config.yaml 模板** → SOP Phase 2 提到的 `config.yaml` 是 OpenSpec 專案配置，但目前 `openspec init` 不一定會生成它；skill 中提供模板但標示為「選用」
