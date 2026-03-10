## Context

課程網站使用 Hugo 靜態網站生成器，章節頁面位於 `hugo/content/chapters/`，以 front matter `weight` 欄位控制排序。現有章節 ch0~ch5 的 weight 分別為 0~5。本次新增一個導言章節，須排在 ch0 之前，且不改動任何現有章節檔案。

## Goals / Non-Goals

**Goals:**
- 新增 `hugo/content/chapters/ch-intro-ai.md`（weight: -1）作為課程導言
- 章節內容涵蓋 LLM 基礎、Agent 架構（含 ASCII 圖解）、Coding Agent 特性三大部分
- 更新 `index.md` 課程大綱，反映新章節的存在
- 所有繁體中文，風格與現有章節一致

**Non-Goals:**
- 不修改 ch0~ch5 任何現有章節
- 不調整現有章節的 weight 或編號
- 不新增後端邏輯、Hugo shortcodes 或自訂 layouts
- 不修改 Hugo config 或主題設定

## Decisions

### 決定 1：使用 weight: -1 而非重新編號

**選擇：** 新章節 front matter 設定 `weight: -1`，現有 ch0~ch5 的 weight 0~5 不變。

**理由：** 修改現有 6 個章節檔案的編號風險高（容易遺漏），且 Hugo 的 weight 欄位原生支援負值排序，weight: -1 能確保新章節永遠排在最前。

**替代方案：** 重新編號（新 = ch0，舊 ch0 = ch1 ... 舊 ch5 = ch6）— 捨棄，因為需要修改 6 個既有檔案，且 weight 排序已足夠。

### 決定 2：章節名稱為 `ch-intro-ai.md`，不帶數字前綴

**選擇：** 檔名 `ch-intro-ai.md`，title 為「導言：理解 Model、Agent 與 Coding Agent」。

**理由：** 使用「導言」而非「Ch0.5」或「第 -1 章」等奇怪編號，語意清晰，且與 weight 排序機制解耦。

### 決定 3：以 ASCII 圖解呈現 Agent 架構

**選擇：** 在 Agent 架構段落使用 ASCII art（如 `┌─┐ │ └─┘`）而非圖片或外部連結。

**理由：** Hugo PaperMod 主題以 Markdown 呈現，ASCII 圖在 monospace 環境下顯示穩定，不需額外靜態資源，且與 OpenCode 課程風格（CLI 工具）一致。

## Risks / Trade-offs

- **[Risk] ASCII 圖在行動裝置上可能跑版** → 使用 code block（\`\`\`）包住 ASCII 圖，確保 monospace 字型渲染
- **[Risk] `index.md` 大綱與 Hugo 頁面內容不同步** → tasks 中明確要求同步更新兩個地方

## Migration Plan

本次為純內容新增，無需 migration。直接 `hugo server -s hugo/` 即可本機預覽。
