## ADDED Requirements

### Requirement: 附錄 top-level section 結構
附錄 SHALL 作為獨立的 top-level Hugo section，路徑為 `site/content/appendix/`（URL: `/appendix/`），與 `sdd/`、`agent/`、`resources/` 並列。

`site/content/appendix/` MUST 包含以下明確清單中的檔案：

| 檔案 | URL | 說明 |
|------|-----|------|
| `_index.md` | `/appendix/` | 附錄 section 首頁 |
| `setup.md` | `/appendix/setup/` | 工具安裝與環境設定（從 SDD 課程搬移） |

`_index.md` 的 front matter MUST 包含：
- `title`: `附錄`
- `cascade:\n  type: docs`

`setup.md` 的 front matter MUST 保留原 `appendix-setup.md` 的所有內容，`weight` MUST 為 `1`。

#### Scenario: 附錄 section 目錄存在且包含正確檔案
- **WHEN** 列出 `site/content/appendix/` 目錄
- **THEN** MUST 包含 `_index.md` 與 `setup.md` 兩個檔案

#### Scenario: 附錄首頁 title 正確
- **WHEN** 讀取 `site/content/appendix/_index.md` 的 front matter
- **THEN** `title` MUST 為 `附錄`，且 MUST 包含 `cascade:\n  type: docs`

#### Scenario: setup.md 原內容完整保留
- **WHEN** 讀取 `site/content/appendix/setup.md`
- **THEN** 正文內容 MUST 與原 `site/content/sdd/appendix-setup.md`（遷移前）相同，`weight` MUST 為 `1`

## REMOVED Requirements

### Requirement: SDD 課程內附錄頁面
**Reason**: 附錄已提升為獨立 top-level section，不再歸屬於 SDD 課程的 section 下。
**Migration**: 使用新路徑 `/appendix/setup/` 取代原 `/sdd/appendix-setup/`（或舊有的 `/lessons/appendix-setup/`）。
