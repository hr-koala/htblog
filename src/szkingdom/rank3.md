---
title: 'JZ-P3'
---
## 页面设计

1. CSS的 :root 伪类选择器

CSS的 :root 伪类选择器用于选择给定规范的最高级父级。
在 HTML 规范中，:root 本质上等同于 html 选择器。:root选择器比 html 具有更高的优先级。因为它实际上被视为伪类选择器（就像 :first-child 或 :hover 一样）。
作为伪类选择器，它比标签选择器具有更高的优先级：
```css
:root {
  background-color: blue;
  color: white;
}
html {
  background-color: red;
  color: white;
}
```
尽管 html 选择器出现在后面，:root 选择器仍然胜出，这要归功于它更高的优先级！
2. 由于 CSS 也设计用于 SVG 和 XML，你实际上可以使用 :root，它将对应到不同的元素。
例如，在 SVG 中，最高级父级是 svg 标签。:root 和 svg 标签选择相同的元素，但 :root 选择器的优先级更高。
```css
:root {
  fill: gold;
}
svg {
  fill: gold;
}
```
3. :root 有什么实际用途？正如我们之前所介绍的，它是 html 选择器的安全替代品。

这意味着你可以做任何你通常会用 html 选择器做的事情：
```css
/* 使用 CSS 自定义属性在全局级别创建变量！ */
:root {
  margin: 0;
  padding: 0;
  --primary-color: #0000FF;
  --body-fonts: "Helvetica", "Arial", sans-serif;
  --line-height: 1.5;
}
p {
  color: var(--primary-color);
  font-family: var(--body-fonts);
  line-height: var(--line-height);
}
/* 使用 :root 而不是 html 的额外好处是你可以为你的 SVG 图形设置样式！ */

svg {
  font-family: var(--body-fonts);
}
svg circle {
  fill: var(--primary-color);
}
```
4. 通过css变量设置背景色，通过媒体查询，动态变更背景色

```css
/* 默认亮色主题 */
:root {
    --background-color:#fff;
    --text-color:#333;
}
/* 暗色主题 */
[data-theme='dark']{
    --background-color:#333;
    --text-color:#fff;
}
body{
    --background-color:var(--background-color);
    --text-color:var(--text-color);
}
/* 媒体查询，用于响应用户偏好 */
@media(prefers-color-scheme:dark){
    :root{
        --background-color:#333;
        --text-color:#fff;
    }
}
/* @media(prefers-color-scheme:dark) {} 深色主题 */
/* @media(prefers-color-scheme:light){} 浅色主题 */
/* 变更不同背景图
.logo{background-image:url('logo-light.png')}
@media(prefers-color-scheme:dark){
    .logo{background-image:url('logo-dark.png')}
} */
```

单位策略：
> rem:相对单位，基于根元素(html)的字体大小，若根字体14px,则1rem=14px
> px:绝对单位，代表屏幕上的物理像素点（14px表示占据14个像素）
> vw/vh: vh、vw:相对单位，基于视口高度/宽度的百分比（1vh=视口高度1%，1vw=视口宽度1%）
> %：相对单位，基于父元素的对应属性计算

## clamp()、calc()、max() 和 min() 函数
1. calc()函数
calc() 是 CSS3 引入的动态计算函数，用于在声明 CSS 属性值时执行实时计算。
核心作用：解决传统 CSS 无法动态计算长度值的问题，支持混合单位运算（如像素与百分比结合）。

语法结构:`calc( <expression> )`
`<expression>`：由数值、单位、运算符组成的表达式，必须用英文括号包裹。
运算符规则：
加减运算符（+/-）两侧必须保留空格（如 calc(100% - 20px)）。
乘除运算符（*/÷）可省略空格，但建议保留以提高可读性。
运算符优先级与数学规则一致，可使用小括号改变运算顺序（如 calc( (100% - 30px) / 2 )）。
支持的单位类型:长度单位：px、em、rem、vh、vw 等。百分比：%（相对于父元素计算）。数值：无单位的纯数字（如动画延迟时间 calc(0.5s * 3)）。

**注意事项**
兼容性：IE9 + 支持（需加前缀 -ms-calc()），现代浏览器无需前缀。
单位陷阱：避免不同单位混合运算导致逻辑错误（如 calc(10% + 2em) 是合法的，但需明确业务逻辑）。
负值处理：允许直接使用负数（如 calc(-10px)），但需注意运算符优先级（如 calc(100% + -50px) 等价于 calc(100% - 50px)）。

1. max()函数
max() 用于从多个值中取最大值作为属性值，浏览器会自动计算并应用最大的有效数值。
核心作用：简化响应式设计中 “取最大值” 的逻辑（如元素最小宽度需同时满足固定值和百分比）。

语法结构:`max( <value1>, <value2>, ..., <valueN> )`
`<value>`：支持以下类型：
- 长度值：px、em、rem 等。
- 百分比：%（相对于父元素计算）。
- 数值：无单位的纯数字（如 max(5, 3) 取 5）。
- 其他 CSS 函数：如 max( calc(100% - 20px), 300px )。

注意事项
- 无效值处理：若某个值在当前上下文中无效（如百分比用于font-size且父元素无定义），则自动忽略该值。
- 兼容性：IE 不支持，需使用 CSS 自定义属性（--value）配合 JS polyfill；现代浏览器（Chrome 68+、Firefox 61+）全面支持。
- 与min()的配合：可嵌套使用实现 “区间限制”，如 width: min( max(200px, 50%), 800px );（宽度介于 200px~800px 之间）。

1. min()函数
min() 与max()相反，用于从多个值中取最小值作为属性值。
核心作用：防止元素尺寸或数值超过上限（如自适应布局中限制最大宽度）。

语法结构:`min( <value1>, <value2>, ..., <valueN> )`
参数类型：与max()完全一致，支持长度、百分比、数值及嵌套函数。

