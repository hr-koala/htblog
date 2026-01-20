---
title: 'docx-preview'
---

# Vue3 + TypeScript 使用 docx-preview、mammoth、@vue-office/docx 预览 docx 文件


一、实现方法
1. `docx-preview`
Vue3 中使用 `docx-preview` 预览 Word 文档
1.1 基本用法示例

`docx-preview` 的核心方法是 renderAsync，它接受 Word 文档数据（支持 Blob、ArrayBuffer 等类型）和一个 DOM 容器元素。

1. 在 Vue 项目中使用

以下是一个在 Vue 组件中使用的例子：

```vue
<template>
  <div>
    <button @click="previewDoc">预览Word文档</button>
    <!-- 用于渲染文档的容器 -->
    <div ref="previewContainer" class="preview-wrapper"></div>
  </div>
</template>
<script>
// 引入 docx-preview
import { renderAsync } from 'docx-preview';
export default {
  methods: {
    async previewDoc() {
      try {
        // 假设这里是从后端获取.docx文件的Blob数据
        // 你的实际获取文件数据的逻辑可能是一个API调用，如使用 axios
        const response = await fetch('https://example.com/your-file.docx');
        const blob = await response.blob();
        // 获取DOM容器
        const container = this.$refs.previewContainer;
        // 调用 renderAsync 方法渲染文档
        await renderAsync(blob, container, null, {
          className: 'docx', // 默认和文档样式类的类名/前缀
          inWrapper: true,   // 启用围绕文档内容渲染包装器
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false, // 禁用字体渲染
          breakPages: true,   // 在分页符上启用分页
          // ... 其他选项可根据需要配置
        });
        console.log('文档渲染完成！');
      } catch (error) {
        console.error('预览失败:', error);
      }
    }
  }
}
</script>
<style>
.preview-wrapper {
  width: 100%;
  /* 其他样式 */
}
/* 可以通过覆盖 .docx 相关的CSS类来定制样式 */
</style>
```

2. 在 React 项目中使用

在 React 类组件中，你可以在 componentDidMount 中处理预览：

```jsx
import React, { Component } from 'react';
import * as docx from 'docx-preview';
class DocxPreviewer extends Component {
  constructor(props) {
    super(props);
    this.previewContainerRef = React.createRef();
  }
  componentDidMount() {
    // 假设在组件挂载后需要预览的文档Blob数据已经可用（例如通过props传入）
    this.renderDocx();
  }
  async renderDocx() {
    const { docBlob } = this.props; // 假设 docBlob 是传入的Blob数据
    const container = this.previewContainerRef.current;
    if (docBlob && container) {
      try {
        await docx.renderAsync(docBlob, container);
        console.log('Docx preview rendered');
      } catch (error) {
        console.error('Failed to render docx:', error);
      }
    }
  }
  render() {
    return (
      <div>
        <div ref={this.previewContainerRef} style={{ width: '100%', minHeight: '500px' }} />
      </div>
    );
  }
}
export default DocxPreviewer;
```
在 React 函数组件中，可以使用 useEffect Hook：
```jsx
import React, { useRef, useEffect } from 'react';
import { renderAsync } from 'docx-preview';
function DocxPreviewer({ docBlob }) {
  const previewContainerRef = useRef(null);
  useEffect(() => {
    const renderDoc = async () => {
      if (docBlob && previewContainerRef.current) {
        try {
          await renderAsync(docBlob, previewContainerRef.current);
          console.log('Docx preview rendered');
        } catch (error) {
          console.error('Failed to render docx:', error);
        }
      }
    };
    renderDoc();
  }, [docBlob]); // 当 docBlob 变化时重新渲染
  return <div ref={previewContainerRef} style={{ width: '100%', minHeight: '500px' }} />;
}
export default DocxPreviewer;
```
3. 在纯 JavaScript / HTML 中使用

如果你没有使用任何框架，也可以在纯 HTML/JS 环境中使用：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Docx 预览示例</title>
    <!-- 引入 docx-preview -->
    <script src="https://cdn.jsdelivr.net/npm/docx-preview@latest/build/docx-preview.min.js"></script>
    <style>
        #preview-container {
            width: 800px;
            margin: 20px auto;
            border: 1px solid #ccc;
            padding: 10px;
        }
    </style>
</head>
<body>
    <input type="file" id="file-input" accept=".docx" />
    <div id="preview-container"></div>
    <script>
        document.getElementById('file-input').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file && file.name.endsWith('.docx')) {
                const container = document.getElementById('preview-container');
                // 清空容器之前的内容
                container.innerHTML = '';

                // 读取文件并渲染
                const reader = new FileReader();
                reader.onload = function(e) {
                    const arrayBuffer = e.target.result;
                    // 使用 window.docx.renderAsync 如果通过 script 标签全局引入
                    window.docx.renderAsync(arrayBuffer, container)
                        .then(() => {
                            console.log('Docx 渲染完成！');
                        })
                        .catch(error => {
                            console.error('渲染出错:', error);
                        });
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert('请选择一个 .docx 文件');
            }
        });
    </script>
</body>
</html>
```

⚙️ 配置选项 (Options)

renderAsync 方法接受一个选项对象作为第三个参数，允许你自定义渲染行为。常用的选项包括：

|选项名称	|类型	|默认值	|描述|
|--|--|--|--|
| className|	string|	"docx"|	生成的 HTML 元素使用的 CSS 类名前缀。|
| inWrapper	|boolean|	true	|是否在渲染的内容外面包裹一个带有 className 的容器div。|
| ignoreWidth|	boolean|	false	|是否忽略文档中设置的宽度。|
| ignoreHeight|	boolean	|false	|是否忽略文档中设置的高度。|
| ignoreFonts	|boolean	|false	|是否忽略字体样式（设置为 true 可能提升性能，但会影响文档外观）。|
| breakPages	|boolean	|true	|是否在分页符处分割页面。|
| ignoreLastRenderedPageBreak	|boolean	|true|	当为 true 时，会忽略最后一个自动产生的分页符。|
| experimental	|boolean	|false	|是否启用实验性功能（如制表符停止计算）。|
| trimXmlDeclaration|	boolean	|true	|是否在解析 XML 前移除 XML 声明。|
| useBase64URL|	boolean	|false	|是否将图片转换为 Base64 编码（为 true）或使用 URL.createObjectURL（为 false）。|
| useMathMLPolyfill|	boolean|	false	|是否包含对 MathML 的 polyfill（用于 Chrome、Edge 等）。|
| debug|	boolean|	false|	是否开启调试模式（输出更多日志）。|

获取文档数据 (Blob/ArrayBuffer)

通常，你需要从以下途径获取 .docx 文件的 Blob 或 ArrayBuffer 数据：

文件输入：用户通过` <input type="file"> `选择的本地文件（如上面的纯 JS 例子）。

网络请求：从服务器端获取。确保响应类型设置为 'blob'（如果使用 axios）或 responseType: 'arraybuffer'。

```javascript
// 使用 axios 从服务器获取 Blob
axios({
  method: 'get',
  url: '你的文档API地址',
  responseType: 'blob' // 非常重要！
}).then(response => {
  const docBlob = response.data;
  // 使用 docBlob 进行预览
}).catch(error => {
  console.error('下载文档失败:', error);
});
```
注意事项

仅支持 .docx：该库主要处理 .docx 格式（Office Open XML格式）。对于旧的 .doc 格式支持有限或需要先进行转换。

样式差异：渲染出的 HTML 与 Word 中的实际显示效果可能存在细微差异，这是正常现象。

性能与大小：非常大的文档可能会影响渲染性能和用户体验。

后端返回流文件：如上面 Vue 例子中所示，后端（如 Express）可以读取 .docx 文件并以流的形式返回给前端。

TypeScript 支持：虽然 docx-preview 本身是用 JavaScript 编写的，但你可能需要自行处理类型声明（例如创建 .d.ts 文件或使用 // @ts-ignore）。

下面是一个在 Vue3 组件中使用 docx-preview 预览后端返回文件流的基本示例：

```vue
<template>
  <div>
    <button @click="previewDocx">预览Word文档</button>
    <!-- 用于渲染文档的容器 -->
    <div ref="previewContainer" class="preview-container"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { renderAsync } from 'docx-preview'; // 导入渲染函数
