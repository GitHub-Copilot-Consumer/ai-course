## MODIFIED Requirements

### Requirement: 各章節內容頁面
系統 SHALL 維護以下明確命名的章節頁面（同 existing spec），且每個頁面正文 MUST 包含對應章節的完整內容，具體要求如下：

| 檔案路徑 | 最小行數 | 必含內容 |
|----------|---------|---------|
| `site/content/lessons/ch0-warmup.md` | 100 行 | 學習目標段落、三階段演進各含代表工具、災難現場含解法 |
| `site/content/lessons/ch1-copilot.md` | 150 行 | Context 控制操作說明、Prompt 壞/好對比、copilot-instructions.md 範本、Lab 逐步步驟 |
| `site/content/lessons/ch2-sdd.md` | 130 行 | TDD vs SDD 對比表格、openspec 初始化步驟含輸出、CI/CD 整合 GitHub Actions 範本 |
| `site/content/lessons/ch3-openspec.md` | 200 行 | 每個 OPSX 指令的輸出範例、環境初始化目錄結構圖、Lab A 完整 5 步驟、多工並行示意 |
| `site/content/lessons/ch4-opencode.md` | 150 行 | 安裝步驟含 API Key 設定、Ollama 安裝流程、Plan/Build 模式切換、Lab 離線步驟 |
| `site/content/lessons/ch5-team.md` | 150 行 | 模型決策樹流程圖、openspec 目錄 tree 格式、Roadmap 含負責角色、人機協作表格 |

每個章節頁面的 front matter MUST 保持不變（`title`、`weight`、`description`、`showToc: true`）。

#### Scenario: 章節頁面內容完整性 - ch3
- **WHEN** 讀取 `site/content/lessons/ch3-openspec.md`
- **THEN** 正文 MUST 包含 `/opsx:apply` 指令的 code block 輸出範例，且總行數 MUST 不少於 200 行

#### Scenario: 章節頁面 front matter 不變
- **WHEN** 讀取任意一個 `site/content/lessons/ch*.md`
- **THEN** front matter MUST 包含原有 `title`、`weight`、`description`、`showToc: true` 欄位，且值與原本一致
