import { viteBundler } from "@vuepress/bundler-vite"
import { defaultTheme } from "@vuepress/theme-default"
import { defineUserConfig } from "vuepress"
import { navbarZh, sidebarZh } from "./configs/index.ts"

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "博客和随笔",
      description: "Vue 驱动的静态网站生成器",
    },
  },
  lang: "en-US",
  title: "VuePress",
  description: "My first VuePress Site",
  theme: defaultTheme({
    logo: "https://vuejs.press/images/hero.png",

    locales: {
      // 默认主题配置
      "/": {
        navbar: navbarZh,
        selectLanguageName: "简体中文",
        selectLanguageText: "选择语言",
        selectLanguageAriaLabel: "选择语言",
        sidebar: sidebarZh,
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdatedText: "上次更新",
        contributorsText: "贡献者",
        // custom containers
        tip: "提示",
        warning: "注意",
        danger: "警告",
        // 404 page
        notFound: [
          "这里什么都没有",
          "我们怎么到这来了？",
          "这是一个 404 页面",
          "看起来我们进入了错误的链接",
        ],
        backToHome: "返回首页",
        // a11y
        openInNewWindow: "在新窗口打开",
        toggleColorMode: "切换颜色模式",
        toggleSidebar: "切换侧边栏",
      },
    },
  }),
  bundler: viteBundler(),
})