import axios from 'axios'; // 假设使用 axios 进行 HTTP 请求

// 获取容器元素的引用
const previewContainer = ref(null);

// 预览文档的方法
const previewDocx = async () => {
  try {
    // 从后端获取.docx文件的Blob数据
    const response = await axios({
      method: 'get',
      url: '你的API地址', // 替换为你的后端API地址
      responseType: 'blob' // 必须指定响应类型为 blob
    });

    // 确保容器存在
    if (previewContainer.value) {
      // 调用 renderAsync 方法渲染文档到容器
      await renderAsync(response.data, previewContainer.value);
      console.log('文档渲染完成！');
    }
  } catch (error) {
    console.error('预览失败:', error);
  }
};
</script>
<style scoped>
.preview-container {
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>
```
预览用户选择的本地文件
如果你的应用需要让用户选择本地的 .docx 文件进行预览，可以参考以下示例：

```vue
<template>
  <div>
    <input type="file" accept=".docx" @change="onFileChange" />
    <div ref="previewContainer" class="preview-container"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { renderAsync } from 'docx-preview';

const previewContainer = ref(null);

// 处理文件选择变化的事件
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file || !file.name.endsWith('.docx')) {
    alert('请选择.docx格式的文件');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    // 将文件内容转换为 ArrayBuffer
    const arrayBuffer = e.target.result;
    if (previewContainer.value) {
      // 渲染文档
      renderAsync(arrayBuffer, previewContainer.value);
    }
  };
  reader.readAsArrayBuffer(file); // 读取文件为 ArrayBuffer
};
</script>
```
配置渲染选项
renderAsync 方法允许你传入一个选项对象来自定义渲染行为。以下是一些常用的配置选项：

```vue
<script setup>
// ... 其他代码
const previewWithOptions = async (docxBlob) => {
  if (previewContainer.value) {
    await renderAsync(docxBlob, previewContainer.value, null, {
      className: 'docx', // 默认和文档样式类的类名/前缀
      inWrapper: true, // 启用围绕文档内容呈现包装器
      ignoreWidth: false, // 禁用页面的渲染宽度
      ignoreHeight: false, // 禁用页面的渲染高度
      ignoreFonts: false, // 禁用字体渲染
      breakPages: true, // 在分页符上启用分页
      ignoreLastRenderedPageBreak: true, // 在lastRenderedPageBreak元素上禁用分页
      experimental: false, // 启用实验功能（制表符停止计算）
      trimXmlDeclaration: true, // 如果为true，解析前会从xml文档中移除xml声明
      useBase64URL: false, // 如果为true，图片、字体等会转为base 64 URL，否则使用URL.createObjectURL
      useMathMLPolyfill: false, // 包括用于 chrome、edge 等的 MathML polyfill
      showChanges: false, // 启用文档更改的实验性渲染（插入/删除）
      debug: false // 启用额外的日志记录
    });
  }
};
</script>
```
自定义样式
docx-preview 生成的 HTML 带有特定的 CSS 类，你可以通过这些类来自定义外观。

```vue
<style scoped>
/* 深度选择器用于样式穿透 */
:deep(.docx-wrapper) {
  background-color: #fff; /* 将默认的灰色背景改为白色 */
  padding: 20px;
}

:deep(.docx-wrapper > section.docx) {
  width: 100% !important;
  padding: 0 !important;
  min-height: auto !important;
  box-shadow: none; /* 移除阴影效果 */
  margin-bottom: 0;
  font-family: '微软雅黑', sans-serif; /* 设置字体 */
}

/* 调整标题样式 */
:deep(.docx h1) {
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.3em;
}

/* 调整表格样式 */
:deep(.docx table) {
  border-collapse: collapse;
  width: 100%;
}

:deep(.docx td, :deep(.docx th) {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
```
注意事项
格式支持：docx-preview 主要处理 .docx 格式（Office Open XML 格式）。对于旧的 .doc 格式（二进制格式）支持有限或需要先进行转换。

文件大小：非常大的文档可能会影响渲染性能和用户体验。建议对大文件做大小限制或提示。

样式差异：渲染出的 HTML 与 Word 中的实际显示效果可能存在细微差异，这是正常现象。

异步渲染：renderAsync 返回一个 Promise，确保在渲染完成后再进行相关操作。

TypeScript 支持：虽然 docx-preview 本身是用 JavaScript 编写的，没有内置的 TypeScript 类型定义，但你可以在使用时忽略类型检查或自行定义类型。

两种常见场景对比
下表对比了两种常见预览场景的关键点：

场景	实现方式	优点	缺点
后端文件流	通过 API 获取 Blob 数据，使用 renderAsync 渲染	文件不暴露给用户，相对安全	需要后端支持，增加 API 调用
本地文件	通过 input[type="file"] 获取用户文件，转换为 ArrayBuffer 后渲染	无需网络请求，快速	文件完全在前端处理，大小受限
扩展与替代方案
后端返回文件流：许多应用选择从后端获取文件流。后端（如使用 Express）可以读取 .docx 文件并以流的形式返回给前端，前端接收后使用 docx-preview 渲染。

替代库：除了 docx-preview，你也可以考虑其他库，如 mammoth.js 或 vue-office/docx，它们各有特点。

服务端渲染：对于复杂或敏感的文档，可以考虑在服务端将 Word 文档转换为 PDF 或 HTML，再提供给前端预览，这样可以更好地控制样式和安全性。

在 Vue 3 项目中集成 Word 文档预览功能时，vue-docx-preview 是一个值得考虑的选项。不过，根据这些搜索结果，更常见的是使用 docx-preview 库（你可能注意到它们名称相似，有时会混用）。这里我将主要介绍如何在 Vue 3 中使用 docx-preview 实现 DOCX 文件预览，并简要对比其他方案。

安装与基础使用

docx-preview 库兼容主流浏览器，具有较好的安全性（不加载外部内容）和性能表现。

安装依赖：通过 npm 或 yarn 安装 docx-preview。

> npm install docx-preview --save
>  或
> yarn add docx-preview
引入与注册：在 Vue 3 的 setup 语法糖或选项中，引入 docx-preview 的 renderAsync 方法。

```javascript
import { renderAsync } from 'docx-preview';
```
准备容器与渲染：在模板中放置一个用于渲染的容器，并通过 ref 获取其 DOM 元素。当获取到 DOCX 文件的 Blob 数据后，调用 renderAsync 进行渲染。

```vue

<template>
  <div>
    <input type="file" @change="onFileChange" accept=".docx" />
    <!-- 预览容器 -->
    <div ref="previewContainer" class="preview-container"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { renderAsync } from 'docx-preview';

const previewContainer = ref(null); // 预览容器引用

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.name.endsWith('.docx')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // 将 ArrayBuffer 转换为 Blob
      const blob = new Blob([e.target.result]);
      // 渲染到容器
      renderAsync(blob, previewContainer.value)
        .then(() => {
          console.log('文档渲染完成');
        })
        .catch((error) => {
          console.error('渲染失败:', error);
        });
    };
    reader.readAsArrayBuffer(file);
  } else {
    console.warn('请选择.docx格式的文件');
  }
};
</script>

