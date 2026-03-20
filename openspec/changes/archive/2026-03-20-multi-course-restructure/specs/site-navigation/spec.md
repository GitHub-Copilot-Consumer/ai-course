## MODIFIED Requirements

### Requirement: 主選單導覽設定
系統 SHALL 在 `site/config.yaml` 的 `menu.main` 中設定以下明確的導覽項目清單：

| 名稱 | URL | Weight |
|------|-----|--------|
| SDD 實戰攻略 | `/sdd/` | 10 |
| Agent 整合與自訂擴展 | `/agent/` | 20 |
| 附錄 | `/appendix/` | 30 |
| 相關資源 | `/resources/` | 40 |

導覽項目 MUST 以 `weight` 欄位控制顯示順序（數字小者優先）。

#### Scenario: 導覽選單包含四個項目
- **WHEN** 讀取 `site/config.yaml` 的 `menu.main` 區塊
- **THEN** MUST 包含 url 分別為 `/sdd/`、`/agent/`、`/appendix/`、`/resources/` 的四個項目
- **THEN** MUST NOT 包含 url 為 `/lessons/` 的項目

### Requirement: Sidebar 選單設定
系統 SHALL 在 `site/config.yaml` 的 `menu.sidebar` 中設定以下明確的側邊欄項目清單：

| 名稱 | URL | Weight |
|------|-----|--------|
| 附錄 | `/appendix/` | 5 |
| 相關資源 | `/resources/` | 10 |

#### Scenario: Sidebar 選單包含附錄與相關資源
- **WHEN** 讀取 `site/config.yaml` 的 `menu.sidebar` 區塊
- **THEN** MUST 包含 url 分別為 `/appendix/` 與 `/resources/` 的兩個項目

### Requirement: 課程 sidebar 排序規則（SDD 課程）
SDD 課程頁面的 sidebar 順序 SHALL 由各頁面 front matter 中的 `weight` 欄位控制，且所有 SDD 課程頁面的 `weight` 值 MUST 為非零正整數（≥ 1），不得使用 `0`。

SDD 課程頁面（`site/content/sdd/`）的 `weight` 值 MUST 依照以下明確清單設定：

| 檔案 | weight |
|------|--------|
| `site/content/sdd/ch0-warmup.md` | `1` |
| `site/content/sdd/ch1-vibe-coding.md` | `2` |
| `site/content/sdd/ch2-mvp-to-spec.md` | `3` |
| `site/content/sdd/ch3-openspec.md` | `4` |
| `site/content/sdd/ch4-coding-agent.md` | `5` |
| `site/content/sdd/ch5-verify-observe.md` | `6` |
| `site/content/sdd/ch6-team.md` | `7` |

注意：`ch-intro-ai.md`（原 weight: -1）已從 SDD 課程移除，不再存在於 `site/content/sdd/`。

#### Scenario: SDD sidebar 顯示順序正確（桌機版）
- **WHEN** 瀏覽 `/sdd/` 頁面，視窗寬度 `>= 768px`
- **THEN** 左側 sidebar MUST 依 weight 順序顯示 7 個章節連結（ch0 至 ch6）

#### Scenario: SDD sidebar 顯示順序正確（行動版）
- **WHEN** 瀏覽 `/sdd/` 頁面，視窗寬度 `< 768px`，使用者展開 sidebar
- **THEN** sidebar MUST 依 weight 順序顯示 7 個章節連結（ch0 至 ch6）

#### Scenario: ch-intro-ai 不出現在 SDD sidebar
- **WHEN** 瀏覽 `/sdd/` 頁面
- **THEN** sidebar MUST NOT 包含「導言：理解 Model、Agent 與 Coding Agent」的連結

## REMOVED Requirements

### Requirement: 首頁呈現章節導覽連結（舊版）
**Reason**: 首頁已從單課程章節列表改為多課程選擇頁，章節連結改由各課程 section 的 sidebar 提供。
**Migration**: 章節連結可透過 `/sdd/` 或 `/agent/` section 的 sidebar 導航取得。