注意事项
- 百分比计算顺序：若包含百分比，需确保其父元素已定义相关属性（如用min(50%, 300px)设置宽度时，父元素需有明确的width值）。
- 负值处理：允许传入负数，取最小负值（如 min(-5px, -10px) 取 - 10px）。
- 与clamp()的区别：clamp()是min(max())的语法糖，直接指定最小值、首选值、最大值，如 clamp(200px, 50%, 800px) 等价于 min( max(200px, 50%), 800px )。

1. clamp()函数
clamp() 是 CSS 中的智能区间函数，用于将某个值限制在一个最小值和最大值之间，同时支持一个中间的首选值。
核心作用：一次性完成 “最小值≤首选值≤最大值” 的三元约束，简化响应式设计中的区间控制。

语法结构:`property: clamp( <min-value>, <preferred-value>, <max-value> )`

参数解析：
- `<min-value>`：最小值，属性值不会小于此值。
- `<preferred-value>`：首选值，若介于最小值和最大值之间，则使用此值。
- `<max-value>`：最大值，属性值不会大于此值。
- 参数类型：支持长度单位（px、em等）、百分比、数值及嵌套函数（如 calc()）。

底层原理与等价转换
clamp() 本质是 max() 和 min() 的组合语法糖，以下表达式完全等价：
```css
clamp(100px, 50%, 800px) 
/* 等价于 */
min( max(100px, 50%), 800px )
```
执行逻辑：
先通过 max() 确保值≥最小值。
再通过 min() 确保值≤最大值。
```css
/* 卡片宽度限制在280px~400px之间，且随父容器缩放 */
.card {
  width: clamp(280px, 30%, 400px);
}
/* 宽度 = 视口宽度的50%，但限制在 (视口宽度-300px) 到 600px 之间 */
.box {
  width: clamp( calc(100vw - 300px), 50vw, 600px );
}
/* 网格列宽自适应，且保持最小300px、最大400px */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, clamp(300px, 1fr, 400px));
}
```

注意事项
参数顺序严格性：必须按 “最小→首选→最大” 的顺序传入参数，否则无效（如 clamp(20px, 10px, 30px) 会因最小值 > 首选值而失效）。
兼容性：IE 不支持，需使用 CSS 自定义属性（--value）配合 JS polyfill；现代浏览器（Chrome 79+、Firefox 75+）全面支持。
与媒体查询的关系：clamp() 适合连续变化的区间控制，而媒体查询适合断点式的突变设计，两者可结合使用。

|函数	|核心作用|	语法示例|	典型场景|
|--|--|--|--|
|calc()	|动态计算表达式|	width: calc(100% - 30px)|	混合单位运算|
|max()	|取多值中的最大值|	width: max(300px, 50%)	|设定最小值下限|
|min()	|取多值中的最小值|	width: min(800px, 90%)	|设定最大值上限|
|clamp()|	限制值在最小值和最大值之间|	font-size: clamp(16px, 2vw, 24px)	|响应式字体、自适应布局|
```css
/* 复杂响应式布局：图片宽度随视口变化，但保持宽高比，并限制在合理区间 */
.image-container {
  width: clamp(
    300px,                  /* 最小宽度 */
    calc(50vw - 100px),     /* 首选值：视口宽度的50%减去100px */
    min(800px, 70vw)        /* 最大宽度：800px与视口宽度70%中的较小值 */
  );
  height: auto;
  aspect-ratio: 16/9;      /* 保持16:9宽高比 */
}
/* 通过合理组合 calc()、max()、min() 和 clamp()，可实现高度灵活且健壮的响应式设计，减少媒体查询依赖，提升代码可维护性。 */
```
## 
- webP： 压缩类型：有损/无损可选； 透明度支持：Alpha通道（8/32位）；动画支持：类似GIF；文件体积：比JPEG小约30%；图像质量：高（相同体积下细节更优）；浏览器兼容：Chrome/Firefox/edge>=85;最佳适用场景：网页内容图像（照片/图标）；
- JPEG： 压缩类型：有损； 不支持透明度；不支持动画；文件体积：中等；图像质量：中等（高压缩率时出现块状伪影）；浏览器兼容：全支持;最佳适用场景：摄影图片；
- PNG： 压缩类型：无损； 透明度支持：Alpha通道（8/32位）；不支持动画；文件体积：最大；图像质量：最高（无损保留原始数据）；浏览器兼容：全支持;最佳适用场景：带透明度的无损图像（如LOGO）；
- SVG： 压缩类型：矢量无损； 透明度支持：路径透明度；动画支持：SMIL/CSS动画；文件体积：最小；图像质量：无线缩放无损；浏览器兼容：全支持（IE9+）;最佳适用场景：矢量图形、图标、数据可视化；

相同图片，webP要比PNG图片小的多

## 懒加载
视口滚动动画：图片元素进入视口时触发加载（Intersection Observer API）
进度条变化：首屏加载量从100% → 53%
```js
{/* <img src="placeholder.jpg" data-src="image.jpg" loading="lazy” /> */}
// 示例：实现图片懒加载
const lazyImages = document.querySelectorAll('img[data-src]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // 加载真实图片
      observer.unobserve(img); // 停止观察已加载的图片
    }
  });
}, {
  threshold: 0.1 // 当图片10%进入视口时加载
});

lazyImages.forEach((img) => {
  observer.observe(img); // 开始观察每一张图片
});
```
srcset是img标签的一个属性，允许开发者为不同的屏幕分辨率或者设备条件指定多种图像源。
当浏览器加载页面时，他会根据设备的显示特性(如屏幕宽度、像素密度等)选择最合适的图片进行展示，从而提高页面的加载效率和图片的展示效果 
w: 基于宽度来使用 
`srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1200w"` 
`sizes=“(max-width: 480px) 100vw, (max-width: 768px) 80vw, 1200px“`

x: 基于像素密度使用
`srcset="small.jpg 1x, medium.jpg 2x, large.jpg 3x“`

