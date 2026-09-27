// 扩展默认主题，注入 Nomu 品牌变量覆盖 + 文档首页布局
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import NomuDocsHome from './components/NomuDocsHome.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  // 首页以 `layout: NomuDocsHome` 引用；导航/搜索/语言切换仍由默认 Layout 提供
  enhanceApp({ app }) {
    app.component('NomuDocsHome', NomuDocsHome);
  },
} satisfies Theme;
