---
title: "2. 解決雜亂無章：引入 SDD (Spec-Driven Development)"
weight: 3
description: 為何 TDD (測試驅動) 在 AI 時代不夠用？因為 AI 需要明確的「做什麼」(What) 而非僅是驗證「對不對」。
showToc: true
---

> 為何 TDD (測試驅動) 在 AI 時代不夠用？因為 AI 需要明確的「做什麼」(What) 而非僅是驗證「對不對」。

## 學習目標

本章結束後，你將能夠：

- **解釋** TDD 與 SDD 的差異，並說明為什麼 AI 時代需要 SDD 作為補充
- **執行** OpenSpec 的完整初始化流程（安裝 → init → 建立第一個 change）
- **整合** OpenSpec validate 進入 GitHub Actions CI/CD 流水線

---

## TDD vs SDD：不是替代，而是互補

在 AI 輔助開發的場景中，TDD（測試驅動開發）有一個根本限制：它能驗證程式碼**是否正確**，但無法告訴 AI **應該做什麼**。

### TDD 的核心流程

```
Red（寫一個失敗的測試）
  ↓
Green（寫最少的程式碼讓測試通過）
  ↓
Refactor（重構，但保持測試綠燈）
  ↓
重複
```

TDD 的前提是：**開發者腦中已經知道要做什麼**，測試只是把這個「知道」具體化為可驗證的形式。

### SDD 的核心流程

```
Spec（寫下要做什麼，以及為什麼）
  ↓
Apply（AI 依規格實作）
  ↓
Verify（對照規格驗證實作）
  ↓
Archive（歸檔規格與程式碼的對應關係）
```

SDD 的前提是：**AI 需要外部的「做什麼」指引**，才能自主完成多步驟的開發任務。

### 對比表：TDD vs SDD

| 維度 | TDD | SDD |
|------|-----|-----|
| **解決的問題** | 如何驗證程式碼正確性 | 如何讓 AI 有明確的實作目標 |
| **核心產物** | 測試程式碼（.test.ts） | 規格文件（spec.md、tasks.md） |
| **輸入** | 測試案例 | 自然語言的需求描述 |
| **驗證時機** | 每次程式碼變動後（CI） | 實作完成後（`openspec verify`） |
| **歷史追溯** | Git blame + test file | `openspec/changes/` 目錄 |
| **適用場景** | 邏輯密集的演算法、API contract | 功能開發、需求變更、重構 |

**結論：** SDD 不是用來取代 TDD，而是在 TDD 之上加了一層「需求-實作」的可追溯鏈。理想的 AI 輔助開發工作流是 **SDD + TDD 並用**：用 Spec 指引 AI 做什麼，用 Test 驗證 AI 做對了沒有。

---

## SDD 核心哲學

### Fluid & Iterative：流動且迭代

SDD 刻意設計為**非線性**的工作流。你不需要完成所有規格文件後才能開始實作，也可以在實作中途發現問題後回去更新 Spec。

```
[Explore] ←→ [Spec] ←→ [Apply] ←→ [Verify] ←→ [Archive]
              ↑_________________________________↑
                     任何時候都可以更新 Spec
```

### OpenSpec 解決的問題

#### 對抗程式碼熵 (Code Entropy)

程式碼熵是衡量專案混亂程度的指標。常見症狀：

- 同一個概念有 3 種不同命名（`user_id`、`userId`、`uid`）
- 相同邏輯在 5 個地方各自實作，有微小差異
- 沒有人知道某個函式的呼叫者是誰

OpenSpec 透過將設計決策明確寫入 `specs/` 和 `design.md`，讓 AI 在每次生成程式碼時都能參考「團隊的決定是什麼」，從源頭減少熵的產生。

#### Drift Detection：偵測實作偏離

`openspec verify` 會對照 `specs/` 目錄的 requirement 與 scenario，檢查實作是否符合規格。

```bash
$ openspec verify --change "add-user-auth"
Checking 5 requirements...
  ✔ User can register with email and password
  ✔ Password must be at least 8 characters
  ✗ DRIFT: User receives confirmation email after registration
    Expected: Email sent via /api/notifications endpoint
    Found: No email sending code in UserController
```

---

## 環境初始化：逐步設定

### 系統需求

- Node.js 18.x 或以上（`node --version` 確認）
- npm 9.x 或以上（`npm --version` 確認）
- Git 已初始化的專案目錄

### Step 1：安裝 OpenSpec CLI

```bash
npm install -g @fission-ai/openspec
```

預期輸出：
```
added 127 packages in 8s
```

驗證安裝：
```bash
openspec --version
```
預期輸出：
```
@fission-ai/openspec/1.x.x
```

### Step 2：在專案中初始化 OpenSpec

進入你的專案根目錄，執行：

```bash
openspec init
```

預期輸出：
```
✔ Created openspec/config.yaml
✔ Created openspec/specs/ directory
✔ Created openspec/changes/ directory
✔ Created openspec/adr/ directory
OpenSpec initialized successfully!
```

### Step 3：確認目錄結構

初始化後，你的專案應該包含：

```
your-project/
├── openspec/
│   ├── config.yaml          # OpenSpec 設定（schema、語言等）
│   ├── specs/               # 主規格目錄（已歸檔的 capability spec）
│   ├── changes/             # 進行中的變更工作空間
│   └── adr/                 # Architecture Decision Records
├── src/
└── ...
```

### Step 4：建立第一個 Change（驗證環境正常）

```bash
openspec new change "hello-world"
```

預期輸出：
```
✔ Created change 'hello-world' at openspec/changes/hello-world/
```

確認目錄：
```bash
ls openspec/changes/hello-world/
# .openspec.yaml
```

---

## 與現有流程整合

### 與 Agile 整合

將 OpenSpec 的 `proposal.md` 作為 **Definition of Ready**（進入 Sprint 的前提），`verify` 通過作為 **Definition of Done**：

```
Backlog Item
  ↓ [Product Owner 確認需求]
proposal.md + specs/*.md 撰寫完成  ← Definition of Ready
  ↓ [Sprint Planning]
tasks.md 分配到 Sprint
  ↓ [開發中]
openspec apply → openspec verify   ← Definition of Done
  ↓ [Sprint Review]
openspec archive
```

### 與 CI/CD 整合

在 Pull Request 流程中加入 `openspec validate`，確保沒有規格文件遺失或格式錯誤：

建立 `.github/workflows/openspec-validate.yml`：

```yaml
name: OpenSpec Validate

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install OpenSpec
        run: npm install -g @fission-ai/openspec

      - name: Validate OpenSpec
        run: openspec validate
        # 失敗時：輸出哪些規格文件有格式錯誤或缺少必要欄位
        # 失敗的 PR 會被 block，直到規格修正為止
```

**失敗情境：** 如果有 `spec.md` 缺少 `### Requirement:` 標題，或 scenario 用了錯誤的 `###`（應為 `####`），`openspec validate` 會回傳非零 exit code，讓 CI 失敗並阻擋 PR 合併。

---

## 市場比較

| 工具 | 優點 | 缺點 |
|------|------|------|
| **OpenSpec** | 輕量、與 Git 整合、Schema 可客製化 | 社群較小、文件仍在建立中 |
| **GitHub Copilot Workspace** | 與 GitHub 深度整合 | 鎖定 GitHub 平台，Enterprise 定價 |
| **AWS Kiro** | AWS 服務整合佳 | 強綁定 AWS 生態系，遷移成本高 |
