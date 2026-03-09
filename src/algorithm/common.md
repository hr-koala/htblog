---
title: '通用方法'
---
## 提取树形结构中所有非叶子节点的 nodekey 值

提取树形结构中所有非叶子节点的 nodekey 值（即除去最后一级的节点），可以通过判断节点是否包含子节点来实现。以下提供递归和迭代两种实现方式。

1. 递归实现（简洁易懂）

```javascript
function getNonLeafNodeKeys(tree, keyField = 'key') {
  let keys = [];
  tree.forEach(node => {
    // 如果有子节点（children 存在且长度 > 0），则为非叶子节点
    if (node.children && node.children.length > 0) {
      keys.push(node[keyField]);               // 收集当前节点 key
      keys = keys.concat(getNonLeafNodeKeys(node.children, keyField)); // 递归子节点
    }
    // 没有子节点（叶子节点）则跳过
  });
  return keys;
}
```

1. 迭代实现（使用栈，避免递归深度过大）

```javascript
function getNonLeafNodeKeysIterative(tree, keyField = 'key') {
  const keys = [];
  const stack = [...tree]; // 将根节点入栈
  while (stack.length) {
    const node = stack.pop();
    if (node.children && node.children.length > 0) {
      keys.push(node[keyField]);               // 收集当前节点
      stack.push(...node.children);            // 子节点继续处理
    }
    // 叶子节点不收集
  }
  return keys;
}
const keys = getNonLeafNodeKeys(treeData);
```

## 
从一个树形数据中提取所有节点的某个标识（如 key、id）
使用深度优先遍历（递归或栈）或广度优先遍历（队列）收集所有节点的指定字段。

1. 递归实现（推荐）
```javascript
function getAllNodeKeys(tree, keyField = 'key') {
  let keys = [];
  tree.forEach(node => {
    keys.push(node[keyField]); // 收集当前节点 key
    if (node.children && node.children.length) {
      keys = keys.concat(getAllNodeKeys(node.children, keyField)); // 递归收集子节点
    }
  });
  return keys;
}
const keys = getAllNodeKeys(treeData);
const allNodeKeys = computed(() => {
  return getAllNodeKeys(treeData.value);
});
```

2. 迭代实现（使用栈，避免递归过深）
```javascript
function getAllNodeKeysIterative(tree, keyField = 'key') {
  const keys = [];
  const stack = [...tree]; // 拷贝数组作为栈
  while (stack.length) {
    const node = stack.pop(); // 深度优先（后进先出）
    keys.push(node[keyField]);
    if (node.children && node.children.length) {
      // 将子节点推入栈，注意顺序（如果希望保持原序，可以用 reverse）
      stack.push(...node.children);
    }
  }
  return keys;
}
```

1. 扩展：扁平化树并提取多个字段
如果希望同时获取每个节点的完整信息，可以返回对象数组：

```javascript
function flattenTree(tree, keyField = 'key') {
  let result = [];
  tree.forEach(node => {
    result.push({ [keyField]: node[keyField], ...node }); // 保留节点所有属性
    if (node.children) {
      result = result.concat(flattenTree(node.children, keyField));
    }
  });
  return result;
}
```


