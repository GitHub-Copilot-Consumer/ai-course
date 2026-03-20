## MODIFIED Requirements

### Requirement: 首頁多課程選擇頁
系統 SHALL 在首頁（`site/content/_index.md`）正文中以兩個明確的課程區塊列出所有課程，每個區塊 MUST 包含課程標題（連結至課程 section）與一行課程描述。

首頁 MUST 包含以下明確的內容結構：

**課程一區塊**：
- 標題連結：`[從 AI 輔助到規格驅動 (SDD) 實戰攻略](/sdd/)`
- 描述：說明 SDD 課程的主題（Vibe Coding → 規格驅動開發）

**課程二區塊**：
- 標題連結：`[Agent 整合與自訂擴展](/agent/)`
- 描述：說明 Agent 課程的主題（LLM 原理、Agent 架構、OpenCode 自訂擴展）

**底部連結**：
- `[附錄：工具安裝與環境設定](/appendix/setup/)`
- `[相關資源](/resources/)`

首頁 front matter 的 `title` SHALL 為 `AI 課程平台`。

#### Scenario: 首頁包含兩門課程的連結
- **WHEN** 讀取 `site/content/_index.md`
- **THEN** 正文 MUST 包含指向 `/sdd/` 的 Markdown 連結
- **THEN** 正文 MUST 包含指向 `/agent/` 的 Markdown 連結

#### Scenario: 首頁不再包含舊版 /lessons/ 連結
- **WHEN** 讀取 `site/content/_index.md`
- **THEN** 正文 MUST NOT 包含任何指向 `/lessons/` 的連結

#### Scenario: 首頁包含附錄連結
- **WHEN** 讀取 `site/content/_index.md`
- **THEN** 正文 MUST 包含指向 `/appendix/setup/` 的 Markdown 連結

#### Scenario: 首頁 title 更新
- **WHEN** 讀取 `site/content/_index.md` 的 front matter
- **THEN** `title` MUST 為 `AI 課程平台`

## REMOVED Requirements

### Requirement: 首頁課程章節索引（舊版靜態清單）
**Reason**: 首頁不再維護單一課程的 9 個章節靜態連結清單，改為多課程選擇頁格式。
**Migration**: 原 `/lessons/ch*/` 連結改為 `/sdd/ch*/`，可透過 SDD 課程的 sidebar 或 `/sdd/` section 頁面取得完整章節列表。
