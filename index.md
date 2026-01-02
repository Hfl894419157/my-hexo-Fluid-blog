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

<!-- AIGC实时创作（改为你提供的卡片式布局） -->
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

<!-- 创作资源与工具 -->
<div class="section-header">
  <h2>创作资源与工具</h2>
</div>

<div class="tools-grid">
  <div class="tool-card">
    <div class="tool-icon">🖼️</div>
    <h3>Photoshop</h3>
    <p>专业的图像编辑与合成软件</p>
    <a href="/downloads/photoshop" class="download-btn">立即下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">✏️</div>
    <h3>Illustrator</h3>
    <p>矢量图形设计与绘制工具</p>
    <a href="/downloads/illustrator" class="download-btn">立即下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">📐</div>
    <h3>CorelDRAW</h3>
    <p>专业的矢量插图与排版软件</p>
    <a href="/downloads/coreldraw" class="download-btn">立即下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🎬</div>
    <h3>Cinema 4D</h3>
    <p>专业的3D建模与动画软件</p>
    <a href="/downloads/cinema4d" class="download-btn">立即下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🔦</div>
    <h3>Keyshot</h3>
    <p>实时3D渲染与可视化工具</p>
    <a href="/downloads/keyshot" class="download-btn">立即下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🔄</div>
    <h3>Blender</h3>
    <p>开源3D创作套件</p>
    <a href="/downloads/blender" class="download-btn">立即下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🎥</div>
    <h3>Premiere Pro</h3>
    <p>专业的视频编辑软件</p>
    <a href="/downloads/premiere" class="download-btn">立即下载</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">✨</div>
    <h3>After Effects</h3>
    <p>专业的动态图形与视觉效果软件</p>
    <a href="/downloads/aftereffects" class="download-btn">立即下载</a>
  </div>
</div>

<style>
/* ===== 全局样式（Vue风格+主题切换） ===== */
:root {
  /* 浅色模式（默认） */
  --vue-primary: #4FC08D;
  --vue-primary-dark: #3AA373;
  --vue-secondary: #3B82F6;
  --text-primary: #2C3E50;
  --text-secondary: #64748B;
  --bg-light: #F8FAFC;
  --bg-white: #FFFFFF;
  --border-color: #E2E8F0;
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 4px 16px rgba(79, 192, 141, 0.15);
  --transition-smooth: all 0.2s ease-in-out;
}

/* 深色模式 */
.dark {
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --bg-light: #1E293B;
  --bg-white: #27374D;
  --border-color: #334155;
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-hover: 0 4px 16px rgba(79, 192, 141, 0.25);
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

/* 章节标题（Vue风格） */
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
  border-bottom: 1px solid var(--border-color);
}
.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 2px;
  background: var(--vue-primary);
  border-radius: 1px;
}

/* ===== 作品集样式（Vue风格） ===== */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 5rem;
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
.portfolio-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  border-color: var(--vue-primary);
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
  gap: 0.6rem;
}
.tag {
  padding: 0.35rem 0.9rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  display: inline-block;
}
.tag-uiux { background-color: var(--vue-secondary); }
.tag-brand { background-color: var(--vue-primary); }
.tag-3d { background-color: #9333EA; opacity: 0.9; }
.tag-viz { background-color: #F59E0B; opacity: 0.9; }
.tag-mobile { background-color: #EF4444; opacity: 0.9; }
.tag-interaction { background-color: #06B6D4; opacity: 0.9; }

/* ===== AIGC板块（你的卡片式布局） ===== */
.aigc-article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto 5rem;
  padding: 0 1.5rem;
}
.aigc-article-card {
  display: flex;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: var(--transition-smooth);
}
.aigc-article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  border-color: var(--vue-primary);
}
.article-image {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
}
.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.article-content {
  padding: 1rem;
  flex-grow: 1;
}
.article-content h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.article-meta {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
  gap: 0.8rem;
}
.article-meta .interact {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}

/* ===== 创作资源与工具样式（Vue风格） ===== */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin: 2rem auto 5rem;
  max-width: 1200px;
  padding: 0 1.5rem;
}
.tool-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
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
  font-size: 2.5rem;
  margin-bottom: 1rem;
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F0FDF4, #E3F9E5);
  border-radius: 50%;
  color: var(--vue-primary);
}
.dark .tool-icon {
  background: linear-gradient(135deg, #27374D, #334155);
}
.tool-card h3 {
  margin: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}
.tool-card p {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 1.2rem;
  line-height: 1.4;
  flex-grow: 1;
}
.download-btn {
  display: inline-block;
  background: var(--vue-primary);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.85rem;
  transition: var(--transition-smooth);
  width: 100%;
  max-width: 140px;
  text-align: center;
}
.download-btn:hover {
  background: var(--vue-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(79, 192, 141, 0.2);
}

/* ===== 响应式调整 ===== */
@media (max-width: 992px) {
  .tools-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
@media (max-width: 768px) {
  .portfolio-grid, .aigc-article-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
  .section-header h2 {
    font-size: 1.6rem;
  }
}
@media (max-width: 480px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
  .tool-card {
    padding: 1.25rem;
  }
  .article-image {
    width: 100px;
    height: 100px;
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