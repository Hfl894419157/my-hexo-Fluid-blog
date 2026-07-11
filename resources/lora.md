---
title: Stable Diffusion LoRA 模型包
status: draft
search: false
layout: page
---

# Stable Diffusion LoRA 模型包

## 模型介绍

通用人像模型包，专为生成高质量人像设计，包含10+精选 LoRA 模型。

### 模型特点

- 👤 真实人像风格
- 🎭 多种表情姿态
- 🌈 丰富的场景适配
- ⚡ 快速训练收敛

## 模型列表

| 模型名称 | 风格 | 适用场景 | 权重建议 |
|---------|------|---------|---------|
| Realistic Portrait | 写实 | 证件照、职业照 | 0.7-0.9 |
| Anime Character | 二次元 | 角色设计 | 0.6-0.8 |
| Studio Light | 影棚光效 | 商业摄影 | 0.5-0.7 |
| Natural Beauty | 自然美颜 | 日常人像 | 0.6-0.8 |

## 下载说明

**完整模型包：** 来源与授权仍在核实，暂不提供下载。

**单个模型下载**：访问 [CivitAI](https://civitai.com/) 搜索对应模型名称

## 使用教程

### 安装步骤

1. 下载模型包并解压
2. 将 `.safetensors` 文件复制到 `stable-diffusion-webui/models/Lora/` 目录
3. 重启 WebUI 界面

### 使用方法

在提示词中使用 LoRA：

```
beautiful woman portrait <lora:Realistic_Portrait:0.8>, 
professional lighting, studio background, 8k, detailed
```

### 参数建议

- **采样步数**：20-30
- **CFG Scale**：7-9
- **LoRA 权重**：0.6-0.9
- **分辨率**：512x768 或 768x1024

## 示例效果

采用 `Realistic Portrait` 模型生成的效果：

- 高度真实的皮肤质感
- 自然的光影过渡
- 清晰的五官细节

## 注意事项

> [!WARNING]
> - 请勿用于商业用途，仅供学习交流
> - 生成图像需遵守当地法律法规
> - 建议配合负面提示词使用

---

[← 返回创作资源](/resources/)
