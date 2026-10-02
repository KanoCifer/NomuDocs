---
layout: NomuDocsHome
title: Nomu 文档
description: Nomu 官方文档 —— 安装、店铺配置、采集与发布流程、任务面板、复制商品、条码标签、快捷搜索，以及更新日志与支持入口。

hero:
  eyebrow: Nomu Docs · 文档
  headline: 从安装到上架，
  accent: 全部文档
  subheadline: 采集、翻译、建图、逐件发布的操作手册 —— 安装、店铺配置、发布、复制、条码、搜索，以及每一个卡住你的地方。
  actions:
    - text: 快速开始
      link: /guide/quick-start
      variant: brand
    - text: 安装 Nomu
      link: /guide/install
      variant: alt
    - text: 更新日志
      link: /guide/changelog
      variant: link

# Hero 里的流程条：第一条商品怎么走出来
flow:
  title: 第一条商品，六步
  steps:
    - 装上扩展
    - 登录 Nomu
    - 登录 Noon
    - 采集源商品
    - 翻译 · 建图 · 归类
    - 逐件发布
  note: '货源：1688 / 淘宝、天猫 / 京东 / noon.com · 目标站点：Noon 阿联酋、沙特站'

# 三张起步卡
paths:
  eyebrow: 快速开始
  title: 从这三页开始
  subtitle: 三步之内能进正题；已经在用的话，直接跳到你关心的那一页。
  items:
    - number: '01'
      title: 安装 Nomu
      body: 网上应用商店一键装，或者拖 zip 手动加载。
      link: /guide/install
    - number: '02'
      title: 快速上手
      body: 从装好到第一条商品上架，一条流水线走完。
      link: /guide/quick-start
    - number: '03'
      title: 功能总览
      body: 每个能力做什么、边界在哪，一页看完。
      link: /guide/features

# 目录区不写条目：直接读 .vitepress/config.mts 的 sidebar
map:
  eyebrow: 目录
  title: 全部文档
  subtitle: 侧边栏能翻到的，这里都能翻到。

capabilities:
  eyebrow: 能力速览
  title: 里面装了什么
  subtitle: 十个能力，各自解决哪一段。

features:
  - title: 全流程自动化
    details: 同一引擎内串行推进，逐商品处理；首个失败即停，重试自动跳过已成功的步骤。
  - title: 不需要 API 密钥
    details: 借助你已登录的 Noon 会话工作，无需申请 API 密钥或 OAuth 授权。请求 URL 由白名单唯一门控。
  - title: 数据留在本地
    details: 店铺设置、批次草稿、NomuDesign 草稿全部保存在你的浏览器里；无埋点、无统计、无追踪。
  - title: AI 商品图生图
    details: NomuDesign 画布支持提示词模板、AI 优化、模型档位选择、历史回看，一键应用到商品图集。
  - title: 任务面板
    details: 独立扩展页统一跟踪发布 / 复制双视图，失败定位到具体步骤，可单件重试、清空已结束任务。
  - title: 多店铺 / 多账号
    details: 同一 PartnerCode 多条店铺并存，从当前页一键识别店铺编码，FBP 仓库快照落库直接选用。
  - title: 归组 + 尺寸变体组
    details: 同品牌多件商品按规格轴归并发布（Group），标准尺码在单商品表单里加变体一次提交（Sizes），两套互不冲突。
  - title: 条码标签打印
    details: 自有 SKU 打印条码标签，支持 Code 128 / EAN-13 / UPC-A，可直接打印或导出 SVG / PNG / ZPL。
  - title: 复制商品
    details: 按 PartnerSku 单件 / 批量复制 Noon 已上架商品；批量模式支持 Excel / CSV 直接粘贴。
  - title: 目录浏览与快捷搜索
    details: 侧栏浏览当前店铺在售 / 隐藏商品；任意页面按 ⌘+Shift+S 唤起快捷搜索浮层。

cta:
  title: 边做边查
  body: 采集、翻译、建图、发布、复制、盯任务 —— 卡在哪一步，回来翻哪一页。
  primary:
    text: 快速开始
    link: /guide/quick-start
  secondary:
    text: 安装 Nomu
    link: /guide/install
  support:
    text: 遇到问题？
    link: /guide/support

footer:
  note: 'Nomu：一款易用的 Noon 插件'
  links:
    - text: 隐私政策
      link: /privacy/
    - text: 更新日志
      link: /guide/changelog
    - text: 获取支持
      link: /guide/support
    - text: 回到官网
      link: https://nomu.kanocifer.chat
---
