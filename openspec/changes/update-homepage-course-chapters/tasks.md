## 1. 測試先行：建立驗證腳本

- [x] 1.1 建立測試腳本 `scripts/test-homepage-links.sh`，讀取 `site/content/_index.md` 並驗證以下 9 個連結路徑全部存在：`/lessons/ch-intro-ai/`、`/lessons/ch0-warmup/`、`/lessons/ch1-vibe-coding/`、`/lessons/ch2-mvp-to-spec/`、`/lessons/ch3-openspec/`、`/lessons/ch4-coding-agent/`、`/lessons/ch5-verify-observe/`、`/lessons/ch6-team/`、`/lessons/appendix-setup/`
- [x] 1.2 驗證測試腳本在修改前執行失敗（紅燈），確認測試有效性
- [ ] 1.3 git commit: `test: add homepage course links validation script`

## 2. 更新首頁課程章節清單

- [ ] 2.1 修改 `site/content/_index.md`，將「課程章節」區塊的連結清單替換為設計文件中的 9 個正確連結（依序：導言、ch0-ch6、附錄）
- [ ] 2.2 確認舊的錯誤連結（`/lessons/ch1-copilot/`、`/lessons/ch2-sdd/`、`/lessons/ch4-opencode/`、`/lessons/ch5-team/`）已從檔案中移除
- [ ] 2.3 git commit: `fix: update homepage course chapter links to match current lesson slugs`

## 3. 驗證

- [ ] 3.1 執行測試腳本 `scripts/test-homepage-links.sh`，確認所有 9 個連結驗證通過（綠燈）
- [ ] 3.2 在本地以 `hugo server` 啟動站點，目視確認首頁顯示正確的 9 個章節連結且各連結可正常跳轉

## 4. 同步文件

- [ ] 4.1 更新 `README.md`，同步反映最新課程章節清單（如 README 中有章節連結的話）
- [ ] 4.2 git commit: `docs: sync README with updated course chapter list`
