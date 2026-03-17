## 1. 更新 everything-claude-code-resource spec

- [ ] 1.1 確認 `openspec/specs/everything-claude-code-resource/spec.md` 的現有 Requirements（REQ: 新增頁面、專案簡介、核心元件、安裝方式、OpenCode 整合）未被破壞
- [ ] 1.2 將 `openspec/changes/everything-claude-code-spec-update/specs/everything-claude-code-resource/spec.md` 中的五個 ADDED Requirements 合併至 `openspec/specs/everything-claude-code-resource/spec.md`（追加至檔案末尾，保留原有 Requirements 不變）
- [ ] 1.3 驗證合併後 spec 檔案格式正確：所有 Scenario 使用 `####`（四個 `#`），所有 Requirement 使用 `###`（三個 `#`），WHEN/THEN 格式完整
- [ ] 1.4 提交：`docs(specs): add requirements for agents, skills, context-engineering, agentshield, miniclaw chapters`

## 2. 驗證頁面內容與 spec 一致

- [ ] 2.1 逐項對照 spec 中每個新增 Requirement 的 Scenario，確認 `site/content/resources/everything-claude-code.md` 頁面中對應的內容均存在（主代理/子代理說明、四個 Agent 搜尋路徑、六個 Skills 搜尋路徑、AgentShield 三種模式指令、MiniClaw 七維度對比表格等）
- [ ] 2.2 執行 Hugo 建置確認頁面可正常渲染（`hugo --source site`，exit code 為 0，無 `everything-claude-code` 相關錯誤）
- [ ] 2.3 提交（若有任何頁面修正）：`fix(content): align everything-claude-code page with updated spec`
