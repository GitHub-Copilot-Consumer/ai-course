## ADDED Requirements

### Requirement: 提供 /opsx-brownfield-onboard command 作為明確入口
系統 SHALL 在 `.opencode/commands/` 提供 `opsx-brownfield-onboard.md` command 檔案，讓使用者可透過 `/opsx-brownfield-onboard` 直接觸發 brownfield onboarding 流程，無需記憶 skill 名稱。

#### Scenario: 使用者輸入 command
- **WHEN** 使用者在對話中輸入 `/opsx-brownfield-onboard`
- **THEN** AI SHALL 載入 `openspec-brownfield-onboarding` skill 並開始執行 onboarding 流程

#### Scenario: command 的 description 顯示在 TUI
- **WHEN** 使用者在 TUI 輸入 `/` 並瀏覽 command 清單
- **THEN** command 的 description SHALL 清楚說明此 command 的用途（如：「引導既有專案導入 OpenSpec，執行技術債盤點與初始化配置」）

#### Scenario: command 不重複執行 skill 邏輯
- **WHEN** command 被觸發
- **THEN** command 的 template SHALL 只包含一段 prompt，委派給 `openspec-brownfield-onboarding` skill 執行，不在 command 本身重複定義流程步驟
