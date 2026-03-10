## Why

課程大綱目前從「AI 開發痛點」直接切入工具操作，學員缺乏理解 Model、Agent 與 Coding Agent 差異的基礎概念。補充這段導言後，學員能理解「為什麼 Copilot/OpenCode 能做到這些事」，使後續章節更易吸收。

## What Changes

- 在現有 Ch0（課前暖身）之前新增一個導言章節，涵蓋 LLM 基礎、Agent 架構、Coding Agent 特性
- 更新課程大綱 `index.md`，在 Ch0 前加入新章節描述
- 新增 Hugo content 頁面 `hugo/content/chapters/ch-intro-ai.md`（weight: -1，確保排序在 Ch0 之前）

## Capabilities

### New Capabilities

- `intro-ai-chapter`: 導言章節頁面，涵蓋 LLM 原理（Token、Context Window、溫度）、Agent 架構（Model + Tools + ReAct Loop）、Coding Agent 特性（專屬工具與定位），並以小結引橋到後續課程

### Modified Capabilities

- `course-content-pages`: 新增一個章節頁面到 Hugo chapters section，需更新章節索引說明

## Impact

- 新增 `hugo/content/chapters/ch-intro-ai.md`
- 修改 `index.md` 課程大綱
- 不影響現有章節頁面（ch0~ch5）或任何程式碼邏輯
