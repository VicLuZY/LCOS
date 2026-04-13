<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import FeedbackInvite from './FeedbackInvite.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-bottom>
      <ClientOnly>
        <FeedbackInvite />
      </ClientOnly>
    </template>
  </DefaultTheme.Layout>
</template>
