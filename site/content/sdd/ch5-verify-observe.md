---
title: "5. 驗證、測試與可觀測性"
weight: 6
description: 用 openspec verify 確認實作符合規格，為 Brownfield 建立基礎可觀測性，最後以 archive 完成整個 SDD 循環。
showToc: true
---

> 用 openspec verify 確認實作符合規格，為 Brownfield 建立基礎可觀測性，最後以 archive 完成整個 SDD 循環。

## 學習目標

本章結束後，你將能夠：

- **認識** 可觀測性三本柱（Logs / Traces / Metrics）及其串接方式
- **執行** `openspec verify` 的完整流程，解讀 Drift 輸出並修復
- **應用** SDD + TDD 並用的測試策略，從 Spec Scenario 生成測試案例
- **使用** AI 為既有 Brownfield 程式碼加入 structured logging 與 error tracking
- **操作** `/opsx:explore` 在既有 codebase 中調查問題
- **完成** `openspec archive` 歸檔，讓規格成為活文件

---

## Spec 驗證：openspec verify

你在 Ch4 完成了所有實作，但「tasks 全打勾」不等於「實作符合規格」。`openspec verify` 做的是更嚴格的事：逐條對照 `specs/` 中的每個 Requirement 和 Scenario，確認 codebase 裡真的有對應的實作。

### 執行方式

```bash
openspec verify --change "formalize-todo-api"
```

### 通過情境（全部符合）

```
Checking 5 requirements...
  ✔ Todo can be created with a non-empty title
  ✔ Creating todo with empty title returns 400 error
  ✔ Todo list returns all existing todos
  ✔ Deleting non-existent todo returns 404
  ✔ Marking todo as complete updates its status

Result: 5/5 requirements satisfied
Ready to archive!
```

### Drift 情境（發現偏離）

```
Checking 5 requirements...
  ✔ Todo can be created with a non-empty title
  ✔ Creating todo with empty title returns 400 error
  ✔ Todo list returns all existing todos
  ✗ DRIFT: Deleting non-existent todo returns 404
    Expected: DELETE /todos/:id returns 404 with { error: "Todo not found" }
    Found: DELETE handler has no id validation, returns 200 regardless
  ✔ Marking todo as complete updates its status

Result: 4/5 requirements satisfied
Action required: Fix drift before archiving
```

### 修復 Drift 的標準流程

當 `verify` 發現 Drift，不要直接手動修程式碼——按照 SDD 流程處理：

**Step 1：回到 tasks.md，補充遺漏的 task**
```markdown
## Tasks

- [x] 加入 title 非空驗證
- [x] 加入基本 CRUD endpoint
- [ ] **[補充]** 加入 DELETE 的 404 處理（來自 verify drift）
```

**Step 2：在 OpenCode 中執行 apply，完成補充的 task**
```
[Build Mode]
/opsx-apply formalize-todo-api

請完成 tasks.md 中最後一個未完成的 task：
加入 DELETE /todos/:id 的 404 驗證
```

**Step 3：重新執行 verify**
```bash
openspec verify --change "formalize-todo-api"
# 直到全部通過
```

**重要原則：** Drift 是正常的。完美的 Spec 不存在，`verify` 的目的不是懲罰你，而是讓你知道「還差哪一步」。

---

## AI 輔助測試

`openspec verify` 確認的是「實作方向正確」，但還需要測試確認「實作細節無誤」。SDD 和 TDD 不是競爭關係——Spec 的 Scenario 是測試案例天然的來源。

### Scenario → Test Case 的對應

你的 `spec.md` 裡每個 Scenario 都是一個測試案例的骨架：

**Spec 中的 Scenario：**
```markdown
#### Scenario: 刪除不存在的 Todo 返回 404
- **GIVEN** 系統中不存在 id 為 "999" 的 todo
- **WHEN** 呼叫 DELETE /todos/999
- **THEN** 回應狀態碼 SHALL 為 404
- **AND** 回應 body SHALL 包含 `{ "error": "Todo not found" }`
```

