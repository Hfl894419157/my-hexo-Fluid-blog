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
const workflowPaused = ref(false)
const cursorX = ref(50)
const cursorY = ref(50)
const scrollProgress = ref(0)
const workflowWrap = ref(null)
const workflowTrack = ref(null)
let storyObserver = null

const activeModeData = computed(() => strategyModes.find(item => item.id === activeMode.value) || strategyModes[0])
const activeStepData = computed(() => workflowSteps.find(item => item.id === activeStep.value) || workflowSteps[0])
const filteredWorks = computed(() => {
  if (activeFilter.value === 'all') return selectedWorks.value
  return selectedWorks.value.filter(work => work.category === activeFilter.value)
})
const heroPreviewWorks = computed(() => selectedWorks.value.slice(0, 2))
const heroStyle = computed(() => ({
  '--mx': `${cursorX.value}%`,
  '--my': `${cursorY.value}%`,
  '--scroll': scrollProgress.value,
  '--hero-copy-y': `${Math.round(scrollProgress.value * -8)}px`,
  '--ambient-y': `${Math.round(scrollProgress.value * 14)}px`,
  '--scan-x': `${Math.round((cursorX.value - 50) * 0.16)}px`,
  '--scan-opacity': 0.1 + scrollProgress.value * 0.12,
  '--ambient-opacity': 0.74 + scrollProgress.value * 0.12,
  '--reactor-scale': 0.12 + scrollProgress.value * 0.88,
  '--proof-glide': `${Math.round(scrollProgress.value * 80 - 40)}px`,
  '--proof-opacity': 0.2 + scrollProgress.value * 0.44
}))

let heroPointerRaf = null

const updateHeroPointer = (event) => {
  const target = event.currentTarget
  const clientX = event.clientX
  const clientY = event.clientY

  if (heroPointerRaf) return

  heroPointerRaf = requestAnimationFrame(() => {
    const rect = target.getBoundingClientRect()
    cursorX.value = Math.round(((clientX - rect.left) / rect.width) * 100)
    cursorY.value = Math.round(((clientY - rect.top) / rect.height) * 100)
    heroPointerRaf = null
  })
}

const resetHeroPointer = () => {
  if (heroPointerRaf) {
    cancelAnimationFrame(heroPointerRaf)
    heroPointerRaf = null
  }
  cursorX.value = 50
  cursorY.value = 50
}

const metricCards = [
  { label: '项目交付经验', value: 120, suffix: '+', desc: '从品牌视觉、产品图到内容资产的完整交付经验' },
  { label: '设计与内容经验', value: 8, suffix: '+', desc: '把设计判断、内容组织和 AI 工具整合成稳定流程' },
  { label: 'AI 工作流方向', value: 4, suffix: '', desc: '产品图、品牌视觉、内容生产、资源沉淀' },
  { label: '精选案例资产', value: 18, suffix: '+', desc: '持续沉淀可展示、可复用、可迭代的案例和资源' }
]

const metricValues = ref(metricCards.map(() => 0))
let metricObserver = null

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
  const viewport = Math.max(window.innerHeight, 1)
  scrollProgress.value = Math.min(Math.max(window.scrollY / (viewport * 1.15), 0), 1)
  
  if (workflowWrap.value && workflowTrack.value) {
    const rect = workflowWrap.value.getBoundingClientRect()
    const vh = window.innerHeight
    const start = vh * 0.82
    const end = -rect.height * 0.35
    const local = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))
    const maxX = Math.max(0, workflowTrack.value.scrollWidth - workflowWrap.value.clientWidth + 60)
    workflowTrack.value.style.setProperty('--workflow-x', `${-maxX * local}px`)
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const animateMetric = (index) => {
  const target = metricCards[index]?.value || 0
  const duration = 980
  const start = performance.now()

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    metricValues.value[index] = Math.round(target * eased)

    if (progress < 1) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)
}

const initMetricCards = () => {
  const cards = document.querySelectorAll('[data-metric-index]')

  if (!('IntersectionObserver' in window)) {
    cards.forEach((card) => animateMetric(Number(card.dataset.metricIndex)))
    return
  }

  metricObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateMetric(Number(entry.target.dataset.metricIndex))
        metricObserver?.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.35
  })

  cards.forEach(card => metricObserver.observe(card))
}

