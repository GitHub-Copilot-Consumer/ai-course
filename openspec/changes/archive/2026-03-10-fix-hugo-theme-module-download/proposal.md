## Why

Hugo Modules 的主題模組路徑與版本不相容，造成初始化失敗。改採官方建議的 git submodule 可避免模組路徑問題並提升可重現性。

## What Changes

- 改用 git submodule 管理 Hugo Book 主題。
- 更新 Hugo 設定使用 `hugo-book` 主題。
- 補充初始化/更新指引，包含 submodule 下載與更新步驟。

## Capabilities

### New Capabilities
- `hugo-theme-submodule`: 定義 Hugo 主題以 git submodule 管理的設定與初始化流程。

### Modified Capabilities
- (none)

## Impact

- Hugo 設定檔（theme 設定）
- git submodule 設定（.gitmodules、themes/hugo-book）
- 初始化與更新流程文件
- CI 或本機建置步驟（若有）
