---
title: element前后台管理系统
---

# element-web-manage-vue2-demo

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

```bash
npm i element-ui -S
npm i vuex -S
npm i style-loader css-loader -D
npm i style-loader css-loader --save-dev
npm i less-loader less -D
npm i sass-loader node-sass --save-dev
npm i url-loader file-loader --save-dev
npm i babel-core babel-loader babel-plugin-transform-runtime --save-dev
npm i babel-preset-es2015 babel-preset-stage-0 --save-dev
npm i vue-resource -S
npm i vuex -S
npm i v-charts echarts -S
npm install echarts --save
```

```json
{
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js"
  },
  "dependencies": {
    "axios": "^0.19.0",
    "echarts": "^4.2.1",
    "element-ui": "^2.12.0",
    "jquery": "^3.4.1",
    "time-formater": "^1.1.3",
    "v-charts": "^1.19.0",
    "vue": "^2.5.2",
    "vue-quill-editor": "^3.0.6",
    "vue-router": "^3.0.1",
    "vuex": "^3.1.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "chalk": "^2.0.1",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.11",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "less": "^3.10.3",
    "less-loader": "^5.0.0",
    "node-notifier": "^5.1.2",
    "node-sass": "^4.12.0",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "portfinder": "^1.0.13",
    "postcss-import": "^11.0.0",
    "postcss-loader": "^2.0.8",
    "postcss-url": "^7.2.1",
    "rimraf": "^2.6.0",
    "sass-loader": "^8.0.0",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "style-loader": "^1.0.0",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.5.8",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0"
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}
```

<!-- build/build.js -->

```js
"use strict"
require("./check-versions")()

process.env.NODE_ENV = "production"

const ora = require("ora")
const rm = require("rimraf")
const path = require("path")
const chalk = require("chalk")
const webpack = require("webpack")
const config = require("../config")
const webpackConfig = require("./webpack.prod.conf")

const spinner = ora("building for production...")
spinner.start()

rm(
  path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
  (err) => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false,
        }) + "\n\n"
      )

      if (stats.hasErrors()) {
        console.log(chalk.red("  Build failed with errors.\n"))
        process.exit(1)
      }

      console.log(chalk.cyan("  Build complete.\n"))
      console.log(
        chalk.yellow(
          "  Tip: built files are meant to be served over an HTTP server.\n" +
            "  Opening index.html over file:// won't work.\n"
        )
      )
    })
  }
)
```

<!-- build/check-versions.js -->

```js
"use strict"
const chalk = require("chalk")
const semver = require("semver")
const packageConfig = require("../package.json")
const shell = require("shelljs")

function exec(cmd) {
  return require("child_process").execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: "node",
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node,
  },
]

if (shell.which("npm")) {
  versionRequirements.push({
    name: "npm",
    currentVersion: exec("npm --version"),
    versionRequirement: packageConfig.engines.npm,
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        mod.name +
          ": " +
          chalk.red(mod.currentVersion) +
          " should be " +
          chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log("")
    console.log(
      chalk.yellow(
        "To use this template, you must update following to modules:"
      )
    )
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log("  " + warning)
    }

    console.log()
    process.exit(1)
  }
}
```

<!-- build/utils.js -->

```js
"use strict"
const path = require("path")
const config = require("../config")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const packageConfig = require("../package.json")

exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === "production"
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: "css-loader",
    options: {
      sourceMap: options.sourceMap,
    },
  }

  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      sourceMap: options.sourceMap,
    },
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: "vue-style-loader",
      })
    } else {
      return ["vue-style-loader"].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus"),
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp("\\." + extension + "$"),
      use: loader,
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require("node-notifier")

  return (severity, errors) => {
    if (severity !== "error") return

    const error = errors[0]
    const filename = error.file && error.file.split("!").pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ": " + error.name,
      subtitle: filename || "",
      icon: path.join(__dirname, "logo.png"),
    })
  }
}
```

<!-- build/vue-loader.conf.js -->

```js
"use strict"
const utils = require("./utils")
const config = require("../config")
const isProduction = process.env.NODE_ENV === "production"
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction,
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ["src", "poster"],
    source: "src",
    img: "src",
    image: "xlink:href",
  },
}
```

<!-- build/webpack.base.conf.js -->

```js
"use strict"
const path = require("path")
const utils = require("./utils")
const config = require("../config")
const vueLoaderConfig = require("./vue-loader.conf")

function resolve(dir) {
  return path.join(__dirname, "..", dir)
}

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/main.js",
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".css", "less", "scss"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig,
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client"),
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
    ],
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
}
```

<!-- build/webpack.dev.conf.js -->

```js
"use strict"
const utils = require("./utils")
const webpack = require("webpack")
const config = require("../config")
const merge = require("webpack-merge")
const path = require("path")
const baseWebpackConfig = require("./webpack.base.conf")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const portfinder = require("portfinder")

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true,
    }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html"),
        },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.dev.assetsSubDirectory,
        ignore: [".*"],
      },
    ]),
  ],
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`,
            ],
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined,
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
```

<!-- build/webpack.prod.conf.js -->

```js
"use strict"
const path = require("path")
const utils = require("./utils")
const webpack = require("webpack")
const config = require("../config")
const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.conf")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const env = require("../config/prod.env")

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env,
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true,
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true },
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency",
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
        )
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity,
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "app",
      async: "vendor-async",
      children: true,
      minChunks: 3,
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"],
      },
    ]),
  ],
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin")

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8,
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
```

<!-- config/dev.env.js -->

```js
"use strict"
const merge = require("webpack-merge")
const prodEnv = require("./prod.env")

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
})
```

<!-- config\index.js -->

```js
"use strict"
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path")

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {},

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 1006, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
}
```

<!-- config/prod.env.js -->

```js
"use strict"
module.exports = {
  NODE_ENV: '"production"',
}
```

<!-- src\main.js -->

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from "vue"
import App from "./App"
import router from "./router"

import ElementUi from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUi)

import store from "./store"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  // store,
  components: { App },
  template: "<App/>",
})
```
