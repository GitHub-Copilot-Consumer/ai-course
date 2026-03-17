## MODIFIED Requirements

### Requirement: 原檔名 ch4-opencode.md 更名為 ch4-coding-agent.md
`ch4-opencode.md` SHALL 重新命名為 `ch4-coding-agent.md`，標題 SHALL 改為「Coding Agent 結構化開發」，description SHALL 改為「用 Coding Agent 在 Brownfield codebase 上依規格實作，掌握 Plan Mode 與結構化開發模式。」

#### Scenario: 更名後舊檔不存在
- **WHEN** 更名完成後
- **THEN** `site/content/lessons/ch4-opencode.md` SHALL 不存在，`site/content/lessons/ch4-coding-agent.md` SHALL 存在

### Requirement: Ch4 移除工具安裝步驟，改以附錄引導
Ch4 SHALL 移除以下內容：OpenCode 安裝步驟（Step 1/2/3）、API Key 設定、Ollama 安裝與設定、離線開發 Lab。這些內容 SHALL 改以一句話引導至附錄：「開始前請確認已完成附錄的工具安裝（OpenCode + API Key 設定）。」

#### Scenario: 學習者進入 Ch4 時找到工具安裝引導
- **WHEN** 學習者閱讀 Ch4 開頭
- **THEN** SHALL 包含「請先完成附錄工具安裝」的引導，不包含完整安裝步驟

### Requirement: Ch4 新增 Brownfield 開發注意事項
Ch4 SHALL 新增「Brownfield 開發注意事項」段落，包含：修改前先用 Plan Mode 理解影響範圍、尊重既有架構模式（不要強行引入新 pattern）、增量修改 vs 大規模重構的判斷準則。

#### Scenario: 學習者了解在既有 codebase 上開發的注意事項
- **WHEN** 學習者閱讀 Brownfield 開發注意事項
- **THEN** SHALL 包含至少三個具體的注意事項，每個都有說明原因

### Requirement: Ch4 強化 Plan Mode 在 Brownfield 的角色
Ch4 的 Plan Mode 說明 SHALL 強調其在 Brownfield 的核心用途：接手 MVP 程式碼前先用 Plan Mode 理解架構，確認影響範圍後再切換 Build Mode 實作。

#### Scenario: 學習者了解 Plan Mode 在 Brownfield 的使用時機
- **WHEN** 學習者閱讀 Plan Mode 說明
- **THEN** SHALL 包含「先 Plan 後 Build」的 Brownfield 工作流說明

### Requirement: Ch4 Lab 為在 MVP 上依 tasks.md 實作
Ch4 的 Lab SHALL 為「用 OpenCode 在 MVP 上依 tasks.md 逐步實作」，Done criteria：`tasks.md` 中所有 `- [ ]` 均變為 `- [x]`。

#### Scenario: 學習者完成 Ch4 Lab
- **WHEN** 學習者完成 Lab
- **THEN** tasks.md 所有項目 SHALL 標記為 `[x]`
