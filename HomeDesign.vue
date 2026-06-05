<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { withBase } from 'vitepress'
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

const pageLink = (path) => withBase(path)

const strategyModes = [
  {
    id: 'visual',
    label: 'AI 视觉',
    title: '从产品卖点到可发布画面',
    desc: '把产品定位、参考风格和生成控制整合起来，快速产出主图、场景图和社媒素材。',
    output: '产品图 / KV / 详情页素材'
  },
  {
    id: 'workflow',
    label: '工作流',
    title: '把一次灵感变成可复用流程',
    desc: '沉淀提示词、模型参数、参考图、筛选标准和复盘记录，让下一次交付更快。',
    output: 'Prompt / LoRA / ComfyUI / SOP'
  },
  {
    id: 'asset',
    label: '资源库',
    title: '让个人能力变成长期资产',
    desc: '把案例、模板、工具和方法论按场景归档，形成可以持续更新的个人内容系统。',
    output: '案例库 / 模板库 / 方法论'
  }
]

const workflowSteps = [
  { id: 'brief', label: 'Brief', title: '拆需求', desc: '明确目标、受众、渠道、限制条件和可交付物。', signal: '01' },
  { id: 'style', label: 'Style', title: '定风格', desc: '建立参考图、关键词、构图方向和视觉禁区。', signal: '02' },
  { id: 'generate', label: 'Generate', title: '批生成', desc: '用模型和参数组合快速拉开方案宽度。', signal: '03' },
  { id: 'refine', label: 'Refine', title: '精修', desc: '做局部重绘、排版、光影统一和商业化细节。', signal: '04' },
  { id: 'ship', label: 'Ship', title: '交付', desc: '输出物料、复盘过程，并沉淀为可复用资源。', signal: '05' }
]

const caseFilters = [
  { id: 'all', label: '全部' },
  { id: '品牌视觉', label: '品牌' },
  { id: '产品表达', label: '产品' },
  { id: '内容工作流', label: '流程' }
]

const activeMode = ref(strategyModes[0].id)
const activeStep = ref(workflowSteps[0].id)
const activeFilter = ref(caseFilters[0].id)
const cursorX = ref(50)
const cursorY = ref(50)

const activeModeData = computed(() => strategyModes.find(item => item.id === activeMode.value) || strategyModes[0])
const activeStepData = computed(() => workflowSteps.find(item => item.id === activeStep.value) || workflowSteps[0])
const filteredWorks = computed(() => {
  if (activeFilter.value === 'all') return selectedWorks.value
  return selectedWorks.value.filter(work => work.category === activeFilter.value)
})
const heroStyle = computed(() => ({
  '--mx': `${cursorX.value}%`,
  '--my': `${cursorY.value}%`
}))

const updateHeroPointer = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  cursorX.value = Math.round(((event.clientX - rect.left) / rect.width) * 100)
  cursorY.value = Math.round(((event.clientY - rect.top) / rect.height) * 100)
}

