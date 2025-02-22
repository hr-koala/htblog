# projectdocs

## 命令行创建

> `npm init vuepress vuepress-demo`

> `npm init vuepress-theme-hope@latest mydocs`

## 手动创建文件文档

> mkdir vuepress-demo
> cd vuepress-demo

> git init
> npm init

> 安装 vuepress
> **_ npm install -D vuepress@next _**
> 安装打包工具和主题
> **_ npm install -D @vuepress/bundler-vite@next @vuepress/theme-default@next _**

> mkdir docs
> mkdir docs/.vuepress

> 创建 VuePress 配置文件 docs/.vuepress/config.js

```ts
import { viteBundler } from "@vuepress/bundler-vite"
import { defaultTheme } from "@vuepress/theme-default"
import { defineUserConfig } from "vuepress"
export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
})
```

```ts
npm install
npm run docs:dev
npm run docs:build
```

```ts
yarn install
yarn docs:dev
yarn docs:build
```

##

- docs/.vuepress: 用于存放全局的配置、组件、静态资源等。
- docs/.vuepress/components: 该目录中的 Vue 组件将会被自动注册为全局组件。
- docs/.vuepress/theme: 用于存放本地主题。
- docs/.vuepress/styles: 用于存放样式相关的文件。
- docs/.vuepress/styles/index.scss: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- docs/.vuepress/styles/palette.scss: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- docs/.vuepress/public: 静态资源目录。
- docs/.vuepress/templates: 存储 HTML 模板文件。
- docs/.vuepress/templates/dev.html: 用于开发环境的 HTML 模板文件。
- docs/.vuepress/templates/ssr.html: 构建时基于 Vue SSR 的 HTML 模板文件。
- docs/.vuepress/config.js: 配置文件的入口文件，也可以是 YML 或 toml。
- docs/.vuepress/enhanceApp.js: 客户端应用的增强。
