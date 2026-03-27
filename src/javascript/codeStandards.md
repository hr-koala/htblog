---
title: '前端代码规范详细配置'
---

## 基础工程配置

代码提交检查通过 `Husky`（触发 Git 钩子）+ `lint-staged`（仅检查待提交代码）+ `Commitlint`（规范提交信息格式）。
代码规范聚焦统一代码风格与质量，通常通过 `ESLint`（检查 JavaScript 语法错误、代码风格）、`Prettier`（自动格式化代码，统一缩进、换行等格式）、`Stylelint`（规范 CSS/SCSS 样式）工具实现，搭配团队定制规则（如禁用未声明变量、统一组件命名格式），避免因风格差异导致的协作混乱。

1. 项目结构规范
project/
├── src/
│   ├── assets/         # 静态资源
│   ├── components/     # 通用组件
│   ├── layouts/        # 布局组件
│   ├── router/         # 路由配置
│   ├── store/          # 状态管理
│   ├── styles/         # 全局样式
│   ├── utils/          # 工具函数
│   └── views/          # 页面组件
├── .editorconfig       # 编辑器统一配置
├── .eslintrc.js        # ESLint 配置
├── .prettierrc         # Prettier 配置
├── .stylelintrc.js     # Stylelint 配置
└── .commitlintrc.js    # Git 提交规范

JavaScript/TypeScript 规范
1. ESLint  配置 (.eslintrc.js)
```js
module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended', // Vue项目添加
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // 核心规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-depth': ['error', 4], // 最大嵌套层级
    
    // TypeScript 规则
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    
    // Vue 专用规则
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': ['error', {
      html: { void: 'always' }
    }]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-lines-per-function': 'off'
      }
    }
  ]
};
```
2. Prettier 配置 (.prettierrc)
```js
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "consistent",
  "trailingComma": "none",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "vueIndentScriptAndStyle": true,
  "htmlWhitespaceSensitivity": "ignore"
}
```
三、***CSS/SCSS 规范***
1. Stylelint 配置 (.stylelintrc.js)
```js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$', // 短横线命名
    'order/properties-order': [
      'position',
      'top',
      'display',
      'flex-direction', // 按逻辑分组排序
      'width',
      'height',
      'margin',
      'padding',
      'color',
      'background'
    ],
    'max-nesting-depth': 3, // 最大嵌套层级
    'scss/at-import-partial-extension': 'never'
  }
};
```
五、***Git 提交规范***
1. `Commitlint 配置 (.commitlintrc.js)`
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', // 添加新功能
        'fix', // 修复bug
        'docs', // 文档
        'style', // CSS
        'refactor', //  重构代码
        'perf', //  提高性能
        'test', //  测试
        'build', //  构建
        'ci', //  持续集成
        'chore', //  其它修改
        'revert', //  回滚
        'format', //  格式化
        'comment', //  注释
        'log', // 日志
        'version', // 版本
      ]
    ],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
  }
};
```
2. Commitizen 适配器
```bash
# 安装工具
npm install -g commitizen cz-conventional-changelog
# 提交示例
git commit -m "feat(user): add login functionality"
```

六、自动化 工具链
1. Husky + lint-staged 配置
```json
// package.json
{
  "scripts": {
    "prepare": "husky install",
    "lint": "npm run lint:js && npm run lint:style",
    "lint:js": "eslint --ext .js,.vue src",
    "lint:style": "stylelint src/**/*.{css,scss,vue}"
  },
  "lint-staged": {
    "*.{js,vue}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["stylelint --fix", "prettier --write"]
  }
}
```
2. Git Hook 配置
```bash
# 创建 pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# 创建 commit-msg hook
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

***性能优化：***
```js
// 组件懒加载
const UserProfile = () => import('./UserProfile.vue')
// 图片懒加载
<img v-lazy="imageUrl" />
```

