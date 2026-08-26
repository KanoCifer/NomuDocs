# Nomu Docs

Nomu 扩展的文档站,基于 VitePress,线上部署在 `https://kanocifer.chat/docs/`(`base: "/docs/"`)。

## 必须知道

- 包管理器:`pnpm`,构建 `pnpm docs:build`,开发 `pnpm docs:dev`
- 内容源码在 `docs/`,配置在 `.vitepress/config.mts`
- 产品事实(功能、架构、术语)以扩展仓库 `/Users/liudetao/Code/NoonToolv1` 为准;不得虚构性能数字、客户证言
- 落地页在 `/Users/liudetao/Code/ReadingList/frontend/apps/vue-app/src/features/noontool/`,footer 的隐私/更新日志链接指向本站

## 目录约定

- `docs/index.md` — 首页(hero + 特性卡片)
- `docs/guide/` — 用户指南(是什么、安装、快速上手、更新日志)
- `docs/privacy/` — 隐私政策
- `docs/dev/` — 开发者文档(领域词表、ADR),从 NoonToolv1 同步而来
- 新版本发布时更新 `docs/guide/changelog.md`,并同步替换落地页 `public/nomu-*.zip`
