<script setup>
import BaseButton from './BaseButton.vue'
import MediaFrame from './MediaFrame.vue'

const outcomes = [
  { value: '8 年', label: '商业视觉与设计交付经验' },
  { value: '50+', label: '产品摄影与内容制作实践' },
  { value: '1.5 万', label: '个人内容账号累计关注' }
]

const directions = [
  ['AI 商业视觉', '研究产品图、详情页与品牌内容如何在保持真实性的前提下提高生产效率。'],
  ['工作流系统化', '把需求、变量、生成、判断、精修和交付整理成可以复盘的流程。'],
  ['知识资产沉淀', '将有效模板、提示词结构、检查清单和项目结论放回下一次实践。']
]
</script>

<template>
  <div class="about-page">
    <section class="about-hero">
      <div>
        <p class="about-hero__eyebrow">About Liuli AI Lab</p>
        <h1>从商业设计实践出发，探索 AI 如何真正进入工作</h1>
        <p class="about-hero__lead">
          我是韩福利，工业设计背景，长期从事平面、电商视觉、产品表达与视频内容工作。这个网站不是在线求职简历，而是我持续整理 AI 实践、工作流和知识资产的个人实验室。
        </p>
        <div class="about-hero__actions">
          <BaseButton href="mailto:1442855983@qq.com">邮件联系</BaseButton>
          <BaseButton href="/portfolio/" variant="secondary">查看实践案例</BaseButton>
        </div>
      </div>
      <div class="about-hero__portrait">
        <MediaFrame src="/avatar.jpg" alt="主理人韩福利头像" aspect="4 / 5" eager />
      </div>
    </section>

    <section class="about-section">
      <p class="about-section__eyebrow">Current Focus</p>
      <h2>当前关注的三个方向</h2>
      <div class="about-focus">
        <MediaFrame src="/aigc-3.jpg" alt="蓝紫色数字粒子视觉，代表 AI 商业视觉与知识系统" aspect="4 / 5" tone="quiet" />
        <div class="about-focus__list">
          <div v-for="(item, index) in directions" :key="item[0]">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <div><h3>{{ item[0] }}</h3><p>{{ item[1] }}</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section about-section--soft">
      <p class="about-section__eyebrow">Practice Evidence</p>
      <h2>实践背景摘要</h2>
      <div class="about-outcomes">
        <div v-for="item in outcomes" :key="item.label">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </div>
      </div>
      <p class="about-note">项目中的业务数据来自个人项目记录，公开内容已做必要脱敏；需要完整履历或进一步项目信息，可通过邮件沟通。</p>
    </section>

    <!-- 💡 合作对接与承接范围模块 -->
    <section class="about-section about-collaboration">
      <p class="about-section__eyebrow">Collaboration</p>
      <h2>如何与我展开合作</h2>
      
      <div class="collab-grid">
        <div class="collab-box">
          <h3>承接业务范围</h3>
          <ul>
            <li><strong>商业电商视觉：</strong> 产品 3D 主图/详情页整体策划、渲染与前端自适应资产交付。</li>
            <li><strong>跨媒介品牌设计：</strong> 线下展位空间规划、多载体视觉系统规范及远程打样把控。</li>
            <li><strong>AI 工作流定制：</strong> 为设计团队定制私有 AI 视觉生产品质控制工作流与标准 Brief 模板。</li>
          </ul>
        </div>
        
        <div class="collab-box">
          <h3>合作对接流程</h3>
          <ol>
            <li><strong>1. 需求解构：</strong> 邮件提供产品说明书或竞品资料（可参照 <a href="/aigc/commercial-visual-system">五阶段工作流</a> 提供基础 Brief）。</li>
            <li><strong>2. 锁定变量：</strong> 设计师建模锁定核心技术零件结构，控制画面透视与色彩调性范围。</li>
            <li><strong>3. 像素交付：</strong> 双轨审美把关打样防错，输出高印刷精度/线上转化标准的设计资产。</li>
          </ol>
        </div>
      </div>

      <div class="collab-cta">
        <p>适合从一个具体的视觉任务或探索开始。欢迎来信讨论目标与交付边界：</p>
        <BaseButton href="mailto:1442855983@qq.com">1442855983@qq.com</BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page { width: min(1080px, 100%); margin: 0 auto; padding: 42px 0 24px; }
