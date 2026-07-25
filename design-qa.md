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
