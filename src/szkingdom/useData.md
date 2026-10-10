---
title: 'useData'
---


```ts
// 提取树形结构中所有非叶子节点的 nodekey 值（即除去最后一级的节点）
export function getNonLeafNodeKeys(tree, keyField = "treeId") {
  let keys: Array<any> = [];
  tree.forEach((node: any) => {
    // 如果有子节点（children 存在且长度 > 0），则为非叶子节点
    if (node.children && node.children.length > 0) {
      keys.push(node[keyField]); // 收集当前节点 key
      keys = keys.concat(getNonLeafNodeKeys(node.children, keyField)); // 递归子节点
    }
    // 没有子节点（叶子节点）则跳过
  });
  return keys;
}
```
### formatter

```ts
// 每隔两个字符串添加一个sign
export function strInsert(str, sign = ":") {
  if (!str) return "";
  if (sign == ":")
    str =
      str.toString().length > 6 ? str.toString().padStart(9, "0") : str.toString().padStart(6, "0"); // 小时补零
  const reg = new RegExp("\\w{1," + 2 + "}", "g");
  return str.toString().length > 6
    ? `${str.toString().substring(0, 6).match(reg).join(sign)}.${str.toString().substring(6)}`
    : str.toString().match(reg).join(sign);
}

// 秒数转化为时分秒
export function secondsToHms(sec) {
  const hours = Math.floor(sec / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((sec % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (sec % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// 秒数转化为时分秒
export function secondsToHmsCh(sec) {
  const days = Math.floor(sec / 3600 / 24);
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  return `${days > 1 ? days + "天" : ""}${hours ? hours + "时" : ""}${
    minutes ? minutes + "分" : ""
  }${seconds + "秒"}`;
}
```

### number

```ts
/**
 * 将数字格式化为带有千分位分隔符的字符串。
 * @param x 待格式化的数字。
 * @returns 格式化后的字符串。小数点前的数字按千分位分隔，小数点后不变。
 */
export function toThousandth(number) {
  if (isNaN(parseFloat(number))) return "--";
  // 将数字转换为字符串并按小数点分割为两部分
  const parts = number.toString().split(".");
  // 在小数点前的每三个数字之间插入逗号作为千分位分隔符
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 将分割后的两部分重新组合为一个字符串
  return parts.join(".");
}

/**
 * 将给定值转换为带指定小数位和单位的数字。
 * @param val 需要转换的值。如果值为falsey值（如null、undefined、0、""、false、NaN），则返回0。
 * @param decimal 小数点后的位数，默认为2。
 * @param unit 单位值，默认为10000。转换时，会将`val`除以`unit`然后返回结果。
 * @returns 转换后的数字字符串，保留指定的小数位。如果输入值为falsey值，则返回"0"。
 */
export function convertToNum(val, decimal = 3, unit = 10000) {
  if (isNaN(parseFloat(val))) return "--"; // 如果输入值为falsey值，直接返回
  return calc(parseFloat(val)).div(unit).toNumber().toFixed(decimal); // 将输入值按指定单位转换并格式化为带小数点的字符串
}

/**
 * 将给定数字四舍五入到指定的小数位数。
 * @param number 需要四舍五入的数字。
 * @param decimalPlaces 需要保留的小数位数。
 * @returns 四舍五入后的数值。
 */
export function roundToDecimal(number, decimalPlaces = 2) {
  if (isNaN(parseFloat(number))) return "--";
  // 为了四舍五入到指定的小数位，计算出相应的因子
  const factor = Math.pow(10, decimalPlaces);
  // 将原数字乘以因子后四舍五入，再除以因子以还原到原来的小数位
  const value = new Decimal(Math.round(number * factor)).div(new Decimal(factor));
  return value.toFixed(decimalPlaces);
}

// 根据Decimal.js加减乘除计算封装,传参转换后只能是数字类型,且不能超过最大安全整数，否则返回NaN
export function calc(value) {
  if (
    (Number(value) || value == 0) &&
    !isNaN(value) &&
    Math.abs(value) <= Number.MAX_SAFE_INTEGER
  ) {
    const decimal = new Decimal(value);
    return {
      add(num) {
        return decimal.add(new Decimal(num));
      },
      sub(num) {
        return decimal.sub(new Decimal(num));
      },
      mul(num) {
        return decimal.mul(new Decimal(num));
      },
      div(num) {
        return decimal.div(new Decimal(num));
      },
    };
  } else {
    console.log("请输入合理数字！");
    const decimal = new Decimal(NaN);
    return decimal;
  }
}

/**
 * 计算两个数字的百分比。
 *
 * @param numerator   分子
 * @param denominator 分母（默认 1）
 * @param unit        单位符号（默认 "%"）
 * @param keepUnit    是否保留单位符号（默认 true）
 * @returns 百分比字符串 或 纯数字
 */
export function calculatePercent(numerator, denominator = 1, unit = "%", keepUnit = true) {
  if (denominator === 0 || isNaN(numerator) || isNaN(denominator)) {
    return 0;
  }
  const value = calc(parseFloat(numerator)).div(parseFloat(denominator)).mul(100).toNumber();
  return keepUnit ? `${value}${unit}` : value;
}

/**
 * 计算并返回一个数字的绝对值。
 * @param number - 需要计算绝对值的数字。
 * @returns 返回数字的绝对值，如果输入无效则返回'--'。
 */
export function absoluteValue(number: number) {
  if (isNaN(parseFloat(number))) return "--";
  return Math.abs(number);
}
```

