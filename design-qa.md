# “关于我 / 我的工作台” Design QA

## 对照信息

- source visual truth：`C:\Users\Administrator\Desktop\a0f956c7fd48ca23875d998a25f0b9a3.jpg`
- source specification：用户确认的“主题、等高与自动轮播优化”方案
- source pixels：1200 × 6416，JPEG
- implementation route：`http://127.0.0.1:4175/resume`
- desktop light：`F:\My Blog\.audit\about-workbench-theme-light-final.png`
- desktop dark：`F:\My Blog\.audit\about-workbench-theme-dark-final.png`
- mobile：`F:\My Blog\.audit\about-workbench-mobile-autoplay.jpg`
- reference / implementation comparison：`F:\My Blog\.audit\about-reference-workbench-comparison-final.png`
- light / dark comparison：`F:\My Blog\.audit\about-workbench-theme-comparison-final.png`
- desktop capture pixels：1265 × 712；浏览器 CSS viewport 1280 × 720；devicePixelRatio 1
- mobile content viewport：390 × 844；devicePixelRatio 1；截图外层灰色区域仅用于承载 390px 检查视口
- state：`/resume`，工作台进入视口，亮色、暗色、六项能力选中态与自动轮播状态
- normalization：参考图的能力区裁切为 1425 × 1188，再等比例缩放为 854 × 712；实现截图保持 1265 × 712，二者在同一 2143 × 712 画布中并列比较，没有拉伸。

## Findings

- 未发现仍需处理的 P0、P1 或 P2 问题。
- 工作台在亮色主题中使用米白区块、浅色面板、近黑文字与铜棕选中态；暗色主题使用炭黑区块、深灰面板、暖白文字与铜金选中态，不再固定为单一深色外观。
- 桌面端六个能力状态的左侧菜单与右侧详情区域均实测为 600px，高度差为 0px；切换任意一项时区域高度不跳动。
- 自动轮播、人工操作后的重新计时、离开视口暂停和重新进入视口恢复均符合方案。

## Required Fidelity Surfaces

- Fonts and typography：标题继续使用全站 `--font-display` 与 `--text-section-title`；正文、控件使用 `--font-sans` 与 `--text-body`。没有新增装饰性小字，能力按钮和正文均不低于 15px。
- Spacing and layout rhythm：桌面端保持“六等分菜单 + 稳定详情面板”的双栏结构，两侧严格等高；980px 以下恢复上下布局，390px 手机端保持两列菜单和单列详情，不强制无意义等高。
- Colors and tokens：工作台背景、面板、文字、边框、分割线、图标和选中态全部读取站点主题变量；亮暗主题对照图确认层级、边界与对比度清楚。
- Image quality：本轮没有新增或替换图片素材；人物透明 PNG、裁切和清晰度保持上一轮通过状态。
- Copy and content：六项能力、工具、环节和交付结果保持已确认的真实内容；自动轮播没有增加进度条、统计数字或装饰性说明。
- Icons：继续使用 `@phosphor-icons/vue`，图标在亮暗主题下继承语义颜色，线宽、尺寸和对齐一致。
- Interaction and accessibility：tab / tabpanel 语义、方向键、Home / End、焦点状态和 `aria-selected` 保持有效；自动切换不抢夺焦点；`prefers-reduced-motion` 下代码路径会关闭自动轮播并取消切换位移。

## Full-view Comparison Evidence

- `F:\My Blog\.audit\about-reference-workbench-comparison-final.png`
- 对照确认参考图的宽幅能力区、清晰标题层级和成组能力入口被转译为本站的能力工作台；橙色、项目缩略图、英文与营销数据按既定约束没有照搬。
- 关于页仍只承担人物定位、真实能力与交付链路，没有重新加入首页作品卡、案例轮播或知识入口。

## Focused Region Evidence

- 主题对照：`F:\My Blog\.audit\about-workbench-theme-comparison-final.png`
- 桌面亮色：`F:\My Blog\.audit\about-workbench-theme-light-final.png`
- 桌面暗色：`F:\My Blog\.audit\about-workbench-theme-dark-final.png`
- 手机自动轮播状态：`F:\My Blog\.audit\about-workbench-mobile-autoplay.jpg`
- 需要单独检查这些区域，因为完整页面截图无法清楚判断主题变量、按钮等高、面板边界和 390px 菜单换行。

