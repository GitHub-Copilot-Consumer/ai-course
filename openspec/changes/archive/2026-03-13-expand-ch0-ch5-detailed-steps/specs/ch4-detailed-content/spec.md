## ADDED Requirements

### Requirement: ch4 包含 OpenCode 安裝與設定步驟
`site/content/lessons/ch4-opencode.md` SHALL 補充 OpenCode 的完整安裝與初始設定段落，包含：
- 安裝指令（至少包含 macOS 與 Linux 的安裝方式）
- 首次啟動步驟
- API Key 設定方式（以哪種方式設定 Claude / OpenAI Key）
- 驗證安裝成功的指令與預期輸出

#### Scenario: 安裝段落含 API Key 設定說明
- **WHEN** 讀取 `site/content/lessons/ch4-opencode.md`
- **THEN** 正文 MUST 包含 API Key 設定的具體步驟或指令

### Requirement: ch4 包含 Ollama 本地模型安裝流程
`site/content/lessons/ch4-opencode.md` SHALL 補充 Ollama 安裝與使用的逐步流程：
1. Ollama 安裝指令（macOS：`brew install ollama`）
2. 下載模型的指令（如：`ollama pull llama3`）
3. 在 OpenCode 中切換至本地模型的設定步驟
4. 驗證離線模式可正常運作的測試步驟
每步驟 MUST 含預期輸出的 code block。

#### Scenario: Ollama 流程含完整指令序列
- **WHEN** 讀取 `site/content/lessons/ch4-opencode.md`
- **THEN** 正文 MUST 包含 `ollama pull` 指令，且 MUST 包含在 OpenCode 中設定本地模型的步驟

### Requirement: ch4 包含 Plan vs Build 模式的切換說明
`site/content/lessons/ch4-opencode.md` 的「雙模式」說明 SHALL 補充：
- Plan Mode 的啟用方式（快捷鍵或指令）
- Build Mode 的啟用方式
- 何時應使用 Plan Mode（探索、理解現有 code）vs Build Mode（實際修改）
- 兩種模式的視覺差異說明

#### Scenario: 雙模式含切換操作說明
- **WHEN** 讀取 `site/content/lessons/ch4-opencode.md`
- **THEN** 正文 MUST 包含 Plan Mode 與 Build Mode 各自的啟用方式說明

### Requirement: ch4 Lab 含完整離線操作步驟
`site/content/lessons/ch4-opencode.md` 的「Lab 實戰」段落 SHALL 展開為完整流程：
- 前置條件（已安裝 Ollama，已下載至少一個本地模型）
- Step 1：確認 Ollama 服務啟動中
- Step 2：在 OpenCode 中選擇本地模型
- Step 3：關閉網路連線（模擬離線環境）
- Step 4：執行一個 OpenSpec change 的完整流程（new → ff → apply）
- Step 5：驗證輸出並恢復網路
- 每步驟含指令與預期結果

#### Scenario: Lab 有離線環境驗證步驟
- **WHEN** 讀取 `site/content/lessons/ch4-opencode.md`
- **THEN** Lab 段落 MUST 包含確認 Ollama 服務啟動的步驟，且 MUST 包含在離線/本地環境執行 OpenSpec 的步驟
