<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { portfolioWorks } from './.shared/portfolioData.js'
import { aigcWorks as allAigcWorks } from './.shared/aigcData.js'
import { blogPosts as allBlogPosts } from './.shared/blogData.js'
import { toolsResources } from './.shared/resourcesData.js'

// === 1. 精选作品数据 (从共享数据源获取) ===
const selectedWorks = computed(() => portfolioWorks.filter(work => work.featured))

// === 2. AIGC 实验室数据 (从共享数据源获取) ===
const aigcWorks = computed(() => allAigcWorks.filter(work => work.featured))

// === 3. 文章博客数据 (从共享数据源获取) ===
const blogPosts = computed(() => allBlogPosts.filter(post => post.featured))

// === 4. 创作资源数据 (从共享数据源获取) ===
const tools = computed(() => toolsResources.filter(tool => tool.featured))

// === 5. 简历数据 ===
const resumeStats = [
  { label: '设计与内容经验', value: '8+', icon: '💎' },
  { label: '项目交付经验', value: '120+', icon: '🚀' },
  { label: 'AI 工作流方向', value: '4', icon: '🔥' },
]

// === 6. 联系方式数据 (包含抖音，Email在最后) ===
const contactLinks = [
  { 
    id: 'wechat',
    name: 'WeChat', 
    iconSvg: '<svg t="1768037070303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11356" width="200" height="200"><path d="M249.173333 335.872c0 10.922667 4.437333 21.504 11.946667 29.013333 7.509333 7.509333 18.432 11.946667 29.013333 11.946667 10.922667 0 21.504-4.437333 29.013333-11.946667 7.509333-7.509333 11.946667-18.432 11.946667-29.013333 0-10.922667-4.437333-21.504-11.946667-29.013333-7.509333-7.509333-18.432-11.946667-29.013333-11.946667-10.922667 0-21.504 4.437333-29.013333 11.946667C253.610667 314.368 249.173333 325.290667 249.173333 335.872L249.173333 335.872zM249.173333 335.872" fill="#16bc21" p-id="11357"></path><path d="M569.344 548.864c0 8.533333 3.413333 16.725333 9.557333 22.869333 5.802667 5.802667 14.336 9.557333 22.869333 9.557333 8.533333 0 16.725333-3.413333 22.869333-9.557333 5.802667-5.802667 9.557333-14.336 9.557333-22.869333 0-8.533333-3.413333-16.725333-9.557333-22.869333-5.802667-5.802667-14.336-9.557333-22.869333-9.557333-8.533333 0-16.725333 3.413333-22.869333 9.557333C573.098667 531.797333 569.344 540.330667 569.344 548.864L569.344 548.864zM569.344 548.864" fill="#16bc21" p-id="11358"></path><path d="M459.093333 335.872c0 10.922667 4.437333 21.504 11.946667 29.013333 7.509333 7.509333 18.432 11.946667 29.013333 11.946667 10.922667 0 21.504-4.437333 29.013333-11.946667 7.509333-7.509333 11.946667-18.432 11.946667-29.013333 0-10.922667-4.437333-21.504-11.946667-29.013333-7.509333-7.509333-18.432-11.946667-29.013333-11.946667-10.922667 0-21.504 4.437333-29.013333 11.946667C463.530667 314.368 459.093333 325.290667 459.093333 335.872L459.093333 335.872zM459.093333 335.872" fill="#16bc21" p-id="11359"></path><path d="M842.069333 27.306667 181.930667 27.306667C94.549333 27.306667 23.893333 98.304 23.893333 186.026667l0 659.456c0 87.722667 70.997333 158.72 158.378667 158.72l660.138667 0c87.381333 0 158.378667-70.997333 158.378667-158.72L1000.789333 186.026667C1000.448 98.304 929.450667 27.306667 842.069333 27.306667L842.069333 27.306667zM390.144 681.642667c-36.864 0-66.56-7.509333-103.765333-15.018667l-103.424 51.882667 29.696-89.088c-74.069333-51.882667-118.442667-118.442667-118.442667-200.021333 0-140.970667 133.461333-251.904 296.277333-251.904 145.749333 0 273.066667 88.746667 298.666667 207.872-9.557333-1.024-18.773333-1.706667-28.672-1.706667-140.629333 0-251.904 105.130667-251.904 234.496 0 21.504 3.413333 42.325333 9.216 62.122667C408.917333 681.301333 399.701333 681.642667 390.144 681.642667L390.144 681.642667zM827.050667 785.408l22.186667 74.069333-81.237333-44.373333c-29.696 7.509333-59.392 15.018667-88.746667 15.018667-140.970667 0-251.904-96.256-251.904-215.04 0-118.442667 110.933333-215.04 251.904-215.04 133.12 0 251.562667 96.597333 251.562667 215.04C930.816 681.642667 886.442667 741.034667 827.050667 785.408L827.050667 785.408zM827.050667 785.408" fill="#16bc21" p-id="11360"></path><path d="M730.794667 548.864c0 8.533333 3.413333 16.725333 9.557333 22.869333 5.802667 5.802667 14.336 9.557333 22.869333 9.557333 8.533333 0 16.725333-3.413333 22.869333-9.557333 5.802667-5.802667 9.557333-14.336 9.557333-22.869333-9.557333-8.533333 0-16.725333 3.413333-22.869333 9.557333C734.208 531.797333 730.794667 540.330667 730.794667 548.864L730.794667 548.864zM730.794667 548.864" fill="#16bc21" p-id="11361"></path></svg>', 
    type: 'modal',
    text: 'WeChat: 添加微信',
    img: '/wechat.png' 
  },
  { 
    id: 'xiaohongshu',
    name: 'Xiaohongshu', 
    iconSvg: '<svg t="1768037040037" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9445" width="200" height="200"><path d="M1021.72444445 836.54883555V187.48757333C1021.72444445 85.61550222 938.38449778 2.27555555 836.51242667 2.27555555H187.48757333C85.61550222 2.27555555 2.27555555 85.61550222 2.27555555 187.48757333v649.06126222c0 100.85262222 81.70154667 183.57361778 182.2264889 185.1756089h654.9959111c100.48853333-1.60199111 182.22648889-84.28657778 182.2264889-185.1756089" fill="#FF2442" p-id="9446"></path><path d="M726.52117333 366.36444445h57.344v20.53461333c0 1.6384 0.80099555 2.40298667 2.36657778 2.36657777 34.00590222-1.01944889 68.26666667 0.07281778 85.81575111 34.95253334 10.44935111 20.68024889 8.30122667 52.13752889 7.71868445 76.82275556-0.03640889 1.45635555 0.65536 2.25735111 2.03889778 2.40298666 4.00497778 0.36408889 7.90072889 0.72817778 11.68725333 1.20149334 67.61130667 8.11918222 54.24924445 71.87114667 54.46769777 121.96977777 0.10922667 17.47626667-1.85685333 30.25578667-5.82542222 38.41137778-8.37404445 16.89372445-23.37450667 26.57848889-45.00138666 28.98147555H854.97173333l-21.55406222-50.02581333a1.6384 1.6384 0 0 1 0.10922667-1.52917333 1.56558222 1.56558222 0 0 1 1.31072-0.72817778l45.72956444-0.03640889c2.54862222 0 4.95160889-1.09226667 6.69923556-2.98552889a10.12167111 10.12167111 0 0 0 2.69425777-7.02691555c-0.21845333-15.29173333-0.32768-30.54705778-0.25486222-45.80238223 0-13.72615111-6.48078222-20.75306667-19.55157333-21.11715555-14.78200889-0.36408889-42.78044445-0.36408889-84.03171555 0.07281778-1.45635555 0-2.18453333 0.80099555-2.18453334 2.36657777l-0.21845333 126.81216H726.44835555l-0.18204444-127.35829333a2.25735111 2.25735111 0 0 0-2.22094222-2.33016889h-53.52106667a2.54862222 2.54862222 0 0 1-2.47580444-2.54862222l0.07281777-55.41432889c0-1.85685333 0.87381333-2.80348445 2.62144-2.80348444l52.90211556 0.10922667a2.51221333 2.51221333 0 0 0 1.821-.801 2.767 2.767 0 0 0 .728-1.893v-47.914a3.168 3.168 0 0 0-3.058-3.24l-32.659.146c-1.711 0-2.549-.91-2.549-2.694l-.109-55.706c0-1.638.728-2.439 2.367-2.439h33.824c1.456 0 2.185-.728 2.185-2.294l.364-20.462zm59.383 137.371l35.571-.073c.583 0 1.129-.255 1.529-.692.4-.437.583-.983.619-1.602l-.182-44.528c0-3.495-2.549-6.335-5.643-6.335l-28.545.073a5.352 5.352 0 0 0-4.005 1.893 6.808 6.808 0 0 0-1.638 4.551l.182 44.528c0 1.238.983 2.185 2.112 2.185zM417.956 507.74c-13.835.255-38.848 4.114-44.31-13.69-3.313-10.631 4.187-25.45 8.738-35.826 12.962-29.528 25.668-59.164 38.157-88.911.51-1.201 1.384-1.82 2.621-1.82h54.723c.473 0 .874.255 1.092.655.218.4.255.874.146 1.311l-31.676 74.019c-.728 1.711-.546 3.641.4 5.243a5.17 5.17 0 0 0 4.369 2.476h46.895c.583 0 1.092.291 1.42.765.328.51.364 1.092.109 1.638-13.544 31.567-27.052 62.915-40.523 94.044-1.347 3.095-1.93 5.389-1.711 6.845.473 3.168 2.257 4.77 5.316 4.806l29.673.182c1.711.036 2.257.874 1.566 2.549l-19.187 45.147a3.787 3.787 0 0 1-3.641 2.512c-30.147.364-51.227.364-63.242-.182-19.879-.91-24.758-18.314-17.039-36.263l27.27-63.643a1.384 1.384 0 0 0-.109-1.238 1.222 1.222 0 0 0-1.092-.619zM190.582 694.008h-21.481l-21.044-49.407a1.602 1.602 0 0 1 .109-1.493 1.456 1.456 0 0 1 1.238-.728l29.71-.073a6.954 6.954 0 0 0 6.808-7.1l.801-262.035a2.549 2.549 0 0 1 2.512-2.621h51.118c2.403 0 3.604 1.274 3.641 3.787.218 88.728.218 175.928 0 261.634-.146 35.171-16.457 59.201-53.412 58.036z" fill="#FFFFFF"></path><path d="M670.087 694.008H476.174l25.996-58.618a3.459 3.459 0 0 1 3.386-2.221l47.477.073c1.675 0 2.549-.837 2.549-2.549v-177.857c0-1.529-.728-2.294-2.185-2.294l-31.494-.036c-1.42 0-2.549-1.238-2.549-2.731v-57.053c0-.874.655-1.602 1.493-1.602h128.378c1.602 0 2.367.837 2.367 2.512l.073 56.434c0 1.638-.801 2.476-2.403 2.476h-31.749c-1.456 0-2.185.765-2.185 2.294v177.748c0 1.711.837 2.549 2.439 2.549l50.317.109c1.384 0 2.075.728 2.075 2.185L670.087 694.044zM901.029 394.654c39.613-27.234 67.502 42.198 24.103 54.104-7.063 1.966-18.314 2.075-33.715.364-1.384-.146-2.039-.91-2.039-2.367-.218-16.384-3.459-41.725 11.651-52.065zM354.204 598.799l-26.214 61.058c-2.367 5.461-4.952 5.571-7.828.437-19.297-34.88-25.85-63.351-29.637-106.714-2.913-33.678-5.425-67.356-7.609-101.107-.073-1.529.619-2.294 2.075-2.294l53.121.036c1.493 0 2.33.801 2.439 2.33 2.731 39.249 5.607 78.388 8.592 117.419.765 10.049 2.476 18.386 5.097 25.013a4.733 4.733 0 0 1-.036 3.823zM75.093 596.541v-2.512a25.705 25.705 0 0 0 4.733-11.505c3.932-43.327 7.136-86.617 9.648-129.943.109-1.347.765-2.039 2.039-2.039h54.249c.473 0 .947.218 1.311.619.328.4.51.874.473 1.384a7226.072 7226.072 0 0 1-9.576 119.676c-2.549 28.945-11.796 67.684-31.13 91.168-1.238 1.493-2.294 1.347-3.095-.473l-8.652-64.375zM445.08 694.008h-78.57l-10.012-3.969c-1.42-.546-1.82-1.529-1.165-2.949l24.649-56.434c.728-1.638 1.893-2.257 3.568-1.82 26.943 7.318 58.145 4.296 85.707 4.405 1.711.036 2.185.874 1.456 2.476l-25.632 58.254z" fill="#FFFFFF"></path></svg>', type: 'link', link: 'https://www.xiaohongshu.com/user/profile/63ea416a000000002600564f', text: '小红书: 关注我' },
  { 
    id: 'douyin',
    name: 'Douyin', 
    iconSvg: '<svg t="1768036989590" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8405" width="200" height="200"><path d="M855.52032 0H165.44032A165.696 165.696 0 0 0 0.00032 165.92v689.376a165.696 165.696 0 0 0 165.344 166.016h690.272a165.696 165.696 0 0 0 165.408-165.984V166.016A165.76 165.76 0 0 0 855.52032 0z" fill="#170B1A" p-id="8406"></path><path d="M511.42432 302.08c0.576-64.32 0-128.576 0.576-192.832h131.392c-0.576 11.328 1.152 22.72 2.88 33.6h-96.704v522.24a124.8 124.8 0 0 1-16 63.68 107.84 107.84 0 0 1-83.008 52.864 111.424 111.424 0 0 1-63.168-13.12 108.416 108.416 0 0 1-36.928-32.96c33.536 18.816 77.312 17.088 109.76-3.968A111.68 111.68 0 0 0 512.00032 638.272c-0.576-112.064-0.576-224.128-0.576-336.192z m216.768-36.992c18.176 11.392 38.656 20.48 59.712 25.024 12.544 2.88 25.024 4.032 38.08 4.032v29.568a187.36 187.36 0 0 1-97.792-58.56v-0.064z" fill="#25F4EE" p-id="8407"></path><path d="M274.75232 428.928a238.016 238.016 0 0 1 159.36-33.6v31.36c-14.72 0.576-29.376 2.272-43.84 5.12a249.44 249.44 0 0 0-97.92 43.84c-31.232 23.296-55.104 55.104-71.68 90.368a243.424 243.424 0 0 0-23.296 108.16c0 40.96 11.392 80.768 30.72 116.608 9.152 16.448 19.392 32.384 33.024 45.44a233.44 233.44 0 0 1-68.288-75.072 246.24 246.24 0 0 1-33.6-131.392 250.144 250.144 0 0 1 35.904-120 240.352 240.352 0 0 1 79.616-80.832z" fill="#25F4EE" p-id="8408"></path><path d="M549.56832 142.784h97.28c3.392 18.752 10.24 36.416 18.752 53.504 13.632 26.176 33.024 49.472 58.048 64.832 1.664 1.152 2.88 2.304 3.968 3.968a186.688 186.688 0 0 0 98.432 58.56c0.576 34.176 0 68.864 0 103.04a308.16 308.16 0 0 1-180.928-57.472c0 81.92 0 163.84 0.576 245.76 0 10.816 0.576 21.632 0 32.96a268.8 268.8 0 0 1-35.264 113.792 247.392 247.392 0 0 1-68.288 77.44 219.296 219.296 0 0 1-124.608 42.56c-22.72 0.64-45.44-0.512-67.648-5.632a243.52 243.52 0 0 1-87.04-38.08l-1.728-1.728a202.464 202.464 0 0 1-33.024-45.504 244.32 244.32 0 0 1-30.72-116.672 245.6 245.6 0 0 1 23.36-108.096c16.512-35.2 40.96-67.072 71.68-90.432a249.44 249.44 0 0 1 141.632-48.896c0.576 13.12 0 26.176 0.576 38.656v66.56a94.176 94.176 0 0 0-51.776-1.728 128.32 128.32 0 0 0-55.68 27.328c-9.824 8.448-17.952 18.688-23.936 30.144a112.16 112.16 0 0 0-11.392 63.744c2.432 21.216 11.168 41.216 25.024 57.472 9.088 11.328 21.056 19.904 33.024 27.84 9.664 13.632 22.144 25.024 36.928 33.024 19.392 10.24 41.536 14.72 63.168 13.12 34.112-2.304 65.984-23.36 83.072-52.992a124.8 124.8 0 0 0 15.936-63.68c1.152-175.232 0.576-349.312 0.576-523.392z" fill="#FFFFFF"></path></svg>', 
    type: 'link', 
    link: 'https://www.douyin.com/', 
    text: '抖音: LiuliDesign' 
  },
  { 
    id: 'email',
    name: 'Email', 
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>', 
    type: 'link', 
    link: 'mailto:1442855983@qq.com',
    text: '1442855983@qq.com' 
  }
]

