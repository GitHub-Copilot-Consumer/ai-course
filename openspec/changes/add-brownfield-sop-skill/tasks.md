## 1. 新增 openspec-brownfield-onboarding skill

- [ ] 1.1 建立 `.opencode/skills/openspec-brownfield-onboarding/` 目錄
- [ ] 1.2 撰寫 `SKILL.md`：定義 skill 的 name、description、metadata
- [ ] 1.3 撰寫 Phase 1 步驟 1：引導使用者執行 `openspec init` 最小初始化（四個指令）
- [ ] 1.4 撰寫 Phase 1 步驟 2：引導技術債盤點，進入 explore 模式，輸出問題清單
- [ ] 1.5 撰寫 Phase 1 步驟 3：找出入口點（git log、issue tracker、團隊共識、核心業務邏輯）
- [ ] 1.6 撰寫 Phase 1 步驟 4：產出三分類模組地圖（高風險核心 / 穩定模組 / 遺忘暗區）
- [ ] 1.7 撰寫 Phase 2 步驟：用偵察結果填寫 `config.yaml`，提供預填模板
- [ ] 1.8 撰寫 Phase 2 步驟：建立 `openspec/specs/` 骨架（依高風險核心模組建立空白 spec 檔案）
- [ ] 1.9 撰寫 guardrails：Phase 1 完成前不進入 Phase 2、config.yaml 不需要完美

## 2. 新增 /opsx-brownfield-onboard command

- [ ] 2.1 建立 `.opencode/commands/` 目錄（若尚未存在）
- [ ] 2.2 建立 `.opencode/commands/opsx-brownfield-onboard.md`，設定 description 與 template
- [ ] 2.3 template 內容：一段 prompt 委派給 `openspec-brownfield-onboarding` skill，不重複定義流程

## 3. 新增 openspec-retro-spec skill

- [ ] 3.1 建立 `.opencode/skills/openspec-retro-spec/` 目錄
- [ ] 3.2 撰寫 `SKILL.md`：定義 skill 的 name、description、metadata
- [ ] 3.3 撰寫步驟 1：確認目標模組路徑（未提供時詢問）
- [ ] 3.4 撰寫步驟 2：進入 explore 模式，掃描指定路徑，列出所有業務規則與行為
- [ ] 3.5 撰寫步驟 3：建立 `retro-<module-name>` change，使用 `openspec new change`
- [ ] 3.6 撰寫步驟 4：產生所有 artifacts（ff 流程），proposal.md 須包含 `Current Reality` 與 `Known Gaps` 區塊
- [ ] 3.7 撰寫步驟 5：Human Review 提示，明確說明此步驟不可跳過
- [ ] 3.8 撰寫步驟 6：明確以警示區塊說明「不需要執行 apply，直接執行 verify」的原因
- [ ] 3.9 撰寫步驟 7：引導執行 `openspec-verify-change`，再執行 `openspec-archive-change`
- [ ] 3.10 撰寫 guardrails：AI 不得自行執行 apply、Human Review 是必要步驟

## 4. 新增 openspec-retro-spec-guard skill

- [ ] 4.1 建立 `.opencode/skills/openspec-retro-spec-guard/` 目錄
- [ ] 4.2 撰寫 `SKILL.md`：定義 skill 的 name、description、metadata
- [ ] 4.3 撰寫步驟 1：取得目標模組名稱（從使用者輸入或對話 context 推斷，未提供時詢問）
- [ ] 4.4 撰寫步驟 2：查詢 `openspec/specs/` 目錄，判斷是否存在對應子目錄且非空
- [ ] 4.5 撰寫步驟 3：依查詢結果給出三種建議（無目錄 / 有目錄但空 / 有目錄且有內容）
- [ ] 4.6 撰寫 guardrails：使用者明確表示忽略時不重複阻擋、不詢問使用者「你有沒有 Retro-Spec」
