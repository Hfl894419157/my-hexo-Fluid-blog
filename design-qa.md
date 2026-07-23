# Design QA — 关于我编辑式个人档案

## 对比目标

- Source visual truth: `C:\Users\Administrator\.codex\generated_images\019f8f1a-aabd-79e2-afd4-b6b8e3b42138\call_L6AmW1PArWcSvIU5Xz3vJC5t.png`
- Implementation route: `http://127.0.0.1:4175/resume`
- Hero implementation: `.audit/about-editorial/desktop-light-hero.png`
- Full-page implementation: `.audit/about-editorial/desktop-light-full.jpg`
- Dark implementation: `.audit/about-editorial/desktop-dark-hero-settled.png`
- Mobile implementation: `.audit/about-editorial/mobile-light-hero.png`
- Combined comparison: `.audit/about-editorial/qa-hero-comparison.jpg`

## 规格与归一化

- Source image: 873 × 1801 px。
- Desktop viewport: 1440 × 900 CSS px；页面可用宽度 1425px；device density 1。
- Desktop screenshot: 1425 × 891 px。
- Mobile viewport: 390 × 844 CSS px；页面可用宽度 375px；无水平溢出。
- Hero 对比时将 source 顶部 873 × 610 区域按 cover 归一化到 1425 × 891，与浅色实现同尺寸并排比较。
- 长页使用六张连续桌面视口截图拼接为 1425 × 4896，避免重复触发动效导致离屏内容在 full-page capture 中复位。

## 状态与交互

- 浅色与深色主题均完成浏览器渲染检查。
- 首屏加载后，人物、标签、姓名、角色、陈述和事实信息按顺序由下向上显现。
- 成长路径首项的重复触发状态实测：
  - 进入前：`reveal-item`
  - 进入视口：`reveal-item is-revealed`
  - 完全离开：`reveal-item`
  - 向上回滚重新进入：`reveal-item is-revealed`
- 首页等未传入 `repeat: true` 的元素仍保持一次播放。
- `prefers-reduced-motion` 保留全局直接显示降级。
- 浏览器控制台：0 error，0 warning。

## Full-view comparison evidence

- 信息架构与视觉稿一致：人物首屏、成长路径、工作方式、当前实践、继续了解。
- 实现保留现有站点导航与全站容器，因此首屏比生成稿多出品牌导航留白；这是有意保持全站一致性，不构成设计偏差。
- 长页没有复用首页能力卡和案例卡，整体密度、章节节奏和细分割线符合个人档案定位。

## Focused region comparison evidence

- 首屏组合对比显示人物与文字双栏、姓名层级、铜棕强调、事实信息分栏均与视觉稿方向一致。
- 实现使用真实头像原图和响应式 AVIF 变体，没有使用占位图、CSS 图形或生成的人物替代。
- 中文标题使用现有展示字体，正文使用全站正文字体；移动端保持单栏且标题没有裁切。

## Required fidelity surfaces

- Fonts and typography: 展示字体、正文字体、字号层级、行高与字距清晰；中英文标签使用 mono 字体形成对比。
- Spacing and layout rhythm: 桌面双栏、章节 124px 节奏、列表细分割线和移动端 88px 节奏稳定，无横向溢出。
- Colors and visual tokens: 全部复用 `--text-*`、`--brand-main`、`--border-soft`、`--bg-*`，浅色与深色均符合现有品牌体系。
- Image quality and asset fidelity: 首屏使用真实人物照片；当前实践使用仓库内真实 AI 工作流截图；裁切、清晰度和暗色图像处理正常。
- Copy and content: 使用确认后的阶段编号，不虚构年份；个人陈述、三条工作原则和四个继续了解入口完整。

## Findings

- 无 P0、P1 或 P2 问题。
- P3：移动端首屏需要滚动后才能看到完整个人陈述，这是保留人物优先策略的结果，可在后续根据用户反馈缩短人物图高度。

## Comparison history

- Pass 1: 未发现需要修复的 P0/P1/P2 视觉差异，因此没有进入修复循环。

## Implementation checklist

- [x] 编辑式人物首屏
- [x] 五阶段成长路径
- [x] 三条工作原则
- [x] 当前实践与真实素材
- [x] 四个继续了解入口
- [x] 浅色与深色主题
- [x] 桌面与移动端响应式
- [x] 上下回滚重复显现
- [x] 构建、内容测试与控制台检查

final result: passed
