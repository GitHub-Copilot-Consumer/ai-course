## 1. 課程敘事框架（_index.md、導言、Ch0）

- [x] 1.1 更新 `_index.md`：description 改為「從 Vibe Coding 快速原型到規格驅動開發的完整課程，聚焦 Brownfield 場景。」，git commit `docs: update course index description for brownfield focus`
- [x] 1.2 更新 `ch-intro-ai.md`：在「為何 Coding Agent 需要規格」段落補充 Brownfield 脈絡說明，git commit `docs: add brownfield context to coding agent rationale in intro`
- [x] 1.3 更新 `ch-intro-ai.md`：小結圖示改為反映「Vibe Coding → SDD」敘事弧線，git commit `docs: update intro summary diagram to reflect vibe-coding to sdd arc`
- [x] 1.4 更新 `ch0-warmup.md`：階段二改為先肯定 Vibe Coding 在原型階段的價值，git commit `docs: reframe stage 2 as vibe coding asset in greenfield`
- [x] 1.5 更新 `ch0-warmup.md`：三個災難現場的框架改為「Brownfield 階段用錯方法」，每個場景加入說明句，git commit `docs: reframe disaster scenarios as brownfield-phase misuse`
- [x] 1.6 更新 `ch0-warmup.md`：課程核心目標改為 Greenfield → Brownfield 雙階段路徑，git commit `docs: update course goal to greenfield-brownfield dual phase path`
- [x] 1.7 更新 `ch0-warmup.md`：新增「Brownfield vs Greenfield」對比段落，git commit `docs: add brownfield vs greenfield contrast section to ch0`
- [x] 1.8 更新 `ch0-warmup.md`：新增課程路線圖 ASCII 圖示，git commit `docs: add course roadmap ascii diagram to ch0`

## 2. Ch1：Vibe Coding 章節重構

- [x] 2.1 新增 `site/content/lessons/ch1-vibe-coding.md`，複製 `ch1-copilot.md` 內容作為基礎，更新 front matter（title、description、weight 保持 2），git commit `docs: create ch1-vibe-coding.md with updated title and description`
- [x] 2.2 更新 `ch1-vibe-coding.md`：新增「Vibe Coding 方法論」段落（定義、適用場景、操作心法），git commit `docs: add vibe coding methodology section to ch1`
- [x] 2.3 更新 `ch1-vibe-coding.md`：新增「Prototype 退出條件」段落（三個退出信號），git commit `docs: add prototype exit criteria section to ch1`
- [x] 2.4 更新 `ch1-vibe-coding.md`：Lab B 改為「用 Copilot Vibe Code 一個完整 MVP」，結尾加入引導至 Ch2 的提示語，git commit `docs: update ch1 lab b to vibe coding mvp exercise`
- [x] 2.5 刪除 `site/content/lessons/ch1-copilot.md`，git commit `docs: remove deprecated ch1-copilot.md`

## 3. Ch2：MVP 到規格章節重構

- [ ] 3.1 新增 `site/content/lessons/ch2-mvp-to-spec.md`，複製 `ch2-sdd.md` 內容作為基礎，更新 front matter（title、description），git commit `docs: create ch2-mvp-to-spec.md with updated title and description`
- [ ] 3.2 更新 `ch2-mvp-to-spec.md`：新增轉折點開場（三個引導問題 + 「歡迎來到 Brownfield」），git commit `docs: add brownfield turning point opening to ch2`
- [ ] 3.3 更新 `ch2-mvp-to-spec.md`：新增「MVP 之後的三條路」段落，git commit `docs: add three paths after mvp section to ch2`
- [ ] 3.4 更新 `ch2-mvp-to-spec.md`：新增「Proposal = MVP 的結晶」段落，包含範例，git commit `docs: add proposal as mvp crystallization concept to ch2`
- [ ] 3.5 更新 `ch2-mvp-to-spec.md`：TDD vs SDD 比較加入 Vibe Coding 後的 MVP 情境說明，git commit `docs: add vibe coding context to tdd vs sdd comparison in ch2`
- [ ] 3.6 更新 `ch2-mvp-to-spec.md`：環境初始化段落改為「在 MVP 專案上初始化 OpenSpec」定位，加入附錄引導，git commit `docs: reframe openspec init as brownfield setup in ch2`
- [ ] 3.7 更新 `ch2-mvp-to-spec.md`：Lab 改為「為 Ch1 的 MVP 撰寫 proposal.md」，git commit `docs: update ch2 lab to writing proposal from mvp exercise`
- [ ] 3.8 刪除 `site/content/lessons/ch2-sdd.md`，git commit `docs: remove deprecated ch2-sdd.md`

## 4. Ch3：OpenSpec 工作流定位調整

