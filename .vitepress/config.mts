import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',
  base: '/docs/',

  cleanUrls: true,
  title: 'Nomu Docs',
  description: 'Nomu — Noon 卖家的商品上架扩展文档',
  lang: 'zh-CN',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '隐私政策', link: '/privacy/' },
      { text: '开发者', link: '/dev/domain' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: 'Nomu 是什么', link: '/guide/' },
            { text: '安装 Nomu', link: '/guide/install' },
            { text: '快速上手', link: '/guide/what-is-nomu' },
            { text: '更新日志', link: '/guide/changelog' },
          ],
        },
      ],
      '/privacy/': [
        {
          text: '隐私',
          items: [{ text: '隐私政策', link: '/privacy/' }],
        },
      ],
      '/dev/': [
        {
          text: '开发者',
          items: [
            { text: '领域词表', link: '/dev/domain' },
            {
              text: '架构决策记录',
              items: [
                { text: 'ADR 索引', link: '/dev/adr/README' },
                { text: '0001 扁平商品模型', link: '/dev/adr/0001-flat-product-model' },
                { text: '0005 传输接缝与 Extractor', link: '/dev/adr/0005-transport-seam-and-extractor' },
                { text: '0013 上架执行收归后台 Worker', link: '/dev/adr/0013-background-task-worker' },
                { text: '0019 任务面板', link: '/dev/adr/0019-task-panel' },
                { text: '0021 Sizes 变体组', link: '/dev/adr/0021-sizes-variant-group' },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/Kuroome' }],
  },
});
