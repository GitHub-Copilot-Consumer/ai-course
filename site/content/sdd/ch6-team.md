---
title: "6. 團隊導入策略與最佳實踐"
weight: 7
description: 如何將個人生產力轉化為團隊規範。
showToc: true
---

> 如何將個人生產力轉化為團隊規範。

## 學習目標

本章結束後，你將能夠：

- **使用** 模型選擇決策樹，為不同任務場景選擇適當的 AI 工具與模型
- **建立** 符合團隊習慣的 `openspec/` 標準目錄結構與設定
- **規劃** 一個實際可執行的導入 Roadmap，區分 Greenfield 與 Brownfield 階段
- **定義** 人機協作的明確邊界，建立團隊的 Code Review Checklist

---

## 模型選擇決策樹

面對眾多 AI 模型選項，使用以下決策樹找到最適合的工具：

```
任務是什麼？
│
├─ 規劃/設計（需要深度推理、理解複雜需求）
│   │
│   ├─ 資料是否機密？
│   │   ├─ 是 → Ollama + Codestral（完全本地）
│   │   └─ 否 → Claude Sonnet/Opus 或 GPT-5.4
│   │
│   └─ 推薦：Claude Opus 4.6
│
├─ 實作/生成（大量 Boilerplate、重複性程式碼）
│   │
│   ├─ 預算是否有限制？
│   │   ├─ 是 → GPT-5 mini 或 Ollama + GPT-OSS（低成本）
│   │   └─ 否 → Claude Sonnet 或 GPT-5.4
│   │
│   └─ 推薦：Claude Sonnet 4.6
│
├─ 即時補全（寫程式時的 inline 建議）
│   └─ 推薦：GitHub Copilot（低延遲、IDE 深度整合）
│
└─ 機密/合規專案（程式碼絕對不能外流）
    └─ 推薦：Ollama + GPT-OSS 或 Codestral（完全離線）
```

### 判斷條件說明

| 判斷維度 | 問題 | 選擇邏輯 |
|---------|------|---------|
| **任務類型** | 需要創意推理嗎？ | 推理任務用大模型，生成任務用小模型 |
| **資料敏感度** | 程式碼含商業機密嗎？ | 機密資料 → 必須用本地模型 |
| **成本預算** | 每月 AI 預算是多少？ | 高頻低難度任務優先用便宜模型 |
| **回應速度** | 需要即時回應嗎？ | 即時補全 → Copilot，深度分析可等待 |

---

## 人機協作邊界

明確定義哪些工作由人主導、哪些由 AI 輔助，是成功導入的關鍵。

### 職責分工表

| 任務類型 | 負責方 | 說明 |
|---------|--------|------|
| **架構設計決策** | 人 | 系統架構影響長期，AI 建議僅供參考 |
| **資安邏輯** | 人 | 認證、授權、加密邏輯必須人工審查 |
| **Spec Review** | 人（AI 輔助） | 人確認需求正確性，AI 可檢查格式完整性 |
| **Boilerplate 生成** | AI | CRUD、DTO、Repository 等重複性程式碼 |
| **單元測試撰寫** | AI（人 review） | AI 生成覆蓋主流程的測試，人審查邊界情況 |
| **文件生成（JSDoc/README）** | AI | AI 根據程式碼自動生成，人確認準確性 |
| **Code Refactoring（小範圍）** | AI（人 approve） | 單一函式或模組的重構，人需 approve diff |
| **跨系統整合設計** | 人 | 涉及外部 API、第三方服務的整合決策 |

### 灰色地帶：需要人主導但 AI 可輔助的任務

- **Spec Review：** 人負責確認「需求是否正確」，AI 可負責確認「格式是否完整、scenario 是否有遺漏」
- **PR Code Review：** 人負責架構合理性判斷，AI 可做初步的安全性與風格檢查
- **Bug 根因分析：** 人負責最終判斷，AI 可做初步調查（`/opsx:explore`）縮短調查時間