## Interaction And Runtime Checks

- 自动播放：`graphic` 在 5 秒后切换为 `three-d`。
- 人工操作重置：点击 `web` 后，4.2 秒仍为 `web`；5.3 秒后从当前项继续到 `graphic`。
- 点击当前项同样重新计时；此前实测重新点击后 5 秒内没有提前切换。
- 离屏暂停：工作台离开视口 5.3 秒后仍为 `video`；重新进入视口 5.3 秒后切换为 `web`。
- 六项能力逐项切换时，左右高度均为 600px，高度差始终为 0px。
- 390px 手机端自动从 `photography` 切换为 `aigc`，没有横向溢出。
- 直接打开 `/resume` 的浏览器控制台无 warning 或 error。
- 内容测试 31 / 31 通过。
- VitePress 生产构建、图片检查和重定向构建通过。

## Comparison History

- P2：工作台固定为深色，亮色主题下与全站不协调。
  - 修复：将区块、面板、文字、边框、分割线和交互状态改为主题变量，并修正暗色作用域选择器。
  - 复核：`about-workbench-theme-comparison-final.png` 中亮色与暗色均有独立、清楚的视觉层级。
- P2：左侧菜单与右侧详情在不同内容下高度不一致，切换时页面抖动。
  - 修复：桌面端两侧统一为 600px；左侧使用六等分网格，右侧过渡内容固定在同一网格区域。
  - 复核：六项逐项切换的实测高度均为 600px，高度差 0px。
- P2：工作台只能人工点击，不符合关于页的快速浏览节奏。
  - 修复：增加 5000ms 自动轮播、人工操作重新计时、离屏和标签页隐藏暂停、恢复后新周期，以及减少动态效果时禁用。
  - 复核：5 秒轮播、4.2 / 5.3 秒人工重置边界与离屏暂停均通过。
- P2：初版过渡使用 `out-in` 时，切换瞬间可能短暂显示空白面板。
  - 修复：移除 `out-in`，让进入和离开面板在同一网格区域交叠过渡。
  - 复核：连续轮播和逐项点击均未再观察到容器折叠或空白帧。

## Follow-up Polish

- 当前没有阻塞性优化项。若以后需要更明确地提示自动播放进度，可另行讨论，但本轮按方案不增加进度条或暂停按钮。

## Implementation Checklist

- [x] 亮色、暗色主题变量适配
- [x] 桌面左右严格等高
- [x] 六项菜单等分
- [x] 5 秒自动轮播
- [x] 人工点击和键盘操作重新计时
- [x] 离屏与标签页隐藏暂停
- [x] 减少动态效果时禁用轮播
- [x] 390px 手机端验证
- [x] 控制台、内容测试与生产构建

final result: passed

---

# 内容图片灯箱与首页投影精简 QA

## Evidence

- source visual truth paths：
  - `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-b20c79a8-96a3-482d-bcb8-1f8e339d2eb5.png`
  - `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-6c3fb48c-78e4-4095-956e-d40ff72f0d71.png`
- implementation screenshot paths：
  - `.audit/image-lightbox-shadow-polish/home-featured-dark-desktop.png`
  - `.audit/image-lightbox-shadow-polish/home-video-dark-desktop.png`
  - `.audit/image-lightbox-shadow-polish/portfolio-lightbox-desktop.png`
  - `.audit/image-lightbox-shadow-polish/article-lightbox-mobile.png`
- full-view comparison evidence：
  - `.audit/image-lightbox-shadow-polish/featured-shadow-comparison.png`
  - `.audit/image-lightbox-shadow-polish/video-shadow-comparison.png`
- desktop viewport / implementation pixels：1397 × 693，deviceScaleFactor 1
- portfolio lightbox viewport / pixels：1280 × 900，deviceScaleFactor 1
- mobile viewport / pixels：390 × 844，deviceScaleFactor 1
- source pixels：精选作品 1397 × 693；视频 1100 × 614
- density normalization：精选作品按 1397 × 693 原始像素对照；视频参考图使用 `contain` 等比置入 1397 × 693 画布后对照，没有拉伸。
- state：深色首页；精选作品堆叠滚动状态；单条视频状态；北食刻 17 图作品图库；AI 产品海报 14 图富文本文章。

