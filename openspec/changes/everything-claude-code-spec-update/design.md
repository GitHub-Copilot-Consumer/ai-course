## Context

本次變更目標是更新 `openspec/specs/everything-claude-code-resource/spec.md`，使其反映已擴充的 `site/content/resources/everything-claude-code.md` 頁面內容。頁面新增了五個章節：Agents（OpenCode 原生機制）、Skills（按需載入機制）、Context Engineering（六大原則）、AgentShield（安全掃描工具）、MiniClaw（設計哲學）。

目前 spec 僅涵蓋頁面基本存在性與初始五個核心元件，不包含上述新增章節的驗收標準。本次變更純粹為 spec 文件更新，不涉及任何 Hugo 程式碼或建置邏輯的改動。

## Goals / Non-Goals

**Goals:**
- 在 `everything-claude-code-resource` spec 中補充五個新章節的 Requirements 與 Scenarios
- 每個 Requirement 包含 WHEN/THEN 格式的 Scenario，明確定義驗收條件
- 確保 spec 與頁面實際內容一致，讓未來修改有明確的驗收標準

**Non-Goals:**
- 不修改 Hugo 頁面內容（頁面已完成）
- 不新增獨立 capability（僅更新現有 `everything-claude-code-resource` spec）
- 不影響任何程式碼、測試或建置流程

## Decisions

**決策 1：只更新單一 spec 檔案，不建立新 spec**

本次五個新章節均屬於同一個資源頁面（`everything-claude-code`），因此歸納在同一個 spec 檔案 `openspec/specs/everything-claude-code-resource/spec.md` 中，以 `REQ-` 編號連續追加。

替代方案：為每個章節建立獨立 spec — 拒絕，因為它們同屬一個頁面，分拆會增加維護負擔。

**決策 2：Requirement 以功能頁面章節為單位**

每個新章節對應一個或多個 Requirement，以 `WHEN 使用者瀏覽頁面上的「X」章節 / THEN` 格式描述驗收條件。

**決策 3：tasks.md 任務以直接編輯 spec 檔案為主**

由於本次變更只涉及 Markdown 文件編輯，tasks.md 中的任務只需：
1. 確認頁面內容與 spec 的對應關係
2. 在 spec 檔案中追加新 Requirements
3. 提交 conventional commit

## Risks / Trade-offs

- **Spec 與頁面內容不同步風險**：若頁面日後繼續擴充，spec 仍需手動更新 → 緩解：完成本次 tasks 後在 README 或 CONTRIBUTING 說明 spec 更新流程
- **Scenario 過於寬泛**：WHEN/THEN 若只描述「章節存在」而非具體內容，驗收價值有限 → 緩解：Scenario 應描述關鍵技術細節的呈現（例如「列出六種搜尋路徑」），不只是「章節存在」
