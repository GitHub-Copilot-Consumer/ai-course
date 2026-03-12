---
title: "1. GitHub Copilot Chat：從「對話」到「生產力」"
weight: 1
description: 掌握 AI 工具的底層邏輯與進階指令，提升對話精準度。
showToc: true
---

> 掌握 AI 工具的底層邏輯與進階指令，提升對話精準度。

## 學習目標

本章結束後，你將能夠：

- **操作** Copilot Chat 的三種 Context 控制方式（`#file`、`#selection`、`@workspace`），並在正確時機使用它們
- **撰寫** 符合 Role Prompting、Chain of Thought、Negative Prompting 的進階 Prompt
- **建立** 團隊共用的 `.github/copilot-instructions.md`，讓 AI 遵守團隊技術規範
- **完成** Prompt Library 的初版，並練習用精準 Prompt 修復 Bug

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

### Lab B：用精準 Prompt 修復 Bug

**Bug 情境：**
以下程式碼在計算含稅價格時，對某些數字會產生浮點數誤差（例如 `99.99 * 1.05 = 104.98950000000001`）：

```javascript
function calculatePriceWithTax(price, taxRate) {
    return price * (1 + taxRate);
}

// 測試
console.log(calculatePriceWithTax(99.99, 0.05)); // 應該是 104.99，但得到 104.98950000000001
```

**步驟：**

1. **錯誤的做法（不要這樣做）：**
   直接把錯誤訊息貼給 AI 說「這個程式碼有 bug 請修復」。

2. **正確的做法：使用精準 Prompt**
   ```
   你是一位專注於金融計算的 JavaScript 工程師。

   以下函式在處理浮點數乘法時有精度問題：
   [貼上上面的程式碼]

   請：
   1. 解釋為什麼 JavaScript 的浮點數運算會有這個問題（底層原因）
   2. 提供至少 2 種修復方案（例如：使用 toFixed、使用 Decimal.js 函式庫）
   3. 說明在金融計算場景下，你推薦哪種方案及原因
   4. 不要使用 Math.round 作為解法（這樣會遮蔽問題而非真正修復）
   ```

3. **比較兩種 Prompt 的輸出差異**，記錄：
   - 方法 1（直接貼 bug）的回答品質
   - 方法 2（結構化 Prompt）的回答品質
   - 你從哪個回答中學到更多？

**Done criteria：** 能說明為什麼精準 Prompt 比直接貼 bug 更有效，並將這個 Prompt 結構加入你的 Prompt Library。
