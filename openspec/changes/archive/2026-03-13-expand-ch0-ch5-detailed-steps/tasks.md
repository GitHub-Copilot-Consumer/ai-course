## 1. ch0 暖身章節擴充

- [x] 1.1 在 `site/content/lessons/ch0-warmup.md` 新增「學習目標」段落（至少 3 個條列項目，列在引言下方）
- [x] 1.2 擴充「AI 開發三階段演進」段落：為 Autocomplete、Chat、Spec-Driven 各補充代表工具、典型場景與主要限制
- [x] 1.3 擴充「常見災難現場」段落：為每個問題補充具體情境描述與解法建議
- [x] 1.4 git commit：`docs(lessons): expand ch0 warmup with learning goals and detailed evolution stages`

## 2. ch1 Copilot 章節擴充

- [x] 2.1 擴充「Copilot 運作心智模型」：補充 `#file`、`#selection`、`@workspace` 各自的操作步驟與 Prompt 範例
- [x] 2.2 擴充「進階 Prompt Engineering 技巧」：為 Role Prompting、Chain of Thought、Negative Prompting 各補充壞/好 Prompt 對比（code block 格式）
- [x] 2.3 擴充「企業級指令深挖」：補充 `.github/copilot-instructions.md` 建立步驟（3 步）、最小可用範本（含角色定義、語言規範、禁止事項）、生效驗證方式
- [x] 2.4 擴充「Lab 實戰」：Lab A 建立 Prompt Library 的逐步步驟（至少 4 步）、Lab B 精準 Prompt 修復 Bug 的逐步步驟（含具體 Bug 情境）、每個 Lab 的 Done criteria
- [x] 2.5 git commit：`docs(lessons): expand ch1 copilot with context controls, prompt examples, and lab guides`

## 3. ch2 SDD 章節擴充

- [x] 3.1 新增「TDD vs SDD 對比」段落：以表格（至少 4 個維度）呈現兩者比較，說明各自核心流程與適用場景
- [x] 3.2 擴充「環境初始化」段落：補充 `npm install -g @fission-ai/openspec` 安裝步驟、`openspec init` 執行步驟、初始化後目錄結構說明，每步含預期輸出
- [x] 3.3 擴充「與現有流程整合」段落：補充 `.github/workflows/openspec-validate.yml` GitHub Actions 範本（code block），說明觸發條件與失敗行為
- [x] 3.4 git commit：`docs(lessons): expand ch2 sdd with tdd comparison, init steps, and CI integration template`

## 4. ch3 OpenSpec 章節擴充

- [x] 4.1 擴充「3.1 環境初始化」：補充系統需求、安裝步驟含預期輸出、`openspec/` 目錄結構 tree 圖、Artifacts 依賴關係 ASCII 圖
- [x] 4.2 擴充「3.2 OPSX 核心指令詳解」：為 `/opsx:explore`、`/opsx:new`、`/opsx:ff`、`/opsx:apply`、`/opsx:verify`、`/opsx:archive` 各補充完整語法、前置條件、終端機輸出範例（code block）、常見錯誤與解法
- [x] 4.3 擴充「3.3 多工並行」：補充兩個 change 同時存在的目錄結構示意（code block）、context 切換操作說明、互不干擾機制說明
- [x] 4.4 擴充「3.4 Lab 練習」：Lab A 展開為完整 5 步驟（new→ff→apply→verify→archive，每步含預期輸出）；Lab B 展開為 explore 先行再 apply 的完整流程
- [x] 4.5 git commit：`docs(lessons): expand ch3 openspec with full command examples, init guide, and complete lab steps`

## 5. ch4 OpenCode 章節擴充

- [x] 5.1 新增「安裝與初始設定」段落：補充 macOS/Linux 安裝指令、首次啟動步驟、API Key 設定方式、驗證安裝成功的指令與預期輸出
- [x] 5.2 新增「Ollama 本地模型設定」段落：補充 Ollama 安裝（`brew install ollama`）、模型下載（`ollama pull llama3`）、在 OpenCode 中切換本地模型的步驟，每步含預期輸出
- [x] 5.3 擴充「雙模式」說明：補充 Plan Mode 與 Build Mode 的啟用方式（快捷鍵/指令）、適用時機、視覺差異說明
- [x] 5.4 擴充「Lab 實戰」：展開為完整離線操作流程（確認 Ollama 啟動→選擇本地模型→關閉網路→執行 new/ff/apply→驗證→恢復網路），每步含指令與預期結果
- [x] 5.5 git commit：`docs(lessons): expand ch4 opencode with installation guide, ollama setup, and offline lab steps`

## 6. ch5 團隊導入章節擴充

- [x] 6.1 擴充「模型選擇決策樹」：補充 ASCII art 流程圖（含任務類型、資料敏感度、成本預算判斷條件，至少 3 個模型推薦終態）
- [x] 6.2 擴充「專案結構標準化」：補充 `openspec/` 目錄完整 tree 結構（含 specs/、changes/、adr/）、`.github/prompts/` 建議清單（至少 3 個 prompt 檔案命名）、`openspec/config.yaml` 最小範本
- [x] 6.3 擴充「人機協作邊界」：補充含至少 6 個任務類型的對比表格（人/AI 負責）、灰色地帶說明、Code Review Checklist（至少 5 個項目）
- [x] 6.4 擴充「導入 Roadmap」：Week 1-2 補充至少 4 個具體行動（含負責角色）、Week 3-4 補充至少 3 個、Month 2+ 補充至少 3 個
- [x] 6.5 git commit：`docs(lessons): expand ch5 team with decision tree, directory template, and roadmap action items`

## 7. 建置驗證

- [x] 7.1 在 `site/` 目錄執行 `hugo build`，確認建置成功無錯誤
- [x] 7.2 確認 6 個章節頁面的 front matter（title、weight、description、showToc）均未被修改
- [x] 7.3 git commit：`chore: verify hugo build after ch0-ch5 content expansion`
