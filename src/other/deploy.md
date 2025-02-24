---
title: deploy/cloudbaserc/env配置
date: 2025-02-24
author: htong
---

## deploy.sh

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# https://hr-koala.github.io/htblog/
git push -f git@github.com:hr-koala/htblog.git master:gh-pages

cd -
```

## cloudbaserc

```json
{
  "envId": "projectdocs-7ge7q19w00e92687",
  "version": "2.0",
  "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
  "functionRoot": "./functions",
  "functions": [],
  "framework": {
    "name": "projectdocs",
    "plugins": {
      "vuepress": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "buildCommand": "npm run docs:build",
          "outputPath": "docs/.vuepress/dist"
        }
      }
    }
  }
}
```

## env.development.local

```json
# 是否开启 mock 数据，关闭时需要自行对接后台接口
VITE_USE_MOCK = false

# 资源公共路径,需要以 /开头和结尾
VITE_PUBLIC_PATH = /

# 是否删除 Console.log
VITE_DROP_CONSOLE = false

# 本地开发代理，可以解决跨域及多地址代理
# 如果接口地址匹配到，则会转发到 http://localhost:3000，防止本地出现跨域问题
# 可以有多个，注意多个不能换行，否则代理将会失效
# http://172.24.16.41:8080/
VITE_PROXY = [["/api","http://172.24.13.88:7001/"],["/upload","http://localhost:3300/upload"]]

# 本地开发 iframe 嵌入的模块代理配置
VITE_EXTERNAL_PROXY = [["^/workflow","http://10.202.63.5:7000/"]]

# 用于代理转发的前缀
VITE_PROXY_API_URL_PREFIX=/api

VITE_WEBSOCKET_PROXY_URL='172.24.16.154:7000'
```