### Code Review Checklist

以下 Checklist 建議加入 PR Template（`.github/pull_request_template.md`）：

```markdown
## AI-Assisted Code Review Checklist

### 人工必審項目
- [ ] 架構決策符合現有系統設計原則
- [ ] 資安邏輯（認證、授權、輸入驗證）已由人工審查
- [ ] 敏感資料（API Key、個資）沒有硬編碼或不當記錄
- [ ] 效能影響已評估（特別是資料庫 Query）
- [ ] 錯誤處理邏輯合理，不會洩漏內部資訊

### Spec 對齊確認
- [ ] 實作符合 `specs/` 中的所有 Requirement
- [ ] `openspec verify` 已執行且通過
- [ ] 有新 Capability 時，`openspec archive` 已完成
```

---

## 專案結構標準化

### `openspec/` 目錄完整結構

```
openspec/
├── config.yaml                    # OpenSpec 全域設定
│
├── specs/                         # 已歸檔的 Capability 規格（事實來源）
│   ├── user-auth/
│   │   └── spec.md
│   ├── order-management/
│   │   └── spec.md
│   └── payment-gateway/
│       └── spec.md
│
├── changes/                       # 進行中的變更工作空間
│   ├── active-change-name/        # 進行中的 change
│   │   ├── .openspec.yaml
│   │   ├── proposal.md
│   │   ├── design.md
│   │   ├── specs/
│   │   │   └── new-capability/
│   │   │       └── spec.md
│   │   └── tasks.md
│   └── archive/                   # 已完成歸檔的 change 歷史
│       └── add-user-auth-2024-03/
│
└── adr/                           # Architecture Decision Records
    ├── 001-why-sdd.md
    ├── 002-database-choice.md
    └── 003-api-versioning.md
```

### `openspec/config.yaml` 最小範本

```yaml
schema: spec-driven

context: |
  Language: 繁體中文
  Framework: Node.js + TypeScript + PostgreSQL

  Use trunk-based development strategy.
  ADR is stored in openspec/adr/ folder.
  When finishing tasks, please sync README.md.

rules:
  proposal:
    - Check existing ADRs before making architectural decisions.
  specs:
    - Be explicit about mechanisms, not just outcomes (say HOW, not just WHAT).
  design:
    - Focus on readability, maintainability, and simplicity.
    - Prefer explicit lookups over pattern matching.
  tasks:
    - Follow TDD: write tests before implementation.
    - Use git commit per task with conventional commit format.
```

### `.github/prompts/` 建議清單

建議在 `.github/prompts/` 目錄下建立以下 Prompt 範本：

```
.github/
└── prompts/
    ├── code-review.md        # Code Review 標準 Prompt（含安全性檢查項目）
    ├── bug-analysis.md       # Bug 根因分析 Prompt（Chain of Thought 格式）
    ├── spec-writing.md       # 撰寫 spec.md 的引導 Prompt
    ├── test-generation.md    # 根據 spec scenario 生成測試的 Prompt
    └── commit-message.md     # 生成符合 Conventional Commits 的 commit message
```

---

## OpenCode Rules 設定

OpenCode 的行為規則（rules）讓你將 AI 的行為準則版本管理化。透過 `AGENTS.md` 與 `opencode.json`，團隊可以共享公共規則，同時為個人保留彈性設定空間。

> **建議：** 將專案的 `AGENTS.md` 提交至 Git，讓所有工程師在同一個 OpenCode 行為基準上協作。

### 專案級規則（AGENTS.md）

在專案根目錄建立 `AGENTS.md`，定義此專案的 AI 行為準則。此檔案 **應提交至 Git**，供全團隊共享。

執行 `/init` 指令可讓 OpenCode 掃描專案並自動生成初始 `AGENTS.md`；你也可以手動建立：

