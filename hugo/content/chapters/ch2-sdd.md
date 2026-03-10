---
title: "2. 解決雜亂無章：引入 SDD (Spec-Driven Development)"
weight: 2
description: 為何 TDD (測試驅動) 在 AI 時代不夠用？因為 AI 需要明確的「做什麼」(What) 而非僅是驗證「對不對」。
showToc: true
---

> 為何 TDD (測試驅動) 在 AI 時代不夠用？因為 AI 需要明確的「做什麼」(What) 而非僅是驗證「對不對」。

## SDD 核心哲學

- **Fluid & Iterative：** 流動且迭代，非僵化的瀑布式。
- **動作取代階段：** 隨時可以更新 Spec、實作或歸檔。

## OpenSpec 解決的問題

- 對抗 **程式碼熵 (Code Entropy)**：量化專案混亂程度（如命名不一致、邏輯重複）。
- **Drift Detection：** 偵測實作是否偏離原始需求。

## 與現有流程整合

- **Agile：** Spec 作為 Definition of Done。
- **CI/CD：** 在 Pipeline 中加入 `openspec validate`。

## 市場比較

OpenSpec vs GitHub Spec Kit (太重) vs AWS Kiro (鎖定平台)。
