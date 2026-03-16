## Why

OpenSpec 目前的 skills 假設使用者是從零開始的新專案（greenfield）。對於既有專案（brownfield），缺乏引導 AI 如何「先了解、後記錄、再改動」的 SOP，導致使用者可能直接在未文件化的舊程式上建立 change，產生錯誤假設與規格漂移。本 change 將 brownfield 導入 SOP 封裝成可執行的 AI skills，讓 AI 能一步步引導使用者正確導入 OpenSpec。

## What Changes

- 新增 `openspec-brownfield-onboarding` skill：引導 Phase 1（偵察）+ Phase 2（奠基）的一次性初始化流程
- 新增 `.opencode/commands/opsx-brownfield-onboard.md` command：作為 onboarding skill 的明確入口，使用者可直接輸入 `/opsx-brownfield-onboard` 觸發
- 新增 `openspec-retro-spec` skill：引導 Phase 3（逆向補規格）的反覆執行流程，包含「不跑 apply」的反直覺邏輯
- 新增 `openspec-retro-spec-guard` skill：在建立新 change 前，由 AI 自動查詢 `openspec/specs/` 判斷目標模組是否已有 Retro-Spec，並給出建議

## Capabilities

### New Capabilities

- `brownfield-onboarding`: 引導既有專案完成 Phase 1 偵察（技術債盤點、模組地圖）與 Phase 2 奠基（openspec init、config.yaml 建立）
- `brownfield-onboarding-command`: `/opsx-brownfield-onboard` command，作為 onboarding 的明確入口點
- `retro-spec-workflow`: 引導針對既有模組執行逆向補規格（explore → new → ff → Human Review → verify → archive），並明確標示跳過 apply 的原因

### Modified Capabilities

- `retro-spec-guard`: 獨立 skill，AI 自動查詢 `openspec/specs/` 判斷目標模組是否有 Retro-Spec，決定是否需要先執行逆向補規格

## Impact

- 影響 `.opencode/skills/` 下的 skill 檔案
- 新增三個 SKILL.md 檔案
- 新增一個 command 檔案（`.opencode/commands/opsx-brownfield-onboard.md`）
- 不修改任何既有 SKILL.md 檔案
- 不影響任何 Hugo 站台內容或部署流程
