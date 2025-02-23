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
        prefix: "nodejs/",
        link: "nodejs/",
      },
      {
        text: "Php",
        prefix: "php/",
        link: "php/",
      },
      "Electerm",
      "Xshell",
    ],
  },
  { text: "算法", icon: "book", link: "algorithm/" },
  { text: "金融", icon: "book", link: "financial/" },
  { text: "项目管理", icon: "pen-to-square", link: "projectManagement/" },
  { text: "其他", icon: "pen-to-square", link: "other/" },
  {
    text: "Guide",
    children: [
      {
        text: "htong's Bolg",
        children: [
          { text: "CSDN", icon: "link", link: "https://blog.csdn.net/XJ5210224" },
          { text: "Gitee", icon: "link", link: "https://gitee.com/explore/all" },
        ],
      },
    ],
  },
])
