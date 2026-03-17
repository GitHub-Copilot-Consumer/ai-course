---
title: "3. Technical Spec 與 OpenSpec 工作流"
weight: 4
description: 從 Proposal 到可執行的 Technical Spec，掌握 Brownfield 開發的規格工具鏈。
showToc: true
---

> 從 Proposal 到可執行的 Technical Spec，掌握 Brownfield 開發的規格工具鏈。

## 從 Proposal 到 Technical Spec

上一章，你為 Ch1 的 Todo MVP 回推寫了一份 `proposal.md`。那份 Proposal 是**非技術性的規格**：它說的是「我們決定做什麼、不做什麼」，但還沒有回答「要怎麼做、具體的 API 行為是什麼、驗收標準是什麼」。

這章要把它轉化為可執行的 **Technical Spec**——這是 Brownfield 開發的核心工具鏈：

```
proposal.md（Why + What）
    ↓
design.md（架構決策、取捨）
specs/<capability>/spec.md（具體需求 + 驗收場景）
    ↓
tasks.md（可執行的實作清單）
    ↓
[Ch4] Coding Agent 依 tasks.md 實作
    ↓
[Ch5] openspec verify + archive
```

有了完整的 Technical Spec，Coding Agent 不再需要猜測「我應該怎麼實作這個功能」——它有清晰的需求、設計決策、驗收標準，可以自主完成多步驟的實作任務。

---

## 學習目標

本章結束後，你將能夠：

- **執行** OpenSpec 完整工作流（new → ff/propose → apply → verify → archive）
- **操作** 每個 OPSX 指令，並理解其輸入、輸出與適用時機
- **應用** 多工並行，同時維護兩個 change 而不混亂
- **完成** 從 Proposal 生成完整 Technical Spec 的完整流程

---

## 3.1 環境初始化

### 系統需求

| 項目 | 需求 | 確認指令 |
|------|------|---------|
| Node.js | 18.x 或以上 | `node --version` |
| npm | 9.x 或以上 | `npm --version` |
| OpenCode | 最新版 | `opencode --version` |
| Git | 已初始化 | `git status` |

### 安裝步驟

**安裝 OpenSpec CLI：**
```bash
npm install -g @fission-ai/openspec
```
預期輸出：
```
added 127 packages in 8s
```

**在專案初始化：**
```bash
cd your-project
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

### 初始化後的目錄結構

```
your-project/
├── openspec/
│   ├── config.yaml          # OpenSpec 設定
│   ├── specs/               # 已歸檔的 capability 規格
│   │   └── <capability>/
│   │       └── spec.md
│   ├── changes/             # 進行中的變更工作空間
│   │   └── <change-name>/
│   │       ├── .openspec.yaml
│   │       ├── proposal.md
│   │       ├── design.md
│   │       ├── specs/
│   │       └── tasks.md
│   └── adr/                 # 架構決策記錄
│       └── 001-why-sdd.md
└── src/
```

### Artifacts 依賴關係

```
proposal.md  ──────────────────────────────────┐
     │                                          │
     ▼                                          ▼
design.md              specs/<capability>/spec.md
     │                          │
     └──────────┬───────────────┘
                ▼
           tasks.md
                │
                ▼
    (openspec apply → implementation)
                │
                ▼
    (openspec verify → validation)
                │
                ▼
    (openspec archive → merged into specs/)
```

**讀取順序：** proposal 先（Why）→ design（How）→ specs（What）→ tasks（Steps）

---

## 3.2 OPSX 核心指令詳解

### `/opsx:explore` — 在寫 Code 前先調查

**完整語法：**
```
/opsx:explore <描述你想調查的問題>
```

**前置條件：** OpenCode 已開啟專案目錄，且有 codebase 可搜尋。

**適用時機：** 當你面對一個模糊的問題（「網站變慢了」、「為什麼這個 API 偶爾失敗」），需要先調查再規劃。

**執行描述：**
AI 以唯讀模式（Plan Mode）搜尋整個 codebase，找出相關程式碼、依賴關係和潛在瓶頸，生成調查報告但不修改任何檔案。

**終端機輸出範例：**
```
/opsx:explore 為什麼訂單列表 API 的回應時間超過 3 秒

