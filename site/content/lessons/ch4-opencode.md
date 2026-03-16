---
title: "4. 跨越生態系：從 Copilot 遷移至 OpenCode"
weight: 5
description: 企業如何擺脫供應商鎖定 (Vendor Lock-in) 並落實資料隱私。
showToc: true
---

> 企業如何擺脫供應商鎖定 (Vendor Lock-in) 並落實資料隱私。

## 學習目標

本章結束後，你將能夠：

- **安裝並設定** OpenCode，包含 API Key 配置與驗證
- **安裝 Ollama** 並在 OpenCode 中切換至本地模型
- **操作** Plan Mode 與 Build Mode 的切換，在正確時機使用各自模式
- **完成** 一個全程在本地模型運行的 OpenSpec 開發流程

---

## 安裝與初始設定

### 系統需求

| 項目 | macOS | Linux |
|------|-------|-------|
| OS 版本 | macOS 12+ | Ubuntu 20.04+ |
| 記憶體 | 8GB（建議 16GB） | 8GB（建議 16GB） |
| 磁碟空間 | 2GB（不含本地模型） | 2GB（不含本地模型） |

### Step 1：安裝 OpenCode

**macOS（使用 Homebrew）：**
```bash
brew install opencode
```
預期輸出：
```
==> Downloading opencode...
==> Installing opencode...
✔ opencode installed successfully
```

**macOS / Linux（使用 npm）：**
```bash
npm install -g @opencode/cli
```
預期輸出：
```
added 89 packages in 5s
```

**驗證安裝：**
```bash
opencode --version
```
預期輸出：
```
opencode/0.x.x darwin-arm64 node-v20.x.x
```

### Step 2：API Key 設定

OpenCode 支援多個 AI 提供商，透過環境變數或設定檔設定。

**方式 A：環境變數（推薦用於個人開發）**
```bash
# Claude (Anthropic)
export ANTHROPIC_API_KEY="sk-ant-..."

# OpenAI
export OPENAI_API_KEY="sk-..."

# 可以同時設定多個，OpenCode 會根據選擇切換
```

**方式 B：設定檔（推薦用於持久化）**

編輯 `~/.config/opencode/config.json`（首次啟動後自動建立）：
```json
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-..."
    },
    "openai": {
      "apiKey": "sk-..."
    }
  },
  "defaultModel": "claude-sonnet-4-5"
}
```

### Step 3：驗證安裝成功

```bash
opencode
```
預期行為：OpenCode 啟動，在終端機顯示互動式 Chat 介面，模型名稱顯示在提示符旁邊。

首次對話測試：
```
> 用一句話說明你是什麼工具
OpenCode: 我是一個基於 Claude/GPT 的 Coding Agent，能夠讀取、修改你的程式碼並執行終端機指令。
```

---

## OpenCode 優勢

### Model Agnostic：多模型切換

```bash
# 查看可用模型
opencode models list

# 輸出範例
Available models:
  anthropic/claude-sonnet-4-5  (current)
  anthropic/claude-opus-4
  openai/gpt-4o
  openai/gpt-4o-mini
  ollama/llama3               (local, offline)
  ollama/codestral            (local, offline)

# 切換模型
opencode --model openai/gpt-4o
```

### Local-First：程式碼不外流

使用 Ollama 整合後，所有 prompt 和程式碼都在本機處理，不傳送到任何外部服務器。

### 雙模式：Plan Mode vs Build Mode

| 模式 | 說明 | 適用時機 |
|------|------|---------|
| **Plan Mode（唯讀）** | AI 只能讀取檔案和搜尋 codebase，不能修改 | 探索程式碼、理解架構、調查 bug 根源 |
| **Build Mode（實作）** | AI 可以讀取、修改、建立、刪除檔案，也能執行指令 | 實際開發、修復 bug、重構 |

**Plan Mode 啟用方式：**
- 快捷鍵：`Shift+Tab`（在 OpenCode 介面中切換）
- 或在 Chat 中輸入：`/plan` 進入 Plan Mode

**Build Mode 啟用方式：**
- 快捷鍵：`Shift+Tab`（再次切換回 Build Mode）
- 或輸入：`/build` 切換回 Build Mode

**視覺差異：**
```
Plan Mode:   [PLAN] > 你的訊息...    ← 提示符顯示 [PLAN] 標籤
Build Mode:  [BUILD] > 你的訊息...   ← 提示符顯示 [BUILD] 標籤
```

