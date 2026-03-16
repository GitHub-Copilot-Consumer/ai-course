# ch2-detailed-content Specification

## Purpose

TBD - created from change 'expand-ch0-ch5-detailed-steps'.

## Requirements

### Requirement: ch2 包含 TDD vs SDD 對比說明
`site/content/lessons/ch2-sdd.md` SHALL 包含 TDD 與 SDD 的對比段落，說明：
- TDD 的核心流程（紅燈-綠燈-重構）
- SDD 的核心流程（Spec → Apply → Verify → Archive）
- 兩者各自的適用場景與限制
- 以表格形式呈現比較（至少 4 個維度）

#### Scenario: TDD vs SDD 對比表格存在
- **WHEN** 讀取 `site/content/lessons/ch2-sdd.md`
- **THEN** 正文 MUST 包含 Markdown 表格，且表格 MUST 同時包含 `TDD` 與 `SDD` 欄位或列

### Requirement: ch2 包含 OpenSpec 初始化指令步驟
`site/content/lessons/ch2-sdd.md` 的 OpenSpec 相關段落 SHALL 包含以下初始化步驟：
1. 安裝指令（`npm install -g @fission-ai/openspec`）與版本確認指令
2. 在新專案執行 `openspec init` 的步驟
3. 初始化後產生的目錄結構說明（`openspec/specs/`、`openspec/changes/`）
4. 每步驟 MUST 附上預期輸出的 code block

#### Scenario: 初始化步驟含安裝指令與預期輸出
- **WHEN** 讀取 `site/content/lessons/ch2-sdd.md`
- **THEN** 正文 MUST 包含 `npm install -g @fission-ai/openspec` 指令，且該指令後方 MUST 有對應預期輸出的 code block

### Requirement: ch2 包含與 CI/CD 整合的具體設定
`site/content/lessons/ch2-sdd.md` 的「與現有流程整合」段落 SHALL 補充 GitHub Actions 整合範本：
- 一個最小可用的 `.github/workflows/openspec-validate.yml` 範本（code block）
- 說明在哪個事件（push/PR）觸發
- 說明 `openspec validate` 失敗時的行為

#### Scenario: CI/CD 整合含 GitHub Actions 範本
- **WHEN** 讀取 `site/content/lessons/ch2-sdd.md`
- **THEN** 正文 MUST 包含 `openspec-validate.yml` 的 code block 且包含 `on:` 觸發條件
