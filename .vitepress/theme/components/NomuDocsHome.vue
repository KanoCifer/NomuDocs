<script setup lang="ts">
/**
 * NomuDocsHome — 文档站首页。
 *
 * 视觉复用 NomuLanding 的 Spatial 语言：暖灰底 + 玻璃材质 + Noon 黄强调 + 负字距大标题。
 * 文案全部来自 index.md 的 frontmatter（中英各一份镜像）；文档目录不写死，直接读
 * themeConfig.sidebar —— 侧边栏改了什么首页就跟着变，不存在第二份真源。
 *
 * 动效只有入场那一段（纯 CSS 渐显 + stagger）：文档站要的是一眼能扫完，不是慢慢演。
 */
import { computed, unref } from 'vue';
import { useData, withBase } from 'vitepress';

interface Action {
  text: string;
  link: string;
  variant?: 'brand' | 'alt' | 'link';
}
interface Home {
  hero: { eyebrow: string; headline: string; accent: string; subheadline: string; actions: Action[] };
  flow: { title: string; steps: string[]; note: string };
  paths: { eyebrow: string; title: string; subtitle: string; items: { number: string; title: string; body: string; link: string }[] };
  map: { eyebrow: string; title: string; subtitle: string };
  capabilities: { eyebrow: string; title: string; subtitle: string };
  features: { title: string; details: string }[];
  cta: { title: string; body: string; primary: Action; secondary: Action; support: Action };
  footer: { note: string; links: { text: string; link: string }[] };
}

const { frontmatter, theme } = useData();
const home = computed(() => frontmatter.value as unknown as Home);

/** 站内链接补 base（站点挂在 /docs/ 下），站外链接原样放行。 */
const link = (path: string) => (path.startsWith('http') ? path : withBase(path));

/** 目录 = 当前 locale 的 sidebar 分组，直接复用侧边栏那一份配置。 */
interface SidebarGroup {
  text?: string;
  items?: { text?: string; link?: string }[];
}
const groups = computed(() => {
  const sidebar = unref(theme.value.sidebar) as Record<string, SidebarGroup[]> | undefined;
  if (!sidebar) return [];
  return Object.values(sidebar)
    .flat()
    .map((g) => ({
      title: g.text ?? '',
      items: (g.items ?? []).filter((i): i is { text: string; link: string } => Boolean(i.link)),
    }))
    .filter((g) => g.title && g.items.length > 0);
});

const stepNo = (i: number) => String(i + 1).padStart(2, '0');
</script>

