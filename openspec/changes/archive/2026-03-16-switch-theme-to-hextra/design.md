## Context

目前 `site/` 使用 hugo-book 主題，以 git submodule 方式管理（`site/themes/hugo-book`）。hugo-book 為左側欄導覽式文件主題，已有自訂 partial（`site/layouts/_partials/docs/menu-filetree.html`）用於過濾 `bookHidden` 的頁面。

Hextra 是以 Hugo Module 為主要推薦安裝方式的現代文件主題，支援 Tailwind CSS 樣式、深色模式、全文搜尋，且內建側欄導覽不需自訂 partial。

本設計描述如何從 hugo-book (submodule) 遷移至 Hextra (Hugo Module)。

## Goals / Non-Goals

**Goals:**
- 以 Hugo Module 方式安裝 Hextra，取代 git submodule 管理的 hugo-book
- 更新 `site/config.yaml` 設定以符合 Hextra 規範
- 更新 `site/go.mod` 加入 hextra module 依賴
- 移除 hugo-book 專用自訂 partial，改用 Hextra 原生側欄
- 遷移 content front matter 中 hugo-book 特有參數至 Hextra 對應設定
- 更新 `.gitmodules` 移除 hugo-book submodule 條目
- 移除 `site/themes/hugo-book/` submodule 目錄
- 更新 `README.md` 中主題安裝說明

**Non-Goals:**
- 不變更課程內容本身（各章節 `.md` 正文）
- 不遷移 `hugo/` 目錄（PaperMod 另一套 Hugo 站點，不在此次範圍內）
- 不更改 GitHub Pages 部署工作流（`deploy.yml`），僅確認相容性
- 不新增 Hextra 進階功能（如多語系、評論等）

## Decisions

### 決策 1：使用 Hugo Module 而非 Git Submodule 安裝 Hextra

**選擇**：Hugo Module（`go mod`）
**備選**：Git Submodule（`site/themes/hextra/`）

**理由**：
- Hextra 官方推薦 Hugo Module 方式，免去手動管理 submodule 的步驟
- `site/` 已有 `go.mod`，可直接擴充，無需新增 submodule
- CI/CD 部署時 Hugo Module 自動下載，不需額外的 `git submodule update --init`
- 升級主題版本只需 `hugo mod get -u github.com/imfing/hextra`

**設定方式**：在 `site/config.yaml`（或新建 `site/hugo.toml`）加入：
```yaml
module:
  imports:
    - path: github.com/imfing/hextra
```
並移除 `theme: "hugo-book"` 字段。

`site/go.mod` 執行 `hugo mod get github.com/imfing/hextra` 後，自動新增 hextra 依賴。

---

### 決策 2：保留 `site/config.yaml` 格式，擴充 Hextra 必要參數

**選擇**：在現有 `site/config.yaml` 調整
**備選**：改用 `site/hugo.toml` TOML 格式

**理由**：現有設定為 YAML，維持一致格式減少改動範圍。Hextra 的設定均可以 YAML 表達。

**需新增/修改的 config 欄位**（明確清單）：
- 移除 `theme: "hugo-book"`
- 移除 `params.BookSection: "lessons"`
- 新增 `module.imports` 指向 hextra
- 保留 `title`、`languageCode`、`params.description`、`menu.main`
- 可選：新增 `params.navbar.displayTitle: true`

---

### 決策 3：移除 hugo-book submodule，保留內容結構不變

**選擇**：移除 `site/themes/hugo-book/` submodule
**方式**：
1. `git submodule deinit -f site/themes/hugo-book`
2. `git rm -f site/themes/hugo-book`
3. 從 `.gitmodules` 移除對應條目（明確行號查找，非 pattern matching）

---

### 決策 4：移除 hugo-book 專用自訂 partial

移除檔案清單（明確列出）：
- `site/layouts/_partials/docs/menu-filetree.html`

Hextra 以 `_index.md` 控制側欄結構，不需 hugo-book 的 `bookHidden` 機制。

---

### 決策 5：front matter 參數遷移

目前各章節頁面 front matter 使用 hugo-book 特有參數的明確清單：

**需移除的參數**（如存在）：
- `bookHidden`
- `bookFlatSection`
- `bookCollapseSection`

**保留的通用參數**：
- `title`
- `weight`
- `description`
- `showToc` / `toc`（Hextra 支援 `toc: true/false`）

調查方式：逐一讀取 `site/content/lessons/`、`site/content/assignments/`、`site/content/resources/` 下所有 `.md` 檔案 front matter。

## Risks / Trade-offs

- [視覺落差] Hextra 與 hugo-book 排版不同，側欄結構由 `_index.md` 的 `weight` 控制，需確認所有章節 `_index.md` 均有正確 `weight` → 實作時逐一確認
- [Go 版本依賴] Hextra Hugo Module 需要 Go 環境；CI/CD（`deploy.yml`）若未安裝 Go，需新增 Go setup 步驟 → 確認 workflow 中是否已有 `actions/setup-go`
- [Hugo 版本] Hextra 需要 Hugo extended version；若 CI 使用 hugo-bin 需確認版本 → 確認 `deploy.yml` 中 Hugo 安裝指令
- [自訂 partial 遺失] 移除 `menu-filetree.html` 後，hugo-book 特有的 `bookHidden` 過濾行為消失，但 Hextra 以 front matter `draft: true` 或不列入 `_index.md` 來達到相同效果 → 確認是否有頁面使用 `bookHidden: true`

## Migration Plan

1. 確認現有 `site/content/` front matter，建立需調整的參數清單
2. 移除 hugo-book submodule（`git submodule deinit` + `git rm`）
3. 更新 `.gitmodules` 移除 hugo-book 條目
4. 執行 `hugo mod get github.com/imfing/hextra`（更新 `site/go.mod`）
5. 更新 `site/config.yaml`（移除 `theme`、`BookSection`，加入 `module.imports`）
6. 移除 `site/layouts/_partials/docs/menu-filetree.html`
7. 清理各 content 頁面 front matter（移除 hugo-book 特有參數）
8. 本地執行 `hugo server -s site/` 確認建置成功
9. 確認 `.github/workflows/deploy.yml` 中 Go 環境已設定
10. 更新 `README.md` 主題安裝說明

**回滾策略**：若 Hextra 建置失敗，可透過 `git revert` 還原 submodule 設定，因本次改動以 atomic commit 切割。

## Open Questions

- `deploy.yml` 是否已包含 Go setup 步驟？（需在 tasks 實作前確認）
- Hextra 的 `menu.main` 設定格式是否與 hugo-book 相容？（需測試）
