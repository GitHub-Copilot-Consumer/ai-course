## 1. 測試先行（TDD）

- [x] 1.1 撰寫測試：驗證 `ch-intro-ai.md` 包含「主流 Coding Agent CLI 比較」H2 標題
- [x] 1.2 撰寫測試：驗證 CLI 比較節包含「2026 年初」disclaimer 文字
- [x] 1.3 撰寫測試：驗證比較表中同時包含五個工具名稱（Claude Code、Codex CLI、Gemini CLI、GitHub Copilot、OpenCode）
- [x] 1.4 撰寫測試：驗證 OpenCode 的多模型支援標示為「是」，Claude Code / Codex CLI / Gemini CLI 標示為「否」
- [x] 1.5 撰寫測試：驗證廠商鎖定風險欄位中 OpenCode 為「低」、Claude Code 與 Codex CLI 為「高」
- [x] 1.6 撰寫測試：驗證 ASCII 光譜圖存在（含「單一廠商」與「模型無關」文字）
- [x] 1.7 撰寫測試：驗證「本課程」說明段落存在
- [x] 1.8 撰寫測試：驗證 CLI 比較節位置正確（在 Coding Agent 節之後、小結之前）
- [x] 1.9 確認所有測試初始狀態為失敗（Red）
- [ ] 1.10 git commit: `test: add cli-comparison section spec tests for ch-intro-ai`

## 2. 實作內容

- [ ] 2.1 在 `site/content/lessons/ch-intro-ai.md` 的「小結」節前插入新的 H2 節：`## 4. 主流 Coding Agent CLI 比較`
- [ ] 2.2 加入版本 disclaimer：「> 此比較基於 2026 年初的版本，AI 工具迭代迅速，各工具功能持續演進。」
- [ ] 2.3 加入七維度比較表（工具 × 開源 / 預設模型 / 多模型支援 / Fallback 能力 / Subagent 支援 / Native Tools 集合 / 廠商鎖定風險）
- [ ] 2.4 加入模型支援光譜 ASCII 圖（橫向排列，從單一廠商鎖定到完全模型無關）
- [ ] 2.5 加入「觀察重點」段落，說明多模型支援的本質差異
- [ ] 2.6 加入「Subagent 架構差異」觀察段落
- [ ] 2.7 加入「本課程的選擇」段落，說明使用 OpenCode + GitHub Copilot LLM 的理由（多模型彈性、不鎖定廠商、隱私）
- [ ] 2.8 git commit: `docs: add cli-comparison section to ch-intro-ai`

## 3. 驗證與收尾

- [ ] 3.1 執行所有測試，確認全數通過（Green）
- [ ] 3.2 更新 `openspec/specs/intro-ai-chapter/spec.md`：將 MODIFIED Requirement 的內容 merge 進主 spec（CLI 比較節位置需求）
- [ ] 3.3 更新 `openspec/specs/cli-comparison/spec.md`：建立此 capability 的主 spec 檔案
- [ ] 3.4 更新 `README.md` 以反映導言章節的內容變更
- [ ] 3.5 git commit: `docs: update specs and README for cli-comparison capability`
