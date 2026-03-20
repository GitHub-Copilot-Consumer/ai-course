## Context

課程的 `site/content/resources/` 目錄目前有三個資源頁面：
- `commands.md`（weight: 1）—— OPSX 指令速查
- `everything-claude-code.md`（weight: 2）—— ECC 框架介紹
- `client-observability.md`（weight: 10）—— Client 端可觀測性延伸閱讀

這次新增的頁面將補足「Anthropic 官方 skills 生態」這個面向。頁面使用 Hugo Markdown 格式，Hextra 主題渲染，支援 `showToc: true` 自動產生目錄。

現有頁面都以標準 Hugo frontmatter 開頭，內容以 `##` 及 `###` 為主要章節層級，表格用於比較資訊，code block 用於展示指令。新頁面遵循相同慣例。

## Goals / Non-Goals

**Goals:**
- 新增一個獨立的資源頁面，完整介紹 Agent Skills 標準、官方 skills 倉庫，以及安裝與共用機制
- 頁面結構清晰、可獨立閱讀，不依賴 ECC 頁面的前置知識
- 使用繁體中文撰寫，與課程語言一致

**Non-Goals:**
- 不修改現有頁面
- 不介紹所有 17 個官方 skills 的詳細用法（僅分類列表）
- 不涵蓋 Claude.ai 端的 skills 使用（聚焦 coding agent 工具）
- 不建立對應的 spec 測試（純靜態內容頁面，無互動邏輯）

## Decisions

### 頁面位置與命名

**決策**：`site/content/resources/agent-skills-standard.md`，weight 設為 3。

**理由**：放在 ECC 頁面（weight: 2）之後，讓學員先了解社群完整框架，再了解官方精選 skills，形成由廣入深的學習路徑。名稱 `agent-skills-standard` 明確反映 agentskills.io 開放標準的主題。

### 內容結構

**決策**：五大章節：
1. Agent Skills 開放標準（背景、支援工具）
2. Anthropic 官方 Skills 倉庫（17 個 skills 分類表）
3. 安裝方式（Plugin marketplace + 手動安裝）
4. OpenCode 共用路徑機制（6 條搜尋路徑圖解）
5. 與 ECC 的定位差異（比較表）

**理由**：從「是什麼」→「有哪些」→「怎麼裝」→「怎麼用」→「跟 ECC 什麼關係」的邏輯順序，對應學員在課程中的認知進展。

### 不建立對應 spec 檔案

**決策**：此 change 不在 `openspec/specs/` 下建立 `agent-skills-standard-resource/spec.md`。

**理由**：此頁面是純靜態文件內容，沒有程式邏輯、API 或互動行為，spec 的價值主要在於描述功能行為需求。文件頁面的「需求」直接在 tasks.md 中以驗收條件列出即可。

## Risks / Trade-offs

- **官方 skills 資訊可能過時** → 在頁面底部標註最後驗證日期，並提供 GitHub 連結讓學員自行確認最新狀態
- **Plugin marketplace 指令格式可能隨版本變動** → 以官方 README 為準，在頁面說明「以官方倉庫為準」
- **agentskills.io 支援工具清單會持續增加** → 頁面列出代表性工具即可，不求完整列舉
