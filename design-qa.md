# 首页视频、后台管理与页尾定位 Design QA

- Source visual truth: `https://liulicc.cn/`（原首页）、`.audit/home-source-insertion-point-1440.png`、用户确认的全宽视频方案与现有站点设计令牌。
- Side-by-side comparison: `.audit/home-video-source-vs-balanced-1440.png`（左侧原首页插入点，右侧视频实现）。
- Implementation captures:
  - `.audit/home-video-balanced-1440.png`
  - `.audit/home-video-fullwidth-768.png`
  - `.audit/home-video-fullwidth-390.png`
  - `.audit/home-tail-broad-1440.png`
- Source and desktop implementation pixels: 1440 × 1000；并排对比图 2880 × 1000。
- Viewports: 1440 × 1000、768 × 900、390 × 844 CSS px。
- Density normalization: 全部使用 `deviceScaleFactor: 1`。
- State: 浅色主题、导航固定、视频板块进入视口；页尾单独捕获合作状态。
- Fixture policy: 截图期间临时启用 4 条本地案例并使用可识别的 BV 测试地址；验收后已恢复为 3 条未发布草稿，测试地址未进入正式配置。

## Full-view comparison

- 视频板块由“主画面 + 右侧列表”改为桌面 960px 居中的 16:9 主画面，下方案例卡随数量自动形成 3 或 4 个等宽列；两侧是对称留白，不再出现单侧无内容区域。
- 主画面的分类、标题和说明叠放在封面底部；播放动作保持独立，信息层级和工业品主体都清晰。
- 899px 以下案例列表改为组件内横向滑动。390px 页面 `scrollWidth === viewportWidth === 390px`，768px 页面 `scrollWidth === viewportWidth === 768px`，没有页面级横向溢出。
- 页尾 CTA 保留转化功能，定位扩展为品牌视觉、产品内容、三维渲染、AI 视频、工作流与网站搭建，不再把个人能力限定为工业品。

## Focused comparison

- Desktop 1440px: 主画面 960 × 540px，比例准确为 16:9；3 张案例卡均约 309px 宽。相较上一版缩小约 19%，视频不再获得接近 Hero 的视觉权重。
- Tablet 768px: 主画面 720 × 405px；案例列表在自身容器中横向滚动。
- Mobile 390px: 主画面 358 × 201.375px；案例卡 300px 宽并保留下一张局部预览，形成明确滑动提示。
- Typography: 视频标题、案例标题和站内衬线标题继续复用既有字体；页尾 CTA 的标题层级、说明宽度和两个动作按钮保持原站视觉体系。
- Colors and assets: 复用 `--brand-main`、`--bg-card`、`--border-soft` 与已有作品图片，没有生成或伪造项目素材。

## Interaction and accessibility checks

- 首页加载与滚动到视频区域时，B 站请求数量为 0，DOM 中 iframe 数量为 0。
- 点击案例卡可同步切换主封面、分类、标题、说明；方向键、Home 与 End 可切换 tab 并同步焦点。
- 点击主播放按钮后才创建 `player.bilibili.com` iframe；弹层打开时焦点进入关闭按钮。
- 点击关闭、按 Esc 或点击遮罩都会清空 iframe 地址；验收中关闭后 iframe 数量为 0，焦点回到主播放按钮。
- 弹层始终提供“前往哔哩哔哩观看”备用入口和“咨询类似项目”动作。
- `prefers-reduced-motion: reduce` 下实测 `opacity: 1`、`transform: none`、`transition-duration: 0s`。
- 1440px、768px、390px 均无布局溢出或控制台错误。

## Content and production-state checks

- `.shared/content/videos.json` 只包含后台管理需要的 8 个字段：`id`、`published`、`title`、`category`、`description`、`poster`、`url`、`duration`。
- Pages CMS 的“站点管理 → 首页视频案例”支持最多 4 条、拖动排序、显示开关、封面上传和全部元数据编辑。
- 只有已发布、资料完整且能解析 BV 编号的案例进入首页；没有有效案例时整个板块隐藏。
- 正式数据当前是 3 条未发布草稿，等待用户补入实际 B 站链接并确认封面后启用。
- 完整构建、图片完整性检查、内容测试和内容校验均通过。

## Findings

- 未发现可操作的 P0、P1 或 P2 视觉与交互问题。
- 原首页截图没有视频板块本身，因此并排比较用于确认插入位置、1180px 内容边界、字体、暖白背景、圆角、边框和棕色强调色的一致性；视频内部构图以用户确认的全宽方案为准。

## Open questions

- 正式 B 站稿件、最终封面和准确时长尚未录入；这些是内容接入项，不阻塞组件交付。

## Implementation checklist

- [x] 全宽 16:9 主画面和 3–4 个等宽案例入口。
- [x] 移动端局部横向滑动，无页面级溢出。
- [x] B 站播放器按点击创建，关闭后销毁。
- [x] Pages CMS 元数据、封面、顺序和显示开关。
- [x] 宽能力范围的页尾合作 CTA。
- [x] 完整构建、内容测试、三档浏览器和低动态模式验证。

## Follow-up polish

- 正式内容录入后可按各视频主体重新微调封面焦点；当前没有阻塞交付的 P3 项。

## Comparison history

1. 原实现：桌面左右栏造成右侧视觉空白，并依赖 OSS 视频 URL。
2. 本轮：改为全宽主画面与底部等宽卡，播放器切换到按点击加载的 B 站 iframe。
3. 响应式复测：390px、768px 改为局部横滑，1440px 四列均衡；未发现剩余 P0/P1/P2 问题。
4. 桌面权重复测：保留上下结构，将主画面与案例卡统一收进 960px 居中容器；移动端尺寸不变，未发现新的布局问题。

## Residual content step

- 用户的正式 B 站稿件尚未提供，因此播放器品牌、真实稿件可用性与视频内容本身需在后台录入后进行一次内容级复核；组件、链接解析、按需加载和失败备用入口已经完成。

final result: passed