const resetHeroPointer = () => {
  cursorX.value = 50
  cursorY.value = 50
}

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
    modalImage.value = pageLink(item.img)
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
    <section
      class="hero-section"
      :style="heroStyle"
      @mousemove="updateHeroPointer"
      @mouseleave="resetHeroPointer"
    >
      <div class="hero-copy">
        <span class="eyebrow">HAN FULI / AI DESIGN SYSTEM</span>
        <h1 class="hero-title">把 AI 设计能力<br><span>变成可交互的网站资产</span></h1>
        <p class="hero-desc">
          用案例、工作流和资源库组织个人能力，让访客可以探索你能解决什么、怎么解决、有哪些可复用成果。
        </p>
        <div class="hero-actions">
          <a :href="pageLink('/portfolio/')" class="btn primary">查看案例</a>
          <a :href="pageLink('/aigc/')" class="btn secondary">AI 工作流</a>
          <button @click="scrollToContact" class="icon-btn" title="联系我" aria-label="联系我">↘</button>
        </div>
        <div class="mode-switch" role="tablist" aria-label="能力方向">
          <button
            v-for="mode in strategyModes"
            :key="mode.id"
            class="mode-button"
            :class="{ active: activeMode === mode.id }"
            type="button"
            @click="activeMode = mode.id"
          >
            {{ mode.label }}
          </button>
        </div>
      </div>

      <div class="hero-console">
        <div class="console-topline">
          <span>LIVE BRIEF</span>
          <span>{{ activeModeData.output }}</span>
        </div>
        <div class="console-stage">
          <div class="stage-image">
            <img :src="selectedWorks[0]?.img" alt="AI design preview" />
          </div>
          <div class="stage-panel">
            <span class="panel-kicker">{{ activeModeData.label }}</span>
            <h2>{{ activeModeData.title }}</h2>
            <p>{{ activeModeData.desc }}</p>
          </div>
          <div class="signal-card signal-a">
            <b>120+</b>
            <span>交付经验</span>
          </div>
          <div class="signal-card signal-b">
            <b>4</b>
            <span>工作流方向</span>
          </div>
        </div>
        <div class="console-feed">
          <span v-for="step in workflowSteps" :key="step.id">{{ step.label }}</span>
        </div>
      </div>
    </section>

    <section class="command-strip">
      <a :href="pageLink('/resume')" class="profile-link">
        <span>HAN FULI</span>
        <strong>设计经验 / AI 工作流探索 / 视觉内容交付</strong>
      </a>
      <div class="resume-stats">
        <div v-for="(stat, index) in resumeStats" :key="index" class="stat-item">
          <span class="stat-val">{{ stat.value }}</span>
          <span class="stat-lbl">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <section class="section-container" id="works">
      <div class="common-header">
        <span class="badge">CASES</span>
        <h3>案例与能力样本</h3>
        <p>用真实项目结构展示设计判断、AI 辅助流程和交付能力</p>
      </div>
      <div class="filter-row" role="tablist" aria-label="案例筛选">
        <button
          v-for="filter in caseFilters"
          :key="filter.id"
          type="button"
          class="filter-button"
          :class="{ active: activeFilter === filter.id }"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>
      <div class="work-grid">
        <a v-for="item in filteredWorks" :key="item.id" :href="pageLink(item.link)" class="work-card">
          <div class="img-wrap">
            <img :src="item.img" loading="lazy" />
          </div>
          <div class="info">
            <span class="cat">{{ item.category }}</span>
            <h4>{{ item.title }}</h4>
            <p class="eng-title">{{ item.titleEn }}</p>
          </div>
        </a>
      </div>
      <div class="btn-more-container">
        <a :href="pageLink('/portfolio/')" class="btn-view-more">查看更多案例 →</a>
      </div>
    </section>

    <section class="section-container workflow-section">
      <div class="common-header">
        <span class="badge">WORKFLOW</span>
        <h3>AI 工作流实验室</h3>
        <p>把提示词、模型、生成、精修和交付步骤沉淀成可复用流程</p>
      </div>
      <div class="workflow-board">
        <div class="workflow-nav">
          <button
            v-for="step in workflowSteps"
            :key="step.id"
            type="button"
            class="workflow-step"
            :class="{ active: activeStep === step.id }"
            @click="activeStep = step.id"
          >
            <span>{{ step.signal }}</span>
            <b>{{ step.label }}</b>
          </button>
        </div>
        <div class="workflow-detail">
          <span class="detail-index">{{ activeStepData.signal }}</span>
          <h4>{{ activeStepData.title }}</h4>
          <p>{{ activeStepData.desc }}</p>
          <div class="aigc-mini-grid">
            <a v-for="item in aigcWorks.slice(0, 3)" :key="item.id" :href="pageLink(item.link)" class="mini-card">
              <img :src="item.img" :alt="item.title" loading="lazy" />
              <span>{{ item.title }}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="btn-more-container">
        <a :href="pageLink('/aigc/')" class="btn-view-more">查看 AI 工作流 →</a>
      </div>
    </section>

    <section class="section-container">
      <div class="common-header">
        <span class="badge">METHOD</span>
        <h3>方法论与观察</h3>
        <p>记录 AI 冲击下的设计定位、效率方法和内容资产策略</p>
      </div>
      <div class="blog-list">
        <a v-for="post in blogPosts" :key="post.id" :href="pageLink(post.link)" class="blog-card card-box">
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
        <a :href="pageLink('/blog/')" class="btn-view-more">查看方法论 →</a>
      </div>
    </section>

    <section class="section-container">
      <div class="common-header">
        <span class="badge">ASSETS</span>
        <h3>资源库</h3>
        <p>沉淀提示词、模型、模板和设计素材，形成持续更新的个人资产</p>
      </div>
      <div class="tools-grid">
        <a v-for="tool in tools" :key="tool.id" :href="pageLink(tool.link)" class="tool-card">
          <div class="tool-icon">{{ tool.icon }}</div>
          <div class="tool-info">
            <h4>{{ tool.name }}</h4>
            <p>{{ tool.desc }}</p>
          </div>
          <span class="tool-arrow">→</span>
        </a>
      </div>
      <div class="btn-more-container">
        <a :href="pageLink('/resources/')" class="btn-view-more">查看资源库 →</a>
      </div>
    </section>

    <section class="section-container contact-section">
      <div class="contact-card">
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
    </section>

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
.home-container {
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 24px 100px;
  box-sizing: border-box;
  color: var(--vp-c-text-1);
}

