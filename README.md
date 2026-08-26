# Nomu Docs

[Nomu](https://kanocifer.chat/docs/) 浏览器扩展的官方文档站，基于 [VitePress](https://vitepress.dev/) 构建。

线上地址：`https://kanocifer.chat/docs/`

## 目录结构

- `docs/index.md` — 首页（hero + 特性卡片）
- `docs/guide/` — 用户指南（是什么、安装、快速上手、更新日志）
- `docs/privacy/` — 隐私政策
- `docs/dev/` — 开发者文档（领域词表、ADR）

## 开发

需要 [pnpm](https://pnpm.io/)。

```bash
pnpm install        # 安装依赖
pnpm docs:dev       # 本地开发
pnpm docs:build     # 构建到 .vitepress/dist
pnpm deploy         # 构建并 rsync 部署到服务器
```

## License

[AGPL-3.0](./LICENSE)