##
顶部导航：左侧一般是网站信息、管理后台信息和logo，中间为门户或者分类切换，最右侧则是全局的搜索和用户信息展示，退出登录等
侧边导航：一般为上下滚动式的交互导航，门户或者分类切换

## 物理分辨率  vs 逻辑分辨率
物理分辨率：显示设备的真实物理像素数量，设备像素比（Device Pixel Ratio）表示 1个CSS像素对应的物理像素数量
逻辑分辨率：操作系统定义的虚拟像素单位
|维度|物理分辨率|逻辑分辨率|
|--|--|--|
|本质 硬件固有属性 | 软件抽象层|
|单位 | 物理像素（px）| 逻辑单位（pt/dp）|
|调整性 |出厂固定不变 | 系统/应用动态调整 |
|缩放影响 | 直接决定显示精度 |通过缩放系数转换|
|典型应用 | 高清图片加载/字体抗锯齿 | 响应式布局/动态字号 |
|设计规范关联 | 图像优化模块（webP+懒加载） | 原子化组件库（按钮/卡片尺寸标准化）|

逻辑分辨率（Logical Resolution）,也称为屏幕分辨率或显示分辨率。
是指计算机操作系统或图形界面所能识别的像素数量。
它决定了屏幕上可以显示的图像、文字等内容的精细程度。
例如，一个常见的逻辑分辨率为1920x1080的屏幕，意味着其水平方向上有1920个像素点，垂直方向上有1080个像素点。

物理分辨率（Physical Resolution）
是指显示器硬件本身所具备的像素数量。
它是显示器面板上实际存在的像素点的总数。
物理分辨率是固定的，由显示器的制造工艺和设计决定。
例如，一个物理分辨率为1920x1080的显示器，表示其屏幕上有1920列和1080行的像素点。

二、区别
1. 来源不同
- 逻辑分辨率是由计算机的操作系统或应用程序设置的。
- 物理分辨率则是由显示器本身的硬件特性决定的。
2. 可变性
- 逻辑分辨率可以根据用户的需求进行调整，以适应不同的显示需求。例如，用户可以在系统设置中更改屏幕分辨率以获得更大的桌面空间或更清晰的图像效果。
- 物理分辨率则是固定的，无法通过软件设置来改变。
3. 影响范围
- 逻辑分辨率的变化主要影响屏幕上显示的内容大小和清晰度。较高的逻辑分辨率通常意味着更精细的图像和文字显示效果。
- 物理分辨率则直接影响显示器的整体显示效果和性能。更高的物理分辨率意味着更多的像素点和更细腻的显示效果。
4. 应用场景
- 在日常使用中，用户可能会根据实际需求调整逻辑分辨率来优化显示效果。例如，在设计软件中可能需要更高的分辨率以查看细节；而在浏览网页时，较低的分辨率可能更适合于查看整体布局。
- 物理分辨率的选择则更多地取决于用户的预算和使用需求。对于需要高精度显示的应用场景（如图像处理、视频编辑等），通常需要选择具有更高物理分辨率的显示器。

## dpr 动态缩放
```js
/** 
* 动态计算设备像素比（DPR）并根据 DPR 缩放视口，同时存储 DPR 信息供 CSS 使用。 
* 此操作可确保页面在不同 DPR 的设备上能正确显示，避免因 DPR 差异导致的布局和显示问题。 
*/ 
// 获取当前设备的像素比（DPR），若获取失败则默认 DPR 为 1 
const dpr = window.devicePixelRatio || 1; 
// 计算缩放比例，通过 1 除以 DPR 得到合适的缩放值 
const scale = 1 / dpr; 
// 通过选择器查找 name 属性为 "viewport" 的 meta 标签 
const viewportMeta = document.querySelector('meta[name="viewport"]'); 
// 动态设置 viewport meta 标签的 content 属性，将页面宽度设置为设备宽度， 
// 并将初始缩放比例和最大缩放比例设置为计算得到的 scale 值，同时禁止用户手动缩放
 viewportMeta.setAttribute('content', `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`); 
// 在 HTML 根元素上设置 data-dpr 属性，将当前设备的 DPR 值存储起来，方便后续在 CSS 中使用 
document.documentElement.setAttribute('data-dpr', dpr); 
```
## 高清屏（Retina）图像优化（SVG/2x/3x图）
矢量图形通过数学公式渲染，适配任意DPR设备
文件体积平均比PNG小58%（基于图标复杂度）
```htm
<!-- 内联SVG（原子化组件库推荐方案） -->
<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"> 
     <path d="M12 2L3 21h18L12 2z" fill="currentColor"/> 
</svg> 
<!-- 外部SVG（动态主题管理集成） --> 
<img src="card-banner.jpg"
     srcset="card-banner@2x.jpg 2x, card-banner@3x.jpg 3x"
     sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
     alt="产品展示图"
     loading="lazy">
```
## 分辨率特异性问题处理
超高分辨率(4K+)下的字体过小问题
```css
/* 使用媒体查询，设定屏幕最大宽度、最小像素比时，字体大小 */
/* min-resolution 是基于‌设备物理像素密度‌，而非浏览器窗口的宽度。即使用户缩放页面，其值仍反映设备本身的显示能力。 */
@media (min-width: 1920px) and (min-resolution: 192dpi) {
  body { font-size: 1.125rem; }
}
```
## WebKit（Safari）与Blink（Chrome）的CSS特性支持对比
|维度 |WebKit（Safari）|Blink（Chrome）| 设计规范适配建议|
|--|--|--|--|
|新特性支持速度|标准稳定后支持（如:has()晚6个月） | 快速实验性支持（开启chrome://flags） |优先使用图像中clamp()等通用方案|
|布局精度|Flexbox嵌套计算误差±2px |亚像素级渲染精度| 原子化组件库需预留1px安全边距| 
|动画性能|60FPS上限，复杂动画易掉帧| 支持120FPS，GPU加速优化|表单动效需添加will-change属性|