.section-container {
  margin-top: 96px;
}

.hero-section {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(420px, 1.08fr);
  gap: 36px;
  min-height: 620px;
  padding: 58px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.26);
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(0deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(17, 24, 39, 0.88) 48%, rgba(11, 18, 32, 0.98));
  background-size: 34px 34px, 34px 34px, auto;
  isolation: isolate;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(115deg, transparent 0 30%, rgba(45, 212, 191, 0.16) calc(var(--mx) - 12%), transparent var(--mx), rgba(251, 191, 36, 0.13) calc(var(--mx) + 16%), transparent 76%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 42%);
  opacity: 0.95;
  transition: opacity 0.25s ease;
  z-index: -1;
}

.hero-copy {
  align-self: center;
  max-width: 600px;
}

.eyebrow,
.badge,
.panel-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 26px;
  padding: 4px 10px;
  border: 1px solid rgba(45, 212, 191, 0.36);
  border-radius: 4px;
  color: #67e8f9;
  background: rgba(8, 47, 73, 0.34);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.hero-title {
  margin: 24px 0 18px;
  color: #f8fafc;
  font-size: clamp(42px, 5vw, 74px);
  line-height: 1.02;
  font-weight: 900;
}

.hero-title span {
  color: #facc15;
}

.hero-desc {
  max-width: 560px;
  margin: 0 0 28px;
  color: rgba(226, 232, 240, 0.78);
  font-size: 18px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.btn,
.btn-view-more,
.icon-btn,
.mode-button,
.filter-button,
.workflow-step {
  font-family: inherit;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 10px 18px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 6px;
  text-decoration: none !important;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.2;
  transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
}

.btn.primary {
  color: #0f172a !important;
  background: #facc15;
  border-color: #facc15;
}

.btn.secondary {
  color: #e2e8f0 !important;
  background: rgba(15, 23, 42, 0.64);
}

.btn:hover,
.icon-btn:hover,
.btn-view-more:hover {
  transform: translateY(-2px);
  border-color: #22d3ee;
}

.icon-btn {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(45, 212, 191, 0.36);
  border-radius: 6px;
  color: #67e8f9;
  background: rgba(15, 23, 42, 0.72);
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
  transition: transform 0.22s ease, border-color 0.22s ease;
}

.mode-switch,
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
}

.mode-button,
.filter-button {
  min-height: 38px;
  padding: 8px 14px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 4px;
  color: rgba(226, 232, 240, 0.78);
  background: rgba(15, 23, 42, 0.54);
  cursor: pointer;
  font-weight: 800;
  transition: color 0.22s ease, background 0.22s ease, border-color 0.22s ease;
}

.mode-button.active,
.filter-button.active,
.workflow-step.active {
  color: #0f172a;
  border-color: #facc15;
  background: #facc15;
}

.hero-console {
  align-self: center;
  min-width: 0;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.72);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(14px);
  transform: perspective(1000px) rotateX(calc((var(--my) - 50) * -0.04deg)) rotateY(calc((var(--mx) - 50) * 0.04deg));
  transition: transform 0.18s ease-out;
}

.console-topline,
.console-feed {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  color: rgba(226, 232, 240, 0.72);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(148, 163, 184, 0.22);
}

.console-feed {
  flex-wrap: wrap;
  border-top: 1px solid rgba(148, 163, 184, 0.22);
  border-bottom: 0;
}

.console-feed span {
  color: #86efac;
}

.console-stage {
  position: relative;
  min-height: 430px;
  padding: 18px;
}

.stage-image {
  height: 390px;
  overflow: hidden;
  border-radius: 6px;
  background: #020617;
}

.stage-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.12) contrast(1.08);
  transform: scale(1.04);
}

