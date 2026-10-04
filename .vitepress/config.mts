import { defineConfig } from 'vitepress';

const SITE_URL = 'https://nomu.kanocifer.chat';

/**
 * canonical / OG / Twitter / hreflang 必须在构建时写进静态 HTML。
 * 客户端注入的 head 爬虫读不到 —— 那正是 landing 页现在无效的原因。
 *
 * @param page 输出文件名（相对 dist），如 'guide/features.html'
 */
function seoHead(page: string, description: string, title: string) {
  const isEn = page.startsWith('en/');
  // page 是源文件相对路径（'guide/features.md'），站点路径要挂上 base 再去掉 .md
  const rel = page.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
  const clean = rel ? `/docs/${rel}` : '/docs/';
  const canonical = `${SITE_URL}${clean}`;
  // 中英目录结构对称：zh 在 docs/guide/，en 在 docs/en/guide/
  const counterpart = isEn
    ? `${SITE_URL}${clean.replace('/docs/en/', '/docs/')}`
    : `${SITE_URL}/docs/en${clean.replace('/docs', '')}`;

  return [
    ['link', { rel: 'canonical', href: canonical }],
    // 中英互指，Google 据此把两者判为同一内容的两个语言版本而非重复页
    ['link', { rel: 'alternate', hreflang: isEn ? 'en' : 'zh-CN', href: canonical }],
    ['link', { rel: 'alternate', hreflang: isEn ? 'zh-CN' : 'en', href: counterpart }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/docs/` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: canonical }],
    ['meta', { property: 'og:site_name', content: 'Nomu' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/docs/logo.png` }],
    ['meta', { property: 'og:locale', content: isEn ? 'en_US' : 'zh_CN' }],
    [
      'meta',
      { property: 'og:locale:alternate', content: isEn ? 'zh_CN' : 'en_US' },
    ],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}/docs/logo.png` }],
  ];
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',
  base: '/docs/',

  cleanUrls: true,
  title: 'Nomu Docs',
  description: 'Nomu — Noon 卖家的商品上架扩展文档',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/docs/logo.png' }],
    ['meta', { name: 'twitter:site', content: '@KanoCifer' }],
  ],

  sitemap: {
    // 必须带 base，否则生成的 URL 会指向 /guide/... 而非实际部署的 /docs/guide/...
    hostname: `${SITE_URL}/docs/`,
    // 这里只管文档站自己的页面。落地页的 / 与 /register 由 NomuLanding 的
    // /landing-sitemap.xml 负责，两边都声明同一批 URL 属于重复提交。
    // 两份子 sitemap 统一挂在 https://nomu.kanocifer.chat/sitemap.xml 这个 index 下。
  },

  transformHead({ page, pageData, siteData, title }) {
    return seoHead(
      page,
      pageData.description ?? siteData.description,
      title,
    ) as never[];
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        logo: { src: '/logo.png', alt: 'Nomu' },
        nav: [
          { text: '介绍', link: 'https://nomu.kanocifer.chat' },
          { text: '指南', link: '/guide/' },
          { text: '隐私政策', link: '/privacy/' },
          { text: '用户协议', link: '/terms/' },
        ],

        sidebar: {
          '/guide/': [
            {
              text: '上手',
              items: [
                { text: 'Nomu 是什么', link: '/guide/' },
                { text: '功能总览', link: '/guide/features' },
                { text: '安装 Nomu', link: '/guide/install' },
                { text: '快速上手', link: '/guide/quick-start' },
              ],
            },
            {
              text: '核心能力',
              items: [
                { text: '店铺管理', link: '/guide/stores' },
                { text: 'NomuFab 功能入口', link: '/guide/nomu-fab' },
                { text: '任务面板', link: '/guide/tasks' },
                { text: 'Nomu 助手', link: '/guide/nomu-assistant' },
                { text: 'NomuDesign 商品图生图', link: '/guide/nomu-design' },
                { text: '复制商品', link: '/guide/duplicate' },
                { text: '归组与尺寸变体组', link: '/guide/group-and-sizes' },
                { text: '条码标签打印', link: '/guide/barcode-labels' },
              ],
            },
            {
              text: '浏览与搜索',
              items: [
                { text: '目录浏览', link: '/guide/catalog-browse' },
                { text: '快捷搜索', link: '/guide/quick-search' },
              ],
            },
            {
              text: '账户与基础',
              items: [
                { text: '账户与 AI 积分', link: '/guide/account' },
                { text: '云端配置同步', link: '/guide/config-sync' },
                { text: '云端共享池与中转站', link: '/guide/cloud-pool' },
                { text: '键盘快捷键', link: '/guide/shortcuts' },
              ],
            },
            {
              text: '其它',
              items: [
                { text: '更新日志', link: '/guide/changelog' },
                { text: '获取支持', link: '/guide/support' },
              ],
            },
          ],
          '/privacy/': [
            {
              text: '条款与隐私',
              items: [{ text: '隐私政策', link: '/privacy/' }],
            },
          ],
          '/terms/': [
            {
              text: '条款与隐私',
              items: [{ text: '用户协议', link: '/terms/' }],
            },
          ],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/KanoCifer' }],
      },
    },

    en: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        logo: { src: '/logo.png', alt: 'Nomu' },
        nav: [
          { text: 'Home', link: 'https://nomu.kanocifer.chat' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Privacy', link: '/en/privacy/' },
          { text: 'Terms', link: '/en/terms/' },
        ],

        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting started',
              items: [
                { text: 'What is Nomu', link: '/en/guide/' },
                { text: 'Features overview', link: '/en/guide/features' },
                { text: 'Install Nomu', link: '/en/guide/install' },
                { text: 'Quick start', link: '/en/guide/quick-start' },
              ],
            },
            {
              text: 'Core capabilities',
              items: [
                { text: 'Store management', link: '/en/guide/stores' },
                { text: 'NomuFab entry point', link: '/en/guide/nomu-fab' },
                { text: 'Task panel', link: '/en/guide/tasks' },
                { text: 'Nomu Assistant', link: '/en/guide/nomu-assistant' },
                { text: 'NomuDesign image generation', link: '/en/guide/nomu-design' },
                { text: 'Duplicate product', link: '/en/guide/duplicate' },
                { text: 'Group & sizes variants', link: '/en/guide/group-and-sizes' },
                { text: 'Barcode label printing', link: '/en/guide/barcode-labels' },
              ],
            },
            {
              text: 'Browse & search',
              items: [
                { text: 'Catalog browse', link: '/en/guide/catalog-browse' },
                { text: 'Quick search', link: '/en/guide/quick-search' },
              ],
            },
            {
              text: 'Account & basics',
              items: [
                { text: 'Account & AI credits', link: '/en/guide/account' },
                { text: 'Cloud config sync', link: '/en/guide/config-sync' },
                { text: 'Cloud pool & transfer station', link: '/en/guide/cloud-pool' },
                { text: 'Keyboard shortcuts', link: '/en/guide/shortcuts' },
              ],
            },
            {
              text: 'Other',
              items: [
                { text: 'Changelog', link: '/en/guide/changelog' },
                { text: 'Get support', link: '/en/guide/support' },
              ],
            },
          ],
          '/en/privacy/': [
            {
              text: 'Legal',
              items: [{ text: 'Privacy policy', link: '/en/privacy/' }],
            },
          ],
          '/en/terms/': [
            {
              text: 'Legal',
              items: [{ text: 'Terms of service', link: '/en/terms/' }],
            },
          ],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/KanoCifer' }],
      },
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/logo.png', alt: 'Nomu' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/KanoCifer' }],
  },
});