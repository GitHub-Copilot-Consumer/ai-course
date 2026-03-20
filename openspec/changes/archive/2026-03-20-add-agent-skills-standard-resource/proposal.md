## Why

課程目前的 `everything-claude-code.md` 涵蓋了社群開源的 ECC 框架（102+ skills），但缺少對 **Anthropic 官方 `anthropics/skills` 倉庫**及其背後 **Agent Skills 開放標準**（agentskills.io）的介紹。學員可能不知道：官方提供了 17 個精選 skills（含生產級文件技能）、可透過 Claude Code Plugin 一鍵安裝，以及 OpenCode 與 Claude Code 共用 `~/.claude/skills/` 路徑、安裝一次兩個工具皆可使用的機制。

## What Changes

- 新增 `site/content/resources/agent-skills-standard.md` 資源頁面
- 頁面涵蓋：
  - Agent Skills 開放標準（agentskills.io）介紹，以及支援此標準的工具生態
  - Anthropic 官方 `anthropics/skills` 倉庫的 17 個 skills 分類介紹
  - 官方 skills 的安裝方式（Claude Code Plugin marketplace 與手動安裝）
  - OpenCode 的 6 個 skills 搜尋路徑說明，以及與 Claude Code 共用 `~/.claude/skills/` 的機制
  - 官方 skills 與 ECC（everything-claude-code）的定位差異對比

## Capabilities

### New Capabilities

- `agent-skills-standard-resource`: 介紹 Agent Skills 開放標準、Anthropic 官方 skills 倉庫內容、安裝方式，以及 OpenCode 與 Claude Code 共用 skills 路徑的機制

### Modified Capabilities

（無現有 capability 的需求變更）

## Impact

- 新增一個 Hugo Markdown 頁面於 `site/content/resources/`
- 不影響現有頁面或課程結構
- 不需要修改任何 Hugo 設定或 layout
