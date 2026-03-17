## ADDED Requirements

### Requirement: 附錄集中所有工具安裝步驟
`appendix-setup.md` SHALL 包含以下工具的完整安裝步驟：OpenSpec CLI（`npm install -g @fission-ai/openspec`）、OpenCode（macOS Homebrew / npm）、API Key 設定（環境變數與設定檔兩種方式）、Ollama 安裝與本地模型下載。

#### Scenario: 學習者找到 OpenSpec CLI 安裝步驟
- **WHEN** 學習者閱讀附錄
- **THEN** SHALL 包含 `npm install -g @fission-ai/openspec` 指令、預期輸出、驗證安裝的指令（`openspec --version`）

#### Scenario: 學習者找到 OpenCode 安裝步驟
- **WHEN** 學習者閱讀附錄
- **THEN** SHALL 包含 macOS（Homebrew）與 npm 兩種安裝方式，以及驗證安裝的指令（`opencode --version`）

#### Scenario: 學習者找到 API Key 設定方式
- **WHEN** 學習者閱讀附錄
- **THEN** SHALL 包含環境變數方式（`export ANTHROPIC_API_KEY`）與設定檔方式（`~/.config/opencode/config.json`）兩種

#### Scenario: 學習者找到 Ollama 安裝步驟
- **WHEN** 學習者閱讀附錄
- **THEN** SHALL 包含 Ollama 安裝（macOS/Linux）、下載模型（`ollama pull llama3`）、確認服務啟動、在 OpenCode 中切換至本地模型的完整步驟

### Requirement: 附錄有明確的 front matter 標示為附錄類型
`appendix-setup.md` 的 Hugo front matter SHALL 包含適當的 weight 值（設定為大數字如 999 使其排在最後），以及 title 為「附錄：工具安裝與環境設定」。

#### Scenario: 附錄出現在課程章節最後
- **WHEN** 學習者瀏覽課程目錄
- **THEN** 附錄 SHALL 排在所有章節之後
