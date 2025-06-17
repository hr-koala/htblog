---
title: DllPlugin和DllReferencePlugin
---

## DllPlugin 和 DllReferencePlugin

1. 我们在利用 webpack 做工程化开发的时候，会遇到这么一个问题，如果我们使用 vue 框架进行开发，虽然 vue 的框架代码几乎不变（除了做升级），但我们还是每次在构建的时候都需要再把 vue 框架代码打一次包，这样就很浪费构建时间。我们在想，能不能把类似 vue 这样几乎不怎么变动的代码体检打包好，放在某个地方，然后在构建的时候引入构建好的就行。这样我们就可以只构建我们自己的业务代码，这样可以大大提高构建效率。

如何可以实现，就是 DllPlugin 和 DllReferencePlugin，一个负责构建，一个负责引入

1. DllPlugin
   DllPlugin 能把第三方库代码分开，每次构建的时候，只构建我们自身的代码
   他需要一个独立的 webpack 配置文件来进行配置，我们一般会配置一个`webpack.dll.config.js`，他的作用就是把第三方库依赖打包到一个 bundle 的 dll 文件里面，还会生成一个 manifest.json 文件来供 DllReferencePlugin 进行映射。

1. DllReferencePlugin
   此插件在 webpack.config.js 中使用，作用就是把 DllPlugin 打包的 dll 文件引用到需要的预编译的依赖上来。

   > 例:
   > 比如我们通过 DllPlugin 打包出来了一个 vendor.dll.js 和一个 vendor.manifest.json，vendor.dll.js 包含所有的第三方库文件，而 manifest.json 就是库代码的一个索引，当 webpack 在执行 DllReferencePlugin 时，会读取 manifest.json 文件，看看是否有对应的第三方库

1. 如何配置使用
   
4.1 DllPlugin 配置
   我们新建一个 webpack.dll.config.js 作为配置文件

```ts
const path = require("path");
const DllPlugin = require("webpack/lib/DllPlugin");
module.exports = {
  entry: [
    //这里是一个数组，需要构建的第三方库代码
    "./node_modules/vue",
  ],
  output: {
    filename: "[name].dll.js", //文件名称
    path: path.resolve(__dirname, "_dll_dist"), //将输出的文件放到对应的dist目录下
    libary: "_dll_[name]", //存放相关的dll文件的全局变量名称，比如vue就会存放_dll_vue,防止全局变量冲突
  },
  plugins: [
    new DllPlugin({
      name: "_dll_[name]", //该插件的name属性需要和output.libray保存一致，该字段值，也就是输出的manifest.json文件中name字段的值，比如在vue.manifest文件中有name:'_dll_vue'
      path: path.join(__dirname, "_dll_dist", "[name].manifest.json"),
    }),
  ],
};
```

然后开始构建
`npx webpack --config webpack.dll.config.js`

4.2 DllReferencePlugin 配置
我们在 webpack.config.js 里面进行配置 DllReferencePlugin。把刚才的 DllPlugin 打包的 dll 文件进行引用配置

```ts
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
module.exports = {
  plugins: [
    new DllRferencePlugin({
      //告诉webpack使用了哪些第三方库代码
      manifest: require("./_dll_dist/mainanifest.json"), //把vue映射到急送文件上去
    }),
  ],
};
```

然后再构建
`npm run build`
