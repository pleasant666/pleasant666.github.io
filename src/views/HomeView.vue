<template>
  <div class="container home-view">
    <div v-if="loading" class="loading-state">
      <p>加载中…</p>
    </div>

    <div v-else-if="posts.length === 0" class="empty-state">
      <p>还没有文章，快去写第一篇吧！</p>
    </div>

    <template v-else>
      <h1 class="page-title">最新文章</h1>
      <div class="post-list">
        <PostCard
          v-for="post in posts"
          :key="post.slug"
          :post="post"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PostCard from '@/components/PostCard.vue'
import { getAllPosts } from '@/utils/posts.js'

const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  posts.value = await getAllPosts()
  loading.value = false
})
</script>
