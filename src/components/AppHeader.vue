<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="site-title">
        Pleasant666
      </RouterLink>
      <nav class="site-nav">
        <RouterLink to="/" class="nav-link">文章</RouterLink>
        <RouterLink to="/about" class="nav-link">关于</RouterLink>
        <a
          href="https://github.com/pleasant666"
          target="_blank"
          rel="noopener"
          class="nav-link"
        >GitHub</a>
      </nav>
      <button
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-label="切换导航菜单"
        @click="menuOpen = !menuOpen"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
    <nav v-if="menuOpen" class="mobile-nav">
      <RouterLink to="/" class="mobile-nav-link" @click="menuOpen = false">文章</RouterLink>
      <RouterLink to="/about" class="mobile-nav-link" @click="menuOpen = false">关于</RouterLink>
      <a
        href="https://github.com/pleasant666"
        target="_blank"
        rel="noopener"
        class="mobile-nav-link"
      >GitHub</a>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const menuOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  menuOpen.value = false
})
</script>