## IE/Edge旧版兜底方案（条件注释/CSS Hack）
原则：
保证基础功能可用性
渐进增强不影响现代浏览器体验
符合思维导图 动态主题管理 色彩规范

IE10及以下版本专属样式注入
<!--[if lt IE 11]>
  <link rel="stylesheet" href="legacy-ie.css">
  <script src="html5shiv.min.js"></script>
<![endif]-->
```css
/* 输入框状态设计兼容（对应表单交互优化） */
.input-field {
  padding: 8px \9; /* IE9-11专属 */
  
  /* 错误状态保持思维导图红色规范 */
  &.error {
    border-color: #ff4d4f\9;
    background: url("alert-icon.png") no-repeat 98% center\9;
  }
}
/* 导航热区修正（兼容导航系统设计要求） */
@media _:-ms-lang(x) {
  .nav-item {
    min-width: 120px; /* 替代flex-grow布局 */
    display: inline-block\9;
  }
}
```
## 标准化 Reset/Normalize.css
性能对比:
|指标|Reset.css方案|Normalize.css方案|优化建议|
|cSS体积|需额外增加2-5KB|原生仅4.7KB(gzip后)|采用Normalize作为基准|
|渲染速度|首次绘制延迟增加15-20ms|接近原生渲染性能|避免过度重置|
|维护开销|每个组件需显式定义样式|继承+覆盖模式|通过设计Token统一管理|
## 响应式容器（容器查询 @container）
```css
/* 定义卡片容器（动态主题管理） */
.card-container {
  container-type: inline-size;
  --card-padding: var(--spacing-md);
}
/* 容器宽度≥600px：桌面端布局 */
@container (width >= 600px) {
  .card {
    grid-template-columns: 240px 1fr;
    padding: calc(var(--card-padding) * 1.5);
  }
}
/* 容器宽度＜600px：移动端布局 */
@container (max-width: 599px) {
  .card {
    flex-direction: column;
    padding: var(--card-padding);
    img { width: 100%; }
  }
}
/* 明暗模式联动（对应 动态主题管理 → 明暗模式切换） */
.sidebar {
  container-type: size;
  --sidebar-bg: var(--color-bg-container);
}

@container (width <= 200px) and (prefers-color-scheme: dark) {
  .menu-item {
    background: color-mix(in srgb, var(--sidebar-bg) 90%, black);
  }
}
```
## Taro/UniApp（小程序+H5）
Taro 是由京东的 JD.com 团队开发的一个多端开发框架，旨在通过一套代码同时支持多种平台的开发，尤其是小程序和 H5。它是基于 React 的，可以通过 React、Vue 等开发语言来进行开发。
特点：
支持多端开发，目标平台包括微信小程序、支付宝小程序、百度小程序、字节跳动小程序、H5、React Native 等。
基于 React，开发者可以利用 React 的生态系统进行开发。
提供了丰富的插件，方便快速接入第三方服务。
在性能方面有较为出色的表现，特别是在小程序上的兼容性和性能优化上有一定的优势。
使用场景：
适用于需要同时在多个小程序平台和 H5 上运行的应用，尤其是 React 或者类 React 开发者。

UniApp 是 DCloud（数字天堂）开发的跨平台框架，可以通过一套代码生成 iOS、Android、小程序（包括微信、支付宝、百度等）、H5 以及桌面端应用（通过 Electron 等工具）。UniApp 基于Vue.js，可以借助 Vue 生态开发。
特点：
使用 Vue.js 开发，且可以支持 Vue 2.x 和 Vue 3.x 的语法。
提供了一套丰富的 UI 组件和 API，简化了跨平台开发的工作。
支持 H5、各大主流小程序平台以及 App（通过 native 开发方式）。
提供了云开发等功能，方便开发者构建和管理后台服务。
官方有丰富的文档和社区支持，且更新频繁。
使用场景：
对于 Vue 开发者非常友好，适合那些既想支持小程序又需要 H5 的开发场景。

小程序：专门为某些平台（如微信、支付宝）开发的轻量级应用，具有更高的性能、更好的本地设备支持（例如相机、GPS等），但通常限制了一些Web的功能（例如文件系统访问、跨域请求等）。

H5（Web应用）：基于HTML5的Web应用，可以在任何现代浏览器上运行，具有良好的跨平台特性。但通常需要处理性能优化和兼容性问题，特别是在移动端上。
## uniapp中单位rpx
rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算

设计稿 1px / 设计稿基准宽度 = 框架样式 1rpx / 750rpx
vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持
还有一种wx单位，与设备屏幕宽度无关的长度单位，与 vue 页面中的 px 理念相同

## 设备能力检测（navigator接口）
1. navigator.userAgent
这个属性返回一个包含浏览器信息的字符串，通常用于检测用户的设备和浏览器类型。
2. navigator.platform
这个属性返回设备的操作系统信息。例如，Windows、Mac、Linux、iOS、Android等。
3. navigator.connection (Network Information API)
用于获取设备的网络连接信息，帮助判断当前网络的类型（如2G、3G、4G、Wi-Fi等）。
4. navigator.geolocation
该属性提供访问设备地理位置信息的接口。如果设备支持并授权了位置访问，可以使用该属性获取经度、纬度等信息。
5. navigator.clipboard
用于访问剪贴板API，可以检测是否支持剪贴板操作（例如读写剪贴板内容）。
```js
// 检测是否为平板设备  
const isTablet = () => navigator.maxTouchPoints > 2  
// 监听orientationchange事件，动态调整页面布局
// 横竖屏切换时动态调整布局  
window.addEventListener('orientationchange', () => {  
  if (isTablet() && window.orientation === 90) {  
    setLayout('grid') // 横屏：双列网格布局  
  } else {  
    setLayout('list') // 竖屏：单列列表布局  
  }  
})
```
## PostCSS（自动补全前缀）
按需 Polyfill 意味着，Babel 会根据你的代码所使用的 JavaScript 特性，动态地选择并仅为需要的部分添加 Polyfill，而不会像传统的做法那样把所有的 Polyfill 加载到代码中。这不仅减少了代码的体积，还避免了不必要的 Polyfill 被引入。
```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry", // 或者 'usage'
        "corejs": 3 // 指定 Polyfill 版本（这里我们使用的是 core-js 3）
      }
    ]
  ]
}
```
Polyfill 是用于填补某些浏览器或环境中缺失的 JavaScript 特性的代码。例如，ES6+ 中的一些新特性（如 Promise、Array.from、Object.assign 等）可能在较旧的浏览器中不被支持，Polyfill 会让这些特性可以在不支持的浏览器中工作。
Babel 通过 @babel/preset-env 配置，结合 useBuiltIns 和 corejs，可以按需引入 Polyfill。按需 Polyfill 是指：只根据你代码中实际使用的特性引入相应的 Polyfill，而不是把所有 Polyfill 都引入，从而避免代码膨胀。

