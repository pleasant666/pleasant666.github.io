---
title: Vue 3 Composition API 实用技巧整理
date: 2024-02-10
summary: 整理了几个在实际项目中频繁用到的 Vue 3 Composition API 技巧，帮助写出更简洁的代码。
tags:
  - Vue
  - 前端
  - JavaScript
---

## 1. 用 `watchEffect` 替代简单的 `watch`

当你只是想在依赖变化时执行副作用，不需要对比新旧值时，`watchEffect` 更简洁：

```javascript
// ❌ 冗余的 watch
watch(userId, async (id) => {
  userData.value = await fetchUser(id)
}, { immediate: true })

// ✅ 更简洁的 watchEffect
watchEffect(async () => {
  userData.value = await fetchUser(userId.value)
})
```

## 2. `computed` 的 setter

`computed` 不只能 getter，加上 setter 后可以实现双向绑定：

```javascript
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    const parts = value.split(' ')
    firstName.value = parts[0]
    lastName.value = parts[1] || ''
  }
})
```

## 3. 用 `provide` / `inject` 替代深层 props 传递

当组件层级很深，与其一层层传 props，不如用 `provide` / `inject`：

```javascript
// 父组件
import { provide, ref } from 'vue'

const theme = ref('light')
provide('theme', theme)  // 传入 ref，子组件可以响应变化

// 深层子组件
import { inject } from 'vue'

const theme = inject('theme', ref('light'))  // 第二个参数是默认值
```

## 4. `toRefs` 解构响应式对象

从 `reactive` 对象解构时，会失去响应性。用 `toRefs` 可以保留：

```javascript
const state = reactive({ count: 0, name: 'Vue' })

// ❌ 解构后失去响应性
const { count, name } = state

// ✅ 用 toRefs 保留响应性
const { count, name } = toRefs(state)
```

## 总结

Composition API 的核心思路是**按功能组织代码**，而非按选项（data/methods/computed）。用好这些工具，代码逻辑会更内聚，也更容易复用。
