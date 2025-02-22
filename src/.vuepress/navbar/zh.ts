import { navbar } from "vuepress-theme-hope"

export const navbarZh = navbar([
  "/",
  {
    text: "前端",
    icon: "pen-to-square",
    // prefix: "/vue/",
    children: [
      {
        text: "vue",
        icon: "pen-to-square",
        prefix: "vue",
        children: [{ text: "vue", icon: "pen-to-square", link: "axios" }],
      },
    ],
  },
  {
    text: "后端",
    icon: "pen-to-square",
    prefix: "/react/",
    children: [
      {
        text: "react",
        icon: "pen-to-square",
        prefix: "react/",
        children: [{ text: "react", icon: "pen-to-square", link: "react" }],
      },
    ],
  },
  {
    text: "算法",
    icon: "book",
    link: "/",
  },
  {
    text: "金融",
    icon: "book",
    link: "/",
  },
])
