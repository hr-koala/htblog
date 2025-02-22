import { defineUserConfig } from "vuepress"
import { hopeTheme } from "vuepress-theme-hope"

import { navbarZh } from "./navbar/index.js"
import { sidebarZh } from "./sidebar/index.js"

export default defineUserConfig({
  base: "/htblog/",
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
  theme: hopeTheme({
    hostname: "xxxx",
    author: {
      name: "htong",
      url: "htong890@outlook.com",
    },
    logo: "/hero.png",
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    docsDir: "src",
    // locales: {
    //   // 默认主题配置
    //   "/": {
    //     navbar: navbarZh,
    //     selectLanguageName: "简体中文",
    //     selectLanguageText: "选择语言",
    //     selectLanguageAriaLabel: "选择语言",
    //     sidebar: sidebarZh,
    //     editLinkText: "在 GitHub 上编辑此页",
    //     lastUpdatedText: "上次更新",
    //     contributorsText: "贡献者",
    //     // custom containers
    //     tip: "提示",
    //     warning: "注意",
    //     danger: "警告",
    //     // 404 page
    //     notFound: [
    //       "这里什么都没有",
    //       "我们怎么到这来了？",
    //       "这是一个 404 页面",
    //       "看起来我们进入了错误的链接",
    //     ],
    //     backToHome: "返回首页",
    //     // a11y
    //     openInNewWindow: "在新窗口打开",
    //     toggleColorMode: "切换颜色模式",
    //     toggleSidebar: "切换侧边栏",
    //   },
    // },
    // 导航栏
    navbar: navbarZh,
    // 侧边栏
    sidebar: sidebarZh,
    // 页脚
    footer: "默认页脚",
    displayFooter: true,
    // 博客相关
    blog: {
      description: "一个前端开发者",
      // intro: "/intro.html",
      medias: {
        Baidu: "https://baidu.com",
        VuePressThemeHope: {
          icon: "https://theme-hope-assets.vuejs.press/logo.svg",
          link: "https://xxx",
        },
      },
    },

    // 加密配置
    encrypt: {
      config: {
        "/vue/axios.html": {
          hint: "Password: 1234",
          password: "1234",
        },
      },
    },

    // 多语言配置
    metaLocales: {
      editLink: "在 GitHub 上编辑此页",
    },

    // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
    // hotReload: true,

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    markdown: {
      align: true,
      attrs: true,
      codeTabs: true,
      component: true,
      demo: true,
      figure: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              }
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,

      // 取消注释它们如果你需要 TeX 支持
      // markdownMath: {
      //   // 启用前安装 katex
      //   type: "katex",
      //   // 或者安装 mathjax-full
      //   type: "mathjax",
      // },

      // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
      // revealjs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 chart.js
      // chartjs: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // 在启用之前安装 sandpack-vue3
      // sandpack: true,
    },

    // 在这里配置主题提供的插件
    plugins: {
      blog: true,

      // 启用之前需安装 @waline/client
      // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
      // comment: {
      //   provider: "Waline",
      //   serverURL: "https://waline-comment.vuejs.press",
      // },

      components: {
        components: ["Badge", "VPCard"],
      },

      icon: {
        prefix: "fa6-solid:",
      },

      // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
      // pwa: {
      //   favicon: "/favicon.ico",
      //   cacheHTML: true,
      //   cacheImage: true,
      //   appendBase: true,
      //   apple: {
      //     icon: "/assets/icon/apple-icon-152.png",
      //     statusBarColor: "black",
      //   },
      //   msTile: {
      //     image: "/assets/icon/ms-icon-144.png",
      //     color: "#ffffff",
      //   },
      //   manifest: {
      //     icons: [
      //       {
      //         src: "/assets/icon/chrome-mask-512.png",
      //         sizes: "512x512",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-mask-192.png",
      //         sizes: "192x192",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-512.png",
      //         sizes: "512x512",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-192.png",
      //         sizes: "192x192",
      //         type: "image/png",
      //       },
      //     ],
      //     shortcuts: [
      //       {
      //         name: "Demo",
      //         short_name: "Demo",
      //         url: "/demo/",
      //         icons: [
      //           {
      //             src: "/assets/icon/guide-maskable.png",
      //             sizes: "192x192",
      //             purpose: "maskable",
      //             type: "image/png",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },
    },
  }),

  // 和 PWA 一起启用
  // shouldPrefetch: false,
})