```markdown
# AI 輔助開發課程網站

這是一個使用 Hugo + Hextra 主題的靜態網站，搭配 OpenSpec CLI 進行規格驅動開發。

## 專案技術

- 框架：Hugo（靜態網站）
- 內容：`site/content/` 目錄下的 Markdown 檔案
- 規格管理：OpenSpec CLI，規格存放於 `openspec/specs/`

## 目錄結構

- `site/content/lessons/` — 課程章節內容（ch0–ch6）
- `openspec/specs/` — 已歸檔的 Capability 規格（事實來源）
- `openspec/changes/` — 進行中的變更工作空間
- `openspec/adr/` — Architecture Decision Records

## 開發規範

- 修改課程內容前，先確認對應的 `openspec/specs/` 是否存在
- 遵循 Trunk-Based Development，所有變更透過 PR 合入 main
- Commit 訊息遵循 Conventional Commits 格式
- 完成任務後，同步更新 README.md
```

### 個人／全域規則

在 `~/.config/opencode/AGENTS.md` 設定個人化規則，例如偏好的程式碼風格、個人常用 Prompt 習慣。

此檔案 **不提交至 Git**，僅作用於個人開發環境，適合放置不適合強制套用到全團隊的個人偏好：

```markdown
# 我的個人 OpenCode 規則

## 語言偏好
- 繁體中文回覆
- 程式碼內的變數與函式名稱使用英文

## 個人工作習慣
- 每次回覆前先確認我理解需求，避免過早開始實作
- 提供多個方案時，明確標示推薦選項與理由
```

### 透過 opencode.json 引用現有文件

