---
title: "1. Vibe Coding 與快速原型"
weight: 2
description: 用 AI 工具快速迭代出 MVP，掌握 Greenfield 階段的最佳實踐。
showToc: true
---

> 用 AI 工具快速迭代出 MVP，掌握 Greenfield 階段的最佳實踐。

## 學習目標

本章結束後，你將能夠：

- **理解** Vibe Coding 的定義與適用場景，以及何時應該停止
- **操作** Copilot Chat 的三種 Context 控制方式（`#file`、`#selection`、`@workspace`），並在正確時機使用它們
- **撰寫** 符合 Role Prompting、Chain of Thought、Negative Prompting 的進階 Prompt
- **建立** 團隊共用的 `.github/copilot-instructions.md`，讓 AI 遵守團隊技術規範
- **完成** 一個用 Vibe Coding 打出的能動 MVP，並體驗轉折點的感覺

---

## Vibe Coding 方法論

### 什麼是 Vibe Coding

**Vibe Coding** 是一種以 AI 對話為核心的快速原型方法：不預先設計完整架構，直接用自然語言描述想法，讓 AI 快速生成可運行的程式碼，邊做邊驗證，目的是以最低成本確認「這個想法行得通嗎」。

```
傳統開發：設計 → 實作 → 測試 → 驗證
Vibe Coding：描述 → 生成 → 跑起來 → 再描述 → 繼續生成 → ...
```

核心心法：**速度優先，完美其次。** 原型不需要完美的架構，它只需要回答一個問題：這條路值得走嗎？

---

### 適用場景

| 場景 | 說明 | 適合度 |
|------|------|--------|
| **原型（Prototype）** | 快速驗證一個功能概念是否可行 | ✅ 最適合 |
| **POC（Proof of Concept）** | 向利害關係人展示技術可行性 | ✅ 最適合 |
| **Spike** | 探索陌生技術領域，評估學習曲線 | ✅ 最適合 |
| **個人小工具** | 一次性腳本、自動化工具 | ✅ 適合 |
| **生產功能迭代** | 在既有 codebase 上新增功能 | ❌ 不適合，應改用 SDD |
| **Bug 修復（複雜系統）** | 需要理解既有邏輯後才能修改 | ❌ 不適合，AI 可能引入新問題 |

---

### 操作心法

**1. 從「能跑就好」開始**
不要在第一次對話就追求完美的錯誤處理、完整的測試覆蓋率、或優雅的抽象層。先讓核心流程跑起來。

**2. 用問題驅動迭代**
每一輪對話都是一個具體問題：「這個功能怎麼做？」→「好，現在這個邊界條件怎麼處理？」→「用戶輸入錯誤時顯示什麼？」。問題越具體，AI 輸出越精準。

**3. 接受混亂，記錄決策**
Vibe Coding 的產出通常不夠整潔。這是正常的。但有一件事值得記下：「我為什麼做這個決定？」這個問題的答案，是 Ch2 回推 Proposal 的原料。

**4. 設定時間箱**
Vibe Coding 很容易無限延伸。在開始前設定一個時間限制（例如：2 小時）。時間到了，不管做到哪裡，都要評估「退出條件」。

---

## Prototype 退出條件

Vibe Coding 不能永遠繼續下去。以下三個信號代表你該停下來，準備進入 Brownfield 模式：

### 信號一：核心假設已驗證

你當初打這個原型，是為了回答一個問題（例如：「這個 API 整合方式可行嗎？」「用戶會用這個功能嗎？」）。當這個問題有了明確答案，Vibe Coding 的任務就完成了。繼續 Vibe Code 只是在延後必要的結構化工作。

**檢查問題：** 你最初想驗證的假設，現在能給出一個明確的「是」或「否」嗎？

---

### 信號二：利害關係人確認方向

原型獲得認可（用戶點頭、主管批准、投資人感興趣），代表這個方向值得正式投入。此時需要從「快速驗證」模式切換到「可持續開發」模式。

**檢查問題：** 有人（不只是你自己）確認這個方向值得繼續做下去嗎？

---

### 信號三：「我不確定這段 code 在幹嘛」

這是最誠實的退出信號。當你打開自己三天前寫的原型，發現自己需要花時間理解它，代表程式碼已經超出你「腦中可以完整持有」的範圍。

這不是能力問題，這是 Vibe Coding 的必然結果——快速迭代不留痕跡。繼續在這個狀態下 Vibe Code，就是在複利累積技術負債。

**檢查問題：** 你能對一個剛加入的隊友解釋這段程式碼的設計意圖嗎？

---

> **一旦出現任何一個信號，就是進入 Ch2 的時候了。**

---

## Copilot 運作心智模型

### 理解 Context Awareness

Copilot 不是全知的——它只能「看到」你明確提供給它的內容。這就是 **Context Awareness**（上下文感知）的核心：**你控制 AI 看到什麼，就控制它產出什麼**。

Copilot Chat 提供三種 Context 控制方式：

---

#### `#file`：引用特定檔案