**對應的測試程式碼（AI 生成）：**
```javascript
test('刪除不存在的 todo 應返回 404', async () => {
  const response = await request(app)
    .delete('/todos/999')
    .expect(404);

  expect(response.body).toEqual({ error: 'Todo not found' });
});
```

### 用 AI 生成測試的 Prompt 範例

把你的 `spec.md` 貼給 Copilot，然後問：

```
以下是我的 OpenSpec 規格文件（spec.md）：

[貼上 specs/todo-api/spec.md 的內容]

請根據每個 Scenario 生成對應的 Jest 測試案例。
規則：
- 使用 supertest 測試 Express API
- 每個 Scenario 對應一個 test() 函式
- 測試名稱直接使用 Scenario 標題
- 不要省略任何 Scenario
```

**AI 會逐一對應每個 Scenario 生成測試**，讓你的測試覆蓋率與 Spec 的完整度直接掛鉤。

---

## 運行時可觀測性

實作完成、測試通過之後，Brownfield 開發還有一個常被忽略的環節：**你能在 production 看到正在發生什麼嗎？**

本節不是完整的 Observability 教學，而是聚焦在一個具體問題：**如何用 AI 工具為 Brownfield 既有程式碼快速建立基礎可觀測性**。

### 監測三本柱概覽

現代可觀測性建立在三種互補的信號上：

| 柱子 | 職責 | 回答的問題 | 常用工具 |
|------|------|------------|---------|
| **Logs（日誌）** | 記錄離散事件 | 發生了什麼事？ | pino、winston → Loki、ELK |
| **Traces（分佈式追蹤）** | 追蹤請求路徑 | 問題在哪個環節？ | OpenTelemetry → Jaeger、Zipkin |
| **Metrics（指標度量）** | 聚合數值統計 | 系統整體狀況如何？ | prom-client → Prometheus、Grafana |

**三者缺一不可**。單獨使用時，每個柱子都有盲點；組合使用時，它們形成完整的問題排查 workflow：

```
問題排查 Workflow：

  📊 Metrics 告訴你「有問題」
  ─────────────────────────────────────────────────────
  error_rate 從 0.1% 跳到 5% → 警報觸發
                                      │
                                      ▼
  📋 Logs 告訴你「什麼問題」
  ─────────────────────────────────────────────────────
  篩選 error log → 找到:
  "TypeError: Cannot read property 'id' of null"
  at TodoService.delete (todo.service.js:52)
                                      │
                                      ▼
  🔗 Traces 告訴你「問題在哪裡」
  ─────────────────────────────────────────────────────
  追蹤 traceId → 找到請求路徑中
  Span: todo.delete [45ms] ← 超時
    └─ Span: db.query  [43ms] ← 瓶頸在這裡
```

---

### Pillar 1: Logs（日誌）

Logs 記錄系統中每一個**離散事件**——每個 request、每個 error、每個重要的狀態變化，都是一條 log entry。

#### Structured Logging（結構化日誌）

Vibe Coding 的 MVP 通常只有 `console.log`，甚至完全沒有 log。在進入 Brownfield 迭代後，你需要讓 log 變得「可被機器讀取」。

**Prompt 範例：批量加入 structured logging**

```
#file:src/index.js

目前這個 Express API 完全沒有 logging。
請：
1. 引入 pino 套件（結構化 JSON logger）
2. 為每個 API endpoint 加入 request log（method、path、statusCode、durationMs）
3. 為所有 error 情境加入 error log（errorMessage、stack）
4. 不要改動任何現有的業務邏輯，只加入 logging
```

**預期輸出格式：**
```json
{"level":"info","time":1704067200000,"method":"POST","path":"/todos","statusCode":201,"durationMs":12}
{"level":"error","time":1704067201000,"method":"DELETE","path":"/todos/999","error":"Todo not found","statusCode":404}
```

結構化 log 讓你能用工具（Datadog、Grafana、Loki）直接查詢，而不是用 `grep` 手動找 log。

---

#### Error Tracking（錯誤追蹤）

Structured logging 記錄「你預期會發生的事」，Error Tracking 記錄「你沒預期的事」（例外）。

**基本概念：**

