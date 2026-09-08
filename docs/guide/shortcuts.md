---
title: 键盘快捷键
---

# 键盘快捷键

Nomu 把常用动作挂到全局 Chrome 命令上，不绑定具体页面，按下即生效。命令定义在 `wxt.config.ts` 的 `manifest.commands`，跟随 Chrome 命令面板（`chrome://extensions/shortcuts`）一起展示，可在那边改键位。

## 命令清单

| 命令 | mac | Windows / Linux | 作用 |
| --- | --- | --- | --- |
| 打开 Nomu 目录浏览 | `⌘ + Shift + O` | `Ctrl + Shift + O` | 在当前页面打开目录浏览侧栏（[目录浏览](./catalog-browse)） |
| 打开操作菜单 | `⌘ + Shift + P` | `Ctrl + Shift + P` | 唤起 Action Sheet，从商品页可直接走上架 / 复制 / NomuDesign 等动作 |
| 打开 QuickSearch | `⌘ + Shift + S` | `Ctrl + Shift + S` | 唤起快捷搜索浮层（[快捷搜索](./quick-search)） |
| 隐藏 / 显示 Nomu 悬浮按钮 | `Alt + Shift + H` | `Alt + Shift + H` | 切换页面右下角悬浮入口的可见性 |

> 4 个命令都是 `global` 级别（不在 Chrome 中也即生效），但**当前**命令默认 `Ctrl/⌘ + Shift + Y` 打开侧栏会**额外**出现在 Welcome 引导页与 manifest 里，与 `打开 Nomu 目录浏览` 是两个不同入口——前者走 `sidePanel.open()`，后者走操作菜单里的目录浏览。

## 行为细节

- 命令冲突时 Chrome 静默忽略，需要去 `chrome://extensions/shortcuts` 重绑。
- 快捷键在 Chrome 窗口聚焦时生效；如果焦点在 Noon 后台或 1688 源页内也会响应。
- `Alt + Shift + H` 切换的是页面右下角悬浮入口的可见性，不影响 popup / 侧栏 / 快捷键本身。

## 改键位

进入 `chrome://extensions/shortcuts`（Mac 也可从 Chrome 菜单 → 工具 → 扩展快捷键），找到「Nomu」分组，对应命令重绑即可。Nomu 本身不存键位，由 Chrome 持久化。

## 常见问题

### 按了没反应？

- 先确认 Chrome 是不是当前聚焦窗口
- 看 `chrome://extensions/shortcuts` 有没有命令被改成「未分配」或被其它扩展抢走
- 命令名带「Nomu」前缀搜索

### 想要更多快捷键？

欢迎页的「快捷键」面板只展示以上 4 个，更多键位当前没有——有需求可以反馈加。
