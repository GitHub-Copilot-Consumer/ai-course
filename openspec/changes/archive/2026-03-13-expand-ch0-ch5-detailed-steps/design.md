## Context

課程網站使用 Hugo 靜態網站生成，現有 ch0～ch5 及導言章節存放於 `site/content/lessons/`。每個章節目前只有 20–35 行的概念摘要，缺乏具體的操作步驟、指令範例與 Lab 引導。此次變更純為內容擴充，不涉及任何 Hugo 設定、主題、導航或程式碼邏輯的修改。

## Goals / Non-Goals

**Goals:**
- 將 `site/content/lessons/ch0-warmup.md` ～ `ch5-team.md` 共 6 個 Markdown 檔案，由概念摘要擴充為含操作步驟的完整教學文件
- 每章節補充：前置條件、逐步指令（含預期輸出）、範例對比（壞 vs 好）、Lab 完整流程
- 保持 Hugo front matter 格式不變（title、weight、description、showToc）
- 內容語言維持繁體中文

**Non-Goals:**
- 不修改 Hugo 設定（`config.yaml`）
- 不修改 `hugo/` 目錄下任何檔案
- 不新增頁面或變更導航結構
- 不修改佈景主題或 layout
- 不新增 Lab 檔案或程式碼範例資產

## Decisions

### 決策 1：只修改 `site/content/lessons/` 下的檔案，不動 `hugo/content/`

**理由：** `site/content/lessons/` 是目前線上版本使用的路徑（見 `site/config.yaml`），`hugo/` 目錄為另一套 Hugo 設定的平行目錄，兩者獨立運作。只修改 `site/` 下的檔案可確保不破壞現有部署。

### 決策 2：保留 front matter 原有欄位，僅擴充正文

**理由：** `showToc: true` 已啟用目錄自動生成，只要正文使用標準 `##`、`###` 標題，Hugo 即可自動產生側邊目錄，無需額外配置。

### 決策 3：每章節採用統一的內容結構

每章節正文結構：
1. 引言（blockquote 保留，補充背景說明）
2. 學習目標（本章結束後你將能夠...）
3. 核心概念各節（原有 `##` 節，大幅擴充）
4. Lab 實戰（逐步操作指引，含前置條件、步驟、預期結果）

**理由：** 統一結構讓學員建立閱讀節奏，也方便日後維護。

### 決策 4：指令範例使用 code block，輸出範例使用縮排 code block

```bash
# 指令
openspec init
```
```
# 預期輸出
✔ Created openspec/ directory
```

**理由：** Markdown 標準寫法，Hugo Book 主題支援 syntax highlighting，提升可讀性。

## Risks / Trade-offs

- [篇幅增長] 每章從 ~30 行增至 150–300 行 → 對讀者而言資訊量大增；緩解：每節有清楚標題，ToC 自動生成可快速導覽
- [內容時效性] 工具版本更新可能導致指令過時 → 緩解：在 Lab 前置條件說明版本需求，方便日後更新
- [Hugo 建置] 大量 Markdown 擴充後需確認 Hugo 能正常建置 → 緩解：tasks 中加入 `hugo build` 驗證步驟