```
用戶操作 → API 處理 → 發生例外 → Error Tracking 接收
                                         ↓
                               開發者收到通知（Slack、Email）
                               包含：stack trace、用戶 context、發生頻率
```

**用 AI 加入基本 Error Tracking 的 Prompt：**

```
#file:src/index.js

請在 Express app 加入全域 error handler：
1. 捕獲所有未處理的例外（unhandledRejection、uncaughtException）
2. 記錄 error log（包含 stack trace）
3. 為 API 加入統一的 error response 格式（{ error: message, requestId }）
4. 留下 // TODO: 整合 Sentry/Datadog 的位置標記
```

---

### Pillar 2: Traces（分佈式追蹤）

Traces 記錄一個請求在系統中的完整**旅程**——從進入 API 到返回回應，途經的每個函式、每個資料庫查詢，都是一個 **Span**。

**核心概念：**

```
Trace（一次完整請求的追蹤）
└── Span: http.POST /todos       [root span, 45ms]
    ├── Span: middleware.auth    [2ms]
    ├── Span: handler.create     [40ms]
    │   └── Span: db.insert      [35ms]  ← 瓶頸
    └── Span: middleware.logger  [1ms]

每個 Span 包含：
  name        → 這個操作叫什麼
  traceId     → 整個 trace 的唯一識別（串接 Log 和 Metric 用）
  spanId      → 這個 span 自己的 ID
  duration    → 耗時（ms）
  status      → ok / error
```

- **Trace**：一個請求從頭到尾的完整記錄，有唯一的 `traceId`
- **Span**：trace 中的一個操作單元，spans 形成 parent-child 樹狀結構
- **Propagation**：`traceId` 在跨服務呼叫中被自動帶入 HTTP header，讓多個服務的 spans 屬於同一個 trace

**用 AI 加入 OpenTelemetry 追蹤的 Prompt：**

```
請為這個 Express API 加入 OpenTelemetry 分佈式追蹤：
1. 安裝 @opentelemetry/sdk-node 和 @opentelemetry/auto-instrumentations-node
2. 建立 tracing.js 初始化檔案（使用 ConsoleSpanExporter 輸出到 console）
3. 讓每個 request 自動產生 traceId
4. 在 pino log 中加入 traceId 欄位，方便 Log 與 Trace 關聯
5. 在 index.js 最頂部加入 require('./tracing') 載入追蹤
```

**預期 Console 輸出（每個 request 結束後）：**
```json
{
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "name": "POST /todos",
  "duration": [0, 45123456],
  "status": { "code": 0 },
  "attributes": {
    "http.method": "POST",
    "http.url": "/todos",
    "http.status_code": 201
  }
}
```

同時，pino log 會自動帶入 `traceId`：
```json
{"level":"info","method":"POST","path":"/todos","statusCode":201,"durationMs":45,"traceId":"4bf92f3577b34da6a3ce929d0e0e4736"}
```

---

### Pillar 3: Metrics（指標度量）

Metrics 是對系統狀態的**聚合數值統計**，不像 logs 記錄每個事件，而是讓你看到趨勢：「過去 5 分鐘的 error rate 是多少？」

**三種基本 Metric 類型：**

| 類型 | 特性 | 適合衡量 | 範例 |
|------|------|---------|------|
| **Counter（計數器）** | 只增不減 | 累積總量 | `http_requests_total`、`errors_total` |
| **Gauge（度量計）** | 可升可降 | 當前狀態 | `active_connections`、`memory_usage_bytes` |
| **Histogram（直方圖）** | 分佈統計 | 延遲、大小分佈 | `http_request_duration_seconds` |

**用 AI 加入 Prometheus Metrics 的 Prompt：**

```
#file:src/index.js

請為這個 Express API 加入 Prometheus metrics：
1. 安裝 prom-client 套件
2. 加入以下 metrics：
   - http_requests_total（Counter，labels: method, path, status_code）
   - http_request_duration_seconds（Histogram，labels: method, path）
   - active_requests（Gauge）
3. 加入 GET /metrics endpoint，回傳 Prometheus text format
4. 不修改任何業務邏輯，只加入 metrics 收集
```