<style>
.preview-container {
  width: 100%;
  margin-top: 20px;
}
</style>
```
配置选项

renderAsync 方法支持传入一个选项对象来定制渲染行为，常用的配置选项如下：

> 配置项	类型	默认值	描述
> className	string	"docx"	生成文档内容样式 CSS 类的前缀。
> inWrapper	boolean	true	是否在文档内容外渲染一个包装器。
> ignoreWidth	boolean	false	是否忽略页面渲染宽度。
> ignoreHeight	boolean	false	是否忽略页面渲染高度。
> ignoreFonts	boolean	false	是否禁止字体渲染。
> breakPages	boolean	true	是否在分页符处启用分页。
> ignoreLastRenderedPageBreak	boolean	true	是否禁用 lastRenderedPageBreak 元素的分页。
> experimental	boolean	false	是否启用实验性功能（如制表符停止计算）。
> trimXmlDeclaration	boolean	true	解析 XML 前是否移除 XML 声明。
> debug	boolean	false	是否启用额外的调试日志。
> useBase64URL	boolean	true	图片、字体等是否转换为 Base64 URL（否则使用 URL.createObjectURL）。
> useMathMLPolyfill	boolean	false	是否包括用于 Chrome、Edge 等的 MathML polyfill。
> showChanges	boolean	false	是否启用文档更改（插入/删除）的实验性呈现。
示例：使用配置选项

```javascript
renderAsync(
  blob,
  previewContainer.value,
  null, // 渲染进程函数，通常为 null
  {
    className: 'custom-docx', // 自定义样式类前缀
    inWrapper: true,
    breakPages: true,
    ignoreHeight: false,
    ignoreWidth: false,
    ignoreFonts: false,
    useBase64URL: true // 使用 Base64 编码内联资源
  }
).then(() => {
  // 渲染完成
});
```
样式自定义

docx-preview 渲染的文档会附带默认样式。你可能需要通过样式穿透（Vue 3 中使用 :deep()）来覆盖这些默认样式，例如：

```vue
<style scoped>
/* 深度选择器修改渲染后文档的样式 */
:deep(.docx-wrapper) {
  background-color: #fff !important; /* 背景色 */
  padding: 0; /* 内边距 */
}

:deep(.docx-wrapper > section.docx) {
  width: 100% !important; /* 宽度 */
  padding: 0 !important; /* 内边距 */
  min-height: auto !important; /* 最小高度 */
  box-shadow: none !important; /* 阴影 */
  margin-bottom: 0; /* 下外边距 */
}

/* 可以根据需要调整其他样式，如字体、段落间距等 */
:deep(.docx) h1 {
  font-size: 18pt;
}
:deep(.docx) p {
  margin-bottom: 12px;
}
</style>
```
从服务器获取 DOCX 文件

更多时候，你的 DOCX 文件可能存储在服务器上。你需要通过 API 请求获取文件流（Blob 类型）。

```vue
<template>
  <div>
    <button @click="loadDocFromServer">加载服务器文档</button>
    <div ref="previewContainer" class="preview-container"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { renderAsync } from 'docx-preview';
import axios from 'axios'; // 确保已安装 axios

const previewContainer = ref(null);

const loadDocFromServer = async () => {
  try {
    // 假设你的接口地址是 /api/getDoc
    const response = await axios.get('/api/getDoc', {
      responseType: 'blob' // 必须指定响应类型为 blob
    });
    const blobData = response.data;

    if (blobData) {
      renderAsync(blobData, previewContainer.value)
        .then(() => {
          console.log('服务器文档渲染完成');
        })
        .catch((error) => {
          console.error('服务器文档渲染失败:', error);
        });
    }
  } catch (error) {
    console.error('获取文档失败:', error);
  }
};
</script>
```
注意事项与常见问题

文件格式：docx-preview 仅支持 .docx 格式，不支持旧的 .doc 格式。

浏览器兼容性：支持主流浏览器（Chrome, Firefox, Safari, Edge）。

网络连接：预览需要互联网连接以下载解析器。

复杂文件：对于特别复杂或损坏的 DOCX 文件，预览可能无法完全正常显示。

样式差异：渲染效果可能与 Microsoft Word 等本地软件存在细微差异。

错误处理：务必对 renderAsync 和文件读取操作进行错误捕获，以增强用户体验。

其他 DOCX 预览方案概览
:::
特性	docx-preview (本文介绍)	@vue-office/docx	Mammoth.js	Office Web Viewer (微软)
Vue 集成度	良好，需手动操作 DOM	高，专为 Vue 设计，组件化	较低，需自行处理 HTML 注入	低，使用 iframe
功能侧重	预览，样式还原较好	预览，组件化	转换为 HTML，可自定义样式	在线预览编辑（功能强大）
编辑支持	否	否	否	是
离线可用性	是	是	是	否，需联网
隐私性	文件内容在客户端处理	文件内容在客户端处理	文件内容在客户端处理	文件会传输到微软服务器
复杂度	中等	低	中等（需处理转换后的 HTML）	低（仅 iframe）
适用场景	需要较好预览效果且希望客户端处理的 Vue 项目	追求简单组件化集成、快速预览的 Vue 项目	需要将 DOCX 内容转换为自定义 HTML 结构的项目	需要完整编辑功能且不介意文件上传至微软服务器的场景
@vue-office/docx：一个 Vue 专用组件，可能提供更声明式的集成方式。
:::

> npm install @vue-office/docx vue-demi
```vue

<template>
  <vue-office-docx :src="docxFile" @rendered="rendered" />
</template>
<script setup>
import VueOfficeDocx from '@vue-office/docx';
import '@vue-office/docx/lib/index.css';
const docxFile = 'https://example.com/document.docx'; // 或者是 ArrayBuffer
</script>
```
Mammoth.js：将 DOCX 转换为 HTML，然后使用 v-html 或其他方式渲染，给你更大的样式控制权，但转换可能丢失一些原始格式。

> npm install mammoth
``` javascript

import mammoth from 'mammoth';
// ... 获取 ArrayBuffer ...
mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
  .then(result => {
    document.getElementById('preview').innerHTML = result.value;
  })
  .catch(err => console.error(err));
