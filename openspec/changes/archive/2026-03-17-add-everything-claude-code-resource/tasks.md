## 1. 測試先行（TDD）

- [x] 1.1 建立測試腳本 `site/tests/resources/everything-claude-code.test.js`，涵蓋以下驗證：頁面檔案存在、frontmatter 欄位完整（title、weight: 2、description、showToc: true）、包含 GitHub URL、包含五個核心元件名稱（Skills/Hooks/Commands/Rules/Instincts）、包含安裝說明段落、包含 OpenCode 整合區塊
- [x] 1.2 執行測試，確認全部失敗（Red 狀態）
- [x] 1.3 git commit: `test: add spec tests for everything-claude-code resource page`

## 2. 建立內容頁面

- [x] 2.1 新增 `site/content/resources/everything-claude-code.md`，包含完整 frontmatter（title、weight: 2、description、showToc: true）
- [x] 2.2 撰寫「專案簡介」區塊：說明 everything-claude-code 是 agent harness 系統、支援工具列表、附 GitHub 連結 `https://github.com/affaan-m/everything-claude-code`
- [x] 2.3 撰寫「核心元件」區塊：以表格列出 Skills、Hooks、Commands、Rules、Instincts 及各自功能說明
- [x] 2.4 撰寫「安裝方式」區塊：分別說明 Plugin 安裝（npm install 指令）與手動安裝步驟
- [x] 2.5 撰寫「與 OpenCode 整合」區塊：說明整合步驟（plugin 設定或手動路徑），並提供至少兩個具體使用場景範例（如 Skills 整合、Hooks 自動化）
- [x] 2.6 git commit: `docs: add everything-claude-code resource page with opencode integration guide`

## 3. 驗證

- [x] 3.1 執行測試腳本，確認全部通過（Green 狀態）
- [x] 3.2 執行 Hugo 建置（`npm run build` 或 `hugo` 於 `site/` 目錄），確認 exit code 0 且無錯誤
- [x] 3.3 同步更新 `README.md`（若有課程資源索引區塊）
- [x] 3.4 git commit: `chore: verify build and sync readme for everything-claude-code resource`
