---
title: "4. Coding Agent 結構化開發"
weight: 5
description: 用 Coding Agent 在 Brownfield codebase 上依規格實作，掌握 Plan Mode 與結構化開發模式。
showToc: true
---

> 用 Coding Agent 在 Brownfield codebase 上依規格實作，掌握 Plan Mode 與結構化開發模式。

## 學習目標

本章結束後，你將能夠：

- **操作** Plan Mode 與 Build Mode 的切換，在正確時機使用各自模式
- **應用** Brownfield 開發注意事項，安全地在既有 codebase 上實作
- **執行** 依 `tasks.md` 逐步完成 Coding Agent 實作流程
- **完成** 將 Ch3 的 Technical Spec 落地為實際程式碼

---

> **開始前，請確認已完成工具安裝。**  
> 若尚未安裝 OpenCode 及設定 API Key，請先前往[附錄：工具安裝與環境設定](../appendix-setup)完成安裝。

---

## OpenCode 核心功能概覽

### Model Agnostic：多模型切換

OpenCode 支援 75+ 模型供應商，讓你根據任務特性選擇最適合的模型：

```bash
# 查看可用模型
opencode models list

# 輸出範例
Available models:
  anthropic/claude-sonnet-4-6  (current)
  anthropic/claude-opus-4
  openai/gpt-4o
  openai/gpt-4o-mini
  ollama/llama3               (local, offline)
  ollama/codestral            (local, offline)

# 切換模型
opencode --model openai/gpt-4o
```

### 混合架構策略 (Hybrid Architecture)

根據任務性質選擇最適合的工具：

| 場景 | 工具 | 理由 |
|------|------|------|
| **日常補全** | GitHub Copilot | 速度快、低延遲，適合即時補全 |
| **規格規劃（SDD）** | OpenCode + Claude Sonnet/Opus | 推理能力強、大 Context Window，適合理解複雜需求 |
| **大量實作（Boilerplate）** | OpenCode + GPT-4o mini | 成本低、速度快，適合重複性高的生成任務 |
| **機密專案** | OpenCode + Ollama（完全離線） | 程式碼不外流，符合資安要求 |

---

## Plan Mode 與 Build Mode

### 雙模式設計

| 模式 | 說明 | 適用時機 |
|------|------|---------|
| **Plan Mode（唯讀）** | AI 只能讀取檔案和搜尋 codebase，不能修改 | 探索程式碼、理解架構、調查 bug 根源 |
| **Build Mode（實作）** | AI 可以讀取、修改、建立、刪除檔案，也能執行指令 | 實際開發、修復 bug、重構 |

**Plan Mode 啟用方式：**
- 快捷鍵：`Shift+Tab`（在 OpenCode 介面中切換）
- 或在 Chat 中輸入：`/plan` 進入 Plan Mode

**Build Mode 啟用方式：**
- 快捷鍵：`Shift+Tab`（再次切換回 Build Mode）
- 或輸入：`/build` 切換回 Build Mode

**視覺差異：**
```
Plan Mode:   [PLAN] > 你的訊息...    ← 提示符顯示 [PLAN] 標籤
Build Mode:  [BUILD] > 你的訊息...   ← 提示符顯示 [BUILD] 標籤
```

---

### Plan Mode 在 Brownfield 的核心角色

在 Brownfield 開發中，Plan Mode 不只是「探索工具」——它是**安全開發的第一步**。

**標準工作流：先 Plan，再 Build。**

```
接到新 task
    ↓
[Plan Mode] 理解影響範圍
    ├─ 這個功能涉及哪些檔案？
    ├─ 有哪些現有邏輯我需要保留？
    └─ 修改這裡會影響哪些下游呼叫？
    ↓
確認理解正確
    ↓
[Build Mode] 依 tasks.md 逐步實作
```

**為什麼在 Brownfield 特別重要？**

Vibe Coding 的 MVP 通常沒有完整的文件，程式碼之間的依賴關係只存在於 code 本身。在你修改任何東西之前，你需要讓 AI 先「讀懂」這份 codebase。

**具體操作範例：**

```
[Plan Mode]
> 我要在 Todo API 中加入輸入驗證，請先分析：
  1. 現有的 POST /todos 處理邏輯在哪裡？
  2. 有沒有現有的驗證工具/pattern 可以複用？
  3. 加入驗證會影響哪些測試？

AI：
> Reading: index.js
> Searching for validation patterns...

分析結果：
- POST /todos 的處理在 index.js:23
- 目前無任何輸入驗證
- 無測試覆蓋
建議：加入 express-validator 套件，統一驗證邏輯
```

確認分析正確後，切換到 Build Mode 開始實作。

---

## Brownfield 開發注意事項

在既有 codebase 上用 AI 開發，有幾個關鍵原則：

### 注意事項一：修改前先用 Plan Mode 理解影響範圍

**問題：** AI 在 Build Mode 會直接修改你指定的部分，但可能沒有考慮到影響到的其他模組。

**做法：** 在切換到 Build Mode 之前，先在 Plan Mode 問：「如果我修改 X，哪些地方會受影響？」

```
[Plan Mode]
> 如果我把 todo id 的生成邏輯從自增數字改成 UUID，
  哪些地方需要同步修改？

AI：需要修改以下位置：
  1. POST /todos — id 生成邏輯
  2. GET /todos/:id — id 解析（從 parseInt 改為字串比對）
  3. 所有比較 id 的條件式（目前用 === 數字比較）
```

---

### 注意事項二：尊重既有架構模式

