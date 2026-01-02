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

<!-- 主题切换按钮 -->
<button id="theme-toggle" class="theme-toggle" title="切换主题"></button>

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

<!-- 创作资源与工具（7个板块+高度优化+按钮调整） -->
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
  /* 浅色模式 - 主色系 */
  --color-primary: #4FC08D; /* Vue绿-品牌主色 */
  --color-primary-hover: #3AA578; /* Vue绿-深 */
  --color-primary-light: #E3F9E5; /* Vue绿-浅 */
  
  /* 浅色模式 - 文本色系 */
  --text-primary: #2C3E50; /* 主文本 */
  --text-secondary: #64748B; /* 次文本 */
  --text-light: #94A3B8; /* 浅文本 */
  --text-inverse: #FFFFFF; /* 反色文本 */
  
  /* 浅色模式 - 背景色系 */
  --bg-page: #F8FAFC; /* 页面背景 */
  --bg-card: #FFFFFF; /* 卡片背景 */
  --bg-hover: #F1F5F9; /* 悬浮背景 */
  --bg-input: #FFFFFF; /* 输入框背景 */
  
  /* 浅色模式 - 边框与阴影 */
  --border-color: #E2E8F0; /* 边框色 */
  --border-color-hover: #CBD5E1; /* 边框色-悬浮 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 4px 16px rgba(79, 192, 141, 0.15);
  
  /* 浅色模式 - 按钮色系 */
  --btn-primary-bg: #2C3E50; /* 主按钮背景 */
  --btn-primary-text: #FFFFFF; /* 主按钮文字 */
  --btn-primary-hover: #1E293B; /* 主按钮悬浮 */
  --btn-secondary-bg: #4FC08D; /* 次按钮背景（Vue绿） */
  --btn-secondary-text: #FFFFFF; /* 次按钮文字 */
  --btn-secondary-hover: #3AA578; /* 次按钮悬浮 */
  
  /* 浅色模式 - 标签色系 */
  --tag-bg: #E3F9E5; /* 标签背景 */
  --tag-text: #2C3E50; /* 标签文字 */
  
  /* 动画 */
  --transition-smooth: all 0.2s ease-in-out;
}

/* 深色模式 */
.dark {
  /* 深色模式 - 主色系 */
  --color-primary: #52D87A; /* Vue绿-亮化版 */
  --color-primary-hover: #3AA578; /* Vue绿-标准 */
  --color-primary-light: #1F2937; /* Vue绿-深色背景 */
  
  /* 深色模式 - 文本色系 */
  --text-primary: #F8FAFC; /* 主文本 */
  --text-secondary: #94A3B8; /* 次文本 */
  --text-light: #64748B; /* 浅文本 */
  --text-inverse: #0A0E17; /* 反色文本 */
  
  /* 深色模式 - 背景色系 */
  --bg-page: #0A0E17; /* 页面背景-纯黑 */
  --bg-card: #121826; /* 卡片背景 */
  --bg-hover: #1F2937; /* 悬浮背景 */
  --bg-input: #1F2937; /* 输入框背景 */
  
  /* 深色模式 - 边框与阴影 */
  --border-color: #1F2937; /* 边框色 */
  --border-color-hover: #374151; /* 边框色-悬浮 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 4px 16px rgba(58, 163, 115, 0.25);
  
  /* 深色模式 - 按钮色系 */
  --btn-primary-bg: #F8FAFC; /* 主按钮背景 */
  --btn-primary-text: #0A0E17; /* 主按钮文字 */
  --btn-primary-hover: #E2E8F0; /* 主按钮悬浮 */
  --btn-secondary-bg: #52D87A; /* 次按钮背景（亮绿） */
  --btn-secondary-text: #0A0E17; /* 次按钮文字 */
  --btn-secondary-hover: #E2E8F0; /* 次按钮悬浮 */
  
  /* 深色模式 - 标签色系 */
  --tag-bg: #1F2937; /* 标签背景 */
  --tag-text: #F8FAFC; /* 标签文字 */
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 主题切换按钮（Vue风格） */
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: var(--transition-smooth);
  font-size: 1.2rem;
  box-shadow: var(--shadow-md);
}

.theme-toggle:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.theme-toggle:active {
  transform: translateY(0);
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

/* 章节标题 */
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
  border-bottom: 2px solid var(--color-primary);
  transition: var(--transition-smooth);
}

