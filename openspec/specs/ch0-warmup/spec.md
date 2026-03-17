# Spec: ch0-warmup

## Purpose

Define the requirements for Ch0 (Warmup) to establish the Greenfield vs Brownfield narrative framework and course roadmap, repositioning the AI evolution stages and disaster scenarios within the new brownfield context.

## Requirements

### Requirement: AI 三階段演進的第二階段重新定位為 Vibe Coding
Ch0 的「階段二：對話式生成 (Chat)」段落 SHALL 重新定位。原有「主要限制」內容保留，但 SHALL 在開頭加入正面描述：「對話式 AI 在原型階段是強大的利器，Vibe Coding 的核心工具。」限制說明的框架 SHALL 從「Chat 的問題」改為「在 Brownfield 階段仍然用 Chat 方式工作才會出現的問題」。

#### Scenario: 學習者閱讀階段二說明
- **WHEN** 學習者閱讀 Ch0 的 AI 三階段演進段落
- **THEN** 階段二 SHALL 先肯定 Chat/Vibe Coding 在原型階段的價值，再說明其限制適用於錯誤的使用場景

### Requirement: 三個災難現場的敘事框架調整
Ch0 的三個災難現場（代碼可讀性低、輸出不穩定、需求流失）的敘事框架 SHALL 從「Chat 式開發的問題」改為「當團隊在 Brownfield 階段仍然用 Vibe Coding 方式工作時發生的災難」。每個災難場景 SHALL 加入一句說明：「這不是 Vibe Coding 的問題，而是在錯誤的階段使用了錯誤的方法。」

#### Scenario: 學習者閱讀災難現場
- **WHEN** 學習者閱讀 Ch0 的災難現場
- **THEN** 每個災難 SHALL 有明確說明這是「Brownfield 階段用錯方法」造成的，而非 Vibe Coding 本身的問題

### Requirement: 課程核心目標描述更新
Ch0 的「課程核心目標」段落 SHALL 更新，從「從『讓 AI 幫我寫 Code』升級為『讓 AI 按照規格交付 Code』」改為「建立從 Greenfield 到 Brownfield 的完整路徑：先用 Vibe Coding 快速驗證想法，再用 SDD 讓成果可維護、可追蹤」。

#### Scenario: 學習者閱讀課程核心目標
- **WHEN** 學習者閱讀 Ch0 末尾的課程核心目標
- **THEN** 目標描述 SHALL 包含 Greenfield → Brownfield 的雙階段路徑概念

### Requirement: Ch0 新增 Brownfield vs Greenfield 對比段落
Ch0 SHALL 新增一個「Brownfield vs Greenfield」段落，明確說明：Greenfield（從零開始，自由度高，Vibe Coding 最有效率）、Brownfield（在既有 codebase 上開發，需要紀律，SDD 是生存之道）、以及本課程的流程（Greenfield 做出 MVP → 進入 Brownfield → 導入 SDD）。

#### Scenario: 學習者了解兩種開發情境的差異
- **WHEN** 學習者閱讀 Brownfield vs Greenfield 段落
- **THEN** SHALL 有清楚的對比說明，以及「MVP 誕生 = 進入 Brownfield」的概念

### Requirement: Ch0 新增課程路線圖視覺化
Ch0 SHALL 新增課程路線圖，以 ASCII 圖示呈現 Greenfield（Ch0→Ch1→Ch2 前半）→ MVP 分界線 → Brownfield（Ch2 後半→Ch3→Ch4→Ch5→Ch6）的完整流程。

#### Scenario: 學習者看到課程路線圖
- **WHEN** 學習者閱讀 Ch0
- **THEN** SHALL 有一個 ASCII 圖示呈現完整的學習路徑，包含 Greenfield/Brownfield 分界
