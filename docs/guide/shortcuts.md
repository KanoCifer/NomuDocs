---
title: 键盘快捷键
description: "Nomu 键盘快捷键：3 个全局 Chrome 命令，覆盖操作菜单、快捷搜索和悬浮按钮开关，可在 chrome://extensions/shortcuts 改键位。"
---

# 键盘快捷键

Nomu 的常用动作挂在 Chrome 的全局命令上，键位在 `chrome://extensions/shortcuts` 里改。

## 命令清单

| 命令 | mac | Windows / Linux | 作用 |
| --- | --- | --- | --- |
| 打开操作菜单 | `⌘ + Shift + P` | `Ctrl + Shift + P` | 唤起操作菜单，从商品页可直接走上架 / 复制 / NomuDesign 等动作 |
| 打开 QuickSearch | `⌘ + Shift + S` | `Ctrl + Shift + S` | 唤起快捷搜索浮层（[快捷搜索](./quick-search)） |
| 隐藏 / 显示 Nomu 悬浮按钮 | `Alt + Shift + H` | `Alt + Shift + H` | 切换页面右下角悬浮按钮的可见性 |

## 行为细节

- 快捷键需要在 Noon 卖家后台页面上按，在别的站点按了不会有反应
- 命令和别的扩展撞上时 Chrome 会静默忽略，去 `chrome://extensions/shortcuts` 重绑
- `Alt + Shift + H` 只切右下角悬浮按钮的显示，不影响 popup、浮层和其它快捷键

## 改键位

打开 `chrome://extensions/shortcuts`（Mac 也可从 Chrome 菜单 → 工具 → 扩展快捷键），找到 Nomu 那一组，逐条改成你要的键。键位由 Chrome 保存，Nomu 不存。

## 常见问题

### 按了没反应？

- 先确认 Chrome 是不是当前聚焦窗口
- 看 `chrome://extensions/shortcuts`，命令可能被改成「未分配」或被别的扩展抢走

### 想要更多快捷键？

目前就上面 3 个，有需要可以反馈。
