---
layout: home

hero:
  name: "Liuli"
  text: "A VitePress Site"
  tagline: My great project tagline
  image:
    src: /banner-image.png
    alt: 创意设计展示
    style: "max-width: 400px; height: auto;"
  actions:
    - theme: brand
      text: 浏览作品集
      link: /portfolio
    - theme: alt
      text: 创作资源
      link: /resources

features: []  # 清空原有features，防止显示默认内容
---

<!-- 精选作品集 -->
<div class="section-header">
  <h2>精选作品集</h2>
</div>

<div class="portfolio-grid">
  <a href="/portfolio/brand-design" class="portfolio-card">
    <div class="card-content">
      <h3>品牌视觉设计系统</h3>
      <p>为企业打造完整的品牌视觉识别系统，包括标志、色彩、版式和图形元素。</p>
      <div class="tags">
        <span class="tag tag-uiux">UI/UX</span>
        <span class="tag tag-brand">品牌设计</span>
      </div>
    </div>
  </a>
  
  <a href="/portfolio/3d-visualization" class="portfolio-card">
    <div class="card-content">
      <h3>3D建筑可视化</h3>
      <p>使用Blender和UE5创建的高质量建筑渲染与沉浸式虚拟漫游体验。</p>
      <div class="tags">
        <span class="tag tag-3d">3D建模</span>
        <span class="tag tag-viz">可视化</span>
      </div>
    </div>
  </a>
  
  <a href="/portfolio/mobile-design" class="portfolio-card">
    <div class="card-content">
      <h3>移动端应用设计</h3>
      <p>针对iOS和Android平台的用户界面设计，注重交互体验与视觉美感。</p>
      <div class="tags">
        <span class="tag tag-mobile">移动端</span>
        <span class="tag tag-interaction">交互设计</span>
      </div>
    </div>
  </a>
</div>

<!-- 精选作品集 - 探索更多按钮 -->
<div class="section-more-btn">
  <a href="/portfolio" class="explore-more-btn">探索更多作品集</a>
</div>

<!-- AIGC实时创作（三行左图右文+高度翻倍） -->
<div class="section-header">
  <h2>AIGC实时创作</h2>
</div>

<div class="aigc-article-grid">
  <!-- 文章卡片1 -->
  <a href="/aigc/50mm-lens" class="aigc-article-card">
    <div class="article-image">
      <img src="/aigc-1.jpg" alt="50mm F/1.4镜头" loading="lazy">
    </div>
    <div class="article-content">
      <h3>超越「平替」，年轻人的第一支50mm F/1.4镜头</h3>
      <div class="article-meta">
        <span class="author">Hermannch...</span>
        <span class="time">昨天 14:10</span>
        <span class="interact">
          <span>👍 18</span>
          <span>💬 9</span>
        </span>
      </div>
    </div>
  </a>

  <!-- 文章卡片2 -->
  <a href="/aigc/adhd-guide" class="aigc-article-card">
    <div class="article-image">
      <img src="/aigc-2.jpg" alt="ADHD问诊指南" loading="lazy">
    </div>
    <div class="article-content">
      <h3>分心不是你的错——成人ADHD问诊指南</h3>
      <div class="article-meta">
        <span class="author">张奕源Nick</span>
        <span class="time">前天 16:29</span>
        <span class="interact">
          <span>👍 186</span>
          <span>💬 33</span>
        </span>
      </div>
    </div>
  </a>

  <!-- 文章卡片3 -->
  <a href="/aigc/2025-film" class="aigc-article-card">
    <div class="article-image">
      <img src="/aigc-3.jpg" alt="2025光影记忆" loading="lazy">
    </div>
    <div class="article-content">
      <h3>珍藏2025光影记忆，为你的「年度之作」颁个奖</h3>
      <div class="article-meta">
        <span class="author">少数派编辑部</span>
        <span class="time">前天 15:00</span>
        <span class="interact">
          <span>👍 15</span>
          <span>💬 1</span>
        </span>
      </div>
    </div>
  </a>
</div>

<!-- AIGC实时创作 - 探索更多按钮 -->
<div class="section-more-btn">
  <a href="/aigc" class="explore-more-btn">探索更多AIGC创作</a>
</div>

<!-- 创作资源与工具（去掉AI板块+7个小尺寸+高度减少1/3） -->
<div class="section-header">
  <h2>创作资源与工具</h2>
</div>

<div class="tools-grid">
  <div class="tool-card">
    <div class="tool-icon">🖼️</div>
    <h3>Photoshop</h3>
    <p>图像编辑</p>
    <a href="/downloads/photoshop" class="download-btn">下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">✏️</div>
    <h3>Illustrator</h3>
    <p>矢量设计</p>
    <a href="/downloads/illustrator" class="download-btn">下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">📐</div>
    <h3>CorelDRAW</h3>
    <p>矢量排版</p>
    <a href="/downloads/coreldraw" class="download-btn">下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🎬</div>
    <h3>Cinema 4D</h3>
    <p>3D建模</p>
    <a href="/downloads/cinema4d" class="download-btn">下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🔦</div>
    <h3>Keyshot</h3>
    <p>3D渲染</p>
    <a href="/downloads/keyshot" class="download-btn">下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🔄</div>
    <h3>Blender</h3>
    <p>开源3D</p>
    <a href="/downloads/blender" class="download-btn">下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🎥</div>
    <h3>Premiere</h3>
    <p>视频编辑</p>
    <a href="/downloads/premiere" class="download-btn">下载</a>
  </div>
