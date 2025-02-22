import { navbar } from "vuepress-theme-hope"

export const navbarEn = navbar([
  "/",
  { text: "大前端", link: "/largeFront" },
  { text: "算法", link: "/algorithm" },
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