## Findings

- 没有 P0、P1 或 P2 问题。
- 首页精选作品卡片与视频舞台的外投影已由大范围灰黑光晕改为低透明度、短扩散的轻量投影；卡片尺寸、圆角、封面裁切、堆叠和滚动效果未改变。
- 作品图库、普通图片组、独立图片和富文本正文图片均可点击或用 Enter / Space 打开同一灯箱。
- 灯箱保留原图比例、不裁切；多图可用按钮或左右方向键切换，Escape 关闭后焦点回到触发图片。
- 390px 手机灯箱为单图居中，前后按钮固定在底部，没有横向溢出；打开时锁定正文滚动，关闭后恢复。
- 浏览器控制台无 error。

## Required Fidelity Surfaces

- Fonts and typography：没有修改首页和文章字体；灯箱只新增 12px 计数与 13px 图注，沿用现有等宽/正文变量。
- Spacing and layout rhythm：首页卡片布局、间距与圆角保持不变，只降低投影；灯箱在桌面保留两侧控制区，手机使用 16px 安全边距。
- Colors and visual tokens：首页继续使用现有背景、边框和文字变量；灯箱采用中性深色遮罩与白色控制图标，不引入新的品牌色。
- Image quality and asset fidelity：灯箱读取内容图片原始 `src`，使用 `object-fit: contain`，不裁切、不替换、不生成近似素材。
- Copy and content：现有标题、说明、标签、视频文案和文章内容均未改动；只增加无障碍“放大查看”标签与灯箱控制文案。

## Full-view Comparison

- 精选作品对照图中，参考图卡片下方存在大面积灰黑光晕；实现图的卡片边界仍有层级，但光晕明显收敛。
- 视频对照图中，参考图舞台下方投影宽且重；实现图保留轻微悬浮感，背景更干净。
- 精选作品左右截图处于不同的堆叠滚动帧，因此只比较用户指定的卡片外投影；组件比例、内容和交互由同一现有实现保持。

## Focused Region Comparison

- `portfolio-lightbox-desktop.png` 验证竖版原图在 1280 × 900 下完整显示、17 图计数与两侧切换按钮。
- `article-lightbox-mobile.png` 验证富文本横图在 390 × 844 下完整显示、14 图计数与底部切换按钮。
- 这两个局部状态在首页参考图中不存在，因此按本轮功能规范和现有设计系统检查，而不是做像素级参考图匹配。

## Interaction And Runtime Checks

- 北食刻作品页识别 17 张可预览图片，打开首图显示 `1 / 17`。
- 右方向键后切换为 `2 / 17`；Escape 后灯箱卸载、页面解锁，焦点恢复到首图。
- 最终生产构建中打开灯箱后焦点自动进入关闭按钮；从首个控件反向 Tab 会循环到最后一个“下一张”按钮。
- AI 产品海报富文本文章识别 14 张可预览图片，首图打开显示 `1 / 14`。
- 390px 手机端 `scrollWidth` 未超过可视内容宽度，灯箱打开时正文滚动锁定。
- 内容测试 50 / 50 通过；内容校验通过；VitePress 生产构建、图片检查和重定向构建通过。

## Comparison History

- 初始参考：用户截图显示精选作品和视频舞台外投影扩散范围过大、暗色背景显得笨重。
- 修复：两处外投影统一调整为 `0 16px 44px`、7% 文字色混合；没有修改卡片结构或动效。
- 首次复核：深色桌面完整视图中未发现可操作的 P0 / P1 / P2 差异，无需第二轮视觉修复。
- 灯箱首次复核：桌面作品图库、富文本文章和 390px 手机状态均通过，无需第二轮视觉修复。

## Implementation Checklist

- [x] 作品图片组自动灯箱
- [x] 富文本正文图片自动灯箱
- [x] 独立图片与普通图片组自动灯箱
- [x] 键盘打开、切换、关闭与焦点恢复
- [x] 手机单图预览和滚动锁定
- [x] 精选作品轻量投影
- [x] 视频舞台轻量投影
- [x] 控制台、内容测试、内容校验与生产构建

