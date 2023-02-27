<template>
  <div class="cursor-pointer font-bold">
    <div
      :class="{ 'border-transparent': depth === 0 }"
      class="sticky top-[81px] z-10 flex items-center gap-x-1 bg-slate-800 fill-pink-200 p-1 capitalize text-pink-200 hover:fill-pink-300 hover:text-pink-300 sm:top-[120px]"
    >
      <mdi-icon v-show="!isOpen" :path="mdiFolder" :size="18" />
      <mdi-icon v-show="isOpen" :path="mdiFolderOpen" :size="18" />

      {{ folder.name }}
    </div>
    <div v-if="folder.children" class="children">
      <FileTree v-show="isOpen" :items="folder.children" :depth="depth + 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiFolder, mdiFolderOpen } from '@mdi/js';
import { Folder } from '../types';
import FileTree from './FileTree.vue';
import MdiIcon from './MdiIcon.vue';

defineProps<{ folder: Folder; depth: number; isOpen: boolean }>();
</script>

<style scoped></style>
