---
title: "安装 Nomu"
description: "Nomu 安装教程：Chrome Web Store 与紫鸟浏览器插件中心两条路径，含安装步骤、紫鸟按店铺环境分配、首次登录与常见问题排查。"
---

# 安装 Nomu

Nomu 已上架 Chrome Web Store 与紫鸟浏览器插件中心。两条路径装的是同一个扩展，登录的是同一个 Nomu 账户。

## 方式一 Chrome Web Store

### 1. 打开商店页面

在浏览器里访问 Nomu 的 Chrome Web Store 页面：

```
https://chromewebstore.google.com/detail/nomu/idfojgkppleknejhenmggcnnnmdglaik
```

也可以在[落地页](https://nomu.kanocifer.chat)直接点「添加到 Chrome」按钮跳转。

### 2. 点击「添加至 Chrome」

在商店页面点 **添加到 Chrome**，浏览器会弹窗确认。

### 3. 确认权限并安装

核对弹窗里列出的权限，点 **添加扩展程序** 完成安装。

### 4. 固定到工具栏（推荐）

安装完成后，点浏览器工具栏的拼图图标，把 Nomu 固定住，随时能打开概览面板。

## 方式二 紫鸟浏览器

紫鸟里可以**按店铺环境安装**：每个店铺是独立环境，Nomu 分配到哪几家店，就只出现在那几家店的环境里。多店铺团队按需分配，不必把所有店铺都装上。

### 1. 打开 Nomu 的插件页

```
https://appstore.ziniao.com/plugin/detail/16312716825135/Nomu-Tool-for-Noon.html
```

### 2. 在紫鸟里安装

- 打开紫鸟浏览器，进入「管理 → 应用程序 → 获取更多插件」打开插件中心
- 搜索「Nomu - Tool for Noon」并安装

### 3. 分配店铺

在插件中心的「分配店铺」里勾选要用 Nomu 的店铺环境。没分配到的店铺看不到这个插件，之后随时可以在「分配店铺」或企业管理的应用管理里增减。

::: tip 团队场景
插件装在店铺环境里，多账号之间互不影响。给员工开权限时走紫鸟的员工白名单与权限管控，只授权必要的人安装或配置。

紫鸟的每个店铺环境各自存一份数据：一个店铺里配好的店铺设置，不会自动出现在另一个店铺环境里。需要在多个环境之间共用同一套配置，用[云端配置同步](./config-sync)：在一个环境「上传到云端」，另一个环境「下载到本地」。
:::

## 装好之后 登录 Nomu 账户

在扩展的「账户」页[注册](https://nomu.kanocifer.chat/register)并登录 Nomu。详见[账户与 AI 积分](./account)。

上架还需要你在浏览器里登录自己的 Noon 店铺 —— Nomu 直接用你已登录的会话工作，不需要 Noon 的密码或密钥。

## 常见问题

### 商店页打不开？

确认当前浏览器是 Chrome、Edge 或其他基于 Chromium 的内核。Firefox / Safari 暂时不在支持范围。

### 紫鸟浏览器怎么装？

见上面的[方式二](#方式二-紫鸟浏览器)：在紫鸟插件中心搜索「Nomu - Tool for Noon」安装，然后在「分配店铺」里勾选要用 Nomu 的店铺环境。

### 怎么更新到最新版？

Chrome 会自动更新已安装的扩展。也可以在 `chrome://extensions` 里打开「开发者模式」后点 **检查更新** 立即拉取。店铺设置与批次数据保存在浏览器本地，更新不会丢。

## 其他问题

[获取支持](./support)