<script setup>
import { ref } from 'vue'

// === 1. 个人基础信息 ===
const profile = {
  name: '韩福利',
  role: '平面设计师 / 资深电商设计师 / 工业设计师 / 视频剪辑师',
  avatar: '/avatar.jpg', 
  summary: '工业设计科班出身，拥有8年平面、电商设计与视频剪辑实战经验。善于以“商业价值与用户需求”为核心，主导设计项目全流程。具备出色的视觉表现力、市场洞察力及跨媒体整合能力，能通过高转化率的设计方案直接驱动业务增长。其次具有视频产出的全流程能力；运营个人短视频账号，全网粉丝 1.5 万。'
}

// === 2. 联系方式 ===
const contacts = [
  { icon: '📞', text: '15686252702', link: 'tel:15686252702' },
  { icon: '📧', text: '1442855983@qq.com', link: 'mailto:1442855983@qq.com' },
  { icon: '📍', text: '甘肃省平凉市', link: '' }
]

// === 3. 教育背景 ===
const education = [
  { 
    school: '江西陶瓷工艺美院', 
    date: '2013 - 2016',
    major: '产品造型设计', 
    desc: '主修课程：工业设计史、产品造型设计、人机工程学、CAD工程制图、三维建模、平面/色彩构成' 
  }
]

// === 4. 核心技能 ===
const skills = [
  { name: '摄影剪辑', percent: 85 },
  { name: '平面设计', percent: 95 },
  { name: '电商设计', percent: 90 },
  { name: '工业设计', percent: 80 },
  { name: '短视频运营', percent: 75 }
]

// === 5. 专业软件 ===
const softwares = [
  'PS', 'AI', 'Rhino', 'C4D', 'CAD', 'CDR', 'Pr', '剪映', 'AI工具应用'
]

// === 6. 工作经历 ===
const experiences = [
  {
    company: '西安盖文电子科技有限公司',
    role: '设计主管 / 资深设计师',
    time: '2020 - 至今',
    details: [
      '电商设计与转化：负责亚马逊、阿里国际站、谷歌等平台产品详情页/钻展图设计，优化视觉层级后多款产品点击率升 30%+；2019年主导设计“呼吸机流量计”产品上架半月订单破300万。',
      '展会设计落地：统筹迪拜水展、德国展会全套物料（展位视觉、宣传册等），全程跟进落地，助力德国展会达成200万订单。',
      '视频内容产出：完成50+款产品摄影，用Premiere剪辑15-30秒宣传视频（AE加基础特效），短视频带来询盘有10%。'
    ]
  },
  {
    company: '西安军昂教育科技有限公司',
    role: 'UI设计',
    time: '2018.5',
    details: [
      '真正接触户外娱乐建筑设计工作将近一年，主要从最初的市场调研到产品定位等一系列环节，并在参与的单个户外运动项目上，月度营业额达到了400万。'
    ]
  },
  {
    company: '国际青年绿色创新设计联盟 (实习)',
    role: '平面设计',
    time: '2017.8',
    details: [
      '协助策划“绿色创新设计展”，参与展会物料设计（邀请函、展区导览图）与现场执行，保障展会顺利开展，积累跨部门协作经验。'
    ]
  },
  {
    company: '景德镇国际北欧中心 (兼职)',
    role: '平面设计',
    time: '2016.10',
    details: [
      '核心负责“国际北欧艺术节”的平面设计工作，完成活动海报、志愿者服装图案、展区标识等物料设计，风格贴合北欧“简约、自然”的审美，保障艺术节视觉统一；',
      '协助活动策划团队进行流程对接，确保设计物料按时交付，获“艺术节设计者工作者荣誉证书”。'
    ]
  }
]

