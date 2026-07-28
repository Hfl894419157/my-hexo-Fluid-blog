# 香港 OSS 图片加速接入

代码端已经支持把 `/_generated/images/**` 的 AVIF/WebP 变体切到香港 OSS，同时继续把原图和完整图片产物部署到 GitHub Pages。未配置仓库变量时，站点保持当前行为；因此可以先完成云端配置，再启用切换。

## 1. 创建专用 Bucket

当前接入使用的 Bucket 是 `liulicc-images-hk`，自定义域名是 `https://img.liulicc.cn`。该 Bucket 仅用于公开网站派生图片：

- 地域：中国香港（`oss-cn-hongkong`）。
- 存储类型：标准存储、本地冗余。
- 只保存构建生成的 `_generated/images/`；不要上传 CMS 原图、源码或私密文件。
- 允许公开读取这些网站图片，禁止公开写入。
- 不启用中国大陆 CDN 或传输加速。

绑定 `img.liulicc.cn`，将该子域名直接 CNAME 到控制台给出的 Bucket CNAME 地址，并为自定义域名配置 HTTPS 证书。不要改动 `liulicc.cn` 当前指向 GitHub Pages 的记录。

## 2. 浏览器访问规则

在 Bucket 中配置：

- CORS 来源：`https://liulicc.cn`、`https://www.liulicc.cn`。
- CORS 方法：`GET`、`HEAD`；允许请求头 `*`；暴露 `ETag`、`Cache-Control`。
- Referer 白名单：`https://liulicc.cn/*`、`https://www.liulicc.cn/*`。
- 允许空 Referer，避免隐私浏览器、搜索引擎和直接打开图片时误伤。

工作流上传时会为 AVIF/WebP 设置正确的 `Content-Type`，并设置：

```text
Cache-Control: public, max-age=31536000, immutable
```

上传流程没有删除权限，也不会执行同步删除。旧哈希对象会继续保留，满足历史页面和浏览器缓存的回源需求。

## 3. 创建最小权限 RAM 用户

为 GitHub Actions 单独创建 RAM 用户，不要使用主账号 AccessKey。给该用户添加以下自定义权限策略：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "oss:ListObjects"
      ],
      "Resource": [
        "acs:oss:*:*:liulicc-images-hk"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "oss:GetObject",
        "oss:PutObject"
      ],
      "Resource": [
        "acs:oss:*:*:liulicc-images-hk/_generated/images/*"
      ]
    }
  ]
}
```

策略故意不包含 `DeleteObject`、Bucket 配置和其他目录权限。

## 4. 配置 GitHub

Repository → Settings → Secrets and variables → Actions：

Variables：

- `IMAGE_ASSET_BASE_URL`：`https://img.liulicc.cn`
- `ALIYUN_OSS_BUCKET`：`liulicc-images-hk`
- `ALIYUN_OSS_ENDPOINT`：`https://oss-cn-hongkong.aliyuncs.com`

Secrets：

- `ALIYUN_OSS_ACCESS_KEY_ID`
- `ALIYUN_OSS_ACCESS_KEY_SECRET`

只有设置了 `IMAGE_ASSET_BASE_URL`，工作流才会启用 OSS。启用后，OSS 上传失败会阻止 GitHub Pages 发布，避免页面先引用尚未上传的资源。

首次同步按以下顺序执行：

1. 先把本次 OSS 接入代码合并到 `main`，此时不要设置 `IMAGE_ASSET_BASE_URL`，线上仍使用 GitHub Pages 图片。
2. 配置上述三个 Variables 和两个 Secrets。
3. 打开 GitHub 仓库的 Actions 页面，选择 `Deploy VitePress site to Pages`，点击 `Run workflow`，分支选择 `main`。
4. 工作流会生成 AVIF/WebP，先上传到 `oss://liulicc-images-hk/_generated/images/`，上传成功后才发布 Pages。
5. 后续每次 `main` 发布都会自动执行同一流程；内容和 CMS 中继续保存原相对路径，无需手工上传或改文章。

工作流只上传带内容哈希的 AVIF/WebP，不同步删除，不上传原图、Markdown、源码或其他 GitHub 资料。已存在的哈希对象会跳过，旧对象继续保留。

## 5. 费用保护与上线验证

在费用中心设置月度预算预警，在 OSS 监控中设置外网流出流量和请求数告警。首月使用按量付费，不购买大流量包。

首次成功部署后抽查 AVIF 和 WebP：

```powershell
curl.exe -I https://img.liulicc.cn/_generated/images/<hash>/760.avif
curl.exe -I https://img.liulicc.cn/_generated/images/<hash>/760.webp
```

应满足：

- HTTP 200；
- `Content-Type` 分别为 `image/avif`、`image/webp`；
- `Cache-Control` 包含 `max-age=31536000, immutable`；
- 首页、长文章、作品集与灯箱没有失败图片；
- 图片加载失败时仍可回退到 `liulicc.cn` 原图。

## 回滚

删除或清空 GitHub Variable `IMAGE_ASSET_BASE_URL` 后重新运行部署。新构建会恢复同源图片 URL，GitHub Pages 中保留的完整产物可以立即接管；无需删除 OSS 对象或修改文章内容。
