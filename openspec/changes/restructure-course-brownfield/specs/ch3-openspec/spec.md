## MODIFIED Requirements

### Requirement: Ch3 標題更新為 Technical Spec 定位
`ch3-openspec.md` 的標題 SHALL 改為「Technical Spec 與 OpenSpec 工作流」，description SHALL 改為「從 Proposal 到可執行的 Technical Spec，掌握 Brownfield 開發的規格工具鏈。」

#### Scenario: 學習者看到 Ch3 標題
- **WHEN** 學習者進入 Ch3
- **THEN** 標題 SHALL 為「Technical Spec 與 OpenSpec 工作流」

### Requirement: Ch3 開場說明從 Proposal 到 Technical Spec 的銜接
Ch3 的開場 SHALL 新增說明：「上一章你寫了 Proposal（非技術規格），這章要把它轉化為可執行的 Technical Spec。這是 Brownfield 開發的核心工具。」

#### Scenario: 學習者閱讀 Ch3 開場
- **WHEN** 學習者進入 Ch3
- **THEN** 開場 SHALL 包含與 Ch2 的銜接說明，以及 Brownfield 脈絡

### Requirement: Ch3 的 apply/verify/archive 指令簡化為預覽
Ch3 中的 `/opsx:apply`、`/opsx:verify`、`/opsx:archive` 三個指令的說明 SHALL 保留概覽，但 SHALL 加入說明「完整操作分別在 Ch4（apply）和 Ch5（verify、archive）深入介紹」，移除重複的詳細步驟。

#### Scenario: 學習者在 Ch3 看到 apply 指令說明
- **WHEN** 學習者閱讀 Ch3 的 apply 段落
- **THEN** 段落 SHALL 為預覽性質，包含「詳見 Ch4」的引導，不包含完整的實作輸出範例

### Requirement: Ch3 Lab 改為從 Proposal 生成 Technical Spec
Ch3 的 Lab SHALL 改為「為 Ch2 的 Proposal 生成完整 Technical Spec（design.md + specs/ + tasks.md）」，使用 `/opsx:ff` 或 `/opsx-propose`。Done criteria：三個 artifacts 均已建立。

#### Scenario: 學習者完成 Ch3 Lab
- **WHEN** 學習者完成 Lab
- **THEN** `design.md`、`specs/` 下至少一個 spec.md、`tasks.md` SHALL 均存在