> Exploring codebase...
> Reading: src/controllers/OrderController.ts
> Reading: src/services/OrderService.ts
> Reading: src/repositories/OrderRepository.ts

Investigation Report:

## Root Cause Candidates

1. **N+1 Query (High Probability)**
   OrderRepository.findAll() 在迴圈中為每個 order 額外查詢 customer 資訊
   File: src/repositories/OrderRepository.ts:45

2. **Missing Index**
   orders 表的 created_at 欄位沒有 index，全表掃描
   File: migrations/001_create_orders.sql

3. **No Pagination**
   API 一次返回所有訂單，資料量大時無上限

## Recommendation
建議先建立 `add-order-list-optimization` change 來解決 N+1 Query 問題。
```

**常見錯誤：**
- `Error: No codebase index found` → 確認 OpenCode 已開啟專案根目錄（非單一檔案）

---

### `/opsx:new <name>` — 建立新的變更工作空間

**完整語法：**
```
/opsx:new <change-name>
# 或使用 openspec CLI
openspec new change "<change-name>"
```

**前置條件：** OpenSpec 已初始化（存在 `openspec/` 目錄）。

**適用時機：** 每當要開始一個新的功能開發、Bug 修復或重構任務。

**執行描述：**
在 `openspec/changes/<name>/` 建立一個新的工作空間目錄，包含 `.openspec.yaml` 設定檔，定義此 change 使用的 schema。

**終端機輸出範例：**
```
openspec new change "add-user-auth"

- Creating change 'add-user-auth'...
✔ Created change 'add-user-auth' at openspec/changes/add-user-auth/ (schema: spec-driven)
```

**常見錯誤：**
- `Error: Change 'add-user-auth' already exists` → 使用不同名稱，或先確認是否要繼續現有的 change（`openspec status --change "add-user-auth"`）

---

### `/opsx:ff` — Fast-Forward，一次生成所有規格文件

**完整語法：**
```
/opsx:ff
# 或
/opsx-propose <change-name>
```

**前置條件：** 已用 `/opsx:new` 建立 change，且 AI 知道你想做什麼（通常在 Chat 中先描述需求）。

**適用時機：** 當你想快速從「一句話需求」直接生成 proposal + design + specs + tasks 的完整 artifacts。

**執行描述：**
AI 依序生成所有 artifacts（按依賴順序：proposal → design → specs → tasks），每個 artifact 完成後寫入對應檔案。

**終端機輸出範例：**
```
/opsx:ff 我要建立 User 的 CRUD API，包含 create、read、update、delete

> Creating proposal.md...
✔ Written: openspec/changes/add-user-crud/proposal.md

> Creating design.md...
✔ Written: openspec/changes/add-user-crud/design.md

> Creating specs...
✔ Written: openspec/changes/add-user-crud/specs/user-crud/spec.md

> Creating tasks.md...
✔ Written: openspec/changes/add-user-crud/tasks.md

All artifacts complete! Progress: 4/4
Ready for implementation. Run /opsx:apply to start.
```

**常見錯誤：**
- AI 生成的 proposal 不符合預期 → 編輯 `proposal.md` 後重新執行 `/opsx:continue` 生成後續 artifacts

---

### `/opsx:apply` — AI 讀取 tasks.md 並實作

**完整語法：**
```
/opsx:apply
# 或指定 change
/opsx-apply <change-name>
```

**前置條件：** `tasks.md` 已存在且有未完成的 tasks（`- [ ]` 項目）。

**適用時機：** 所有規格文件準備完成，準備讓 AI 開始實作。

**執行描述：**
AI 讀取 `proposal.md`、`specs/`、`design.md`、`tasks.md` 作為 context，依序完成每個 task，並在完成後將 `- [ ]` 改為 `- [x]`。

**終端機輸出範例：**
```
/opsx:apply

