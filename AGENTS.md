# Nomu Docs

Nomu Chrome 扩展的官方文档站,VitePress 2.x;线上 `https://nomu.kanocifer.chat/docs/`(`base: "/docs/"`)。
包管理 `pnpm`,脚本 `docs:dev / docs:build / docs:preview` 在 `package.json`;内容源码在 `docs/`,配置在 `.vitepress/config.mts`。

## 写作

**事实以 NoonToolv1 为准**。功能名、架构、术语、性能数字,凡涉及 Nomu 本体的描述只能来源 `/Users/liudetao/Code/NoonToolv1` 的当前实现。**禁止虚构性能数字、客户证言、版本时间**——加新能力前先回 NoonToolv1 核实,没有就不再写。

**双语镜像**:`docs/` 是简体中文,`docs/en/` 是英文镜像。新增任一语言页必须同步另一语言;改 changelog 段要同步两份。

**Footer 联动**:`~/Code/NomuLanding/src/features/landing/components/NoonToolFooter.vue` 里的 `DOCS_URL` 拼出本站 `/docs/`、`/docs/privacy/`、`/docs/guide/changelog`、`/docs/guide/support`。本站改了路由要去落地页 footer 同步,反过来也成立。

## 目录

- `docs/index.md` — 首页 hero + 特性卡片
- `docs/guide/` — 用户指南(是什么 / 安装 / 上手 / 更新日志 / 支持)
- `docs/privacy/` — 隐私政策
- `docs/en/` — 英文镜像

新增页面要在 `.vitepress/config.mts` 中对应 locale 的 `sidebar` 块登记,然后另语言复制一份。

## 发版

1. `docs/guide/changelog.md` 顶部加 `## <version> _<YYYY-MM-DD>_` 段,要点形如 `**能力名**:一句话说明`
2. 同步到 `docs/en/guide/changelog.md`
3. 完成标志:`pnpm docs:build` 通过,中英 changelog 段落一一对应
