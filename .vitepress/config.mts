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
      { text: "指南", link: "/guide/" },
      { text: "隐私政策", link: "/privacy/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "Nomu 是什么", link: "/guide/" },
            { text: "安装 Nomu", link: "/guide/install" },
            { text: "快速上手", link: "/guide/what-is-nomu" },
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
