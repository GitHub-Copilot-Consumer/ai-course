---
title: "附錄：工具安裝與環境設定"
weight: 1
description: OpenSpec CLI、OpenCode、Ollama 的完整安裝步驟與設定指南。
showToc: true
---

> 本附錄集中所有工具的安裝步驟。主線章節（Ch2–Ch4）在需要時會引導你到這裡。

## 系統需求

| 項目 | 需求 | 確認指令 |
|------|------|---------|
| Node.js | 18.x 或以上 | `node --version` |
| npm | 9.x 或以上 | `npm --version` |
| Git | 已初始化的專案 | `git status` |
| macOS | 12+ 或 Linux Ubuntu 20.04+ | — |
| 記憶體 | 8GB（建議 16GB，尤其使用本地模型時） | — |

---

## 一、OpenSpec CLI

OpenSpec CLI 是規格管理工具，用於建立 change、生成 artifacts、執行 verify 與 archive。

### 安裝

```bash
npm install -g @fission-ai/openspec
```

預期輸出：
```
added 127 packages in 8s
```

### 驗證安裝

```bash
openspec --version
```

預期輸出：
```
@fission-ai/openspec/1.x.x
```

### 在專案中初始化

進入你的專案根目錄，執行：

```bash
cd your-project
openspec init
```

預期輸出：
```
✔ Created openspec/config.yaml
✔ Created openspec/specs/ directory
✔ Created openspec/changes/ directory
✔ Created openspec/adr/ directory
OpenSpec initialized successfully!
```

### 初始化後的目錄結構

```
your-project/
├── openspec/
│   ├── config.yaml          # OpenSpec 設定（schema、語言、規則等）
│   ├── specs/               # 已歸檔的 capability 規格（主規格庫）
│   ├── changes/             # 進行中的變更工作空間
│   └── adr/                 # Architecture Decision Records
└── src/
```

### 驗證初始化成功

```bash
openspec new change "hello-world"
```

預期輸出：
```
✔ Created change 'hello-world' at openspec/changes/hello-world/
```

---

## 二、OpenCode

OpenCode 是 Coding Agent CLI，支援 75+ 模型供應商，用於依規格實作程式碼。

### 安裝

**macOS（使用 Homebrew，推薦）：**
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

### 驗證安裝

```bash
opencode --version
```

預期輸出：
```
opencode/0.x.x darwin-arm64 node-v20.x.x
```

---

## 三、API Key 設定

OpenCode 需要連接至少一個 AI 模型供應商。以下提供兩種設定方式：

### 方式 A：環境變數（適合個人開發、快速測試）

```bash
# Claude (Anthropic)
export ANTHROPIC_API_KEY="sk-ant-..."

# OpenAI
export OPENAI_API_KEY="sk-..."

# GitHub Copilot（如已有授權）
export GITHUB_TOKEN="ghp_..."
```

> 將上述指令加入 `~/.zshrc` 或 `~/.bashrc` 可讓設定持久化。

### 方式 B：設定檔（適合持久化、多供應商管理）

編輯 `~/.config/opencode/config.json`（首次啟動 OpenCode 後自動建立）：

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
  "defaultModel": "anthropic/claude-sonnet-4-6"
}
```

### 驗證設定成功

```bash
opencode
```

在 OpenCode Chat 介面輸入：
```
> 用一句話說明你是什麼工具
```

如果 AI 有正常回應，代表 API Key 設定成功。

---

## 四、Ollama（本地模型，可選）

Ollama 讓你在完全離線的環境中使用本地 AI 模型，適合處理機密程式碼或在無網路環境工作。

> 本機執行模型需要較多記憶體（8B 模型約需 8GB RAM），請確認系統資源充足。

### 安裝 Ollama

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

---

### 下載本地模型

```bash
# Llama 3（通用，8B 參數，約 4.7GB，適合一般開發任務）
ollama pull llama3

# Codestral（程式碼特化，22B，約 12GB，適合複雜程式碼生成）
ollama pull codestral

# 確認已下載的模型清單
ollama list
```

下載 llama3 的預期輸出：
```
pulling manifest...
pulling 8eeb52dfec4b... 100% ▕████████████████████▏ 4.7 GB
verifying sha256 digest
writing manifest
✔ llama3 ready
```

---

### 確認 Ollama 服務啟動

```bash
# 確認服務正在運行
curl http://localhost:11434/api/tags
```

預期輸出：
```json
{"models":[{"name":"llama3:latest","..."}]}
```

如果沒有回應，手動啟動服務：
```bash
ollama serve &
```

---

### 在 OpenCode 中切換至本地模型

**方式 A：啟動時指定**
```bash
opencode --model ollama/llama3
```

**方式 B：設定為預設模型**

編輯 `~/.config/opencode/config.json`：
```json
{
  "defaultModel": "ollama/llama3"
}
```

**驗證本地模型運作：**

啟動 OpenCode 後，確認提示符顯示 `ollama/llama3` 字樣，然後輸入一個簡單問題，確認有正常回應且無網路請求。

---

## 快速確認清單

完成安裝後，確認以下所有指令均有正常輸出：

```bash
# OpenSpec CLI
openspec --version          # 應顯示版本號

# OpenCode
opencode --version          # 應顯示版本號

# Ollama（可選）
ollama --version            # 應顯示版本號
ollama list                 # 應顯示已下載的模型
```

全部確認後，回到你離開的章節繼續。