.stage-panel {
  position: absolute;
  left: 38px;
  right: 38px;
  bottom: 38px;
  padding: 22px;
  border: 1px solid rgba(226, 232, 240, 0.22);
  border-radius: 8px;
  background: rgba(2, 6, 23, 0.78);
  backdrop-filter: blur(12px);
}

.stage-panel h2 {
  margin: 12px 0 8px;
  color: #f8fafc;
  font-size: clamp(22px, 3vw, 34px);
}

.stage-panel p {
  margin: 0;
  color: rgba(226, 232, 240, 0.78);
  line-height: 1.7;
}

.signal-card {
  position: absolute;
  display: grid;
  gap: 2px;
  min-width: 112px;
  padding: 12px;
  border: 1px solid rgba(45, 212, 191, 0.35);
  border-radius: 6px;
  color: #e0f2fe;
  background: rgba(8, 47, 73, 0.68);
}

.signal-card b {
  font-size: 26px;
  line-height: 1;
  color: #facc15;
}

.signal-card span {
  font-size: 12px;
  font-weight: 800;
}

.signal-a {
  top: 34px;
  right: 34px;
}

.signal-b {
  top: 132px;
  left: 34px;
}

.command-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 28px;
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.profile-link {
  display: grid;
  gap: 4px;
  color: inherit;
  text-decoration: none !important;
}

.profile-link span {
  color: #0891b2;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.profile-link strong {
  font-size: 18px;
}

.resume-stats {
  display: flex;
  gap: 22px;
}

.stat-item {
  display: grid;
  min-width: 110px;
  gap: 4px;
  padding-left: 18px;
  border-left: 1px solid var(--vp-c-divider);
}

.stat-val {
  color: #0f766e;
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
}

.stat-lbl {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 800;
}

.common-header {
  max-width: 760px;
  margin: 0 auto 34px;
  text-align: center;
}

.common-header h3 {
  margin: 14px 0 10px;
  color: var(--vp-c-text-1);
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.15;
  font-weight: 900;
}

.common-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 17px;
  line-height: 1.8;
}

.work-grid,
.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.work-card {
  position: relative;
  display: grid;
  min-height: 330px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: inherit;
  text-decoration: none !important;
  background: var(--vp-c-bg-soft);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.work-card:hover,
.blog-card:hover,
.tool-card:hover,
.contact-item:hover,
.mini-card:hover {
  transform: translateY(-4px);
  border-color: #0891b2;
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.12);
}

.img-wrap {
  height: 210px;
  overflow: hidden;
  background: #111827;
}

.img-wrap img,
.blog-left img,
.mini-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.work-card:hover .img-wrap img,
.blog-card:hover .blog-left img,
.mini-card:hover img {
  transform: scale(1.06);
}

.info {
  display: grid;
  gap: 8px;
  padding: 20px;
}

.cat,
.tag {
  color: #0f766e;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.04em;
}

.info h4,
.blog-main h4,
.tool-info h4 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 20px;
  line-height: 1.35;
}

.eng-title,
.tool-info p,
.blog-main p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.workflow-board {
  display: grid;
  grid-template-columns: minmax(220px, 0.36fr) minmax(0, 1fr);
  gap: 18px;
}

.workflow-nav {
  display: grid;
  gap: 10px;
}

.workflow-step {
  display: grid;
  grid-template-columns: 42px 1fr;
  align-items: center;
  min-height: 64px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  text-align: left;
  transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
}

.workflow-step span {
  color: #0891b2;
  font-size: 13px;
  font-weight: 900;
}

.workflow-step.active span {
  color: #0f172a;
}

.workflow-detail {
  min-height: 396px;
  padding: 34px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(20, 184, 166, 0.08) 1px, transparent 1px),
    linear-gradient(0deg, rgba(20, 184, 166, 0.08) 1px, transparent 1px),
    var(--vp-c-bg-soft);
  background-size: 28px 28px, 28px 28px, auto;
}

.detail-index {
  color: #ca8a04;
  font-size: 44px;
  font-weight: 900;
}

.workflow-detail h4 {
  margin: 10px 0 10px;
  font-size: clamp(28px, 4vw, 46px);
  line-height: 1.1;
}

.workflow-detail p {
  max-width: 720px;
  margin: 0 0 24px;
  color: var(--vp-c-text-2);
  font-size: 17px;
  line-height: 1.8;
}