</div>

<!-- 创作资源与工具 - 探索更多按钮 -->
<div class="section-more-btn">
  <a href="/resources" class="explore-more-btn">探索更多创作资源</a>
</div>

<style>
/* ===== 全局样式（Vue风格+主题切换） ===== */
:root {
  /* 浅色模式（默认） */
  --vue-primary: #4FC08D; /* Banner按钮主色 */
  --vue-primary-hover: #3AA373; /* 浅色模式hover */
  --btn-bg: #4FC08D; /* 浅色模式按钮背景 */
  --btn-text: #FFFFFF; /* 浅色模式按钮文字 */
  --btn-hover-bg: #3AA373; /* 浅色模式按钮hover */
  --text-primary: #2C3E50;
  --text-secondary: #64748B;
  --bg-light: #F8FAFC; /* 浅色页面背景 */
  --bg-white: #FFFFFF; /* 浅色卡片背景 */
  --border-color: #E2E8F0;
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 4px 16px rgba(79, 192, 141, 0.15);
  --transition-smooth: all 0.2s ease-in-out;
  /* 小标签配色（浅色模式） */
  --tag-bg: #E3F9E5;
  --tag-text: #2C3E50;
}

/* 深色模式（有设计感的黑色，非纯黑） */
.dark {
  --vue-primary: #3AA373; /* 深色模式主色 */
  --vue-primary-hover: #2D8659; /* 深色模式hover */
  --btn-bg: #3AA373; /* 深色模式按钮背景 */
  --btn-text: #0A0E17; /* 深色模式按钮文字 */
  --btn-hover-bg: #2D8659; /* 深色模式按钮hover */
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --bg-light: #0A0E17; /* 有设计感的黑（带蓝灰调） */
  --bg-white: #121826; /* 深色卡片背景（层次黑） */
  --border-color: #1F2937;
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-hover: 0 4px 16px rgba(58, 163, 115, 0.25);
  /* 小标签配色（深色模式） */
  --tag-bg: #1F2937;
  --tag-text: #F8FAFC;
}

body {
  background-color: var(--bg-light);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  transition: background-color 0.2s ease;
}

/* 主题切换按钮（Vue风格） */
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: var(--transition-smooth);
}
.theme-toggle:hover {
  border-color: var(--vue-primary);
  box-shadow: var(--shadow-light);
}

/* 移除标题锚点#号 */
h1 a.header-anchor,
h2 a.header-anchor,
h3 a.header-anchor,
h4 a.header-anchor,
h5 a.header-anchor,
h6 a.header-anchor {
  display: none !important;
}

/* 移除Banner分割线 */
.VPHero .VPImage {
  border: none !important;
}
.VPHero::after {
  display: none !important;
}

/* 移除链接下划线 */
a {
  text-decoration: none !important;
  color: inherit;
}

/* 章节标题（移除灰色线条+绿色短横线） */
.section-header {
  margin-top: 5rem;
  margin-bottom: 2.5rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1.5rem;
}
.section-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  position: relative;
  padding-bottom: 0.75rem;
  border-bottom: none !important; /* 移除灰色下边框 */
}
.section-header h2::after {
  display: none !important; /* 移除绿色短横线 */
}

/* ===== 精选作品集（小标签+悬浮动画与工具板块一致） ===== */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1.5rem;
}
.portfolio-card {
  display: block;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.75rem;
  transition: var(--transition-smooth);
  position: relative;
}
/* 悬浮动画（与工具板块一致） */
.portfolio-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  border-color: var(--vue-primary);
}
.portfolio-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--vue-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.portfolio-card:hover::before {
  opacity: 1;
}
.card-content h3 {
  margin-top: 0;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
}
.card-content p {
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
  line-height: 1.6;
  font-size: 0.95rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
/* 小标签样式（无按钮感+主题适配） */
.tag {
  padding: 0.2rem 0.6rem; /* 缩小尺寸，无按钮感 */
  border-radius: 12px;
  font-size: 0.7rem; /* 小字体 */
  font-weight: 500;
  background-color: var(--tag-bg);
  color: var(--tag-text);
  display: inline-block;
  transition: var(--transition-smooth);
}
.tag:hover {
  opacity: 0.9;
}

/* ===== AIGC实时创作（高度翻倍+三行+统一悬浮动画） ===== */
.aigc-article-grid {
  display: grid;
  grid-template-columns: 1fr; /* 三行布局 */
  gap: 1.5rem;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1.5rem;
}
.aigc-article-card {
  display: flex;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: var(--transition-smooth);
  align-items: center; /* 垂直居中 */
  height: 240px; /* 高度翻倍（原120px） */
}
/* 悬浮动画（与工具板块一致） */
.aigc-article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  border-color: var(--vue-primary);
}
.article-image {
  flex-shrink: 0;
  width: 220px; /* 适配高度翻倍 */
  height: 100%; /* 占满卡片高度 */
}
.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.article-content {
  padding: 1.5rem 2rem; /* 适配高度翻倍 */
  flex-grow: 1;
}
.article-content h3 {
  font-size: 1.2rem; /* 适配高度翻倍 */
  font-weight: 600;
  margin: 0 0 0.8rem 0;
  color: var(--text-primary);
}
.article-meta {
  display: flex;
  align-items: center;
  font-size: 0.9rem; /* 适配高度翻倍 */
  color: var(--text-secondary);
  gap: 1.2rem;
}
.article-meta .interact {
  margin-left: auto;
  display: flex;
  gap: 1rem;
}