const initStorySections = () => {
  const sections = document.querySelectorAll('[data-story-section]')

  if (!('IntersectionObserver' in window)) {
    sections.forEach(section => section.classList.add('is-visible'))
    return
  }

  storyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        storyObserver?.unobserve(entry.target)
      }
    })
  }, {
    rootMargin: '0px 0px -14% 0px',
    threshold: 0.16
  })

  sections.forEach((section, index) => {
    section.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 70}ms`)
    storyObserver.observe(section)
  })
}

onMounted(() => {
  handleScroll()
  initStorySections()
  initMetricCards()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (heroPointerRaf) {
    cancelAnimationFrame(heroPointerRaf)
  }
  window.removeEventListener('scroll', handleScroll)
  storyObserver?.disconnect()
  metricObserver?.disconnect()
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
        <span class="eyebrow">韩福利 / AI 设计系统</span>
        <h1 class="hero-title">把 AI 设计能力<br><span>变成可交互的网站资产</span></h1>
        <p class="hero-desc">
          用案例、工作流和资源库组织个人能力，让访客可以探索你能解决什么、怎么解决、有哪些可复用成果。
        </p>
      </div>

      <div class="hero-console studio showcase">
        <div class="showcase-badge">
          <strong>120+</strong>
          <span>项目经验</span>
        </div>
        <a
          v-for="(work, index) in heroPreviewWorks"
          :key="work.id"
          :href="pageLink(work.link)"
          class="showcase-card"
          :class="`showcase-card-${index + 1}`"
        >
          <img :src="work.img" :alt="work.title" loading="eager" />
          <div class="showcase-copy">
            <span>{{ work.category }}</span>
            <h3>{{ work.title }}</h3>
            <p>{{ work.desc }}</p>
          </div>
        </a>
      </div>
    </section>

    <div class="marquee">
      <div class="marquee-heading">
        <h2>把 AI 设计能力沉淀成可复用资产</h2>
        <p>从视觉判断、生成控制、精修交付到资源沉淀，让每一次项目都能继续复利。</p>
      </div>
      <div class="marquee-track">
        <span>主图视觉系统</span><span>工业应用场景</span><span>AI 提示词库</span><span>详情页转化策略</span><span>3D 渲染表现</span><span>视觉设计工作流</span><span>B2B 商业转化</span>
        <span>主图视觉系统</span><span>工业应用场景</span><span>AI 提示词库</span><span>详情页转化策略</span><span>3D 渲染表现</span><span>视觉设计工作流</span><span>B2B 商业转化</span>
      </div>
    </div>

    <section class="about-panel" data-story-section>
      <div class="about-copy">
        <span class="badge">关于我</span>
        <h2>把设计经验变成 AI 时代的交付系统</h2>
        <p>
          我更想让这个网站展示“怎么做成事”：从视觉判断、AI 生成、精修交付，到资源沉淀，让访客看到可合作的能力，而不是只看到几张静态作品图。
        </p>
        <div class="about-tags">
          <span>AI 产品图</span>
          <span>品牌视觉</span>
          <span>内容工作流</span>
          <span>资源沉淀</span>
        </div>
        <a :href="pageLink('/resume')" class="about-link">查看完整简历 →</a>
      </div>
      <div class="about-stats">
        <div
          v-for="(metric, index) in metricCards"
          :key="metric.label"
          class="about-stat"
          :data-metric-index="index"
        >
          <span class="stat-val">{{ metricValues[index] }}{{ metric.suffix }}</span>
          <span class="stat-lbl">{{ metric.label }}</span>
        </div>
      </div>
    </section>

    <section class="section-container" id="works" data-story-section>
      <div class="common-header">
        <span class="badge">精选案例</span>
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
      <a
        v-if="filteredWorks[0]"
        :href="pageLink(filteredWorks[0].link)"
        class="case-feature"
      >
        <div class="case-feature-media">
          <img :src="filteredWorks[0].img" :alt="filteredWorks[0].title" loading="lazy" />
        </div>
        <div class="case-feature-copy">
          <span>{{ filteredWorks[0].category }}</span>
          <h4>{{ filteredWorks[0].title }}</h4>
          <p>{{ filteredWorks[0].desc }}</p>
          <b>{{ filteredWorks[0].titleEn }}</b>
        </div>
      </a>
      <div class="work-grid">
        <a v-for="item in filteredWorks.slice(1)" :key="item.id" :href="pageLink(item.link)" class="work-card">
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

    <section class="section-container workflow-section" data-story-section ref="workflowWrap">
      <div class="common-header">
        <span class="badge">工作流</span>
        <h3>AI 工作流实验室</h3>
        <p>页面向下滚动时，工作流横向推进，沉淀提示词、模型、生成与交付</p>
      </div>
      <div
        class="workflow-outer-wrap"
        :class="{ paused: workflowPaused }"
        @mouseenter="workflowPaused = true"
        @mouseleave="workflowPaused = false"
      >
        <div class="workflow-track" ref="workflowTrack">
          <div
            v-for="(step, index) in [...workflowSteps, ...workflowSteps]"
            :key="`${step.id}-${index}`"
            class="step-card"
            :data-signal="step.signal"
          >
            <h3>{{ step.label }} · {{ step.title }}</h3>
            <p>{{ step.desc }}</p>
            <div class="aigc-mini-grid-horizontal">
              <a v-for="item in aigcWorks.slice(0, 2)" :key="item.id" :href="pageLink(item.link)" class="mini-card-horizontal">
                <img :src="item.img" :alt="item.title" loading="lazy" />
                <span>{{ item.title }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-more-container">
        <a :href="pageLink('/aigc/')" class="btn-view-more">查看 AI 工作流 →</a>
      </div>
    </section>

    <section class="section-container" data-story-section>
      <div class="common-header">
        <span class="badge">方法论</span>
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

    <section class="section-container" data-story-section>
      <div class="common-header">
        <span class="badge">创作资源</span>
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

    <section class="section-container contact-section" data-story-section>
      <div class="contact-card">
        <div class="contact-left">
          <h3>与我联络</h3>
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
  --accent: #ff8b2f;
  --accent-strong: #315dff;
  --accent-soft: rgba(255, 139, 47, 0.16);
  --warm: #7a3cff;
  --canvas-bg: #f7f3ea;
  --surface: rgba(255, 255, 255, 0.72);
  --surface-soft: #fffaf1;
  --surface-strong: rgba(255, 255, 255, 0.92);
  --text-main: #16130e;
  --text-muted: #756f65;
  --line-soft: rgba(40, 32, 18, 0.12);
  --line-strong: rgba(255, 139, 47, 0.3);
  --shadow-soft: rgba(40, 32, 18, 0.14);
  --hero-text: #16130e;
  --hero-muted: #756f65;
  --hero-line: rgba(40, 32, 18, 0.12);
  --hero-glass: rgba(255, 255, 255, 0.72);
  --hero-panel: rgba(255, 255, 255, 0.82);
  --hero-chip: rgba(255, 250, 241, 0.9);
  --hero-chip-text: var(--accent-strong);
  --hero-bg:
    linear-gradient(90deg, rgba(40, 32, 18, 0.08) 1px, transparent 1px),
    linear-gradient(0deg, rgba(40, 32, 18, 0.08) 1px, transparent 1px),
    radial-gradient(circle at 20% 15%, rgba(255, 139, 47, 0.25), transparent 32%),
    radial-gradient(circle at 85% 5%, rgba(49, 93, 255, 0.16), transparent 26%),
    linear-gradient(180deg, #fff9ef 0%, #f7f3ea 44%, #efe8dc 100%);
  --hero-ambient:
    radial-gradient(circle at var(--mx) var(--my), rgba(255, 139, 47, 0.28), transparent 34%),
    linear-gradient(115deg, transparent 0 30%, rgba(49, 93, 255, 0.14) calc(var(--mx) - 12%), transparent var(--mx), rgba(122, 60, 255, 0.16) calc(var(--mx) + 16%), transparent 76%);
  --primary-bg: linear-gradient(135deg, #ff8b2f, #315dff);
  --primary-text: #ffffff;
  --secondary-bg: rgba(255, 255, 255, 0.68);
  --secondary-text: #16130e;
  --delivery-bg: linear-gradient(135deg, #0b1020, #315dff 54%, #070a12);
  --delivery-text: #f8fafc;
  --delivery-muted: rgba(226, 232, 240, 0.78);
  --delivery-line: rgba(191, 219, 254, 0.24);
  --delivery-card: rgba(15, 23, 42, 0.62);
  --delivery-card-hover: rgba(15, 23, 42, 0.82);
  --delivery-accent: #ff8b2f;
  --delivery-accent-soft: rgba(255, 139, 47, 0.12);
  --image-bg: #0b1020;
  --contact-bg: linear-gradient(135deg, var(--accent-soft), rgba(49, 93, 255, 0.1)), var(--vp-c-bg-soft);
  --flow-spin: 0deg;
  --core-spin: 0deg;
  --section-line-opacity: 0.42;
  --workflow-lift: 0;
  --section-spacing: 128px;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 24px 100px;
  box-sizing: border-box;
  color: var(--vp-c-text-1);
}

:global(.dark),
:global(html.dark),
:global(.dark body),
:global(.dark #app),
:global(.dark .VPLayout),
:global(.dark .VPContent) {
  --vp-c-bg: #070a12 !important;
  --vp-c-bg-soft: #0b1020 !important;
  --vp-c-bg-alt: #090b12 !important;
  --vp-c-bg-elv: rgba(19, 29, 54, 0.88) !important;
  --vp-c-text-1: #f5f7fb !important;
  --vp-c-text-2: #9aa5b8 !important;
  --vp-c-border: rgba(255, 255, 255, 0.12) !important;
  --vp-nav-bg-color: rgba(7, 10, 18, 0.7) !important;
  background-color: #070a12 !important;
}

:global(.dark body) {
  background: radial-gradient(circle at 18% 12%, rgba(86, 183, 255, 0.2), transparent 34%),
              radial-gradient(circle at 82% 4%, rgba(139, 92, 246, 0.24), transparent 28%),
              radial-gradient(circle at 72% 55%, rgba(255, 139, 47, 0.08), transparent 28%),
              linear-gradient(180deg, #060915 0%, #0b1020 48%, #090b12 100%) !important;
}

:global(.dark .VPNavBar) {
  background-color: rgba(7, 10, 18, 0.7) !important;
  backdrop-filter: blur(18px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
}

:global(html.dark .home-container) {
  --accent: #56b7ff !important;
  --accent-strong: #8b5cf6 !important;
  --accent-soft: rgba(86, 183, 255, 0.16) !important;
  --warm: #ff8b2f !important;
  --canvas-bg: #070a12 !important;
  --surface: rgba(16, 23, 42, 0.62) !important;
  --surface-soft: #0b1020 !important;
  --surface-strong: rgba(19, 29, 54, 0.88) !important;
  --text-main: #f5f7fb !important;
  --text-muted: #9aa5b8 !important;
  --line-soft: rgba(255, 255, 255, 0.12) !important;
  --line-strong: rgba(86, 183, 255, 0.32) !important;
  --shadow-soft: 0 24px 110px rgba(0, 0, 0, 0.42) !important;
  --hero-text: #f5f7fb !important;
  --hero-muted: #9aa5b8 !important;
  --hero-line: rgba(255, 255, 255, 0.12) !important;
  --hero-glass: rgba(16, 23, 42, 0.62) !important;
  --hero-panel: rgba(19, 29, 54, 0.78) !important;
  --hero-chip: rgba(86, 183, 255, 0.12) !important;
  --hero-chip-text: #56b7ff !important;
  --hero-bg:
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    radial-gradient(circle at 18% 12%, rgba(86, 183, 255, 0.2), transparent 34%),
    radial-gradient(circle at 82% 4%, rgba(139, 92, 246, 0.24), transparent 28%),
    radial-gradient(circle at 72% 55%, rgba(255, 139, 47, 0.08), transparent 28%),
    linear-gradient(180deg, #060915 0%, #0b1020 48%, #090b12 100%) !important;
  --hero-ambient:
    radial-gradient(circle at var(--mx) var(--my), rgba(86, 183, 255, 0.3), transparent 34%) !important;
  --primary-bg: linear-gradient(135deg, #56b7ff, #8b5cf6) !important;
  --primary-text: #06101f !important;
  --secondary-bg: rgba(16, 23, 42, 0.62) !important;
  --secondary-text: #f5f7fb !important;
  --delivery-bg: linear-gradient(135deg, #060915, #0b1020 56%, #090b12) !important;
  --delivery-text: #f8fafc !important;
  --delivery-muted: rgba(226, 232, 240, 0.76) !important;
  --delivery-line: rgba(255, 255, 255, 0.12) !important;
  --delivery-card: rgba(16, 23, 42, 0.72) !important;
  --delivery-card-hover: rgba(19, 29, 54, 0.92) !important;
  --delivery-accent: #ff8b2f !important;
  --delivery-accent-soft: rgba(255, 139, 47, 0.12) !important;
  --image-bg: #070a12 !important;
  --contact-bg: linear-gradient(135deg, rgba(86, 183, 255, 0.1), rgba(139, 92, 246, 0.08)), var(--vp-c-bg-soft) !important;
}

.section-container {
  position: relative;
  margin-top: var(--section-spacing);
  scroll-margin-top: 92px;
}

[data-section-no] {
  position: relative;
}

[data-section-no] > * {
  position: relative;
  z-index: 1;
}

[data-section-no]::after {
  content: attr(data-section-no);
  position: absolute;
  top: -28px;
  right: 8px;
  z-index: 0;
  color: color-mix(in srgb, var(--accent), transparent 86%);
  font-size: clamp(72px, 12vw, 168px);
  font-weight: 900;
  line-height: 0.9;
  pointer-events: none;
}

[data-story-section] {
  opacity: 0;
  transform: translateY(36px);
  transition:
    opacity 0.72s ease,
    transform 0.72s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}

[data-story-section].is-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-container::before {
  content: "";
  position: absolute;
  inset: -34px -16px auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent), transparent 58%), transparent);
  opacity: var(--section-line-opacity);
  pointer-events: none;
}

.hero-section {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(420px, 1.08fr);
  gap: 36px;
  min-height: calc(100vh - 118px);
  padding: 58px;
  overflow: hidden;
  border: 1px solid var(--hero-line);
  border-radius: 8px;
  background: var(--hero-bg);
  background-size: 34px 34px, 34px 34px, auto;
  isolation: isolate;
  transform:
    translateY(var(--hero-offset))
    scale(var(--hero-scale));
  transform-origin: center top;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: var(--hero-ambient);
  opacity: var(--ambient-opacity);
  transform: translateY(var(--ambient-y));
  transition: opacity 0.25s ease;
  z-index: -1;
}

.hero-section::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, transparent 0 18%, color-mix(in srgb, var(--warm), transparent 84%) 48%, transparent 76%),
    repeating-linear-gradient(0deg, transparent 0 18px, color-mix(in srgb, var(--hero-text), transparent 94%) 18px 19px);
  opacity: var(--scan-opacity);
  transform: translateX(var(--scan-x));
  mix-blend-mode: soft-light;
}

.scroll-reactor {
  position: absolute;
  right: 22px;
  top: 22px;
  bottom: 22px;
  z-index: 3;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  color: var(--hero-muted);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.14em;
  writing-mode: vertical-rl;
  pointer-events: none;
}

.scroll-reactor b {
  position: relative;
  display: block;
  width: 2px;
  min-height: 120px;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hero-text), transparent 86%);
}

.scroll-reactor b::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--warm);
  transform: scaleY(var(--reactor-scale));
  transform-origin: top;
}

.hero-copy {
  align-self: center;
  max-width: 600px;
  transform: translateY(var(--hero-copy-y));
  transition: transform 0.18s ease-out;
}

.eyebrow,
.badge,
.panel-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 26px;
  padding: 4px 10px;
  border: 1px solid var(--line-strong);
  border-radius: 4px;
  color: var(--hero-chip-text);
  background: var(--hero-chip);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.hero-title {
  margin: 24px 0 18px;
  color: var(--hero-text);
  font-size: clamp(42px, 5vw, 74px);
  line-height: 1.02;
  font-weight: 900;
}

.hero-title span {
  color: var(--warm);
}

.hero-desc {
  max-width: 560px;
  margin: 0 0 28px;
  color: var(--hero-muted);
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
  border: 1px solid var(--line-soft);
  border-radius: 6px;
  text-decoration: none !important;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.2;
  transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
}

.btn.primary {
  color: var(--primary-text) !important;
  background: var(--primary-bg);
  border-color: var(--primary-bg);
}

.btn.secondary {
  color: var(--secondary-text) !important;
  background: var(--secondary-bg);
}

.btn:hover,
.icon-btn:hover,
.btn-view-more:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}

.icon-btn {
  width: 44px;
  height: 44px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 54%);
  border-radius: 6px;
  color: var(--accent-strong);
  background: var(--hero-glass);
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
  transition: transform 0.22s ease, border-color 0.22s ease;
}

.mode-switch {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
}

.filter-row {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 2px;
  margin: 28px auto 0;
  padding: 4px;
  border: 0.5px solid var(--line-ui);
  border-radius: 999px;
  background: var(--surface-ui);
}

.hero-proofline {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  max-width: 560px;
  margin-top: 22px;
}

.hero-proofline span {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 40px;
  padding: 8px;
  overflow: hidden;
  border: 1px solid var(--hero-line);
  border-radius: 6px;
  color: var(--hero-text);
  background: color-mix(in srgb, var(--hero-glass), transparent 10%);
  font-size: 13px;
  font-weight: 900;
}

.hero-proofline span::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent, color-mix(in srgb, var(--warm), transparent 78%), transparent);
  opacity: var(--proof-opacity);
  transform: translateX(var(--proof-glide));
}

.hero-proofline span:nth-child(even)::before {
  background: linear-gradient(120deg, transparent, color-mix(in srgb, var(--accent), transparent 76%), transparent);
}

.mode-button {
  min-height: 38px;
  padding: 8px 14px;
  border: 1px solid var(--line-soft);
  border-radius: 4px;
  color: var(--hero-muted);
  background: var(--hero-glass);
  cursor: pointer;
  font-weight: 800;
  transition: color 0.22s ease, background 0.22s ease, border-color 0.22s ease;
}

.filter-button {
  min-height: 38px;
  padding: 8px 14px;
  border: 0;
  border-radius: 999px;
  color: var(--hero-muted);
  background: none;
  cursor: pointer;
  font-weight: 800;
  transition: color 0.22s ease, background 0.22s ease, border-color 0.22s ease;
}

.mode-button.active,
.workflow-step.active {
  color: var(--primary-text);
  border-color: var(--primary-bg);
  background: var(--primary-bg);
}

.filter-button.active {
  color: #fff;
  background: linear-gradient(135deg, var(--accent-ui), var(--accent-ui-2));
}

.hero-console {
  align-self: center;
  min-width: 0;
  border: 1px solid var(--hero-line);
  border-radius: 8px;
  background: var(--hero-glass);
  box-shadow: 0 28px 80px var(--shadow-soft);
  transform:
    perspective(1000px)
    translateY(var(--console-y))
    rotateX(var(--tilt-x))
    rotateY(var(--tilt-y));
  transition: transform 0.18s ease-out;
}

.console-topline,
.console-feed {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  color: var(--hero-muted);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--hero-line);
}

.console-feed {
  flex-wrap: wrap;
  border-top: 1px solid var(--hero-line);
  border-bottom: 0;
}

.console-feed span {
  color: var(--accent-strong);
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
  background: var(--image-bg);
}

.stage-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: hue-rotate(var(--poster-hue)) saturate(var(--poster-saturation)) brightness(var(--poster-brightness)) contrast(1.08);
  transform:
    translateY(var(--poster-y))
    translateX(var(--poster-x))
    scale(var(--poster-scale));
  transition: filter 0.22s ease, transform 0.18s ease-out;
}

.stage-orbit {
  position: absolute;
  inset: 34px;
  pointer-events: none;
  border: 1px solid color-mix(in srgb, var(--warm), transparent 58%);
  border-radius: 8px;
  opacity: var(--orbit-opacity);
  transform: rotate(var(--flow-spin)) scale(var(--orbit-scale));
  transform-origin: center;
}

.stage-orbit::before,
.stage-orbit::after {
  content: "";
  position: absolute;
  background: color-mix(in srgb, var(--warm), transparent 12%);
}

.stage-orbit::before {
  left: 12%;
  right: 12%;
  top: 50%;
  height: 1px;
}

.stage-orbit::after {
  top: 14%;
  bottom: 14%;
  left: 50%;
  width: 1px;
}

.stage-orbit i {
  position: absolute;
  width: 9px;
  height: 9px;
  border: 2px solid var(--warm);
  border-radius: 999px;
  background: var(--hero-panel);
}

.stage-orbit i:nth-child(1) {
  top: -5px;
  left: 18%;
}

.stage-orbit i:nth-child(2) {
  top: 24%;
  right: -5px;
}

.stage-orbit i:nth-child(3) {
  right: 20%;
  bottom: -5px;
}

.stage-orbit i:nth-child(4) {
  bottom: 26%;
  left: -5px;
}

.stage-panel {
  position: absolute;
  left: 38px;
  right: 38px;
  bottom: 38px;
  padding: 22px;
  border: 1px solid var(--hero-line);
  border-radius: 8px;
  background: var(--hero-panel);
}

.stage-panel h2 {
  margin: 12px 0 8px;
  color: var(--hero-text);
  font-size: clamp(22px, 3vw, 34px);
}

.stage-panel p {
  margin: 0;
  color: var(--hero-muted);
  line-height: 1.7;
}

.signal-card {
  position: absolute;
  display: grid;
  gap: 2px;
  min-width: 112px;
  padding: 12px;
  border: 1px solid var(--line-strong);
  border-radius: 6px;
  color: var(--hero-text);
  background: var(--hero-panel);
}

.signal-card b {
  font-size: 26px;
  line-height: 1;
  color: var(--warm);
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

.about-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(360px, 0.42fr);
  gap: 34px;
  align-items: stretch;
  margin-top: 72px;
  padding: 46px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background:
    linear-gradient(135deg, var(--accent-soft), transparent 48%),
    var(--vp-c-bg-soft);
}

.about-copy {
  display: grid;
  align-content: center;
  gap: 16px;
}

.about-copy h2 {
  max-width: 780px;
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: clamp(30px, 4vw, 52px);
  line-height: 1.12;
  font-weight: 900;
}

.about-copy p {
  max-width: 760px;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 17px;
  line-height: 1.85;
}

.about-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.about-tags span {
  min-height: 32px;
  padding: 6px 10px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 64%);
  border-radius: 4px;
  color: var(--accent);
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 800;
}

.about-link {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 42px;
  padding: 9px 16px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 38%);
  border-radius: 6px;
  color: var(--accent);
  background: var(--vp-c-bg);
  text-decoration: none !important;
  font-weight: 900;
  transition: transform 0.22s ease, border-color 0.22s ease;
}

.about-link:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.about-stat {
  position: relative;
  display: grid;
  align-content: end;
  min-height: 128px;
  padding: 20px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.about-stat::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent, var(--accent-soft)),
    linear-gradient(90deg, color-mix(in srgb, var(--accent), transparent 88%) 1px, transparent 1px);
  background-size: auto, 22px 22px;
}

.about-stat .stat-val,
.about-stat .stat-lbl,
.about-stat small {
  position: relative;
  z-index: 1;
}

.stat-val {
  color: var(--accent);
  font-size: clamp(44px, 6vw, 72px);
  font-weight: 900;
  line-height: 1;
}

.stat-lbl {
  margin-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 900;
}

.about-stat small {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 22px;
}

.common-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 380px);
  gap: 18px 34px;
  align-items: end;
  max-width: none;
  margin: 0 0 42px;
  text-align: left;
}

.common-header .badge {
  grid-column: 1 / -1;
}

.common-header h3 {
  grid-column: 1;
  margin: 14px 0 10px;
  color: var(--vp-c-text-1);
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.15;
  font-weight: 900;
}

.common-header p {
  grid-column: 2;
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
  font-size: 17px;
  line-height: 1.8;
}

.work-grid,
.tools-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;
}

.work-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  align-items: stretch;
}

.work-card {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-column: auto;
  min-height: auto;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: inherit;
  text-decoration: none !important;
  background:
    linear-gradient(180deg, transparent, var(--accent-soft)),
    var(--vp-c-bg-soft);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.work-card:nth-child(1) {
  grid-column: auto;
  min-height: auto;
}

.work-card:nth-child(2) {
  grid-column: auto;
  min-height: auto;
}

.work-card:nth-child(4) {
  grid-column: auto;
}

.work-card:nth-child(5) {
  grid-column: auto;
}

.work-card:hover,
.blog-card:hover,
.tool-card:hover,
.contact-item:hover,
.mini-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 14px 34px var(--shadow-soft);
}

.img-wrap {
  height: auto;
  aspect-ratio: 1.16;
  overflow: hidden;
  background: var(--image-bg);
}

.work-card:nth-child(1) .img-wrap,
.work-card:nth-child(2) .img-wrap {
  height: auto;
  aspect-ratio: 1.16;
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
  transform: scale(1.035);
}

.info {
  display: grid;
  gap: 8px;
  min-height: 142px;
  padding: 20px 20px 22px;
  border-top: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--surface), transparent 8%);
}

.cat,
.tag {
  color: var(--accent);
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

.workflow-section {
  padding: 44px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background:
    linear-gradient(135deg, var(--accent-soft), transparent 36%),
    var(--vp-c-bg-soft);
}

.workflow-section .common-header {
  margin-right: 0;
  margin-left: 0;
  text-align: left;
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
  color: var(--accent);
  font-size: 13px;
  font-weight: 900;
}

.workflow-step.active span {
  color: var(--primary-text);
}

.workflow-detail {
  min-height: 396px;
  padding: 34px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background:
    linear-gradient(90deg, var(--accent-soft) 1px, transparent 1px),
    linear-gradient(0deg, var(--accent-soft) 1px, transparent 1px),
    var(--vp-c-bg-soft);
  background-size: 28px 28px, 28px 28px, auto;
  transform: translateY(var(--workflow-lift));
}

.detail-index {
  color: var(--warm);
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
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;
}

.blog-card {
  display: grid;
  grid-column: span 4;
  grid-template-columns: 1fr;
  min-height: 230px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: inherit;
  text-decoration: none !important;
  background: var(--vp-c-bg-soft);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.blog-card:nth-child(1) {
  grid-column: span 6;
  min-height: 470px;
}

.blog-card:nth-child(2),
.blog-card:nth-child(3) {
  grid-column: span 3;
}

.blog-left {
  width: 200px;
  min-width: 200px;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.blog-card:nth-child(1) .blog-left {
  min-height: 0;
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
  grid-column: span 6;
  grid-template-columns: 48px 1fr 24px;
  gap: 16px;
  align-items: center;
  min-height: 154px;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: inherit;
  text-decoration: none !important;
  background: var(--vp-c-bg-soft);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.tool-card:nth-child(1),
.tool-card:nth-child(6) {
  grid-column: span 6;
  min-height: 154px;
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
  color: var(--accent);
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
  background: var(--contact-bg);
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
  color: var(--accent);
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
  border: 1px solid var(--line-strong);
  border-radius: 6px;
  color: var(--primary-text);
  background: var(--primary-bg);
  cursor: pointer;
  box-shadow: 0 16px 34px var(--shadow-soft);
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
  background: color-mix(in srgb, var(--canvas-bg), transparent 20%);
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
  box-shadow: 0 22px 60px var(--shadow-soft);
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
  .contact-card,
  .about-panel {
    grid-template-columns: 1fr;
  }

  .hero-section {
    min-height: auto;
    padding: 36px;
  }

  .hero-console {
    transform: none;
  }

  .tools-grid,
  .blog-list {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .work-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .about-stats {
    grid-template-columns: 1fr;
  }

  .tool-card,
  .tool-card:nth-child(1),
  .tool-card:nth-child(6),
  .blog-card,
  .blog-card:nth-child(1),
  .blog-card:nth-child(2),
  .blog-card:nth-child(3) {
    grid-column: span 3;
  }

  .work-card,
  .work-card:nth-child(1),
  .work-card:nth-child(2),
  .work-card:nth-child(4),
  .work-card:nth-child(5) {
    grid-column: auto;
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

  [data-section-no]::after {
    top: -12px;
    right: 0;
    font-size: 72px;
  }

  .hero-section {
    padding: 24px;
    transform: none;
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

  .hero-proofline {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .common-header {
    grid-template-columns: 1fr;
    gap: 8px;
    margin-bottom: 26px;
  }

  .common-header .badge,
  .common-header h3,
  .common-header p {
    grid-column: 1;
  }

  .common-header p {
    margin-bottom: 0;
    font-size: 15px;
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

  .scroll-reactor {
    display: none;
  }

  .about-panel {
    padding: 24px;
  }

  .work-grid,
  .tools-grid,
  .blog-list,
  .about-stats,
  .aigc-mini-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .work-card,
  .work-card:nth-child(1),
  .work-card:nth-child(2),
  .work-card:nth-child(4),
  .work-card:nth-child(5),
  .tool-card,
  .tool-card:nth-child(1),
  .tool-card:nth-child(6),
  .blog-card,
  .blog-card:nth-child(1),
  .blog-card:nth-child(2),
  .blog-card:nth-child(3) {
    grid-column: 1;
    min-height: auto;
  }

  .work-card:nth-child(1) .img-wrap,
  .work-card:nth-child(2) .img-wrap,
  .img-wrap {
    height: 220px;
  }

  .about-stat {
    min-height: 150px;
  }

  .workflow-section {
    padding: 24px;
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

/* First batch visual system refresh */
:global(.VPHome .vp-doc.container) {
  max-width: none !important;
  padding: 0 !important;
}

.home-container {
  --ink: #16130e;
  --muted-ink: #756f65;
  --page-bg: #f7f3ea;
  --panel-bg: rgba(255, 255, 255, 0.76);
  --panel-solid: #ffffff;
  --panel-2: #fffaf1;
  --line: rgba(40, 32, 18, 0.12);
  --line-hot: rgba(255, 139, 47, 0.36);
  --brand-a: #ff8b2f;
  --brand-b: #315dff;
  --brand-c: #7a3cff;
  --brand-d: #ff8b2f;
  --glow-a: rgba(255, 139, 47, 0.28);
  --glow-b: rgba(49, 93, 255, 0.18);
  --glow-c: rgba(122, 60, 255, 0.16);
  --button-ink: #ffffff;
  --hero-poster-filter: hue-rotate(var(--poster-hue)) saturate(calc(var(--poster-saturation) + 0.05)) brightness(var(--poster-brightness)) contrast(1.08);
  max-width: none;
  padding: 0 clamp(16px, 3vw, 42px) 96px;
  background:
    radial-gradient(circle at var(--mx) var(--my), var(--glow-a), transparent 28%),
    radial-gradient(circle at 82% 12%, var(--glow-c), transparent 24%),
    linear-gradient(180deg, var(--page-bg), color-mix(in srgb, var(--page-bg), var(--brand-b) 6%));
  color: var(--ink);
}

:global(html.dark .home-container) {
  --ink: #f5f7fb !important;
  --muted-ink: #9aa5b8 !important;
  --page-bg: #070a12 !important;
  --panel-bg: rgba(16, 23, 42, 0.62) !important;
  --panel-solid: #0b1020 !important;
  --panel-2: #131d36 !important;
  --line: rgba(255, 255, 255, 0.12) !important;
  --line-hot: rgba(86, 183, 255, 0.32) !important;
  --brand-a: #56b7ff !important;
  --brand-b: #8b5cf6 !important;
  --brand-c: #ff8b2f !important;
  --brand-d: #56b7ff !important;
  --glow-a: rgba(86, 183, 255, 0.2) !important;
  --glow-b: rgba(139, 92, 246, 0.24) !important;
  --glow-c: rgba(255, 139, 47, 0.08) !important;
  --button-ink: #06101f !important;
  --hero-poster-filter: hue-rotate(calc(var(--poster-hue) + 180deg)) saturate(calc(var(--poster-saturation) + 0.22)) brightness(0.82) contrast(1.12) !important;
}

.hero-section {
  grid-template-columns: minmax(360px, 0.92fr) minmax(420px, 1.08fr);
  gap: clamp(24px, 4vw, 58px);
  min-height: calc(100svh - 86px);
  max-width: 1580px;
  margin: 0 auto;
  padding: clamp(24px, 4vw, 54px);
  border-color: var(--line);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--ink), transparent 94%) 1px, transparent 1px),
    linear-gradient(0deg, color-mix(in srgb, var(--ink), transparent 94%) 1px, transparent 1px),
    linear-gradient(135deg, color-mix(in srgb, var(--panel-solid), var(--brand-a) 8%), color-mix(in srgb, var(--panel-2), var(--brand-b) 10%));
  background-size: 36px 36px, 36px 36px, auto;
  box-shadow: 0 28px 90px color-mix(in srgb, var(--ink), transparent 90%);
}

:global(html.dark .hero-section) {
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--ink), transparent 95%) 1px, transparent 1px),
    linear-gradient(0deg, color-mix(in srgb, var(--ink), transparent 95%) 1px, transparent 1px),
    radial-gradient(circle at 18% 12%, rgba(86, 183, 255, 0.2), transparent 34%),
    radial-gradient(circle at 82% 4%, rgba(139, 92, 246, 0.24), transparent 28%),
    radial-gradient(circle at 72% 55%, rgba(255, 139, 47, 0.08), transparent 28%),
    linear-gradient(180deg, #060915 0%, #0b1020 48%, #090b12 100%) !important;
}

.hero-section::before {
  background:
    radial-gradient(circle at var(--mx) var(--my), var(--glow-a), transparent 32%),
    linear-gradient(115deg, transparent 0 34%, var(--glow-b) calc(var(--mx) - 10%), transparent var(--mx), var(--glow-c) calc(var(--mx) + 18%), transparent 80%);
}

.hero-copy {
  max-width: 680px;
}

.eyebrow,
.badge,
.panel-kicker {
  color: var(--brand-d);
  border-color: var(--line-hot);
  background: color-mix(in srgb, var(--panel-bg), var(--brand-a) 8%);
}

:global(html.dark .eyebrow),
:global(html.dark .badge),
:global(html.dark .panel-kicker) {
  color: var(--brand-a);
}

.hero-title {
  color: var(--ink);
  font-size: clamp(44px, 6vw, 86px);
  letter-spacing: 0;
}

.hero-title span {
  color: transparent;
  background: linear-gradient(100deg, var(--brand-a), var(--brand-b) 48%, var(--brand-c));
  -webkit-background-clip: text;
  background-clip: text;
}

.hero-desc,
.common-header p,
.about-copy p,
.workflow-detail p,
.eng-title,
.tool-info p,
.blog-main p,
.contact-left p {
  color: var(--muted-ink);
}

.btn.primary,
.mode-button.active,
.filter-button.active,
.workflow-step.active,
.back-to-top {
  color: var(--button-ink) !important;
  border-color: transparent;
  background: linear-gradient(135deg, var(--brand-a), var(--brand-c));
  box-shadow: 0 16px 34px color-mix(in srgb, var(--brand-a), transparent 76%);
}

.btn.secondary,
.icon-btn,
.mode-button,
.filter-button,
.btn-view-more {
  color: var(--ink) !important;
  border-color: var(--line);
  background: var(--panel-bg);
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  max-width: 620px;
  margin-top: 18px;
}

.metric-card {
  position: relative;
  min-height: 106px;
  padding: 16px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background:
    linear-gradient(140deg, color-mix(in srgb, var(--panel-bg), var(--brand-a) 8%), transparent),
    var(--panel-bg);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.metric-card::after {
  content: "";
  position: absolute;
  inset: auto -20% -45% 20%;
  height: 80px;
  background: radial-gradient(circle, var(--glow-a), transparent 70%);
  opacity: 0.7;
  transition: transform 0.25s ease;
}

.metric-card:hover,
.case-feature:hover,
.work-card:hover,
.blog-card:hover,
.tool-card:hover,
.contact-item:hover,
.mini-card:hover {
  transform: translateY(-6px);
  border-color: var(--line-hot);
  box-shadow: 0 24px 60px color-mix(in srgb, var(--brand-a), transparent 84%);
}

.metric-card:hover::after {
  transform: translateY(-16px) scale(1.2);
}

.metric-card strong {
  position: relative;
  z-index: 1;
  display: block;
  color: var(--ink);
  font-size: clamp(30px, 4vw, 48px);
  line-height: 0.95;
  font-weight: 950;
}

.metric-card span {
  position: relative;
  z-index: 1;
  display: block;
  margin-top: 8px;
  color: var(--muted-ink);
  font-size: 13px;
  font-weight: 850;
}

.hero-console {
  border-color: var(--line);
  background: color-mix(in srgb, var(--panel-bg), transparent 8%);
  box-shadow: 0 28px 82px color-mix(in srgb, var(--ink), transparent 88%);
}

.console-stage {
  min-height: min(52vh, 500px);
  padding: 16px;
}

.poster-glow {
  position: absolute;
  inset: 14px;
  border-radius: 8px;
  background:
    radial-gradient(circle at var(--mx) var(--my), var(--glow-a), transparent 30%),
    radial-gradient(circle at 78% 18%, var(--glow-c), transparent 28%);
  opacity: 0.86;
  pointer-events: none;
}

.stage-image {
  position: relative;
  height: min(46vh, 430px);
  border: 1px solid color-mix(in srgb, var(--brand-a), transparent 62%);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ink), transparent 90%);
}

.stage-image img {
  filter: var(--hero-poster-filter);
}

.stage-panel {
  left: 28px;
  right: 28px;
  bottom: 28px;
  background: color-mix(in srgb, var(--panel-bg), transparent 4%);
}

.panel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.panel-tags span {
  padding: 5px 8px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted-ink);
  background: color-mix(in srgb, var(--panel-solid), transparent 22%);
  font-size: 11px;
  font-weight: 850;
}

.signal-card {
  border-color: var(--line-hot);
  background: color-mix(in srgb, var(--panel-bg), transparent 4%);
}

.signal-card b,
.stat-val,
.detail-index,
.tool-arrow,
.c-arrow,
.cat,
.tag {
  color: var(--brand-a);
}

.section-container,
.about-panel {
  max-width: 1480px;
  margin-right: auto;
  margin-left: auto;
}

.about-panel,
.workflow-section,
.contact-card {
  border-color: var(--line);
  background:
    radial-gradient(circle at 18% 12%, var(--glow-a), transparent 26%),
    linear-gradient(135deg, var(--panel-bg), color-mix(in srgb, var(--panel-2), transparent 18%));
  box-shadow: 0 20px 70px color-mix(in srgb, var(--ink), transparent 92%);
}

.about-stat,
.workflow-detail,
.workflow-step,
.mini-card,
.blog-card,
.tool-card,
.contact-item,
.work-card {
  border-color: var(--line);
  background: var(--panel-bg);
}

.about-stat {
  min-height: 138px;
}

.about-stat small {
  color: color-mix(in srgb, var(--brand-c), var(--ink) 10%);
  font-size: 14px;
  font-weight: 950;
}

.case-feature {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 0;
  min-height: 420px;
  margin: 0 0 22px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: inherit;
  text-decoration: none !important;
  background: var(--panel-bg);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.case-feature::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent, color-mix(in srgb, var(--brand-a), transparent 88%)),
    radial-gradient(circle at var(--mx) var(--my), var(--glow-a), transparent 24%);
  opacity: 0.72;
  pointer-events: none;
}

.case-feature-media {
  position: relative;
  min-height: 420px;
  overflow: hidden;
  background: var(--image-bg);
}

.case-feature-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.08) contrast(1.05);
  transition: transform 0.55s ease, filter 0.25s ease;
}

:global(html.dark .case-feature-media img) {
  filter: hue-rotate(120deg) saturate(1.2) brightness(0.72) contrast(1.14);
}

.case-feature:hover .case-feature-media img {
  transform: scale(1.045);
}

.case-feature-copy {
  position: relative;
  z-index: 1;
  display: grid;
  align-content: end;
  gap: 14px;
  padding: clamp(26px, 4vw, 46px);
}

.case-feature-copy span,
.case-feature-copy b {
  color: var(--brand-a);
  font-size: 12px;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.case-feature-copy h4 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(32px, 5vw, 60px);
  line-height: 1.02;
}

.case-feature-copy p {
  margin: 0;
  color: var(--muted-ink);
  font-size: 17px;
  line-height: 1.75;
}

.work-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.work-card {
  min-height: 300px;
}

.img-wrap {
  aspect-ratio: 1.02;
}

.info {
  min-height: 128px;
  background: color-mix(in srgb, var(--panel-solid), transparent 24%);
}

.workflow-board {
  grid-template-columns: minmax(240px, 0.28fr) minmax(0, 1fr);
}

.tools-grid {
  gap: 14px;
}

@media (max-width: 1180px) {
  .hero-section {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero-metrics,
  .work-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .case-feature {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .home-container {
    padding-right: 14px;
    padding-left: 14px;
  }

  .hero-section {
    padding: 22px;
  }

  .hero-metrics,
  .work-grid {
    grid-template-columns: 1fr;
  }

  .console-stage {
    min-height: 360px;
  }

  .stage-image {
    height: 320px;
  }

  .case-feature,
  .case-feature-media {
    min-height: 320px;
  }
}

/* Color-system correction: semantic light/dark themes and a cleaner poster */
.home-container {
  --page-bg: #f7f3ea;
  --page-bg-2: #efe8dc;
  --ink: #16130e;
  --muted-ink: #756f65;
  --surface-ui: rgba(255, 255, 255, 0.78);
  --surface-ui-strong: #ffffff;
  --surface-ui-soft: #fffaf1;
  --line-ui: rgba(40, 32, 18, 0.12);
  --line-ui-strong: rgba(255, 139, 47, 0.3);
  --accent-ui: #ff8b2f;
  --accent-ui-2: #315dff;
  --accent-ui-3: #7a3cff;
  --accent-contrast: #ffffff;
  --ambient-a: rgba(255, 139, 47, 0.25);
  --ambient-b: rgba(49, 93, 255, 0.16);
  --ambient-c: rgba(122, 60, 255, 0.12);
  --poster-surface: linear-gradient(145deg, #fff9ef, #efe8dc);
  --poster-panel: rgba(255, 255, 255, 0.72);
  --poster-filter-theme: hue-rotate(var(--poster-hue)) saturate(1.04) brightness(1.02) contrast(1.04);
  --shadow-ui: rgba(40, 32, 18, 0.14);
  background:
    radial-gradient(circle at 18% 18%, var(--ambient-a), transparent 30%),
    radial-gradient(circle at 82% 10%, var(--ambient-c), transparent 26%),
    linear-gradient(180deg, var(--page-bg), var(--page-bg-2));
  color: var(--ink);
}

:global(html.dark .home-container) {
  --page-bg: #070a12 !important;
  --page-bg-2: #0b1020 !important;
  --ink: #f5f7fb !important;
  --muted-ink: #9aa5b8 !important;
  --surface-ui: rgba(16, 23, 42, 0.62) !important;
  --surface-ui-strong: rgba(19, 29, 54, 0.88) !important;
  --surface-ui-soft: #0b1020 !important;
  --line-ui: rgba(255, 255, 255, 0.12) !important;
  --line-ui-strong: rgba(86, 183, 255, 0.32) !important;
  --accent-ui: #56b7ff !important;
  --accent-ui-2: #8b5cf6 !important;
  --accent-ui-3: #ff8b2f !important;
  --accent-contrast: #06101f !important;
  --ambient-a: rgba(86, 183, 255, 0.2) !important;
  --ambient-b: rgba(139, 92, 246, 0.24) !important;
  --ambient-c: rgba(255, 139, 47, 0.08) !important;
  --poster-surface: linear-gradient(145deg, rgba(16, 23, 42, 0.62), rgba(19, 29, 54, 0.88)) !important;
  --poster-panel: rgba(7, 10, 18, 0.75) !important;
  --poster-filter-theme: hue-rotate(calc(var(--poster-hue) + 180deg)) saturate(1.08) brightness(0.82) contrast(1.10) !important;
  --shadow-ui: 0 24px 110px rgba(0, 0, 0, 0.42) !important;
}

.hero-section {
  grid-template-columns: minmax(360px, 0.95fr) minmax(380px, 0.86fr);
  gap: clamp(22px, 4vw, 54px);
  min-height: min(760px, calc(100svh - 84px));
  padding: clamp(26px, 4vw, 52px);
  border: 0;
  box-shadow: none;
  background:
    radial-gradient(circle at var(--mx) var(--my), var(--ambient-a), transparent 30%),
    radial-gradient(circle at 84% 18%, var(--ambient-b), transparent 28%),
    transparent;
}

.hero-section::after,
.scroll-reactor,
.mode-switch,
.hero-proofline,
.hero-metrics,
.console-topline,
.console-feed,
.stage-orbit,
.signal-card,
.panel-tags {
  display: none !important;
}

.hero-section::before {
  background: radial-gradient(circle at var(--mx) var(--my), var(--ambient-a), transparent 34%);
  opacity: 0.8;
}

.hero-copy {
  max-width: 640px;
}

.eyebrow,
.badge,
.panel-kicker {
  border-color: var(--line-ui);
  color: var(--accent-ui);
  background: color-mix(in srgb, var(--surface-ui), transparent 12%);
}

.hero-title {
  color: var(--ink);
  font-size: clamp(42px, 5.5vw, 76px);
}

.hero-title span {
  background: linear-gradient(100deg, var(--accent-ui), var(--accent-ui-2) 52%, var(--accent-ui-3));
  -webkit-background-clip: text;
  background-clip: text;
}

.hero-desc,
.common-header p,
.about-copy p,
.workflow-detail p,
.case-feature-copy p,
.eng-title,
.tool-info p,
.blog-main p,
.contact-left p {
  color: var(--muted-ink);
}

.hero-actions {
  display: none;
}

.hero-console {
  align-self: center;
  overflow: visible;
  border: 0;
  border-radius: 10px;
  background: var(--poster-surface);
  box-shadow: 0 28px 80px var(--shadow-ui);
  backdrop-filter: none;
}

.console-stage {
  min-height: 0;
  padding: clamp(14px, 2vw, 20px);
}

.poster-glow {
  inset: -8%;
  border-radius: 18px;
  background:
    radial-gradient(circle at var(--mx) var(--my), var(--ambient-a), transparent 34%),
    radial-gradient(circle at 86% 12%, var(--ambient-c), transparent 28%);
  opacity: 0.72;
}

.stage-image {
  height: clamp(280px, 38vw, 430px);
  overflow: hidden;
  border: 0;
  border-radius: 10px;
  background: transparent;
  box-shadow: none;
}

.stage-image img {
  filter: var(--poster-filter-theme);
  transform:
    translateY(var(--poster-y-soft))
    translateX(var(--poster-x-soft))
    scale(var(--poster-scale-soft));
}

.stage-panel {
  left: clamp(20px, 3vw, 34px);
  right: clamp(20px, 3vw, 34px);
  bottom: clamp(20px, 3vw, 34px);
  padding: clamp(18px, 2.4vw, 26px);
  border: 0;
  border-radius: 10px;
  background: var(--poster-panel);
  box-shadow: 0 16px 42px var(--shadow-ui);
}

.stage-panel h2 {
  color: var(--ink);
}

.stage-panel p {
  color: var(--muted-ink);
}

.btn.primary,
.filter-button.active,
.workflow-step.active,
.back-to-top {
  color: var(--accent-contrast) !important;
  border-color: transparent;
  background: linear-gradient(135deg, var(--accent-ui), var(--accent-ui-2));
  box-shadow: 0 14px 30px color-mix(in srgb, var(--accent-ui), transparent 78%);
}

.btn.secondary,
.icon-btn,
.filter-button,
.btn-view-more,
.mode-button {
  color: var(--ink) !important;
  border-color: var(--line-ui);
  background: var(--surface-ui);
}

.about-panel,
.workflow-section,
.contact-card,
.case-feature,
.work-card,
.blog-card,
.tool-card,
.mini-card,
.workflow-detail,
.workflow-step,
.about-stat,
.contact-item {
  border-color: var(--line-ui);
  background: var(--surface-ui);
  box-shadow: 0 18px 52px color-mix(in srgb, var(--shadow-ui), transparent 30%);
}

.metric-card:hover,
.case-feature:hover,
.work-card:hover,
.blog-card:hover,
.tool-card:hover,
.contact-item:hover,
.mini-card:hover {
  border-color: var(--line-ui-strong);
  box-shadow: 0 24px 62px color-mix(in srgb, var(--shadow-ui), transparent 10%);
}

.stat-val,
.detail-index,
.tool-arrow,
.c-arrow,
.cat,
.tag,
.case-feature-copy span,
.case-feature-copy b {
  color: var(--accent-ui);
}

.case-feature-media img {
  filter: saturate(1.02) brightness(1) contrast(1.03);
}

:global(html.dark .case-feature-media img) {
  filter: hue-rotate(132deg) saturate(1.08) brightness(0.78) contrast(1.1);
}

@media (max-width: 1180px) {
  .hero-section {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

@media (max-width: 760px) {
  .hero-section {
    padding: 22px 10px 30px;
  }

  .hero-console {
    border-radius: 10px;
  }

  .stage-image {
    height: 300px;
  }
}

/* Layout correction: full-bleed page, controlled desktop measure, open mobile canvas */
:global(.VPHome),
:global(.VPHome .VPHomeContent),
:global(.VPHome .vp-doc.container) {
  width: 100% !important;
  max-width: none !important;
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.home-container {
  width: 100vw;
  max-width: none;
  margin-right: calc(50% - 50vw);
  margin-left: calc(50% - 50vw);
  padding: 0 0 104px;
  overflow-x: clip;
}

.hero-section,
.section-container,
.about-panel {
  width: min(calc(100% - 96px), 1280px);
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
}

.section-container {
  margin-top: clamp(86px, 8vw, 124px);
}

.about-panel {
  margin-top: clamp(48px, 5vw, 72px);
}

.hero-section {
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.86fr);
  min-height: min(720px, calc(100svh - 78px));
  padding: clamp(34px, 4vw, 56px);
}

.common-header {
  grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
}

.work-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.case-feature {
  min-height: 390px;
}

.case-feature-media {
  min-height: 390px;
}

@media (min-width: 1440px) {
  .hero-title {
    font-size: clamp(54px, 4.3vw, 76px);
  }
}

@media (max-width: 1180px) {
  .hero-section,
  .section-container,
  .about-panel {
    width: min(calc(100% - 48px), 960px);
  }

  .hero-section {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

@media (max-width: 760px) {
  .home-container {
    width: 100%;
    margin-right: 0;
    margin-left: 0;
    padding-bottom: 72px;
  }

  .hero-section,
  .section-container,
  .about-panel {
    width: 100%;
    max-width: none;
  }

  .section-container {
    margin-top: 68px;
    padding-right: 16px;
    padding-left: 16px;
  }

  .about-panel {
    margin-top: 42px;
    padding: 28px 16px;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }

  .hero-section {
    min-height: auto;
    padding: 28px 16px 34px;
    border-radius: 0;
    transform: none;
  }

  .hero-copy {
    max-width: none;
  }

  .hero-title {
    max-width: 12em;
    font-size: clamp(38px, 12vw, 52px);
    line-height: 1.04;
  }

  .hero-desc {
    max-width: none;
    font-size: 16px;
    line-height: 1.75;
  }

  .hero-console {
    width: 100%;
    border-radius: 0;
  }

  .console-stage {
    padding: 12px;
  }

  .stage-image {
    height: clamp(300px, 74vw, 390px);
    border-radius: 0;
  }

  .stage-panel {
    right: 16px;
    bottom: 16px;
    left: 16px;
    padding: 16px;
    border-radius: 8px;
  }

  .common-header {
    grid-template-columns: 1fr;
  }

  .common-header .badge,
  .common-header h3,
  .common-header p {
    grid-column: 1;
  }

  .common-header h3 {
    font-size: clamp(30px, 9vw, 42px);
  }

  .common-header p {
    max-width: none;
  }

  .work-grid,
  .tools-grid,
  .blog-list,
  .about-stats,
  .aigc-mini-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .case-feature {
    grid-template-columns: 1fr;
    min-height: auto;
    border-radius: 0;
  }

  .case-feature-media {
    min-height: 280px;
  }

  .case-feature-copy {
    padding: 24px 18px 28px;
  }

  .workflow-section,
  .contact-card {
    padding: 26px 16px;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }

  .workflow-board,
  .contact-card {
    grid-template-columns: 1fr;
  }
}

/* -------------------- 跑马灯标签轮播 -------------------- */
.marquee {
  width: 100%;
  overflow: hidden;
  padding: 16px 0;
  border-top: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
  background: rgba(127, 127, 127, 0.035);
  margin-top: 54px;
}
.marquee-track {
  display: flex;
  gap: 12px;
  width: max-content;
  animation: marquee 30s linear infinite;
}
.marquee span {
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--line-soft);
  background: var(--surface);
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}


/* -------------------- 横向平移 AI 工作流 -------------------- */
.workflow-outer-wrap {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  border: 1px solid var(--line-soft);
  border-radius: 28px;
  background: var(--surface);
  box-shadow: 0 16px 48px var(--shadow-soft);
  margin-top: 36px;
}
.workflow-track {
  display: flex;
  gap: 20px;
  height: 100%;
  padding: 30px;
  transform: translateX(var(--workflow-x, 0px));
  transition: transform .1s cubic-bezier(0.1, 0.8, 0.2, 1);
  will-change: transform;
}
.step-card {
  flex: 0 0 320px;
  border: 1px solid var(--line-soft);
  border-radius: 24px;
  padding: 24px;
  background: var(--surface-soft);
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.step-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
}
.step-num {
  font-size: 64px;
  line-height: .8;
  letter-spacing: -.06em;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--text-main) 24%, transparent);
  margin-bottom: 24px;
}
.step-card h3 { margin: 0 0 8px; font-size: 18px; font-weight: 800; color: var(--text-main); }
.step-card p { margin: 0; color: var(--text-muted); line-height: 1.6; font-size: 13px; flex-grow: 1; }

.aigc-mini-grid-horizontal {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.mini-card-horizontal {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--line-soft);
  text-decoration: none;
  background: var(--surface);
}
.mini-card-horizontal img {
  width: 100%;
  height: 64px;
  object-fit: cover;
}
.mini-card-horizontal span {
  padding: 4px 6px;
  font-size: 11px;
  font-weight: 800;
  color: var(--text-muted);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* -------------------- 案例精致 Hover 与卡片进场 -------------------- */
.case-feature {
  position: relative;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}
.case-feature::after {
  content: "";
  position: absolute;
  right: -40px;
  bottom: -40px;
  width: 130px;
  height: 130px;
  border-radius: 999px;
  background: radial-gradient(circle, var(--accent-soft), transparent 68%);
  opacity: 0;
  transition: opacity .35s ease;
  pointer-events: none;
  z-index: 2;
}
.case-feature:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 80px var(--shadow-soft);
  border-color: var(--accent);
}
.case-feature:hover::after {
  opacity: 1;
}

.work-card {
  position: relative;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.35s ease;
}
.work-card::after {
  content: "";
  position: absolute;
  right: -30px;
  bottom: -30px;
  width: 100px;
  height: 100px;
  border-radius: 999px;
  background: radial-gradient(circle, var(--accent-soft), transparent 68%);
  opacity: 0;
  transition: opacity .35s ease;
  pointer-events: none;
}
.work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px var(--shadow-soft);
  border-color: var(--accent);
}
.work-card:hover::after {
  opacity: 1;
}

.img-wrap img, .case-feature-media img {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.work-card:hover .img-wrap img,
.case-feature:hover .case-feature-media img {
  transform: scale(1.05);
}

[data-story-section].is-visible .work-card,
[data-story-section].is-visible .tool-card,
[data-story-section].is-visible .blog-card {
  opacity: 1;
  transform: translateY(0);
}

.work-card, .tool-card, .blog-card {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.72s cubic-bezier(0.22, 1, 0.36, 1), transform 0.72s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease;
}

.work-grid .work-card:nth-child(1) { transition-delay: 60ms; }
.work-grid .work-card:nth-child(2) { transition-delay: 120ms; }
.work-grid .work-card:nth-child(3) { transition-delay: 180ms; }
.work-grid .work-card:nth-child(4) { transition-delay: 240ms; }
.work-grid .work-card:nth-child(5) { transition-delay: 300ms; }
.work-grid .work-card:nth-child(6) { transition-delay: 360ms; }

.tools-grid .tool-card:nth-child(1) { transition-delay: 50ms; }
.tools-grid .tool-card:nth-child(2) { transition-delay: 100ms; }
.tools-grid .tool-card:nth-child(3) { transition-delay: 150ms; }
.tools-grid .tool-card:nth-child(4) { transition-delay: 200ms; }


/* -------------------- 动效关键帧 -------------------- */
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@media (max-width: 920px) {
  .hero-console.studio {
    min-height: 480px;
  }
}

@media (max-width: 640px) {
  .hero-console.studio {
    min-height: 400px;
  }
  .workflow-outer-wrap {
    height: auto;
    overflow-x: auto;
  }
  .workflow-track {
    transform: none !important;
  }
}

/* Immersive pass: make the homepage read as one continuous canvas. */
:global(.VPHome),
:global(.VPHome .VPHomeContent),
:global(.VPHome .VPContent),
:global(.VPHome .vp-doc.container) {
  width: 100% !important;
  max-width: none !important;
  padding: 0 !important;
  background: transparent !important;
}

:global(html:not(.dark) body),
:global(html:not(.dark) #app),
:global(html:not(.dark) .VPContent) {
  background:
    radial-gradient(circle at 8% 14%, rgba(255, 139, 47, 0.24), transparent 28%),
    radial-gradient(circle at 86% 8%, rgba(49, 93, 255, 0.14), transparent 30%),
    linear-gradient(180deg, #fff9ef 0%, #f7f3ea 44%, #efe8dc 100%) !important;
}

:global(html.dark body),
:global(html.dark #app),
:global(html.dark .VPContent) {
  background:
    radial-gradient(circle at 15% 12%, rgba(86, 183, 255, 0.18), transparent 34%),
    radial-gradient(circle at 84% 4%, rgba(139, 92, 246, 0.22), transparent 30%),
    radial-gradient(circle at 72% 58%, rgba(255, 139, 47, 0.08), transparent 32%),
    linear-gradient(180deg, #060915 0%, #0b1020 46%, #090b12 100%) !important;
}

.home-container {
  --immersive-bg-light:
    radial-gradient(circle at 9% 14%, rgba(255, 139, 47, 0.24), transparent 28%),
    radial-gradient(circle at 84% 8%, rgba(49, 93, 255, 0.14), transparent 30%),
    linear-gradient(180deg, #fff9ef 0%, #f7f3ea 44%, #efe8dc 100%);
  --immersive-bg-dark:
    radial-gradient(circle at 15% 12%, rgba(86, 183, 255, 0.18), transparent 34%),
    radial-gradient(circle at 84% 4%, rgba(139, 92, 246, 0.22), transparent 30%),
    radial-gradient(circle at 72% 58%, rgba(255, 139, 47, 0.08), transparent 32%),
    linear-gradient(180deg, #060915 0%, #0b1020 46%, #090b12 100%);
  --section-glass: rgba(255, 255, 255, 0.42);
  --section-glass-strong: rgba(255, 255, 255, 0.62);
  background: var(--immersive-bg-light) !important;
}

:global(html.dark .home-container) {
  --section-glass: rgba(13, 20, 38, 0.46);
  --section-glass-strong: rgba(16, 26, 50, 0.64);
  background: var(--immersive-bg-dark) !important;
}

.hero-section {
  width: 100% !important;
  max-width: none !important;
  min-height: calc(100svh - 56px);
  margin: 0 !important;
  padding:
    clamp(72px, 8vw, 128px)
    clamp(32px, 10vw, 168px)
    clamp(76px, 8vw, 128px) !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: var(--immersive-bg-light) !important;
  transform: none !important;
}

:global(html.dark .hero-section) {
  background: var(--immersive-bg-dark) !important;
}

.hero-section::before {
  inset: -18vw !important;
  background:
    radial-gradient(circle at var(--mx) var(--my), var(--ambient-a), transparent 28%),
    radial-gradient(circle at 82% 15%, var(--ambient-b), transparent 26%) !important;
  opacity: 0.9;
}

.hero-console {
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.stage-image,
.case-feature-media,
.img-wrap,
.blog-left {
  background: transparent !important;
}

.section-container,
.about-panel {
  width: min(calc(100% - 96px), 1360px) !important;
  max-width: 1360px !important;
}

.about-panel {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  gap: clamp(18px, 2.5vw, 30px);
  min-height: 0;
  margin-top: clamp(46px, 5vw, 78px) !important;
  padding: clamp(48px, 6vw, 82px) clamp(28px, 6vw, 96px) !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  text-align: center;
}

.about-copy {
  display: contents;
}

.about-copy .badge {
  order: 1;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--ink);
  font-size: clamp(46px, 8vw, 96px);
  line-height: 0.95;
  font-weight: 950;
  letter-spacing: 0;
}

.about-copy h2 {
  order: 2;
  max-width: 920px;
  color: var(--muted-ink);
  font-size: clamp(22px, 3vw, 38px);
  line-height: 1.22;
}

.about-stats {
  order: 3;
  width: min(100%, 980px);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.about-stat {
  min-height: 124px;
  border-color: var(--line-ui);
  background: color-mix(in srgb, var(--section-glass), transparent 4%);
  box-shadow: 0 18px 54px color-mix(in srgb, var(--shadow-ui), transparent 28%);
}

.about-copy p {
  order: 4;
  max-width: 880px;
}

.about-tags {
  order: 5;
  justify-content: center;
}

.about-link {
  order: 6;
  margin: 2px auto 0;
  color: var(--accent-contrast) !important;
  border-color: transparent;
  background: linear-gradient(135deg, var(--accent-ui), var(--accent-ui-2));
  box-shadow: 0 16px 34px color-mix(in srgb, var(--accent-ui), transparent 76%);
}

.workflow-section {
  width: 100% !important;
  max-width: none !important;
  margin-right: 0 !important;
  margin-left: 0 !important;
  padding:
    clamp(76px, 8vw, 124px)
    clamp(24px, 7vw, 112px) !important;
  border: 0 !important;
  border-radius: 0 !important;
  background:
    radial-gradient(circle at 12% 18%, var(--ambient-a), transparent 28%),
    radial-gradient(circle at 90% 10%, var(--ambient-b), transparent 28%),
    transparent !important;
  box-shadow: none !important;
}

.workflow-section .common-header,
.workflow-outer-wrap,
.workflow-section .btn-more-container {
  width: min(100%, 1360px);
  margin-right: auto;
  margin-left: auto;
}

.workflow-outer-wrap {
  padding: 0;
  overflow: visible;
}

.workflow-section .workflow-outer-wrap {
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.workflow-section .workflow-track {
  padding-right: 0;
  padding-left: 0;
}

.step-card,
.mini-card-horizontal,
.work-card,
.blog-card,
.tool-card,
.contact-card,
.contact-item,
.case-feature {
  border-color: var(--line-ui) !important;
  background: color-mix(in srgb, var(--section-glass), transparent 6%) !important;
  box-shadow: 0 18px 54px color-mix(in srgb, var(--shadow-ui), transparent 32%);
}

.contact-card {
  border: 0 !important;
}

.case-feature,
.work-card,
.blog-card,
.tool-card,
.contact-card {
  border-radius: 8px;
}

@media (max-width: 1180px) {
  .hero-section {
    padding-right: clamp(24px, 6vw, 64px) !important;
    padding-left: clamp(24px, 6vw, 64px) !important;
  }

  .about-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .section-container,
  .about-panel {
    width: 100% !important;
  }

  .hero-section {
    min-height: auto;
    padding: 42px 16px 58px !important;
  }

  .about-panel,
  .workflow-section {
    padding-right: 16px !important;
    padding-left: 16px !important;
  }

  .about-stats {
    grid-template-columns: 1fr;
  }
}

/* Continuation polish: remove numbering, unify headings, and make lower sections immersive. */
[data-section-no]::after,
.step-num,
.eyebrow,
.common-header .badge,
.about-tags,
.about-stat small,
.case-feature-copy span,
.case-feature-copy b,
.work-card .cat,
.work-card .eng-title,
.blog-meta {
  display: none !important;
}

.home-container {
  --section-max: 1180px;
  --panel-radius: 28px;
  --section-title-size: clamp(40px, 5vw, 72px);
  --section-subtitle-size: clamp(16px, 1.35vw, 19px);
  --button-bg: linear-gradient(135deg, var(--accent-ui), var(--accent-ui-2));
  --button-shadow: 0 18px 44px color-mix(in srgb, var(--accent-ui), transparent 76%);
}

:global(html.dark .home-container) {
  --section-glass: rgba(12, 18, 34, 0.34);
  --section-glass-strong: rgba(18, 26, 48, 0.72);
}

.hero-section {
  padding-bottom: clamp(64px, 7vw, 110px) !important;
  background: transparent !important;
}

:global(html.dark .hero-section),
:global(html:not(.dark) .hero-section) {
  background: transparent !important;
}

.marquee,
.section-container,
.about-panel,
.workflow-section,
.contact-section {
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.section-container::before,
.about-panel::before,
.workflow-section::before,
.contact-section::before,
.marquee::before,
.marquee::after {
  display: none !important;
}

.contact-card::before,
.contact-card::after {
  display: none !important;
}

.marquee {
  margin: 0 !important;
  padding: clamp(58px, 7vw, 104px) 0 clamp(54px, 6vw, 92px);
  overflow: hidden;
}

.marquee-heading,
.common-header,
.contact-left {
  width: min(calc(100% - 48px), 900px);
  margin-right: auto !important;
  margin-left: auto !important;
  text-align: center !important;
}

.marquee-heading {
  margin-bottom: clamp(32px, 4vw, 58px);
}

.marquee-heading h2,
.common-header h3,
.contact-left h3,
.about-copy .badge {
  margin: 0;
  padding-top: 0 !important;
  border: 0 !important;
  color: var(--ink);
  font-size: var(--section-title-size) !important;
  line-height: 1.05 !important;
  font-weight: 950 !important;
  letter-spacing: 0 !important;
  text-align: center !important;
}

.marquee-heading p,
.common-header p,
.contact-left p,
.about-copy h2,
.about-copy p {
  max-width: 760px;
  margin: 18px auto 0 !important;
  color: var(--muted-ink) !important;
  font-size: var(--section-subtitle-size) !important;
  line-height: 1.8 !important;
  font-weight: 650 !important;
  text-align: center !important;
}

.marquee-track {
  gap: clamp(42px, 6vw, 96px) !important;
  align-items: center;
  animation-duration: 34s !important;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.marquee span {
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: color-mix(in srgb, var(--ink), transparent 46%) !important;
  font-size: clamp(18px, 2vw, 30px) !important;
  font-weight: 950 !important;
  letter-spacing: 0 !important;
  opacity: 0.66;
}

.section-container,
.about-panel {
  width: min(calc(100% - 48px), var(--section-max)) !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: clamp(72px, 8vw, 124px) !important;
  padding-bottom: clamp(72px, 8vw, 124px) !important;
}

.common-header {
  display: block !important;
  margin-bottom: clamp(30px, 4vw, 56px) !important;
}

.about-panel {
  width: min(calc(100% - 48px), 1080px) !important;
}

.about-copy h2 {
  max-width: 820px;
}

.about-stats {
  width: min(100%, 920px) !important;
}

.about-stat {
  border-radius: var(--panel-radius);
}

.btn-view-more,
.about-link {
  min-height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 28px !important;
  border: 0 !important;
  border-radius: 999px !important;
  color: var(--accent-contrast) !important;
  background: var(--button-bg) !important;
  box-shadow: var(--button-shadow) !important;
  font-size: 15px !important;
  font-weight: 900 !important;
  letter-spacing: 0 !important;
}

.btn-view-more:hover,
.about-link:hover {
  transform: translateY(-2px);
  filter: saturate(1.08) brightness(1.02);
}

#works.section-container {
  width: min(calc(100% - 48px), 1180px) !important;
}

.filter-row {
  width: min(100%, 760px);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 0 auto clamp(34px, 4vw, 56px);
  padding: 8px;
  border: 1px solid color-mix(in srgb, var(--line-ui), transparent 12%);
  border-radius: 999px;
  background: color-mix(in srgb, var(--section-glass-strong), transparent 16%);
  box-shadow: 0 20px 70px color-mix(in srgb, var(--shadow-ui), transparent 46%);
}

.filter-button {
  min-height: 52px;
  border: 0 !important;
  border-radius: 999px !important;
  color: var(--muted-ink) !important;
  background: transparent !important;
  font-size: 15px !important;
  font-weight: 950 !important;
  letter-spacing: 0 !important;
}

.filter-button.active {
  color: var(--accent-contrast) !important;
  background: linear-gradient(135deg, var(--accent-ui), var(--accent-ui-2)) !important;
  box-shadow: 0 16px 34px color-mix(in srgb, var(--accent-ui), transparent 70%);
}

.case-feature {
  width: min(100%, 980px);
  min-height: 430px;
  display: grid !important;
  grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr);
  gap: 0;
  margin: 0 auto 24px;
  overflow: hidden;
  border-radius: 32px !important;
  background: color-mix(in srgb, var(--section-glass-strong), transparent 4%) !important;
}

.case-feature-media {
  min-height: 430px;
  padding: clamp(22px, 3vw, 36px);
}

.case-feature-media img {
  width: 100%;
  height: 100%;
  border-radius: 22px;
  object-fit: cover;
}

.case-feature-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(30px, 5vw, 62px);
  text-align: left;
}

.case-feature-copy h4 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(28px, 3.4vw, 48px);
  line-height: 1.08;
  font-weight: 950;
}

.case-feature-copy p {
  margin-top: 18px;
  color: var(--muted-ink) !important;
  font-size: 16px !important;
  line-height: 1.8 !important;
}

.work-grid {
  width: min(100%, 980px);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 0 auto;
}

.work-card {
  min-height: 240px;
  border-radius: 24px !important;
  overflow: hidden;
}

.work-card .info {
  padding: 18px;
  border-top: 0 !important;
  background: transparent !important;
}

.work-card h4 {
  margin: 0;
  font-size: 18px;
  line-height: 1.35;
}

.workflow-section {
  width: 100% !important;
  max-width: none !important;
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.workflow-section .common-header,
.workflow-section .btn-more-container {
  width: min(calc(100% - 48px), 900px) !important;
}

.workflow-outer-wrap {
  width: 100% !important;
  max-width: none !important;
  height: auto !important;
  margin-top: 0 !important;
  overflow: hidden !important;
}

.workflow-track {
  width: max-content !important;
  height: auto !important;
  gap: 18px !important;
  padding: 8px 0 28px !important;
  transform: none !important;
  transition: none !important;
  animation: workflowLoop 42s linear infinite;
}

.workflow-outer-wrap:hover .workflow-track {
  animation-play-state: paused;
}

.workflow-outer-wrap.paused .workflow-track {
  animation-play-state: paused !important;
}

.step-card {
  flex: 0 0 min(78vw, 360px) !important;
  min-height: 360px;
  justify-content: center;
  border-radius: 30px !important;
  padding: 30px !important;
}

.step-card h3 {
  font-size: 24px !important;
  line-height: 1.18 !important;
}

.step-card p {
  margin-top: 14px !important;
  font-size: 15px !important;
}

.aigc-mini-grid-horizontal {
  margin-top: 24px;
}

.mini-card-horizontal {
  border-radius: 16px !important;
}

.contact-section {
  width: 100% !important;
  max-width: none !important;
  padding-right: 24px !important;
  padding-left: 24px !important;
}

.contact-card {
  width: min(100%, 1080px);
  display: grid !important;
  grid-template-columns: 1fr;
  gap: clamp(28px, 4vw, 52px);
  margin: 0 auto;
  padding: clamp(70px, 7vw, 108px) 0 !important;
  text-align: center;
}

.contact-grid {
  display: flex !important;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px !important;
}

.contact-item {
  width: auto;
  min-height: 58px;
  gap: 12px;
  padding: 8px 18px 8px 10px !important;
  border-radius: 999px !important;
  color: var(--ink) !important;
}

.contact-item .c-icon {
  width: 42px;
  height: 42px;
  display: inline-grid;
  place-items: center;
  border-radius: 999px;
  background: color-mix(in srgb, var(--ink), transparent 88%);
}

.contact-item .c-icon svg {
  width: 22px;
  height: 22px;
}

.contact-item .c-text {
  font-weight: 900;
}

.contact-item .c-arrow {
  display: none;
}

@keyframes workflowLoop {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 920px) {
  .filter-row {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    border-radius: 999px;
  }

  .case-feature {
    grid-template-columns: 1fr;
  }

  .case-feature-copy {
    text-align: center;
  }

  .work-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .marquee-heading,
  .common-header,
  .contact-left,
  .section-container,
  .about-panel {
    width: min(calc(100% - 32px), var(--section-max)) !important;
  }

  .marquee-heading h2,
  .common-header h3,
  .contact-left h3,
  .about-copy .badge {
    font-size: clamp(36px, 10vw, 54px) !important;
  }

  .filter-row {
    width: min(100%, 420px);
  }

  .contact-section {
    padding-right: 16px !important;
    padding-left: 16px !important;
  }
}
/* -------------------- 2026-06 performance and showcase refinement -------------------- */
.hero-section {
  transform: none !important;
}

.hero-console,
.hero-console.studio,
.stage-panel,
.filter-row {
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}

.stage-image img {
  filter: none !important;
  will-change: transform;
  transition: transform 0.18s ease-out !important;
}

.about-stat,
.workflow-detail,
.work-card,
.blog-card,
.tool-card,
.contact-item,
.case-feature,
.metric-card {
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}

.hero-console.studio.showcase {
  position: relative;
  width: min(100%, 480px);
  min-height: 560px;
  display: grid;
  align-content: center;
  gap: 18px;
  padding: 0;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  transform: none !important;
  perspective: none !important;
}

.showcase-badge {
  position: absolute;
  z-index: 3;
  top: 22px;
  right: 18px;
  display: grid;
  gap: 2px;
  min-width: 116px;
  padding: 12px 16px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 34%);
  border-radius: 8px;
  color: var(--accent-contrast);
  background: var(--accent);
  box-shadow: 0 18px 42px color-mix(in srgb, var(--accent), transparent 66%);
}

.showcase-badge strong {
  font-size: clamp(30px, 4vw, 48px);
  line-height: 0.92;
  font-weight: 950;
}

.showcase-badge span {
  font-size: 12px;
  font-weight: 900;
}

.showcase-card {
  position: relative;
  min-height: 236px;
  overflow: hidden;
  border: 1px solid var(--hero-line);
  border-radius: 8px;
  color: var(--hero-text);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 24px 60px color-mix(in srgb, var(--shadow-ui), transparent 48%);
  transform: translateY(0);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.dark .showcase-card {
  background: rgba(16, 23, 42, 0.88);
}

.showcase-card:hover {
  border-color: color-mix(in srgb, var(--accent), transparent 46%);
  box-shadow: 0 30px 72px color-mix(in srgb, var(--shadow-ui), transparent 38%);
  transform: translateY(-6px);
}

.showcase-card-2 {
  margin-left: clamp(22px, 6vw, 72px);
}

.showcase-card img {
  width: 100%;
  height: 100%;
  min-height: 236px;
  display: block;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 0.28s ease;
}

.showcase-card:hover img {
  transform: scale(1.04);
}

.showcase-copy {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  gap: 6px;
  padding: 72px 20px 18px;
  color: #fff;
  background: linear-gradient(180deg, transparent, rgba(15, 23, 42, 0.84));
}

.showcase-copy span {
  font-size: 12px;
  font-weight: 900;
}

.showcase-copy h3 {
  margin: 0;
  font-size: clamp(20px, 2vw, 28px);
  line-height: 1.12;
  font-weight: 950;
}

.showcase-copy p {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  font-weight: 700;
  opacity: 0.88;
}

.marquee-track {
  gap: 2em !important;
}

.marquee span {
  display: inline-flex;
  align-items: center;
  gap: 2em;
  color: var(--accent) !important;
  font-size: 18px !important;
  letter-spacing: 0 !important;
  opacity: 0.92 !important;
}

.marquee span::after {
  content: "|";
  color: var(--accent);
  opacity: 0.62;
}

.about-stats {
  width: min(100%, 760px) !important;
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 16px !important;
}

.about-stat {
  min-height: 154px !important;
  display: grid;
  align-content: center;
  gap: 8px;
  border-radius: 8px !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}

.about-stat .stat-val {
  font-size: clamp(44px, 6vw, 72px) !important;
  line-height: 0.92 !important;
  font-weight: 950 !important;
}

.about-stat .stat-lbl {
  font-size: 12px !important;
  line-height: 1.35 !important;
  font-weight: 850 !important;
}

.filter-row {
  width: auto !important;
  max-width: calc(100% - 32px);
  display: inline-flex !important;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px !important;
  margin-right: auto !important;
  margin-left: auto !important;
  padding: 4px !important;
  border: 1px solid var(--vp-c-divider) !important;
  border-radius: 999px !important;
  background: var(--vp-c-bg-soft) !important;
  box-shadow: none !important;
}

.filter-button {
  min-height: 42px !important;
  border: 0 !important;
  border-radius: 999px !important;
}

.filter-button.active {
  color: #fff !important;
  background: linear-gradient(135deg, var(--accent-ui), var(--accent-ui-2)) !important;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--accent), transparent 50%) !important;
}

.step-card {
  position: relative;
  overflow: hidden;
}

.step-card > * {
  position: relative;
  z-index: 1;
}

.step-card::after {
  content: attr(data-signal);
  position: absolute;
  right: 18px;
  bottom: 4px;
  z-index: 0;
  color: color-mix(in srgb, var(--accent), transparent 88%);
  font-size: clamp(76px, 10vw, 132px);
  line-height: 0.78;
  font-weight: 950;
  pointer-events: none;
}

.blog-left {
  width: 200px !important;
  min-width: 200px !important;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;
}

.blog-left img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.contact-section {
  border-top: 1px solid var(--line-strong) !important;
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent), transparent 92%) 0%,
      var(--vp-c-bg-soft) 60%
    ) !important;
}

@media (max-width: 920px) {
  .hero-console.studio.showcase {
    width: min(100%, 620px);
    min-height: auto;
    margin: 0 auto;
  }

  .showcase-card-2 {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .showcase-badge {
    top: 12px;
    right: 12px;
    min-width: 96px;
  }

  .showcase-card {
    min-height: 220px;
  }

  .showcase-card img {
    min-height: 220px;
  }

  .about-stats {
    gap: 10px !important;
  }

  .about-stat {
    min-height: 132px !important;
    padding: 18px 12px !important;
  }

  .filter-row {
    border-radius: 18px !important;
  }

  .filter-button {
    flex: 1 1 calc(50% - 4px);
  }

  .blog-left {
    width: 100% !important;
    min-width: 0 !important;
  }
}
</style>
