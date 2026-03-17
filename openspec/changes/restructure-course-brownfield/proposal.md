## Why

目前課程將 SDD 定位為從開發起點就應導入的方法論，但實務上 AI 輔助開發的最大戰場是 Brownfield（既有 codebase）。課程需要重構以反映真實工作流程：先用 Vibe Coding 快速迭代出 MVP（Greenfield 階段），再用 SDD 讓 MVP 成為可維護、可追蹤的產品（Brownfield 階段）。

## What Changes

- **新增** Vibe Coding 作為課程前半段的核心方法論，取代「Copilot Chat 生產力」的定位
- **新增** Greenfield vs Brownfield 的分界點概念，以 MVP 誕生為轉折
- **重構** Ch0 暖身的敘事框架：「災難現場」改為「在 Brownfield 階段仍用 Vibe Coding 才是災難」
- **重構** Ch1：從 Copilot Chat 技巧擴充為 Vibe Coding 方法論，包含 Prototype 退出條件
- **重構** Ch2：從「引入 SDD」改為「從 MVP 到規格 — 歡迎來到 Brownfield」，加入轉折點敘事與 Proposal = MVP 結晶的概念
- **調整** Ch3：定位為「Proposal → Technical Spec」的過程，強調 Brownfield 脈絡
- **精簡** Ch4：移除工具安裝步驟至附錄，聚焦 Brownfield 結構化開發
- **新增** Ch5：驗證、測試與可觀測性（全新章節）
- **重新編號** Ch5（團隊）→ Ch6
- **新增** 附錄：工具安裝（OpenSpec CLI、OpenCode、Ollama）
- **更新** `_index.md` 課程描述

## Capabilities

### New Capabilities

- `course-narrative-greenfield-brownfield`: 課程整體敘事弧線，定義 Greenfield/Brownfield 分界，確立 SDD 主戰場為 Brownfield
- `ch1-vibe-coding`: Vibe Coding 方法論章節，包含原型思維、Prototype 退出條件、Brownfield 起點的轉折
- `ch2-mvp-to-spec`: 從 MVP 到規格的轉折章節，Proposal 作為 MVP 結晶的概念
- `ch5-verify-observe`: 全新章節，涵蓋 openspec verify、AI 輔助測試、Observability、AI Debug
- `appendix-setup`: 工具安裝附錄，整合 OpenSpec CLI、OpenCode、Ollama 安裝步驟

### Modified Capabilities

- `ch0-warmup`: 災難現場的敘事框架調整，加入 Brownfield vs Greenfield 說明
- `ch3-openspec`: 定位調整為「Proposal → Technical Spec」，apply/verify/archive 指令簡化為預覽
- `ch4-coding-agent`: 移除工具安裝，加入 Brownfield 開發注意事項
- `ch6-team`: weight 更新，Roadmap 反映新流程

## Impact

- `site/content/lessons/` 下所有 `.md` 檔案均受影響
- `ch1-copilot.md` 重新命名為 `ch1-vibe-coding.md`
- `ch2-sdd.md` 重新命名為 `ch2-mvp-to-spec.md`
- `ch4-opencode.md` 重新命名為 `ch4-coding-agent.md`
- `ch5-team.md` 重新命名為 `ch6-team.md`
- 新增 `ch5-verify-observe.md`
- 新增 `appendix-setup.md`
- 無外部依賴變更
