## 1. 撰寫 E2E 測試（TDD 先行）

- [x] 1.1 在 `site/tests/e2e/mobile-sidebar-nav.e2e.js` 新增 Playwright E2E 測試，驗證行動裝置（375px）展開 sidebar 後可看到章節連結（如 `/lessons/ch0-warmup/`）
- [x] 1.2 在 `site/tests/e2e/mobile-sidebar-nav.e2e.js` 新增測試，驗證章節連結順序正確（導言在前，依 weight 排序）
- [x] 1.3 在 `site/tests/e2e/mobile-sidebar-nav.e2e.js` 新增測試，驗證桌機版（1280px）sidebar 行為不受影響（章節連結正常顯示）
- [x] 1.4 執行測試確認全部失敗（紅燈），git commit: `test: add mobile sidebar nav E2E tests`

## 2. 實作 sidebar partial 覆寫

- [x] 2.1 從 Hextra module cache 複製 `sidebar.html`（`github.com/imfing/hextra@v0.12.1/layouts/_partials/sidebar.html`）到 `site/layouts/partials/sidebar.html`
- [x] 2.2 在 `site/layouts/partials/sidebar.html` 頂部加入版本標記注解，說明此為覆寫檔及對應的上游版本
- [x] 2.3 合併第 31–45 行的兩個 `<ul>`：刪除 `hx:md:hidden` 的行動版清單（含 `toc: true` 的 `sidebar-main` 呼叫），保留桌機版清單並移除 `hx:max-md:hidden` class
- [x] 2.4 執行 `hugo server` 於本機驗證：行動版 375px 展開 sidebar 顯示章節連結；桌機版 1280px sidebar 正常
- [ ] 2.5 git commit: `feat: override sidebar partial to show chapter links on mobile`

## 3. 驗證測試通過

- [x] 3.1 執行 Playwright E2E 測試：`npx playwright test mobile-sidebar-nav`，確認全部綠燈
- [x] 3.2 執行既有 E2E 測試套件，確認無迴歸：`npx playwright test`
- [ ] 3.3 git commit: `test: verify mobile sidebar nav E2E tests pass`

## 4. 收尾

- [ ] 4.1 更新 `README.md`，記錄 `site/layouts/partials/sidebar.html` 為 Hextra 覆寫檔及升級注意事項
- [ ] 4.2 git commit: `docs: note sidebar partial override in README`