```
Office Web Viewer：通过 iframe 嵌入微软的在线预览服务（https://view.officeapps.live.com/op/view.aspx?src=你的文档URL）。最省事，且预览效果接近 Office，但文件需公开可访问，且会发送到微软服务器，考虑隐私和网络因素。

```vue
<iframe :src="`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(docUrl)}`" width="100%" height="600px" frameborder="0"></iframe>
```
总结

在 Vue 3 中使用 docx-preview 可以实现不错的客户端 DOCX 文件预览效果。关键是：

正确安装并引入 renderAsync。

准备一个容器元素并通过 ref 获取其引用。

将 DOCX 文件（无论是本地选择的还是从服务器获取的）转换为 Blob。

调用 renderAsync(blob, containerRef) 进行渲染。

根据需要，使用配置选项和深度选择器自定义样式。

选择方案时，请根据你的项目需求（如预览质量、集成复杂度、隐私要求、是否需要编辑等）来决定。对于大多数需要在 Vue 3 应用内部实现简单客户端预览的场景，docx-preview 是一个不错的选择。如果追求更简单的组件化集成，可以考虑 @vue-office/docx；如果文件可公开访问且不介意网络延迟和隐私问题，Office Web Viewer 最快捷且功能强大。

2、mammoth＋DOMPurify
Mammoth.js 是一个挺不错的 JavaScript 库，它能帮你把 .docx 文档（也就是 Word 2007 及以后版本的文档）转换成 HTML。这样你就可以很方便地在 Vue3 项目中的网页上预览 Word 文档内容了。它特别适合用在后台管理系统、教育平台这类需要快速预览文档内容的场景。

由于 Mammoth 本身是一个纯 JavaScript 库，它并不依赖特定的前端框架，因此可以和 Vue3 很好地配合使用。

下面是一个在 Vue3 项目中使用 Mammoth.js 的主要步骤和核心代码示例。

🛠 安装与引入
在你的 Vue3 项目中，可以使用 npm 或 yarn 来安装 Mammoth：

> npm install --save mammoth
> 或
> yarn add mammoth
安装完成后，你可以在 Vue 组件中按需引入：

```javascript

import mammoth from "mammoth";
```
💻 基本使用示例
Mammoth 的核心功能是将 .docx 文件的 arrayBuffer 数据转换为 HTML。以下是一个在 Vue3 组件中使用的示例：

```vue

<template>
  <div class="word-preview">
    <input type="file" @change="handleFileUpload" accept=".docx" />
    <div v-if="convertedHtml" v-html="convertedHtml"></div>
    <div v-else>暂无预览内容</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import mammoth from 'mammoth';

const convertedHtml = ref('');

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    const arrayBuffer = loadEvent.target.result;
    mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
      .then((result) => {
        convertedHtml.value = result.value; // 转换得到的 HTML
        // 你可以访问 result.messages 来查看转换过程中的任何信息或警告
      })
      .catch((error) => {
        console.error('转换出错:', error);
      });
  };
  reader.readAsArrayBuffer(file);
};
</script>

<style scoped>
.word-preview {
  max-width: 800px;
  margin: 0 auto;
}
</style>
```
Mammoth.js 的转换选项与样式控制
Mammoth 提供了一些选项来控制转换过程和行为。

转换选项
你可以通过向 convertToHtml 方法传递一个选项对象来定制转换行为（虽然上面的例子没有显式使用）：

```javascript

mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, options)
    .then(function(result){
        // ...
    });
```
常见的选项包括：

styleMap (样式映射): 允许你自定义 Word 样式如何映射到 HTML 标签。例如，你可以将特定的 Word 样式映射到特定的 CSS 类。

includeDefaultStyleMap (包含默认样式映射): 一个布尔值，指示是否包含 Mammoth 的默认样式映射。默认为 false。

convertImage (转换图像): 允许你指定一个函数来处理文档中的图像，例如将图像转换为 base64 编码的 `<img>` 标签（Mammoth 默认会将图片转换为 Base64 嵌入）或上传到服务器并返回图片 URL。

样式控制
Mammoth 旨在生成简洁、语义化的 HTML，这意味着它不会完全保留原始 Word 文档的所有视觉样式（如精确的字体、颜色、边距等）。它更关注于文档的结构（如段落、标题、列表等）。

转换后的 HTML 元素会带有一些内联样式或类（例如 `<p style="font-size: 16px;">`），但为了获得更精确的视觉效果，你通常需要自己编写 CSS 样式表来美化渲染后的 HTML。你可以利用 Mammoth 生成的类名（如果提供了的话，或者通过 styleMap 自定义类名），或者使用全局样式来定位元素。

🌐 远程文件加载
如果你的 .docx 文件存储在远程服务器上，你可以使用 XMLHttpRequest 或 fetch API 来获取文件并将其转换为 ArrayBuffer，然后再使用 Mammoth 进行转换。

下面是一个使用 fetch 的示例：

```javascript

const loadAndConvertRemoteFile = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
    convertedHtml.value = result.value;
    // 处理任何消息 (result.messages)
  } catch (error) {
    console.error('加载或转换远程文件失败:', error);
  }
};
```
注意事项与局限性
格式支持：Mammoth 主要支持 .docx 格式。对于旧的 .doc 格式，它无法处理。

样式还原：Mammoth 会忽略许多复杂的排版样式（如居中、首行缩进等），专注于语义化结构。对于样式要求极高的场景，转换结果可能需要较多的 CSS 调整。

浏览器兼容性：确保你的目标浏览器支持 FileReader API 和 Promise（或使用 polyfill）。

安全性：使用 v-html 指令会动态渲染原始 HTML，这可能存在 XSS 攻击风险。请确保你转换的 Word 文档来源是可信的。如果内容来自用户上传，务必要对转换后的 HTML 进行 sanitize（消毒）处理（可以使用像 DOMPurify 这样的库）。

复杂内容：非常复杂的表格、特定字体或高级 Word 功能可能无法完美转换。

Mammoth.js 的优点与缺点
方面	优点	缺点
易用性	API 简洁，上手快速，几行代码即可实现核心功能	对复杂样式和格式的支持有限
功能性	能很好地处理段落、标题、列表、图片、链接等基本元素	不支持旧的 .doc 格式
集成度	纯前端库，无需后端介入即可完成转换	转换大量或复杂的文档时可能会影响前端性能，需要考虑使用 Web Worker 优化
样式控制	提供了一定的选项（如 styleMap）来自定义转换结果	默认样式还原度不高，需要额外编写 CSS 进行美化
安全性	转换过程在浏览器端完成，文件内容不会上传到外部服务器（除非你自己处理）	使用 v-html 渲染原始 HTML 需注意 XSS 风险

 进阶应用场景
结合 Mammoth.js 和 Vue3，你可以实现一些更高级的功能：

文档预览系统：构建一个支持上传和预览 Word 文档的系统。

内容提取与分析：从 Word 文档中提取文本内容进行分析或索引。

模板与内容结合：让用户上传一个包含特定占位符的 Word 模板，然后在网站上动态填充内容并预览或下载（这通常需要结合其他库，如 docxtemplater）。

添加水印：在转换后的 HTML 内容上叠加水印后再预览。

总结
Mammoth.js 是一个强大且易用的工具，它能帮助你在 Vue3 应用中轻松实现 .docx 文档到 HTML 的转换，从而满足在线预览的需求。

它的优势在于纯前端处理、API 简洁以及能很好地处理文档结构。但需要注意的是，它不追求 100% 的视觉样式还原，并且仅支持 .docx 格式。

对于大多数需要在线预览 Word 内容且对样式要求不是极端严格的场景，Mammoth.js 是一个非常值得考虑的解决方案。如果遇到性能瓶颈，可以考虑使用 Web Worker 将转换任务放在后台线程执行，避免阻塞 UI。

3、@vue-office/docx
在 Vue 3 项目中使用 vue-office/docx 来预览 .docx 格式的 Word 文档是一个相对直接的过程。下面我将为你梳理其使用方法和一些关键点。

 Vue 3 中使用 vue-office/docx 实现 DOCX 预览
vue-office/docx 是一个专为 Vue 2 和 Vue 3 设计的文档预览组件，它能高效地在线渲染 Word 文档（.docx 格式），并最大程度地保留原文档的样式和布局。对于需要文档管理功能的应用来说，这是一个非常有用的工具。

1. 安装与引入
首先，你需要在项目中安装 @vue-office/docx 及其伴侣库 vue-demi。

> npm install @vue-office/docx vue-demi
如果你的项目基于 Vue 2.6 或更低版本，还需要安装 @vue/composition-api：

> npm install @vue/composition-api

接下来，在你的 Vue 组件中引入并使用它：

```vue
<template>
  <vue-office-docx :src="docxUrl" @rendered="renderedHandler" @error="errorHandler" />