// === 7. 交互逻辑 ===
const showBackToTop = ref(false)
const showModal = ref(false)
const modalImage = ref('')

const handleContactClick = (item) => {
  if (item.type === 'modal') {
    modalImage.value = item.img
    showModal.value = true
  }
}

// 平滑滚动
const scrollToContact = () => {
  const element = document.querySelector('.contact-section')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="home-container">
    
    <section class="hero-section">
      <div class="hero-left">
        <h1 class="hero-title">AI 时代的<br><span class="highlight">设计工作流与内容资产</span></h1>
        <p class="hero-desc">把 AIGC、视觉设计、产品表达和资源沉淀整合起来，<br>展示可落地、可复用、可合作的数字内容能力。</p>
        <div class="hero-actions">
          <a href="/portfolio/" class="btn primary">查看案例</a>
          <button @click="scrollToContact" class="btn secondary card-box-btn">联系我</button>
        </div>
      </div>
      <div class="hero-right">
        <div class="purple-gradient-bg"></div>
        <img class="hero-img floating" src="https://images.unsplash.com/photo-1633412803867-0f4abe186832?auto=format&fit=crop&w=800&q=80" alt="AIGC Art" />
      </div>
    </section>

    <section class="resume-bar card-box glass-effect">
      <div class="resume-content">
        <div class="resume-left">
          <div class="resume-intro">
            <h3>HI, I'M <span class="highlight-text">HAN FULI</span></h3>
            <p>设计经验 / AI 工作流探索 / 视觉内容交付</p>
          </div>
          <a href="/resume" class="btn-resume-cta-large">
            查看我的完整简历 <span class="arrow">→</span>
          </a>
        </div>

        <div class="resume-right">
          <div class="resume-stats">
            <div v-for="(stat, index) in resumeStats" :key="index" class="stat-item">
              <span class="stat-icon">{{ stat.icon }}</span>
              <span class="stat-val">{{ stat.value }}</span>
              <span class="stat-lbl">{{ stat.label }}</span>
            </div>
          </div>
          <div class="resume-skills-tags">
            <span>AI 产品图</span>
            <span>品牌视觉</span>
            <span>内容工作流</span>
            <span>资源沉淀</span>
          </div>
        </div>
      </div>
    </section>

    <div class="section-container" id="works">
      <div class="common-header">
        <span class="badge">CASES</span>
        <h3>案例与能力样本</h3>
        <p>用真实项目结构展示设计判断、AI 辅助流程和交付能力</p>
      </div>
      <div class="grid-box uniform-grid">
        <a v-for="item in selectedWorks" :key="item.id" :href="item.link" class="work-card card-box">
          <div class="img-wrap">
            <img :src="item.img" loading="lazy" />
            <div class="mask"></div>
          </div>
          <div class="info">
            <span class="cat">{{ item.category }}</span>
            <h4 class="white-text">{{ item.title }}</h4>
            <p class="eng-title">{{ item.titleEn }}</p>
          </div>
        </a>
      </div>
      <div class="btn-more-container">
        <a href="/portfolio/" class="btn-view-more">查看更多案例 →</a>
      </div>
    </div>

    <div class="section-container aigc-section">
      <div class="common-header">
        <span class="badge">WORKFLOW</span>
        <h3>AI 工作流实验室</h3>
        <p>把提示词、模型、生成、精修和交付步骤沉淀成可复用流程</p>
      </div>
      <div class="grid-box aigc-grid">
        <a v-for="item in aigcWorks" :key="item.id" :href="item.link" class="aigc-card card-box">
          <div class="img-wrap">
            <img :src="item.img" loading="lazy" />
            <div class="aigc-overlay"><span class="icon">⚡</span></div>
          </div>
          <div class="aigc-info">
            <h4 class="white-text">{{ item.title }}</h4>
            <span class="tag">{{ item.category }}</span>
          </div>
        </a>
      </div>
      <div class="btn-more-container">
        <a href="/aigc/" class="btn-view-more">查看 AI 工作流 →</a>
      </div>
    </div>

    <div class="section-container">
      <div class="common-header">
        <span class="badge">METHOD</span>
        <h3>方法论与观察</h3>
        <p>记录 AI 冲击下的设计定位、效率方法和内容资产策略</p>
      </div>
      <div class="blog-list">
        <a v-for="post in blogPosts" :key="post.id" :href="post.link" class="blog-card card-box">
          <div class="blog-left">
            <img :src="post.img" loading="lazy" />
          </div>
          <div class="blog-right">
            <div class="blog-main">
              <h4>{{ post.title }}</h4>
              <p>{{ post.desc }}</p>
            </div>
            <div class="blog-meta">
              <span class="meta-tag">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                {{ post.date }}
              </span>
              <span class="meta-tag">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                {{ post.likes }}
              </span>
              <span class="meta-tag">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                {{ post.comments }}
              </span>
            </div>
          </div>
        </a>
      </div>
      <div class="btn-more-container">
        <a href="/blog/" class="btn-view-more">查看方法论 →</a>
      </div>
    </div>

    <div class="section-container">
      <div class="common-header">
        <span class="badge">ASSETS</span>
        <h3>资源库</h3>
        <p>沉淀提示词、模型、模板和设计素材，形成持续更新的个人资产</p>
      </div>
      <div class="tools-grid">
        <div v-for="tool in tools" :key="tool.id" class="tool-card card-box">
          <div class="tool-icon">{{ tool.icon }}</div>
          <div class="tool-info">
            <h4>{{ tool.name }}</h4>
            <p>{{ tool.desc }}</p>
          </div>
          <a :href="tool.link" class="btn-download">查看</a>
        </div>
      </div>
      <div class="btn-more-container">
        <a href="/resources/" class="btn-view-more">查看资源库 →</a>
      </div>
    </div>

    <div class="section-container contact-section">
      <div class="contact-card card-box">
        <div class="contact-left">
          <h3>Let's Connect</h3>
          <p>如果你想做 AI 视觉、内容升级、网站改版或资源共创，<br>可以从这里联系我。</p>
        </div>
        <div class="contact-right">
          <div class="contact-grid">
            <a 
              v-for="(item, idx) in contactLinks" 
              :key="idx" 
              :href="item.type === 'link' ? item.link : 'javascript:;'" 
              @click="handleContactClick(item)"
              class="contact-item"
            >
              <span class="c-icon" v-html="item.iconSvg"></span>
              <span class="c-text">{{ item.text }}</span>
              <span class="c-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <button v-if="showBackToTop" @click="scrollToTop" class="back-to-top" title="回到顶部">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>
    </transition>

    <transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="showModal = false">×</button>
          <img :src="modalImage" alt="QR Code" class="modal-img" />
          <p class="modal-tip">请使用微信扫一扫</p>
        </div>
      </div>
    </transition>

  </div> 
</template>

<style scoped>
/* 全局容器 */
.home-container { 
  width: 100% !important; 
  max-width: 1400px !important; 
  margin: 0 auto; 
  padding: 0 24px 100px; 
  color: var(--vp-c-text-1); 
  box-sizing: border-box !important;
}
.section-container { margin-top: 100px; }

/* === 通用卡片样式 === */
.card-box {
  background-color: var(--vp-c-bg-soft); 
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-box:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1); }

