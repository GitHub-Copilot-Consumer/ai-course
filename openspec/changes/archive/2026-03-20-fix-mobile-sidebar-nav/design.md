## Context

Hextra 主題（`github.com/imfing/hextra@v0.12.1`）的 `sidebar.html` partial 將行動版與桌機版的 sidebar 內容拆成兩個獨立的 `<ul>`：

- **行動版清單**（`hx:md:hidden`）：僅從 `site.Menus.main` 渲染頂層選單項目，本站為「課程章節」與「相關資源」兩個連結。
- **桌機版清單**（`hx:max-md:hidden`）：從 `$navRoot`（即 lessons section）遞迴渲染完整章節頁面樹狀結構。

行動裝置開啟漢堡選單後只看到兩個無用的頂層連結，無法直接導航到特定章節。

Hugo 主題覆寫機制：將自訂 partial 放在 `site/layouts/partials/<name>.html` 即可覆寫主題對應的 `layouts/_partials/<name>.html`，Hugo 會優先使用專案本地的版本。

## Goals / Non-Goals

**Goals:**
- 行動裝置打開 sidebar 後顯示與桌機版相同的章節頁面樹狀清單
- 不破壞桌機版的現有行為
- 盡量減少與 Hextra 上游的差異，降低未來升級成本

**Non-Goals:**
- 不修改 Hextra 的 JavaScript（`menu.js` 的開關邏輯無需變動）
- 不修改 CSS（`sidebar.css` 的固定定位與動畫無需變動）
- 不修改行動版 navbar 或漢堡按鈕

## Decisions

### Decision 1：覆寫 `sidebar.html` partial，合併兩個 `<ul>` 為一

**方案 A（採用）：覆寫 sidebar partial，移除雙清單分流**

從 Hextra 複製完整 315 行的 `sidebar.html` 到 `site/layouts/partials/sidebar.html`，並將原本第 31–45 行的兩個獨立 `<ul>` 合併為一個統一清單：

```diff
-<ul class="hx:flex hx:flex-col hx:gap-1 hx:md:hidden">
-  <!-- 行動版：只顯示 menu.main 項目 -->
-  {{ template "sidebar-main" (dict "context" site.Home "pageURL" $pageURL "page" $context "toc" true) }}
-  {{ template "sidebar-footer" }}
-</ul>
-
-<ul class="hx:flex hx:flex-col hx:gap-1 hx:max-md:hidden">
-  <!-- 桌機版：顯示完整頁面樹 -->
-  {{ template "sidebar-main" (dict "context" $navRoot "page" $context "pageURL" $pageURL) }}
-  {{ template "sidebar-footer" }}
-</ul>
+<ul class="hx:flex hx:flex-col hx:gap-1">
+  <!-- 統一清單：手機與桌機皆顯示完整頁面樹 -->
+  {{ template "sidebar-main" (dict "context" $navRoot "page" $context "pageURL" $pageURL) }}
+  {{ template "sidebar-footer" }}
+</ul>
```

差異極小（刪除一個 `<ul>` block，修改另一個的 class 與 template 呼叫），其餘 310 行保持原封不動。

**方案 B（捨棄）：CSS-only 覆寫**

在 `site/static/css/custom.css` 加入：
```css
@media (max-width: 48rem) {
  .hextra-sidebar-container ul.hx\:max-md\:hidden { display: flex !important; }
}
```
問題：依賴 Hextra 內部 class name，語意脆弱；且行動版仍同時顯示兩個清單（重複的頂層選單項目 + 章節樹），畫面凌亂。

**方案 C（捨棄）：修改 `config.yaml` 的 `menu.sidebar`**

手動維護 sidebar 選單項目。問題：與章節頁面結構脫鉤，新增章節時需雙重維護。

### Decision 2：不複製 `sidebar-main` 的 `toc: true` 參數

統一清單使用 `toc: false`（即不傳入 toc 參數），與桌機版原行為一致。行動版過去傳入 `toc: true` 是為了在 menu.main 樹中顯示 TOC headings，但章節頁面樹狀導覽不需要此行為。

## Risks / Trade-offs

- **[升級風險] Hextra 版本升級可能導致 sidebar.html 上游有新功能** → 升級 Hextra 時需 diff 比對 `site/layouts/partials/sidebar.html` 與新版主題的 `layouts/_partials/sidebar.html`，在 CHANGELOG 或 PR 中標記提醒。
- **[行為變更] 行動版不再顯示頂層 menu.main 項目** → 「課程章節」與「相關資源」連結已在 navbar 中可見，sidebar 中移除不影響可用性。
- **[測試] 目前無行動版 sidebar 的 E2E 測試** → 新增 Playwright E2E 測試覆蓋此行為，確保迴歸防護。
