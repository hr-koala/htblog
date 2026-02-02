<!--
 * @Date: 2026-01-30 15:37:15
 * @LastEditTime: 2026-01-30 16:02:19
 * @Description: 
-->
## transfer-virtual
**简介**：本内容主要是基于el-transfer的虚拟化列表优化，[element官方文档](https://element-plus.org/zh-CN/component/transfer.html)，其中在查看虚拟化树形控件（tree-v2）时发现自带的虚拟化列表[virtual-list](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Felement-plus%2Felement-plus%2Fblob%2Fmain%2Fpackages%2Fcomponents%2Fvirtual-list%2Findex.ts "https://github.com/element-plus/element-plus/blob/main/packages/components/virtual-list/index.ts")中的FixedSizeList

1.增加**itemSize**、**height**参数，用于虚拟列表高度计算渲染,其余使用参数请参考官方文档
> itemSize：每条数据高度
> height：列表高度
   
2.基于通已灵码优化部分代码，主要涉及文件use-check、use-computed-data、use-move

#### 优化后插件地址：
https://github.com/849950324/transfer-virtual.git
#### 代码示例：
https://github.com/849950324/transfer-demo.git

```ts
// src/composables/index.ts
export * from './use-check'
export * from './use-checked-change'
export * from './use-computed-data'
export * from './use-move'
export * from './use-props-alias'
```

```ts
// src/composables/use-check.ts
import { computed, watch } from 'vue'
import { isFunction } from 'element-plus/es/utils/index'
import { CHECKED_CHANGE_EVENT } from '../transfer-panel'
import { usePropsAlias } from './use-props-alias'

import type { SetupContext } from 'vue'
import type { CheckboxValueType } from 'element-plus'
import type { TransferKey } from '../transfer'
import type {
  TransferPanelEmits,
  TransferPanelProps,
  TransferPanelState,
} from '../transfer-panel'

export const useCheck = (
  props: TransferPanelProps,
  panelState: TransferPanelState,
  emit: SetupContext<TransferPanelEmits>['emit']
) => {
  const propsAlias = usePropsAlias(props)

  const filteredData = computed(() => {
    return props.data.filter((item) => {
      if (isFunction(props.filterMethod)) {
        return props.filterMethod(panelState.query, item)
      } else {
        const label = String(item[propsAlias.value.label] ?? item[propsAlias.value.key]);
        return label.toLowerCase().includes(panelState.query.toLowerCase())
      }
    })
  })

  const checkableData = computed(() =>
    filteredData.value.filter((item) => !item[propsAlias.value.disabled])
  )

  const checkedSummary = computed(() => {
    const checkedLength = panelState.checked.length
    const dataLength = props.data.length
    const { noChecked, hasChecked } = props.format

    if (noChecked && hasChecked) {
      return checkedLength > 0
        ? hasChecked
            .replace(/\${checked}/g, checkedLength.toString())
            .replace(/\${total}/g, dataLength.toString())
        : noChecked.replace(/\${total}/g, dataLength.toString())
    } else {
      return `${checkedLength}/${dataLength}`
    }
  })

  const isIndeterminate = computed(() => {
    const checkedLength = panelState.checked.length
    return checkedLength > 0 && checkedLength < checkableData.value.length
  })

  const updateAllChecked = () => {
    // 检查 checkableData.value 是否为空
    if (checkableData.value.length === 0) {
      panelState.allChecked = false;
      return;
    }
  
    // 提取数据键值
    const dataKeys = checkableData.value.map(
      (dataItem) => dataItem[propsAlias.value.key] // 假设 propsAlias.value.key 是 'id' 或类似的唯一标识符
    );
  
    // 将 panelState.checked 转换为 Set 以提高查找性能
    const checkedSet = new Set(panelState.checked);
  
    // 更新 allChecked 的状态
    panelState.allChecked = dataKeys.length > 0 && dataKeys.every((dataKey) => checkedSet.has(dataKey));
  }

  const handleAllCheckedChange = (value: CheckboxValueType) => {
    panelState.checked = value
      ? checkableData.value.map((item) => item[propsAlias.value.key])
      : []
  }

  watch(
    () => panelState.checked,
    (val, oldVal) => {
      updateAllChecked()
  
      if (panelState.checkChangeByUser) {
        // 使用 Set 来存储值，以提高查找效率
        const setVal = new Set(val);
        const setOldVal = new Set(oldVal);
  
        // 计算新增加和被移除的键
        const addedKeys = Array.from(setVal).filter(v => !setOldVal.has(v));
        const removedKeys = Array.from(setOldVal).filter(v => !setVal.has(v));
        const movedKeys = [...addedKeys, ...removedKeys];
  
        emit(CHECKED_CHANGE_EVENT, val, movedKeys);
      } else {
        emit(CHECKED_CHANGE_EVENT, val);
        // 在这里设置为true，表示下一次变化是由用户引起的
        panelState.checkChangeByUser = true;
      }
    }
  )

  watch(checkableData, () => {
    updateAllChecked()
  })

  watch(
    () => props.data,
    () => {
      // 假设TransferKey为string类型
      const checked: TransferKey[] = []
      const filteredDataKeys = new Set(filteredData.value.map(
        (item) => item[propsAlias.value.key] as TransferKey // 确保类型正确
      ))
  
      panelState.checked.forEach((item) => {
        if (filteredDataKeys.has(item)) {
          checked.push(item)
        }
      })
  
      // 修改状态前的注释
      // 清除用户触发的检查变更标志，并更新已选中的项
      panelState.checkChangeByUser = false
      panelState.checked = checked
    }
  )
  
  watch(
    () => props.defaultChecked,
    (val, oldVal) => {
      // 保留原有的逻辑，即使 val 和 oldVal 完全相同也会更新 checked
      const checkableDataKeysSet = new Set(checkableData.value.map(
        (item) => item[propsAlias.value.key]
      ));
  
      // 使用 Set 的 has 方法来填充 checked 数组
      const checked: TransferKey[] = val.filter(item => checkableDataKeysSet.has(item));
  
      panelState.checkChangeByUser = false;
      panelState.checked = checked;
    },
    {
      immediate: true,
    }
  )

  return {
    filteredData,
    checkableData,
    checkedSummary,
    isIndeterminate,
    updateAllChecked,
    handleAllCheckedChange,
  }
}
```

```ts
// src/composables/use-checked-change.ts
import { LEFT_CHECK_CHANGE_EVENT, RIGHT_CHECK_CHANGE_EVENT } from "../transfer";

import type { SetupContext } from "vue";
import type { TransferCheckedState, TransferEmits, TransferKey } from "../transfer";

export const useCheckedChange = (
  checkedState: TransferCheckedState,
  emit: SetupContext<TransferEmits>["emit"],
) => {
  const onSourceCheckedChange = (val: TransferKey[], movedKeys?: TransferKey[]) => {
    checkedState.leftChecked = val;
    if (!movedKeys) return;
    emit(LEFT_CHECK_CHANGE_EVENT, val, movedKeys);
  };

  const onTargetCheckedChange = (val: TransferKey[], movedKeys?: TransferKey[]) => {
    checkedState.rightChecked = val;
    if (!movedKeys) return;
    emit(RIGHT_CHECK_CHANGE_EVENT, val, movedKeys);
  };

  return {
    onSourceCheckedChange,
    onTargetCheckedChange,
  };
};
```

```ts
// src/composables/use-computed-data.ts
import { computed } from 'vue'
import { usePropsAlias } from './use-props-alias'

import type { TransferDataItem, TransferKey, TransferProps } from '../transfer'

export const useComputedData = (props: TransferProps) => {
  const propsAlias = usePropsAlias(props)

  const dataObj = computed(() =>
    props.data.reduce((o, cur) => (o[cur[propsAlias.value.key]] = cur) && o, {})
  )

  // 创建一个Set用于快速查找
  const modelValueSet = computed(() => new Set(props.modelValue));

  // 过滤函数
  const sourceData = computed(() => {
    if (!Array.isArray(props.data)) return [];

    return props.data.filter((item) => {
      if (typeof item !== 'object' || item === null) return false;
      const key = propsAlias.value.key;
      if (key === undefined || typeof key !== 'string') return false;

      const value = item[key];
      return !modelValueSet.value.has(value);
    });
  });

  // 过滤函数
  const targetData = computed(() => {
    if (props.targetOrder === 'original') {
      return props.data.filter((item) => {
        const key = propsAlias.value.key;
        const value = item[key];
        return modelValueSet.value.has(value);
      });
    } else {
      return props.modelValue.reduce(
        (arr, cur) => {
          const val = props.dataObj.value[cur];
          if (val) {
            arr.push(val);
          }
          return arr;
        },
        []
      );
    }
  });

  return {
    sourceData,
    targetData,
  }
}
```

```ts
// src/composables/use-move.ts
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from 'element-plus'
import { usePropsAlias } from './use-props-alias'

import type { SetupContext } from 'vue'
import type {
  TransferCheckedState,
  TransferDataItem,
  TransferDirection,
  TransferEmits,
  TransferKey,
  TransferProps,
} from '../transfer'

export const useMove = (
  props: TransferProps,
  checkedState: TransferCheckedState,
  emit: SetupContext<TransferEmits>['emit']
) => {
  const propsAlias = usePropsAlias(props)

  const _emit = (
    value: TransferKey[],
    direction: TransferDirection,
    movedKeys: TransferKey[]
  ) => {
    emit(UPDATE_MODEL_EVENT, value)
    emit(CHANGE_EVENT, value, direction, movedKeys)
  }

  const addToLeft = () => {
    // 获取当前值的副本以避免修改原始数据
    const currentValue = [...props.modelValue];

    // 创建一个临时数组用于存储要移除的元素
    const itemsToRemove:any = [];

    // 遍历 rightChecked 数组
    checkedState.rightChecked.forEach((item) => {
        const index = currentValue.indexOf(item);
        if (index > -1) {
            // 记录需要移除的元素
            itemsToRemove.push(item);
        }
    });

    // 使用 filter 方法来移除元素，这样更高效
    const filteredArray = currentValue.filter(item => !itemsToRemove.includes(item));

    // 更新值
    _emit(filteredArray, 'left', checkedState.rightChecked);
}

const addToRight = () => {
  let currentValue = props.modelValue.slice()
  // 将数组转换为集合以加快查找速度
  const leftCheckedSet = new Set(checkedState.leftChecked);
  const modelValueSet = new Set(props.modelValue);
    // 筛选和映射需要移动的items
    const itemsToBeMoved = props.data
    .filter((item: TransferDataItem) => {
      // 确保密钥存在于项目中
      const itemKey = item[propsAlias.value.key];
      // 检查item是否已被选中，并且尚未在目标列表中
      return leftCheckedSet.has(itemKey) && !modelValueSet.has(itemKey);
    })
    .map((item: TransferDataItem) => item[propsAlias.value.key]);

  currentValue =
    props.targetOrder === 'unshift'
      ? itemsToBeMoved.concat(currentValue)
      : currentValue.concat(itemsToBeMoved)

  if (props.targetOrder === 'original') {
    const currentValueSet = new Set(currentValue);
    currentValue = props.data
     .filter((item) => currentValueSet.has(item[propsAlias.value.key]))
     .map((item) => item[propsAlias.value.key]);
  }

  _emit(currentValue, 'right', checkedState.leftChecked)
}
// const addToRight = () => {
//   let currentValue = props.modelValue.slice()

//   const itemsToBeMoved = props.data
//     .filter((item: TransferDataItem) => {
//       const itemKey = item[propsAlias.value.key]
//       return (
//         checkedState.leftChecked.includes(itemKey) &&
//         !props.modelValue.includes(itemKey)
//       )
//     })
//     .map((item) => item[propsAlias.value.key])

//   currentValue =
//     props.targetOrder === 'unshift'
//       ? itemsToBeMoved.concat(currentValue)
//       : currentValue.concat(itemsToBeMoved)

//   if (props.targetOrder === 'original') {
//     currentValue = props.data
//       .filter((item) => currentValue.includes(item[propsAlias.value.key]))
//       .map((item) => item[propsAlias.value.key])
//   }

//   _emit(currentValue, 'right', checkedState.leftChecked)
// }

  return {
    addToLeft,
    addToRight,
  }
}
```

```ts
// src/composables/use-props-alias.ts
import { computed } from 'vue'

import type { TransferPropsAlias } from '../transfer'

export const usePropsAlias = (props: { props: TransferPropsAlias }) => {
  const initProps: Required<TransferPropsAlias> = {
    label: 'label',
    key: 'key',
    disabled: 'disabled',
  }

  return computed(() => ({
    ...initProps,
    ...props.props,
  }))
}
```

```ts
// src/transfer-panel.ts
import { buildProps, definePropType } from 'element-plus/es/utils/index'
import { transferCheckedChangeFn, transferProps } from './transfer'

import type { ExtractPropTypes, VNode } from 'vue'
import type { TransferDataItem, TransferKey } from './transfer'
import type TransferPanel from './transfer-panel.vue'

export interface TransferPanelState {
  checked: TransferKey[]
  allChecked: boolean
  query: string
  checkChangeByUser: boolean
}

export const CHECKED_CHANGE_EVENT = 'checked-change'

export const transferPanelProps = buildProps({
  data: transferProps.data,
  optionRender: {
    type: definePropType<(option: TransferDataItem) => VNode | VNode[]>(
      Function
    ),
  },
  placeholder: String,
  title: String,
  filterable: Boolean,
  format: transferProps.format,
  filterMethod: transferProps.filterMethod,
  defaultChecked: transferProps.leftDefaultChecked,
  props: transferProps.props,
  itemSize: transferProps.itemSize,
  height: transferProps.height,

} as const)
export type TransferPanelProps = ExtractPropTypes<typeof transferPanelProps>

export const transferPanelEmits = {
  [CHECKED_CHANGE_EVENT]: transferCheckedChangeFn,
}
export type TransferPanelEmits = typeof transferPanelEmits

export type TransferPanelInstance = InstanceType<typeof TransferPanel>
```

```vue
<!-- src/transfer-panel.vue -->
<template>
  <div :class="ns.b('panel')">
    <p :class="ns.be('panel', 'header')">
      <el-checkbox
        v-model="allChecked"
        :indeterminate="isIndeterminate"
        :validate-event="false"
        @change="handleAllCheckedChange"
      >
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </el-checkbox>
    </p>

    <div :class="[ns.be('panel', 'body'), ns.is('with-footer', hasFooter)]">
      <el-input
        v-if="filterable"
        v-model="query"
        :class="ns.be('panel', 'filter')"
        size="default"
        :placeholder="placeholder"
        :prefix-icon="Search"
        clearable
        :validate-event="false"
      />

      <el-checkbox-group
        v-show="!hasNoMatch && !isEmpty(data)"
        v-model="checked"
        :validate-event="false"
        :class="[ns.is('filterable', filterable), ns.be('panel', 'list')]"
        style="overflow: hidden"
      >
        <!-- 虚拟化列表 -->
        <fixed-size-list
          :class-name="ns.b('virtual-list')"
          :data="filteredData"
          containerElement="label"
          :total="filteredData.length"
          :height="height"
          :item-size="itemSize"
        >
          <template #default="{ data, index }">
            <el-checkbox
              :key="data[index][propsAlias.key]"
              :class="ns.be('panel', 'item')"
              :label="data[index][propsAlias.key]"
              :disabled="data[index][propsAlias.disabled]"
              :validate-event="false"
            >
              <option-content :option="optionRender?.(data[index])" />
            </el-checkbox>
          </template>
        </fixed-size-list>
      </el-checkbox-group>
      <p v-show="hasNoMatch || isEmpty(data)" :class="ns.be('panel', 'empty')">
        {{ hasNoMatch ? t("el.transfer.noMatch") : t("el.transfer.noData") }}
      </p>
    </div>
    <p v-if="hasFooter" :class="ns.be('panel', 'footer')">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, toRefs, useSlots } from "vue";
  import { isEmpty } from "element-plus/es/utils/index";
  import {
    useLocale,
    useNamespace,
    FixedSizeList,
    ElCheckbox,
    ElCheckboxGroup,
    ElInput,
  } from "element-plus";
  // import { ElCheckbox, ElCheckboxGroup } from 'element-plus/es/components/checkbox'
  // import { ElInput } from 'element-plus/es/components/input'
  import { Search } from "@element-plus/icons-vue";
  import { transferPanelEmits, transferPanelProps } from "./transfer-panel";
  import { useCheck, usePropsAlias } from "./composables";

  import type { VNode } from "vue";
  import type { TransferPanelState } from "./transfer-panel";

  defineOptions({
    name: "ElTransferPanel",
  });

  const props = defineProps(transferPanelProps);
  const emit = defineEmits(transferPanelEmits);
  const slots = useSlots();

  const OptionContent = ({ option }: { option: VNode | VNode[] }) => option;

  const { t } = useLocale();
  const ns = useNamespace("transfer");

  const panelState = reactive<TransferPanelState>({
    checked: [],
    allChecked: false,
    query: "",
    checkChangeByUser: true,
  });

  const propsAlias = usePropsAlias(props);

  const { filteredData, checkedSummary, isIndeterminate, handleAllCheckedChange } = useCheck(
    props,
    panelState,
    emit,
  );

  const hasNoMatch = computed(() => !isEmpty(panelState.query) && isEmpty(filteredData.value));

  const hasFooter = computed(() => !isEmpty(slots.default!()[0].children));

  const { checked, allChecked, query } = toRefs(panelState);

  defineExpose({
    /** @description filter keyword */
    query,
  });
</script>
```

```ts
// src/transfer.ts
import { isNil } from "lodash";
import { buildProps, definePropType, isArray, mutable } from "element-plus/es/utils/index";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "element-plus";

import type { ExtractPropTypes, h as H, VNode } from "vue";
import type Transfer from "./transfer.vue";

export type TransferKey = string | number;
export type TransferDirection = "left" | "right";

export type TransferDataItem = Record<string, any>;

export type renderContent = (h: typeof H, option: TransferDataItem) => VNode | VNode[];

export interface TransferFormat {
  noChecked?: string;
  hasChecked?: string;
}

export interface TransferPropsAlias {
  label?: string;
  key?: string;
  disabled?: string;
}

export interface TransferCheckedState {
  leftChecked: TransferKey[];
  rightChecked: TransferKey[];
}

export const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
export const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";

export const transferProps = buildProps({
  /**
   * @description data source
   */
  data: {
    type: definePropType<TransferDataItem[]>(Array),
    default: () => [],
  },
  /**
   * @description custom list titles
   */
  titles: {
    type: definePropType<[string, string]>(Array),
    default: () => [],
  },
  /**
   * @description custom button texts
   */
  buttonTexts: {
    type: definePropType<[string, string]>(Array),
    default: () => [],
  },
  /**
   * @description placeholder for the filter input
   */
  filterPlaceholder: String,
  /**
   * @description custom filter method
   */
  filterMethod: {
    type: definePropType<(query: string, item: TransferDataItem) => boolean>(Function),
  },
  /**
   * @description key array of initially checked data items of the left list
   */
  leftDefaultChecked: {
    type: definePropType<TransferKey[]>(Array),
    default: () => [],
  },
  /**
   * @description key array of initially checked data items of the right list
   */
  rightDefaultChecked: {
    type: definePropType<TransferKey[]>(Array),
    default: () => [],
  },
  /**
   * @description custom render function for data items
   */
  renderContent: {
    type: definePropType<renderContent>(Function),
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: definePropType<TransferKey[]>(Array),
    default: () => [],
  },
  /**
   * @description texts for checking status in list header
   */
  format: {
    type: definePropType<TransferFormat>(Object),
    default: () => ({}),
  },
  /**
   * @description whether Transfer is filterable
   */
  filterable: Boolean,
  /**
   * @description prop aliases for data source
   */
  props: {
    type: definePropType<TransferPropsAlias>(Object),
    default: () =>
      mutable({
        label: "label",
        key: "key",
        disabled: "disabled",
      } as const),
  },
  /**
   * @description order strategy for elements in the target list. If set to `original`, the elements will keep the same order as the data source. If set to `push`, the newly added elements will be pushed to the bottom. If set to `unshift`, the newly added elements will be inserted on the top
   */
  targetOrder: {
    type: String,
    values: ["original", "push", "unshift"],
    default: "original",
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  itemSize: {
    type: Number,
    default: 40,
  },
  height: {
    type: Number,
    default: 200,
  },
} as const);
export type TransferProps = ExtractPropTypes<typeof transferProps>;

export const transferCheckedChangeFn = (value: TransferKey[], movedKeys?: TransferKey[]) =>
  [value, movedKeys].every(isArray) || (isArray(value) && isNil(movedKeys));

export const transferEmits = {
  [CHANGE_EVENT]: (value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) =>
    [value, movedKeys].every(isArray) && ["left", "right"].includes(direction),
  [UPDATE_MODEL_EVENT]: (value: TransferKey[]) => isArray(value),
  [LEFT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
  [RIGHT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
};
export type TransferEmits = typeof transferEmits;

export type TransferInstance = InstanceType<typeof Transfer>;
```

```vue
<!-- src/transfer.vue -->
<template>
  <div :class="ns.b()">
    <transfer-panel
      ref="leftPanel"
      :data="sourceData"
      :option-render="optionRender"
      :placeholder="panelFilterPlaceholder"
      :title="leftPanelTitle"
      :filterable="filterable"
      :format="format"
      :filter-method="filterMethod"
      :default-checked="leftDefaultChecked"
      :props="props.props"
      @checked-change="onSourceCheckedChange"
    >
      <slot name="left-footer"></slot>
    </transfer-panel>
    <div :class="ns.e('buttons')">
      <el-button
        type="primary"
        :class="[ns.e('button'), ns.is('with-texts', hasButtonTexts)]"
        :disabled="isEmpty(checkedState.rightChecked)"
        @click="addToLeft"
      >
        <el-icon><arrow-left /></el-icon>
        <span v-if="!isUndefined(buttonTexts[0])">{{ buttonTexts[0] }}</span>
      </el-button>
      <el-button
        type="primary"
        :class="[ns.e('button'), ns.is('with-texts', hasButtonTexts)]"
        :disabled="isEmpty(checkedState.leftChecked)"
        @click="addToRight"
      >
        <span v-if="!isUndefined(buttonTexts[1])">{{ buttonTexts[1] }}</span>
        <el-icon><arrow-right /></el-icon>
      </el-button>
    </div>
    <transfer-panel
      ref="rightPanel"
      :data="targetData"
      :option-render="optionRender"
      :placeholder="panelFilterPlaceholder"
      :filterable="filterable"
      :format="format"
      :filter-method="filterMethod"
      :title="rightPanelTitle"
      :default-checked="rightDefaultChecked"
      :props="props.props"
      @checked-change="onTargetCheckedChange"
    >
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script lang="ts" setup>
  import { computed, h, reactive, ref, useSlots, watch } from "vue";
  import { debugWarn, isEmpty, isUndefined } from "element-plus/es/utils/index";
  import { useLocale, useNamespace, useFormItem } from "element-plus";
  // import { ElButton } from 'element-plus/es/components/button'
  // import { ElIcon } from 'element-plus/es/components/icon'
  import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
  import { transferEmits, transferProps } from "./transfer";
  import { useCheckedChange, useComputedData, useMove, usePropsAlias } from "./composables";
  import TransferPanel from "./transfer-panel.vue";

  import type { TransferCheckedState, TransferDataItem, TransferDirection } from "./transfer";
  import type { TransferPanelInstance } from "./transfer-panel";

  defineOptions({
    name: "ElTransfer",
  });

  const props = defineProps(transferProps);
  const emit = defineEmits(transferEmits);
  const slots = useSlots();

  const { t } = useLocale();
  const ns = useNamespace("transfer");
  const { formItem } = useFormItem();

  const checkedState = reactive<TransferCheckedState>({
    leftChecked: [],
    rightChecked: [],
  });

  const propsAlias = usePropsAlias(props);

  const { sourceData, targetData } = useComputedData(props);

  const { onSourceCheckedChange, onTargetCheckedChange } = useCheckedChange(checkedState, emit);

  const { addToLeft, addToRight } = useMove(props, checkedState, emit);

  const leftPanel = ref<TransferPanelInstance>();
  const rightPanel = ref<TransferPanelInstance>();

  const clearQuery = (which: TransferDirection) => {
    switch (which) {
      case "left":
        leftPanel.value!.query = "";
        break;
      case "right":
        rightPanel.value!.query = "";
        break;
    }
  };

  const hasButtonTexts = computed(() => props.buttonTexts.length === 2);

  const leftPanelTitle = computed(() => props.titles[0] || t("el.transfer.titles.0"));

  const rightPanelTitle = computed(() => props.titles[1] || t("el.transfer.titles.1"));

  const panelFilterPlaceholder = computed(
    () => props.filterPlaceholder || t("el.transfer.filterPlaceholder"),
  );

  watch(
    () => props.modelValue,
    () => {
      if (props.validateEvent) {
        formItem?.validate?.("change").catch((err) => debugWarn(err));
      }
    },
  );

  const optionRender = computed(() => (option: TransferDataItem) => {
    if (props.renderContent) return props.renderContent(h, option);

    if (slots.default) return slots.default({ option });

    return h("span", option[propsAlias.value.label] || option[propsAlias.value.key]);
  });

  defineExpose({
    /** @description clear the filter keyword of a certain panel */
    clearQuery,
    /** @description left panel ref */
    leftPanel,
    /** @description left panel ref */
    rightPanel,
  });
</script>
```

```ts
// src/index.ts
import { withInstall } from "element-plus/es/utils/index";

import Transfer from "./src/transfer.vue";

export const ElTransfer = withInstall(Transfer);
export default ElTransfer;

export * from "./src/transfer";
```