```ts
export function flatten(data: Menu[]) {
  const result: Menu[] = [];
  function trans(data: Menu[]) {
    (data || []).forEach((item) => {
      if (item) {
        result.push(item);
        if (item.children && item.children.length > 0) {
          trans(item.children);
        }
      }
    });
  }
  trans(data);
  return result;
}

const authDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    const value = binding.value;
    if (!value) return;
    if (!isAuth(value)) {
      el.parentNode?.removeChild(el);
    }
  },
};
export function setupPermissionDirective(app: App) {
  app.directive("auth", authDirective);
}
```

```ts
import { getCurrentInstance, reactive, onMounted, onActivated } from "vue";
import { deepMerge } from "@szkingdom.koca/template/utils";
import ApiList from "/@/views/url.config";
const {  queryTrdCmd } = ApiList;
/**
 * @description: 根据传进来的key 请求对应接口 返回下拉数据
 * @param {*} keys
 * @param {*} otherParams 基于基础配置格外特殊参数配置
 * @return {*}
 */
export const useData = (keys: Array<string>, otherParams = {}) => {
  const { $http } = getCurrentInstance()?.proxy as any;
  const selections = reactive({
    cmd: {
      labelKey: ['cmdcode',"cmdname"],
      valueKey: "cmdid",
      labelSeparator: "\u00A0\u00A0",
      options: [],
      url: queryTrdCmd,
      queryParams: { },
    },
  });

  const requestData = () => {
    if (!keys?.length) keys = Object.keys(selections);
    const res = keys.map((item) => {
      const { url, queryParams = {} } = deepMerge(selections[item], otherParams[item]);
      return $http.post(url, queryParams);
    });
    Promise.allSettled(res).then((res) => {
      res.forEach((item, index) => {
        selections[keys[index]].options = item.status === "fulfilled" ? item.value.data : [];
      });
    });
  };

  const returnData = computed(() => {
    const obj = {};
    if (!keys?.length) keys = Object.keys(selections);
    for (const key in selections) {
      if (keys.includes(key)) {
        obj[key] = pick(selections[key], ["labelKey", "valueKey", "labelSeparator", "options"]);
      }
    }
    return obj;
  });

  onActivated(() => { requestData(); });

  onMounted(() => { requestData(); });

  return {
    selections: returnData,
  };
};
```