## 特性检测（Modernizr动态加载）
Modernizr 是一个非常流行的 JavaScript 库，主要用于特性检测。它可以检测浏览器是否支持某些功能或 API，帮助你做出相应的降级处理或加载特定的 Polyfill。Modernizr 允许你在运行时动态检测特性，而不是静态地依赖于用户的浏览器版本。

如果你想要基于浏览器支持的特性动态加载 Polyfill 或其他功能，可以结合 Modernizr 和 动态加载 的方式来实现。这样，你只在用户的浏览器不支持某些功能时加载相关 Polyfill，避免了不必要的加载和代码体积的增加。
```js
// 检测是否支持 Flexbox，如果不支持则动态加载 Polyfill
  if (!Modernizr.flexbox) {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/flexibility/2.0.1/flexibility.min.js';
    document.head.appendChild(script);
  }
  // 检测是否支持 ES6，如果不支持则加载 Polyfill
  if (!Modernizr.es6) {
    var script = document.createElement('script');
    script.src = 'https://cdn.polyfill.io/v3/polyfill.min.js?features=es6';
    document.head.appendChild(script);
  }
  // 检测是否支持 LocalStorage，如果不支持则加载 Polyfill
  if (!Modernizr.localstorage) {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/store.js/1.3.20/store.min.js';
    document.head.appendChild(script);
  }
```
优雅降级（Graceful Degradation） 是指在设计和开发时，优先考虑现代浏览器的高级功能，但同时保证在不支持这些功能的旧版浏览器中，仍能以基本的方式提供功能和视觉效果。
而逐步增强（Progressive Enhancement） 是另外一种设计思想，它从低端浏览器出发，逐步增强和改进功能和样式。
渐进增强指的是从最基本的、可访问的版本开始构建网站或应用，然后逐渐添加更高级的功能和效果，以提供更好的用户体验。
优势：确保网站或应用在各种设备和浏览器上都能正常运行，同时为高级用户或支持更高级特性的设备提供更好的体验。
实现方式：可以通过使用 HTML 和 CSS 的基本功能来构建基本版本，然后使用 JavaScript 等技术来实现更复杂的交互和功能 
图片懒加载：当用户滚动到图片附近时，图片才会开始加载，这样可以减少页面加载时的负载，提高用户体验。
响应式设计：根据用户的设备和浏览器的不同，网站或应用会自动调整布局、样式和交互方式，以提供最佳的用户体验。
视频/图像预加载：在用户可能会查看的区域预加载视频或图像，以便在用户需要时更快地加载。
可选内容：通过提供可选内容来逐步增强用户体验，例如在用户点击按钮后才显示详细信息 
##  优雅降级与渐进增强的区别
| |渐进增强|优雅降级|
|--|--|--|
|定义|从基本功能开始，逐步添加更强大的功能，以适应先进的浏览器和设备|从完全功能的设计开始，逐步削减功能，以适应较旧的浏览器和设备|
|思想|能否实现取决于设备和浏览器的能力|能否保留取决于设备和浏览器的能力|
|开发|从低版本或较旧的浏览器和设备开始|从高版本或先进的浏览器和设备开始|
|重点|着重于功能的可用性|着重于功能的普遍可访问性|
|浏览器适配性|支持所有浏览器，但功能会根据浏览器的能力进行改变|优先支持先进的浏览器，对较旧的浏览器提供最基本的功能|
|设备适配性|支持各种设备，但功能会根据设备的能力进行改变|优先支持先进的设备，对较旧的设备提供最基本的功能|
|代码|先编写基本功能的代码，然后逐步添加更高级的功能|先编写完整功能的代码，然后逐步删除不被支持的功能|
|优点|增强了用户体验，支持更广泛的设备和浏览器|提供完整功能的初始体验，适应性较广|
|缺点|需要额外的开发工作，代码可能更复杂|对某些设备或浏览器会提供较差的用户体验，需要进行兼容性测试|

优雅降级 可以通过检测现代特性（如 Flexbox），在不支持的浏览器中使用备用方案（如 Float）
```css
/* 使用 @supports 检测浏览器是否支持 Flexbox */
@supports (display: flex) {
  .container {
    display: flex;
    justify-content: space-between;
  }
  .box {
    flex: 1;
  }
}
/* 如果不支持 Flexbox，则使用 Float */
@supports not (display: flex) {
  .container {
    display: block;
  }
  .box {
    width: 30%;
    float: left;
  }
}
```
## 处理不同分辨率的方式有哪些？
响应式设计：使用响应式布局，根据屏幕尺寸和分辨率动态调整界面元素的大小、位置和排列方式，以确保在不同设备上都能提供良好的用户体验。
媒体查询：通过媒体查询（Media Queries），根据不同的屏幕尺寸和分辨率设置不同的样式，例如字体大小、图片尺寸等。
弹性布局：采用弹性布局（Flexible Layout），使用相对单位（如百分比、em 等）来定义界面元素的大小和位置，使其能够自适应不同的屏幕尺寸。
图像适配：根据不同的屏幕尺寸提供不同分辨率的图片，以避免图像缩放导致的质量损失。
测试和优化：在多种设备上进行测试，确保应用在不同屏幕尺寸和分辨率下的兼容性和可读性，并根据测试结果进行优化。

