---
title: "0. 課前暖身：AI 輔助開發的現況與痛點"
weight: 1
description: 建立共同語言，理解為何單純的「對話式 AI」已不足以應對企業級開發。
showToc: true
---

> 建立共同語言，理解為何單純的「對話式 AI」已不足以應對企業級開發。

## 學習目標

本章結束後，你將能夠：

- **辨識** AI 輔助開發的三個演進階段，並說明各階段的代表工具與限制
- **描述** 企業導入對話式 AI 開發工具後常見的三大痛點，以及背後的根本原因
- **理解** 本課程的核心目標：從「讓 AI 幫我寫 Code」升級為「讓 AI 按照規格交付 Code」，並說明這個升級解決了哪些問題

---

## AI 開發三階段演進

AI 輔助開發不是一夕之間出現的。從 2021 年至今，工具能力已經歷三次明顯的質變：

### 階段一：自動補全 (Autocomplete)

**代表工具：** GitHub Copilot（2021 年推出）、Tabnine

**典型使用場景：**
開發者在 IDE 中打字，AI 根據目前游標上下文預測並補全接下來的程式碼，類似強化版的智慧 IntelliSense。

```
// 開發者輸入函式開頭
function calculateDiscount(price, memberLevel) {
    // AI 自動補全剩餘邏輯
    if (memberLevel === 'gold') return price * 0.8;
    if (memberLevel === 'silver') return price * 0.9;
    return price;
}
```

**主要限制：**
- 只能看到游標附近的程式碼，無法理解跨檔案的系統設計
- 補全的是「語法正確」的程式碼，但不保證符合業務邏輯
- 無法主動提問，完全被動回應開發者的輸入

---

### 階段二：對話式生成 (Chat)

**代表工具：** GitHub Copilot Chat、ChatGPT、Claude

**典型使用場景：**
開發者用自然語言描述需求，AI 生成完整的程式碼片段、解釋錯誤訊息、回答技術問題。

```
開發者：幫我寫一個 Express.js 的 JWT 驗證 middleware

AI：好的，以下是實作...
[生成 50 行 middleware 程式碼]
```

**主要限制：**
- **Context 短暫性：** 每次新對話都是全新開始，AI 不記得上週討論的架構決策
- **輸出不穩定：** 同樣的問題不同時間問，可能得到風格迥異的答案
- **需求無法追溯：** 所有討論只存在於 Chat History，無法與程式碼版本對應

---

### 階段三：規格驅動生成 (Spec-Driven)

**代表工具：** OpenCode + OpenSpec、GitHub Copilot Workspace（beta）

**典型使用場景：**
開發者先撰寫規格文件（What），AI 以規格為依據生成程式碼、驗證實作是否符合需求、並在完成後歸檔規格。

```
openspec new change "add-jwt-auth"
# AI 先產生 proposal.md、specs/、design.md、tasks.md
# 然後依 tasks.md 逐步實作，每步都能對照 spec 驗證
openspec verify --change "add-jwt-auth"
# ✔ Implementation matches spec: 5/5 requirements satisfied
```

**解決的根本問題：**
規格作為「單一事實來源」，開發、驗證、歸檔全程可追溯，不再依賴易逝的 Chat History。

---

## 常見災難現場

以下三個場景，在企業導入 AI 開發工具後幾乎普遍發生：

### 災難一：代碼可讀性低

**具體情境：**
Sprint Review 前一天，工程師用 Copilot Chat 快速生成了一個訂單計算模組。隔天 Code Review 時，沒有人能解釋這段程式碼為什麼這樣寫——連寫的人自己也不確定，因為他只是「讓 AI 生成，測試過了就合進去」。三個月後需求改動，沒有人敢動這段程式碼。

**根本原因：**
AI 生成的程式碼缺乏背後的設計意圖（Design Intent）。沒有記錄「為何這樣設計」，只有程式碼本身。

**解法方向：**
在實作前先產生 `design.md`（記錄設計決策與取捨），讓程式碼的「為什麼」有所依據。即便日後改動，也能從設計文件理解原始意圖。

---

### 災難二：輸出不穩定

**具體情境：**
團隊建立了一個「用 AI 生成 API 端點」的標準流程，但不同工程師、不同時間使用相同 Prompt，得到的程式碼風格差異極大：有的用 async/await，有的用 Promise chain；有的用 class，有的用 function；錯誤處理方式也各不相同。Code Review 花了大量時間在風格統一上。

**根本原因：**
語言模型的輸出本質上是機率抽樣（見導言章節），加上每次 Chat 的 Context 不同，輸出的「風格自由度」很高。

**解法方向：**
透過 `.github/copilot-instructions.md`（ch1 會詳細介紹）或 OpenSpec 的 `context` 設定，在每次 AI 生成前注入團隊的技術規範，讓 AI 在明確的約束條件下生成程式碼。

---

### 災難三：需求流失

**具體情境：**
Product Manager 在 Slack 討論了新功能需求，Architect 在 Copilot Chat 確認了技術可行性，工程師在另一個 Chat 視窗開始實作。三週後需求變動，沒有人記得當初為什麼做了某個設計選擇。查找 Slack 和 Chat History 花了半天，最後還是找不到關鍵的決策脈絡。

**根本原因：**
需求、設計、實作存在於三個互不相連的平台（Slack / Chat / Git），沒有形成「可追溯的鏈條」。

**解法方向：**
OpenSpec 的 `changes/` 目錄作為每個功能的「工作空間」，從提案（proposal）到規格（specs）到設計（design）到任務（tasks），全程儲存在 Git 倉庫中，與程式碼版本一同管理，永遠可以找到「當初為什麼這樣做」。

---

## 課程核心目標

從「讓 AI 幫我寫 Code」升級為「讓 AI 按照規格交付 Code」。

這個升級不是放棄 AI 的創造力，而是為 AI 的自主行動建立**可預測的邊界**：

| 升級前 | 升級後 |
|--------|--------|
| 需求口頭討論，存在 Chat | 需求寫成 proposal.md，存入 Git |
| AI 自由發揮生成程式碼 | AI 依 tasks.md 逐步實作 |
| 「感覺差不多對了」就合進去 | `openspec verify` 確認符合 spec |
| 完成後無從追溯 | `openspec archive` 歸檔，永久可查 |
