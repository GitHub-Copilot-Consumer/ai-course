# Spec: ch2-mvp-to-spec

## Purpose

Define the requirements for Ch2, repositioned as "從 MVP 到規格 — 歡迎來到 Brownfield" — the pivotal chapter where learners transition from Greenfield Vibe Coding to Brownfield SDD by formalizing their MVP into a Proposal.

## Requirements

### Requirement: 章節標題與定位反映 MVP 到規格的轉折
`ch2-mvp-to-spec.md`（原 `ch2-sdd.md`）的標題 SHALL 改為「從 MVP 到規格 — 歡迎來到 Brownfield」，description SHALL 改為「你的 MVP 做出來了，然後呢？認識 SDD，學會為既有程式碼建立可追蹤的規格。」

#### Scenario: 學習者看到 Ch2 標題
- **WHEN** 學習者進入 Ch2
- **THEN** 標題 SHALL 為「從 MVP 到規格 — 歡迎來到 Brownfield」

### Requirement: Ch2 開場為轉折點敘事
Ch2 SHALL 以「轉折點」作為開場，內容為：請學習者打開 Ch1 的 code，回答三個問題（每個函式的設計意圖是什麼？需求改了你知道改哪裡嗎？三個月後同事看得懂嗎？），再引出「歡迎來到 Brownfield」的概念。

#### Scenario: 學習者閱讀 Ch2 開場
- **WHEN** 學習者進入 Ch2
- **THEN** 開場 SHALL 包含三個引導性問題，以及「歡迎來到 Brownfield」的宣示性語句

### Requirement: Ch2 包含 MVP 之後的三條路
Ch2 SHALL 包含「MVP 之後的三條路」段落，列出：直接上 production（→ 回顧 Ch0 災難現場）、砍掉重練（→ 浪費 MVP 的學習成果）、正式化（→ SDD，本課程選擇的路），並說明為何選擇正式化。

#### Scenario: 學習者了解 MVP 後的選擇
- **WHEN** 學習者閱讀「MVP 之後的三條路」段落
- **THEN** SHALL 列出三條路，每條路都有明確的後果說明

### Requirement: Proposal 定義為 MVP 結晶
Ch2 SHALL 包含「Proposal = MVP 的結晶」段落，明確說明 `proposal.md` 不是預先寫的 PRD，而是從 MVP 中回推出的正式需求，記錄「我們從原型中確認了什麼、哪些要留、哪些要改、邊界在哪」。

#### Scenario: 學習者了解 Proposal 的定義
- **WHEN** 學習者閱讀 Proposal 定義段落
- **THEN** SHALL 明確說明 proposal.md 是「事後結晶」而非「事前預測」，並有對應 Ch1 MVP 的範例

### Requirement: Ch2 保留 TDD vs SDD 比較，並加入 Brownfield 脈絡
Ch2 的 TDD vs SDD 比較表 SHALL 保留，並加入說明：「你的 MVP 可能連測試都沒有（Vibe Coding 嘛），所以 TDD 的前提不存在。SDD 從更上游開始：先定義要做什麼，再寫測試驗證。」

#### Scenario: 學習者閱讀 TDD vs SDD 比較
- **WHEN** 學習者閱讀比較段落
- **THEN** SHALL 包含針對 Vibe Coding 後的 MVP 情境的脈絡說明

### Requirement: Ch2 包含 OpenSpec 環境初始化
Ch2 SHALL 包含 OpenSpec 環境初始化步驟（`openspec init`），定位為「在你的 MVP 專案上初始化 OpenSpec」，並引導讀者先完成附錄的工具安裝。

#### Scenario: 學習者執行 OpenSpec 初始化
- **WHEN** 學習者閱讀環境初始化段落
- **THEN** SHALL 包含 `openspec init` 指令、預期輸出，以及「請先完成附錄的工具安裝」的提示

### Requirement: Ch2 Lab 改為為 MVP 撰寫 Proposal
Ch2 的 Lab SHALL 改為「為 Ch1 的 MVP 撰寫 proposal.md」，步驟包含：回顧 MVP 功能、列出核心功能、列出缺少的東西（錯誤處理、驗證、邊界情況）、撰寫 proposal.md。Done criteria：proposal.md 完成，包含 Why、What、Scope。

#### Scenario: 學習者完成 Ch2 Lab
- **WHEN** 學習者完成 Lab
- **THEN** `proposal.md` 存在，包含 Why、What、Scope 三個段落

### Requirement: 原檔名 ch2-sdd.md 更名為 ch2-mvp-to-spec.md
舊檔案 `ch2-sdd.md` SHALL 重新命名為 `ch2-mvp-to-spec.md`，舊檔案 SHALL 被刪除。

#### Scenario: 更名後舊檔不存在
- **WHEN** 更名完成後
- **THEN** `site/content/lessons/ch2-sdd.md` SHALL 不存在，`site/content/lessons/ch2-mvp-to-spec.md` SHALL 存在
