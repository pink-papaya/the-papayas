<template>
  <div
    class="flex cursor-default items-center justify-between gap-x-1 bg-slate-800 fill-slate-300 pl-1 font-medium text-slate-300"
  >
    <div class="flex items-center gap-x-1">
      <mdi-icon :path="mdiMusicNote" :size="18" class="flex-shrink-0" />

      <div class="text-left" :title="song.name">
        <template v-if="song.meta.shortName">
          {{ song.meta.shortName }}
          <span class="hidden sm:inline">[{{ song.meta.arrangedBy }}]</span>
        </template>
        <template v-else>
          {{ song.name }}
        </template>
      </div>
    </div>

    <div style="height: 18px">
      <a
        :href="
          'https://www.youtube.com/results?search_query=' +
          encodeURIComponent(song.meta.shortName || song.name)
        "
        target="_blank"
        rel="noopener noreferrer"
        class="fill-slate-400 hover:fill-red-700"
        title="Search song name on youtube"
      >
        <mdi-icon :path="mdiYoutube" :size="18" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiMusicNote, mdiYoutube } from '@mdi/js';
import { Song } from '../types';
import MdiIcon from './MdiIcon.vue';

defineProps<{ song: Song }>();
</script>

<style scoped></style>