## DOM
DOM（Document Object Model）是前端开发的基石，却常被开发者视为“简单”而浅尝辄止。事实上：
框架的底层依赖：React/Vue的虚拟DOM、Svelte的编译优化，最终仍要回归真实DOM操作；
性能的关键瓶颈：不当的DOM操作可能引发页面重排/重绘，导致卡顿（如频繁appendChild）；
跨平台开发的桥梁：DOM API是浏览器、Electron、Puppeteer等技术的通用语言。

## console：日志调试，快速验证逻辑
适用场景：简单逻辑检查、数据格式验证、线上问题排查
核心技巧：
- 结构化日志：`console.log({ userId, orderId })` 替代松散输出
- 分类日志：`console.debug / console.warn / console.error` 分级管理
- 性能日志：`console.time('fetch') + console.timeEnd('fetch')` 测量执行时间
- 高级输出：
- `console.table(data)` —— 表格化展示数组/对象
- `console.dir(element, { depth: null })` —— 深度打印 DOM 或嵌套对象

:::
Elements：DOM 结构查看与实时编辑、CSS 调试、盒模型分析
Console：执行 JS、查看日志、捕获错误、调试网络请求
Sources：断点调试、Source Map 映射、调用栈追踪
Network：HTTP 请求分析、性能瀑布图、模拟慢速网络
Application：Storage（LocalStorage/Cookie）、Service Workers 调试
Performance：页面运行时性能分析（FPS、CPU、内存）
Memory：堆内存快照、内存泄漏检测
:::

## 性能监控与优化（Performance）
性能优化是前端开发的核心竞争力之一，直接影响用户体验、SEO 排名和业务转化率。浏览器的 Performance、Lighthouse 和 Memory 工具提供了完整的性能分析能力，本部分将系统讲解如何利用它们定位和解决问题。
关键指标分析
LCP (最大内容渲染时间)：优化图片/字体加载
CLS (布局偏移)：检查动态插入元素的尺寸是否稳定
工具链实践
Lighthouse 自动化评分 + 生成优化报告
Chrome User Experience Report 分析真实用户性能数据
内存管理
用 Memory 面板 识别内存泄漏（如未解绑的事件监听）
LCP最大内容渲染时间，<=2.5S,图片/字体未优化，服务器响应慢
FID 首次输入延迟，<=100ms,长任务(long tasks)阻塞主线程
CLS 累计布局偏移，<=0.1，动态插入内容未预留空间

Performance 面板深度解析
核心性能问题定位：
卡顿（低 FPS）
检查 Main 线程 是否有长任务（>50ms 的黄色块）
优化方案：代码分片、Web Workers 异步处理
内存泄漏
观察 JS Heap 曲线是否持续上升
使用 Memory 面板 对比堆快照（Heap Snapshots）
main线程火焰图，分析JavaScript执行耗时，找到for循环或递归导致的卡顿
network请求时序，查看资源加载阻塞关系，优化关键请求（如css内联、预加载）
timings标记，关键生命周期节点（如FCP/LCP），对比优化前后的渲染时间

console.trace 打印调用栈，定位函数被谁调用了
console.time 代码执行耗时统计，优化算法性能

最小化复现四原则
环境隔离：排除一切非代码因素的干扰
数据裁剪：用最少数据触发Bug； 使用JSON.parse(JSON.stringify(data))深拷贝避免引用污染，用faker.js生成模拟数据替代敏感生产数据
操作路径：用最简步骤复现问题
依赖控制：确保第三方依赖可控； 常见问题：核心依赖版本升级导致报错，幽灵依赖升级导致报错

内存分析实战
内存泄漏四步检测法：
- 拍摄初始堆快照
- 执行可疑操作
- 拍摄对比快照
- 分析Delta内存增长

三维归因分析法
维度：技术 × 流程 × 沟通

5Why 根因追溯
问题：生产环境图片上传失败
1. Why? → 阿里云OSS返回403  
2. Why? → 临时凭证过期  
3. Why? → 前端未刷新STS Token  
4. Why? → 认为凭证有效期1小时足够  
5. Why? → 需求文档未明确大文件上传场景

|分类| 推荐工具| 使用场景|
|--|--|--|
|移动端调试 |vConsole + Charles |真机H5问题|
|性能分析 | Lighthouse CI | 自动化性能监控|
| 异常监控 | Sentry + Performance | 生产环境错误追踪|

组件选型四维评估
|维度|评估要点|工具/方法|
|--|--|--|
|代码质量|源码可读性/Ts支持|npm view xxx versions|
|生态健康|维护频率/Issue响应速度|GitHub Insights -> Pulse|
|设计系统|是否提供Figma/sketch资源|storybook设计插件|
|性能代价|包体积/Gzip后大小|bundle-analyzer|

案例:推荐使用dayjs替代moment.js进行日期转换、增减和格式化操作。
Day.js:轻量级的Javascript日期库

推荐组合：
基础组件库：Naive UI（TS友好）
复杂组件：Element Plus（企业级）
动画组件：@vueuse/motion
工具链：unplugin-vue-components（自动引入）

```js
// 性能敏感操作的防抖:
import {debounce } from 'lodash-es'
const search = debounce((query)=>{
fetchResults(query)
}，300)
watch(searchQuery,search)
// 性能标记:
const measure=_DEV_?(name,fn)=> {
performance.mark(`${name}-start`)
const result = fn()
performance.mark(`${name}-end`)
performance.measure(name,`${name}-start`,`${name}-end`)
return result
}:(_，fn)=> fn()
```

