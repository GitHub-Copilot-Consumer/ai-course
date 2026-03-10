---
title: "5. 團隊導入策略與最佳實踐"
weight: 5
description: 如何將個人生產力轉化為團隊規範。
showToc: true
---

> 如何將個人生產力轉化為團隊規範。

## 模型選擇決策樹

- **規劃階段：** 使用高智商模型 (Claude 3.5 Sonnet / GPT-4o)。
- **實作階段：** 使用低成本模型或 Local Model。

## 人機協作邊界

- **人：** 負責架構決策、Spec Review、資安邏輯。
- **AI：** 負責 Boilerplate、CRUD、單元測試。

## 專案結構標準化

建立 `openspec/` 目錄與 `.github/prompts/` 規範。

## 導入 Roadmap

- **Week 1-2：** 工具安裝與觀念對齊 (Workshop)。
- **Week 3-4：** 小模組試行 (Pilot)。
- **Month 2+：** 整合 Code Review 與 CI/CD。