/* ===== 创作资源与工具（7个板块+高度减少1/3+按钮分主题配色） ===== */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(100% / 7 - 1rem), 1fr)); /* 合理分配7个板块宽度 */
  gap: 0.8rem;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1.5rem;
}
.tool-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.8rem 0.5rem; /* 高度减少1/3（原1.5rem→0.8rem） */
  text-align: center;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 140px; /* 固定高度，减少1/3后更紧凑 */
}
/* 悬浮动画 */
.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  border-color: var(--vue-primary);
}
.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--vue-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.tool-card:hover::before {
  opacity: 1;
}
.tool-icon {
  font-size: 1.5rem; /* 缩小图标，适配高度减少 */
  margin-bottom: 0.4rem;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F0FDF4, #E3F9E5);
  border-radius: 50%;
  color: var(--vue-primary);
}
.dark .tool-icon {
  background: linear-gradient(135deg, #121826, #1F2937);
}
.tool-card h3 {
  margin: 0.2rem 0;
  font-size: 0.8rem; /* 缩小标题，适配高度减少 */
  font-weight: 600;
  color: var(--text-primary);
}
.tool-card p {
  color: var(--text-secondary);
  font-size: 0.65rem; /* 缩小描述，适配高度减少 */
  margin-bottom: 0.6rem;
  line-height: 1.4;
  flex-grow: 1;
}
/* 下载按钮（分主题配色+高度缩小） */
.download-btn {
  display: inline-block;
  background: var(--btn-bg);
  color: var(--btn-text);
  padding: 0.3rem 0.6rem; /* 高度缩小，更紧凑 */
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.65rem; /* 缩小字体，适配小板块 */
  transition: var(--transition-smooth);
  width: 100%;
  max-width: 70px; /* 适配小板块 */
  text-align: center;
  height: 24px; /* 固定按钮高度，缩小尺寸 */
  line-height: 24px; /* 垂直居中，无多余高度 */
}
.download-btn:hover {
  background: var(--btn-hover-bg);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(79, 192, 141, 0.2);
}

/* ===== 探索更多按钮（每个板块下方+主题适配） ===== */
.section-more-btn {
  margin-bottom: 5rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1.5rem;
  text-align: left;
}
.explore-more-btn {
  display: inline-block;
  background: var(--btn-bg);
  color: var(--btn-text);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: var(--transition-smooth);
}
.explore-more-btn:hover {
  background: var(--btn-hover-bg);
  box-shadow: var(--shadow-light);
  transform: translateY(-1px);
}

/* ===== 响应式调整 ===== */
@media (max-width: 992px) {
  .tools-grid {
    grid-template-columns: repeat(4, 1fr); /* 平板端4列 */
  }
  .aigc-article-card {
    flex-direction: column; /* 平板端AIGC卡片上下布局 */
    text-align: center;
    height: auto; /* 自适应高度，保证美观 */
  }
  .article-image {
    width: 100%;
    height: 200px;
  }
  .article-meta {
    justify-content: center;
  }
  .article-meta .interact {
    margin-left: 1rem;
  }
}
@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .tools-grid {
    grid-template-columns: repeat(2, 1fr); /* 移动端2列 */
  }
  .section-header h2 {
    font-size: 1.6rem;
  }
  .explore-more-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}
@media (max-width: 480px) {
  .article-content {
    padding: 1rem;
  }
  .tool-card {
    padding: 0.6rem 0.3rem;
    height: 120px;
  }
  .section-more-btn {
    text-align: center;
  }
}
</style>

<!-- 主题切换JavaScript逻辑（适配VitePress SSR环境） -->
<script>
// 核心：判断是否为浏览器环境（避免Node.js构建时报错）
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // 延迟执行：确保DOM元素已加载完成
  window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return; // 防止元素未找到报错

    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (savedTheme === null && isSystemDark)) {
      document.documentElement.classList.add('dark');
      toggleBtn.textContent = '☀️';
    } else {
      toggleBtn.textContent = '🌙';
    }

    // 点击切换主题
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggleBtn.textContent = isDark ? '☀️' : '🌙';
    });
  });
}
</script>