</template>

<script>
import { defineComponent, ref } from 'vue'
// 引入组件及其样式
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
export default defineComponent({
  components: {
    VueOfficeDocx
  },
  setup() {
    // 假设这是你的文档地址
    const docxUrl = ref('https://example.com/your-document.docx')

    // 渲染成功回调
    const renderedHandler = () => {
      console.log('文档渲染完成')
    }

    // 渲染失败回调
    const errorHandler = (error) => {
      console.error('渲染失败', error)
    }

    return {
      docxUrl,
      renderedHandler,
      errorHandler
    }
  }
})
</script>

<style>
/* 你可以根据需要覆盖默认样式，或设置容器高度 */
.vue-office-docx-container {
  height: 80vh;
}
</style>
```
1. 支持多种文档源类型
vue-office/docx 的一个优点是它支持多种形式的文档源，方便不同场景的使用。

2.1 网络 URL
直接传递一个公开可访问的文档 URL 即可。

```js
const docxUrl = ref('http://static.shanhuxueyuan.com/test6.docx')
```
2.2 用户上传的文件 (ArrayBuffer/Blob)
如果用户通过 `<input type="file">` 上传文件，你可以读取文件的 ArrayBuffer 或 Blob 并传递给组件。

```vue

<template>
  <div>
    <input type="file" @change="onFileChange" accept=".docx" />
    <vue-office-docx :src="fileBuffer" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

export default defineComponent({
  components: { VueOfficeDocx },
  setup() {
    const fileBuffer = ref(null)

    const onFileChange = (event) => {
      const file = event.target.files[0]
      if (!file) return

      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        fileBuffer.value = e.target.result // 将 ArrayBuffer 赋值给 src
      }
    }

    return {
      onFileChange,
      fileBuffer
    }
  }
})
</script>
```
2.3 通过 API 获取的二进制流
当从后端接口获取文件流时，通常可以将其转换为 ArrayBuffer 或 Blob。

```js

// 以使用 fetch 为例
fetch('你的API地址', {
  method: 'POST',
  // ... 其他请求参数
})
.then(response => response.arrayBuffer()) // 或 response.blob()
.then(buffer => {
  docxUrl.value = buffer // 将获取到的数据赋值给 src
})
```
下表总结了不同文档源类型的处理方法：

文档源类型	描述	使用场景	注意事项
网络 URL	直接提供.docx 文件的远程地址	文档已经存储在服务器或 CDN 上，有固定的可访问链接	需确保网络地址是跨域可访问的 (CORS)
ArrayBuffer	将文件内容读取为 ArrayBuffer 对象	处理用户通过 `<input type="file">` 上传的本地文件	通常通过 FileReader.readAsArrayBuffer() 获取
Blob	将文件内容读取为 Blob 对象	处理用户上传的本地文件或从 API 获取的二进制流	可通过 fetch().then(response => response.blob()) 或 new Blob() 创建
二进制流	通过 API 请求获取的文件流	从后端接口动态获取文件内容	通常需要将响应类型设置为 'blob' 或 'arraybuffer'，然后转换为组件可接受的格式
3. 事件与回调
组件提供了两个有用的事件，让你可以更好地控制交互和状态管理。

@rendered: 当文档成功渲染完成后触发。可以在此事件中关闭加载状态提示。

```js

const renderedHandler = () => {
  console.log('文档渲染完成')
  // 例如：隐藏加载指示器
  isLoading.value = false
}
```
@error: 当文档渲染失败时触发。可以用它来提示用户。

```js

