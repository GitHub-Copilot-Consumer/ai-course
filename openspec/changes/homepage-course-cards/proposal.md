## Why

課程首頁目前以純 Markdown 線性列出課程內容（標題、描述、章節清單、水平線），視覺層次不清晰，缺乏吸引力。改用卡片式佈局可以讓每個課程一目了然，並與 Hextra 主題的著陸頁風格一致。

## What Changes

- 將 `site/content/_index.md` 的課程列表區塊替換為 `hextra/feature-grid` + `hextra/feature-card` shortcode
- 首頁不再列出個別章節連結（章節導航由進入課程後的 sidebar 負責）
- 兩個課程（SDD 實戰攻略、Agent 整合與自訂擴展）各自呈現為一張大面積 feature card，並帶有 link、title、subtitle
- 參考資料區塊維持原本的 Markdown 連結格式，不做變動

## Capabilities

### New Capabilities

- `homepage-layout`: 課程首頁的卡片式佈局——使用 Hextra 內建 shortcode 呈現課程卡片網格

### Modified Capabilities

（無——本次變更不涉及任何現有 spec 層級行為的改變）

## Impact

- 僅影響 `site/content/_index.md` 一個檔案
- 不涉及任何 layout、CSS 或自訂元件的修改
- 不影響 `/sdd/` 和 `/agent/` 的子頁面或 sidebar 導航
- 無 API 或後端影響（純靜態內容變更）
