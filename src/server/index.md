<!--
 * @Date: 2025-07-30 11:07:41
 * @LastEditTime: 2025-10-14 09:57:56
 * @Description: 
-->

# 前后端联动部署：基于 Vue/React + SpringBoot 的全栈 CI/CD 流水线实践

## 1：前后端联动部署的工程挑战与 CI/CD 背景
前后端分离架构已成为主流开发范式，但在部署阶段，前端（Vue/React）和后端（SpringBoot）往往存在构建产物依赖不清、部署环境不一致、配置注入割裂等问题，导致上线流程复杂、稳定性不足。实现完整的 CI/CD 自动化联动部署，要求在工程结构、构建逻辑、环境参数、版本管理等方面进行标准化设计。

1. 传统部署方式的问题
  - 前端构建产物需手动拷贝到后端资源目录；
  - 配置（如 API 地址）嵌入前端代码，构建前手动切换；
  - 无法统一使用 CI/CD 工具管理版本与状态，难以追溯问题来源；
  - 多人协作下发布顺序混乱，缺乏流水线执行保障机制。

2. CI/CD 联动部署的优势
  - 构建、集成、部署一体化，统一由流水线管理；
  - 前端产物自动注入至后端 WAR/JAR 包或挂载目录；
  - 多环境配置自动注入，无需手工切换打包命令；
  - 自动化测试、审计、回滚机制完善，可构建版本归档体系。

3. 实践背景与场景适配
    - 适用于单仓库与多仓库结构（mono repo / multi repo）；
    - 支持多阶段流水线：build-frontend、build-backend、package、deploy；
    - 可部署至传统服务器、Kubernetes、云原生平台。

## 2：典型全栈项目结构设计与构建边界划分
全栈项目的工程结构直接影响流水线的整合复杂度与可维护性。建议根据团队规模与项目模块数，选择合理的目录划分与构建职责边界。

2.1 单仓库结构建议（monorepo）
```component
project-root/
├── frontend/       # Vue 或 React 项目根目录
│   ├── package.json
│   └── dist/       # 构建后静态资源
├── backend/        # SpringBoot 后端项目
│   ├── pom.xml
│   └── src/
└── .gitlab-ci.yml / .github/workflows/
```

优势：构建、版本控制统一，易于管理全栈项目生命周期
劣势：前后端耦合强，适合中小型团队统一开发交付

2.2 多仓库结构建议（multi-repo）

- 前端项目与后端项目独立部署 CI/CD，产物交由镜像仓库/构建产物仓库交接；
- 使用 Tag/Release 或 API 调用触发联动构建（可选使用 ArgoCD AppSet 做联合管理）。
适用于中大型组织、前后端团队职责明确的场景。

2.3 构建职责边界设计
|模块|构建阶段|输出产物|依赖方|
|---|---|---|---|
|前端|编译、压缩、构建|dist/ 目录|后端 SpringBoot 或 NGINX|
|后端|编译、打包、集成|JAR、Docker Image|部署平台|
|联合构建|整合与环境注入|完整部署单元|交付流水线/部署平台|

在统一构建方案下，建议将前端构建产物通过流水线复制或挂载至 SpringBoot 静态资源目录或外部服务器，实现发布统一与版本一致性控制。

## 3：前端构建阶段（Vue/React）自动化配置与产物输出
在前后端联动部署中，前端构建阶段不仅要完成静态资源编译压缩，还需要对环境变量进行注入、构建产物重命名、与后端部署路径对齐等操作。流水线需要将此阶段独立处理，以确保构建产物具备跨环境兼容性与后端可集成性。

3.1 Vue/React 的构建命令与配置要点
- Vue 项目常用构建命令：
> npm install && npm run build

对应的构建产物通常输出至 dist/ 目录，可通过 vue.config.js 配置 publicPath 与打包路径。

- React 项目常用构建命令：
> npm install && npm run build

构建产物默认位于 build/ 目录，需通过 .env.production 控制静态资源的根路径。

3.2 环境变量与 API 网关注入机制
在前端打包阶段，应避免硬编码后端接口地址，可通过 .env.* 文件配置 VUE_APP_API_URL 或 REACT_APP_API_URL，并在组件或 axios 中读取：
> const apiBase = process.env.VUE_APP_API_URL

流水线中通过设置环境变量自动注入：
```
script:
  - export VUE_APP_API_URL=$API_GATEWAY_URL
  - npm run build
```

3.3 构建产物标准化输出
建议在流水线中将构建产物重命名或归档，以支持下游任务识别。例如：
> mv dist frontend-dist-$CI_COMMIT_SHA

并通过 artifacts 保留：
```
artifacts:
  paths:
    - frontend-dist-$CI_COMMIT_SHA
  expire_in: 1 week
```

