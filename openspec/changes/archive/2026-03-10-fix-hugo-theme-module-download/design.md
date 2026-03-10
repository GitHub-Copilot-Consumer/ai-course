## Context

目前使用 Hugo Modules 下載主題時，因模組主路徑與版本不一致而失敗。改為 git submodule 可避免 Go Modules 版本路徑問題，並讓主題版本由 Git 明確鎖定。

## Goals / Non-Goals

**Goals:**
- 明確定義 Hugo Book 主題的 submodule 來源與鎖定方式。
- 讓初始化與更新流程在一致設定下成功完成。
- 保持設定簡單、可讀、可維護。

**Non-Goals:**
- 不引入 Hugo Modules 作為主題來源。
- 不新增自動偵測或動態解析路徑的邏輯。

## Decisions

- 使用 git submodule 管理主題，路徑固定為 `site/themes/hugo-book`，URL 為 `https://github.com/alex-shpak/hugo-book`。
  - 替代方案：使用 Hugo Modules。選擇 submodule 是為了避免 Go Modules 路徑問題並讓版本由 Git 明確鎖定。
- Hugo 設定使用 `theme: "hugo-book"`，不依賴 Modules `imports`。
  - 替代方案：動態解析或自動偵測主題路徑。避免隱含規則造成維護風險。

## Risks / Trade-offs

- [環境需支援 git submodule] → 提供明確初始化/更新指引。
- [版本鎖定需要手動更新] → 在更新流程中明確說明切換版本步驟。
