## Context

目前課程大綱以單一 `index.md` 檔案存在於專案根目錄，內容涵蓋 6 個章節（0–5）與附錄。目標是建立一個 Hugo 靜態網站，將此課程內容結構化呈現為多頁面網站，並透過 GitHub Actions 自動部署至 GitHub Pages。

技術環境：
- Hugo v0.120+（靜態網站生成器）
- 繁體中文為主要語言
- 使用 trunk-based development 策略

## Goals / Non-Goals

**Goals:**

- 初始化 Hugo 專案，建立標準目錄結構（`hugo/`）
- 將 `index.md` 課程大綱內容轉換為 Hugo content pages
- 建立清晰的章節導覽（首頁 + 各章節頁面 + 附錄）
- 設定 GitHub Actions workflow 自動部署至 GitHub Pages
- 確保網站支援繁體中文，並具備基本響應式排版

**Non-Goals:**

- 不實作使用者登入或後端 API
- 不建立搜尋功能
- 不引入 JavaScript 框架（如 React/Vue）
- 不管理課程影片或多媒體資源
- 不實作多語系切換

## Decisions

### 1. Hugo 網站目錄置於 `hugo/` 子目錄

**決策：** 將 Hugo 專案放在 `hugo/` 子目錄，而非根目錄。

**理由：** 根目錄已有 `openspec/`、`index.md` 等非 Hugo 資產。將 Hugo 隔離於子目錄，可避免 Hugo 的 `public/`、`resources/` 目錄污染專案根目錄，並讓 CI/CD 指令更明確（`hugo -s hugo/`）。

**替代方案：** 使用根目錄作為 Hugo 根目錄 → 拒絕，因為會與 openspec 結構混用，導致目錄混亂。

### 2. 主題選擇：使用 PaperMod

**決策：** 採用 [hugo-PaperMod](https://github.com/adityatelange/hugo-PaperMod) 主題（git submodule）。

**理由：** PaperMod 是廣泛使用的 Hugo 主題，支援繁體中文、響應式設計、目錄（TOC）功能，且設定簡單。適合技術課程展示頁面。

**替代方案：** 
- Ananke：較為基礎，缺乏 TOC 支援
- 自製主題：開發成本高，不符合本需求範疇

### 3. 內容結構：各章節為獨立 Section

**決策：** 內容目錄結構如下：
```
hugo/content/
  _index.md          # 首頁（課程總覽）
  chapters/
    _index.md        # 章節列表頁
    ch0-warmup.md    # 第 0 章
    ch1-copilot.md   # 第 1 章
    ch2-sdd.md       # 第 2 章
    ch3-openspec.md  # 第 3 章
    ch4-opencode.md  # 第 4 章
    ch5-team.md      # 第 5 章
  appendix/
    _index.md        # 附錄
    commands.md      # 常用指令速查
```

**理由：** 以明確的檔案清單（explicit list）管理內容，避免使用 glob 匹配。每個章節對應 `index.md` 的一個 `##` 區塊。

**替代方案：** 全部放在 `content/` 根目錄 → 拒絕，缺乏層次結構，導覽難以實作。

### 4. 部署：GitHub Actions + GitHub Pages

**決策：** 使用官方 `peaceiris/actions-hugo` + `peaceiris/actions-gh-pages` Actions，在 push to `main` 時觸發建置並部署至 `gh-pages` branch。

**理由：** 標準做法，設定簡單，與 trunk-based development 相容。

### 5. Hugo 設定格式：YAML

**決策：** 使用 `hugo.yaml`（YAML 格式）而非 `config.toml`。

**理由：** 與 openspec 的 YAML 設定風格一致，可讀性較高。

## Risks / Trade-offs

- **[風險] PaperMod 主題更新可能破壞樣式** → 使用 git submodule 鎖定特定版本，並在 CI 中以 `--recurse-submodules` 確保版本一致
- **[風險] Hugo 版本不相容** → 在 `hugo.yaml` 指定 `min_version`，CI 中固定 Hugo 版本
- **[取捨] 使用子目錄 `hugo/` 增加 CI 指令複雜度** → 接受此取捨，換取目錄結構清晰
- **[風險] GitHub Pages 設定需在 Repo Settings 手動啟用** → 在 tasks.md 中明確列為手動步驟

## Migration Plan

1. 在 `hugo/` 建立 Hugo 專案結構（本機）
2. 安裝 PaperMod 主題（git submodule）
3. 建立 content 頁面（從 `index.md` 轉換）
4. 本機測試：`hugo server -s hugo/`
5. 建立 `.github/workflows/deploy.yml`
6. Push to `main`，確認 GitHub Actions 成功執行
7. 在 Repo Settings > Pages 設定 source 為 `gh-pages` branch

## Open Questions

- GitHub Pages 的 `baseURL` 需確認 Repo 名稱（部署後需更新 `hugo.yaml`）
- 是否需要自訂 domain？（目前假設使用 `<username>.github.io/<repo>` 預設路徑）