.aigc-mini-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.mini-card {
  display: grid;
  gap: 10px;
  min-height: 170px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: inherit;
  text-decoration: none !important;
  background: var(--vp-c-bg);
  transition: transform 0.22s ease, border-color 0.22s ease;
}

.mini-card img {
  height: 110px;
  border-radius: 6px;
}

.mini-card span {
  font-size: 13px;
  font-weight: 800;
}

.blog-list {
  display: grid;
  gap: 16px;
}

.blog-card {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  min-height: 230px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: inherit;
  text-decoration: none !important;
  background: var(--vp-c-bg-soft);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.blog-left {
  min-height: 230px;
  overflow: hidden;
}

.blog-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 26px;
}

.blog-main h4 {
  margin-bottom: 10px;
  font-size: 24px;
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 5px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 700;
}

.tool-card {
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr 24px;
  gap: 16px;
  align-items: center;
  min-height: 132px;
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: inherit;
  text-decoration: none !important;
  background: var(--vp-c-bg-soft);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.tool-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 24px;
}

.tool-arrow {
  color: #0891b2;
  font-weight: 900;
  transition: transform 0.22s ease;
}

.tool-card:hover .tool-arrow {
  transform: translateX(4px);
}

.btn-more-container {
  margin-top: 34px;
  text-align: center;
}

.btn-view-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 9px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  font-weight: 800;
  transition: transform 0.22s ease, border-color 0.22s ease;
}

.contact-card {
  display: grid;
  grid-template-columns: 0.8fr 1fr;
  gap: 28px;
  align-items: center;
  padding: 38px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(250, 204, 21, 0.08)), var(--vp-c-bg-soft);
}

.contact-left h3 {
  margin: 0 0 12px;
  font-size: clamp(28px, 4vw, 44px);
}

.contact-left p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  min-height: 54px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  text-decoration: none !important;
  transition: transform 0.22s ease, border-color 0.22s ease;
}

.c-icon {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}

:deep(.c-icon svg) {
  width: 100%;
  height: 100%;
}

.c-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 800;
}

.c-arrow {
  margin-left: auto;
  color: #0891b2;
}

.back-to-top {
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 100;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(45, 212, 191, 0.4);
  border-radius: 6px;
  color: #ecfeff;
  background: #0f766e;
  cursor: pointer;
  box-shadow: 0 16px 34px rgba(15, 118, 110, 0.28);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  max-width: 90%;
  padding: 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  text-align: center;
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.3);
}

.modal-img {
  max-width: 300px;
  border-radius: 8px;
  margin-bottom: 14px;
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 12px;
  border: 0;
  background: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 24px;
}

.modal-tip {
  margin: 0;
  color: var(--vp-c-text-2);
}

@media (max-width: 1080px) {
  .hero-section,
  .workflow-board,
  .contact-card {
    grid-template-columns: 1fr;
  }

  .hero-section {
    min-height: auto;
    padding: 36px;
  }

  .hero-console {
    transform: none;
  }

  .work-grid,
  .tools-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .home-container {
    padding: 0 16px 80px;
    overflow-x: hidden;
  }

  .section-container {
    margin-top: 64px;
  }

  .hero-section {
    padding: 24px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-desc {
    font-size: 15px;
  }

  .mode-switch,
  .hero-actions,
  .filter-row {
    width: 100%;
  }

  .mode-button,
  .filter-button,
  .btn {
    flex: 1 1 auto;
  }

  .console-stage {
    min-height: 360px;
    padding: 12px;
  }

  .stage-image {
    height: 330px;
  }

  .stage-panel {
    left: 22px;
    right: 22px;
    bottom: 22px;
    padding: 16px;
  }

  .signal-card {
    display: none;
  }

  .command-strip,
  .resume-stats {
    flex-direction: column;
    align-items: stretch;
  }

  .stat-item {
    border-left: 0;
    border-top: 1px solid var(--vp-c-divider);
    padding: 12px 0 0;
  }

  .work-grid,
  .tools-grid,
  .aigc-mini-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .blog-card {
    grid-template-columns: 1fr;
  }

  .blog-left {
    min-height: 190px;
  }

  .workflow-detail {
    padding: 22px;
  }

  .contact-card {
    padding: 24px;
  }

  .back-to-top {
    right: 18px;
    bottom: 18px;
  }

  .modal-img {
    max-width: 240px;
  }
}
</style>
