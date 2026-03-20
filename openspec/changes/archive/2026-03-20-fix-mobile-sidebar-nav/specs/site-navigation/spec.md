## MODIFIED Requirements

### Requirement: 課程 sidebar 排序規則
課程頁面的 sidebar 順序 SHALL 由各頁面 front matter 中的 `weight` 欄位控制，且所有課程頁面的 `weight` 值 MUST 為非零正整數（≥ 1）或負整數，不得使用 `0`，以避免 Hugo 將其視為未設定而排至最後。

此排序規則 MUST 同時適用於桌機版（`>= 768px`）與行動版（`< 768px`）的 sidebar 顯示。

課程頁面的 `weight` 值 MUST 依照以下明確清單設定：

| 檔案 | weight |
|------|--------|
| `site/content/lessons/ch-intro-ai.md` | `-1` |
| `site/content/lessons/ch0-warmup.md` | `1` |
| `site/content/lessons/ch1-vibe-coding.md` | `2` |
| `site/content/lessons/ch2-mvp-to-spec.md` | `3` |
| `site/content/lessons/ch3-openspec.md` | `4` |
| `site/content/lessons/ch4-coding-agent.md` | `5` |
| `site/content/lessons/ch5-verify-observe.md` | `6` |
| `site/content/lessons/ch6-team.md` | `7` |
| `site/content/lessons/appendix-setup.md` | `8` |

#### Scenario: sidebar 顯示順序正確（桌機版）
- **WHEN** 瀏覽 `/lessons/` 頁面，視窗寬度 `>= 768px`
- **THEN** 左側 sidebar MUST 依 weight 順序顯示所有章節連結

#### Scenario: sidebar 顯示順序正確（行動版）
- **WHEN** 瀏覽 `/lessons/` 頁面，視窗寬度 `< 768px`，使用者展開 sidebar
- **THEN** sidebar MUST 依 weight 順序顯示所有章節連結

#### Scenario: ch0-warmup 不排在最後
- **WHEN** 讀取 `site/content/lessons/ch0-warmup.md` 的 front matter
- **THEN** `weight` MUST 為 `1`（非 `0`）