## Implementing: add-user-crud (schema: spec-driven)
Progress: 0/8 tasks complete

Working on task 1/8: 建立 User entity 與資料庫 schema

> Writing: src/entities/User.ts
> Writing: migrations/002_create_users.sql
✓ Task 1 complete

Working on task 2/8: 實作 UserRepository

> Writing: src/repositories/UserRepository.ts
> Writing: tests/repositories/UserRepository.test.ts
✓ Task 2 complete

[繼續直到所有 tasks 完成或遇到阻礙]
```

**常見錯誤：**
- `State: blocked - missing artifacts` → 先執行 `/opsx:ff` 完成所有規格文件
- AI 中途卡住 → 查看它在哪個 task 停下，提供更多 context 或拆分 task

---

### `/opsx:verify` — 關鍵驗證步驟

**完整語法：**
```
/opsx:verify
# 或
openspec verify --change "<name>"
```

**前置條件：** 實作已完成（所有 tasks 為 `[x]`），`specs/` 目錄有規格文件。

**適用時機：** 實作完成後，歸檔前的最後驗證。

**執行描述：**
AI 對照 `specs/` 中的每個 Requirement 和 Scenario，在 codebase 中尋找對應的實作。發現偏離（Drift）時報告具體位置。

**終端機輸出範例：**
```
openspec verify --change "add-user-crud"

Checking 5 requirements...
  ✔ User can be created with email and name
  ✔ User email must be unique
  ✔ User can be retrieved by ID
  ✗ DRIFT: User can be soft-deleted (is_deleted flag)
    Expected: DELETE endpoint sets is_deleted=true, not hard delete
    Found: UserRepository.delete() uses hard delete (DELETE FROM users)
  ✔ User can update name and email

Result: 4/5 requirements satisfied
Action required: Fix soft-delete implementation before archiving
```

**常見錯誤：**
- Drift 太多 → 回到 `tasks.md` 補充遺漏的 tasks，再次執行 `/opsx:apply`
- `No specs found` → 確認 `specs/` 目錄下有 `spec.md` 檔案

---

### `/opsx:archive` — 完成開發，歸檔變更

**完整語法：**
```
/opsx:archive
# 或
openspec archive --change "<name>"
```

**前置條件：** `openspec verify` 通過（或你有意識地決定帶著已知偏離歸檔）。

**適用時機：** 功能開發完成、PR 合併後。

**執行描述：**
將 `openspec/changes/<name>/specs/` 下的 delta spec 合併回 `openspec/specs/`，建立永久的規格記錄。同時在原始 `openspec/changes/<name>/` 標記為 archived。

**終端機輸出範例：**
```
openspec archive --change "add-user-crud"

Archiving change 'add-user-crud'...
  ✔ Merged specs/user-crud/spec.md → openspec/specs/user-crud/spec.md
  ✔ Marked change as archived

Archive complete!
History preserved at: openspec/changes/archive/add-user-crud/
```

**常見錯誤：**
- `Unresolved drift detected` → 先修復 drift 或使用 `--force` 強制歸檔（不建議）

---

## 3.3 進階應用場景

### 多工並行 (Multitasking)

OpenSpec 的每個 change 都是獨立的目錄，這讓你可以同時進行多個任務而不混亂。

**目錄結構示意（兩個 change 同時進行）：**
```
openspec/changes/
├── feature-user-auth/        ← Sprint 功能開發（進行中）
│   ├── proposal.md
│   ├── specs/
│   └── tasks.md              (3/8 tasks done)
│
└── fix-order-timeout/        ← 緊急 Bug 修復（剛建立）
    ├── proposal.md
    └── tasks.md              (0/3 tasks done)
