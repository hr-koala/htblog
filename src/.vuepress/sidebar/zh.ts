import { sidebar } from "vuepress-theme-hope"

export const sidebarZh = sidebar({
  "/": [
    "",
    {
      text: "大前端",
      icon: "laptop-code",
      prefix: "largeFront/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "后端",
      icon: "backend",
      prefix: "backend/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "算法",
      icon: "algorithm",
      prefix: "algorithm/",
      children: "structure",
    },
    {
      text: "介绍",
      icon: "intro",
      prefix: "intro/",
      children: "structure",
    },
  ],
})