- [ ] 4.1 更新 `ch3-openspec.md`：front matter title 改為「Technical Spec 與 OpenSpec 工作流」，description 更新，git commit `docs: update ch3 title and description to technical spec focus`
- [ ] 4.2 更新 `ch3-openspec.md`：新增開場銜接段落（從 Proposal 到 Technical Spec + Brownfield 脈絡），git commit `docs: add proposal-to-tech-spec bridging opening to ch3`
- [ ] 4.3 更新 `ch3-openspec.md`：apply/verify/archive 三個指令改為預覽性質，加入「詳見 Ch4/Ch5」引導，git commit `docs: simplify apply/verify/archive to previews in ch3`
- [ ] 4.4 更新 `ch3-openspec.md`：Lab 改為「從 Proposal 生成 Technical Spec」，git commit `docs: update ch3 lab to generating tech spec from proposal`

## 5. Ch4：Coding Agent 章節精簡

- [ ] 5.1 新增 `site/content/lessons/ch4-coding-agent.md`，複製 `ch4-opencode.md` 內容作為基礎，更新 front matter（title、description），git commit `docs: create ch4-coding-agent.md with updated title and description`
- [ ] 5.2 更新 `ch4-coding-agent.md`：移除 OpenCode 安裝步驟、API Key 設定，改為附錄引導句，git commit `docs: remove setup steps from ch4, add appendix reference`
- [ ] 5.3 更新 `ch4-coding-agent.md`：移除 Ollama 安裝段落與離線開發 Lab，git commit `docs: remove ollama setup and offline lab from ch4 main content`
- [ ] 5.4 更新 `ch4-coding-agent.md`：新增「Brownfield 開發注意事項」段落，git commit `docs: add brownfield development guidelines to ch4`
- [ ] 5.5 更新 `ch4-coding-agent.md`：強化 Plan Mode 在 Brownfield 的角色說明，git commit `docs: enhance plan mode brownfield usage guidance in ch4`
- [ ] 5.6 更新 `ch4-coding-agent.md`：Lab 改為「在 MVP 上依 tasks.md 實作」，git commit `docs: update ch4 lab to implementing from tasks on existing mvp`
- [ ] 5.7 刪除 `site/content/lessons/ch4-opencode.md`，git commit `docs: remove deprecated ch4-opencode.md`

## 6. Ch5：新增驗證、測試與可觀測性章節

- [ ] 6.1 新增 `site/content/lessons/ch5-verify-observe.md`，建立完整 front matter（title：「驗證、測試與可觀測性」、weight: 6），git commit `docs: create ch5-verify-observe.md with front matter`
- [ ] 6.2 撰寫 Ch5「Spec 驗證」段落（openspec verify 完整操作、drift detection 輸出範例、修復流程），git commit `docs: add spec verification section to ch5`
- [ ] 6.3 撰寫 Ch5「AI 輔助測試」段落（scenario → test case 對應、Prompt 範例），git commit `docs: add ai-assisted testing section to ch5`
- [ ] 6.4 撰寫 Ch5「運行時可觀測性」段落（structured logging Prompt 範例、error tracking 概念、health check），git commit `docs: add observability section to ch5`
- [ ] 6.5 撰寫 Ch5「AI 輔助 Debug」段落（/opsx:explore 使用範例），git commit `docs: add ai-assisted debug section to ch5`
- [ ] 6.6 撰寫 Ch5 收尾：openspec archive 完整操作（verify 通過後歸檔），git commit `docs: add openspec archive as ch5 closing section`
- [ ] 6.7 撰寫 Ch5 Lab（verify + 修復 drift + observability + archive），git commit `docs: add lab to ch5 verify observe`

## 7. Ch6：團隊章節更新

- [ ] 7.1 新增 `site/content/lessons/ch6-team.md`，複製 `ch5-team.md` 內容，更新 front matter（weight: 7），git commit `docs: create ch6-team.md with updated weight`
- [ ] 7.2 更新 `ch6-team.md`：Roadmap 加入 Greenfield/Brownfield 分界說明，git commit `docs: update team roadmap to reflect greenfield-brownfield phases`
- [ ] 7.3 更新 `ch6-team.md`：新增完整生命週期回顧段落（ASCII 圖示），git commit `docs: add full lifecycle review closing section to ch6`
- [ ] 7.4 刪除 `site/content/lessons/ch5-team.md`，git commit `docs: remove deprecated ch5-team.md`

## 8. 附錄：工具安裝

- [ ] 8.1 新增 `site/content/lessons/appendix-setup.md`，建立 front matter（title：「附錄：工具安裝與環境設定」、weight: 999），git commit `docs: create appendix-setup.md with front matter`
- [ ] 8.2 撰寫 OpenSpec CLI 安裝段落（從 ch2/ch3 整合過來），git commit `docs: add openspec cli setup to appendix`
- [ ] 8.3 撰寫 OpenCode 安裝與 API Key 設定段落（從 ch4 搬移），git commit `docs: add opencode setup and api key config to appendix`
- [ ] 8.4 撰寫 Ollama 安裝與本地模型段落（從 ch4 搬移），git commit `docs: add ollama local model setup to appendix`

## 9. 收尾

- [ ] 9.1 更新 `README.md`，反映新的課程結構與章節列表，git commit `docs: sync readme with new course chapter structure`