若專案已有 `CONTRIBUTING.md`、開發指南、或 OpenSpec 規格等文件，可透過 `opencode.json` 的 `instructions` 欄位直接引用，**無需將規則複製到 `AGENTS.md`**：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [
    "CONTRIBUTING.md",
    "docs/development-guidelines.md",
    "openspec/specs/*/spec.md"
  ]
}
```

所有列出的文件會與 `AGENTS.md` 合併，作為 OpenCode 的規則來源。支援 glob 模式（如 `openspec/specs/*/spec.md`），適合 Monorepo 或規格數量龐大的專案，讓 OpenCode 在實作時能自動參照現有規格。

---

## 導入 Roadmap

本 Roadmap 依照本課程的 **Greenfield → Brownfield** 兩階段路徑設計。從 Vibe Coding 快速打出第一個 MVP 開始，再逐步將 SDD 引入持續迭代的 Brownfield 開發。

### Week 1–2：觀念對齊與工具安裝（Greenfield 準備）

**目標：** 整個工程團隊理解 Greenfield/Brownfield 分界，能獨立操作基本工具。

| 行動項目 | 負責角色 | 交付物 |
|---------|---------|--------|
| 舉辦半天工作坊（涵蓋本課程 Ch0–Ch2：Vibe Coding → 轉折點 → Proposal） | Tech Lead | Workshop 議程 + 錄影 |
| 全員完成工具安裝（Copilot + OpenCode + OpenSpec CLI） | All engineers | 安裝 Checklist 打勾完成（見附錄） |
| 建立並推送 `.github/copilot-instructions.md` | Tech Lead | PR 合入 main branch |
| 建立並推送專案 `AGENTS.md`，設定 OpenCode 公共規則 | Tech Lead | `AGENTS.md` PR 合入 main branch |
| 每人用 Vibe Coding 完成一個小型 MVP 練習 | All engineers | 每人一個練習 repo |

**Greenfield/Brownfield 分界說明（工作坊必講）：**
- **Greenfield 階段**（Ch0–Ch1）：Vibe Coding 快速迭代，不強制規格，速度優先
- **轉折點**（Ch2）：MVP 完成後，用 `proposal.md` 結晶設計意圖
- **Brownfield 階段**（Ch3–Ch5）：SDD 主戰場，每個功能有對應 spec，可追蹤、可驗證

### Week 3–4：小模組試行（Brownfield SDD Pilot）

**目標：** 在真實專案的低風險模組上試行完整 SDD 流程（Ch3–Ch5）。

| 行動項目 | 負責角色 | 交付物 |
|---------|---------|--------|
| 選定 Pilot 模組（建議：新功能而非現有複雜模組） | Tech Lead + PM | 選定的 Pilot 功能清單 |
| Pilot 功能使用完整 SDD 流程開發（new → ff → apply → verify → archive） | 2–3 名工程師 | `openspec/changes/<pilot>/` 完整 artifacts |
| 每週 Retrospective：記錄哪些 Prompt 有效、哪些 Drift 發生 | All engineers | `openspec/adr/` 新增決策記錄 |

### Month 2+：整合 CI/CD 與全面推廣

**目標：** SDD 成為團隊標準工作流，品質由流程保障。

| 行動項目 | 負責角色 | 交付物 |
|---------|---------|--------|
| 建立 `.github/workflows/openspec-validate.yml`，加入 PR 檢查 | DevOps / Tech Lead | CI 流水線更新 |
| 更新 PR Template 加入 AI Code Review Checklist | Tech Lead | `.github/pull_request_template.md` |
| 建立 Prompt Library（`.github/prompts/` 目錄），至少 5 個範本 | All engineers（協作） | PR 合入 main branch |
| 每月 Prompt 效果回顧會議，淘汰無效 Prompt、補充新 Prompt | Tech Lead 主持 | 更新的 Prompt Library |

---

## 完整生命週期回顧

你完成了整個課程。讓我們退後一步，看看你走過的完整旅程：

```
┌─────────────────────────────────────────────────────────────────────┐
│              AI 輔助開發的完整生命週期                               │
├──────────────────────────┬──────────────────────────────────────────┤
│      Greenfield 階段      │              Brownfield 階段             │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │                                          │
│  [導言]                  │  [Ch2] 轉折點                            │
│  理解 LLM、Agent         │  MVP 誕生 → 回推 Proposal                │
│  Coding Agent 原理       │  Proposal = MVP 的結晶                   │
│          │               │           │                             │
│  [Ch0]   │               │  [Ch3]    ↓                             │
│  三個演進階段             │  Proposal → Technical Spec              │
│  Vibe Coding 的價值       │  design.md + specs/ + tasks.md          │
│  Brownfield 的挑戰        │           │                             │
│          │               │  [Ch4]    ↓                             │
│  [Ch1]   ↓               │  Coding Agent 結構化開發                 │
│  Vibe Coding MVP         │  Plan Mode → Build Mode                 │
│  快速迭代、驗證假設        │  依 tasks.md 逐步實作                    │
│  Prototype 退出條件       │           │                             │
│                          │  [Ch5]    ↓                             │
│                          │  openspec verify（Drift 修復）           │
│                          │  AI 輔助測試 + Observability             │
│                          │  openspec archive（規格成活文件）         │
│                          │           │                             │
│                          │  [Ch6]    ↓                             │
│                          │  團隊導入策略                            │
│                          │  你在這裡                                │
│                          │                                          │
└──────────────────────────┴──────────────────────────────────────────┘

核心心法：
  Greenfield：用 Vibe Coding 快速驗證，不過度設計
  轉折點：    MVP 完成後，用 Proposal 結晶設計意圖
  Brownfield：用 SDD 讓 MVP 活得更久，可追蹤、可驗證
```

### 你真正學到的是什麼

這門課表面上是「工具操作」，但底層是一個更重要的心智模型：

**AI 工具沒有好壞，只有用對場景和用錯場景。**

- Vibe Coding 不是壞的——它在 Greenfield 原型期是最高效的做法
- SDD 不是萬靈丹——它的成本在小專案或純原型期不值得
- Coding Agent 不是替代工程師——它是需要清晰規格才能可靠工作的夥伴

**SDD 的主戰場是 Brownfield。** 當你的 MVP 開始有真實用戶、需要多人協作、需要長期維護，那就是 SDD 發揮價值的時刻。

帶著這個理解，去用 AI 打造更好的產品。