const errorHandler = (error) => {
  console.error('渲染失败', error)
  // 例如：显示一个错误提示消息
  showError.value = true
}
```
4. 样式与自定义
默认样式：务必引入组件自带的样式文件 `import '@vue-office/docx/lib/index.css'`，否则文档显示可能不正常。

自定义容器样式：你可以通过外层样式控制预览区域的高度、边框等。

```vue
<vue-office-docx :src="docxUrl" style="height: 80vh; border: 1px solid #eee;" />
```
深度选择器修改内部样式：如果需要覆盖组件内部的默认样式（例如去除背景色、阴影等），在 Vue 3 的 `<style scoped>` 中使用 :deep()。

```vue
<style scoped>
/* 修改容器背景色 */
:deep(.docx-wrapper) {
  background-color: #fff !important;
  padding: 1rem;
}
/* 修改文档区域的盒阴影 */
:deep(.docx-wrapper > section.docx) {
  box-shadow: none !important;
  width: 100% !important;
}
</style>
```
5. 注意事项
仅支持 .docx 格式：此组件专门处理 .docx (Office Open XML) 格式。它不支持旧的 .doc (Binary File Format) 格式或其他文字处理格式。

Vue 2 兼容性：虽然你在 Vue 3 中使用，但如果未来需要在 Vue 2 项目中安装，对于 Vue 2.6 及以下版本，务必安装 @vue/composition-api。

样式覆盖：深度覆盖组件内部样式时，有时需要加上 !important 才能覆盖内联样式。

性能考虑：非常大的文档可能会影响渲染性能和用户体验。对于超大文档，最好由后端先进行转换或分页。

总结
vue-office/docx 为在 Vue 3 应用中预览 Word 文档提供了一个功能强大且开箱即用的解决方案。它的配置相对简单，支持多种文档来源，并能较好地保持原文档的格式。

vue-demi 是一个旨在简化 Vue 2 和 Vue 3 兼容性问题的开发工具库。它让开发者能用一套代码同时支持 Vue 2 和 Vue 3，特别适合开发通用的 Vue 库、组件或插件。

下面是一个表格，帮你快速了解 vue-demi 的核心功能和好处：

功能与特点	说明	带来的好处
通用代码	允许编写一套代码同时支持 Vue 2 和 Vue 3。	减少为不同 Vue 版本维护两套代码的工作量和成本。
自动版本适配	通过 postinstall 钩子检测项目 Vue 版本，并切换相应的 API。	开发者无需手动处理版本差异，vue-demi 自动指向正确的 API (Vue 3 或 Vue 2 + @vue/composition-api)。
兼容 Composition API	在 Vue 2.6 及更低版本中，会自动集成 @vue/composition-api。	允许在 Vue 2 项目中使用 Vue 3 风格的组合式 API，提升开发体验和代码可维护性。
额外的工具函数	提供如 isVue2、isVue3、Vue2 (用于访问 Vue 2 的全局 API) 等。	方便在代码中进行版本判断或执行特定版本的操作。
轻量级	对项目性能影响极小。	几乎不会增加库的体积和运行时的负担。
 工作原理简要说明

vue-demi 在库安装后（通过 postinstall 钩子），会自动检测项目中安装的 Vue 版本：

如果检测到 Vue 3，它会直接使用 Vue 3 的 API。

如果检测到 Vue 2，它会调整其导出，并确保 @vue/composition-api（如果需要）被正确设置，以模拟 Vue 3 的 Composition API 环境。

这意味着，当你从 vue-demi 导入 API（如 ref, reactive, defineComponent）时，你实际上得到的是当前项目 Vue 版本所对应的正确实现。

 主要应用场景

vue-demi 主要用于以下场景：

开发通用组件库或插件：这是 vue-demi 最主要的用途。如果你想发布的组件库或插件希望能被 Vue 2 和 Vue 3 项目同时使用，vue-demi 几乎是标配。

项目渐进式迁移：如果你的大型项目正在从 Vue 2 向 Vue 3 迁移，在迁移过渡期，使用基于 vue-demi 的库可以保证依赖的稳定性。

在 Vue 2 中体验 Composition API：即使项目暂时不升级 Vue 3，也可以通过 vue-demi 和 @vue/composition-api 在 Vue 2 项目中提前学习和运用 Composition API 的优势。

 基本用法示例

安装与配置
在你的库项目中安装 vue-demi 并正确配置 peerDependencies：

> npm install vue-demi
```json

// package.json
{
  "peerDependencies": {
    "@vue/composition-api": "^1.0.0-rc.1", // 对 Vue 2.6 及以下版本很重要
    "vue": "^2.0.0 || >=3.0.0"
  },
  "peerDependenciesMeta": {
    "@vue/composition-api": {
      "optional": true // 因为 Vue 2.7 和 Vue 3 并不需要它
    }
  }
}
```
在代码中使用
从 vue-demi 导入 API 而不是直接来自 vue：

```javascript

// 从 vue-demi 导入所需的 API
import { ref, reactive, defineComponent, isVue2 } from 'vue-demi'

// 定义一个组件，它可以在 Vue 2 和 Vue 3 中工作
export default defineComponent({
  setup() {
    const count = ref(0)
    const state = reactive({ message: 'Hello from vue-demi!' })

    // 如果需要，可以根据版本进行特定逻辑分支
    if (isVue2) {
      console.log('This is running in Vue 2')
    } else {
      console.log('This is running in Vue 3')
    }

    return {
      count,
      state
    }
  }
})
```
💡 注意事项

主要面向库开发者：vue-demi 的设计初衷主要是为了帮助开发可供他人使用的 Vue 库、组件或插件的开发者。普通业务项目如果不需要同时支持 Vue 2 和 Vue 3，通常不需要直接使用 vue-demi。

处理 Vue 2.7：Vue 2.7 版本已经内置了 Composition API，因此不需要额外安装 @vue/composition-api。vue-demi 能够很好地处理这种情况。

版本切换：有时如果自动检测失败，可能需要手动切换版本。vue-demi 提供了命令工具：


> npx vue-demi-switch 2  # 切换到 Vue 2 版本
> npx vue-demi-switch 3  # 切换到 Vue 3 版本
构建配置：如果使用 Vite，需要在 vite.config.js 中将 vue-demi 排除在预构建依赖之外：

```javascript

export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi']
  }
})
```
```
总之，vue-demi 是一个旨在帮助开发者用一套代码编写同时支持 Vue 2 和 Vue 3 的通用 Vue 库的工具箱，它通过自动处理版本差异和 API 兼容性问题，让开发者能更专注于逻辑本身，从而提高开发效率，降低维护成本。

在 Vue 3 项目中安装 @vue-office/docx 时，通常也需要安装 vue-demi。这是因为 vue-demi 是 vue-office 系列组件正常工作的重要桥梁。

下面是一个表格，帮你快速了解它们之间的关系以及安装注意事项：

项目	是否必须安装	说明	安装命令
@vue-office/docx	是	这是实现 DOCX 预览功能的核心组件库。	npm install @vue-office/docx
vue-demi	是	一个智能的兼容层库，能让 @vue-office/docx 等库同时支持 Vue 2 和 Vue 3。在绝大多数情况下必须安装。	npm install vue-demi
@vue/composition-api	否	仅当你的项目是 Vue 2.6 或更低版本 时才需要安装。对于 Vue 3 项目或 Vue 2.7+（已内置 Composition API）则不需要。	npm install @vue/composition-api
🧠 为什么需要 vue-demi？

vue-demi 的设计目的就是为了让像 @vue-office/docx 这样的库用一套代码同时支持 Vue 2 和 Vue 3。它就像一个“翻译”或“适配器”，会根据你项目中实际使用的 Vue 版本，自动切换到对应的 API 实现。

当你使用 @vue-office/docx 时，它内部的功能（如组件的渲染、响应式数据等）实际上是通过 vue-demi 来调用 Vue 的相关 API。这样，库的作者只需要维护一套代码，就能覆盖两个主要的 Vue 版本，大大提高了效率和维护性。

📦 正确的安装方法

在你的 Vue 3 项目中，你应该同时安装 @vue-office/docx 和 vue-demi：

> npm install @vue-office/docx vue-demi
💡 关于 @vue/composition-api

对于 Vue 3 项目：不需要安装 @vue/composition-api。因为 Vue 3 已经原生内置了 Composition API。

对于 Vue 2 项目：

如果你的项目是 Vue 2.7 或更高版本，它也内置了 Composition API，因此不需要再安装 @vue/composition-api。

如果你的项目是 Vue 2.6 或更低版本，为了使用基于 Composition API 开发的库，你就必须额外安装 @vue/composition-api，并在项目的入口文件（如 main.js）中显式启用它：
```

> `npm install @vue/composition-api`
```javascript

