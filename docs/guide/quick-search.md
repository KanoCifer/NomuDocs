---
title: 快捷搜索
---

# 快捷搜索

快捷搜索是 Nomu 顶在所有页面上方的一块聚焦式浮层：任意页面按 `Ctrl/⌘ + Shift + S`，输入 Partner SKU 或标题关键字，立刻看到当前店铺下在售 / 隐藏商品的命中候选，一键跳转详情或改状态。不用先打开 Noon 后台再翻列表。

## 打开方式

- 全局快捷键 `Ctrl/⌘ + Shift + S`（[键盘快捷键](./shortcuts)）
- 操作菜单（Action Sheet）里的「快捷搜索」入口

打开后是页面顶部的居中卡片（**不是**弹窗 Modal，**不**阻挡原页面），输入即聚焦。关闭按 `Esc` 或点浮层外的区域。

## 视觉与展示

- 单卡片圆角 2xl，4px 间距网格
- 输入条占满首行，字号 15px，placeholder 「搜索商品 / Partner SKU」
- 候选项 ≤ 5 条；选中项 1.02 抬升 + 暖金色边框
- 每条候选展示：标题（14px/600 截两行）+ partnerSku（mono 10.5px）+ 货币/价格（若有）+ 状态 chip（在售 / 隐藏）
- 底部状态条显示：店铺缺失 / 缺码 / loading 错误 / empty / ready（ready 时显示「按 ↵ 跳转」）

## 键盘操作

| 键 | 行为 |
| --- | --- |
| `↓` / `Ctrl + N` | 选中下一条 |
| `↑` / `Ctrl + P` | 选中上一条 |
| `Enter` | 打开当前选中 hit 的详情（新 tab） |
| `Shift + Enter` | 切换当前选中 hit 的卖家状态（在售 ↔ 隐藏） |
| `Esc` | 关闭浮层 |

文本输入时上下键不会触发选中切换，避免与文字编辑冲突。

## 行为细节

- 输入框变化触发搜索：300ms debounce 静默期后请求 `offer/list/noon`
- 每页取 8 条（Noon 搜索前 8 条基本够 5 条好候选），按 partnerSku 前缀 / 含 / 标题 / csku 排序取前 5
- 命中为空时显示「未找到商品」empty 态
- 状态机：`idle / no-active-store / missing-store-code / typing / loading / ready / empty / error`

## 行内动作

每条候选除了「回车跳转」外，还能：

- **卖家状态切换**（`Shift + Enter`）—— 走 `offer/upsert/is_active-plp` 乐观更新，800ms 内成功或失败给瞬态反馈（pending / error）
- **铅笔按钮 → 商品信息快速编辑** —— 调出编辑弹窗，改标题 / 价格 / 库存 / 类目 / 品牌，提交走 publishTask 最小变更路径
- **眼睛图标 → 预览** —— 在原页面叠加预览视图

## 与目录浏览的关系

快捷搜索是 [目录浏览](./catalog-browse) 的「聚焦版」——同样基于 `CatalogOffer`，同样支持卖家状态切换、同样可触发商品信息快速编辑。区别在于：

| 维度 | 快捷搜索 | 目录浏览 |
| --- | --- | --- |
| 入口 | 全局快捷键 | 侧边栏抽屉 |
| 占用空间 | 顶部居中卡片，不挡页面 | 侧栏抽屉 |
| 候选量 | 前 5 条 | 20 条 / 页，可翻页 |
| 适用场景 | 快速定位 / 改状态 | 系统性浏览一批商品 |

两者共享同一份 `CatalogOffer` 数据模型与卖家状态切换逻辑，写变更通过 `db.changed` 双向同步。

## 常见问题

### 按快捷键没反应？

- 确认 Chrome 是当前聚焦窗口
- 看 `chrome://extensions/shortcuts` 有没有命令被其它扩展抢走
- 命令名带「Nomu」前缀搜索

### 改了状态原 Noon 页面没动？

按 `Cmd/⌘ + R` 刷新原 Noon 后台页面；Nomu 已把变更写到 Noon，状态 chip 是按需拉取的。
