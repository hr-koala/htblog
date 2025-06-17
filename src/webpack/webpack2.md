---
title: webpack
---

###

```ts
let libs = [
  {
    name: "vue",
    dist: "dist",
    dev: "vue.js",
    prod: "vue.min.js",
    has_cdn: true,
    version: "",
    lazy: false,
  },
];

/* eslint-disable */
// @ts-check
const path = require("path");
const fs = require("fs");
const zlib = require("zlib");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// let libs = require("./external-details");
const package = require("../package.json");
const UI_PACKAGE_NAME = "ui";
const TEMPLATE_PACKAGE_NAME = "ui-template";

const is_production = process.env.NODE_ENV === "production";
const cdn_prefix = "https://cdn.bootcdn.net/ajax/libs";

const mode = is_production ? "prod" : "dev";

const use_common_dependence = false;
libs = use_common_dependence ? libs : [];

/**
 * 构造(本地)依赖库路径
 * cdn_url:    https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.js
 * cdn_format: https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{file_name}
 *
 * @param {boolean} use_cdn
 * @returns {{name: string, script: string}[]}
 */
/**
 * 生成 CDN 或本地资源的脚本路径
 * @param {boolean} use_cdn - 是否使用 CDN
 * @param {string} publicPath - 公共资源路径
 * @returns {Array<{name: string, script: string}>} 返回包含脚本名称和路径的对象数组
 * @description 根据配置生成库文件的脚本路径,支持 CDN 和本地资源两种模式
 * - CDN 模式: {cdn_prefix}/{lib.name}/{version}/{lib[mode]}
 * - 本地模式: {publicPath}/venders/{lib.name}/{version}/{lib[mode]}
 */
function cdn_scripts(use_cdn, publicPath) {
  const scripts = libs.map((lib) => {
    // process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录，保证了文件在不同的目录下执行时，路径始终不变
    const package = path.resolve(
      process.cwd(),
      "node_modules",
      lib.name,
      "package.json"
    );
    const { version } = require(package);
    lib.version = version;
    const prefix =
      use_cdn && lib.has_cdn ? cdn_prefix : publicPath + "/venders";
    /* const script = is_production ?
      `${prefix}/${lib.name}/${version}/${lib[mode]}` :
      `${prefix}/${lib.name}/${lib.dist}/${lib[mode]}?version=${version}`; */
    const script = `${prefix}/${lib.name}/${version}/${lib[mode]}`;
    return { name: lib.name, script };
  });

  return scripts;
}

/**
 * 解析命令行参数中的环境变量配置
 * @param {Object} configArgv - webpack 配置参数对象
 * @param {Array} configArgv.original - 原始命令行参数数组
 * @returns {Object} envs - 解析后的环境变量对象
 * @example
 * // 输入: --env:prod
 * // 返回: { env: 'prod' }
 */
function get_envs(configArgv) {
  let { original } = configArgv;
  let envs = {};
  if (original && original.length) {
    original.forEach((str) => {
      if (str.indexOf("--") === 0) {
        let arr = str.substr(2).split(":");
        if (arr.length === 2) {
          envs[arr[0]] = arr[1];
        }
      }
    });
  }
  return envs;
}

/**
 * 拷贝(本地)依赖库, 微应用不拷贝VUE的基础模块（Vue, VueRouter, Vuex, VueI18n, ElementUI）
 *
 * @param {string} outputDir
 * @param {string[]} exclude_libs
 * @returns
 */
/**
 * 复制第三方库脚本文件到指定输出目录
 * @param {string} outputDir - 输出目录路径
 * @param {string[]} exclude_libs - 需要排除的库名称列表
 * @returns {Array<{from: string, to: string}>} 返回包含源文件路径和目标文件路径的对象数组
 */
function copy_scripts(outputDir, exclude_libs) {
  return libs
    .filter((lib) => !exclude_libs.includes(lib.name))
    .map((lib) => {
      const from = path.resolve(
        process.cwd(),
        "node_modules",
        lib.name,
        lib.dist,
        lib[mode]
      );
      const to = path.resolve(
        process.cwd(),
        outputDir,
        "venders",
        lib.name,
        lib.version,
        lib[mode]
      );
      return { from, to };
    });
}

/* COPY依赖库 */
/**
 * 复制第三方依赖库文件到输出目录
 * @param {string} outputDir - 输出目录路径
 * @param {Array<string>} exclude_libs - 需要排除的依赖库名称列表
 *
 * 该函数会遍历所有依赖库:
 * 1. 读取每个库的 package.json 获取版本信息
 * 2. 复制相关脚本文件到输出目录
 * 3. 自动创建目标目录(如不存在)
 */
function copy_venders(outputDir, exclude_libs = []) {
  libs.forEach((lib) => {
    const package = path.resolve(
      process.cwd(),
      "node_modules",
      lib.name,
      "package.json"
    );
    const { version } = require(package);
    lib.version = version;
  });

  const scripts = copy_scripts(outputDir, exclude_libs);

  scripts.forEach((script) => {
    const { from, to } = script;
    // fs.existsSync(path): 验证文件是否存在。path为要验证的文件路径
    if (!fs.existsSync(path.dirname(to))) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
    }

    fs.copyFileSync(from, to);
  });
}

/**
 * 保存懒加载依赖库 src/config/lazy-libs.ts
 *
 * @param {{name: string, script: string}[]} lazyLibs
 * @returns
 */
function save_lazy_libs(lazyLibs) {
  const file = path.resolve(process.cwd(), "src/config/lazy-libs.ts");
  const contents = [
    'import { ScriptModel } from "ui-template/lib/utils/browser";',
    "",
    "export const LazyLibs: ScriptModel[] = [",
  ];
  lazyLibs.forEach((lib) => {
    contents.push(
      `  { name: "${lib.name}", src: "${lib.script}", loaded: false },`
    );
  });

  contents.push("];");
  contents.push("");
  fs.writeFileSync(file, contents.join("\n"));
}

// webpack-html-plugin处理index.html的cdn配置
/**
 * 处理CDN资源配置
 * @param {boolean} use_cdn - 是否使用CDN
 * @param {string} publicPath - 公共路径
 * @param {Array} exclude_libs - 需要排除的依赖库列表
 * @returns {Object} 返回非懒加载的脚本配置对象
 * {
 *   scripts: Array<string> - 非懒加载的脚本路径数组
 * }
 * @description
 * 该函数用于处理CDN资源,将依赖脚本分为懒加载和非懒加载两类:
 * - 懒加载脚本会被保存供后续使用
 * - 非懒加载脚本会被过滤掉exclude_libs中指定的依赖,并返回script路径列表
 */
function cdn(use_cdn, publicPath, exclude_libs = []) {
  const scripts = cdn_scripts(use_cdn, publicPath);

  // 懒加载的依赖脚本
  const lazyLibs = scripts.filter((s) => {
    const lib = libs.find((l) => l.name === s.name);
    return lib.lazy;
  });
  save_lazy_libs(lazyLibs);

  // 非懒加载的依赖脚本
  const nonLazyScripts = scripts
    .filter((s) => {
      const lib = libs.find((l) => l.name === s.name);
      return !lib.lazy && !exclude_libs.includes(lib.name);
    })
    .map((s) => s.script);

  return { scripts: nonLazyScripts };
}

// 修改webpack路径别名
function config_alias(config, not_dev = true) {
  console.log(
    "build app config_alias:",
    path.resolve(process.cwd(), "src/assets/scss/")
  );
  if (not_dev) {
    config.resolve.alias.set(
      "scss",
      path.resolve(process.cwd(), "src/assets/scss/")
    );
  } else {
    config.resolve.alias
      .set("ui-template", path.resolve(process.cwd(), "."))
      .set("scss", path.resolve(process.cwd(), "src/assets/scss/"));
  }
}

// 修改webpack-html-plugin参数, 增加（本地）依赖库处理
/**
 * 配置 HTML 插件的 CDN 和应用名称参数
 * @param {Object} config - webpack 配置对象
 * @param {string} app_name - 应用名称
 * @param {boolean} use_cdn - 是否使用 CDN
 * @param {string} [publicPath=""] - 公共路径
 * @param {string} [plugin="html-index"] - HTML 插件名称
 * @param {Array} [exclude_libs=[]] - 需要排除的库列表
 */
function config_html(
  config,
  app_name,
  use_cdn,
  publicPath = "",
  plugin = "html-index",
  exclude_libs = []
) {
  config.plugin(plugin).tap((args) => {
    args[0].cdn = cdn(use_cdn, publicPath, exclude_libs);
    args[0].app_name = app_name.replace("/", "-");
    return args;
  });
}

// 修改webpack-copy-plugin参数，增加拷贝（本地）依赖库处理)
function config_copy(
  config,
  app_name,
  use_cdn,
  outputDir,
  is_app = false,
  exclude_libs = [],
  exclude_apps = []
) {
  // cdn
  if (is_production && !use_cdn) {
    config.plugin("copy").tap((args) => {
      // 微应用public目录为public/$app_name/
      if (is_app) {
        args[0][0].from = path.resolve(process.cwd(), "public", app_name);
      } else {
        // 主应用忽略 apps,  vendor, app_name folders
        const ignore_folders = exclude_apps.map((e) => `${e}/**/*`);
        args[0][0].ignore.push("apps/**/*", "vendor/**/*", ...ignore_folders);
      }
      args[0].push(...copy_scripts(outputDir, exclude_libs));
      return args;
    });
  }
}

// 定义环境变量
/**
 * 配置 webpack 的 DefinePlugin 插件，用于注入环境变量和应用信息
 * @param {Object} config - webpack 配置对象
 * @param {Object} configArgv - 命令行参数对象
 *
 * 该函数主要完成以下工作:
 * 1. 获取并注入环境变量
 * 2. 注入 UI 组件库版本号
 * 3. 注入模板版本号
 * 4. 注入构建时间戳
 */
function config_define(config, configArgv) {
  console.log(config, configArgv);
  config.plugin("define").tap((args) => {
    let envs = get_envs(configArgv);
    Object.keys(envs).map((key) => {
      args[0]["process.env"][key] = JSON.stringify(envs[key]);
    });
    // 加入软件信息
    args[0]["process.env"]["VUE_APP_UI_VERSION"] = JSON.stringify(
      package.dependencies[UI_PACKAGE_NAME]
    );
    args[0]["process.env"]["VUE_APP_TEMPLATE_VERSION"] = JSON.stringify(
      package.dependencies[TEMPLATE_PACKAGE_NAME]
    );
    args[0]["process.env"]["VUE_APP_BUILD_TIME"] = JSON.stringify(
      getNowDateStr()
    );
    return args;
  });
}

function getNowDateStr() {
  let now = new Date();
  let nowStr =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1) +
    "-" +
    now.getDate() +
    " " +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds() +
    " " +
    now.getMilliseconds();
  return nowStr;
}

// 配置生产打包时压缩文件, 压缩大于４k的文件
function config_zip(config, is_prod) {
  if (is_prod) {
    config.plugin("compression-gzip").use(CompressionWebpackPlugin, [
      {
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          level: zlib.constants.Z_BEST_COMPRESSION,
        },
        threshold: 8192,
        minRatio: 0.9,
      },
    ]);
    // 大家一般都用的gzip进行压缩，vite压缩插件vite-plugin-compression默认支持的就是gzip，它的兼容性更好，但是在性能和压缩比率上比brotli有着不小的差距。
    config.plugin("compression-brotli").use(CompressionWebpackPlugin, [
      {
        filename: "[path][base].br",
        algorithm: "brotliCompress", // 启动brotli压缩
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]:
              zlib.constants.BROTLI_MAX_QUALITY,
          },
        },
        threshold: 4096,
        minRatio: 0.9,
        deleteOriginalAssets: false,
      },
    ]);
  }
}

// 配置swc编译加快打包速度
function config_swc(config, use_swc) {
  if (use_swc) {
    const jsRule = config.module.rule("js");
    jsRule.uses.clear();
    jsRule.use("swc").loader("swc-loader");

    const tsRule = config.module.rule("ts");
    tsRule.uses.clear();
    tsRule.use("swc").loader("swc-loader");

    const tsxRule = config.module.rule("tsx");
    tsxRule.uses.clear();
    tsxRule.use("swc").loader("swc-loader");
  }
}

// **** 微应用需要有明确的地址，不然主用加载资源是会404:
// **** 如果微应用和主应用部署在同一个nginx下的同一个IP和端口，
// publicPath可以配置为`/${app_name}`
function build_publicPath(envInfo) {
  const { app_name, port, app_ip } = envInfo;
  if (app_ip && app_ip.length > 1) {
    return `//${app_ip}:${port}/apps/${app_name}`;
  }
  return `/apps/${app_name}`;
}

