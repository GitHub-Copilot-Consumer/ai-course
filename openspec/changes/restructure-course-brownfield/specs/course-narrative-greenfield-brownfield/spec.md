## ADDED Requirements

### Requirement: 課程整體敘事分為 Greenfield 與 Brownfield 兩個階段
課程 SHALL 在 `_index.md` 與 Ch0 中明確建立兩階段敘事框架：Greenfield（從零到 MVP）與 Brownfield（在 MVP 上持續開發），以 MVP 誕生為轉折點。

#### Scenario: 學習者在 _index.md 看到課程定位
- **WHEN** 學習者閱讀 `_index.md`
- **THEN** 描述 SHALL 包含「Vibe Coding 快速原型」與「Brownfield SDD」兩個關鍵詞，並說明本課程聚焦 Brownfield

#### Scenario: 學習者在 Ch0 看到 Brownfield vs Greenfield 的差異說明
- **WHEN** 學習者閱讀 Ch0
- **THEN** 課程 SHALL 包含一個段落明確對比 Greenfield（自由度高、Vibe Coding 最有效率）與 Brownfield（需要紀律、SDD 是生存之道）

#### Scenario: 學習者在 Ch0 看到課程路線圖
- **WHEN** 學習者閱讀 Ch0 的課程路線圖
- **THEN** 路線圖 SHALL 以視覺化方式呈現 Greenfield → MVP 分界線 → Brownfield 的完整流程

### Requirement: 導言補充 Brownfield 脈絡
導言 `ch-intro-ai.md` 的「為何 Coding Agent 需要規格」段落 SHALL 補充說明：在 Brownfield 既有 codebase 上，AI 更容易偏離既有架構與慣例，規格的重要性因此更加明顯。

#### Scenario: 學習者閱讀導言的規格必要性說明
- **WHEN** 學習者閱讀導言「為何 Coding Agent 需要規格」段落
- **THEN** 內容 SHALL 包含 brownfield 脈絡的說明，提到既有 codebase 的特殊挑戰

### Requirement: 導言小結更新敘事弧線
導言結尾小結 SHALL 更新，反映新敘事弧線：Coding Agent → 先用 Vibe Coding 快速原型 → 再用 SDD 讓它活下去。

#### Scenario: 學習者閱讀導言小結
- **WHEN** 學習者閱讀導言末尾的小結圖示
- **THEN** 敘事弧線 SHALL 顯示 Vibe Coding 是第一步，SDD 是 Brownfield 的後續工具，而非起點
