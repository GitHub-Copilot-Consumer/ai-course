## ADDED Requirements

### Requirement: 多課程平台結構
網站 SHALL 以 Hugo 的多 section 機制承載多門獨立課程，每門課程為 `site/content/` 下的獨立 top-level section，各自擁有獨立的 sidebar 導航。

網站 MUST 包含以下明確的 top-level sections：

| Section 目錄 | URL prefix | 課程/用途 |
|-------------|------------|----------|
| `site/content/sdd/` | `/sdd/` | 從 AI 輔助到規格驅動 (SDD) 實戰攻略 |
| `site/content/agent/` | `/agent/` | Agent 整合與自訂擴展 |
| `site/content/appendix/` | `/appendix/` | 附錄（兩門課程共用） |
| `site/content/resources/` | `/resources/` | 相關資源（維持現狀） |

每個課程 section 的 `_index.md` MUST 包含 `cascade: type: docs`，使該 section 下所有頁面繼承 Hextra docs layout（sidebar、TOC、breadcrumb）。

#### Scenario: 各 section 使用 docs layout
- **WHEN** 讀取 `site/content/sdd/_index.md` 與 `site/content/agent/_index.md`
- **THEN** 兩個檔案的 front matter MUST 包含 `cascade:\n  type: docs`

#### Scenario: sdd section 包含正確的章節檔案
- **WHEN** 列出 `site/content/sdd/` 目錄下的 `.md` 檔案
- **THEN** MUST 包含以下明確清單中的所有檔案，且 MUST NOT 包含 `ch-intro-ai.md`：
  - `_index.md`
  - `ch0-warmup.md`
  - `ch1-vibe-coding.md`
  - `ch2-mvp-to-spec.md`
  - `ch3-openspec.md`
  - `ch4-coding-agent.md`
  - `ch5-verify-observe.md`
  - `ch6-team.md`

#### Scenario: agent section 存在且設定正確
- **WHEN** 讀取 `site/content/agent/_index.md`
- **THEN** 檔案 MUST 存在，且 front matter MUST 包含 `cascade:\n  type: docs`
