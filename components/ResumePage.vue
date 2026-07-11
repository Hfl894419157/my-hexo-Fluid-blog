<script setup>
import { ref } from 'vue'
import ReactIsland from './ReactIsland.vue'

// === 1. 个人基础信息 ===
const profile = {
  name: '韩福利',
  role: '平面设计师 / 资深电商设计师 / 工业设计师 / 视频剪辑师',
  avatar: '/avatar.jpg', 
  summary: '工业设计科班出身，拥有8年平面、电商设计与视频剪辑实战经验。善于以“商业价值与用户需求”为核心，主导设计项目全流程。具备出色的视觉表现力、市场洞察力及跨媒体整合能力，能通过高转化率的设计方案直接驱动业务增长。其次具有视频产出的全流程能力；运营个人短视频账号，全网粉丝 1.5 万。'
}

// === 2. 联系方式 ===
const contacts = [
  { icon: '📧', text: '1442855983@qq.com', link: 'mailto:1442855983@qq.com' }
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
          <ClientOnly>
            <ReactIsland variant="resume-profile" tone="profile" density="medium" />
          </ClientOnly>
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
.resume-wrapper {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-main);
}

.resume-container {
  display: grid;
  grid-template-columns: 320px 1fr;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
}

.resume-sidebar {
  display: flex;
  width: 320px;
  flex-direction: column;
  padding: 82px 30px 48px;
  border-right: 1px solid var(--border-soft);
  color: var(--text-main);
  background:
    radial-gradient(circle at 50% 0%, var(--surface-glow), transparent 42%),
    linear-gradient(180deg, var(--bg-soft), var(--bg-card));
}

.avatar-box {
  width: 168px;
  height: 168px;
  margin: 0 auto 22px;
  overflow: hidden;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  margin: 0 0 14px;
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: 40px;
  font-weight: 840;
  line-height: 1.06;
  text-align: center;
  letter-spacing: var(--title-letter-spacing);
}

.role {
  margin: 0;
  color: var(--text-sub);
  font-size: var(--font-small);
  line-height: 1.72;
  text-align: center;
}

.sidebar-divider {
  height: 1px;
  margin: 30px 0;
  background: var(--border-soft);
}

.sidebar-block {
  margin-bottom: 42px;
}

.sidebar-block.last-block {
  margin-bottom: 0;
}

.sidebar-title {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0 0 18px;
  color: var(--brand-main);
  font-family: var(--font-title);
  font-size: var(--font-small);
  font-weight: 780;
  letter-spacing: var(--title-letter-spacing);
}

.contact-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.contact-list li {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
  color: var(--text-sub);
  font-size: var(--font-small);
}

.contact-link {
  color: inherit;
  text-decoration: none;
}

.contact-link:hover {
  color: var(--brand-main);
}

.edu-item h4 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: 18px;
  letter-spacing: var(--title-letter-spacing);
}

.edu-date {
  display: block;
  margin: 6px 0;
  color: var(--text-muted);
  font-size: 13px;
}

.edu-item .major {
  margin-bottom: 8px;
  color: var(--brand-main);
  font-weight: 740;
}

.edu-item .desc {
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.7;
}

.skill-item {
  margin-bottom: 16px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: var(--text-sub);
  font-size: 13px;
}

.progress-bg {
  width: 100%;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--bg-page);
}

.progress-bar {
  height: 100%;
  border-radius: 999px;
  background: var(--brand-main);
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 10px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  color: var(--text-sub);
  background: var(--bg-card);
  font-size: 13px;
}

.resume-main {
  min-width: 0;
  padding: 68px 50px;
  background: var(--bg-section);
}

.main-title {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 0 0 24px;
  padding: 14px 16px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: var(--text-main);
  background: var(--bg-soft);
  font-family: var(--font-title);
  font-size: 24px;
  font-weight: 820;
  letter-spacing: var(--title-letter-spacing);
}

.title-icon {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
  font-size: 20px;
}

.icon {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
}

.summary-box p {
  margin: 0;
  color: var(--text-sub);
  font-size: var(--font-body);
  line-height: 1.82;
}

.divider {
  margin: 42px 0;
  border: 0;
  border-top: 1px solid var(--border-soft);
}

.timeline-item {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 30px;
  margin-bottom: 38px;
}

.timeline-left {
  position: relative;
  padding-right: 24px;
  border-right: 1px solid var(--border-soft);
  text-align: right;
}

.timeline-left::after {
  position: absolute;
  top: 7px;
  right: -6px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--brand-main);
  box-shadow: none;
  content: "";
}

.time-pill {
  display: block;
  margin-bottom: 6px;
  color: var(--brand-main);
  font-size: 13px;
  font-weight: 760;
}

.company {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: 18px;
  line-height: 1.32;
  letter-spacing: var(--title-letter-spacing);
}

.job-title {
  margin-top: 6px;
  color: var(--text-sub);
  font-size: var(--font-small);
}

.timeline-right {
  min-width: 0;
}

.job-details {
  padding: 0;
  margin: 0;
  list-style: none;
}

.job-details li {
  position: relative;
  margin-bottom: 10px;
  padding-left: 16px;
  color: var(--text-sub);
  line-height: 1.76;
}

.job-details li::before {
  position: absolute;
  left: 0;
  color: var(--brand-main);
  content: "";
}

.project-card,
.award-list li {
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
}

.project-card {
  padding: 24px;
  margin-bottom: 22px;
  transition: border-color 0.24s ease, transform 0.24s ease, box-shadow 0.24s ease;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
  box-shadow: 0 18px 46px rgba(23, 19, 15, 0.1);
}

:global(html.dark) .project-card:hover {
  box-shadow: 0 20px 54px rgba(0, 0, 0, 0.28);
}

.project-head {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border-soft);
}

.project-head h4 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: 20px;
  line-height: 1.32;
  letter-spacing: var(--title-letter-spacing);
}

.project-tag {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  padding: 0 10px;
  border-radius: var(--radius-control);
  color: var(--button-primary-text);
  background: var(--brand-main);
  font-size: 13px;
  font-weight: 700;
}

.project-text {
  margin: 0 0 10px;
  color: var(--text-sub);
  font-size: var(--font-small);
  line-height: 1.72;
}

.award-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.award-list li {
  padding: 16px 18px;
  margin-bottom: 12px;
  color: var(--text-sub);
  font-weight: 560;
}

@media (max-width: 880px) {
  .resume-wrapper {
    padding: 0;
  }

  .resume-container {
    grid-template-columns: 1fr;
  }

  .resume-sidebar {
    width: auto;
    border-right: 0;
    border-bottom: 1px solid var(--border-soft);
    padding-top: 52px;
  }

  .sidebar-title,
  .contact-list li,
  .tags-cloud {
    justify-content: center;
  }

  .resume-main {
    padding: 34px 22px;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .timeline-left {
    padding-right: 0;
    padding-left: 18px;
    border-right: 0;
    border-left: 1px solid var(--brand-main);
    text-align: left;
  }

  .timeline-left::after {
    display: none;
  }
}
</style>