**何時應使用 Plan Mode：**
- 剛接手一個新專案，想先理解架構
- 在實作前做 `/opsx:explore` 調查
- 不確定某個修改的影響範圍，想先「看看」不要真的改
- Code Review 時想讓 AI 分析但不想讓它做任何修改

---

## Ollama 本地模型設定

### Step 1：安裝 Ollama

**macOS：**
```bash
brew install ollama
```
預期輸出：
```
==> Installing ollama...
✔ ollama installed
```

**Linux（一鍵安裝腳本）：**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**驗證安裝：**
```bash
ollama --version
```
預期輸出：
```
ollama version 0.x.x
```

### Step 2：下載本地模型

```bash
# 下載 Llama 3（通用，8B 參數，約 4.7GB）
ollama pull llama3
```
預期輸出：
```
pulling manifest...
pulling 8eeb52dfec4b... 100% ▕████████████████████▏ 4.7 GB
pulling fe56d37be21e... 100% ▕████████████████████▏  11 KB
verifying sha256 digest
writing manifest
✔ llama3 ready
```

```bash
# 下載 Codestral（程式碼特化，22B，約 12GB）
ollama pull codestral

# 確認已下載的模型清單
ollama list
```
預期輸出：
```
NAME            ID              SIZE    MODIFIED
llama3:latest   365c0bd3c000    4.7 GB  2 minutes ago
codestral:latest 234abc123def  12.0 GB  5 minutes ago
```

### Step 3：確認 Ollama 服務啟動

```bash
# 確認服務正在運行
ollama serve &

# 或確認已有服務在跑（macOS 後台服務）
curl http://localhost:11434/api/tags
```
預期輸出：
```json
{"models":[{"name":"llama3:latest","..."}]}
```

### Step 4：在 OpenCode 中切換至本地模型

```bash
# 啟動 OpenCode 並指定使用本地模型
opencode --model ollama/llama3
```

或在 `~/.config/opencode/config.json` 設定預設使用本地模型：
```json
{
  "defaultModel": "ollama/llama3"
}
```

---

## 混合架構策略 (Hybrid Architecture)

根據任務性質選擇最適合的工具：

| 場景 | 工具 | 理由 |
|------|------|------|
| **日常補全** | GitHub Copilot | 速度快、低延遲，適合即時補全 |
| **規格規劃（SDD）** | OpenCode + Claude Sonnet/Opus | 推理能力強、大 Context Window，適合理解複雜需求 |
| **大量實作（Boilerplate）** | OpenCode + GPT-4o mini | 成本低、速度快，適合重複性高的生成任務 |
| **機密專案** | OpenCode + Ollama（完全離線） | 程式碼不外流，符合資安要求 |

---

## Lab 實戰：設定 Ollama 並完成離線開發流程

**前置條件：**
- Ollama 已安裝（`ollama --version` 確認）
- 已下載至少一個本地模型（`ollama list` 確認有輸出）
- OpenSpec 已初始化的測試專案（`openspec/` 目錄存在）

**Step 1：確認 Ollama 服務啟動中**
```bash
curl http://localhost:11434/api/tags
```
如果沒有回應，先啟動服務：
```bash
ollama serve &
```
預期結果：`curl` 返回 JSON，包含已下載的模型清單。

**Step 2：在 OpenCode 中選擇本地模型**
```bash
opencode --model ollama/llama3
```
確認提示符顯示 `ollama/llama3` 字樣。

**Step 3：模擬離線環境（可選）**
```bash
# macOS：關閉 Wi-Fi（系統偏好設定 → Wi-Fi → 關閉）
# 或使用 networksetup 指令
sudo networksetup -setairportpower en0 off
```

**Step 4：執行完整的 OpenSpec 開發流程**
```bash
# 4.1 建立測試 change
openspec new change "offline-test"

# 4.2 在 OpenCode 中生成規格
# (在 OpenCode Chat 中)
/opsx-propose offline-test
建立一個簡單的 Hello World HTTP endpoint
```
預期結果：即使在離線狀態，AI 仍能生成 artifacts（因為使用本地模型）。

**Step 5：驗證離線模式正常運作**
確認以下事項：
- [ ] OpenCode Chat 有正常回應
- [ ] `openspec/changes/offline-test/proposal.md` 已建立
- [ ] 網路流量監控（Activity Monitor）顯示 opencode 沒有外部網路連線

**Step 6：恢復網路連線**
```bash
sudo networksetup -setairportpower en0 on
```

**Done criteria：** 在完全離線的環境下，成功完成從 `openspec new change` 到 `proposal.md` 生成的流程。