/* ===== 精选作品集 ===== */
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
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.75rem;
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
}
.portfolio-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}
.portfolio-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), transparent);
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
.tag {
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: var(--tag-bg);
  color: var(--tag-text);
  display: inline-block;
  transition: var(--transition-smooth);
}
.tag:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

/* ===== AIGC实时创作 ===== */
.aigc-article-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1.5rem;
}
.aigc-article-card {
  display: flex;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition: var(--transition-smooth);
  align-items: center;
  height: 240px;
}
.aigc-article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}
.aigc-article-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--color-primary), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.aigc-article-card:hover::before {
  opacity: 1;
}
.article-image {
  flex-shrink: 0;
  width: 220px;
  height: 100%;
}
.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.article-content {
  padding: 1.5rem 2rem;
  flex-grow: 1;
  position: relative;
}
.article-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.8rem 0;
  color: var(--text-primary);
}
.article-meta {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
  gap: 1.2rem;
}
.article-meta .interact {
  margin-left: auto;
  display: flex;
  gap: 1rem;
}

/* ===== 创作资源与工具 ===== */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(100% / 7 - 1rem), 1fr));
  gap: 0.8rem;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1.5rem;
}
.tool-card {
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.2rem 0.8rem;
  text-align: center;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 180px;
  justify-content: center;
  overflow: hidden;
}
.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}
.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.tool-card:hover::before {
  opacity: 1;
}
.tool-icon {
  font-size: 1.8rem;
  margin-bottom: 0.6rem;
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-light);
  border-radius: 50%;
  color: var(--color-primary);
  transition: var(--transition-smooth);
}
.tool-card:hover .tool-icon {
  transform: scale(1.1) rotate(-5deg);
}
.tool-card h3 {
  margin: 0.3rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}
.tool-card p {
  color: var(--text-secondary);
  font-size: 0.7rem;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}
/* ===== 按钮样式 ===== */
.download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  font-size: 0.65rem;
  transition: var(--transition-smooth);
  width: 100%;
  max-width: 80px;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}
.download-btn:hover {
  background: var(--btn-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.explore-more-btn {
  display: inline-block;
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  padding: 0.7rem 2rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--transition-smooth);
  cursor: pointer;
  box-shadow: var(--shadow-md);
}
.explore-more-btn:hover {
  background: var(--btn-primary-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* ===== 响应式调整 ===== */
.section-more-btn {
  margin-bottom: 5rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1.5rem;
  text-align: left;
}

/* ===== 响应式调整 ===== */
@media (max-width: 992px) {
  .tools-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .aigc-article-card {
    flex-direction: column;
    text-align: center;
    height: auto;
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
    grid-template-columns: repeat(2, 1fr);
  }
  .section-header h2 {
    font-size: 1.6rem;
  }
  .explore-more-btn {
    padding: 0.5rem 1.5rem;
    font-size: 0.8rem;
  }
  .theme-toggle {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
@media (max-width: 480px) {
  .article-content {
    padding: 1rem;
  }
  .tool-card {
    padding: 1rem 0.6rem;
    height: 160px;
  }
  .section-more-btn {
    text-align: center;
  }
  .theme-toggle {
    width: 38px;
    height: 38px;
    top: 0.75rem;
    right: 0.75rem;
  }
}

/* ===== VitePress 特定样式调整 ===== */
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

/* 移除标题锚点 */
h1 a.header-anchor,
h2 a.header-anchor,
h3 a.header-anchor,
h4 a.header-anchor,
h5 a.header-anchor,
h6 a.header-anchor {
  display: none !important;
}
</style>

<!-- 主题切换JavaScript逻辑（适配VitePress SSR环境） -->
<script>
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) {
      // 如果按钮不存在，延迟重试
      setTimeout(initTheme, 100);
      return;
    }

    // 获取保存的主题或系统偏好
    const savedTheme = localStorage.getItem('theme');
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : isSystemDark;

    // 初始化主题
    if (isDark) {
      document.documentElement.classList.add('dark');
      toggleBtn.textContent = '☀️';
    } else {
      document.documentElement.classList.remove('dark');
      toggleBtn.textContent = '🌙';
    }

    // 点击切换主题
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggleBtn.textContent = isDark ? '☀️' : '🌙';
    });

    // 监听系统主题变化
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
          toggleBtn.textContent = '☀️';
        } else {
          document.documentElement.classList.remove('dark');
          toggleBtn.textContent = '🌙';
        }
      }
    });
  }

  // 在DOM加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
}
</script>