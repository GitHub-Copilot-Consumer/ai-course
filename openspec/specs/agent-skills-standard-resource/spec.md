# Spec: agent-skills-standard-resource

## Purpose

介紹 Agent Skills 開放標準（agentskills.io）的資源頁面，說明 Skills 格式、官方倉庫、安裝方式，以及 OpenCode 與 Claude Code 的共用路徑機制。

---

## Requirements

### Requirement: 頁面存在並可從資源列表存取

資源目錄 `site/content/resources/` 下 SHALL 存在 `agent-skills-standard.md` 檔案。
該頁面 SHALL 具備有效的 Hugo frontmatter，包含 `title`、`weight: 3`、`description`、`showToc: true`。
Hugo 建置 SHALL 成功產生對應的靜態 HTML 頁面，不產生任何建置錯誤。

#### Scenario: Hugo 建置包含新頁面

- **WHEN** 執行 `hugo build` 或 `hugo server`
- **THEN** `public/resources/agent-skills-standard/index.html` 存在
- **THEN** 建置過程無錯誤輸出

#### Scenario: 頁面在資源導覽中排序正確

- **WHEN** Hugo 渲染資源列表
- **THEN** `agent-skills-standard` 頁面排在 `everything-claude-code`（weight: 2）之後
- **THEN** `agent-skills-standard` 頁面排在 `client-observability`（weight: 10）之前

---

### Requirement: 頁面包含 Agent Skills 開放標準章節

頁面 SHALL 包含以 `## Agent Skills 開放標準` 為標題的章節。
該章節 SHALL 說明：agentskills.io 的定義、Skills 格式（`SKILL.md`）、以及支援此標準的代表性工具。
代表性工具 SHALL 包含：Claude Code、OpenCode、Cursor、VS Code（GitHub Copilot）、Gemini CLI 至少五個。

#### Scenario: 章節標題存在

- **WHEN** 解析頁面 Markdown 內容
- **THEN** 找到標題 `## Agent Skills 開放標準`

#### Scenario: 包含代表性支援工具

- **WHEN** 解析該章節內容
- **THEN** 內容中包含「Claude Code」、「OpenCode」、「Cursor」等工具名稱

---

### Requirement: 頁面包含官方 Skills 倉庫章節

頁面 SHALL 包含介紹 `anthropics/skills` GitHub 倉庫的章節。
該章節 SHALL 以表格或列表方式列出官方倉庫的 Skills 分類，涵蓋：Creative & Design、Document Skills、Development & Technical、Enterprise & Communication。
該章節 SHALL 包含 `https://github.com/anthropics/skills` 的連結。

#### Scenario: 官方倉庫章節存在

- **WHEN** 解析頁面 Markdown 內容
- **THEN** 找到包含 `anthropics/skills` 關鍵字的段落
- **THEN** 找到四個分類名稱中至少兩個

#### Scenario: 倉庫連結可解析

- **WHEN** 解析頁面中的 Markdown 連結
- **THEN** 找到指向 `github.com/anthropics/skills` 的連結

---

### Requirement: 頁面包含安裝方式章節

頁面 SHALL 包含安裝方式章節，說明兩種安裝路徑：
1. Claude Code Plugin marketplace 安裝（使用 `/plugin marketplace add` 及 `/plugin install` 指令）
2. 手動複製到 `~/.claude/skills/` 的方式

#### Scenario: Plugin 安裝指令存在

- **WHEN** 解析頁面 code block 內容
- **THEN** 找到包含 `/plugin marketplace add anthropics/skills` 的指令範例
- **THEN** 找到包含 `/plugin install` 的指令範例

#### Scenario: 手動安裝說明存在

- **WHEN** 解析頁面內容
- **THEN** 找到 `~/.claude/skills/` 路徑的說明

---

### Requirement: 頁面包含 OpenCode 共用路徑章節

頁面 SHALL 包含說明 OpenCode skills 搜尋路徑的章節。
該章節 SHALL 列出 OpenCode 搜尋 skills 的 6 條路徑，並明確指出 `~/.claude/skills/` 路徑為 Claude Code 與 OpenCode 的共用路徑。
該章節 SHALL 說明「安裝一次，兩個工具皆可使用」的機制。

#### Scenario: 六條搜尋路徑全部列出

- **WHEN** 解析頁面內容
- **THEN** 找到以下路徑中至少 4 條的文字說明：
  - `.opencode/skills/<name>/SKILL.md`
  - `~/.config/opencode/skills/<name>/SKILL.md`
  - `.claude/skills/<name>/SKILL.md`
  - `~/.claude/skills/<name>/SKILL.md`
  - `.agents/skills/<name>/SKILL.md`
  - `~/.agents/skills/<name>/SKILL.md`

#### Scenario: 共用路徑說明存在

- **WHEN** 解析頁面內容
- **THEN** 找到說明 `~/.claude/skills/` 為兩個工具共用路徑的文字
