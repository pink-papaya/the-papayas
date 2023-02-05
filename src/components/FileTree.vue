<template>
  <div>
    <template v-for="item in items" :key="item.name">
      <div
        v-if="item.isVisible !== false"
        :class="{ [item.type]: true, first: depth === 0 }"
        class="item bg-slate-800 text-slate-400"
        tabindex="0"
        @keyup.enter="toggle(item)"
        @click.stop="toggle(item)"
      >
        <div class="item-name bg-slate-800">
          <template v-if="item.type === 'folder'">
            <span v-show="itemStateMap[item.name] !== false">⏷</span>
            <span v-show="itemStateMap[item.name] === false">⏵</span>
            <span>📁</span>
          </template>
          <span v-if="item.type === 'song'">♫</span>

          {{ item.name }}
        </div>
        <div v-if="item.type === 'song'" style="height: 18px">
          <a
            :href="
              'https://www.youtube.com/results?search_query=' +
              encodeURIComponent(item.name)
            "
            target="_blank"
            rel="noopener noreferrer"
            class="fill-slate-400 hover:fill-red-700"
            title="Search song name on youtube"
          >
            <mdi-icon :path="mdiYoutube" :size="18" />
          </a>
        </div>
        <div v-if="item.type === 'folder' && item.children" class="children">
          <FileTree
            v-show="itemStateMap[item.name] !== false"
            :items="item.children"
            :depth="depth + 1"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mdiYoutube } from '@mdi/js';
import { Collection, Folder, Song } from '../types';
import MdiIcon from './MdiIcon.vue';

withDefaults(defineProps<{ items: Collection; depth: number }>(), {
  depth: 0,
});

const itemStateMap = ref<Record<string, boolean>>({});

function toggle(item: Folder | Song) {
  if (item.type === 'folder') {
    const currentState = itemStateMap.value[item.name];

    itemStateMap.value[item.name] =
      currentState === undefined ? false : !currentState;
  }
}
</script>

<style>
.item {
  @apply font-medium;

  &.first {
    padding-right: 8px;
    margin-top: 0;
  }

  padding: 10px 0 6px 8px;
  margin: 8px 0 8px 8px;

  &:last-child:not(.first) {
    margin-bottom: 0;
    padding-bottom: 8px;
  }

  text-align: start;
}

.folder {
  @apply cursor-pointer border-l-2 border-slate-400 font-bold shadow-xl;

  > .item-name {
    @apply sticky z-10 p-1 capitalize;
    top: 120px;
  }

  &:hover {
    @apply border-pink-400;

    & > .item-name {
      @apply text-pink-400;
    }
  }
}

.song {
  cursor: default;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
