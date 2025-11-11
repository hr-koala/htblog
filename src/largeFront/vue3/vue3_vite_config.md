<!--
 * @Date: 2025-10-21 16:15:53
 * @LastEditTime: 2025-11-11 17:25:53
 * @Description: 
-->
#
`vite.config.mts`

```ts
import { loadEnv } from 'vite';
export const getBase = () => {
  // Node.js中__dirname和process.cwd()两个全局变量在获取文件系统路径时的不同，__dirname基于当前模块目录，process.cwd()则对应整个应用的工作目录，适合根据不同场景选用。
  const root = process.cwd();
  const mode = process.env.NODE_ENV;
  const env = loadEnv(mode, root);
  const re = env.VITE_PUBLIC_PATH;
  return re;
};
export const baseConfig = {
  getProps: () => {
    return {
      // "base" option should end with a slash.
      // 会被环境变量process.env.VITE_PUBLIC_PATH重写，具体配置请前往环境变量文件
      base: getBase(),
    };
  },
};
// 动态配置，返回函数
export default baseConfig;
```
```ts
import { loadEnv } from 'vite';
import { baseConfig } from './base-config';
export const getOutDir = (base) => {
  let re = 'dist';
  re = (re + '/' + base).replace('//', '/');
  return re;
};
export const getConfigPath = () => {
  const root = process.cwd();
  const mode = process.env.NODE_ENV;
  const env = loadEnv(mode, root);
  const re = env.VITE_PUBLIC_CONFIG_PATH;
  return re;
};
export const buildConfig = {
  getProps: () => {
    return {
      // 输出目录
      outDir: getOutDir(baseConfig.getProps().base),
      // 配置目录
      configPath: getConfigPath(),
    };
  },
};

export default buildConfig;
```