<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24">
    <path :d="path"></path>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ path: string; size: number }>(), {
  size: 24,
});
</script>

<style scoped></style>