// 在 main.js 中
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```
 版本指定（一般情况可不指定）

在绝大多数情况下，直接安装最新版本的 vue-demi 即可。搜索结果中有提到安装 vue-demi@0.14.6，这可能是当时文档提及的版本。正常情况下，使用 npm install vue-demi 会自动安装最新稳定版，并与 @vue-office/docx 保持兼容。如果后续遇到奇怪的兼容性问题，可以尝试指定这个版本。

 总结一下

记住以下几点：

安装 @vue-office/docx 时，别忘了同时安装 vue-demi。

如果你是 Vue 3 项目，不需要关心 @vue/composition-api。

确保你的 vue-demi 版本与 @vue-office/docx 兼容，通常安装最新版即可。

npm install @vue-office/docx vue-demi 这个命令中的 @ 符号是 npm 的“作用域”（scoped）包的标识符。

你可以把它理解为：@ 符号后面的名字是一个“家族”或者“组织”的名字，而 @ 符号后面的斜杠 / 后面的名字是这个家族下的具体“成员”。

所以，@vue-office/docx 的意思是：安装在 @vue-office 这个组织（或命名空间）下的、名为 docx 的包。

详解与类比
为了更好地理解，我们可以用一个表格来对比：

包名格式	含义	类比（以公司产品为例）
vue-demi	一个普通的、无作用域的公共包。	就像“可口可乐” - 一个独立的产品名。
@vue-office/docx	一个属于 @vue-office 组织的作用域包。	就像“微软 (@microsoft) 的 Windows (/windows)” - @microsoft/windows。
@angular/core	一个属于 @angular 组织的作用域包。	就像“谷歌 (@google) 的 Angular (/angular)” - @google/angular。
为什么需要作用域（Scopes）？
npm 引入作用域主要为了解决以下几个问题：

避免命名冲突：这是最主要的原因。在早期的 npm 中，包名是全局唯一的。如果有一个很常见的名字（比如 utils, api, docx）被某人注册了，其他人就无法再使用这个名称。有了作用域后，不同的组织或个人可以拥有相同名称的包。例如：

@my-company/docx （我公司内部的 DOCX 处理工具）

@vue-office/docx （vue-office 的 DOCX 预览组件）

@another-lib/docx （另一个库的 DOCX 操作工具）
它们可以和平共处，互不冲突。

增强关联性：作用域可以将一系列相关的包组织在一起，让使用者一眼就能看出它们属于同一个项目或组织。例如，Vue 生态系统中有：

@vue/compiler-sfc

@vue/runtime-core

@vue/cli
它们都属于 @vue 这个官方组织。

权限管理：在私有 npm 仓库（如公司的私有库）中，作用域可以很方便地为整个团队设置包的访问和发布权限。例如，可以规定只有 @my-company 这个作用域下的成员才有权限发布或更新 @my-company 下的包。

总结一下
@ 符号：表示这是一个作用域包。

@vue-office：这是作用域的名称（通常是一个组织、公司或用户名）。

/docx：这是该作用域下的具体包名。

所以，整个命令 npm install @vue-office/docx vue-demi 的意思就是：
同时安装一个无作用域的公共包 vue-demi 和一个属于 @vue-office 组织的作用域包 docx。

三、实例代码
```vue
<!-- QualityFile.vue -->

<script setup lang="ts" name="QualityFile">
......
// 提取
const onParseClick = async (fileNo: string) => {
  // 前端解析文件，使用第三方库 mammoth，提取文件的内容并且转换为html字符串，只支持 docx 文件格式，存在 XSS 风险，使用 DOMPurify.sanitize 进行安全净化过滤
  if (fileNo.length === 1) {
    try {
      // 使用 get 请求，不使用 encodeURIComponent 对文件编号进行编码处理
      const result = await qualityFileDownloadFileService(fileNo);
      // 使用 mammoth.convertToHtml 将获取响应消息体的内容（二进制数据流）转换为html字符串
      const htmlContent = await mammoth.convertToHtml({ arrayBuffer: result.data });
      // 使用 DOMPurify.sanitize 进行安全净化过滤，防止XSS攻击
      const safeHtmlContent = DOMPurify.sanitize(htmlContent.value);
      store.currentParseFileText = safeHtmlContent;
      store.parseFileTextShowMode = "html";
    } catch (error) {
      console.error("文件提取失败:" + error);
      ElMessage.error("文件提取失败，只支持docx格式文件");
      return;
    }
  }
  // 后端解析文件，使用第三方库 Apache Tika，提取文件的文本内容，支持各种编辑文件格式: docx, doc, xlsx, xls, pptx, ppt, pdf, txt, xml, html, md
  else {
    const result = await qualityFileParseService(fileNo);
    store.currentParseFileText = result.data;
    store.parseFileTextShowMode = "text";
  }
 
  // 显示质量体系文件文本提取内容模态框
  showContentDialogRef.value?.showDialog();
};
 
// 预览
const onPreviewClick = async (fileNo: string) => {
  // 使用 get 请求，不使用 encodeURIComponent 对文件编号进行编码处理
  const result = await qualityFileDownloadFileService(fileNo);
  // 获取响应消息体的内容（二进制数据流）
  store.currentPreviewDocxFile = result.data;
 
  // await nextTick();
 
  // 使用 @vue-office/docx 预览docx文件，文档里有分页符才显示分页，无法复刻WPS的分页效果，顶部、中间和底部的分隔行高度不一致（顶部的分隔行高度高一些，中间和底部的分隔行高度一致）
  // 测试发现，预览《操作流程-物资管理.docx》，多显示一个空白页
  if (fileNo.length === 1) {
    previewDocxFileShowMode.value = "@vue-office/docx";
    await nextTick();
    vueOfficeDocxDialogRef.value?.showDialog();
  }
  // 使用 docx-preview 预览docx文件，文档里有分页符才显示分页，无法复刻WPS的分页效果，顶部、中间和底部的分隔行高度一致
  // 测试发现，预览《操作流程-物资管理.docx》，显示正常
  else {
    previewDocxFileShowMode.value = "docx-preview";
    await nextTick();
    docxPreviewDialogRef.value?.showDialog();
  }
};
......
</script>
 
<template>
......
    <!-- 显示质量体系文件文本提取内容模态框 -->
    <BaseShowContentDialog
      ref="showContentDialogRef"
      title="提取的文本内容"
      :content="store.currentParseFileText"
      :show-mode="store.parseFileTextShowMode" />
 
    <!-- docx文件预览模态框 -->
    <BaseVueOfficeDocxDialog
      v-if="previewDocxFileShowMode === `@vue-office/docx`"
      ref="vueOfficeDocxDialogRef"
      title="docx文件预览"
      :file="store.currentPreviewDocxFile" />
    <BaseDocxPreviewDialog
      v-else-if="previewDocxFileShowMode === `docx-preview`"
      ref="docxPreviewDialogRef"
      title="docx文件预览"
      :file="store.currentPreviewDocxFile" />
......
</template>
```

```TypeScript
<!-- BaseShowContentDialog.vue -->

<script setup lang="ts" name="BaseShowContentDialog">
/**
 * 显示内容模态框组件
 */
defineOptions({ name: "BaseShowContentDialog" });
import { nextTick, ref } from "vue";
 
interface Props {
  /** 标题 */
  title?: string;
  /** 内容 */
  content?: string;
  /** 显示模式  */
  showMode?: "text" | "html";
}
const props = withDefaults(defineProps<Props>(), { title: "", content: "", showMode: "text" });
// 对话框显示标识
const dialogVisible = ref(false);
 
