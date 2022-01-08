<template>
  <FileTree :items="songs" />
</template>

<script setup lang="ts">
  import FileTree from './FileTree.vue';
  import songs from '../assets/songs.json';
</script>