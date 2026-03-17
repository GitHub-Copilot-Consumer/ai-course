# Spec: ch6-team

## Purpose

Define the requirements for Ch6 (Team), renamed from ch5-team, incorporating the Greenfield → Brownfield narrative into the team adoption roadmap and adding a full lifecycle retrospective as the course conclusion.

## Requirements

### Requirement: ch5-team.md 重新命名為 ch6-team.md 並更新 weight
`ch5-team.md` SHALL 重新命名為 `ch6-team.md`，front matter 中的 `weight` SHALL 從 `6` 更新為 `7`。舊檔案 SHALL 被刪除。

#### Scenario: 更名後舊檔不存在
- **WHEN** 更名完成後
- **THEN** `site/content/lessons/ch5-team.md` SHALL 不存在，`site/content/lessons/ch6-team.md` SHALL 存在且 weight 為 7

### Requirement: Ch6 導入 Roadmap 反映新的 Greenfield → Brownfield 流程
Ch6 的「Week 1–2：工具安裝與觀念對齊」段落 SHALL 更新，新增「理解 Greenfield/Brownfield 分界」作為工作坊的學習目標之一。Roadmap 的描述 SHALL 反映新課程流程（Ch0–Ch2 為 Greenfield，Ch3–Ch5 為 Brownfield SDD）。

#### Scenario: 學習者閱讀導入 Roadmap
- **WHEN** 學習者閱讀 Ch6 的 Roadmap
- **THEN** Roadmap SHALL 包含 Greenfield/Brownfield 分界的說明，工作坊議程 SHALL 涵蓋 ch0–ch5 的新內容

### Requirement: Ch6 新增完整生命週期回顧段落
Ch6 SHALL 新增一個「完整生命週期回顧」段落作為課程結尾，以視覺化方式呈現從 Greenfield Vibe Coding → MVP → Brownfield SDD → 持續演進的完整路徑。

#### Scenario: 學習者閱讀課程結尾
- **WHEN** 學習者閱讀 Ch6 末尾
- **THEN** SHALL 有一個 ASCII 圖示或視覺化段落，回顧整個課程學到的完整生命週期