/* === 标题通用 === */
.common-header { text-align: center; margin-bottom: 50px; }
.common-header h3 { font-size: 2.5rem; font-weight: 900; margin: 15px 0; line-height: 1.3; background: linear-gradient(to right, #7C3AED, #8B5CF6, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.badge { background: #8B5CF6; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; letter-spacing: 1px; }
.common-header p { color: var(--vp-c-text-2); font-size: 1.1rem;}

/* HERO */
.hero-section { display: flex; align-items: center; justify-content: space-between; min-height: 500px; margin-bottom: 60px; padding-top: 40px; }
.hero-left { max-width: 500px; z-index: 2; }
.hero-title { font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 20px; color: var(--vp-c-text-1); }
.hero-title .highlight { background: linear-gradient(135deg, #8B5CF6 0%, #d8b4fe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-desc { font-size: 1.2rem; margin-bottom: 30px; line-height: 1.6; color: var(--vp-c-text-2); }
.hero-actions { display: flex; gap: 16px; }
.btn { 
  padding: 10px 30px; 
  border-radius: 50px; 
  font-weight: 600; 
  text-decoration: none; 
  transition: 0.3s; 
  display: inline-block; 
  border: none; 
  cursor: pointer;
  font-size: 1.1rem; 
  line-height: 1.5;
  font-family: inherit; 
}
.btn.primary { background: #8B5CF6; color: white !important; box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4); }
.btn.primary:hover { transform: translateY(-2px); opacity: 0.9; box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6); }
.card-box-btn { background-color: var(--vp-c-bg-soft); color: var(--vp-c-text-1) !important; border: 1px solid var(--vp-c-divider); }
.card-box-btn:hover { border-color: #8B5CF6; color: #8B5CF6 !important; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

.hero-right { position: relative; width: 500px; height: 500px; display: flex; align-items: center; justify-content: center; }
.purple-gradient-bg { position: absolute; width: 100%; height: 100%; background: radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%); z-index: 0; filter: blur(20px); }
.hero-img { width: 80%; z-index: 1; animation: float 6s ease-in-out infinite; border-radius: 20px; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

/* === 简历板块 === */
.resume-bar { 
  margin-bottom: 60px; 
  padding: 70px 50px; 
  background-color: var(--vp-c-bg-soft); 
  border: 1px solid var(--vp-c-divider);
  border-top: 1px solid rgba(139, 92, 246, 0.5); 
  box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.1); 
  position: relative;
  overflow: hidden;
}
.resume-bar::before {
  content: "";
  position: absolute; top: -50%; right: -20%; width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
  z-index: 0; pointer-events: none;
}
.resume-bar::after {
  content: "";
  position: absolute; bottom: 0; left: 0; width: 100%; height: 30%;
  background-image: linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 0; pointer-events: none;
}
.resume-content { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 40px; width: 100%; position: relative; z-index: 1; }
.resume-left { flex: 1.2; }
.resume-intro h3 { font-size: 2.2rem; margin: 0 0 10px; font-weight: 800; color: var(--vp-c-text-1); letter-spacing: 1px; }
.highlight-text { color: #8B5CF6; }
.resume-intro p { margin: 0 0 30px; color: var(--vp-c-text-2); font-size: 1.1rem; }
.btn-resume-cta-large {
  display: inline-flex; align-items: center; gap: 10px;
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white !important;
  padding: 16px 40px; 
  border-radius: 50px;
  font-weight: 700; 
  font-size: 1.1rem;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25); 
  transition: all 0.3s ease;
}
.btn-resume-cta-large:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 8px 20px rgba(139, 92, 246, 0.35); }
.arrow { transition: transform 0.3s; }
.btn-resume-cta-large:hover .arrow { transform: translateX(5px); }
.resume-right { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 30px; }
.resume-stats { display: flex; gap: 50px; text-align: center; }
.stat-item { display: flex; flex-direction: column; align-items: center; }
.stat-icon { font-size: 1.5rem; margin-bottom: 5px; opacity: 0.8; }
.stat-val { font-size: 3rem; font-weight: 800; background: linear-gradient(to bottom, #8B5CF6, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
.stat-lbl { font-size: 0.9rem; text-transform: uppercase; color: var(--vp-c-text-2); margin-top: 10px; font-weight: 600; letter-spacing: 1px; }
.resume-skills-tags { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.resume-skills-tags span { font-size: 0.8rem; padding: 6px 14px; background: rgba(139, 92, 246, 0.08); border-radius: 20px; border: 1px solid rgba(139, 92, 246, 0.2); color: var(--vp-c-text-2); }

/* 网格布局 */
.uniform-grid, .aigc-grid, .tools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.work-card, .aigc-card { position: relative; display: flex; flex-direction: column; text-decoration: none !important; color: inherit; aspect-ratio: 4 / 3; }
.work-card:hover, .aigc-card:hover { border-color: #8B5CF6 !important; }
.img-wrap { width: 100%; height: 100%; position: relative; overflow: hidden; background: #333; } 
.img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.work-card:hover img, .aigc-card:hover img { transform: scale(1.05); }
.mask, .aigc-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); opacity: 0.6; }
.info, .aigc-info { position: absolute; bottom: 0; left: 0; width: 100%; padding: 24px; z-index: 2; }
.white-text { color: white !important; margin: 5px 0 0; font-size: 1.4rem; }
.cat, .tag { font-size: 12px; color: #d8b4fe; font-weight: 700; letter-spacing: 1px; }

/* 博客列表 */
.blog-list { display: flex; flex-direction: column; gap: 24px; }
.blog-card { display: flex; height: 280px; text-decoration: none !important; color: inherit; }
.blog-card:hover { border-color: #8B5CF6 !important; }
.blog-left { width: 40%; overflow: hidden; }
.blog-left img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.blog-card:hover .blog-left img { transform: scale(1.05); }
.blog-right { width: 60%; padding: 40px 30px; display: flex; flex-direction: column; justify-content: space-between; }
.blog-card:hover .blog-main h4 { color: #8B5CF6; transition: 0.3s; } 
.blog-main h4 { margin: 0 0 15px; font-size: 1.5rem; font-weight: 700; color: var(--vp-c-text-1); }
.blog-main p { margin: 0; font-size: 1rem; color: var(--vp-c-text-2); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.meta-tag { background: var(--vp-c-bg); padding: 6px 12px; border-radius: 8px; border: 1px solid var(--vp-c-divider); font-size: 0.85rem; display: inline-flex; align-items: center; gap: 5px; margin-right: 10px; color: var(--vp-c-text-2); }

/* 资源卡片 */
.tool-card { padding: 30px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 15px; }
.tool-icon { font-size: 2rem; margin-bottom: 5px; }
.btn-download { width: 100%; padding: 10px 0; border-radius: 8px; background: #8B5CF6; color: white !important; text-decoration: none; margin-top: 15px; display: block; font-weight: 600; }

/* View More 按钮容器 */
.btn-more-container {
  text-align: center;
  margin-top: 40px;
}
.btn-view-more {
  display: inline-block;
  padding: 12px 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  background-color: var(--vp-c-bg-soft);
}
.btn-view-more:hover {
  border-color: #8B5CF6;
  color: #8B5CF6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* 联系我 */
.contact-card { display: flex; align-items: center; justify-content: space-between; padding: 60px 50px; }
.contact-left h3 { font-size: 2rem; font-weight: 800; margin-bottom: 15px; }
.contact-right { width: 50%; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.contact-item { 
  display: flex; align-items: center; gap: 10px; padding: 15px 20px; 
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); 
  border-radius: 12px; text-decoration: none !important; color: var(--vp-c-text-1); cursor: pointer; 
  transition: 0.2s; white-space: nowrap; 
}
.contact-item:hover { border-color: #8B5CF6; transform: translateX(5px); }
.c-icon { width: 24px; height: 24px; display: block; flex-shrink: 0; }
:deep(.c-icon svg) { width: 100%; height: 100%; }
.c-text { font-weight: 600; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; }
.c-arrow { color: #8B5CF6; opacity: 0; transition: opacity 0.2s; }
.contact-item:hover .c-arrow { opacity: 1; }

/* 回到顶部 */
.back-to-top { position: fixed; bottom: 40px; right: 40px; width: 50px; height: 50px; border-radius: 50%; background: #8B5CF6; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4); transition: all 0.3s ease; z-index: 100; }
.back-to-top:hover { background-color: #7C3AED; transform: translateY(-3px); box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 弹窗 */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 999; }
.modal-content { background: var(--vp-c-bg); padding: 30px; border-radius: 20px; position: relative; text-align: center; max-width: 90%; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.modal-img { max-width: 300px; border-radius: 12px; margin-bottom: 15px; }
.modal-close { position: absolute; top: 10px; right: 15px; font-size: 24px; cursor: pointer; background: none; border: none; color: var(--vp-c-text-2); }
.modal-tip { color: var(--vp-c-text-2); font-size: 0.9rem; margin: 0; }

/* =================================================================
   📱 移动端强制适配 (Mobile Force Fix) - 使用 !important 锁死样式
   ================================================================= */
@media (max-width: 768px) {
  /* 1. 容器与间距 (调整到 16px 以获得更好的视觉平衡) */
  .home-container { 
    padding: 0 16px 80px !important; 
    width: 100% !important; 
    overflow-x: hidden !important;
  }
  .section-container { margin-top: 60px !important; }

  /* 2. Hero 区域：字号强制缩小 */
  .hero-section { flex-direction: column !important; text-align: center !important; padding-top: 20px !important; min-height: auto !important; margin-bottom: 40px !important; }
  .hero-title { font-size: 2rem !important; line-height: 1.2 !important; word-break: break-word !important; margin-bottom: 15px !important; }
  .hero-desc { font-size: 1rem !important; padding: 0 !important; }
  .hero-right { width: 100% !important; height: 280px !important; margin-top: 30px !important; }
  .btn { padding: 10px 24px !important; font-size: 0.95rem !important; }

  /* 3. 简历板块 */
  .resume-bar { padding: 40px 24px !important; flex-direction: column !important; align-items: center !important; text-align: center !important; height: auto !important; }
  .resume-content { flex-direction: column !important; gap: 30px !important; }
  .resume-left { width: 100% !important; }
  .resume-right { width: 100% !important; justify-content: center !important; }
  .resume-intro h3 { font-size: 1.6rem !important; }
  .resume-intro p { font-size: 0.95rem !important; }
  .resume-stats { gap: 20px !important; flex-wrap: wrap !important; justify-content: center !important; }
  .stat-val { font-size: 2.2rem !important; }
  .stat-lbl { font-size: 0.8rem !important; }
  .btn-resume-cta-large { width: 100% !important; box-sizing: border-box !important; padding: 14px !important; font-size: 1rem !important; }

  /* 4. 通用标题 */
  .common-header h3 { font-size: 1.6rem !important; margin: 10px 0 !important; }
  .common-header p { font-size: 1rem !important; padding: 0 !important; }

  /* 5. 卡片单列 */
  .uniform-grid, .aigc-grid, .tools-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
  
  /* 6. 博客卡片 */
  .blog-card { flex-direction: column !important; height: auto !important; }
  .blog-left { width: 100% !important; height: 180px !important; }
  .blog-right { width: 100% !important; padding: 24px !important; }
  .blog-main h4 { font-size: 1.2rem !important; }

  /* 7. 联系我板块 */
  .contact-card { padding: 40px 24px !important; flex-direction: column !important; text-align: center !important; gap: 30px !important; }
  .contact-right { width: 100% !important; }
  .contact-grid { grid-template-columns: 1fr !important; width: 100% !important; }
  .contact-item { width: 100% !important; padding: 12px !important; }
  .contact-left h3 { font-size: 1.6rem !important; }

  /* 8. 按钮微调 */
  .back-to-top { bottom: 20px !important; right: 20px !important; width: 45px !important; height: 45px !important; }
  
  /* 9. 强制限制 SVG 宽度，防止乱码 */
  svg { max-width: 24px !important; max-height: 24px !important; }
}
</style>
