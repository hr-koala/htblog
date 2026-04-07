/*
 * @Date: 2025-02-27 11:15:36
 * @LastEditTime: 2026-04-07 11:19:04
 * @Description:
 */
import { navbar } from "vuepress-theme-hope";

export const navbarZh = navbar([
  "/",
  {
    text: "大前端",
    icon: "laptop-code",
    prefix: "/largeFront/",
    children: [
      { text: "Vue3", icon: "book", prefix: "vue3/", link: "vue3/" },
      { text: "Vue", icon: "book", prefix: "vue/", link: "vue/" },
      { text: "React", icon: "book", prefix: "react/", link: "react/" },
    ],
  },
  {
    text: "后端",
    icon: "server",
    prefix: "/backend/",
    children: [
      { text: "NodeJS", icon: "node-js", prefix: "nodejs", link: "nodejs" },
      { text: "Php", icon: "php", prefix: "php", link: "php" },
      {
        text: "Electerm",
        icon: "terminal",
        prefix: "Electerm",
        link: "electerm",
      },
      { text: "Xshell", icon: "terminal", prefix: "Xshell", link: "xshell" },
    ],
  },
  { text: "算法", icon: "calculator", link: "/algorithm/" },
  { text: "插件", icon: "puzzle-piece", link: "/plugins/" },
  { text: "金融", icon: "chart-line", link: "/financial/" },
  { text: "项目管理", icon: "tasks", link: "/projectManagement/" },
  { text: "其他", icon: "folder", link: "/other/" },
  {
    text: "Guide",
    icon: "link",
    children: [
      { text: "CSDN", icon: "blog", link: "https://blog.csdn.net/XJ5210224" },
      {
        text: "Gitee",
        icon: "code-branch",
        link: "https://gitee.com/explore/all",
      },
    ],
  },
]);