**使用時機：** 你想讓 AI 理解某個特定檔案的內容，例如修改一個服務時引用其介面定義。

**操作方式：**
1. 在 Copilot Chat 輸入框中輸入 `#`
2. 選擇 `file`，然後輸入檔案名稱
3. 選擇目標檔案後，它會附加在你的訊息 context 中

**Prompt 範例：**
```
#file:src/services/UserService.ts
這個 service 的 getUserById 方法目前沒有處理 user 不存在的情況，
請補充 404 錯誤處理，並保持現有的 error handling 風格。
```

---

#### `#selection`：引用選取的程式碼片段

**使用時機：** 你想針對一段特定的程式碼提問或請求修改，而不是整個檔案。

**操作方式：**
1. 在編輯器中先用滑鼠選取目標程式碼
2. 在 Copilot Chat 中輸入 `#selection`
3. AI 會自動將你選取的程式碼納入 context

**Prompt 範例：**
```
#selection
這段計算折扣的邏輯有潛在的浮點數精度問題，
請用 Decimal.js 改寫，並說明每一步的修改原因。
```

---

#### `@workspace`：啟用全專案搜尋

**使用時機：** 你的問題涉及跨多個檔案的理解，例如「專案中所有的 API 端點在哪裡」。

**前提條件：** 需要在 VS Code 中開啟整個專案資料夾（不是單一檔案），且專案已建立索引。

**操作方式：**
直接在 Copilot Chat 訊息中加入 `@workspace`，Copilot 會自動搜尋整個 codebase 以回答問題。

**Prompt 範例：**
```
@workspace 專案中所有對 UserRepository 的呼叫都有做 null check 嗎？
如果有遺漏，請列出檔案路徑和行號。
```

---

## 進階 Prompt Engineering 技巧

### Role Prompting：設定 AI 角色

透過明確指定角色，你能讓 AI 以特定的視角和標準回應，大幅提升輸出品質。

**壞 Prompt：**
```
幫我 code review 這段程式碼
```
*問題：AI 不知道你的標準是什麼，可能給出泛泛而談的評論。*

**好 Prompt：**
```
你是一位擁有 10 年 Node.js 後端開發經驗的資深工程師，
專注於效能最佳化與安全性。請以這個角色 review 以下程式碼，
重點關注：SQL Injection 風險、N+1 Query 問題、缺少的 input validation。
#file:src/controllers/OrderController.ts
```
*改善：明確角色 + 具體審查重點 = AI 能給出針對性的專業建議。*

---

### Chain of Thought：要求展示推導步驟

要求 AI 展示思考過程，可以暴露邏輯跳躍，也讓你能在中途發現方向錯誤。

**壞 Prompt：**
```
這個 bug 怎麼修？
[貼上錯誤訊息]
```
*問題：AI 直接給答案，但你不知道它是否真正理解問題根源。*

**好 Prompt：**
```
以下是一個 production 環境出現的錯誤：
[貼上錯誤訊息]

請按照以下步驟分析：
1. 首先說明這個錯誤訊息代表什麼意思
2. 列出可能的根本原因（至少 3 個）
3. 說明你認為最可能的原因及理由
4. 提出修復方案，並說明為什麼這個方案能解決問題
```
*改善：強制 AI 逐步推導，你能在第 2–3 步就發現方向是否正確。*

---

### Negative Prompting：明確告知不要做什麼

明確排除不想要的輸出，比描述想要什麼更有效率。

**壞 Prompt：**
```
幫我把這個 JavaScript 函式轉成 TypeScript
```
*問題：AI 可能到處使用 `any` 型別，等於沒有真正轉換。*

**好 Prompt：**
```
將以下 JavaScript 函式轉成嚴格的 TypeScript：
- 不要使用 `any` 型別
- 不要使用 `@ts-ignore`
- 所有函式參數和回傳值都必須有明確型別
- 如果型別推斷困難，請新增必要的 interface 定義

#selection
```
*改善：明確的負向約束讓 AI 在轉換時有清楚的底線。*

---

## 企業級指令深挖

### `@workspace` / `#codebase`

讓 AI 理解整個專案結構，適合詢問跨模組的架構問題：

```
@workspace 我們的認證流程從入口到 DB 查詢的完整路徑是什麼？
請列出涉及的所有檔案和函式呼叫順序。
```

---

### 建立 `.github/copilot-instructions.md`

這是最被低估的 Copilot 功能。這個檔案讓整個團隊的 AI 行為遵守統一規範，無需每次 Prompt 都重複說明。

**建立步驟：**

**Step 1：** 在專案根目錄建立 `.github/` 資料夾（如果不存在）
```bash
mkdir -p .github
```

**Step 2：** 建立 `copilot-instructions.md` 檔案
```bash
touch .github/copilot-instructions.md
```

**Step 3：** 填入以下最小可用範本：

