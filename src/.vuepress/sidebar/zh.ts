import { sidebar } from "vuepress-theme-hope"

export const sidebarZh = sidebar({
  "/": [
    "",
    {
      text: "前端",
      icon: "laptop-code",
      prefix: "vue/",
      link: "vue/",
      children: "structure",
    },
    {
      text: "后端",
      icon: "react",
      prefix: "react/",
      children: "structure",
    },
    {
      text: "算法",
      icon: "react",
      prefix: "react/",
      children: "structure",
    },
    "intro",
  ],
})
