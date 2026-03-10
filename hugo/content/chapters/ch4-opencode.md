---
title: "4. 跨越生態系：從 Copilot 遷移至 OpenCode"
weight: 4
description: 企業如何擺脫供應商鎖定 (Vendor Lock-in) 並落實資料隱私。
showToc: true
---

> 企業如何擺脫供應商鎖定 (Vendor Lock-in) 並落實資料隱私。

## OpenCode 優勢

- **Model Agnostic：** 支援 Claude, Gemini, OpenAI 等多模型切換。
- **Local-First：** 支援 Ollama + Local Llama 3，程式碼不外流。
- **雙模式：** Plan Mode (唯讀探索) vs Build Mode (實作修改)。

## 混合架構策略 (Hybrid Architecture)

- **日常補全：** GitHub Copilot (速度快)。
- **規格規劃：** OpenCode + Claude Opus / Gemini Pro (推理性強、Context 大)。
- **機密專案：** OpenCode + Ollama (完全離線)。

## Lab 實戰

設定 Ollama 本地環境，體驗在斷網環境下完成 OpenSpec 開發流程。