// === 7. 项目经历 ===
const projects = [
  {
    name: '德国国际水处理技术展视觉体系项目',
    role: '主创设计师 | 2025年',
    desc: [
      '背景：公司参与国际顶级展会，需建立高端、专业的品牌形象以吸引全球客户。',
      '行动：独立完成从主KV、展位设计到宣传册的全套物料创意与设计，并远程协调德国当地搭建商，确保色彩、材质与设计效果完美落地。',
      '成果：统一的视觉形象获客户高度认可，现场收集高质量线索500余条，直接促成订单200万。'
    ]
  },
  {
    name: '呼吸机流量计电商视觉打造项目',
    role: '主创设计师 | 2019年',
    desc: [
      '背景：新款专业医疗产品上线，需通过视觉设计在竞争激烈的线上市场中建立信任、突出卖点。',
      '行动：进行竞品视觉分析，及产品调研，确定电商设计方向；运用Rhino进行产品3D渲染，在详情页中清晰展示产品结构与使用场景。',
      '成果：详情页上线半月内直接带动300万元销售额，页面点击率提升30%，该版设计被采纳为公司同类产品的标准设计模板。'
    ]
  }
]

// === 8. 所获荣誉 ===
const awards = [
  '2023年12月，获得西安盖文电子科技有限公司 “年度设计大赛第一名” 及奖金；',
  '2017年12月，获得江西景德镇 “自行车外形设计一等奖” 及奖金；',
  '2017年6月，获得校级 “二等奖学金”；',
  '2016年6月，获得 “国际北欧艺术节” 优秀设计者及志愿者证书；'
]
</script>

<template>
  <div class="resume-wrapper">
    <div class="resume-container">
      
      <aside class="resume-sidebar">
        <div class="profile-section">
          <div class="avatar-box">
            <img :src="profile.avatar" alt="Han Fuli" class="avatar-img" />
          </div>
          <h2 class="name">{{ profile.name }}</h2>
          <p class="role">{{ profile.role }}</p>
        </div>

        <div class="sidebar-divider"></div>

        <div class="sidebar-block">
          <h3 class="sidebar-title"><span class="icon">📞</span> 联系方式</h3>
          <ul class="contact-list">
            <li v-for="(item, index) in contacts" :key="index">
              <span class="c-icon">{{ item.icon }}</span>
              <span v-if="!item.link">{{ item.text }}</span>
              <a v-else :href="item.link" class="contact-link">{{ item.text }}</a>
            </li>
          </ul>
        </div>

        <div class="sidebar-block">
          <h3 class="sidebar-title"><span class="icon">🎓</span> 教育背景</h3>
          <div v-for="(edu, index) in education" :key="index" class="edu-item">
            <h4>{{ edu.school }}</h4>
            <span class="edu-date">{{ edu.date }}</span>
            <p class="major">{{ edu.major }}</p>
            <p class="desc">{{ edu.desc }}</p>
          </div>
        </div>

        <div class="sidebar-block">
          <h3 class="sidebar-title"><span class="icon">⚙️</span> 核心技能</h3>
          <div class="skills-list">
            <div v-for="(skill, index) in skills" :key="index" class="skill-item">
              <div class="skill-info">
                <span>{{ skill.name }}</span>
              </div>
              <div class="progress-bg">
                <div class="progress-bar" :style="{ width: skill.percent + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-block last-block">
          <h3 class="sidebar-title"><span class="icon">💻</span> 专业软件</h3>
          <div class="tags-cloud">
            <span v-for="(soft, index) in softwares" :key="index" class="tag">{{ soft }}</span>
          </div>
        </div>
      </aside>

      <main class="resume-main">
        <section class="main-block">
          <h3 class="main-title"><span class="title-icon">👤</span> 个人概况</h3>
          <div class="summary-box">
            <p>{{ profile.summary }}</p>
          </div>
        </section>

        <hr class="divider" />

        <section class="main-block">
          <h3 class="main-title"><span class="title-icon">💼</span> 工作经历</h3>
          <div class="timeline">
            <div v-for="(exp, index) in experiences" :key="index" class="timeline-item">
              <div class="timeline-left">
                <span class="time-pill">{{ exp.time }}</span>
                <h4 class="company">{{ exp.company }}</h4>
                <p class="job-title">{{ exp.role }}</p>
              </div>
              <div class="timeline-right">
                <ul class="job-details">
                  <li v-for="(detail, dIndex) in exp.details" :key="dIndex">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr class="divider" />

        <section class="main-block">
          <h3 class="main-title"><span class="title-icon">🚀</span> 项目经历</h3>
          <div class="projects-list">
            <div v-for="(proj, index) in projects" :key="index" class="project-card">
              <div class="project-head">
                <h4>{{ proj.name }}</h4>
                <span class="project-tag">{{ proj.role }}</span>
              </div>
              <div class="project-body">
                <p v-for="(text, tIndex) in proj.desc" :key="tIndex" class="project-text">
                  {{ text }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr class="divider" />

        <section class="main-block">
          <h3 class="main-title"><span class="title-icon">🏆</span> 所获荣誉</h3>
          <ul class="award-list">
            <li v-for="(award, index) in awards" :key="index">{{ award }}</li>
          </ul>
        </section>

      </main>
    </div>
  </div>
</template>

<style scoped>
/* === 全局布局 === */
.resume-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; 
  padding: 20px;
  color: var(--vp-c-text-1);
}