**預期 `/metrics` 輸出（Prometheus text format）：**
```
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="POST",path="/todos",status_code="201"} 42
http_requests_total{method="DELETE",path="/todos/:id",status_code="404"} 3

# HELP http_request_duration_seconds HTTP request duration in seconds
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{method="POST",path="/todos",le="0.05"} 38
http_request_duration_seconds_bucket{method="POST",path="/todos",le="0.1"} 42
http_request_duration_seconds_sum{method="POST",path="/todos"} 1.892
http_request_duration_seconds_count{method="POST",path="/todos"} 42

# HELP active_requests Number of requests currently being processed
# TYPE active_requests gauge
active_requests 2
```

這個格式可以直接被 Prometheus 抓取，再接上 Grafana 就能有視覺化 dashboard。

---

#### Health Check

讓 infrastructure（Load Balancer、Kubernetes）知道服務是否健康。Health Check 是最基本的 availability metric：

**Prompt：**
```
請為 Express API 加入 GET /health endpoint：
回應格式：
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

### 三本柱的串接

三本柱獨立運作時各有價值，但串接之後才能發揮最大效益。串接的關鍵是：**讓同一個 request 的 ID 出現在三種信號裡**。

```
一個 Request 的完整生命週期：

Request 進入 → 產生 requestId: "req-abc"
               產生 traceId:   "4bf92f35..."
                      │
        ┌─────────────┼──────────────┐
        ▼             ▼              ▼
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │   Log    │  │  Trace   │  │  Metric  │
  │          │  │          │  │          │
  │{traceId: │  │ traceId: │  │ label:   │
  │"4bf92f35"│  │"4bf92f35"│  │{path:    │
  │ level:   │  │ name:    │  │"/todos", │
  │ "error"} │  │"db.query"│  │ code:500}│
  └──────────┘  └──────────┘  └──────────┘
        │             │              │
        ▼             ▼              ▼
    Grafana       Jaeger/OTel    Prometheus
    Loki           Collector      + Grafana
        └─────────────┼──────────────┘
                      ▼
            Grafana Dashboard
        （同一個介面看到全部）
```

**實際使用流程：**
1. Grafana 儀表板顯示 `error_rate` 在 14:32 突然飆高（Metrics 發現問題）
2. 篩選 14:32 前後的 error log，找到 `"Database connection timeout"`（Logs 定位問題）
3. 複製 log 中的 `traceId`，在 Jaeger 中找到完整請求路徑，看到 `db.connect` span 耗時 30 秒（Traces 找到根本原因）

**OpenTelemetry 作為統一方案：**

手動維護三套 library 各自的 ID 注入非常繁瑣。[OpenTelemetry（OTel）](https://opentelemetry.io/) 是 CNCF 的開放標準，讓你用**一套 SDK** 同時產出三種信號，並自動在它們之間注入關聯 ID：

```
你的 App
   │
   ├── @opentelemetry/sdk-node  ← 一套 SDK
   │         │
   │    ┌────┼────┐
   │    ▼    ▼    ▼
   │  Logs Trace Metric  ← 三種信號，自動帶 traceId
   │
   └──▶ OTel Collector ──▶ Grafana / Datadog / Jaeger
                            （任何支援 OTel 的 backend）
```

---

### SKILL 預告

手動為每個新專案設定三本柱的 instrumentation 是高度重複性的工作——安裝套件、初始化、加 middleware、設定 exporter，每次都一樣。這正好是 AI SKILL 的用武之地。

後續課程將提供 OpenCode SKILL，讓你用一個指令就能為 Node.js/Express 專案加入完整的可觀測性基礎設施，而不需要記住每個套件名稱和設定細節。

---

### Client 端可觀測性延伸閱讀

本章聚焦在 **Server 端**（Node.js/Express）的可觀測性三本柱。如果你的專案包含 **Client 端**（桌面 App、行動 App、IoT 裝置），會面對不同的挑戰：Push model、離線 buffer、End-to-End traceId 串接等。

{{< callout type="info" >}}
**有 Client 端開發需求？** 請參閱 [Client 端可觀測性延伸閱讀](/resources/client-observability/)，了解 .NET/Electron 等 Client 技術棧下的 Logs、Traces、Metrics 實踐方式，以及 Server vs Client 架構差異對照表。
{{< /callout >}}

---

## AI 輔助 Debug

當 production 出現問題，Brownfield 的挑戰是：你需要在複雜的既有 codebase 中快速定位問題。`/opsx:explore` 是你的第一道武器。

### 使用 `/opsx:explore` 調查問題

**情境：** 用戶回報「有時候刪除 todo 之後，它還是出現在列表裡」

```
[Plan Mode]
/opsx:explore 請調查以下問題：
用戶回報刪除 todo 後仍出現在列表，具體描述：
- DELETE /todos/:id 返回 200
- 但立即 GET /todos 仍能看到該 todo

