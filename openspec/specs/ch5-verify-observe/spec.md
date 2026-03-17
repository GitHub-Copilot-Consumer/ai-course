# Spec: ch5-verify-observe

## Purpose

Define the requirements for Ch5, covering spec verification (drift detection), AI-assisted test generation, runtime observability, AI-assisted debugging, and archiving — forming the complete Brownfield quality assurance chapter.

## Requirements

### Requirement: Ch5 涵蓋 Spec 驗證層次
`ch5-verify-observe.md` SHALL 包含「Spec 驗證」段落，說明 `openspec verify` 完整操作、drift detection 的實際輸出解讀、以及修復 drift 的標準流程。

#### Scenario: 學習者了解如何執行 verify
- **WHEN** 學習者閱讀 Spec 驗證段落
- **THEN** SHALL 包含 `openspec verify --change "<name>"` 的完整指令、預期輸出範例（包含通過與 DRIFT 兩種情況）

#### Scenario: 學習者知道如何修復 drift
- **WHEN** 學習者看到 DRIFT 輸出時
- **THEN** 段落 SHALL 說明修復流程：回到 tasks.md 補充遺漏的 task → 再次執行 apply → 重新 verify

### Requirement: Ch5 涵蓋 AI 輔助測試生成
Ch5 SHALL 包含「AI 輔助測試」段落，說明 TDD 與 SDD 並用的方式：用 Spec 的 scenario 作為測試案例的來源，用 Copilot/OpenCode 生成對應的測試程式碼。

#### Scenario: 學習者了解 TDD 與 SDD 的結合方式
- **WHEN** 學習者閱讀 AI 輔助測試段落
- **THEN** SHALL 說明 scenario → test case 的對應關係，並提供一個具體的 Prompt 範例

### Requirement: Ch5 涵蓋運行時可觀測性（Observability）
Ch5 SHALL 包含「運行時可觀測性」段落，說明如何用 AI 為 brownfield 既有程式碼加入：structured logging（結構化日誌）、error tracking（錯誤追蹤概念）、health check / metrics 基礎。定位為「AI 如何幫你做這件事」，而非完整的 observability 教學。

#### Scenario: 學習者了解如何用 AI 加入 structured logging
- **WHEN** 學習者閱讀 Observability 段落
- **THEN** SHALL 包含一個具體的 Prompt 範例，展示如何用 Copilot/OpenCode 為既有函式批量加入 structured logging

#### Scenario: 學習者了解 error tracking 的概念
- **WHEN** 學習者閱讀 error tracking 說明
- **THEN** SHALL 說明 error tracking 的目的與基本整合方式，不需要深入特定工具

### Requirement: Ch5 涵蓋 AI 輔助 Debug
Ch5 SHALL 包含「AI 輔助 Debug」段落，說明在 brownfield 環境中使用 `/opsx:explore` 調查問題、用 Copilot 分析 log 的操作方式。

#### Scenario: 學習者了解如何用 explore 調查問題
- **WHEN** 學習者閱讀 AI 輔助 Debug 段落
- **THEN** SHALL 包含 `/opsx:explore` 的使用範例，展示在既有 codebase 中調查 bug 的完整輸出

### Requirement: Ch5 以 openspec archive 作為收尾
Ch5 SHALL 以 `openspec archive` 作為章節收尾，說明驗證完成後歸檔的完整操作，以及「規格成為活文件」的概念。

#### Scenario: 學習者完成 verify 後知道下一步
- **WHEN** 學習者完成 verify 並通過
- **THEN** 段落 SHALL 說明 `openspec archive --change "<name>"` 的操作與預期輸出

### Requirement: Ch5 Lab 涵蓋 verify、observability 與 archive
Ch5 的 Lab SHALL 包含三個步驟：對 Ch4 的實作執行 verify 並修復 drift、為功能加入 structured logging、執行 archive。Done criteria：verify 全部通過，logging 已加入，archive 完成。

#### Scenario: 學習者完成 Ch5 Lab
- **WHEN** 學習者完成 Lab
- **THEN** `openspec verify` 全部通過，相關函式有 structured logging，`openspec archive` 執行成功