// 显示对话框
const showDialog = async () => {
  dialogVisible.value = true;
 
  // 滚动条回到顶部，通过开发者工具追查到滚动条对应的组件元素是 el-input，以应的原始元素是 textarea，其子类 class="el-textarea__inner"
  // 等待 DOM 渲染完毕
  await nextTick();
  // 指定元素（.content .el-textarea__inner，其中 .content 是指定的父类类名，.el-textarea__inner 是子类类名）的滚动条滚动到顶部
  (document.querySelector(".content .el-textarea__inner") as HTMLElement)?.scrollTo(0, 0);
};
 
// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
};
 
defineExpose({ showDialog });
</script>
 
<template>
  <div>
    <el-dialog
      :title="props.title"
      :width="props.showMode === `text` ? `850px` : `auto`"
      top="0vh"
      style="border-radius: 10px"
      center
      v-model="dialogVisible"
      :close-on-press-escape="true"
      :close-on-click-modal="false"
      :show-close="false"
      draggable
      @closed="closeDialog">
      <template #>
        <el-input
          v-if="props.showMode === `text`"
          class="content"
          type="textarea"
          v-model="props.content"
          rows="26"
          readonly />
        <!-- <div v-else class="preview-container">{{ props.content }}</div> -->
        <!-- <div v-else class="preview-container" v-text="props.content"></div> -->
        <div v-else class="preview-container" v-html="props.content"></div>
      </template>
      <template #footer>
        <div>
          <el-button type="primary" @click="closeDialog">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
 
<style scoped lang="scss">
.content {
  // white-space: pre-wrap的作用是保留空格，并且除了碰到源码中的换行和会换行外，还会自适应容器的边界进行换行。
  white-space: pre-wrap;
}
 
.preview-container {
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>
```

```TypeScript

// BaseDocxPreviewDialog.vue

<script setup lang="ts" name="BaseDocxPreviewDialog">
/**
 * docx文件预览模态框组件
 */
defineOptions({ name: "BaseDocxPreviewDialog" });
import { renderAsync } from "docx-preview";
import { nextTick, ref, watchEffect } from "vue";
 
interface Props {
  /** 标题 */
  title?: string;
  /** 文件 */
  file?: File | null;
}
const props = withDefaults(defineProps<Props>(), { title: "", file: null });
// 对话框显示标识
const dialogVisible = ref(false);
// 预览容器实例
const previewContainerRef = ref<HTMLElement | null>(null);
 
// 显示对话框
const showDialog = async () => {
  dialogVisible.value = true;
};
 
// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
};
 
// 自动监听数据变化，并且自动渲染文档
watchEffect(async () => {
  if (previewContainerRef.value) {
    try {
      // 调用 renderAsync 方法渲染文档到预览容器
      await renderAsync(props.file, previewContainerRef.value);
    } catch (error) {
      // 预览容器显示文件渲染失败的信息
      previewContainerRef.value.innerHTML = "文件渲染失败，只支持docx格式文件";
      // 更改预览容器样式属性内容
      previewContainerRef.value.style.textAlign = "center";
      previewContainerRef.value.style.color = "red";
      // 这里更改预览容器的字体大小后，会影响预览文件的字体，故暂时不更改字体大小，统一采用默认的字体大小
      // previewContainerRef.value.style.fontSize = "80px";
    }
  }
});
 
defineExpose({ showDialog });
</script>
 
<template>
  <div>
    <el-dialog
      :title="props.title"
      width="850px"
      top="0vh"
      style="border-radius: 10px"
      center
      v-model="dialogVisible"
      :close-on-press-escape="true"
      :close-on-click-modal="false"
      :show-close="false"
      draggable
      @closed="closeDialog">
      <template #>
        <div class="preview-container" ref="previewContainerRef"></div>
      </template>
      <template #footer>
        <div>
          <el-button type="primary" @click="closeDialog">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
 
<style scoped lang="scss">
.preview-container {
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>
```

```TypeScript
// BaseVueOfficeDocxDialog.vue

<script setup lang="ts" name="BaseVueOfficeDocxDialog">
/**
 * docx文件预览模态框组件，基于第三方组件 <vue-office-docx />
 */
defineOptions({ name: "BaseVueOfficeDocxDialog" });
import VueOfficeDocx from "@vue-office/docx";
import "@vue-office/docx/lib/index.css";
import { ref } from "vue";
 
interface Props {
  /** 标题 */
  title?: string;
  /** 文件 */
  file?: File | null;
}
const props = withDefaults(defineProps<Props>(), { title: "", file: null });
// 对话框显示标识
const dialogVisible = ref(false);
// 渲染是否成功
const isRenderedSuccess = ref(true);
 
// 显示对话框
const showDialog = () => {
  dialogVisible.value = true;
};
 
// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
};
 
// 渲染成功回调
const renderedHandler = () => {
  isRenderedSuccess.value = true;
};
 
// 渲染失败回调
const errorHandler = (error: string) => {
  isRenderedSuccess.value = false;
  console.error("文件渲染失败，只支持docx格式文件", error);
};
 
defineExpose({ showDialog });
</script>
 
<template>
  <div>
    <el-dialog
      :title="props.title"
      width="850px"
      top="0vh"
      style="border-radius: 10px"
      center
      v-model="dialogVisible"
      :close-on-press-escape="true"
      :close-on-click-modal="false"
      :show-close="false"
      draggable
      @closed="closeDialog">
      <template #>
        <!-- 第三方组件 -->
        <vue-office-docx
          v-show="isRenderedSuccess"
          :src="props.file"
          @rendered="renderedHandler"
          @error="errorHandler" />
        <div v-if="!isRenderedSuccess" class="preview-container" ref="previewContainerRef">
          文件渲染失败，只支持docx格式文件
        </div>
      </template>
      <template #footer>
        <div>
          <el-button type="primary" @click="closeDialog">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
 
<style scoped lang="scss">
.preview-container {
  text-align: center;
  color: red;
  font-size: 20px;
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>
```

四、应用效果
1、前端解析文件，使用第三方库 mammoth，提取文件的内容并且转换为html字符串，只支持 docx 文件格式，存在 XSS 风险，使用 DOMPurify.sanitize 进行安全净化过滤



2、后端解析文件，使用第三方库 Apache Tika，提取文件的文本内容，支持各种编辑文件格式: docx, doc, xlsx, xls, pptx, ppt, pdf, txt, xml, html, md



3、使用 @vue-office/docx 预览docx文件，文档里有分页符才显示分页，无法复刻WPS的分页效果，顶部、中间和底部的分隔行高度不一致（顶部的分隔行高度高一些，中间和底部的分隔行高度一致），测试发现，预览《操作流程-物资管理.docx》，多显示一个空白页



4、使用 docx-preview 预览docx文件，文档里有分页符才显示分页，无法复刻WPS的分页效果，顶部、中间和底部的分隔行高度一致，测试发现，预览《操作流程-物资管理.docx》，显示正常



```ts
const doc = new jsPDF();
        doc.addFileToVFS("bolds", addFontBase64());
        doc.addFont("bolds", "SourceHanSans", "normal");
        doc.setFont("SourceHanSans"); // 设置字体
        doc.setFontSize(16);
        doc.text("智能纪要", 20, 20);
        doc.setFontSize(12);
        doc.text(displayText.value, 20, 40);
        const filename = `${realRivalName || "报告"}_智能纪要.pdf`;
        doc.save(filename);
```