Vue3 组件设计心法
设计原则：
原子性：Button > ButtonGroup > Toolbar
受控/非受控：同时支持v-model和独立状态
插槽分层设计：始终提供default插槽作为逃生舱口
性能优化: 减少不必要的响应式依赖 + 合理拆分组件
优秀组件三特征：
克制：不做过度抽象（如避免万能`<SmartComponent />`）
透明：暴露足够多的ref和事件钩子
健壮：对非法参数有优雅降级方案
工具链推荐：
构建：Vite + unplugin
测试：Vitest + Testing Library
文档：Vitepress + Demo Container

系统化调试四步法：观察现象→收集日志→精准复现→根因分析

## 设计原则
单一职责原则 :构建可持续维护组件的基石
开闭原则: 对扩展开放，对修改关闭
受控与非受控平衡:在粒度控制与性能效率间找到最佳平衡点
接口稳定原则:在快速迭代与系统稳定间找到精妙平衡
性能敏感原则:系统性保障组件的执行效率和资源利用率

设计模式的核心价值在于​​构建高内聚、低耦合的可持续演进系统

核心评审维度与标准：围绕​​质量、安全、可维护性、性能​​四大维度制定可量化技术指标与验收基线。

需求拆解的核心逻辑：将大需求拆分为模块化、分层化的可交付单元

| Git Flow | GitHub Flow | Trunk-Based Development |
|--|--|--|
|包括master（主分支，存放生产环境的代码）和develop（开发分支，用于集成所有功能分支的代码）‌功能分支（Feature Branches）发布分支（Release Branches）‌热修复分支（Hotfix Branches）|开发者在主分支上进行日常开发，当需要添加新功能时，会创建一个新的特性分支，完成后再通过Pull Request（PR）合并到主分支。通过拉取请求（Pull Requests）进行代码审查和合并。‌适用于小到中型团队，追求敏捷开发和持续集成/部署的环境。|TBD不再频繁地创建和合并分支，而是将所有的开发工作都集中在主干分支上。开发人员需更加谨慎地提交代码，确保每次提交都能通过自动化测试，以保证主干分支的稳定性和可用性。根据软件版本的发布节奏拉出发布分支，修改完成后通过cherry pick的方式合并到发布分支‌。适用快速迭代和持续集成的项目。|

指标 | 定义与优化目标
FCP | 首次内容绘制时间，目标<1.8秒。优化方法:减少阻塞资源、预加载关键资源。
LCP | 最大内容元素加载时间，目标<2.5 秒。需优化图片、字体加载，使用CDN 加速。
CLS | 累积布局偏移，目标<0.1。需为动态内容预留空间，指定图片/广告尺寸。
TBT | 总阻塞时间，目标<300ms。需拆分长任务、延迟非关键脚本
TTI | 可交互时间，依赖 JS 执行效率。优化方法:代码分割、异步加载脚本。

FPS（每秒帧数）
理想值：60 FPS 表示动画流畅，低于 30 FPS 用户会感知卡顿。
红色条警告：FPS 图表中的红色区域表示帧率过低，需重点关注。
2. CPU 使用率
颜色对应：CPU 图表中不同颜色代表不同任务类型（如黄色为脚本执行，紫色为渲染。
高占用区域：长时间满负载（全彩色）可能由复杂计算或频繁 DOM 操作引起。
3. 火焰图（Main 面板）
事件堆栈：展示主线程活动，横向宽度表示事件耗时，纵向表示调用层级。
红色三角标记：表示耗时过长的事件（如强制重排、长任务）。
跳转源码：点击事件后的 app.js:xx 链接可直接定位问题代码。
4. 网络请求（Network 面板）
资源加载时间：横条长度表示加载耗时，浅色部分为等待时间（TTFB）。

1. 强制重排（Layout Thrashing）
表现：紫色 Layout 事件频繁出现，伴随红色三角警告。
解决方法：避免在循环中读取布局属性（如 offsetHeight），批量修改 DOM。
2. JavaScript 执行阻塞
表现：火焰图中长条橙色 Scripting 事件。
解决方法：分解长任务、使用 requestAnimationFrame 替代 setTimeout。
3. 内存泄漏
表现：Memory 面板中 JS Heap 曲线持续增长。
解决方法：移除无用事件监听器、清理全局变量引用。

减少未使用的 JavaScript 和 CSS
	使用代码分割和按需加载
	删除无用的代码
	使用 Tree Shaking 技术
优化图片
	使用现代图片格式（WebP、AVIF）
	实现图片懒加载
	使用响应式图片
启用文本压缩
	配置服务器支持 Gzip 或 Brotli 压缩
消除渲染阻塞资源
	将关键 CSS 内联到 HTML 中
	为非关键资源添加 async 或 defer 属性
优化关键渲染路径
	减少 DOM 深度和复杂性
	避免大型布局重排
减少请求数量
	合并小文件
	使用 CSS Sprites 或图标字体
优化服务器响应时间
	使用 CDN 缓存静态资源
	优化后端处理逻辑
减少重定向请求
	实施有效的缓存策略
	设置适当的 Cache-Control 头
	使用 ETag 和条件请求

长任务（Long Tasks）：

表现：火焰图中出现宽度较大的黄色块（超过 50ms）
原因：JavaScript 执行时间过长，阻塞主线程
解决方法：
将大型计算任务拆分为小块
使用 Web Workers 将耗时操作移至后台线程
优化算法复杂度

布局抖动（Layout Thrashing）：

表现：火焰图中反复出现紫色的「Layout」事件
原因：JavaScript 频繁读取和修改 DOM，导致浏览器被迫多次重新计算布局
解决方法：
批量读取和修改 DOM
使用 requestAnimationFrame 调度视觉变化
避免在循环中读取会导致重排的属性（如 offsetHeight、clientWidth 等）

过度渲染（Excessive Rendering）：

表现：大量紫色和绿色事件占据主线程
原因：样式变化导致大范围重绘或重排
解决方法：
使用 CSS will-change 属性提示浏览器
使用 CSS transform 代替改变位置的属性
减少影响布局的 CSS 属性变化

阻塞资源加载：

