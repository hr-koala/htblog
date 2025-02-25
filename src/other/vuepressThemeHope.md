---
title: ThemeHope
date: 2025-02-24
article: false
category:
  - ThemeHope
---

## [ThemeHope 地址](https://theme-hope.vuejs.press/zh/)

新建 `vuepress-theme-hope` 项目:

> `npm init vuepress-theme-hope@latest <dir>`

获取状态

- 获取 `$isDarkMode` 来获取当前是否为深色模式。
- 从 `@vuepress/helper/client` 导入 `useDarkMode` 来获取深色模式状态:

```ts
import { useDarkMode } from "@vuepress/helper/client"
const isDarkMode = useDarkMode()

console.log(isDarkMode.value) // get darkmode status
```

如果 `@vuepress/helper` 没有安装，你应该先安装它:

> `npm i -D @vuepress/helper@next`

在 `.vuepress/styles/config.scss` 中通过 `$theme-color` 设置站点的默认主题颜色：

```scss
$theme-colors: #2196f3, #f26d6d, #3eaf7c, #fb9b5f;
```

要指定图标资源，请在主题选项中设置 `plugins.icon.assets`：

```ts
import { hopeTheme } from "vuepress-theme-hope"
export default {
  theme: hopeTheme({
    plugins: {
      icon: {
        // 关键词: "iconify", "fontawesome", "fontawesome-with-brands"
        assets: "fontawesome",
        // 你想要的 URL
        assets: "/base/my/font-icon/resource.js",
        // 上述内容的数组
        assets: [
          "/base/my/font-icon/resource.js",
          "https://example/my/fonr-icon/resouce.css",
          "fontawesome",
        ],
      },
      // 通过 `backToTop: false` 禁用返回顶部按钮
      // 或自定义返回顶部按钮
      backToTop: {
        /**
         * 显示返回顶部按钮的滚动阈值距离（以像素为单位）
         *
         * @default 100
         */
        threshold: 500,
        /**
         * 是否显示滚动进度
         *
         * @default true
         */
        progress: false,
      },
    },
    focus: true,
    pure: true,
    locales: {
      // ...
      "/ar/": {
        // enable RTL layout
        rtl: true,
      },
    },
  }),
}
```

可用的图标

> Iconify: `https://icon-sets.iconify.design/`
> Iconfont: `https://www.iconfont.cn/`
> Fontawesome: `https://fontawesome.com/search?o=r&m=free`

响应式配置
:::tip 主题提供了断点变量用于控制响应式布局的行为。你可以在 `.vuepress/styles/config.scss` 中修改它们:
`$pc`: 电脑响应式布局断点，默认为 `1440px`
`$laptop`: 笔记本响应式布局断点，默认为 `1280px`
`$pad`: 大型平板响应式布局断点，默认为 `959px`
`$tablet`: 平板响应式布局断点，默认为 `768px`
`$mobile`: 手机响应式布局断点，默认为 `480px`
:::

打印按钮，在主题选项中设置 `print: false`

全屏按钮,在主题选项中设置 `fullscreen: true`

返回顶部按钮,在主题选项中设置 `plugins.backToTop: false `

主题选项中设置 `focus: true` 启用专注模式

在主题选项中设置 `pure: true` 启用纯净模式。

RTL 布局,`vuepress-theme-hope` 完全支持 RTL 布局。只需在多语言配置内的对应语言设置 `rtl: true`

### 文章列表

::: info

1. 增加了一种幻灯片页面。

所有幻灯片页面都应在 frontmatter 中包含 layout: SlidePage。 并且顺序无关紧要。

2. 添加原创类型。

你应设置以下选项：

```ts
import { dateSorter } from "@vuepress/helper"
import { defineUserConfig } from "vuepress"
import { hopeTheme } from "vuepress-theme-hope"

export default defineUserConfig({
  theme: hopeTheme({
    blogLocales: {
      slide: "幻灯片",
      original: "原创",
    },
    plugins: {
      blog: {
        type: [
          {
            key: "slide",
            filter: (page) => page.frontmatter.layout === "Slide",
          },
          {
            key: "original",
            filter: (page) => !!page.frontmatter.original,
            sorter: (pageA, pageB) =>
              dateSorter(pageA.frontmatter.date, pageB.frontmatter.date),
          },
        ],
      },
    },
  }),
})
```
