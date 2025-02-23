import { navbar } from "vuepress-theme-hope"

export const navbarZh = navbar([
  "/",
  {
    text: "大前端",
    icon: "pen-to-square",
    prefix: "/largeFront/",
    children: [
      {
        text: "Vue",
        icon: "book",
        prefix: "vue/",
        link: "vue/",
        // children: ["axios"],
      },
      {
        text: "React",
        icon: "pen-to-square",
        prefix: "react/",
        link: "react/",
        // children: ["react"],
      },
    ],
  },
  {
    text: "后端",
    icon: "pen-to-square",
    prefix: "backend/",
    children: [
      {
        text: "Node",
        icon: "pen-to-square",
        prefix: "node/",
        link: "node/",
        // children: [{ text: "node", icon: "pen-to-square", link: "node" }],
      },
    ],
  },
  {
    text: "算法",
    icon: "book",
    link: "algorithm/",
  },
  {
    text: "金融",
    icon: "book",
    link: "financial/",
  },
  { text: "项目管理", link: "/projectManagement/" },
  { text: "其他", link: "/other/" },
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
])