.resume-container {
  display: flex;
  align-items: stretch;
  background-color: var(--vp-c-bg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

/* === 左侧边栏 (调整内边距) === */
.resume-sidebar {
  width: 320px;
  background: #1e293b;
  color: #fff;
  padding: 100px 30px 50px; 
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}
.dark .resume-sidebar { background: #1a1a1a; border-right: 1px solid #333; }

.avatar-box {
  width: 180px; /* 头像变大 */
  height: 180px; /* 头像变大 */
  border-radius: 20px; /* 方形圆角 */
  border: 4px solid rgba(255,255,255,0.2);
  overflow: hidden;
  margin: 0 auto 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.avatar-img { width: 100%; height: 100%; object-fit: cover; }

.name { 
  font-size: 2.4rem; /* 名字字体变大 */
  font-weight: 800; 
  text-align: center; 
  margin: 0 0 15px; /* 名字和职位距离变大 */
  color: white; 
  letter-spacing: 2px; 
}
.role { 
  font-size: 1.1rem; /* 职位字体变大 */
  text-align: center; 
  opacity: 0.8; 
  line-height: 1.5; 
  margin-bottom: 30px; 
  color: #cbd5e1; 
}

.sidebar-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 30px 0; }

.sidebar-block { margin-bottom: 50px; }
.sidebar-block.last-block { margin-bottom: 0; }

.sidebar-title { 
  font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; 
  color: #8B5CF6; display: flex; align-items: center; gap: 10px;
  text-transform: uppercase; letter-spacing: 1px;
}

.contact-list li { margin-bottom: 15px; font-size: 0.95rem; display: flex; align-items: center; gap: 12px; color: #e2e8f0; }
.contact-link { color: inherit; text-decoration: none; transition: 0.2s; border-bottom: 1px dashed rgba(255,255,255,0.3); }
.contact-link:hover { color: #8B5CF6; border-bottom-style: solid; }

.edu-item h4 { font-size: 1.1rem; color: white; margin: 0; }
.edu-date { font-size: 0.85rem; color: #94a3b8; display: block; margin: 5px 0; }
.edu-item .major { font-weight: bold; color: #8B5CF6; margin-bottom: 8px; }
.edu-item .desc { font-size: 0.85rem; opacity: 0.7; line-height: 1.6; }

.skill-item { margin-bottom: 18px; }
.skill-info { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 6px; }
.progress-bg { width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
.progress-bar { height: 100%; background: linear-gradient(90deg, #8B5CF6, #a78bfa); border-radius: 4px; }

.tags-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
.tag { background: rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 6px; font-size: 0.85rem; transition: 0.2s; }
.tag:hover { background: #8B5CF6; color: white; transform: translateY(-2px); }

/* === 右侧主内容 === */
.resume-main { flex-grow: 1; padding: 70px 50px; background-color: var(--vp-c-bg); }

.main-title { 
  font-size: 1.6rem; font-weight: 800; color: #8B5CF6; margin-bottom: 25px; 
  display: flex; align-items: center; gap: 12px;
  background: rgba(139, 92, 246, 0.05); padding: 10px 15px; border-radius: 8px; border-left: 4px solid #8B5CF6;
}
.title-icon { font-size: 1.4rem; }

.summary-box p { font-size: 1.05rem; line-height: 1.8; color: var(--vp-c-text-1); text-align: justify; }

.divider { border: 0; border-top: 1px solid var(--vp-c-divider); margin: 40px 0; opacity: 0.5; }

/* 经历时间轴 */
.timeline-item { display: flex; margin-bottom: 40px; }
.timeline-left { width: 180px; flex-shrink: 0; padding-right: 20px; text-align: right; border-right: 2px solid var(--vp-c-divider); position: relative; }
.timeline-left::after {
  content: ''; width: 12px; height: 12px; background: #8B5CF6; border-radius: 50%;
  position: absolute; right: -7px; top: 5px; border: 3px solid var(--vp-c-bg);
}
.time-pill { font-size: 0.9rem; font-weight: 700; color: #8B5CF6; display: block; margin-bottom: 5px; }
.company { font-size: 1.1rem; font-weight: 700; margin: 0; line-height: 1.3; }
.job-title { font-size: 0.95rem; color: var(--vp-c-text-2); margin-top: 5px; }

.timeline-right { flex-grow: 1; padding-left: 30px; }
.job-details li { margin-bottom: 8px; line-height: 1.7; position: relative; padding-left: 15px; color: var(--vp-c-text-1); }
.job-details li::before { content: '•'; color: #8B5CF6; position: absolute; left: 0; font-weight: bold; }

/* 项目经历卡片 */
.project-card { 
  background: var(--vp-c-bg-soft); border-radius: 12px; padding: 25px; margin-bottom: 25px; 
  border: 1px solid transparent; transition: 0.3s; 
}
.project-card:hover { border-color: #8B5CF6; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
.project-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px dashed var(--vp-c-divider); padding-bottom: 12px; flex-wrap: wrap; gap: 10px; }
.project-head h4 { font-size: 1.2rem; font-weight: 700; margin: 0; }
.project-tag { font-size: 0.85rem; background: #8B5CF6; color: white; padding: 4px 10px; border-radius: 20px; font-weight: 600; }
.project-text { margin-bottom: 8px; font-size: 0.95rem; line-height: 1.6; color: var(--vp-c-text-2); }

/* 荣誉列表 */
.award-list { list-style: none; padding: 0; }
.award-list li { 
  background: var(--vp-c-bg-soft); padding: 15px 20px; margin-bottom: 10px; border-radius: 8px; 
  border-left: 4px solid #8B5CF6; font-weight: 500;
}

/* === 移动端响应式 === */
@media (max-width: 768px) {
  .resume-wrapper { padding: 0 10px; margin: 20px auto; }
  .resume-container { flex-direction: column; border-radius: 0; border: none; box-shadow: none; background: transparent; }
  
  /* 侧边栏手机端 (保持紧凑，不加太大 Padding) */
  .resume-sidebar { width: 100%; border-radius: 16px; margin-bottom: 30px; text-align: center; padding-top: 50px; padding-bottom: 40px; }
  .sidebar-title { justify-content: center; }
  .contact-list li { justify-content: center; }
  .skill-info { justify-content: space-between; padding: 0 10px; }
  .tags-cloud { justify-content: center; }

  /* 主内容手机端 */
  .resume-main { padding: 0; background: transparent; }
  .main-title { justify-content: flex-start; }
  
  /* 时间轴手机端改为上下结构 */
  .timeline-item { flex-direction: column; gap: 15px; }
  .timeline-left { 
    width: 100%; border-right: none; border-left: 2px solid #8B5CF6; 
    padding-right: 0; padding-left: 20px; text-align: left; 
  }
  .timeline-left::after { display: none; }
  .timeline-right { padding-left: 0; }
  
  .project-head { flex-direction: column; align-items: flex-start; }
}
</style>