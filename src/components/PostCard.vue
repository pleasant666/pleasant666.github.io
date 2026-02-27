<template>
  <article class="post-card">
    <RouterLink :to="`/post/${post.slug}`" class="post-card-link">
      <div class="post-card-meta">
        <time :datetime="post.date" class="post-date">{{ formatDate(post.date) }}</time>
        <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
      </div>
      <h2 class="post-card-title">{{ post.title }}</h2>
      <p v-if="post.summary" class="post-card-summary">{{ post.summary }}</p>
      <span class="post-card-more">阅读全文 →</span>
    </RouterLink>
  </article>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
