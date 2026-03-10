## 1. Baseline 與測試

- [x] 1.1 盤點現有 Hugo 模組設定檔與初始化流程（確認模組清單維護位置）
- [x] 1.2 以 TDD 方式新增或更新測試：驗證 `theme` 設定為 `hugo-book`

## 2. 模組設定修正

- [x] 2.1 更新 Hugo 設定，使用 `theme: "hugo-book"` 並移除 Modules 設定
- [x] 2.2 確認 git submodule 來源與版本鎖定方式
- [x] 2.3 以原子提交完成本階段變更（conventional commit）

## 3. 初始化與文件

- [x] 3.1 更新初始化/更新指引，明確列出 submodule 下載與更新步驟
- [x] 3.2 執行相關測試與建置流程，確認錯誤不再發生且覆蓋率 > 80%
- [x] 3.3 同步 README.md 並提交文件變更（conventional commit）