```ts
import Decimal from "decimal.js";
// 校验userCode
export function validateUserCode(_rule, value, callback) {
  if (!value) {
    callback(new Error("用户代码不能为空"));
  } else if (!/^[a-zA-Z0-9_.]+$/.test(value)) {
    callback(new Error("用户代码只允许输入数字、字母、下划线"));
  } else {
    callback();
  }
}

export function validateInt(prop, containZero = false, max = 100000) {
  const reg = containZero ? /^\+?[0-9]\d*$/ : /^\+?[1-9]\d*$/;
  return (_rule, value, callback) => {
    if (value !== 0 && !value) {
      callback();
    } else if (!reg.test(value)) {
      callback(new Error(`${prop}只能输入大于${containZero ? "等于" : ""}0的整数`));
    } else if (Number(value) > max) {
      callback(new Error("数值越界"));
    } else {
      callback();
    }
  };
}

// 校验[0,100)最多保留两位小数
export function validateRate(unit?: string) {
  const reg = /^(\d|[1-9]\d)(\.\d{1,2})*$/;
  return (_rule, value, callback) => {
    let compareValue = value;
    if (unit == "%") compareValue = new Decimal(Number(value)).times(new Decimal(100)).toNumber();
    if (value !== 0 && !value) {
      // “”/null/undefined不校验
      callback();
    } else if (compareValue == 0 || !reg.test(compareValue)) {
      callback(new Error(`只能输入大于0、小于100,最多保留两位小数`));
    } else {
      callback();
    }
  };
}

export function validatePositiveNum(prop) {
  const reg = /^[0-9]+(.[0-9]+)?$/;
  return (_rule, value, callback) => {
    if (value == 0 || !reg.test(value)) {
      callback(new Error(`${prop}只允许输入大于0的数`));
    } else {
      callback();
    }
  };
}

/**
 * 验证数字的格式和范围，支持指定最大值、最小值和小数位数。
 * @param prop 属性名，用于错误信息中对输入字段的引用。
 * @param max 允许的最大值，默认为1000000。
 * @param min 允许的最小值，默认为0。
 * @param dec 小数点后的最大位数，默认为2。
 * @tickSize 最小变动价格
 * @returns 返回一个函数，该函数接收规则、值和回调函数作为参数，用于表单验证。
 */
export function validateNumDec(
  prop,
  incldMin = false,
  min = 0,
  max = 99999999999,
  dec = 3,
  tickSize = 10,
) {
  // 定义不同小数位数时的正则表达式
  const reg = {
    1: /^(\+?[0-9]\d*)(\.\d{0,1})?$/,
    2: /^(\+?[0-9]\d*)(\.\d{0,2})?$/,
    3: /^(\+?[0-9]\d*)(\.\d{0,3})?$/,
    4: /^(\+?[0-9]\d*)(\.\d{0,4})?$/,
    5: /^(\+?[0-9]\d*)(\.\d{0,5})?$/,
    6: /^(\+?[0-9]\d*)(\.\d{0,6})?$/,
  };
  return (_rule, value, callback: Function) => {
    if (typeof value == "object" && value !== null) {
      if (
        parseFloat(value[1]) > max ||
        (incldMin ? parseFloat(value[0]) < min : parseFloat(value[0]) <= min)
      ) {
        callback(new Error(`数值越界${incldMin ? "[" : "("}${min}-${max}]`));
      } else if (!reg[dec].test(value[0]) || !reg[dec].test(value[1])) {
        callback(new Error(`数值不为空,${prop}小数位最多${dec}位`));
      } else if (Number(value[0]) > Number(value[1])) {
        callback(new Error(`小值不能大于大值`));
      } else if (tickSize > 0) {
        const multiple = new Decimal(tickSize).div(new Decimal(10000)).toNumber();
        const roundedValue = new Decimal(
          Math.round(new Decimal(value[0]).div(new Decimal(multiple)).toNumber()),
        )
          .mul(new Decimal(multiple))
          .toNumber();
        const roundedValue2 = new Decimal(
          Math.round(new Decimal(value[1]).div(new Decimal(multiple)).toNumber()),
        )
          .mul(new Decimal(multiple))
          .toNumber();
        if (
          Number(value[0]) !== Number(roundedValue) ||
          Number(value[1]) !== Number(roundedValue2)
        ) {
          callback(new Error(`价格${value}不是最小变动价格${multiple}的整数倍`));
        } else {
          callback();
        }
      } else {
        callback();
      }
    } else {
      // 检查值是否超出范围
      if (
        parseFloat(value) > max ||
        (incldMin ? parseFloat(value) < min : parseFloat(value) <= min)
      ) {
        callback(new Error(`数值越界${incldMin ? "[" : "("}${min}-${max}]`));
      } else if (!reg[dec].test(value)) {
        // 检查值的格式是否符合指定的小数位数
        callback(new Error(`${prop}小数位最多${dec}位`));
      } else if (tickSize > 0) {
        const multiple = new Decimal(tickSize).div(new Decimal(10000)).toNumber();
        const roundedValue = new Decimal(
          Math.round(new Decimal(value).div(new Decimal(multiple)).toNumber()),
        )
          .mul(new Decimal(multiple))
          .toNumber();
        if (Number(value) !== Number(roundedValue)) {
          callback(new Error(`价格${value}不是最小变动价格${multiple}的整数倍`));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
  };
}

// 校验小数位数必须少于指定位数 maxPlaces=0 为校验整数
export function validateDecimalPlaces(number, maxPlaces) {
  if (!number && number != 0) return false;
  const regex = maxPlaces == 0 ? /^\+?[0-9]\d*$/ : new RegExp(`^\\d+(\\.\\d{1,${maxPlaces}})?$`);
  return regex.test(number.toString());
}

// 校验小数最多保留几位
const validateSingleNum = (prop, value, maxPlaces, callback, min = 0, max = 99999999999) => {
  if (Number(value) > max || Number(value) <= min) {
    callback(new Error(`数值越界(${min}-${max}]`));
  } else if (!validateDecimalPlaces(value, maxPlaces)) {
    callback(new Error(`${prop}最多只允许保留${maxPlaces}位小数`));
  } else {
    callback();
  }
};
export function validateDecimal(prop, maxPlaces) {
  return (_rule, value, callback) => {
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((val) => {
        validateSingleNum(prop, val, maxPlaces, callback);
      });
    } else {
      validateSingleNum(prop, value, maxPlaces, callback);
    }
  };
}

// 校验只允许输入字母、数字
export function validateCharNum(prop) {
  return (_rule, value, callback) => {
    const reg = /^[A-Za-z0-9]+$/;
    if (!reg.test(value)) {
      callback(new Error(`${prop}只允许输入字母和数字`));
    } else {
      callback();
    }
  };
}
```

```ts
import type { Directive, DirectiveBinding } from "vue";

function isAuth(el: Element, binding: any) {
  const value = binding.value;
  if (!value) return;
  // if (!isAuth(value)) {
  //   el.parentNode?.removeChild(el);
  // }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

export default {  mounted } as Directive;
```