---
title: Array 方法
date: 2025-02-26
article: false
tag:
  - Array
---

## Array.prototype.slice.call()方法详解

> Array.prototype.slice.call(arguments,1); //意思就是说把调用方法的参数截取出来。

```js
function test(a, b, c, d) {
  let arg = Array.prototype.slice.call(arguments, 1)
  console.log(arg)
}
test("a", "b", "c", "d") //b,c,d
```
