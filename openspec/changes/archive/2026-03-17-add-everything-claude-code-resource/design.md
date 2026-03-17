## Context

本專案是一個以 Hugo 為框架的 AI 輔助開發課程網站，使用 Hextra 主題。`site/content/resources/` 目錄已有 `commands.md`（OPSX 指令速查），採用 Markdown frontmatter + 章節標題的標準格式撰寫。

`everything-claude-code` 是一個由社群開發的 agent harness 系統（v1.8.0，Mar 2026），支援 Claude Code、Codex、OpenCode、Cursor 等 AI 工具。其 v1.3.0 起提供完整的 OpenCode Plugin 支援，包含 agents、commands 與 skills 整合。

此變更純屬靜態內容新增，不涉及程式邏輯或 Hugo 配置異動。

## Goals / Non-Goals

**Goals:**
- 在 `site/content/resources/` 新增 `everything-claude-code.md`，提供繁體中文說明
- 涵蓋：專案簡介、核心元件（Skills、Hooks、Commands、Rules、Instincts）、安裝方式、與 OpenCode 的整合步驟與使用場景
- 維持與現有 `commands.md` 一致的頁面格式（frontmatter、showToc、weight）

**Non-Goals:**
- 不修改 Hugo 主題、配置或導覽結構（`_index.md` 已自動列出同目錄頁面）
- 不實作任何程式碼整合功能
- 不翻譯 `everything-claude-code` 的原始文件

## Decisions

**決策 1：以單一 Markdown 頁面呈現**

`resources/` 目錄現有頁面均為單檔（`commands.md`），不使用子目錄。選擇單一 `everything-claude-code.md` 符合現有慣例，維持目錄結構簡潔。

替代方案：建立 `everything-claude-code/` 子目錄 + `_index.md`。拒絕原因：內容量不足以拆頁，增加複雜度無益。

**決策 2：内容結構**

頁面區塊順序：
1. 專案簡介（what & why）
2. 核心元件說明（表格 + 說明）
3. 安裝方式（Plugin 安裝 vs 手動安裝）
4. 與 OpenCode 整合（設定步驟、使用場景範例）
5. 延伸資源（GitHub 連結）

此順序從「是什麼」到「怎麼用」符合學員學習路徑。

**決策 3：weight 設為 2**

`commands.md` weight 為 1，新頁面 weight 設為 2，維持指令速查在前。

## Risks / Trade-offs

- [外部專案演進] `everything-claude-code` 版本持續更新，文件內容可能過時 → 在頁面中標注版本參考時間點（撰寫當下為 v1.8.0，Mar 2026）
- [Hugo 渲染] 頁面內含程式碼區塊，需確保 YAML frontmatter 完整，避免渲染錯誤 → 任務中加入本地 Hugo 建置驗證步驟
