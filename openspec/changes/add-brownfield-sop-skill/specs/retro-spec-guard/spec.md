## ADDED Requirements

### Requirement: AI 自動查詢 specs 目錄判斷是否需要 Retro-Spec
AI SHALL 在執行 `openspec-retro-spec-guard` skill 時，自動查詢 `openspec/specs/` 目錄，判斷目標模組是否已有對應的 spec，並給出明確建議，不詢問使用者「有沒有 Retro-Spec」。

#### Scenario: 目標模組無對應 spec 目錄
- **WHEN** AI 查詢 `openspec/specs/` 後，找不到與目標模組名稱對應的目錄
- **THEN** AI SHALL 建議先執行 `openspec-retro-spec` 為該模組補上規格，再建立改動 change
- **AND** AI SHALL 說明理由：「在沒有 spec 的模組上直接改動，容易產生錯誤假設與規格漂移」

#### Scenario: 目標模組有對應 spec 目錄且非空
- **WHEN** AI 查詢 `openspec/specs/` 後，找到對應目錄且目錄內有 spec 檔案
- **THEN** AI SHALL 確認模組已有 Retro-Spec，直接建議繼續建立改動 change

#### Scenario: 目標模組有對應 spec 目錄但為空
- **WHEN** AI 查詢 `openspec/specs/` 後，找到對應目錄但目錄內沒有任何 spec 檔案
- **THEN** AI SHALL 視同無 Retro-Spec，建議先執行 `openspec-retro-spec`
- **AND** AI SHALL 說明：「目錄存在但無內容，可能是空骨架，建議先補完整的 Retro-Spec」

### Requirement: guard 可被使用者覆蓋
使用者 SHALL 可以在收到 guard 建議後，選擇忽略建議直接繼續，AI 不得重複阻擋。

#### Scenario: 使用者選擇忽略 guard 建議
- **WHEN** 使用者在收到 guard 建議後明確表示「我知道，直接繼續」或類似意圖
- **THEN** AI SHALL 不再重複建議，直接繼續後續流程

### Requirement: guard skill 可在任意時機獨立呼叫
使用者 SHALL 可在任何時機主動呼叫 `openspec-retro-spec-guard`，不限於 new-change 流程中。

#### Scenario: 獨立呼叫 guard
- **WHEN** 使用者提及某個模組名稱或路徑並呼叫 `openspec-retro-spec-guard`
- **THEN** AI SHALL 執行 specs 目錄查詢並回報結果，不預設任何後續動作