/**
 *　代理跳过JS依赖库
 *
 * @param {Request} req
 * @param {Response} res
 * @param {any} proxyOptions
 */
function bypass(req, res, proxyOptions) {
  const [uri, param] = req.url.split("?");

  const static_resources = [
    ".js",
    ".png",
    ".ttf",
    ".jpg",
    ".css",
    ".htm",
    ".html",
    ".gif",
    ".xml",
    ".map",
  ];

  // 1. ignore hot update
  if (
    static_resources.some((r) => uri.endsWith(r)) ||
    uri.endsWith("-update.json")
  ) {
    return uri;
  }

  // 2. ignore js lib
  if (uri.endsWith(".js")) {
    return uri;
  }

  return null;
}
```

```ts
function genVersion(newVersion) {
  if (newVersion) {
    const fileContent = {
      VERSION: newVersion,
    };
    const versionFilePath = path.join(process.cwd(), "/public/version.json");
    fs.writeFileSync(versionFilePath, JSON.stringify(fileContent), {
      encoding: "utf-8",
    });
    console.log("generate version:", newVersion);
  }
}
```

```ts
var argv;
try {
  argv = JSON.parse(process.env.npm_config_argv);
  if (isPro && argv.original) {
    let version = argv.original.find((p) => p.startsWith("--VUE_APP_VERSION"));
    version = version.replace("--VUE_APP_VERSION:", "");
    genVersion(version);
  }
} catch (ex) {
  console.error(ex);
  argv = process.argv;
}
```

```ts
const splitChunks = {
  chunks: "all", // 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
  maxInitialRequests: Infinity, // 按需加载时候最大的并行请求数，默认为5
  minSize: 30000, // 依赖包超过30000bit将被单独打包
};