請分析：
1. DELETE handler 的實作邏輯（index.js）
2. 刪除後是否有任何 cache 或 state 沒有被清除？
3. id 比較邏輯是否有型別問題？
```

**AI 的調查報告：**
```
Investigation Report:

## Root Cause Candidates

1. **Type Mismatch (High Probability)**
   DELETE handler 使用 === 比較 id：
   File: index.js:52
   Code: todos = todos.filter(t => t.id !== req.params.id)
   問題：t.id 是 number（1, 2, 3...），req.params.id 是 string（"1", "2"...）
   === 比較 number !== string，所以 filter 永遠不會刪除任何元素

## Fix
   將比較改為：t.id !== parseInt(req.params.id)
   或統一使用 string id（推薦）
```

**用 Copilot 分析 Log 的 Prompt：**

```
以下是 production log 中出現的錯誤：

[貼上 JSON log 片段]

請：
1. 解釋這個錯誤的含義
2. 分析最可能的根本原因
3. 說明如何在 code 中重現這個問題
```

---

## openspec archive：讓規格成為活文件

`verify` 全部通過，代表實作與規格一致。最後一步：**歸檔**。

### 什麼是 Archive？

歸檔的動作是把 `openspec/changes/<name>/specs/` 下的 delta spec（這個 change 的規格）合併回 `openspec/specs/`（整個產品的主規格庫）。

```
Before archive:
openspec/
├── specs/                    ← 主規格庫（空的）
└── changes/
    └── formalize-todo-api/
        ├── proposal.md
        ├── specs/
        │   └── todo-api/
        │       └── spec.md   ← delta spec

After archive:
openspec/
├── specs/
│   └── todo-api/
│       └── spec.md           ← 已合併入主規格庫
└── changes/
    └── archive/
        └── formalize-todo-api/  ← 已歸檔
```

隨著每個 change 完成並歸檔，`openspec/specs/` 逐漸累積成一份**活的產品規格文件**——任何時候都能看到「這個產品目前確認可以做到什麼」。

### 執行方式

```bash
openspec archive --change "formalize-todo-api"
```

預期輸出：
```
Archiving change 'formalize-todo-api'...
  ✔ Merged specs/todo-api/spec.md → openspec/specs/todo-api/spec.md
  ✔ Marked change as archived

Archive complete!
History preserved at: openspec/changes/archive/formalize-todo-api/
```

### 歸檔後確認

```bash
# 確認主規格庫已更新
ls openspec/specs/
# todo-api/

# 確認 change 已歸檔
openspec status --change "formalize-todo-api"
# Status: archived
```

---

## Lab 實戰

**目標：** 對 Ch4 的實作執行 verify、修復 drift、加入 structured logging，最後完成 archive。

**前置條件：**
- 完成 Ch4 Lab（`tasks.md` 所有項目為 `[x]`，API 可正常啟動）

---

### Part 1：Spec 驗證

**Step 1：執行 verify**

```bash
openspec verify --change "formalize-todo-api"
```

**Step 2：記錄結果**

- 如果全部通過 → 直接進入 Part 2
- 如果有 DRIFT → 繼續 Step 3

**Step 3：修復 Drift（如有）**

按照本章「修復 Drift 的標準流程」處理：
1. 在 `tasks.md` 補充對應的修復 task
2. 用 OpenCode Build Mode 完成修復
3. 重新執行 `openspec verify` 直到全部通過

---

### Part 2：加入可觀測性三本柱

**目標：** 為 Todo API 加入 Logs、Traces、Metrics 三層可觀測性。

---

#### Step 1：Logs（Structured Logging）

**安裝 pino**

```bash
npm install pino pino-pretty
```

**用 Copilot 生成 logging 程式碼**

把以下 Prompt 貼入 Copilot Chat：
```
#file:index.js

