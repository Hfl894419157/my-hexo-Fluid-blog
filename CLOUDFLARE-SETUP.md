# Cloudflare 接入清单

仓库端已经具备部署后自动清缓存能力。以下步骤只需域名或 GitHub 仓库管理员执行一次，不涉及页面设计改动。

## 1. 迁移 DNS

在 Cloudflare 添加 `liulicc.cn` 后，保留当前 GitHub Pages 记录：

| 类型 | 名称 | 内容 | 代理 |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 已代理 |
| A | `@` | `185.199.109.153` | 已代理 |
| A | `@` | `185.199.110.153` | 已代理 |
| A | `@` | `185.199.111.153` | 已代理 |
| CNAME | `www` | `hfl894419157.github.io` | 已代理 |

确认记录无误后，再到域名注册商把 NS 从 `ns1.baotadns.com`、`ns2.baotadns.com` 改为 Cloudflare 分配的两条 NS。不要删除仓库中的 `public/CNAME`。

## 2. SSL 与网络设置

- SSL/TLS 加密模式：`Full (strict)`。
- Speed → Optimization → Content Optimization：开启 Brotli，关闭 Rocket Loader。
- Network：开启 HTTP/3。
- 如果切换后 HTTPS 暂时异常，先把 DNS 记录改为 `DNS only`，恢复 GitHub Pages 直连后再检查证书。

## 3. 缓存规则

按下列顺序创建 Cache Rules，静态资源规则放在 HTML 规则之前：

| 匹配路径 | 缓存行为 | Edge TTL | Browser TTL |
| --- | --- | --- | --- |
| `/assets/*`、`/_generated/images/*`、`/_generated/fonts/*` | Cache eligible | 1 年 | 1 年 |
| `/images/uploads/*` | Cache eligible | 7 天 | 1 天 |
| `/`、无扩展名路径、`*.html` | Cache eligible | 2 小时 | 5 分钟 |

HTML 规则不要覆盖 `/assets/`、`/_generated/images/`、`/_generated/fonts/`、`/images/uploads/`。发布流程会在 GitHub Pages 部署成功后主动清理整个 Zone 缓存，因此更新不会被长 TTL 卡住。

## 4. GitHub Secrets

1. 在 Cloudflare 创建 API Token，权限只授予目标 Zone 的 `Cache Purge: Purge`。
2. 在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加：
   - `CLOUDFLARE_ZONE_ID`
   - `CLOUDFLARE_API_TOKEN`
3. Secrets 未配置时，部署仍会正常完成，只会显示“跳过缓存清理”。配置后，清缓存失败会让部署工作流明确报错。

## 5. 接入验证

部署后连续请求同一个静态资源两次，第二次响应应出现 `CF-Cache-Status: HIT`：

```powershell
curl.exe -I https://liulicc.cn/assets/<实际文件名>
curl.exe -I https://liulicc.cn/assets/<实际文件名>
```

再检查首页、文章详情、搜索、主题按钮、首页封面裁剪和代码块复制按钮。若任一关键页面异常，可先把 Cloudflare DNS 记录临时切为 `DNS only`。
