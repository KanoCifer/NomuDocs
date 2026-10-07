# Nomu Docs

Nomu Chrome 扩展的官方文档站,VitePress 2.x;线上 `https://nomu.kanocifer.chat/docs/`(`base: "/docs/"`)。
包管理 `pnpm`,脚本 `docs:dev / docs:build / docs:preview` 在 `package.json`;内容源码在 `docs/`,配置在 `.vitepress/config.mts`。

## 写作

**事实以 NoonToolv1 为准**。功能名、架构、术语、性能数字,凡涉及 Nomu 本体的描述只能来源 `/Users/liudetao/Code/NoonToolv1` 的当前实现。**禁止虚构性能数字、客户证言、版本时间**——加新能力前先回 NoonToolv1 核实,没有就不再写。

**双语镜像**:`docs/` 是简体中文,`docs/en/` 是英文镜像。新增任一语言页必须同步另一语言;改 changelog 段要同步两份。

**Footer 联动**:`~/Code/NomuLanding/src/features/landing/components/NoonToolFooter.vue` 里的 `DOCS_URL` 拼出本站 `/docs/`、`/docs/privacy/`、`/docs/guide/changelog`、`/docs/guide/support`。本站改了路由要去落地页 footer 同步,反过来也成立。

## 收录

- **本站没有 robots.txt,也不该加。** 文档站和落地页共用同一个 host(`nomu.kanocifer.chat`),robots 协议规定一个 host 只有根目录一份(`https://nomu.kanocifer.chat/robots.txt`),写在 `docs/public/robots.txt` 会变成 `/docs/robots.txt`,爬虫根本不读。`/docs/**` 由根目录那份 `Allow: /` 覆盖。根目录那份在 `~/Code/NomuLanding/public/robots.txt`,要改爬取规则改那里。
- 站点地图是 **sitemap index**:`https://nomu.kanocifer.chat/sitemap.xml`(NomuLanding 构建时生成)下面挂着本仓库产出的 `/docs/sitemap.xml` 和落地页的 `/landing-sitemap.xml`。**别把落地页 URL 塞进本仓库的 sitemap** —— 那是 NomuLanding 的职责,两边都声明同一批 URL 属于重复提交。
- 想挡掉某个页面就别指望 robots.txt:它是控制抓取流量的,不是把页面挡在索引外的(外部链接照样会被索引)。要真挡,用 `noindex` 或在 nginx 上回真 404。`/docs/404.html` 已经在 NomuLanding 的 `deploy/nginx-nomu.conf` 里回 404 了。

## 目录

- `docs/index.md` — 首页 hero + 特性卡片
- `docs/guide/` — 用户指南(是什么 / 安装 / 上手 / 更新日志 / 支持)
- `docs/privacy/` — 隐私政策
- `docs/en/` — 英文镜像

新增页面要在 `.vitepress/config.mts` 中对应 locale 的 `sidebar` 块登记,然后另语言复制一份。

**安装渠道写在 `docs/guide/install.md`**(中英两份):Chrome Web Store 与紫鸟浏览器插件中心两条路径,紫鸟那节带插件详情页 URL 和「分配店铺」的步骤。紫鸟改 slug 时 URL 要跟着改,这也是落地页 `ZINIAO_PLUGIN_URL` 的真源,两边别各记一份。站内别再散写「拖 zip 加载」——没有对外发过 zip,写了就是给不出货的路。

## 发版

1. `docs/guide/changelog.md` 顶部加 `## <version> _<YYYY-MM-DD>_` 段,要点形如 `**能力名**:一句话说明`
2. 同步到 `docs/en/guide/changelog.md`
3. 完成标志:`pnpm docs:build` 通过,中英 changelog 段落一一对应