<template>
  <div class="home">
    <!-- ============================ Hero ============================ -->
    <section class="hero" aria-labelledby="home-heading">
      <p class="eyebrow">{{ home.hero.eyebrow }}</p>

      <h1 id="home-heading" class="h1">
        {{ home.hero.headline }}<br />
        <span class="accent">{{ home.hero.accent }}</span>
      </h1>

      <p class="sub">{{ home.hero.subheadline }}</p>

      <div class="actions">
        <a
          v-for="a in home.hero.actions"
          :key="a.text"
          :href="link(a.link)"
          class="btn"
          :class="a.variant ?? 'alt'"
        >
          {{ a.text }}
        </a>
      </div>

      <!-- 第一条商品的路径：落地页 hero 里的产品镜头，这里换成一条真的能照着走的流程 -->
      <div class="panel flow">
        <p class="eyebrow">{{ home.flow.title }}</p>
        <ol class="steps">
          <li v-for="(s, i) in home.flow.steps" :key="s" class="step">
            <span class="step-no">{{ stepNo(i) }}</span>
            <span class="step-label">{{ s }}</span>
          </li>
        </ol>
        <p class="flow-note">{{ home.flow.note }}</p>
      </div>
    </section>

    <!-- ======================= 快速开始三入口 ======================= -->
    <section aria-labelledby="paths-heading">
      <header class="sec-head">
        <p class="eyebrow">{{ home.paths.eyebrow }}</p>
        <h2 id="paths-heading" class="h2">{{ home.paths.title }}</h2>
        <p class="sec-sub">{{ home.paths.subtitle }}</p>
      </header>

      <ul class="paths">
        <li v-for="p in home.paths.items" :key="p.link">
          <a class="panel card" :href="link(p.link)">
            <span class="num">{{ p.number }}</span>
            <h3 class="card-title">{{ p.title }}</h3>
            <p class="card-body">{{ p.body }}</p>
            <span class="card-more" aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </section>

    <!-- ========================= 全部文档 ========================= -->
    <section aria-labelledby="map-heading">
      <header class="sec-head">
        <p class="eyebrow">{{ home.map.eyebrow }}</p>
        <h2 id="map-heading" class="h2">{{ home.map.title }}</h2>
        <p class="sec-sub">{{ home.map.subtitle }}</p>
      </header>

      <!-- 用 CSS columns 排：各分组条目数不等（7 / 4 / 4 / 2 / 2），grid 会留孤儿行 -->
      <div class="map">
        <nav v-for="g in groups" :key="g.title" class="panel map-group" :aria-label="g.title">
          <h3 class="map-title">{{ g.title }}</h3>
          <ul class="map-list">
            <li v-for="i in g.items" :key="i.link">
              <a :href="link(i.link)">{{ i.text }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>

    <!-- ========================= 能力速览 ========================= -->
    <section aria-labelledby="capabilities-heading">
      <header class="sec-head">
        <p class="eyebrow">{{ home.capabilities.eyebrow }}</p>
        <h2 id="capabilities-heading" class="h2">{{ home.capabilities.title }}</h2>
        <p class="sec-sub">{{ home.capabilities.subtitle }}</p>
      </header>

      <ul class="features">
        <li v-for="f in home.features" :key="f.title" class="panel feature">
          <h3 class="card-title">{{ f.title }}</h3>
          <p class="card-body">{{ f.details }}</p>
        </li>
      </ul>
    </section>

    <!-- ========================== 收尾 CTA ========================== -->
    <section class="cta" aria-labelledby="cta-heading">
      <div class="panel cta-panel">
        <div class="cta-copy">
          <div class="brand">
            <img :src="withBase('logo.png')" alt="" width="24" height="24" />
            <span>Nomu</span>
          </div>
          <h2 id="cta-heading" class="cta-title">{{ home.cta.title }}</h2>
          <p class="cta-body">{{ home.cta.body }}</p>
        </div>
        <div class="cta-actions">
          <a class="btn brand" :href="link(home.cta.primary.link)">{{ home.cta.primary.text }}</a>
          <a class="btn alt" :href="link(home.cta.secondary.link)">{{ home.cta.secondary.text }}</a>
          <a class="support" :href="link(home.cta.support.link)">{{ home.cta.support.text }}</a>
        </div>
      </div>
    </section>

    <!-- ========================== 页脚 ========================== -->
    <footer class="panel home-footer">
      <div class="footer-note">
        <img :src="withBase('logo.png')" alt="" width="18" height="18" />
        <span>{{ home.footer.note }}</span>
      </div>
      <nav class="footer-links">
        <a v-for="l in home.footer.links" :key="l.link" :href="link(l.link)">{{ l.text }}</a>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
/* ---------------------------------------------------------------- 节奏 */
.home {
  max-width: 1180px;
  margin: 0 auto;
  padding: 56px 24px 64px;
}

@media (min-width: 768px) {
  .home {
    padding: 88px 48px 88px;
  }
}

.home section + section,
.cta {
  margin-top: 72px;
}

@media (min-width: 768px) {
  .home section + section,
  .cta {
    margin-top: 104px;
  }
}

/* ------------------------------------------------------------ 字与材质 */
.eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.h1 {
  margin: 20px auto 0;
  /* 不用 ch 卡宽度：中文标题只有 7 个字，英文标题近 30 个字符，
     ch 上限会把英文挤成「一行孤字」。交给容器限宽 + 平衡换行。 */
  max-width: 100%;
  text-wrap: balance;
  font-size: 40px;
  line-height: 1.04;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .h1 {
    margin-top: 24px;
    font-size: 84px;
    line-height: 0.99;
    letter-spacing: -0.05em;
  }
}

/* 品牌原色黄只给最大那行字：小字用同色相降饱和的金棕，否则浅底上读不清 */
.h1 .accent {
  color: var(--nomu-accent);
}

.sub {
  margin: 24px auto 0;
  max-width: 58ch;
  font-size: 16px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

@media (min-width: 768px) {
  .sub {
    margin-top: 28px;
    font-size: 18px;
  }
}

.h2 {
  margin: 14px 0 0;
  max-width: 24ch;
  text-wrap: balance;
  font-size: 30px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .h2 {
    font-size: 52px;
    line-height: 1.02;
    letter-spacing: -0.04em;
  }
}

.sec-head {
  max-width: 62ch;
  margin-bottom: 36px;
}

@media (min-width: 768px) {
  .sec-head {
    margin-bottom: 48px;
  }
}

.sec-sub {
  margin: 16px 0 0;
  max-width: 56ch;
  font-size: 15px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

@media (min-width: 768px) {
  .sec-sub {
    font-size: 16px;
  }
}

/* 玻璃材质：落地页的 translucent material + 顶部 1px 高光边 */
.panel {
  border: 1px solid var(--nomu-glass-border);
  border-radius: 20px;
  background: var(--nomu-glass);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  box-shadow: var(--nomu-shadow-card);
}

.card-title {
  margin: 0;
  font-size: 17px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.012em;
  color: var(--vp-c-text-1);
}

.card-body {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

/* ---------------------------------------------------------------- 按钮 */
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 13px 24px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration: none;
  transition:
    background-color 0.15s var(--nomu-ease-out),
    box-shadow 0.15s var(--nomu-ease-out),
    transform 0.15s var(--nomu-ease-out);
}

.btn.brand {
  background: var(--nomu-accent);
  color: var(--nomu-accent-ink);
  font-weight: 600;
  box-shadow: var(--nomu-accent-shadow);
}

.btn.brand:hover {
  filter: brightness(1.05);
}

.btn.alt {
  border: 1px solid var(--nomu-glass-border);
  background: var(--nomu-glass-strong);
  color: var(--vp-c-text-1);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
}

.btn.alt:hover {
  background: var(--nomu-glass-hover);
}

.btn.link {
  padding: 13px 12px;
  color: var(--vp-c-text-2);
}

.btn.link:hover {
  color: var(--vp-c-text-1);
}

.btn:active {
  transform: scale(0.98);
}

/* ------------------------------------------------------------ 流程条 */
.flow {
  margin-top: 48px;
  padding: 24px 20px 20px;
  text-align: left;
}

@media (min-width: 768px) {
  .flow {
    margin-top: 56px;
    padding: 28px 28px 24px;
  }
}

/* 五步流程：列数写死，别用 auto-fit —— 5 个格子落到 4 列会掉出一个孤儿行 */
.steps {
  display: grid;
  gap: 16px 12px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  grid-template-columns: 1fr;
}

@media (min-width: 560px) {
  .steps {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 960px) {
  .steps {
    grid-template-columns: repeat(5, 1fr);
  }
}

.step {
  border-top: 2px solid var(--nomu-accent);
  padding-top: 10px;
}

.step-no {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 20px;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--nomu-accent-text);
}

.step-label {
  display: block;
  margin-top: 6px;
  font-size: 13.5px;
  line-height: 1.4;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.flow-note {
  margin: 20px 0 0;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}

/* ---------------------------------------------------------- 快速开始 */
/* 三张起步卡：minmax 取 230px，中宽断点也塞得下三列；
   宽屏下第 4 条空轨被 auto-fit 收掉，仍是三列等宽 */
.paths {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.card {
  display: block;
  height: 100%;
  padding: 22px 20px 18px;
  text-decoration: none;
  transition: box-shadow 0.2s var(--nomu-ease-out);
}

.card:hover {
  box-shadow: var(--nomu-shadow-panel);
}

.num {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 40px;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--nomu-accent-text);
}

.card .card-title {
  margin-top: 14px;
}

.card-more {
  display: inline-block;
  margin-top: 14px;
  font-size: 14px;
  color: var(--vp-c-text-3);
  transition: transform 0.2s var(--nomu-ease-out);
}

.card:hover .card-more {
  color: var(--nomu-accent-text);
  transform: translateX(3px);
}

/* -------------------------------------------------------------- 目录 */
.map {
  columns: 1;
  column-gap: 16px;
}

@media (min-width: 640px) {
  .map {
    columns: 2;
  }
}

@media (min-width: 960px) {
  .map {
    columns: 3;
  }
}

.map-group {
  display: inline-block;
  width: 100%;
  margin: 0 0 16px;
  padding: 18px 18px 14px;
  break-inside: avoid;
}

.map-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.map-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.map-list a {
  display: block;
  padding: 5px 0;
  font-size: 14.5px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.15s var(--nomu-ease-out);
}

.map-list a:hover {
  color: var(--nomu-accent-text);
}

/* ---------------------------------------------------------- 能力速览 */
.features {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.feature {
  position: relative;
  padding: 20px 20px 18px;
}

/* 品牌黄的短横，代替图标占住卡片的视觉起点 */
.feature::before {
  content: '';
  display: block;
  width: 24px;
  height: 3px;
  margin-bottom: 14px;
  border-radius: 999px;
  background: var(--nomu-accent);
}

/* ------------------------------------------------------------ 收尾 CTA */
.cta-panel {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 32px 24px;
  border-radius: 26px;
  box-shadow: var(--nomu-shadow-panel);
}

@media (min-width: 768px) {
  .cta-panel {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    padding: 44px 44px;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.brand img,
.footer-note img {
  border-radius: 6px;
}

.cta-title {
  margin: 14px 0 0;
  max-width: 20ch;
  font-size: 28px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .cta-title {
    font-size: 42px;
    letter-spacing: -0.035em;
  }
}

.cta-body {
  margin: 12px 0 0;
  max-width: 46ch;
  font-size: 15px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.cta-actions .btn {
  padding: 14px 26px;
  font-size: 15px;
}

.support {
  padding: 12px 10px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.15s var(--nomu-ease-out);
}

.support:hover {
  color: var(--vp-c-text-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* -------------------------------------------------------------- 页脚 */
.home-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  margin-top: 24px;
  padding: 18px 22px;
  border-radius: 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

@media (min-width: 768px) {
  .home-footer {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-note {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-note img {
  border-radius: 4px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
}

.footer-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.15s var(--nomu-ease-out);
}

.footer-links a:hover {
  color: var(--vp-c-text-1);
}

/* -------------------------------------------------------------- 入场 */
/* 只有 hero 走一段入场；下面的内容全部直接在场，文档要一眼扫得完 */
/* hero 居中：与落地页同款，大标题、说明、按钮共用一条中轴 */
.hero {
  text-align: center;
}

.hero > * {
  animation: rise 0.8s var(--nomu-ease-out) both;
}

.hero > :nth-child(1) {
  animation-delay: 0.05s;
}
.hero > :nth-child(2) {
  animation-delay: 0.13s;
}
.hero > :nth-child(3) {
  animation-delay: 0.21s;
}
.hero > :nth-child(4) {
  animation-delay: 0.29s;
}
.hero > :nth-child(5) {
  animation-delay: 0.37s;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero > * {
    animation: none;
  }
  .btn,
  .card,
  .card-more {
    transition: none;
  }
}

/* 用户关掉半透明时，玻璃退回不透明底，否则文字压在滚动内容上会糊 */
@media (prefers-reduced-transparency: reduce) {
  .panel,
  .btn.alt {
    background: var(--vp-c-bg-elv);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
