import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  base: "/docs/",

  cleanUrls: true,
  title: "Nomu Docs",
  description: "Nomu — Noon 卖家的商品上架扩展文档",
  lang: "zh-CN",
  head: [["link", { rel: "icon", type: "image/png", href: "/docs/logo.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: "/logo.png", alt: "Nomu" },
    nav: [
      { text: "介绍", link: "https://kanocifer.chat/noon" },
      { text: "指南", link: "/guide/" },
      { text: "隐私政策", link: "/privacy/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "上手",
          items: [
            { text: "Nomu 是什么", link: "/guide/" },
            { text: "功能总览", link: "/guide/features" },
            { text: "安装 Nomu", link: "/guide/install" },
            { text: "快速上手", link: "/guide/quick-start" },
          ],
        },
        {
          text: "核心能力",
          items: [
            { text: "店铺管理", link: "/guide/stores" },
            { text: "任务面板", link: "/guide/tasks" },
            { text: "NomuDesign 商品图生图", link: "/guide/nomu-design" },
            { text: "复制商品", link: "/guide/duplicate" },
            { text: "归组与尺寸变体组", link: "/guide/group-and-sizes" },
          ],
        },
        {
          text: "浏览与搜索",
          items: [
            { text: "目录浏览", link: "/guide/catalog-browse" },
            { text: "快捷搜索", link: "/guide/quick-search" },
          ],
        },
        {
          text: "账户与基础",
          items: [
            { text: "账户与 AI 积分", link: "/guide/account" },
            { text: "键盘快捷键", link: "/guide/shortcuts" },
          ],
        },
        {
          text: "其它",
          items: [
            { text: "更新日志", link: "/guide/changelog" },
            { text: "获取支持", link: "/guide/support" },
          ],
        },
      ],
      "/privacy/": [
        {
          text: "隐私",
          items: [{ text: "隐私政策", link: "/privacy/" }],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/KanoCifer" }],
  },
});
