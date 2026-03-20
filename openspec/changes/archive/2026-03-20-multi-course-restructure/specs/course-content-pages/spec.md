## MODIFIED Requirements

### Requirement: SDD 課程章節頁面 URL base path
SDD 課程所有章節頁面的 URL base path SHALL 為 `/sdd/`（原為 `/lessons/`）。

以下明確清單列出所有 SDD 課程章節的新舊路徑對應：

| 舊路徑 | 新路徑 |
|--------|--------|
| `/lessons/ch0-warmup/` | `/sdd/ch0-warmup/` |
| `/lessons/ch1-vibe-coding/` | `/sdd/ch1-vibe-coding/` |
| `/lessons/ch2-mvp-to-spec/` | `/sdd/ch2-mvp-to-spec/` |
| `/lessons/ch3-openspec/` | `/sdd/ch3-openspec/` |
| `/lessons/ch4-coding-agent/` | `/sdd/ch4-coding-agent/` |
| `/lessons/ch5-verify-observe/` | `/sdd/ch5-verify-observe/` |
| `/lessons/ch6-team/` | `/sdd/ch6-team/` |
| `/lessons/appendix-setup/` | `/appendix/setup/`（已提升為 top-level） |

注意：`/lessons/ch-intro-ai/` 對應的頁面已從 SDD 課程移除，不存在新路徑。

所有 SDD 課程章節的 front matter（`title`、`description`、`showToc: true`）MUST 保持不變；`weight` MUST 依照 `site-navigation` spec 中的明確清單設定。

#### Scenario: SDD 課程章節可在新路徑存取
- **WHEN** 瀏覽 `/sdd/ch0-warmup/`
- **THEN** 回應狀態 MUST 為 200，且頁面標題 MUST 包含 `ch0-warmup` 對應的章節標題

#### Scenario: 舊路徑 /lessons/ 下不再有頁面
- **WHEN** hugo build 完成後
- **THEN** `site/public/lessons/` 目錄 MUST NOT 存在

### Requirement: ch0-warmup 包含 Agent 課程交叉連結
`site/content/sdd/ch0-warmup.md` 的正文 SHALL 在開頭包含一段交叉連結提示，說明本 SDD 課程假設學生已了解 LLM、Agent 與 Coding Agent 的基礎概念，並連結至 Agent 課程。

提示區塊 MUST 使用 Hugo blockquote 格式（`>` 開頭），MUST 包含指向 `/agent/` 的 Markdown 連結。

#### Scenario: ch0-warmup 包含 Agent 課程連結
- **WHEN** 讀取 `site/content/sdd/ch0-warmup.md` 的正文
- **THEN** 正文開頭 MUST 包含指向 `/agent/` 的 Markdown 連結

### Requirement: 內部連結一致性（/lessons/ → /sdd/）
所有 `site/content/` 下的 Markdown 檔案中，指向 `/lessons/` 的內部連結 MUST 全部更新為對應的 `/sdd/` 路徑（或 `/appendix/` 路徑，如適用）。

以下明確清單列出需要更新的檔案：

| 檔案 | 需更新的連結 |
|------|------------|
| `site/content/resources/client-observability.md` | 含 `/lessons/ch5-verify-observe/` 的連結（2 處） |
| `site/content/sdd/ch4-coding-agent.md` | 含 `../appendix-setup` 的相對連結 |
| `site/content/sdd/ch0-warmup.md` | 新增的 Agent 課程交叉連結 |

#### Scenario: client-observability.md 不含 /lessons/ 連結
- **WHEN** 讀取 `site/content/resources/client-observability.md`
- **THEN** 正文 MUST NOT 包含指向 `/lessons/` 的連結
- **THEN** 正文 MUST 包含指向 `/sdd/ch5-verify-observe/` 的連結

## REMOVED Requirements

### Requirement: 導言章節（ch-intro-ai.md）
**Reason**: Model、Agent 與 Coding Agent 的基礎內容移至獨立的 Agent 課程（`site/content/agent/`），SDD 課程不再需要導言章節。
**Migration**: 相關概念請參閱 Agent 課程（`/agent/`）的 ch1–ch3。

### Requirement: 各章節內容頁面（舊版行數/內容要求沿用 /lessons/ 路徑）
**Reason**: 章節頁面路徑已從 `/lessons/` 改為 `/sdd/`，原 spec 中的檔案路徑引用需更新。
**Migration**: 原 `site/content/lessons/ch*.md` 的內容完整性要求不變，僅路徑前綴改為 `site/content/sdd/ch*.md`。
