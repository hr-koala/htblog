import { sidebar } from "vuepress-theme-hope"

export const sidebarEn = sidebar({
  "/": [
    "",
    {
      text: "LargeFront",
      icon: "laptop-code",
      prefix: "largeFront/",
      children: "structure",
    },
    {
      text: "Backend",
      icon: "backend",
      prefix: "backend/",
      children: "structure",
    },
    {
      text: "Algorithm",
      icon: "algorithm",
      prefix: "algorithm/",
      children: "structure",
    },
  ],
})