.about-hero { display: grid; grid-template-columns: 1fr 280px; gap: 56px; align-items: center; }
.about-hero__eyebrow, .about-section__eyebrow { margin: 0; color: var(--brand-main); font-size: var(--text-label); font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; }
h1 { margin: 16px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: var(--text-page-title); font-weight: 600; line-height: 1.15; letter-spacing: -0.03em; }
.about-hero__lead { margin: 24px 0 0; color: var(--text-sub); font-size: 17px; font-weight: 400; line-height: 1.9; max-width: 720px; }
.about-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.about-hero__portrait { aspect-ratio: 4 / 5; overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-soft); }
.about-hero__portrait img { width: 100%; height: 100%; object-fit: cover; }
.about-section { margin-top: 76px; }
.about-section > h2 { margin: 12px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: var(--text-section-title); font-weight: 600; line-height: 1.15; letter-spacing: -0.03em; }
.about-focus { display: grid; grid-template-columns: minmax(240px, 0.68fr) minmax(0, 1.32fr); gap: 46px; align-items: center; margin-top: 30px; }
.about-focus__list { display: grid; border-top: 1px solid var(--border-soft); }
.about-focus__list > div { display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 18px; padding: 22px 0; border-bottom: 1px solid var(--border-soft); }
.about-focus__list span { color: var(--brand-main); font-size: var(--text-label); font-weight: 600; }
.about-focus__list h3 { margin: 0; color: var(--text-main); font-family: var(--font-sans); font-size: 20px; font-weight: 600; line-height: 1.4; letter-spacing: 0; }
.about-focus__list p { margin: 10px 0 0; color: var(--text-sub); font-size: var(--text-small); line-height: 1.8; }
.about-section--soft { padding: 36px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-soft); }
.about-outcomes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 28px; background: var(--border-soft); }
.about-outcomes div { display: grid; gap: 8px; padding: 24px; background: var(--bg-card); }
.about-outcomes strong { color: var(--text-main); font-family: var(--font-display); font-size: var(--text-card-large); font-weight: 580; line-height: 1.3; }
.about-outcomes span, .about-note { color: var(--text-sub); line-height: 1.9; }
.about-note { margin: 24px 0 0; font-size: var(--text-small); }

/* ── 合作模块样式 ── */
.about-collaboration {
  border-top: 1px solid var(--border-soft);
  padding-top: 48px;
}
.collab-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 24px;
}
.collab-box {
  padding: 28px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
}
.collab-box h3 {
  margin: 0 0 16px;
  color: var(--text-main);
  font-size: 18px;
  font-weight: 600;
}
.collab-box ul, .collab-box ol {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.collab-box li {
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.6;
}
.collab-box li strong {
  color: var(--text-main);
}
.collab-box a {
  color: var(--brand-main);
  text-decoration: none;
  font-weight: 500;
}
.collab-cta {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 28px;
  border-radius: var(--radius-card);
  background: var(--bg-soft);
}
.collab-cta p {
  margin: 0;
  color: var(--text-sub);
  font-size: var(--text-small);
}

@media (max-width: 760px) {
  .about-hero { grid-template-columns: 1fr; }
  .about-hero__portrait { width: min(280px, 100%); grid-row: 1; }
  .about-focus, .about-outcomes, .collab-grid { grid-template-columns: 1fr; }
  .about-focus :deep(.media-frame) { width: min(340px, 100%); margin: 0 auto; }
  .collab-cta { display: grid; gap: 16px; justify-items: start; }
}
</style>