表现：Network 面板中资源加载时间长，且阻塞了其他资源
原因：关键资源（如 CSS、JavaScript）阻塞渲染
解决方法：
使用 async/defer 属性加载非关键 JavaScript
内联关键 CSS
预加载关键资源

FPS（每秒帧数） ：绿色条表示流畅帧，红色条表示卡顿帧。确保动画和交互在 16ms 内完成，以保证页面的流畅性。
CPU 使用率 ：不同颜色代表处理不同的活动，如黄色表示执行 JavaScript，紫色表示渲染，绿色表示绘制等。长时间满负载的 CPU 使用可能导致页面卡顿。
内存使用 ：展示内存的使用情况，内存飙升可能意味着内存泄漏，内存不足又可能引发页面崩溃。
概览面板 ：显示每一帧的渲染状态、CPU 使用率和内存使用情况等，提供整体的性能预览。
线程面板 ：展示浏览器各个进程的具体活动，如主线程、合成线程、浏览器子线程等的活动情况。
详情面板 ：包括 “Summary”、“Bottom-up”、“Call tree” 和 “Event log” 等选项卡，展示所选内容的详细信息，如各阶段的耗时比例、函数调用的完整堆栈关系等。

## 前端安全的核心目标
全面保护用户数据、防范恶意攻击、确保代码完整性、保护用户隐私、防范第三方风险、提升用户体验、确保系统可用性、满足合规性要求，并防止信息泄露。通过实施有效的安全措施（如输入验证、HTTPS、CSP、CSRF 防护等），开发者可以构建更安全、可靠的前端应用，保护用户和企业免受安全威胁。

## 跨站脚本攻击（XSS）
一种常见的网络安全漏洞，攻击者通过注入恶意脚本到网页中，当其他用户访问该页面时，脚本会在他们的浏览器中执行，从而窃取信息或进行其他恶意操作。

|特性 | 反射型 xss | 存储型 xss | DOM 型XSS | 
|--|--|--|--|
|定义 | 恶意脚本被永久存储在服务器上(如数据库)，当用户访问相关页面时，脚本从服务器加载并执行。常见于用户输入内容被存储并显示的场景，如论坛帖子、评论等。|恶意脚本通过URL参数等方式传递给服务器，服务器将其嵌入响应页面并返回给用户，脚本在用户浏览器中执行。通常通过诱骗用户点击恶意链接实现|恶意脚本通过修改页面的DOM结构在客户端执行，不经过服务器。攻击利用前端Javascript代码对用户输入的处理不当。 | 
|存储位置 | 不存储，脚本通过URL传递|存储在服务器(如数据库)|不存储，先全在客户端发生|
|触发方式 | 用户点击恶意链接|用户访问包合恶意脚本的页面|用户访问包合恶意脚本的页面|
|影响范围 | 仅对点击链接的用户生效 | 对所有访问页面的用户生效 | 仅对访问页面的用户生效|
|是否依赖服务器 | 是 | 是 | 否 |
|常见场景 | 搜索功能、错误消息显示 | 评论、论坛、用户资料 | 动态页面、前端路由 | 

## CSRF
CSRF 是一种攻击方式，攻击者诱骗用户在已登录目标网站的情况下，向目标网站发送伪造的请求。由于请求是用户浏览器发出的，目标网站会认为这是用户的自愿操作，从而导致攻击者能够以用户的身份执行某些操作（如转账、修改密码等）。

## babel-loader
用于将 ES6+（如 ES2015、ES2016 等）代码转换为向后兼容的 JavaScript。
```js
module.exports = {
   module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
            cacheDirectory: true
          }
        },
        exclude: /node_modules/
      },
    ]
  }
}
```
preset-env：一个智能预设，自动转换 JavaScript 语法和按需引入 polyfills，从而简化开发流程、优化代码体积，并提升兼容性。如果需要
plugin-transform-runtime：一个babel插件，优化 Babel 转换过程中的辅助函数和 polyfill 的引入方式，避免全局污染、减少代码重复，并保持代码的模块化。

## Css加载器
loader执行顺序先执行右边，再执行左边。
```js
module.exports = {
   module: {
    rules: [
      {
        test: /\.s[ac]ss|css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader", "postcss-loader"]
      },
    ]
  }
}
```
postcss-loader：对 CSS 进行转换和优化，添加浏览器前缀、嵌套语法、未来 CSS 特性兼容、代码压缩、冗余删除等，配合postcss.config.js 配置文件进行使用。
sass-loader：处理 ​Sass/SCSS 文件的加载器，将 ​Sass/SCSS 代码编译为标准 CSS 。
css-loader：解析 CSS 文件中的 @import 和 url() 依赖关系，并将 CSS 转换为 JavaScript 模块。
MiniCssExtractPlugin：​是一个插件，将 CSS 代码从 JavaScript 中提取出来，生成独立的 .css 文件，独立的 CSS 文件可以被浏览器缓存。

## 图片
loader执行顺序先执行右边，再执行左边。
```
module.exports = {
   module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'assets/img/[hash][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 限制于 10kb
          }
        }
      },
    ]
  }
}
```
asset资源类型使用 Webpack 5 内置的 ​Asset Modules​（资源模块）处理图片。
dataUrlCondition可以根据指定的图片大小来判断是否需要转化为 base64，小图片内联减少请求次数。

## 文字
```js
module.exports = {
   module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash:8].[name][ext]"
        }
      },
    ]
  }
}
```
使用 Webpack 5 内置的 ​Asset Modules，将字体文件视为静态资源，将字体文件原样复制到输出目录​（dist/assets/fonts/） 。

## webpack5的常用插件
1、html-webpack-plugin：HTML生成与资源注入，SPA/MPA项目基础模板
2、mini-css-extract-plugin：CSS代码分离，生产环境样式优化
3、css-minimizer-webpack-plugin：CSS压缩，生产环境构建
4、terser-webpack-plugin：JS压缩混淆，生产环境构建
5、copy-webpack-plugin：静态资源复制，处理无需编译的静态文件

插件列表：https://webpack.js.org/plugins/