<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p>© {{ currentYear }} Pleasant666 · 用 Vue 3 构建</p>
      <p class="footer-sub">
        <a href="https://github.com/pleasant666/pleasant666.github.io" target="_blank" rel="noopener">
          查看源码
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