## Follow-up Polish

- 当前没有阻塞或需要继续调整的 P3 项。

final result: passed

---

# 知识库三个子页面顶部精简 QA

## Evidence

- source visual truth path：`C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-4f5bbf18-3225-44b2-8ab0-da53e9b5cb1a.png`
- implementation screenshot path：`.audit/knowledge-subpages/resources-desktop.png`
- mobile implementation screenshot path：`.audit/knowledge-subpages/resources-mobile.png`
- full-view comparison evidence：`.audit/knowledge-subpages/resources-reference-comparison.png`
- desktop viewport：1349 × 706 CSS px，deviceScaleFactor 1
- source pixels：1349 × 706
- implementation pixels：1349 × 706
- mobile viewport / pixels：390 × 844，deviceScaleFactor 1
- state：亮色主题；研究笔记、方法指南、工具与资源三个公开子页面

## Findings

- 没有 P0、P1 或 P2 问题。
- 三个页面均已移除页面内顶部介绍、装饰图和 `PageSearch`，直接从各自的内容标题开始。
- 研究笔记和方法指南已在内容标题下补充栏目说明，字号、行高和 12px 间距与工具与资源页一致。
- 工具与资源页同时移除了分类按钮和“下载与版权说明”，与用户截图圈选范围一致。
- 桌面端内容区距全局导航底部约 70px，手机端内容顶部为 112px，没有异常大块留白。
- 三页在 1280px 桌面和 390px 手机宽度下均无横向溢出。
- 全局导航搜索仍保留；手机端实测可打开和关闭，浏览器控制台无错误。

## Required Fidelity Surfaces

- Fonts and typography：沿用现有展示字体、28px 手机标题层级和全站字重，没有引入新字体或错位换行。
- Spacing and layout rhythm：删除目标区域后，内容标题与导航保持稳定间距，卡片/空状态宽度和圆角未改变。
- Colors and visual tokens：继续使用现有背景、正文、品牌色、边框和空状态变量。
- Image quality and asset fidelity：本次目标是删除顶部装饰图，没有新增、替换或裁切内容图片。
- Copy and content：保留内容列表标题；三个子页面均显示与各自栏目对应的简短说明，只删除失效的搜索说明及圈选辅助控件。

## Full-view Comparison

- 左侧参考图显示需要删除的顶部标题说明、装饰图、页内搜索、热门主题、资源筛选和下载说明。
- 右侧实现图直接显示“全部工具与资源”及内容区域；上述目标元素均不存在。
- 主要差异全部来自用户要求的删除，没有出现额外布局、颜色或内容改动。

## Focused Region Comparison

- 不需要额外局部裁切：目标元素和内容首屏在 1349 × 706 全视图对照中均清晰可辨。

## Comparison History

- 初始检查：现有三个子页面仍通过 `OverviewPage` 显示 `PageHero + PageSearch`，工具页还显示筛选与下载说明。
- 修复：三个子页面传入 `showHero=false`；移除工具页筛选状态、按钮、下载入口和相关样式；删除失效搜索说明。
- 复核：桌面与手机实测均无顶部/页内搜索，内容标题位置稳定，全局搜索功能正常。
- 用户复核：研究笔记和方法指南的内容标题下缺少与工具页一致的小字说明。
- 修复：复用两页既有的栏目 `description` 作为内容区说明，不增加新的配置入口。
- 复核：桌面端说明为 15px、标题间距 12px；390px 手机端正常换行、无横向溢出，控制台无错误。

## Implementation Checklist

- [x] 研究笔记移除顶部与页内搜索
- [x] 方法指南移除顶部与页内搜索
- [x] 研究笔记与方法指南补充栏目说明
- [x] 工具与资源移除顶部、页内搜索、筛选与下载说明
- [x] 保留全局导航和全局搜索
- [x] 桌面与手机响应式检查
- [x] 浏览器控制台检查
- [x] 内容测试与生产构建

## Follow-up Polish

- 当前没有阻塞或需要继续调整的 P3 项。

final result: passed