```

**切換 Context 的操作方式：**

切換到 Bug 修復任務：
```
/opsx-apply fix-order-timeout
```

完成後切換回功能開發：
```
/opsx-apply feature-user-auth
```

**互不干擾的機制：**
- 每個 change 有獨立的 `tasks.md`，進度完全隔離
- AI 在 apply 時讀取的是指定 change 目錄下的 context，不會混入其他 change 的規格
- 兩個 change 都可以獨立 verify 和 archive，不需要等另一個完成

---

### 自訂 Schema

如果預設的 `spec-driven` schema（proposal → design → specs → tasks）不符合團隊習慣，可以在 `openspec/config.yaml` 定義自訂流程，例如只要 specs + tasks（跳過 proposal 和 design）。

---

## 3.4 Lab 練習

### Lab A：建立 CRUD User Service（基礎）

**前置條件：**
- OpenSpec CLI 已安裝（`openspec --version` 確認）
- OpenCode 已啟動並開啟專案目錄
- 專案已執行 `openspec init`

**完整流程：**

**Step 1：建立 Change**
```bash
openspec new change "add-user-service"
```
預期輸出：
```
✔ Created change 'add-user-service' at openspec/changes/add-user-service/
```

**Step 2：生成所有規格文件（Fast-Forward）**

在 OpenCode Chat 中輸入：
```
/opsx-propose add-user-service

我要建立一個 User 的 CRUD service，包含：
- 建立 User（name, email, created_at）
- 用 ID 查詢 User
- 更新 User 的 name 和 email
- 軟刪除 User（設 is_deleted=true，不實際刪除資料）
```
預期結果：
- `openspec/changes/add-user-service/proposal.md` 已建立
- `openspec/changes/add-user-service/specs/user-service/spec.md` 已建立
- `openspec/changes/add-user-service/design.md` 已建立
- `openspec/changes/add-user-service/tasks.md` 已建立（含 6–10 個 tasks）

**Step 3：執行實作**
```
/opsx-apply add-user-service
```
AI 會依序完成所有 tasks，每完成一個會標記 `[x]`。

預期結果：`tasks.md` 中所有項目變為 `[x]`

**Step 4：驗證實作**
```bash
openspec verify --change "add-user-service"
```
預期輸出：所有 requirement 通過（或看到具體 drift 描述以便修復）

**Step 5：歸檔**
```bash
openspec archive --change "add-user-service"
```
預期輸出：
```
✔ Merged specs/user-service/spec.md → openspec/specs/user-service/spec.md
Archive complete!
```

**Done criteria：** `openspec/specs/user-service/spec.md` 存在，且 `openspec verify` 全部通過。

---

### Lab B：開發折扣邏輯服務（進階）

**場景：** 業務提出一個折扣規則：VIP 用戶買滿 3 件打 8 折，一般用戶買滿 5 件打 9 折，但特定商品類別（生鮮）不打折。規則模糊，先 Explore 再實作。

**Step 1：用 Explore 釐清規則**
```
/opsx:explore 請幫我分析以下折扣規則的邊界情況：
VIP 用戶買滿 3 件打 8 折，一般用戶買滿 5 件打 9 折，
生鮮商品不打折。
問題：
1. 折扣疊加嗎？（例如 VIP 買生鮮商品）
2. 「件數」是指全購物車還是同類商品？
3. 打折後是四捨五入還是無條件捨去？
```

**Step 2：根據 Explore 報告確認規格**
將 Explore 的調查結果整理為需求，建立 change：
```bash
openspec new change "add-discount-service"
```

**Step 3：撰寫精確的 Proposal**
在 proposal.md 中明確記錄邊界情況的決策（例如：折扣不疊加，以最優折扣為準）。

**Step 4：Apply → Verify → Archive**
重複 Lab A 的 Step 3–5。

**Done criteria：** 折扣邏輯有對應的 unit tests 覆蓋所有邊界情況（VIP + 生鮮、一般用戶 + 滿件等）。
