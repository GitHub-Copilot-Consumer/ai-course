## 1. 建立資源頁面內容

- [x] 1.1 建立 `site/content/resources/agent-skills-standard.md`，加入 Hugo frontmatter（title、weight: 3、description、showToc: true）
- [x] 1.2 撰寫「Agent Skills 開放標準」章節，說明 agentskills.io、SKILL.md 格式，列出至少 5 個支援工具（Claude Code、OpenCode、Cursor、VS Code、Gemini CLI）
- [x] 1.3 撰寫「Anthropic 官方 Skills 倉庫」章節，以表格列出 17 個 skills 的四大分類（Creative、Document、Development、Enterprise），並附上 GitHub 倉庫連結
- [x] 1.4 撰寫「安裝方式」章節，包含 Plugin marketplace 安裝指令（`/plugin marketplace add anthropics/skills`、`/plugin install`）及手動安裝到 `~/.claude/skills/` 的步驟
- [x] 1.5 撰寫「OpenCode 共用路徑機制」章節，列出全部 6 條 skills 搜尋路徑，說明 `~/.claude/skills/` 為 Claude Code 與 OpenCode 的共用路徑
- [x] 1.6 撰寫「與 ECC 的定位差異」章節，以比較表呈現官方精選 skills（anthropics/skills）與 ECC（everything-claude-code）的差異（維護者、數量、定位、授權、文件能力、開發工作流）
- [x] 1.7 在頁面底部加入「延伸資源」段落，附上 agentskills.io、anthropics/skills GitHub、OpenCode skills 文件（zh-tw）的連結

## 2. 驗證

- [x] 2.1 執行 `hugo build` 確認頁面正常建置，不產生錯誤
- [x] 2.2 確認 `public/resources/agent-skills-standard/index.html` 存在
- [x] 2.3 確認頁面在資源列表中排在 `everything-claude-code` 之後、`client-observability` 之前
- [x] 2.4 確認頁面所有 Markdown 連結格式正確（無破損連結語法）

## 3. Commit

- [x] 3.1 使用 conventional commit 格式提交：`docs(resources): add agent-skills-standard resource page`
- [x] 3.2 同步更新 README.md（若有課程資源列表需更新）