請為這個 Express API 加入 pino structured logging：
1. 每個 endpoint 記錄 request log（method、path、statusCode、durationMs）
2. 每個 error 情境記錄 error log（errorMessage）
3. 使用 pino 的 JSON 格式輸出
4. 不修改任何業務邏輯
```

**驗證 logging 正常輸出**

```bash
node index.js &
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"test"}'
# 確認終端機有 JSON 格式的 log 輸出：
# {"level":"info","method":"POST","path":"/todos","statusCode":201,"durationMs":12}
```

---

#### Step 2：Traces（OpenTelemetry）

**安裝 OpenTelemetry SDK**

```bash
npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node
```

**用 Copilot 生成 tracing 初始化**

```
#file:index.js

請為這個 Express API 加入 OpenTelemetry 追蹤：
1. 建立 tracing.js 初始化檔案，使用 ConsoleSpanExporter 輸出到 console
2. 使用 @opentelemetry/auto-instrumentations-node 自動 instrument Express
3. 讓每個 request 自動產生 traceId
4. 在 pino log 中加入 traceId 欄位
5. 在 index.js 最頂部加入 require('./tracing')
```

**驗證 Trace 正常輸出**

```bash
# 重啟服務（需要在最頂部載入 tracing）
node index.js &
curl -X GET http://localhost:3000/todos
# 確認：
# 1. console 有 span 輸出（包含 traceId 和 duration）
# 2. pino log 中包含 "traceId" 欄位
```

---

#### Step 3：Metrics（prom-client）

**安裝 prom-client**

```bash
npm install prom-client
```

**用 Copilot 生成 metrics**

```
#file:index.js

請為這個 Express API 加入 Prometheus metrics：
1. 安裝並初始化 prom-client（啟用 defaultMetrics）
2. 加入 http_requests_total（Counter，labels: method, path, status_code）
3. 加入 http_request_duration_seconds（Histogram）
4. 加入 GET /metrics endpoint，回傳 Prometheus text format
5. 加入 GET /health endpoint，回傳 { status: "ok", uptime, timestamp }
6. 不修改任何業務邏輯
```

**驗證 Metrics 正常輸出**

```bash
# 發幾個請求製造 metrics 數據
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"test"}'
curl -X GET http://localhost:3000/todos

# 確認 /metrics endpoint
curl http://localhost:3000/metrics
# 應看到：
# http_requests_total{method="POST",path="/todos",status_code="201"} 1
# http_request_duration_seconds_count{...} 2

# 確認 /health endpoint
curl http://localhost:3000/health
# {"status":"ok","uptime":42.1,"timestamp":"2024-01-01T00:00:00.000Z"}
```

---

### Part 3：Archive

```bash
openspec archive --change "formalize-todo-api"
```

確認 `openspec/specs/todo-api/spec.md` 存在。

---

**Done criteria：**
- `openspec verify` 全部通過（5/5 requirements satisfied）
- **Logs**：`index.js` 中有 pino structured logging，每個 endpoint 有 JSON 格式 request log
- **Traces**：`tracing.js` 存在，request log 中包含 `traceId` 欄位，console 有 span 輸出
- **Metrics**：`GET /metrics` 回傳 Prometheus 格式 metrics，含 `http_requests_total`
- **Health**：`GET /health` 回傳 `{ status: "ok", uptime, timestamp }`
- `openspec archive` 執行成功，`openspec/specs/todo-api/spec.md` 存在

> 恭喜！你完成了完整的 SDD 循環：Vibe Coding MVP → 回推 Proposal → Technical Spec → Coding Agent 實作 → Verify → Archive。  
> 下一章，我們看看如何把這套流程推廣到整個團隊。
