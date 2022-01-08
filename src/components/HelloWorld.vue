<template>
  <FileTree :items="items" />
</template>

<script setup lang="ts">
  import FileTree from './FileTree.vue';
  import songs from '../assets/songs.json';
  import { Song, Folder } from '../types';

  const items = songs as (Song|Folder)[];
</script>