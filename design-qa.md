# Design QA

## 验收范围

- 基线：保留当前 39 个未提交本地变更；本轮未拉取、未提交、未推送。
- 目标：统一 1180px 页面基线，修复列表与页脚居中、文章三栏覆盖和右侧目录滚动问题，并为六个列表页补齐 6 张卡片。
- 视口：1520×900、1280×800、1024×800、390×844。
- 主题与状态：深色、浅色、搜索结果、移动端导航、移动端本页目录、文章开头/中段。

## 参考与对比证据

- 用户参考图：
  - `G:\常见程序应用\xwechat_files\wxid_pdgkts1to86t22_cb46\temp\InputTemp\868aaede-8ec9-44ea-8196-9802ce4f89a0.png`
  - `G:\常见程序应用\xwechat_files\wxid_pdgkts1to86t22_cb46\temp\InputTemp\e15ab589-f8c7-49ac-a0dc-801db4b1c694.png`
  - `G:\常见程序应用\xwechat_files\wxid_pdgkts1to86t22_cb46\temp\InputTemp\efd8ec48-e15c-49b2-a365-e93b05bda6b2.png`
  - `G:\常见程序应用\xwechat_files\wxid_pdgkts1to86t22_cb46\temp\InputTemp\1220f45b-801a-4b5c-a48a-a62de19ce5fb.png`
  - `G:\常见程序应用\xwechat_files\wxid_pdgkts1to86t22_cb46\temp\InputTemp\d147b87a-7537-4591-a533-93655958a6e7.png`
  - `G:\常见程序应用\xwechat_files\wxid_pdgkts1to86t22_cb46\temp\InputTemp\a080233f-dcd3-4a64-b433-4dbb76b98007.png`
  - `G:\常见程序应用\xwechat_files\wxid_pdgkts1to86t22_cb46\temp\InputTemp\187bd990-a5ed-4d68-872a-c0bfb9404375.png`
- 组合对比：
  - `.audit/qa-comparison-list.png`
  - `.audit/qa-comparison-article.png`
  - `.audit/qa-comparison-footer.png`
- 实现截图：
  - `.audit/implementation-portfolio-1520.png`
  - `.audit/implementation-knowledge-1520.png`
  - `.audit/implementation-footer-1520.png`
  - `.audit/implementation-article-1280-top.png`
  - `.audit/implementation-article-1280-mid.png`
  - `.audit/implementation-article-1024.png`
  - `.audit/implementation-portfolio-390.png`
  - `.audit/implementation-article-390.png`

## 全局版式检查

- 1520px 视口的可用内容宽度为 1505px；顶部菜单、页面主容器和页脚内容容器均为 1180px，左右边界统一为 162.5px / 1342.5px，中心点均为 752.5px。
- 清除了 VitePress 在宽屏下对 `.VPContent.has-sidebar` 追加的右侧 40px 内边距；Hero、搜索区、标题区和卡片区与顶部菜单同轴。
- 页脚背景仍铺满视口，内部 `.site-footer__container` 独立按 1180px 居中，不受栏目侧栏影响。
- 所有检查视口均无水平溢出。

## 卡片与响应式检查

- `/portfolio/`：6 张，桌面 3×2；4 张筹备中卡片无链接。
- `/aigc/`：6 张，桌面 3×2；5 张筹备中卡片无链接。
- `/knowledge/`：6 张，桌面 3×2；全部指向现有栏目入口。
- `/knowledge/learning-observation`：6 张，桌面 3×2；3 张筹备中卡片无链接。
- `/knowledge/methods`：6 张，桌面 3×2；5 张筹备中卡片无链接。
- `/knowledge/resources`：6 张，桌面 3×2；4 张筹备中卡片无链接。
- 1024px 为 2 列，390px 为 1 列；卡片标题、摘要、标签和状态文案完整，没有死链或空白占位卡。

## 文章三栏与目录检查

- 1280px 桌面结构测量为 `180 + 30 + 760 + 30 + 180`：左栏 42.5–222.5px、正文 252.5–1012.5px、右栏 1042.5–1222.5px，与顶部菜单左右边界一致。
- 正文宽度选择器已限制为直接子容器，右侧目录内部 `.content` 不再被错误拉宽为 760px。
- 左侧栏目导航按页面可用宽度计算定位，滚动条不会再制造约 7.5px 偏移。
- 右侧目录使用 sticky 定位；在文章中段（scrollY=900）仍稳定于顶部菜单下方 132px，目录高度 216px。
- VitePress 自动 active 状态正常；中段滚动时“保存变量关系”切换为当前高亮，目录本身不随正文漂移。
- 1199px 以下隐藏桌面双侧栏，1024px 正文 760px 单列居中；390px 使用 343px 内容宽度，并保留移动端栏目菜单和“本页目录”下拉。

## 视觉与内容检查

- 字体、暖金色强调色、深浅主题、卡片边框和占位图继续沿用现有设计系统。
- 卡片图像区保持 16:9；已发布卡片的图片、标题与 CTA 可点击，筹备中卡片显示“内容筹备中”且不生成锚点。
- 六组新增占位内容均与对应栏目主题匹配，文案和标签可作为后续 Markdown 发布前的真实占位。
- 页脚品牌、说明、社交链接、三组导航和底部版权在同一居中容器内，视觉重心与页面中心一致。

## 交互与工程检查

- 搜索：输入“工作流”后显示标题、栏目和正文匹配结果；搜索层可正常关闭。
- 主题：深色切换为浅色后可恢复深色。
- 移动端：站点菜单可展开/关闭；文章“本页目录”可展开并显示 5 个章节。
- 浏览器控制台：0 个 error，0 个 warning。
- `git diff --check`：通过，仅有仓库既有 LF/CRLF 提示。
- `npm run build`：通过，VitePress 生产构建无路由或数据编译错误。

## 最终结果

final result: passed
