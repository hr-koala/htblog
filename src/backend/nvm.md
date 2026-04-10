---
title: NVM 配置
date: 2025-02-26
article: false
---

## nvm 安装、node 安装及 node 版本切换管理

先卸载 node！ <br/>
进入 nvm 下载网页，选择 `nvm-setup.exe` [下载](https://nvm.uihtm.com/download.html) <br/>
重新打开 cmd，输入 nvm 或者 `nvm -v` 验证 <br/>
`nvm -v` 查看版本 <br/>

配置镜像:
nvm 安装路径下，打开 `setting.txt`  配置

```js
root: D:\**\nvm
path: D:\**\nodeJs
arch: 64
proxy: none
originalpath: .
originalversion:
node_mirror: `https://npm.taobao.org/mirrors/node/`
npm_mirror: `https://npm.taobao.org/mirrors/npm/`
// node_mirror: https://npmmirror.com/mirrors/node/
// npm_mirror: https://npmmirror.com/mirrors/npm/
```

> NVM_HOME: D:\packages\nvm
> NVM_SYMLINK: D:\packages\nodejs

## 配置淘宝镜像

> nvm node_mirror [`https://npm.taobao.org/mirrors/node/`](https://npm.taobao.org/mirrors/node/) <br/>
> nvm npm_mirror [`https://npm.taobao.org/mirrors/npm/`](https://npm.taobao.org/mirrors/npm/) <br/>
> 阿里云镜像 <br/>
> nvm npm_mirror [`https://npmmirror.com/mirrors/npm/`](https://npmmirror.com/mirrors/npm/) <br/>
> nvm node_mirror [`https://npmmirror.com/mirrors/node/`](https://npmmirror.com/mirrors/node/) <br/>
> 腾讯云镜像 <br/>
> nvm npm_mirror [`http://mirrors.cloud.tencent.com/npm/`](http://mirrors.cloud.tencent.com/npm/) <br/>
> nvm node_mirror [`http://mirrors.cloud.tencent.com/nodejs-release/`](http://mirrors.cloud.tencent.com/nodejs-release/) <br/>

## nvm 常用命令

> nvm version // 查看 nvm 版本
> nvm arch // 显示 node 是运行在 32 位还是 64 位
> nvm list available // 显示远程可安装的列表，list 也可简化为 ls
> nvm list // 展示本地安装的所有版本，\*号表示当前正在用 <br/>
> nvm install [版本号] //安装指定版本 node 例如： nvm install 18.18.0 <br/>
> nvm use 18.18.0 //使用特定版本 <br/>
> nvm uninstall 18.18.0 //卸载指定版本 <br/>

## nvm 下载 node

> nvm install latest <br/> // 安装最新版本
> nvm install 14.17.6 <br/>
> nvm install 18.16.0 <br/>
> nvm use 18.16.0 //必须有输入这行命令后，node 命令才会生效 <br/>
> /_检查 node 是否安装成功_/ <br/>
> node -v <br/>
> npm -v <br/>
> where node // node 在哪里 <br/>
> npm config ls -ls 命令，将会列出所有的配置参数 <br/>

> nvm ls-remote // 查看可安装版本
> nvm install stable // 安装稳定版本
> nvm current // 查看当前版本
> npm config set prefix D:\nodejs\node_global_modules // 配置prefix修改node的全局模块安装路径


## node 环境配置

### 设置淘宝镜像

> `npm config set registry https://registry.npm.taobao.org`

### 配置全局目录

> npm config get prefix <br/>
> npm config get cache <br/>
> npm config set prefix "D:\*\*\nodeJs\node_global" <br/>
> npm config set cache "D:\*\*\nodeJs\node_cache" <br/>

### 全局安装 cnpm

> `npm install -g cnpm --registry=https://registry.npm.taobao.org`