## 4：后端 SpringBoot 构建与前端资源集成策略
SpringBoot 后端的构建流程可使用 Maven 或 Gradle 完成编译打包，在此基础上集成前端资源成为统一交付包，提升部署效率与版本一致性。

4.1 后端构建流程（Maven）
> ./mvnw clean package -DskipTests

构建后生成的 target/*.jar 即为部署包，可用于 Docker 构建或直接部署。

4.2 前端资源集成路径设计
可通过以下两种方式实现前端资源集成：

方式一：打包进 SpringBoot 静态资源路径
将前端构建产物复制至：
> src/main/resources/static/

或：
> src/main/resources/public/

打包时前端资源将自动内嵌进 JAR 包，适合部署统一。
> cp -r ../frontend/dist/* src/main/resources/static/

方式二：挂载至外部 Web 服务或 CDN
适用于前后端部署解耦方案，后端仅作为 API 服务，前端部署至 NGINX、OSS、CloudFront 等资源服务。

流水线中需记录构建产物版本与 CDN 路径关系，保证版本对齐。

4.3 自动化整合示例（GitLab CI）
```
build-backend:
  stage: build
  script:
    - cp -r frontend/dist/* backend/src/main/resources/static/
    - cd backend
    - ./mvnw clean package -DskipTests
  artifacts:
    paths:
      - backend/target/*.jar
```
通过该结构，前后端产物合并为统一构建单元，为部署阶段（Docker 构建或 Kubernetes 部署）打下基础。

## 5：前后端整合后的 Docker 镜像构建与版本控制策略
在 CI/CD 全流程中，完成前后端构建与整合后，需统一打包为 Docker 镜像以便于部署、回滚与多环境管理。构建过程应保证镜像结构清晰、缓存可复用、版本可追溯。

5.1 多阶段构建 Dockerfile 示例
以下是结合前端构建与 SpringBoot 后端的典型多阶段构建方案：
```
# 前端构建阶段
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# 后端构建阶段
FROM maven:3.9.5-eclipse-temurin-17 AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
COPY backend/src ./src
COPY --from=frontend-builder /app/frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# 最终运行镜像
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=backend-builder /app/backend/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```
该结构具备良好的层次划分，避免构建依赖进入最终镜像，同时实现构建与部署解耦。

5.2 镜像版本控制规范
建议结合以下信息生成唯一镜像标签：
- Git 分支名（如 dev / main）
- 提交哈希（如 g1a3f4c）
- 构建流水线号（如 #112）

示例：
> registry.company.com/project/webapp:dev-g1a3f4c-112
便于在多环境部署中实现版本回溯与精确回滚。

5.3 镜像推送与仓库管理实践
建议使用私有镜像仓库如 Harbor、GitLab Container Registry、AWS ECR 等，并设置合理的权限、生命周期与镜像保留策略。流水线中示例推送指令：
```
script:
  - docker build -t $CI_REGISTRY_IMAGE:$TAG .
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  - docker push $CI_REGISTRY_IMAGE:$TAG
```
## 6：自动部署至测试/预发环境与联动回归验证
完成构建与推送后，下一阶段需实现自动化部署流程，确保部署后的服务可联动完成自动化测试与集成验证。

6.1 常见部署策略对比
|部署模式	|适用场景	|优点	|风险控制措施|
|--|--|--|--|
|直接部署	|内部测试环境	|快速验证迭代	|版本隔离、频繁更新|
|ArgoCD 发布	|云原生环境|	支持 GitOps、可视化|	严格权限控制|
|Helm 手动发布|	多服务复杂依赖场景|	可版本控制、依赖声明|	人工干预需审计|

6.2 自动部署示例：GitLab CI + Helm
```
deploy-dev:
  stage: deploy
  script:
    - helm upgrade --install webapp ./charts/webapp \
        --set image.tag=$TAG \
        --set env=dev \
        --namespace dev
```
建议将 values.yaml 与环境配置分离，通过 values-dev.yaml、values-staging.yaml 管理多环境部署参数。

6.3 自动化验证接入
部署后自动触发以下操作：

- 使用 curl/HTTPie 验证接口连通；
- 自动触发接口测试任务（如 REST Assured 套件）；
- 上传验证结果至测试平台或告警系统（如 Allure 报告 + 飞书/Slack 消息推送）。
通过前后端一体化部署 + 自动化验证，企业可构建起完整的交付闭环，有效降低联调成本与发布失败率。

## 7：版本回滚机制与历史构建状态治理策略
在前后端一体化部署场景下，任何版本的发布都必须具备回滚机制，确保在接口兼容性、页面逻辑、配置注入等出现问题时能第一时间恢复至上一个稳定版本。

7.1 镜像级回滚方案
前提：所有构建产物均以带标签的 Docker 镜像推送至仓库，并记录于构建日志中。

示例：
```
docker pull registry.company.com/project/webapp:prod-v1.2.8
docker tag registry.company.com/project/webapp:prod-v1.2.8 webapp:rollback
kubectl set image deployment/webapp webapp=webapp:rollback -n prod
```
或通过 Helm 指定历史版本：
```
helm rollback webapp 5 --namespace prod
```
7.2 前端资源的版本隔离建议
前端产物发布至 CDN 时，建议目录/URL 加版本标识：
> https://cdn.company.com/webapp/1.2.8/

后端返回资源路径时动态拼接版本信息，防止缓存污染与错误加载。

7.3 构建记录与状态治理实践
所有构建任务应输出以下内容：

- Git 提交信息与构建号
- 前端版本 + 后端版本 + 构建时间
- 镜像 tag 与发布状态（成功 / 回滚）
并写入日志数据库或 DevOps 平台（如 GitLab Release 页面、Jenkins 插件、Sentry、Datadog）。构建状态页面应支持筛选、快速回滚与审计。

## 8：企业级前后端联动流水线模板与持续演进建议
在多个项目并行开发的场景中，企业需构建统一的流水线模板，适配前后端分离架构下的联动构建、测试、部署、回滚与审计能力。

8.1 多语言协同流水线结构
- 前端阶段：依赖安装、构建、产物归档、CDN 发布
- 后端阶段：依赖构建、测试、镜像构建、推送
- 联动阶段：集成前端静态资源、构建统一产物（如完整 Docker 镜像）
- 部署阶段：通过 Helm/ArgoCD 发布
- 回归验证阶段：接口测试 + UI 自动化测试

8.2 跨项目模板抽象与组件复用路径
使用 GitLab CI 的 include: 或 Jenkins Shared Library 等机制将常用流程组件化：
```
include:
  - project: 'ci-templates/springboot-vue'
    file: '/.gitlab-ci-template.yml'
```
统一管理的组件包含：

- 构建任务定义
- 镜像命名与推送策略
- 安全扫描流程（如代码审计、漏洞检测）
- 版本发布记录与通知机制
8.3 持续演进方向建议
- 引入 GitOps：部署 YAML 全部托管 Git，配合 ArgoCD 实现 Declarative 发布。
- 引入 QA 自动化平台：打通接口自动化、性能测试与冒烟测试。
- 推进 AIOps 运维能力：接入部署指标、异常检测与自动回滚策略。
通过将联动流程标准化为可配置、可追踪、可复用的模板体系，企业能够有效提升工程交付效率、质量与安全性，为更复杂微服务架构与多端统一交付提供基础保障。


仓库地址  `https://github.com/hr-koala/htblog/tcp.git`
部署路径：`/home/SERVER/tcp`

- 首次部署：
打包后 `bootapp\target\tcp-1.0.0-SNAPSHOT-bin.tar.gz` 上传至部署路径下
执行 `tar -zxvf tcp-1.0.0-SNAPSHOT-bin.tar.gz`
进入 `/home/SERVER/tcp/tcp-1.0.0-SNAPSHOT/conf` 修改`application.yml` 主要是端口，zk配置与数据库配置
进入 `/home/SERVER/tcp/tcp-1.0.0-SNAPSHOT/bin` 启动 `sh startup.sh`

- 后续更新打包：
上传 `bootapp\target\tcp-1.0.0-SNAPSHOT-assembly.jar` 至 `/home/SERVER/tcp/tcp-1.0.0-SNAPSHOT/lib` 替换
进入 `/home/SERVER/tcp/tcp-1.0.0-SNAPSHOT/bin`  停止 `sh shutdown.sh` 启动 `sh startup.sh` 


1.选择代码源和分支：仓库地址：github
安装依赖：`npm install --registry=https://registry.npmmirror.com`
选择环境：`node v18.20` 
`cd web-ui`
`pnpm install`
代码检查(可选)：`pnpm run lint`(需package.json中配置lint脚本)
单元测试(可选): `pnpm run test`(需配置测试框架Jest、Mocha等)
`rimraf dist`
构建: `pnpm run build`；(需在 package.json 中配置 build 脚本，如 vue-cli-service build 或 react-scripts build)
部署路径：服务器 `10.14.148.206`   `/home/SERVER/fic_client/web-app/apps` (账号密码：root/123456)

- 部署脚本：
- #删除原dist文件
`rm -rf /www/wwwroot/dist`
- #重新创建dist文件
`mkdir /www/wwwroot/dist`
- #解压构建的dist压缩包到指定目录
`tar zxvf /home/admin/app/vue-dist.tgz -C /www/wwwroot/dist`
- #删除dist压缩包
`rm -rf /home/admin/app/vue-dist.tgz`
