import { navbar } from "vuepress-theme-hope"

export const navbarEn = navbar([
  "/",
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
