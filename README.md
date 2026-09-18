# 桃 · 个人创意作品集

一个纯静态的单页个人网站，用来展示设计插画、摄影、音乐与文字。无需任何环境或构建步骤。

## 本地预览

- 最简单：双击 `index.html` 用浏览器打开即可。
- 或起一个本地服务器（部分浏览器对本地文件更友好）：
  ```bash
  python -m http.server 8000
  # 然后访问 http://localhost:8000
  ```

## 文件结构

```
个人网页/
├── index.html      # 页面结构与文案
├── css/style.css   # 样式与明暗主题变量
├── js/main.js      # 作品数据、筛选、灯箱、主题切换、动画
├── assets/         # 放真实图片的目录（目前用 SVG 占位，可留空）
└── README.md
```

## 如何替换成你的内容

- **名字 / 简介 / 联系方式**：直接改 `index.html` 里对应的文字（Hero、关于我、联系方式三个区块）。
- **邮箱和社交链接**：改 `index.html` 中 `.link-card` 的 `href` 和显示文字。
- **作品**：改 `js/main.js` 顶部的 `WORKS` 数组。每一项的 `category` 可选 `design`（设计插画）/ `photo`（摄影）/ `words`（音乐文字）。
- **换成真实图片**：把图片放进 `assets/`，然后在 `js/main.js` 里把 `placeholderSVG(...)` 换成 `` `<img class="card__media" src="assets/你的图.jpg" alt="${w.title}">` ``。

## 功能

- 明 / 暗主题切换，偏好记忆到浏览器（localStorage）。
- 作品分类筛选。
- 点击作品卡片弹出放大预览（灯箱），按 Esc 或点击空白处关闭。
- 响应式布局，移动端友好。
- 尊重系统的「减少动态效果」偏好。

## 部署（可选）

推到 GitHub 后可用 GitHub Pages 免费托管：仓库 Settings → Pages → 选择 `main` 分支根目录即可。