**問題：** AI 可能根據其訓練資料偏好，引入與現有 codebase 風格不符的 pattern。

**做法：** 在 Prompt 中明確告知現有的 pattern，要求 AI 遵循：

```
[Build Mode]
> 加入 todo title 的非空驗證。
  注意：目前專案沒有使用任何 middleware 框架，
  所有驗證邏輯直接在 route handler 中處理，
  請遵循這個 pattern，不要引入 express-validator。
```

這讓 AI 的輸出符合你的 codebase 風格，而不是根據「最佳實踐」自由發揮。

---

### 注意事項三：增量修改 vs 大規模重構

**判斷準則：**

| 情境 | 建議做法 |
|------|---------|
| 新增一個功能、修一個 bug | 增量修改——只動必要的地方 |
| 發現某個 pattern 需要統一 | 建立獨立 change，專注重構這一件事 |
| 發現整個架構需要調整 | 暫緩，先完成當前 tasks，重構另開 change |

**原則：一個 change，一件事。**

不要在實作功能的同時順手重構無關的程式碼。這會讓 `openspec verify` 難以追蹤哪些修改屬於這個 change 的範疇，也讓 Code Review 混亂。

---

### 注意事項四：善用 tasks.md 作為工作記憶

Coding Agent 的 context window 有限。長對話後，早期的指令可能已超出視窗範圍。

**做法：** 讓 `tasks.md` 作為「外部記憶」：

- 每完成一個 task，確認 AI 已將 `- [ ]` 改為 `- [x]`
- 如果 AI 跑偏，直接指向 tasks.md：「請回到 tasks.md 的第 3 個未完成項目繼續」
- 需要暫停時，`tasks.md` 的進度會完整記錄，下次可以無縫繼續

---

## `/opsx:apply` 完整操作

現在你有了完整的 Technical Spec（Ch3 的產出），是時候讓 Coding Agent 開始實作了。

### 執行流程

**Step 1：確認 Spec 狀態**

```bash
openspec status --change "formalize-todo-api"
```

預期輸出（所有 artifacts 已就緒）：
```
Change: formalize-todo-api
  ✔ proposal.md
  ✔ design.md
  ✔ specs/todo-api/spec.md
  ✔ tasks.md  (0/6 tasks complete)
Status: ready for implementation
```

**Step 2：先用 Plan Mode 理解整體任務**

在 OpenCode 中切換到 Plan Mode，輸入：
```
/opsx-apply formalize-todo-api

請先在 Plan Mode 中分析：
1. tasks.md 中的 6 個 tasks 依序是什麼？
2. 每個 task 涉及 codebase 的哪個部分？
3. 有沒有依賴順序需要特別注意？
```

確認分析合理後，切換到 Build Mode 開始實作。

**Step 3：Build Mode 依序完成 tasks**

```
[Build Mode]
/opsx-apply formalize-todo-api
```

AI 會依序完成每個 task，輸出類似：

```
## Implementing: formalize-todo-api

Working on task 1/6: 加入 title 非空驗證

> Reading: index.js
> Editing: index.js (line 23-35)
✓ Task 1 complete

Working on task 2/6: 加入 404 處理（刪除不存在的 todo）

> Reading: index.js
> Editing: index.js (line 45-52)
✓ Task 2 complete
...
```

**Step 4：遇到阻礙時**

如果 AI 在某個 task 卡住或方向錯誤：

1. 中斷當前操作（`Ctrl+C`）
2. 切換到 Plan Mode，重新分析這個 task
3. 手動提供更具體的指引後，再切回 Build Mode 繼續

---

## Lab 實戰：在 MVP 上依 tasks.md 實作

**目標：** 用 OpenCode 在 Ch1 的 Todo MVP 上，依 Ch3 生成的 `tasks.md` 完成所有實作任務。

**前置條件：**
- 完成 Ch3 Lab（`tasks.md` 存在，所有 task 均為 `- [ ]`）
- OpenCode 已安裝並設定好 API Key（見附錄）
- 在 Todo MVP 專案目錄啟動 OpenCode

**步驟：**

1. **啟動 OpenCode 並開啟 MVP 專案**
   ```bash
   cd todo-mvp
   opencode
   ```

2. **Plan Mode 先行：理解當前 codebase**
   ```
   [Plan Mode]
   請分析 index.js，說明：
   - 目前有哪些 API endpoints？
   - 現有的錯誤處理機制是什麼？
   - 缺少哪些驗證邏輯？
   ```

3. **確認分析符合 tasks.md 的預期**
   對照 `openspec/changes/formalize-todo-api/tasks.md`，確認 Plan Mode 的分析與 tasks 的描述一致。

4. **切換 Build Mode，開始實作**
   ```
   [Build Mode]
   /opsx-apply formalize-todo-api
   ```
   讓 AI 依序完成所有 tasks。

5. **中途監控**
   每完成 2–3 個 tasks，執行：
   ```bash
   node index.js
   # 手動測試已完成的功能確保沒有 regression
   ```

6. **全部完成後確認**
   ```bash
   cat openspec/changes/formalize-todo-api/tasks.md
   # 確認所有 [ ] 均已變為 [x]
   ```

**Done criteria：**
- `tasks.md` 中所有 `- [ ]` 均已變為 `- [x]`
- `node index.js` 可以正常啟動
- 基本 CRUD 操作均可正常回應

> 實作完成！下一章，我們要用 `openspec verify` 確認實作是否符合規格，並建立基礎可觀測性。
