---
title: env.development.local
# sidebar: "auto"
# navbar: true
# sidebarDepth: 4
---

<!-- .env.development.local -->

```js
# 是否开启mock数据，关闭时需要自行对接后台接口
VITE_USE_MOCK = false

# 资源公共路径,需要以 /开头和结尾
VITE_PUBLIC_PATH = /

# 是否删除Console.log
VITE_DROP_CONSOLE = false

# 本地开发代理，可以解决跨域及多地址代理
# 如果接口地址匹配到，则会转发到http://localhost:3000，防止本地出现跨域问题
# 可以有多个，注意多个不能换行，否则代理将会失效
# http://172.24.16.41:8080/ http://172.24.16.144:7000/    10.30.7.23:8080
VITE_PROXY = [["/api","http://172.24.13.88:7001/"],["/upload","http://localhost:3300/upload"]]
# 本地开发iframe 嵌入的模块代理配置
VITE_EXTERNAL_PROXY = [["^/workflow","http://10.202.63.5:7000/"]]


# 用于代理转发的前缀
VITE_PROXY_API_URL_PREFIX=/api

VITE_WEBSOCKET_PROXY_URL='172.24.13.88:7001'
```
