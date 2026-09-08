---
title: 任务面板
---

# 任务面板

任务面板是 Nomu 的「全历史 task 观察器」：你在哪一站发布出去的、跑成功没有、哪一步失败的、能不能重试——都汇总在同一个独立扩展页里。它不是「发布按钮旁的进度条」，是跨页面、跨会话、跨店铺的统一视角。

## 打开方式

任务面板挂在独立的扩展页 `tasks.html`：

- popup 底部「查看全部任务 →」按钮
- 单商品抽屉（`SingleProductBody`）头部 ListChecks 图标按钮
- 直接访问 `chrome-extension://<id>/tasks.html`

打开后是新 tab，没有「返回」按钮——关闭即退出。

## 两类任务、两个视图

顶部 `TaskViewSwitch` 切换两种视图，状态与筛选各自独立：

- **发布任务**（`publish`）—— 单商品、归组、尺寸变体组的上架流水线
- **复制任务**（`duplicate`）—— 通过 PartnerSku 复制 Noon 已上架商品

切换视图不丢搜索词、也不丢筛选——两套 filter 独立存在。

### 发布任务的状态机

| 状态 | 含义 |
| --- | --- |
| `pending` | 已入队，等待 Service Worker claim |
| `running` | 正在跑步骤表 |
| `success` | 全部步骤 `ok`，完成态已落 |
| `failed` | 某一步失败；可查看失败步骤与错误码，可重试或取消 |
| `cancelled` | 主动取消 |

### 复制任务的状态机

`pending → enqueued / cancelled / failed`：`enqueued` 是终态，对应 publishTask 已丢进队列；中间不落 `fetching` / `building`。

## 任务行展示什么

每一行（行高 ~56px）展示：

- 缩略图 + 商品标题
- 状态圆点
- 国家 chip（`sa` / `ae`）
- taskKind chip（`single` / `group` / `sizes`）
- 当前 step 名
- 失败行的 inline 展开：error.message + error.code + 失败 step.type + retryCount + 「重试」「取消」

非按钮区点一下切换展开/收起；失败行默认展开。

> 取消 running task：当前按钮 disabled，tooltip 提示「running 任务的取消需 Service Worker 让出租约（30s TTL），本轮暂不实现自动让出」。`pending` / `failed` 行的取消按钮可正常用。

日期展示：相对时间（`几分钟前` / `几小时前`）+ 悬停 tooltip 给绝对时间。

## 筛选

任务面板左侧侧栏的 `TaskFilterPanel` 给出三组筛选：

- **状态**多选（默认「进行中 + 失败」）
- **任务类型**多选（`single` / `group` / `sizes`，复制视图有自己的一套）
- **时间窗**：`updatedAfter` / `updatedBefore`（默认「近 7 天」）
- **搜索串**：按 `partnerSku` / `product.title` 子串过滤

`search` 走 UI 端 join 后过滤，**不**下推 RPC。

## 加载与续跑

- 任务列表默认 limit = 200，按 `updatedAt` 倒序。
- 命中 limit 时列表底部显示「加载更早」按钮：去掉 `updatedAfter` 条件、limit 翻倍 = 400 重查；连续点击无更多时按钮消失。
- 数据源订阅 `db.changed` 实时推送：写库后 100ms 聚合去抖重查。
- 搜索框 300ms debounce 静默期后触发查询。

## 重试与清空

- **重试**：失败行点「重试」重新入队，已成功的步骤自动跳过（续跑语义）。AI 请求有幂等键机制，超时重试不会重复扣费。
- **清空已完成**：发布视图提供「清空已完成」确认弹窗。
- **清空已失败**：发布视图提供「清空失败」确认弹窗。
- **清空已完成复制任务**：复制视图提供「清空已完成复制任务」确认弹窗（一键清，不再堆积）。

## 错误定位

失败行展开后，UI 直接告诉你：

- **错误码**（`error.code`）—— 用于查后端 / 自己写脚本
- **错误信息**（`error.message`）—— 人话描述
- **失败 step.type** —— 知道卡在哪一步（`product/create` / `zsku/upsert` / `stock/upsert/stock-v2` …）
- **retryCount** —— 已经重试过几次

把以上四样 + 任务 ID 一起反馈给作者，能最快定位问题。

## Noon 登录态

任务面板顶部固定挂着 `NoonLoginBanner`：

- **未登录 Noon** → 顶部红 banner 提示「立即登录」
- **登录后** → banner 自动消失
- 选「稍后提醒」会在本会话隐藏，下次再失效时会重新出现

这是为了避免任务悄悄失败——Noon 会话失效时所有 publishTask 都会卡在 401/403。

## 与历史发布的关系

- 任务记录按 `taskId` 独立保存，关闭浏览器 / 切店铺都不丢。
- 改店铺配置不会回写历史任务——历史任务里记的是发布当时的店铺快照视图（`ListingStoreTarget`）。
- 任务完成后，商品的 `pskuCode`（Noon 真实 PSKU）会写回 Product 行，可去 [店铺管理](./stores) 或对应店铺任务列表里查到。

## 常见问题

### 重试会重复扣费吗？

不会。AI 翻译 / 生图 / 提示词优化都带幂等键，超时重试会被服务端去重；上架步骤表层面的「续跑」语义也会跳过已 ok 的步骤。

### 任务消失了？

筛选或时间窗可能把它过滤掉了——清掉筛选回到默认「进行中 + 失败 / 近 7 天」试试。也有可能曾点过「清空已完成 / 清空失败」。

### 失败任务能不能批量重试？

目前是单行级重试；如需批量，先用状态筛选圈出失败行，再逐行点重试。

### taskKind 是 `group` 是什么意思？

这个任务对应归组上架（[归组与尺寸变体组](./group-and-sizes)）：组内多件商品走同一条 `group/upsert` 链路。
