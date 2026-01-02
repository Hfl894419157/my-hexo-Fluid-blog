---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Liuli"
  text: "A VitePress Site"
  tagline: My great project tagline
  image:
    src: /hero-banner.png
    alt: Liuli Banner
  actions:
    - theme: brand
      text: 浏览作品集
      link: /portfolio
    - theme: alt
      text: 体验AIGC创作
      link: /aigc

features:
  - title: 精选作品展示
    icon: 🎨
    details: 探索UI/UX设计、3D建模、创意编程等各类精选作品，获取灵感与参考
    link: /portfolio
    linkText: 查看作品集
  - title: AIGC实时创作
    icon: 🤖
    details: 体验人工智能辅助创作，从文本生成到图像合成，探索创意无限可能
    link: /aigc
    linkText: 开始创作
  - title: 创作资源工具
    icon: 🛠️
    details: 精选3D建模、视频剪辑、平面设计、网站搭建等各类创作工具与教程
    link: /resources
    linkText: 探索工具
---

<!-- 作品展示区域 -->
## 🎨 精选作品集

<div class="portfolio-grid">
  <div class="portfolio-card">
    <h3>品牌视觉设计系统</h3>
    <p>为企业打造完整的品牌视觉识别系统，包括标志、色彩、版式和图形元素。</p>
    <div class="tags">
      <span class="tag">UI/UX</span>
      <span class="tag">品牌设计</span>
    </div>
  </div>
  
  <div class="portfolio-card">
    <h3>3D建筑可视化</h3>
    <p>使用Blender和UE5创建的高质量建筑渲染与沉浸式虚拟漫游体验。</p>
    <div class="tags">
      <span class="tag">3D建模</span>
      <span class="tag">可视化</span>
    </div>
  </div>
  
  <div class="portfolio-card">
    <h3>移动端应用设计</h3>
    <p>针对iOS和Android平台的用户界面设计，注重交互体验与视觉美感。</p>
    <div class="tags">
      <span class="tag">移动端</span>
      <span class="tag">交互设计</span>
    </div>
  </div>
</div>

<!-- AIGC创作板块 -->
## 🤖 AIGC实时创作

<div class="aigc-section">
  <div class="aigc-content">
    <h3>AI辅助创作流程</h3>
    <p>我们的AIGC平台整合了多种AI模型，为您提供从灵感激发到作品完成的完整创作支持。</p>
    
    <div class="process-steps">
      <div class="step">
        <div class="step-icon">💡</div>
        <div class="step-text">
          <h4>创意灵感生成</h4>
          <p>基于关键词和风格描述，AI生成多个创意方向和概念草图</p>
        </div>
      </div>
      
      <div class="step">
        <div class="step-icon">🎨</div>
        <div class="step-text">
          <h4>视觉内容创作</h4>
          <p>利用扩散模型生成高质量图像，支持多种艺术风格和分辨率</p>
        </div>
      </div>
      
      <div class="step">
        <div class="step-icon">✏️</div>
        <div class="step-text">
          <h4>内容优化调整</h4>
          <p>通过参数调整和局部修改，精细化控制生成结果</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 工具资源板块 -->
## 🛠️ 创作资源与工具

<div class="tools-grid">
  <div class="tool-card">
    <div class="tool-icon">📐</div>
    <h3>3D建模</h3>
    <p>Blender、Maya、ZBrush等专业3D建模与雕刻工具教程和资源</p>
    <a href="/resources/3d" class="tool-link">探索资源 →</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🎬</div>
    <h3>视频剪辑</h3>
    <p>Premiere Pro、DaVinci Resolve、Final Cut Pro视频制作工作流</p>
    <a href="/resources/video" class="tool-link">探索资源 →</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">🖌️</div>
    <h3>平面工具</h3>
    <p>Photoshop、Illustrator、Figma等平面设计与UI/UX工具指南</p>
    <a href="/resources/graphic" class="tool-link">探索资源 →</a>
  </div>
  
  <div class="tool-card">
    <div class="tool-icon">💻</div>
    <h3>网站搭建</h3>
    <p>VitePress、Vue.js、React等现代前端框架与静态站点生成器</p>
    <a href="/resources/web" class="tool-link">探索资源 →</a>
  </div>
</div>

<style>
/* 自定义样式 */
.portfolio-grid, .tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.portfolio-card, .tool-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.portfolio-card:hover, .tool-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  background: var(--vp-c-bg-mute);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.aigc-section {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-icon {
  font-size: 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-text h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.tool-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.tool-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  text-decoration: none;
}

.tool-link:hover {
  text-decoration: underline;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .portfolio-grid, .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .step {
    flex-direction: column;
    text-align: center;
  }
  
  .step-icon {
    margin: 0 auto;
  }
}
</style>

