## ADDED Requirements

### Requirement: 引導逆向補規格完整流程
AI SHALL 引導使用者完成 Retro-Spec 的完整流程：explore → new → ff → Human Review → verify → archive，並明確在 ff 完成後告知使用者「不需要執行 apply」。

#### Scenario: 啟動 Retro-Spec
- **WHEN** 使用者呼叫 `openspec-retro-spec <module-path>`
- **THEN** AI SHALL 先進入 explore 模式，掃描指定路徑的現有 code，列出所有業務規則與行為

#### Scenario: 跳過 apply 步驟
- **WHEN** 所有 artifacts（proposal + specs + design + tasks）均已產生
- **THEN** AI SHALL 明確告知使用者：「Retro-Spec 的 tasks 全是文件整理，不需要執行 apply，請直接進行 Human Review 後執行 verify」

#### Scenario: Human Review 提示
- **WHEN** ff 階段完成後
- **THEN** AI SHALL 提示使用者檢查 AI 產出的 spec 是否與實際行為一致，並補充 AI 不知道的 context（如隱性商業規則、特殊例外情況）

### Requirement: Retro-Spec proposal 使用特殊結構
AI SHALL 在產生 Retro-Spec 的 proposal.md 時，加入 `Current Reality` 與 `Known Gaps` 兩個 Brownfield 專用區塊。

#### Scenario: 產生 Retro-Spec proposal
- **WHEN** AI 為 Retro-Spec change 建立 proposal.md
- **THEN** proposal.md SHALL 包含 `## Current Reality` 區塊（列出現有狀態，含未測試項目）與 `## Known Gaps` 區塊（列出未文件化或不明確的邏輯）

### Requirement: 判斷是否需要先補 Retro-Spec
AI SHALL 在使用者描述要改動的模組時，查詢 `openspec/specs/` 是否存在對應的 spec 檔案，並據此建議是否先執行 Retro-Spec。

#### Scenario: 模組無既有 spec
- **WHEN** 使用者要改動的模組在 `openspec/specs/` 下找不到對應目錄
- **THEN** AI SHALL 建議先建立 `retro-<module-name>` change，再建立實際改動的 change

#### Scenario: 模組已有既有 spec
- **WHEN** 使用者要改動的模組在 `openspec/specs/` 下已有對應目錄
- **THEN** AI SHALL 直接繼續建立改動 change，不需要額外 Retro-Spec
