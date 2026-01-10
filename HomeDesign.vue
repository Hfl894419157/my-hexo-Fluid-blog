<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// === 1. 精选作品数据 ===
const selectedWorks = [
  { id: 1, title: 'AI 赛博时尚全案', titleEn: 'AI FASHION BRANDING', category: 'BRANDING', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80', link: '/portfolio/brand-design' },
  { id: 2, title: 'Web3 数据可视化', titleEn: 'WEB3 DATA VISUALIZATION', category: 'UI DESIGN', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', link: '/portfolio/3d-viz' },
  { id: 3, title: '智能座舱 HMI', titleEn: 'SMART COCKPIT', category: 'CAR UI', img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80', link: '/portfolio/smart-home' },
  { id: 4, title: '动态字体设计', titleEn: 'KINETIC TYPOGRAPHY', category: 'MOTION', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', link: '/portfolio/mobile-app' },
  { id: 5, title: '金融 App 重构', titleEn: 'FINTECH APP', category: 'APP DESIGN', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80', link: '/portfolio/magazine' },
  { id: 6, title: 'SaaS 后台系统', titleEn: 'SAAS DASHBOARD', category: 'B-END', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', link: '/portfolio/ai-video' }
]

// === 2. AIGC 实验室数据 ===
const aigcWorks = [
  { id: 1, title: '虚拟人像生成', category: 'Stable Diffusion', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80', link: '/aigc/avatar' },
  { id: 2, title: '概念建筑设计', category: 'Midjourney', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', link: '/aigc/arch' },
  { id: 3, title: '3D 玻璃图标', category: 'Nijijourney', img: 'https://images.unsplash.com/photo-1633412803867-0f4abe186832?w=600&q=80', link: '/aigc/icon' },
  { id: 4, title: '赛博朋克场景', category: 'Midjourney v6', img: 'https://images.unsplash.com/photo-1614728853913-a36237e3d234?w=600&q=80', link: '/aigc/cyberpunk' },
  { id: 5, title: 'AI 产品渲染', category: 'Stable Diffusion XL', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', link: '/aigc/product' },
  { id: 6, title: '游戏资产生成', category: 'Game Asset', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80', link: '/aigc/game' }
]

// === 3. 文章博客数据 ===
const blogPosts = [
  { 
    id: 1, 
    title: '2026 设计趋势展望：AI 如何重塑工作流', 
    desc: '探讨生成式 AI 工具如何从辅助创作转变为核心生产力，以及设计师如何在这个变革中找到新的定位。',
    date: '2026.01.15',
    likes: '1.2k',
    comments: '86',
    img: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?w=800&q=80&fit=crop&ar=16:9',
    link: '/blog/design-trends-2026'
  },
  { 
    id: 2, 
    title: 'Midjourney v6.5 提示词进阶指南', 
    desc: '深入解析最新的光影控制与构图参数，通过 20 个实战案例，教你如何精准控制画面细节，输出电影级图像。',
    date: '2026.01.10',
    likes: '856',
    comments: '42',
    img: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&q=80&fit=crop&ar=16:9',
    link: '/blog/mj-guide'
  },
  { 
    id: 3, 
    title: 'Web3 界面设计中的视觉隐喻', 
    desc: '去中心化应用（DApp）的交互设计逻辑与传统 Web2 有何不同？本文从视觉语言角度进行深度剖析。',
    date: '2026.01.05',
    likes: '530',
    comments: '28',
    img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80&fit=crop&ar=16:9',
    link: '/blog/web3-ui'
  }
]

// === 4. 创作资源数据 ===
const tools = [
  { id: 1, name: 'Midjourney Prompt', desc: '高级咒语生成器 v2.0', icon: '🎨', link: '/resources/mj-prompt' },
  { id: 2, name: 'Stable Diffusion LoRA', desc: '通用人像模型包', icon: '🤖', link: '/resources/lora' },
  { id: 3, name: '3D Glass Icons', desc: 'C4D 玻璃图标源文件', icon: '💎', link: '/resources/icons' },
  { id: 4, name: 'Figma AI UI Kit', desc: '赛博风格组件库', icon: '📐', link: '/resources/uikit' },
  { id: 5, name: 'Notion Template', desc: '设计师项目管理模版', icon: '📝', link: '/resources/notion' },
  { id: 6, name: 'Design E-Book', desc: 'AIGC 设计白皮书 PDF', icon: '📚', link: '/resources/ebook' },
]

// === 5. 简历数据 ===
const resumeStats = [
  { label: '多年工作经验', value: '5+' },
  { label: '成功交付项目', value: '120+' },
  { label: '客户满意度', value: '99%' },
]

// === 6. 联系方式数据 ===
const contactLinks = [
  { 
    id: 'wechat',
    name: 'WeChat', 
    iconSvg: '<svg t="1768037070303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11356" width="200" height="200"><path d="M249.173333 335.872c0 10.922667 4.437333 21.504 11.946667 29.013333 7.509333 7.509333 18.432 11.946667 29.013333 11.946667 10.922667 0 21.504-4.437333 29.013333-11.946667 7.509333-7.509333 11.946667-18.432 11.946667-29.013333 0-10.922667-4.437333-21.504-11.946667-29.013333-7.509333-7.509333-18.432-11.946667-29.013333-11.946667-10.922667 0-21.504 4.437333-29.013333 11.946667C253.610667 314.368 249.173333 325.290667 249.173333 335.872L249.173333 335.872zM249.173333 335.872" fill="#16bc21" p-id="11357"></path><path d="M569.344 548.864c0 8.533333 3.413333 16.725333 9.557333 22.869333 5.802667 5.802667 14.336 9.557333 22.869333 9.557333 8.533333 0 16.725333-3.413333 22.869333-9.557333 5.802667-5.802667 9.557333-14.336 9.557333-22.869333 0-8.533333-3.413333-16.725333-9.557333-22.869333-5.802667-5.802667-14.336-9.557333-22.869333-9.557333-8.533333 0-16.725333 3.413333-22.869333 9.557333C573.098667 531.797333 569.344 540.330667 569.344 548.864L569.344 548.864zM569.344 548.864" fill="#16bc21" p-id="11358"></path><path d="M459.093333 335.872c0 10.922667 4.437333 21.504 11.946667 29.013333 7.509333 7.509333 18.432 11.946667 29.013333 11.946667 10.922667 0 21.504-4.437333 29.013333-11.946667 7.509333-7.509333 11.946667-18.432 11.946667-29.013333 0-10.922667-4.437333-21.504-11.946667-29.013333-7.509333-7.509333-18.432-11.946667-29.013333-11.946667-10.922667 0-21.504 4.437333-29.013333 11.946667C463.530667 314.368 459.093333 325.290667 459.093333 335.872L459.093333 335.872zM459.093333 335.872" fill="#16bc21" p-id="11359"></path><path d="M842.069333 27.306667 181.930667 27.306667C94.549333 27.306667 23.893333 98.304 23.893333 186.026667l0 659.456c0 87.722667 70.997333 158.72 158.378667 158.72l660.138667 0c87.381333 0 158.378667-70.997333 158.378667-158.72L1000.789333 186.026667C1000.448 98.304 929.450667 27.306667 842.069333 27.306667L842.069333 27.306667zM390.144 681.642667c-36.864 0-66.56-7.509333-103.765333-15.018667l-103.424 51.882667 29.696-89.088c-74.069333-51.882667-118.442667-118.442667-118.442667-200.021333 0-140.970667 133.461333-251.904 296.277333-251.904 145.749333 0 273.066667 88.746667 298.666667 207.872-9.557333-1.024-18.773333-1.706667-28.672-1.706667-140.629333 0-251.904 105.130667-251.904 234.496 0 21.504 3.413333 42.325333 9.216 62.122667C408.917333 681.301333 399.701333 681.642667 390.144 681.642667L390.144 681.642667zM827.050667 785.408l22.186667 74.069333-81.237333-44.373333c-29.696 7.509333-59.392 15.018667-88.746667 15.018667-140.970667 0-251.904-96.256-251.904-215.04 0-118.442667 110.933333-215.04 251.904-215.04 133.12 0 251.562667 96.597333 251.562667 215.04C930.816 681.642667 886.442667 741.034667 827.050667 785.408L827.050667 785.408zM827.050667 785.408" fill="#16bc21" p-id="11360"></path><path d="M730.794667 548.864c0 8.533333 3.413333 16.725333 9.557333 22.869333 5.802667 5.802667 14.336 9.557333 22.869333 9.557333 8.533333 0 16.725333-3.413333 22.869333-9.557333 5.802667-5.802667 9.557333-14.336 9.557333-22.869333 0-8.533333-3.413333-16.725333-9.557333-22.869333-5.802667-5.802667-14.336-9.557333-22.869333-9.557333-8.533333 0-16.725333 3.413333-22.869333 9.557333C734.208 531.797333 730.794667 540.330667 730.794667 548.864L730.794667 548.864zM730.794667 548.864" fill="#16bc21" p-id="11361"></path></svg>', 
    type: 'modal',
    text: 'WeChat: 添加微信',
    img: '/wechat.png' 
  },
  { 
    id: 'email',
    name: 'Email', 
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>', 
    type: 'link', 
    link: 'mailto:1442855983@qq.com',
    text: '1442855983@qq.com' 
  },
  { 
    id: 'xiaohongshu',
    name: 'Xiaohongshu', 
    iconSvg: '<svg t="1768037040037" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9445" width="200" height="200"><path d="M1021.72444445 836.54883555V187.48757333C1021.72444445 85.61550222 938.38449778 2.27555555 836.51242667 2.27555555H187.48757333C85.61550222 2.27555555 2.27555555 85.61550222 2.27555555 187.48757333v649.06126222c0 100.85262222 81.70154667 183.57361778 182.2264889 185.1756089h654.9959111c100.48853333-1.60199111 182.22648889-84.28657778 182.2264889-185.1756089" fill="#FF2442" p-id="9446"></path><path d="M726.52117333 366.36444445h57.344v20.53461333c0 1.6384 0.80099555 2.40298667 2.36657778 2.36657777 34.00590222-1.01944889 68.26666667 0.07281778 85.81575111 34.95253334 10.44935111 20.68024889 8.30122667 52.13752889 7.71868445 76.82275556-0.03640889 1.45635555 0.65536 2.25735111 2.03889778 2.40298666 4.00497778 0.36408889 7.90072889 0.72817778 11.68725333 1.20149334 67.61130667 8.11918222 54.24924445 71.87114667 54.46769777 121.96977777 0.10922667 17.47626667-1.85685333 30.25578667-5.82542222 38.41137778-8.37404445 16.89372445-23.37450667 26.57848889-45.00138666 28.98147555H854.97173333l-21.55406222-50.02581333a1.6384 1.6384 0 0 1 0.10922667-1.52917333 1.56558222 1.56558222 0 0 1 1.31072-0.72817778l45.72956444-0.03640889c2.54862222 0 4.95160889-1.09226667 6.69923556-2.98552889a10.12167111 10.12167111 0 0 0 2.69425777-7.02691555c-0.21845333-15.29173333-0.32768-30.54705778-0.25486222-45.80238223 0-13.72615111-6.48078222-20.75306667-19.55157333-21.11715555-14.78200889-0.36408889-42.78044445-0.36408889-84.03171555 0.07281778-1.45635555 0-2.18453333 0.80099555-2.18453334 2.36657777l-0.21845333 126.81216H726.44835555l-0.18204444-127.35829333a2.25735111 2.25735111 0 0 0-2.22094222-2.33016889h-53.52106667a2.54862222 2.54862222 0 0 1-2.47580444-2.54862222l0.07281777-55.41432889c0-1.85685333 0.87381333-2.80348445 2.62144-2.80348444l52.90211556 0.10922667a2.51221333 2.51221333 0 0 0 1.82044444-0.80099556 2.76707555 2.76707555 0 0 0 0.72817778-1.89326222v-47.91409778a3.16757333 3.16757333 0 0 0-3.05834666-3.24039111l-32.65877334 0.14563555c-1.71121778 0-2.54862222-0.91022222-2.54862222-2.69425778l-0.10922666-55.7056c0-1.6384 0.72817778-2.43939555 2.36657777-2.43939555h33.82385778c1.45635555 0 2.18453333-0.72817778 2.18453333-2.29376l0.36408889-20.46179555z m59.38289778 137.37073777l35.57148444-0.07281777c0.58254222 0 1.12867555-0.25486222 1.52917334-0.6917689a2.29376 2.29376 0 0 0 0.61895111-1.6019911l-0.18204445-44.52807112c0-3.49525333-2.54862222-6.33514667-5.64337777-6.33514666l-28.54456889 0.07281778a5.35210667 5.35210667 0 0 0-4.00497778 1.89326222 6.80846222 6.80846222 0 0 0-1.6384 4.55111111l0.18204444 44.52807111c0 1.23790222 0.98304 2.18453333 2.11171556 2.18453333zM417.95584 507.74016c-13.83537778 0.25486222-38.84828445 4.11420445-44.30961778-13.68974222-3.31320889-10.63139555 4.18702222-25.44981333 8.73813333-35.82634667 12.96156445-29.52760889 25.66826667-59.16444445 38.15651556-88.91050666 0.50972445-1.20149333 1.38353778-1.82044445 2.62144-1.82044445h54.72256c0.47331555 0 0.87381333 0.25486222 1.09226667 0.65536a1.45635555 1.45635555 0 0 1 0.14563555 1.31072l-31.67573333 74.01927111c-0.72817778 1.71121778-0.54613333 3.64088889 0.40049778 5.24288a5.17006222 5.17006222 0 0 0 4.36906667 2.47580444h46.89464888c0.58254222 0 1.09226667 0.29127111 1.41994667 0.76458667 0.29127111 0.50972445 0.36408889 1.09226667 0.10922667 1.6384-13.54410667 31.56650667-27.05180445 62.91456-40.52309334 94.04416-1.34712889 3.09475555-1.92967111 5.38851555-1.71121778 6.84487111 0.47331555 3.16757333 2.25735111 4.76956445 5.31569778 4.80597334l29.67324445 0.18204444c1.71121778 0.03640889 2.25735111 0.87381333 1.56558222 2.54862222l-19.18748445 45.14702222a3.78652445 3.78652445 0 0 1-3.64088888 2.51221334c-30.14656 0.36408889-51.22730667 0.36408889-63.24224-0.18204444-19.87925333-0.91022222-24.75804445-18.31367111-17.03936-36.26325334l27.27025778-63.64273778a1.38353778 1.38353778 0 0 0-0.10922667-1.23790222 1.23790222 1.23790222 0 0 0-1.09226667-0.61895111zM190.58232889 694.00803555h-21.48124444l-21.04433778-49.40686222a1.60199111 1.60199111 0 0 1 0.10922666-1.49276444 1.45635555 1.45635555 0 0 1 1.23790222-0.72817778l29.70965334-0.07281778a6.95409778 6.95409778 0 0 0 6.80846222-7.09973333l0.80099556-262.03477333a2.54862222 2.54862222 0 0 1 2.51221333-2.62144h51.11808c2.40298667 0 3.60448 1.27431111 3.64088889 3.78652444 0.21845333 88.72846222 0.21845333 175.92775111 0 261.63427556-0.14563555 35.17098667-16.45681778 59.20085333-53.41184 58.03576888z" fill="#FFFFFF" p-id="9447"></path><path d="M670.08739555 694.00803555h-193.91374222l25.99594667-58.6183111a3.45884445 3.45884445 0 0 1 3.38602667-2.22094223l47.47719111 0.07281778c1.67480889 0 2.54862222-0.83740445 2.54862222-2.54862222v-177.85742223c0-1.52917333-0.72817778-2.29376-2.18453333-2.29376l-31.49368889-0.03640888c-1.41994667 0-2.54862222-1.23790222-2.54862223-2.73066667v-57.05272889c0-0.87381333 0.65536-1.60199111 1.49276445-1.60199111h128.37774222c1.60199111 0 2.36657778 0.83740445 2.36657778 2.51221333l0.07281778 56.43377778c0 1.6384-0.80099555 2.47580445-2.40298667 2.47580444h-31.74855111c-1.45635555 0-2.18453333 0.76458667-2.18453333 2.29376v177.74819556c0 1.71121778 0.83740445 2.54862222 2.43939555 2.54862222l50.31708445 0.10922667c1.38353778 0 2.07530667 0.72817778 2.07530666 2.18453333L670.08739555 694.04444445zM901.02897778 394.65415111c39.61287111-27.23384889 67.50208 42.19790222 24.10268444 54.10360889-7.06332445 1.96608-18.31367111 2.07530667-33.71463111 0.36408889-1.38353778-0.14563555-2.03889778-0.91022222-2.03889778-2.36657778-0.21845333-16.384-3.45884445-41.72458667 11.65084445-52.06471111zM354.20387555 598.79879111l-26.2144 61.05770667c-2.36657778 5.46133333-4.95160889 5.57056-7.8279111 0.43690667-19.29671111-34.87971555-25.85031111-63.35146667-29.63683556-106.71445334-2.91271111-33.67822222-5.42492445-67.35644445-7.60945778-101.10748444-0.07281778-1.52917333 0.61895111-2.29376 2.07530667-2.29376l53.12056889 0.03640888c1.49276445 0 2.33016889 0.80099555 2.43939555 2.3301689 2.73066667 39.24878222 5.60696889 78.38833778 8.59249778 117.41866666 0.76458667 10.04885333 2.47580445 18.38648889 5.09724445 25.01290667a4.73315555 4.73315555 0 0 1-0.0364089 3.82293333zM75.09333333 596.54144v-2.51221333a25.70467555 25.70467555 0 0 0 4.73315556-11.50520889c3.93216-43.32657778 7.13614222-86.61674667 9.64835556-129.94332445 0.10922667-1.34712889 0.76458667-2.03889778 2.03889777-2.03889778h54.24924445c0.47331555 0 0.94663111 0.21845333 1.31072 0.61895112 0.32768 0.36408889 0.50972445 0.87381333 0.47331555 1.38353778a7226.07217778 7226.07217778 0 0 1-9.57553777 119.67601777c-2.54862222 28.94506667-11.79648 67.68412445-31.1296 91.16785778-1.23790222 1.49276445-2.29376 1.34712889-3.09475556-0.47331555L75.09333333 596.54144zM445.08046222 694.00803555h-78.57038222l-10.01244445-3.96856888c-1.41994667-0.54613333-1.82044445-1.52917333-1.16508444-2.94912l24.64881778-56.43377778c0.72817778-1.6384 1.89326222-2.25735111 3.56807111-1.82044444 26.94257778 7.31818667 58.14499555 4.29624889 85.70652445 4.40547555 1.71121778 0.03640889 2.18453333 0.87381333 1.45635555 2.47580445l-25.63185778 58.25422222z" fill="#FFFFFF" p-id="9448"></path></svg>', 
    type: 'link', 
    link: 'https://www.xiaohongshu.com/user/profile/63ea416a000000002600564f?xsec_token=YBNNi5D_b-H9A2JCz6H0Rgh9xj8_QoF3FuoP5SNWCQyuo=&xsec_source=app_share&&apptime=1768035439&shareRedId=ODlHQTc2Oko2NzUyOTgwNjg5OTc5OzpP&share_id=a0a0f5f1b48f45de95ad3f05be651cee&xhsshare=CopyLink',
    text: '小红书: 关注我' 
  },
  { 
    id: 'douyin',
    name: 'Douyin', 
    iconSvg: '<svg t="1768036989590" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8405" width="200" height="200"><path d="M855.52032 0H165.44032A165.696 165.696 0 0 0 0.00032 165.92v689.376a165.696 165.696 0 0 0 165.344 166.016h690.272a165.696 165.696 0 0 0 165.408-165.984V166.016A165.76 165.76 0 0 0 855.52032 0z" fill="#170B1A" p-id="8406"></path><path d="M511.42432 302.08c0.576-64.32 0-128.576 0.576-192.832h131.392c-0.576 11.328 1.152 22.72 2.88 33.6h-96.704v522.24a124.8 124.8 0 0 1-16 63.68 107.84 107.84 0 0 1-83.008 52.864 111.424 111.424 0 0 1-63.168-13.12 108.416 108.416 0 0 1-36.928-32.96c33.536 18.816 77.312 17.088 109.76-3.968A111.68 111.68 0 0 0 512.00032 638.272c-0.576-112.064-0.576-224.128-0.576-336.192z m216.768-36.992c18.176 11.392 38.656 20.48 59.712 25.024 12.544 2.88 25.024 4.032 38.08 4.032v29.568a187.36 187.36 0 0 1-97.792-58.56v-0.064z" fill="#25F4EE" p-id="8407"></path><path d="M274.75232 428.928a238.016 238.016 0 0 1 159.36-33.6v31.36c-14.72 0.576-29.376 2.272-43.84 5.12a249.44 249.44 0 0 0-97.92 43.84c-31.232 23.296-55.104 55.104-71.68 90.368a243.424 243.424 0 0 0-23.296 108.16c0 40.96 11.392 80.768 30.72 116.608 9.152 16.448 19.392 32.384 33.024 45.44a233.44 233.44 0 0 1-68.288-75.072 246.24 246.24 0 0 1-33.6-131.392 250.144 250.144 0 0 1 35.904-120 240.352 240.352 0 0 1 79.616-80.832z" fill="#25F4EE" p-id="8408"></path><path d="M549.56832 142.784h97.28c3.392 18.752 10.24 36.416 18.752 53.504 13.632 26.176 33.024 49.472 58.048 64.832 1.664 1.152 2.88 2.304 3.968 3.968a186.688 186.688 0 0 0 98.432 58.56c0.576 34.176 0 68.864 0 103.04a308.16 308.16 0 0 1-180.928-57.472c0 81.92 0 163.84 0.576 245.76 0 10.816 0.576 21.632 0 32.96a268.8 268.8 0 0 1-35.264 113.792 247.392 247.392 0 0 1-68.288 77.44 219.296 219.296 0 0 1-124.608 42.56c-22.72 0.64-45.44-0.512-67.648-5.632a243.52 243.52 0 0 1-87.04-38.08l-1.728-1.728a202.464 202.464 0 0 1-33.024-45.504 244.32 244.32 0 0 1-30.72-116.672 245.6 245.6 0 0 1 23.36-108.096c16.512-35.2 40.96-67.072 71.68-90.432a249.44 249.44 0 0 1 141.632-48.896c0.576 13.12 0 26.176 0.576 38.656v66.56a94.176 94.176 0 0 0-51.776-1.728 128.32 128.32 0 0 0-55.68 27.328c-9.824 8.448-17.952 18.688-23.936 30.144a112.16 112.16 0 0 0-11.392 63.744c2.432 21.216 11.168 41.216 25.024 57.472 9.088 11.328 21.056 19.904 33.024 27.84 9.664 13.632 22.144 25.024 36.928 33.024 19.392 10.24 41.536 14.72 63.168 13.12 34.112-2.304 65.984-23.36 83.072-52.992a124.8 124.8 0 0 0 15.936-63.68c1.152-175.232 0.576-349.312 0.576-523.392z" fill="#FFFFFF" p-id="8409"></path><path d="M646.84832 142.784c11.328 0.576 22.72 0 34.688 0 0 38.08 11.968 76.224 34.112 107.52 2.88 3.968 5.76 7.36 8.576 10.816-25.088-15.36-44.992-38.656-58.048-64.832a214.208 214.208 0 0 1-19.328-53.504z m179.2 180.928c12.48 2.88 24.96 3.968 38.08 3.968v132.544c-64.832 0.576-129.664-21.056-182.592-59.136v262.784a229.76 229.76 0 0 1-5.696 59.2 244.32 244.32 0 0 1-96.704 147.328c-25.92 18.56-55.36 31.744-86.464 38.656a240.448 240.448 0 0 1-113.792-1.664 239.776 239.776 0 0 1-115.52-69.44 234.016 234.016 0 0 0 87.104 38.08c22.144 5.184 44.928 6.336 67.648 5.76a219.296 219.296 0 0 0 124.608-42.688 254.784 254.784 0 0 0 68.288-77.376 269.024 269.024 0 0 0 35.2-113.792 319.072 319.072 0 0 0 0-32.96c-0.512-81.92-0.512-163.84-0.512-245.76a308.16 308.16 0 0 0 180.928 57.472c-0.576-34.176 0-68.8-0.576-102.976z" fill="#FE2C55" p-id="8410"></path><path d="M434.62432 426.112c12.544 0 25.6 0.576 38.08 2.24v136a103.872 103.872 0 0 0-57.408-2.304c-35.84 8-65.984 35.264-78.528 70.016-12.48 34.112-7.36 73.92 14.208 102.912a119.552 119.552 0 0 1-32.96-27.84 107.328 107.328 0 0 1-25.024-57.472 112.16 112.16 0 0 1 11.392-63.68c5.632-11.392 14.208-21.632 23.872-30.208 15.936-13.632 35.84-22.144 55.744-27.264a94.176 94.176 0 0 1 51.776 1.664V463.68c-1.152-11.36-0.576-24.48-1.152-37.536v-0.032z" fill="#FE2C55" p-id="8411"></path></svg>', 
    type: 'link', 
    link: '#', 
    text: '抖音: LiuliDesign' 
  }
]

// === 7. 交互逻辑 (回到顶部 + 微信弹窗) ===
const showBackToTop = ref(false)
const showModal = ref(false)
const modalImage = ref('')

const handleContactClick = (item) => {
  if (item.type === 'modal') {
    modalImage.value = item.img
    showModal.value = true
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
        <h1 class="hero-title">Liuli Design<br><span class="highlight">Product & AIGC</span></h1>
        <p class="hero-desc">探索生成式 AI 与设计的边界，<br>打造具有未来感的数字体验。</p>
        <div class="hero-actions">
          <a href="/portfolio/" class="btn primary">浏览作品</a>
          <a href="/about" class="btn secondary card-box-btn">关于我</a>
        </div>
      </div>
      <div class="hero-right">
        <div class="purple-gradient-bg"></div>
        <img class="hero-img floating" src="https://images.unsplash.com/photo-1633412803867-0f4abe186832?auto=format&fit=crop&w=800&q=80" alt="AIGC Art" />
      </div>
    </section>

    <section class="resume-bar card-box">
      <div class="resume-content">
        <div class="resume-intro">
          <h3>HI, I'M LIULI</h3>
          <p>资深产品设计师 / AIGC 创作者 / 品牌顾问</p>
        </div>
        <div class="resume-stats">
          <div v-for="(stat, index) in resumeStats" :key="index" class="stat-item">
            <span class="stat-val">{{ stat.value }}</span>
            <span class="stat-lbl">{{ stat.label }}</span>
          </div>
        </div>
        <a href="/resume" class="btn-resume">查看完整简历 →</a>
      </div>
    </section>

    <div class="section-container" id="works">
      <div class="common-header">
        <span class="badge">SELECTED</span>
        <h3>FEATURED WORKS</h3>
        <p>精选商业案例与设计探索</p>
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
    </div>

    <div class="section-container aigc-section">
      <div class="common-header">
        <span class="badge">NEW ERA</span>
        <h3>AIGC / CREATIVE LAB</h3>
        <p>打破想象力的边界，AI 驱动设计革新</p>
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
    </div>

    <div class="section-container">
      <div class="common-header">
        <span class="badge">INSIGHTS</span>
        <h3>LATEST ARTICLES</h3>
        <p>分享设计思考与技术沉淀</p>
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
    </div>

    <div class="section-container">
      <div class="common-header">
        <span class="badge">FREEBIES</span>
        <h3>DESIGN TOOLS</h3>
        <p>提升效率的精选设计资源</p>
      </div>
      <div class="tools-grid">
        <div v-for="tool in tools" :key="tool.id" class="tool-card card-box">
          <div class="tool-icon">{{ tool.icon }}</div>
          <div class="tool-info">
            <h4>{{ tool.name }}</h4>
            <p>{{ tool.desc }}</p>
          </div>
          <a :href="tool.link" class="btn-download">下载</a>
        </div>
      </div>
    </div>

    <div class="section-container contact-section">
      <div class="contact-card card-box">
        <div class="contact-left">
          <h3>Let's Connect</h3>
          <p>欢迎通过以下方式与我交流，<br>无论是项目合作还是技术探讨。</p>
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
  width: 100%; max-width: 1152px; margin: 0 auto; padding: 0 24px 100px; 
  color: var(--vp-c-text-1); 
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
.card-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1); 
}

/* === 标题通用 === */
.common-header { text-align: center; margin-bottom: 50px; }
.common-header h3 { font-size: 2.5rem; font-weight: 900; margin: 15px 0; background: linear-gradient(to right, #7C3AED, #8B5CF6, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.badge { background: #8B5CF6; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; letter-spacing: 1px; }
.common-header p { color: var(--vp-c-text-2); font-size: 1.1rem;}

/* HERO */
.hero-section { display: flex; align-items: center; justify-content: space-between; min-height: 500px; margin-bottom: 60px; padding-top: 40px; }
.hero-left { max-width: 500px; z-index: 2; }
.hero-title { font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 20px; color: var(--vp-c-text-1); }
.hero-title .highlight { background: linear-gradient(135deg, #8B5CF6 0%, #d8b4fe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-desc { font-size: 1.2rem; margin-bottom: 30px; line-height: 1.6; color: var(--vp-c-text-2); }
.hero-actions { display: flex; gap: 16px; }

/* 按钮 */
.btn { padding: 10px 30px; border-radius: 50px; font-weight: 600; text-decoration: none; transition: all 0.3s; display: inline-block; }
.btn.primary { background: #8B5CF6; color: white !important; box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4); }
.btn.primary:hover { transform: translateY(-2px); opacity: 0.9; }
.card-box-btn { background-color: var(--vp-c-bg-soft); color: var(--vp-c-text-1) !important; border: 1px solid var(--vp-c-divider); }
.card-box-btn:hover { border-color: #8B5CF6; color: #8B5CF6 !important; }

.hero-right { position: relative; width: 500px; height: 500px; display: flex; align-items: center; justify-content: center; }
.purple-gradient-bg { position: absolute; width: 100%; height: 100%; background: radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%); z-index: 0; filter: blur(20px); }
.hero-img { width: 80%; z-index: 1; animation: float 6s ease-in-out infinite; border-radius: 20px; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

/* 简历板块 */
.resume-bar { 
  margin-bottom: 60px; 
  padding: 100px 50px; 
  display: flex; align-items: center;
}
.resume-content { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 30px; width: 100%; }
.resume-intro h3 { font-size: 1.8rem; margin: 0 0 8px; font-weight: 800; letter-spacing: 1px; color: var(--vp-c-text-1); }
.resume-intro p { margin: 0; color: var(--vp-c-text-2); font-size: 1.1rem; }
.resume-stats { display: flex; gap: 50px; }
.stat-item { display: flex; flex-direction: column; }
.stat-val { font-size: 2rem; font-weight: 800; color: #8B5CF6; line-height: 1; }
.stat-lbl { font-size: 0.9rem; text-transform: uppercase; color: var(--vp-c-text-2); margin-top: 8px; font-weight: 600; }
.btn-resume { color: var(--vp-c-text-1); font-weight: 600; text-decoration: none; border-bottom: 2px solid #8B5CF6; padding-bottom: 2px; font-size: 1.1rem; transition: color 0.3s; }
.btn-resume:hover { color: #8B5CF6; }

/* 网格布局 */
.uniform-grid, .aigc-grid, .tools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

/* 作品 & AIGC 卡片 */
.work-card, .aigc-card { position: relative; display: flex; flex-direction: column; text-decoration: none !important; color: inherit; aspect-ratio: 4 / 3; }
.work-card:hover, .aigc-card:hover { border-color: #8B5CF6 !important; }
.img-wrap { width: 100%; height: 100%; position: relative; overflow: hidden; background: #333; } 
.img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.work-card:hover img, .aigc-card:hover img { transform: scale(1.05); }
.mask, .aigc-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); opacity: 0.6; transition: opacity 0.3s; }
.work-card:hover .mask, .aigc-card:hover .aigc-overlay { opacity: 0.8; }
.info, .aigc-info { position: absolute; bottom: 0; left: 0; width: 100%; padding: 24px; z-index: 2; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); }
.white-text { color: white !important; margin: 5px 0 0; font-size: 1.4rem; }
.cat, .tag { font-size: 12px; color: #d8b4fe; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
.eng-title { font-size: 0.8rem; color: rgba(255,255,255,0.8); margin: 0; text-transform: uppercase; }
.aigc-overlay { display: flex; align-items: center; justify-content: center; opacity: 0; z-index: 2; }
.icon { font-size: 2rem; color: white; transform: scale(0); transition: 0.3s; }
.aigc-card:hover .icon { transform: scale(1); }

/* 博客列表 */
.blog-list { display: flex; flex-direction: column; gap: 24px; }
.blog-card { 
  display: flex; flex-direction: row; 
  text-decoration: none !important; color: inherit; 
  height: 280px; 
}
.blog-card:hover { border-color: #8B5CF6 !important; }
.blog-left { width: 40%; position: relative; overflow: hidden; flex-shrink: 0; }
.blog-left img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.blog-card:hover .blog-left img { transform: scale(1.05); }
.blog-right { width: 60%; padding: 40px 30px; display: flex; flex-direction: column; justify-content: space-between; }
.blog-main h4 { margin: 0 0 15px; font-size: 1.5rem; font-weight: 700; color: var(--vp-c-text-1); line-height: 1.3; }
.blog-main p { margin: 0; font-size: 1rem; color: var(--vp-c-text-2); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.blog-meta { display: flex; gap: 12px; align-items: center; }
.meta-tag { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 600; color: var(--vp-c-text-2); background-color: var(--vp-c-bg); padding: 6px 12px; border-radius: 8px; border: 1px solid var(--vp-c-divider); }
.meta-tag svg { opacity: 0.7; }

/* 创作资源卡片 */
.tool-card { padding: 30px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 15px; }
.tool-card:hover { border-color: #8B5CF6 !important; }
.tool-icon { font-size: 2rem; background: rgba(139, 92, 246, 0.1); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 16px; margin-bottom: 5px; }
.tool-info h4 { margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--vp-c-text-1); }
.tool-info p { margin: 5px 0 0; font-size: 0.9rem; color: var(--vp-c-text-2); }
.btn-download { margin-top: 15px; background-color: #8B5CF6 !important; color: #FFFFFF !important; padding: 10px 0; width: 100%; border-radius: 8px; font-size: 0.9rem; text-decoration: none; font-weight: 600; transition: all 0.2s; display: block; }
.btn-download:hover { background-color: #7C3AED !important; opacity: 1; }

/* 联系我板块 */
.contact-card { display: flex; align-items: center; justify-content: space-between; padding: 60px 50px; }
.contact-left { max-width: 45%; }
.contact-left h3 { font-size: 2rem; font-weight: 800; margin: 0 0 15px; color: var(--vp-c-text-1); }
.contact-left p { font-size: 1.1rem; line-height: 1.6; color: var(--vp-c-text-2); margin: 0; }
.contact-right { width: 50%; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.contact-item { 
  display: flex; align-items: center; gap: 10px; padding: 15px 20px; 
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); 
  border-radius: 12px; text-decoration: none !important; color: var(--vp-c-text-1); cursor: pointer;
  transition: all 0.2s; 
}
.contact-item:hover { border-color: #8B5CF6; transform: translateX(5px); }
/* 修复 SVG 图标大小 */
.c-icon { width: 24px; height: 24px; display: block; flex-shrink: 0; }
:deep(.c-icon svg) { width: 100%; height: 100%; }

.c-text { font-weight: 600; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.c-arrow { color: #8B5CF6; opacity: 0; transition: opacity 0.2s; }
.contact-item:hover .c-arrow { opacity: 1; }

/* === 回到顶部按钮 === */
.back-to-top {
  position: fixed; bottom: 40px; right: 40px; width: 50px; height: 50px;
  border-radius: 50%; background-color: #8B5CF6; color: white;
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
  transition: all 0.3s ease; z-index: 100;
}
.back-to-top:hover {
  background-color: #7C3AED; transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* === 弹窗样式 === */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px);
  display: flex; align-items: center; justify-content: center; z-index: 999;
}
.modal-content {
  background: var(--vp-c-bg); padding: 30px; border-radius: 20px;
  position: relative; text-align: center; max-width: 90%;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.modal-img { max-width: 300px; border-radius: 12px; margin-bottom: 15px; }
.modal-close {
  position: absolute; top: 10px; right: 15px; font-size: 24px;
  background: none; border: none; cursor: pointer; color: var(--vp-c-text-2);
}
.modal-tip { color: var(--vp-c-text-2); font-size: 0.9rem; margin: 0; }
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s, transform 0.3s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.9); }

/* =================================================================
   📱 移动端完美适配 (Mobile Responsive) - 核心修复区域
   ================================================================= */
@media (max-width: 768px) {
  /* 1. 基础容器：减少左右边距 */
  .home-container { padding: 0 16px 80px; }
  .section-container { margin-top: 60px; }

  /* 2. Hero 区域：文字缩小 */
  .hero-section { flex-direction: column; text-align: center; padding-top: 20px; min-height: auto; margin-bottom: 40px; }
  .hero-title { font-size: 2.5rem; margin-bottom: 15px; }
  .hero-desc { font-size: 1rem; margin-bottom: 25px; padding: 0 10px; }
  .hero-right { width: 100%; height: 300px; margin-top: 30px; }

  /* 3. 简历板块：垂直排列，缩小字号 */
  .resume-bar { 
    padding: 40px 20px; /* 减小内边距 */
    flex-direction: column; 
    align-items: center; 
    text-align: center; 
  }
  .resume-intro h3 { font-size: 1.5rem; margin-bottom: 5px; }
  .resume-intro p { font-size: 0.9rem; margin-bottom: 20px; }
  /* 统计数据横排转竖排，或者缩小横排间距 */
  .resume-stats { 
    flex-direction: row; 
    justify-content: center; 
    gap: 20px; 
    width: 100%; 
    margin: 20px 0; 
    flex-wrap: wrap; /* 允许换行 */
  }
  .stat-val { font-size: 1.8rem; } /* 缩小数字 */
  .stat-lbl { font-size: 0.8rem; }

  /* 4. 通用标题：强制缩小 */
  .common-header h3, .aigc-header h3 { font-size: 1.8rem; margin: 10px 0; }
  .common-header p, .aigc-header p { font-size: 1rem; padding: 0 20px; }

  /* 5. 卡片网格：单列显示 */
  .uniform-grid, .aigc-grid, .tools-grid { grid-template-columns: 1fr; gap: 20px; }
  
  /* 6. 博客卡片：改为竖向 */
  .blog-card { flex-direction: column; height: auto; }
  .blog-left { width: 100%; height: 200px; }
  .blog-right { width: 100%; padding: 25px 20px; }
  .blog-main h4 { font-size: 1.25rem; } /* 缩小标题 */

  /* 7. 联系方式：单列堆叠 */
  .contact-card { padding: 40px 20px; flex-direction: column; text-align: center; gap: 30px; }
  .contact-left h3 { font-size: 1.6rem; }
  .contact-left, .contact-right { width: 100%; max-width: 100%; }
  .contact-grid { grid-template-columns: 1fr; gap: 12px; } /* 单列 */

  /* 8. 回到顶部按钮：稍微小一点 */
  .back-to-top { bottom: 20px; right: 20px; width: 45px; height: 45px; }
}
</style>