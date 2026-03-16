# ch3-detailed-content Specification

## Purpose

TBD - created from change 'expand-ch0-ch5-detailed-steps'.

## Requirements

### Requirement: ch3 每個 OPSX 指令含詳細說明與輸出範例
`site/content/lessons/ch3-openspec.md` 的「OPSX 核心指令詳解」段落 SHALL 為表格中每個指令補充獨立段落，各包含：
- 指令完整語法（帶參數說明）
- 執行前的前置條件
- 執行步驟描述（1–3 句）
- 終端機輸出範例（code block，5–15 行）
- 常見錯誤與解法（至少 1 個）

#### Scenario: 每個 OPSX 指令有輸出範例
- **WHEN** 讀取 `site/content/lessons/ch3-openspec.md`
- **THEN** `/opsx:explore`、`/opsx:new`、`/opsx:ff`、`/opsx:apply`、`/opsx:verify`、`/opsx:archive` 六個指令各自 MUST 有 code block 格式的輸出範例

### Requirement: ch3 3.2 環境初始化含逐步安裝步驟
`site/content/lessons/ch3-openspec.md` 的「環境初始化」段落 SHALL 補充：
- 系統需求（Node.js 版本、OS 相容性）
- 安裝步驟（含指令與預期輸出）
- `openspec init` 執行後的目錄結構圖（以 code block 的 tree 格式呈現）
- Artifacts 依賴關係圖（文字圖或 ASCII art，說明 proposal → design → specs → tasks 的順序）

#### Scenario: 環境初始化含目錄結構圖
- **WHEN** 讀取 `site/content/lessons/ch3-openspec.md`
- **THEN** 環境初始化段落 MUST 包含 `openspec/` 目錄結構的 code block（tree 格式）

### Requirement: ch3 Lab 練習含完整逐步指引
`site/content/lessons/ch3-openspec.md` 的「Lab 練習」段落 SHALL 展開為：
- Lab A「建立 CRUD User Service」的完整流程：
  - Step 1：`/opsx:new user-service`
  - Step 2：`/opsx:ff` 生成所有規格文件
  - Step 3：`/opsx:apply` 實作
  - Step 4：`/opsx:verify` 驗證
  - Step 5：`/opsx:archive` 歸檔
  - 每步驟含預期輸出描述
- Lab B「折扣邏輯服務」的完整流程（先 explore 再 apply）

#### Scenario: Lab A 有完整 5 步驟流程
- **WHEN** 讀取 `site/content/lessons/ch3-openspec.md`
- **THEN** Lab A 段落 MUST 包含從 `/opsx:new` 到 `/opsx:archive` 的完整步驟，步驟數 MUST 不少於 5

### Requirement: ch3 多工並行操作流程說明
`site/content/lessons/ch3-openspec.md` 的「多工並行」段落 SHALL 補充：
- 同時存在兩個 change 的目錄結構示意
- 如何切換 context（指令或操作說明）
- 兩個 change 互不干擾的機制說明

#### Scenario: 多工並行有目錄結構示意
- **WHEN** 讀取 `site/content/lessons/ch3-openspec.md`
- **THEN** 多工並行段落 MUST 包含展示兩個 change 同時存在的 code block