***提交检查***
1. 安装：`npm install --save-dev husky @commitlint/config-conventional @commitlint/cli`
2. 启动hooks，生成 `.husky` 文件夹：`npx husky install`
3. 将脚本添加到 `package.json` 的 `scripts` 字段中：`"prepare": "husky"`,
4. 执行：`npm run prepare`
5. 配置Commitlint：`commitlint.config.js` 或 `commitlint.config.mjs`
6. 在项目.husky目录下手动添加：`commit-msg` 、 `pre-commit` 脚本
```bash
# commit-msg： 校验提交信息是否符合规范
npx --no-install commitlint --edit "$1"
# pre-commit： 提交之前检查和修复代码
# !/bin/sh
npx lint-staged
```

7. 安装 `npm install lint-staged --legacy-peer-deps` 自动修复格式错误，在 `package.json` 中配置
```json
"lint-staged": {
	"*.{js,jsx,ts,tsx,vue,css,less}": ["eslint --fix"]
}
```

***代码规范***
一些工具包： `npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin@6.21.0 @typescript-eslint/parser@6.21.0 eslint-plugin-react globals --legacy-peer-deps`
配置
```json
// package.json
"scripts": {
	  "lint": "eslint .",
	  "lint:fix": "eslint --fix .",
	  "format": "prettier --config .prettierrc \"./**/*.{js,jsx,ts,tsx}\" --write"
}
```

新建`.prettierrc`脚本，`.prettierignore`
```json
// prettierrc
{
    "semi": true,
    "singleQuote": true,
    "tabWidth": 4,
    "printWidth": 200
}
```

```txt
// prettierignore
.vscode
.husky
node_modules
dist
commitlint.config.mjs
eslint.config.mjs
```

***Eslint规则配置：*** `eslint.comfig.js`
```js
import globals from 'globals';
import jsESlint from '@eslint/js';
import tsESlint from 'typescript-eslint';
import reactESLint from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { ignores: ['node_modules', 'src/.umi', 'src/.umi-production', 'dist', 'public'] },
    { languageOptions: { globals: globals.browser } },
    jsESlint.configs.recommended,
    ...tsESlint.configs.recommended,
    reactESLint.configs.flat.recommended,
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    { rules: { '@typescript-eslint/no-explicit-any': 'off' } },
    eslintConfigPrettier,
    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': ['error'], // 使用 eslint-plugin-prettier 的规则
            'arrow-body-style': 'off',
            'prefer-arrow-callback': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off', // 根据需求可自行配置其他规则
            "@typescript-eslint/no-unused-expressions": 'off',
        },
    },
];
```

***样式格式化***
> Stylelint样式代码质量与规范检查，主要是检查

安装：`npm install --save-dev stylelint stylelint-config-standard stylelint-order`，如有依赖兼容问题，可以忽略`--legacy-peer-deps`或者升级版本
在项目根目录新建 `.stylelintrc`也可以是：
○ .stylelintrc.json
○ .stylelintrc.yaml/.stylelintrc.yml
○ .stylelintrc.js

```json
{
    "extends": [
        "stylelint-config-standard"
    ],
    "plugins": [
        "stylelint-order"
    ],
    "rules": {
        "at-rule-no-unknown": [true, {
            "ignoreAtRules": ["config"]
        }], // 可选，告诉 Stylelint 忽略，它只认标准的@规则：比如@import
        "selector-class-pattern": null, // 允许camelCase：驼峰，只认这种not-found
        "keyframes-name-pattern": null, // keyframes命名规则
        "order/properties-alphabetical-order": true, // 属性必须按字母排序
        "no-descending-specificity": null // 允许层叠选择器更灵活，避免无意义报错
    },
    "ignoreFiles": [
        "**/node_modules/**",
        "**/dist/**"
    ]
}
```
调整package.json中的配置
```json
{
    "scripts": {
        "lint:style": "stylelint '**/*.{css,less,scss}'", // 检查所有样式文件
        "lint:style:fix": "stylelint '**/*.{css,less,scss}' --fix", // 自动修复所有样式文件
    },
    "lint-staged": {
        "*.{js,jsx,ts,tsx,vue}": [
            "eslint --fix"
        ],
        "*.{css,less,scss}": [
            "stylelint --fix"
        ],
        "*.{json,cjs,md,yml,yaml}": [
            "prettier --write"
        ]
    }
}
```
