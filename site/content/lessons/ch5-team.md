---
title: "5. 團隊導入策略與最佳實踐"
weight: 6
description: 如何將個人生產力轉化為團隊規範。
showToc: true
---

> 如何將個人生產力轉化為團隊規範。

## 學習目標

本章結束後，你將能夠：

- **使用** 模型選擇決策樹，為不同任務場景選擇適當的 AI 工具與模型
- **建立** 符合團隊習慣的 `openspec/` 標準目錄結構與設定
- **規劃** 一個實際可執行的 3 個月 AI 工具導入 Roadmap
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
│   │   └─ 否 → Claude Sonnet/Opus 或 GPT-4o
│   │
│   └─ 推薦：Claude 3.5 Sonnet（推理強、Context 200K）
│
├─ 實作/生成（大量 Boilerplate、重複性程式碼）
│   │
│   ├─ 預算是否有限制？
│   │   ├─ 是 → GPT-4o mini 或 Ollama + Llama3（低成本）
│   │   └─ 否 → Claude Sonnet 或 GPT-4o
│   │
│   └─ 推薦：GPT-4o mini（速度快、成本低）
│
├─ 即時補全（寫程式時的 inline 建議）
│   └─ 推薦：GitHub Copilot（低延遲、IDE 深度整合）
│
└─ 機密/合規專案（程式碼絕對不能外流）
    └─ 推薦：Ollama + Llama3 或 Codestral（完全離線）
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

## 導入 Roadmap

### Week 1–2：工具安裝與觀念對齊（Workshop 階段）

**目標：** 整個工程團隊能獨立操作基本工具，建立共同語言。

| 行動項目 | 負責角色 | 交付物 |
|---------|---------|--------|
| 舉辦半天工作坊（本課程 ch0–ch3 內容） | Tech Lead | Workshop 議程 + 錄影 |
| 全員完成工具安裝（Copilot + OpenCode + OpenSpec） | All engineers | 安裝 Checklist 打勾完成 |
| 建立並推送 `.github/copilot-instructions.md` | Tech Lead | PR 合入 main branch |
| 每人完成 Lab A（CRUD User Service） | All engineers | 每人一個練習 repo 的 PR |

### Week 3–4：小模組試行（Pilot 階段）

**目標：** 在真實專案的低風險模組上試行完整 SDD 流程。

| 行動項目 | 負責角色 | 交付物 |
|---------|---------|--------|
| 選定 Pilot 模組（建議：新功能而非現有複雜模組） | Tech Lead + PM | 選定的 Pilot 功能清單 |
| Pilot 功能使用完整 SDD 流程開發（new→ff→apply→verify→archive） | 2–3 名工程師 | `openspec/changes/<pilot>/` 完整 artifacts |
| 每週 Retrospective：記錄哪些 Prompt 有效、哪些 Drift 發生 | All engineers | `openspec/adr/` 新增決策記錄 |

### Month 2+：整合 CI/CD 與全面推廣

**目標：** SDD 成為團隊標準工作流，品質由流程保障。

| 行動項目 | 負責角色 | 交付物 |
|---------|---------|--------|
| 建立 `.github/workflows/openspec-validate.yml`，加入 PR 檢查 | DevOps / Tech Lead | CI 流水線更新 |
| 更新 PR Template 加入 AI Code Review Checklist | Tech Lead | `.github/pull_request_template.md` |
| 建立 Prompt Library（`.github/prompts/` 目錄），至少 5 個範本 | All engineers（協作） | PR 合入 main branch |
| 每月 Prompt 效果回顧會議，淘汰無效 Prompt、補充新 Prompt | Tech Lead 主持 | 更新的 Prompt Library |