```markdown
# 團隊 AI 行為規範

## 角色定義
你是一位專注於 [你的技術棧，例如：Node.js + TypeScript + PostgreSQL] 的資深後端工程師。
你熟悉本專案的架構，會遵守以下規範。

## 語言規範
- 所有程式碼註解使用繁體中文
- 變數與函式命名使用英文 camelCase
- API 回應的 error message 使用英文
- Git commit message 遵循 Conventional Commits 格式

## 禁止事項
- 不使用 `any` 型別（TypeScript）
- 不使用 `console.log` 進行 debug（改用 logger 模組）
- 不在程式碼中硬編碼 API Key 或密碼
- 不生成未經測試的 SQL 字串拼接（必須使用 parameterized query）

## 偏好風格
- 錯誤處理使用 Result type pattern（不要 throw everywhere）
- 資料庫查詢集中在 Repository layer，不在 Controller 直接查詢
- 新功能必須附上對應的 unit test
```

**生效驗證方式：**
開啟 Copilot Chat，輸入：`你現在遵守的編碼規範是什麼？`

如果 Copilot 能回答出 `copilot-instructions.md` 中的規範，代表檔案已被正確讀取。

> **注意：** VS Code 需要重新載入視窗（`Cmd+Shift+P` → `Reload Window`）才能讓新建的 instructions 檔案生效。

---

## Lab 實戰

### Lab A：建立團隊 Prompt Library

**前置條件：**
- 已安裝 VS Code 與 GitHub Copilot 擴充套件
- 已登入 GitHub Copilot 帳號（驗證：在 VS Code 右下角能看到 Copilot 圖示）

**步驟：**

1. **建立 Prompt Library 目錄結構**
   ```bash
   mkdir -p .github/prompts
   ```

2. **建立第一個 Prompt 範本：Code Review**
   建立 `.github/prompts/code-review.md`：
   ```markdown
   # Code Review Prompt

   你是一位資深工程師，請 review 以下程式碼，關注：
   - 安全性漏洞（SQL Injection、XSS、未授權存取）
   - 效能問題（N+1 Query、不必要的迴圈、記憶體洩漏）
   - 可維護性（函式長度、命名清晰度、Magic Number）

   請以條列式回應，每個問題標注嚴重程度：🔴 Critical / 🟡 Warning / 🟢 Suggestion
   ```

3. **建立第二個 Prompt 範本：Bug 分析**
   建立 `.github/prompts/bug-analysis.md`：
   ```markdown
   # Bug Analysis Prompt

   以下是一個 bug 報告，請依序：
   1. 翻譯/解釋錯誤訊息的含義
   2. 列出 3 個可能的根本原因
   3. 說明你認為最可能的原因及推理
   4. 提供修復步驟（含程式碼）
   ```

4. **測試 Prompt Library**
   在 Copilot Chat 中貼上 Bug 分析 Prompt，接著貼上一段有問題的程式碼，驗證 AI 是否按照格式回應。

**Done criteria：** `.github/prompts/` 目錄中有至少 2 個 Prompt 範本，且能成功用其引導 Copilot 輸出結構化回應。

---

### Lab B：用 Copilot Vibe Code 一個完整 MVP

**目標：** 用純 Vibe Coding 方式，在 2 小時內做出一個能跑的 Todo List API。不需要完美，只需要能動。

**情境：**
你是一個 Side Project 的獨立開發者，想快速驗證一個 Todo List 後端 API 的可行性。技術棧：Node.js + Express。不需要資料庫（用記憶體陣列即可），不需要完整測試，只要 API 能正確回應就算完成。

**步驟：**

1. **建立空白專案**
   ```bash
   mkdir todo-mvp && cd todo-mvp
   npm init -y
   npm install express
   ```

2. **開始 Vibe Coding**
   對 Copilot Chat 說：
   ```
   幫我用 Express.js 建立一個簡單的 Todo List API，
   需要支援：列出所有 todo、新增 todo、標記完成、刪除 todo。
   用記憶體陣列儲存資料（不需要資料庫）。
   把所有程式碼放在一個 index.js 檔案。
   ```

3. **迭代補強**
   不管 AI 給了什麼，繼續問：
   - 「新增 todo 時如果 title 是空字串，應該回傳什麼錯誤？」
   - 「刪除一個不存在的 todo id 時，要怎麼處理？」
   - 「幫我加一個簡單的 in-memory 搜尋功能」

4. **跑起來驗證**
   ```bash
   node index.js
   # 用 curl 或 Postman 測試每個 endpoint
   ```

5. **時間到，停下來回顧**
   設定計時器（2 小時）。時間到後，打開 `index.js`，回答這三個問題：
   - 這個 API 的 todo id 是怎麼生成的？為什麼這樣設計？
   - 如果需求改成「支援多個 user 各自的 todo list」，你知道要改哪裡嗎？
   - 三個月後一個新同事接手，他需要花多久才能理解這段程式碼？

**Done criteria：** Todo List API 能正確回應所有 CRUD 操作，且你能誠實回答上面三個問題。

> 看看你的 code，你能自信地說你完全理解每一行嗎？如果答案是「不確定」，恭喜你——你正站在 Greenfield 與 Brownfield 的分界點上。**下一章，我們來面對這個問題。**
