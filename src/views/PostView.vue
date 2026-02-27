<template>
  <div class="container post-view">
    <div v-if="loading" class="loading-state">
      <p>加载中…</p>
    </div>

    <div v-else-if="!post" class="error-state">
      <h1>文章不存在</h1>
      <RouterLink to="/">← 返回首页</RouterLink>
    </div>

    <article v-else class="post-article">
      <header class="post-header">
        <RouterLink to="/" class="back-link">← 返回列表</RouterLink>
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
        </div>
      </header>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="post-body markdown-body" v-html="post.html" />

      <footer class="post-footer">
        <RouterLink to="/" class="back-link">← 返回列表</RouterLink>
      </footer>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPostBySlug } from '@/utils/posts.js'

const route = useRoute()
const post = ref(null)
const loading = ref(true)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(`${dateStr}T00:00:00`)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

async function loadPost(slug) {
  loading.value = true
  post.value = await getPostBySlug(slug)
  loading.value = false

  if (post.value) {
    document.title = `${post.value.title} | Pleasant666 的博客`
  }
}

onMounted(() => loadPost(route.params.slug))

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) loadPost(newSlug)
})

onUnmounted(() => {
  document.title = 'Pleasant666 的博客'
})
</script>
