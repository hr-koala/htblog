import { navbar } from "vuepress-theme-hope"

export const navbarZh = navbar([
  "/",
  {
    text: "大前端",
    icon: "pen-to-square",
    // prefix: "/largeFront/",
    children: [
      {
        text: "前端",
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
    link: "/algorithm",
  },
  {
    text: "金融",
    icon: "book",
    link: "/",
  },
  {
    text: "Guide",
    children: [
      {
        text: "htong's Bolg",
        children: [
          { text: "CSDN", link: "https://blog.csdn.net/XJ5210224" },
          { text: "Gitee", link: "https://gitee.com/explore/all" },
        ],
      },
    ],
  },
  { text: "项目管理", link: "/projectManagement" },
  { text: "其他", link: "/other" },
])
