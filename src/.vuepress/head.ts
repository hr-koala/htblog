import { HeadConfig } from "vuepress";

export const head: HeadConfig[] = [
  [
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,user-scalable=no",
    },
  ],
  ["link", { rel: "icon", href: "/assets/hero.png" }],
];
