---
title: "3. (實戰) OpenSpec 與 OPSX 工作流"
weight: 3
description: 本課程核心。學習如何透過標準化指令引導 AI 完成從規劃到歸檔的全流程。
showToc: true
---

> 本課程核心。學習如何透過標準化指令引導 AI 完成從規劃到歸檔的全流程。

## 3.1 環境初始化

- **安裝與設定：** `npm install -g @fission-ai/openspec` 與 `openspec init`。
- **Artifacts 結構：** 理解 `proposal` (意圖), `specs` (需求), `design` (設計), `tasks` (任務) 之間的依賴關係。

## 3.2 OPSX 核心指令詳解

| 指令 | 階段 | 用途 |
|------|------|------|
| `/opsx:explore` | 探索 | 在寫 Code 前先調查瓶頸、釐清模糊需求（如：網站變慢了）。 |
| `/opsx:new <name>` | 啟動 | 建立新的變更資料夾（Change Workspace）。 |
| `/opsx:ff` | 規劃 | Fast-Forward，一次生成所有規格文件 (Proposal -> Tasks)。 |
| `/opsx:apply` | 實作 | AI 讀取 `tasks.md` 並自動撰寫程式碼。 |
| `/opsx:verify` | 驗證 | 關鍵步驟，檢查程式碼是否符合 Spec，抓出偏移。 |
| `/opsx:archive` | 歸檔 | 完成開發，將變更合併回主規格文件。 |

## 3.3 進階應用場景

- **多工並行 (Multitasking)：** 同時進行 `feature-a` 與 `fix-bug-b`，隨時切換 context 且不混亂。
- **自訂 Schema：** 根據團隊習慣客製化 Artifact 流程。

## 3.4 Lab 練習

1. **基礎：** 建立 CRUD User Service。
2. **進階：** 開發複雜折扣邏輯服務（先 Explore 釐清規則，再 Apply 實作）。