const config = {
  chainWebpack: (config) => {
    console.log(config);
    config.plugins.delete("preload"); // 取消样式预加载，可能产生字体乱码问题
    config.plugins.delete("prefetch");

    // 清除包更新的缓存问题 20200515 added
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("vue-loader")
      .loader("vue-loader")
      .options({
        compilerOptions: {
          preserveWhitespace: false,
          directives: {
            html(node, directiveMeta) {
              (node.props || (node.props = [])).push({
                name: "innerHTML",
                value: `xss(_s(${directiveMeta.value}))`,
              });
            },
          },
        },
      });

    if (isPro) {
      // 为生产环境修改配置...

      // 打包的时候开启gzip可以大大减少体积
      config.plugin("compression").use(
        new CompressionPlugin({
          test: /\.js$|\.css$|\.html$|\.otf$|\.ttf/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );

      // 性能配置
      config.optimization
        .mergeDuplicateChunks(true)
        .removeAvailableModules(true)
        .removeEmptyChunks(true)
        .usedExports(true)
        .minimize(true);

      // 优化配置
      config.performance
        .hints("warning")
        .maxEntrypointSize(1024000)
        .maxAssetSize(3000000);
    } else {
      // 为开发环境修改配置...
      config.devtool("source-map");
    }
    // 优化打包配置
    config.optimization.splitChunks(splitChunks);
    // 将参数传入项目中，可在main.js或者项目中的config 通过process.env 获取
    utils.config_define(config, argv);
    // config.entry("main").add("babel-polyfill");
  },
};
```

```ts
const path = require("path");
const fs = require("fs");

/**
 * 递归遍历文件夹,检查文件
 * @param {string} fileName - 需要遍历的文件/文件夹路径
 * @param {Array} arr - 用于存储结果的数组
 * @description
 * 1. 排除 node_modules 文件夹
 * 2. 如果是文件则直接检查
 * 3. 如果是文件夹则递归遍历其中的文件和子文件夹
 */
function recursiveReadFile(fileName, arr) {
  // 去除node_modules文件夹
  if (!fs.existsSync(fileName) || fileName.match(/node_modules/)) return;
  if (isFile(fileName)) {
    // 文件
    check(fileName, arr);
  }
  if (isDirectory(fileName)) {
    // 文件夹
    const files = fs.readdirSync(fileName);
    files.forEach((val) => {
      const temp = path.join(fileName, val);
      if (isDirectory(temp)) recursiveReadFile(temp, arr);
      if (isFile(temp)) check(temp, arr);
    });
  }
}
/**
 * 检查文件中的图标库引用
 * @param {string} fileName - 需要检查的文件路径
 * @param {Array} arr - 存储找到的图标名称的数组
 * @description 从指定文件中提取 kui-icon- 开头的图标类名,并存入数组中
 */
function check_libicon(fileName, arr) {
  const data = readFile(fileName);
  const res = data.match(/kui-icon-\S*(:)/g);
  if (res && res.length) {
    res.forEach((item) => {
      arr.push(item.replace(/:/, ""));
    });
  }
}

/**
 * 检查指定文件中的 kui-icon 图标使用情况
 * @param {string} fileName - 需要检查的文件路径
 * @param {Array} arr - 用于存储检查结果的数组
 * @description
 * 1. 只检查 .vue 文件
 * 2. 提取文件中所有 kui-icon- 开头的图标名称
 * 3. 将文件路径和图标名称列表保存到结果数组中
 */
function check(fileName, arr) {
  // 只检查.vue文件
  if (!fileName.match(/\.vue$/gi)) return;
  const data = readFile(fileName);
  const res = data.match(/kui-icon-(\w|-)*("|')/g);
  if (res && res.length) {
    const iconlist = [];
    res.forEach((item) => {
      iconlist.push(item.replace(/["|']/g, ""));
    });
    arr.push({ path: fileName, icon_name: new Set(iconlist) });
  }
}

function isDirectory(fileName) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
}

function isFile(fileName) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
}

function readFile(fileName) {
  if (fs.existsSync(fileName)) return fs.readFileSync(fileName, "utf-8");
}

/**
 * 获取图库的icon集合
 */
function getLibIcons() {
  const arr = [];
  const libPath = path.join(
    process.cwd(),
    "node_modules/element-ui/packages/theme-chalk/src/fonts/iconfont.scss"
  );
  check_libicon(libPath, arr);
  return new Set(arr);
}

/**
 * 获取安装的组件库的版本
 * @returns
 */
function getKuiVersion() {
  const libPath = path.join(
    process.cwd(),
    "node_modules/element-ui/package.json"
  );
  return require(libPath).version;
}
/**
 * 获取项目使用的icon集合
 */
function getProjectIcons() {
  const arr = [];
  const proPath = path.join(process.cwd());
  recursiveReadFile(proPath, arr);
  return arr;
}
/**
 *  获取项目使用icon集合和图库icon集合的差集
 */
function getNoSearchInLibIcons(libIconsSet, projectIconsSet) {
  const result = [];
  projectIconsSet.forEach((icon) => {
    const icons = [];
    icon.icon_name.forEach((per_icon) => {
      if (!libIconsSet.has(per_icon)) {
        icons.push(per_icon);
      }
    });
    if (icons.length !== 0) {
      result.push({ path: icon.path, icon_name: icons });
    }
  });
  return result;
}
function main() {
  console.log("检索中...");
  const libIconsSet = getLibIcons();
  const projectIconsSet = getProjectIcons();
  const result = getNoSearchInLibIcons(libIconsSet, projectIconsSet);
  const uiVersion = getKuiVersion();
  console.log("当前安装的ELEMENT-UI版本为：", uiVersion);
  if (result.length > 0) {
    console.warn(
      "项目中有以下图标未在" +
        uiVersion +
        "组件库版本里面检查到, 请参考指导文档进行修正"
    );
    console.log(result);
  } else {
    console.log("项目中所引用的图标均在图标库中匹配到，图标可正常显示");
  }
}
main();
```

::: tip
`JSON.stringify(value[, replacer [, space]])`
它可以传入三个参数:

- 参数 1 是需要字符串化的对象，
- 参数 2 是用于指定对象序列化过程中需要被处理的属性，
- 参数 3 是用于指定输出字符串的缩进格式。

```ts
const user = { name: "Mark Lee", age: 26 };
JSON.stringify(product, ["name"]);
JSON.stringify(user, (key, value) => {
  if (typeof value === "string") return undefined;
  return value;
});
JSON.stringify(user, null, 2);
```

`JSON.parse(text[, reviver])`
它可以传入两个参数，参数 1 是需要被解析的字符串，参数 2 是用于修改解析生成的原始值。后一个参数是可选的，而我们最常用的就是只传一个参数。

```ts
let str = '{"a": 1, "b":2}';
JSON.parse(str, function (key, value) {
  if (key === "a") {
    return function () {};
  }
});
```

:::

```ts
// node ./build/license-checker.js
const fs = require("fs-extra");
var checker = require("license-checker");
const path = require("path");

// ‌license-checker‌是一个用于检查软件项目中使用的第三方库许可证信息的工具。它能够帮助开发者了解项目中所有依赖的许可证信息，确保项目在法律和合规性方面没有问题。
checker.init(
  {
    start: process.cwd(),
    out: "../NOTICE",
    // customPath: './customFormatExample.json',
    relativeLicensePath: true,
    production: true,
  },
  function (err, packages) {
    if (err) {
      console.log(err);
      //Handle error
    } else {
      //The sorted package data
      //as an Object
      const licensePath = path.resolve(__dirname, "../NOTICE");
      //console.log(packages)
      Object.keys(packages).forEach((key) => {
        delete packages[key].email;
        delete packages[key].publisher;
        delete packages[key].url;
        let pathIndex = packages[key].path.indexOf("node_modules");
        packages[key].path = packages[key].path.slice(pathIndex);
      });
      fs.writeFileSync(licensePath, JSON.stringify(packages, null, 2), {
        encoding: "utf8",
      });
    }
  }
);
```

```ts
// node ./build/module_build.js
const moduleList = require("../modules.json");
const inquirer = require("inquirer");
const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");
// 第一步：问询用户想要打包的模块
// 第二步：将用户不需要打包的模块移动到临时文件夹
// 第三步：child_process调用打包任务
// 第四步：还原不需要打包的模块
// !!!!!: 第二，三，四步必须同步进行

// views 下文件目录
const viewsDir = path.join(__dirname, "/src/views");
const viewsDir_tmp = path.join(__dirname, "viewstmp");

// external文件目录
const externalFilesDir = path.join(__dirname, "/public/external");
const externalFilesDir_tmp = path.join(__dirname, "externaltmp");

/**
 * 移动文件夹
 * @param {*} fromDir 检查需移动的工作目录
 * @param {*} toDir  暂时保存移动文件的目录
 * @param {*} selected_modules 不需移动的文件目录
 */
function moveModules (fromDir, toDir, selected_modules, move_all = false) {
  const files = fs.readdirSync(fromDir);
  let fileNameToMove = [];
  if (!move_all) {
    files.forEach(fileName => {
      let modules = path.join(fromDir, fileName);
      let stat = fs.lstatSync(modules);
      if (stat.isDirectory() === true) {
        if (selected_modules.every(sm => moduleList[sm].root.lastIndexOf(fileName) === -1)) {
          // 筛选不存在用户选择的模块 的目录
          fileNameToMove.push(fileName);
        }
      }
    });
  } else {
    fileNameToMove = files;
  }

  // 将用户没有选择的模块移动保存
  if (fileNameToMove.length) {
    fileNameToMove.forEach(fileName => {
      let originModules = path.join(fromDir, fileName);
      let newModules = path.join(toDir, fileName);
      fs.renameSync(originModules, newModules, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }
}

async function exec () {
  const prompList = Object.keys(moduleList)
    .filter(key => key.toUpperCase() !== "FRAMEWORK")
    .map(key => ({ name: key.toUpperCase() + ":" + moduleList[key].desc, value: key }));

  const ret = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selected_modules",
      message: "Which modules do you want to build??",
      choices: prompList
    }
  ]);

  try {
    fs.statSync(viewsDir_tmp);
    moveModules(viewsDir, viewsDir_tmp, ret.selected_modules);
  } catch (_err) {
    try {
      fs.mkdirSync(viewsDir_tmp);
      moveModules(viewsDir, viewsDir_tmp, ret.selected_modules);
    } catch (err) {
      console.error(err);
    }
  }

  try {
    fs.statSync(externalFilesDir_tmp);
    moveModules(externalFilesDir, externalFilesDir_tmp, ret.selected_modules);
  } catch (_err) {
    try {
      fs.mkdirSync(externalFilesDir_tmp);
      moveModules(externalFilesDir, externalFilesDir_tmp, ret.selected_modules);
    } catch (err) {
      console.error(err);
    }
  }

  /* console.log("Build modules: " + ret.selected_modules.join(" ")); */

  // 移动文件
  console.log("Build modules……");
  let build = spawnSync(/^win/.test(process.platform) ? "vue-cli-service.cmd" : "vue-cli-service", ["build"]);

  console.log(String(build.stdout));

  /* build.stdout.pipe(process.stdout); */
  moveModules(viewsDir_tmp, viewsDir, [], true);
  moveModules(externalFilesDir_tmp, externalFilesDir, [], true);

  try {
    fs.rmdirSync(viewsDir_tmp);
    fs.rmdirSync(externalFilesDir_tmp);
  } catch (error) {
    console.error(error);
  }
};

exec();
```


```ts
/* eslint-disable */
// @ts-check
const path = require("path");
const fs = require("fs");

/**
 * 遍历出 src/projects/${module}/views/**.vue 文件
 * 注意：views页面的路径规则由变化时需要做相应的调整．
 *
 * @param {string} root_dir src/projects
 * @param {string} current_dir 当前目录
 * @param {string} views 页面目录
 * @returns {string[]}
 */
function walk_dir(root_dir, views, current_dir) {
  /** @type {string[]} */
  const results = [];
  const files = fs.readdirSync(path.join(root_dir, current_dir));
  files.forEach((file) => {
    file = current_dir + '/' + file;
    const stat = fs.statSync(path.join(root_dir, file));
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results.push(...walk_dir(root_dir, views, file));
    } else if (file.includes(views) && file.endsWith(".vue")) {
      /* /${module}/views/**.vue file */
      results.push(file);
    }
  });
  return results;
}

/**
 * 生成projects下模块的路由映射: src/projects/routes.ts
 * @param {string} views 页面目录
 * @param {string[]} excludes 排除模块
 */
/**
 * 生成项目路由配置文件
 * @param {string} views - 视图目录名称
 * @param {string[]} excludes - 需要排除的路由路径数组
 * @param {boolean} excludeAll - 是否排除所有路由,默认为false
 * 
 * 该函数会扫描项目目录下的视图文件,生成对应的路由配置:
 * 1. 遍历 src/projects 目录下的所有视图文件
 * 2. 根据文件路径生成路由路径和组件名称
 * 3. 排除指定的路由路径
 * 4. 生成路由配置并写入到 src/router/projects.ts 文件
 */
function generate_projects_routes(views, excludes = [], excludeAll = false) {
  const projects = path.resolve(process.cwd(), "src/projects");
  const projects_exist = fs.existsSync(projects);
  const files = projects_exist ? walk_dir(projects, views, ".") : [];
  const projects_routes_file = path.resolve(process.cwd(), "src/router/projects.ts");

  // make sure directory exist
  const dir = path.dirname(projects_routes_file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const projects_routes = [
    'export const projects_routes = [',
  ]
  views = views.replace(/\//g, "")

  if(!excludeAll){
    files.forEach(file => {
      const route_path = file.slice(1, -4);
      // 按目录打包
      const module_name = file.split("/").slice(1, -1).filter(dir => dir !== views).join("_");
      const componentName = getComponentName(file)
      if (!excludes.some(exclude => file.includes(exclude))) {
        const comment = `/* webpackChunkName: "${module_name}" */`;
        projects_routes.push(
          `  { path: "${route_path}", component: () => import(${comment} "@/projects${file.slice(1)}"), name: "${componentName}" },`,
        );
      }
    });
  }


  projects_routes.push('];');
  projects_routes.push('');
  fs.writeFileSync(projects_routes_file, projects_routes.join("\n"));
}

/**
 * 生成projects/app_name下模块的路由映射: src/router/app_name.ts
 * @param {string} app_name 应用名称
 * @param {string} views 页面目录
 */
/**
 * 生成应用路由配置
 * 
 * @param {string} app_name - 应用名称
 * @param {string} views - 视图目录名称
 * 
 * @description
 * 该函数用于生成应用的路由配置文件:
 * 1. 清空并重写 projects_routes 文件
 * 2. 根据应用目录结构自动生成对应的路由配置
 * 3. 支持按目录进行代码分割打包
 * 4. 自动处理路由路径和组件导入
 * 
 * @example
 * generate_app_routes('admin', 'views')
 */
function generate_app_routes(app_name, views) {
  // clear projects routes
  const projects_routes = [
    '/* eslint-disable */',
    'export const projects_routes = [',
  ];
  projects_routes.push('];');
  projects_routes.push('');
  const projects_routes_file = path.resolve(process.cwd(), "src/router/projects.ts");
  fs.writeFileSync(projects_routes_file, projects_routes.join("\n"));

  // generate app routes
  const app = path.resolve(process.cwd(), "src/projects", app_name);
  const app_exist = fs.existsSync(app);
  const files = app_exist ? walk_dir(app, views, ".") : [];
  const app_routes_file = path.resolve(process.cwd(), "src/router/" + app_name + ".ts");

  // make sure directory exist
  const dir = path.dirname(app_routes_file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const app_routes = [
    '/* eslint-disable */',
    'export const app_routes = [',
  ]

  views = views.replace(/\//g, "")
  files.forEach(file => {
    // './views/param/Dict.vue' => `/${app_name}/views/param/Dict`
    const route_path = "/" + app_name + file.slice(1, -4);
    // 按目录打包
    const module_name = app_name.replace("/", "-") + "_" + file.split("/").slice(1, -1).filter(dir => dir !== views).join("_");
    const comment = `/* webpackChunkName: "${module_name}" */`;
    app_routes.push(
      `  { path: "${route_path}", component: () => import(${comment} "@/projects/${app_name}${file.slice(1)}") },`,
    );
  });

  app_routes.push('];');
  app_routes.push('');
  fs.writeFileSync(app_routes_file, app_routes.join("\n"));
}
/**
 * 从文件路径中提取组件名称
 * @param {string} path - 文件的完整路径
 * @returns {string} 提取出的组件名称
 * 
 * 如果路径以 index.vue 结尾,则返回父目录名称作为组件名
 * 否则返回文件名(不含.vue扩展名)作为组件名
 */
function getComponentName(path) {
  const pathList = path.split("/");
  if(pathList[pathList.length -1] === "index.vue") {
    return pathList[pathList.length -2]
  }
  return  pathList[pathList.length -1].slice(0, -4)
}

// test: node build/projects_routes.js
// generate_projects_routes("/views/");

// 生成应用路由:
//    1. node build/projects_routes.js --app 
// or 2. yarn approutes 
let app_name = "";
let views = "";
if (process.argv.length >= 4 && process.argv[2] === "--app") {
  if (process.argv.length === 4) {
    app_name = process.argv[3];
  } else if (process.argv.length === 5) {
    app_name = process.argv[3];
    views = process.argv[4];
  }

  if (app_name) {
    generate_app_routes(app_name, views);
  }
} else if (process.argv.length >= 3 && process.argv[2] === "--main") {
  let excludes = [];
  if (process.argv.length === 4) {
    views = process.argv[3];
  } if (process.argv.length === 5) {
    views = process.argv[3];
    excludes = process.argv[4].split(",");
  }
  generate_projects_routes(views, excludes);
}
```