## ADDED Requirements

### Requirement: Phase 1 - 安裝 OpenSpec 作為偵察前置條件
AI SHALL 在偵察階段開始前，引導使用者完成 OpenSpec 的安裝與最小初始化（`openspec init`），因為 `/opsx:explore` 需要工具已就位才能使用。

#### Scenario: 使用者啟動 brownfield onboarding
- **WHEN** 使用者輸入 `/opsx-brownfield-onboard` command 或明確表達要將既有專案導入 OpenSpec
- **THEN** AI SHALL 先引導使用者執行以下步驟（依序）：
  1. `npm install -g @fission-ai/openspec@latest`
  2. `cd <existing-project>`
  3. `openspec init`
  4. `git add openspec/ && git commit`
- **AND** AI SHALL 說明此處的 `openspec init` 只是最小初始化，`config.yaml` 的詳細配置留到 Phase 2 用偵察結果填寫

### Requirement: Phase 1 - 引導技術債盤點
AI SHALL 在安裝完成後，引導使用者使用 explore 模式對 codebase 做初步探索，建立問題清單作為 Phase 2 config.yaml 的素材。

#### Scenario: 執行技術債盤點
- **WHEN** `openspec init` 完成後
- **THEN** AI SHALL 進入 explore 模式，請使用者描述專案背景（技術棧、年齡、大概規模）
- **AND** AI SHALL 分析 codebase 的技術債、不一致的命名、重複邏輯、無文件的核心業務邏輯，以條列方式輸出
- **AND** AI SHALL 說明此清單將作為 Phase 2 config.yaml 的 `known_debt` 素材

### Requirement: Phase 1 - 找出入口點並建立模組地圖
AI SHALL 引導使用者識別最高價值的模組，並產出三分類模組地圖。

#### Scenario: 找出入口點
- **WHEN** 技術債盤點完成後
- **THEN** AI SHALL 引導使用者查詢以下資訊以找出最常改動、最容易出錯的模組：
  - git log（哪些檔案最常被 commit）
  - issue tracker（哪些模組最常出 bug）
  - 團隊共識（哪裡最怕改、最難測試）
  - 核心業務邏輯（折扣計算、訂單狀態機、權限系統）

#### Scenario: 產出模組地圖
- **WHEN** 使用者提供模組資訊後
- **THEN** AI SHALL 產出三分類模組地圖，每個模組標示分類與對應的 OpenSpec 策略：
  - 🔥 高風險核心 → Phase 3 優先補 Retro-Spec
  - ✅ 穩定模組 → Phase 4 有改動時再補
  - 💀 遺忘暗區 → 先用 explore 調查，再決定

### Requirement: Phase 2 - 引導建立 config.yaml
AI SHALL 在 Phase 1 完成後，引導使用者用偵察結果填寫 `config.yaml`，讓 AI 在每次 session 都能快速理解專案背景。

#### Scenario: 建立 config.yaml
- **WHEN** Phase 1 模組地圖完成後
- **THEN** AI SHALL 提供 `config.yaml` 模板，並依據 Phase 1 的偵察結果預填以下欄位：
  - `main_modules`：從模組地圖中的高風險核心與重要穩定模組
  - `known_debt`：從技術債盤點清單
  - `tech_stack`、`age`、`team_size`：從使用者描述的專案背景

#### Scenario: config.yaml 不需要完美
- **WHEN** 使用者對某些欄位不確定時
- **THEN** AI SHALL 告知使用者「寫你知道的就好，這個檔案會隨著了解逐步更新」，不阻擋流程繼續

### Requirement: Phase 2 - 建立 specs 骨架
AI SHALL 引導使用者為核心模組建立初始 spec 骨架（空檔即可）。

#### Scenario: 建立初始 specs 目錄結構
- **WHEN** config.yaml 完成後
- **THEN** AI SHALL 依據 Phase 1 高風險核心模組清單，引導使用者在 `openspec/specs/` 下建立對應的空白 spec 檔案
- **AND** AI SHALL 說明空白 spec 檔案的作用是「預留位置，後續用 Retro-Spec 填充」
