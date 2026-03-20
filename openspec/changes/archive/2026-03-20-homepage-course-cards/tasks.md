## 1. 測試先行（TDD）

- [x] 1.1 在 `site/tests/` 新增 E2E 測試 `homepage-cards.spec.ts`，測試以下場景：
  - 首頁可見「從 AI 輔助到規格驅動 (SDD) 實戰攻略」卡片標題
  - 首頁可見「Agent 整合與自訂擴展」卡片標題
  - SDD 卡片連結指向 `/sdd/`
  - Agent 卡片連結指向 `/agent/`
  - 首頁不含個別章節路徑連結（如 `/sdd/ch0-warmup/`）
  - 參考資料中可見 `/appendix/setup/` 與 `/resources/` 連結
- [x] 1.2 確認測試在目前狀態下**失敗**（紅燈），作為 TDD 起點

## 2. 實作首頁卡片佈局

- [x] 2.1 修改 `site/content/_index.md`：移除兩個課程的 `##` 標題、描述段落、章節 bullet list 及分隔水平線
- [x] 2.2 在原課程區塊位置加入 `hextra/feature-grid`（cols="2"）包裹兩張 `hextra/feature-card`：
  - Card 1：`title="📘 從 AI 輔助到規格驅動 (SDD) 實戰攻略"`、`subtitle`（1-2 句）、`link="/sdd/"`
  - Card 2：`title="🤖 Agent 整合與自訂擴展"`、`subtitle`（1-2 句）、`link="/agent/"`
- [x] 2.3 確認參考資料區塊（`## 參考資料` 及連結）保持不變
- [x] 2.4 本地執行 `hugo server` 確認頁面渲染正確，卡片並排顯示

## 3. 驗證與提交

- [x] 3.1 執行 E2E 測試，確認所有測試通過（綠燈）
- [x] 3.2 git commit（conventional commit）：`feat: replace homepage course list with feature cards`
- [x] 3.3 同步更新 `README.md`（若有課程首頁相關描述需更新）
