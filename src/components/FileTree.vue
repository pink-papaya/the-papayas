<template>
  <div>
    <template v-for="item in items" :key="item.name">
      <div
        v-if="item.isVisible !== false"
        :class="{ [item.type]: true, first: depth === 0 }"
        class="item bg-slate-800"
        :tabindex="item.type === 'folder' ? 0 : -1"
        @keyup.enter.stop="toggle(item)"
        @click.stop="toggle(item)"
      >
        <div class="item-name bg-slate-800">
          <template v-if="item.type === 'folder'">
            <mdi-icon
              v-show="itemStateMap[item.name] === false"
              :path="mdiFolder"
              :size="18"
              class="inline"
            />
            <mdi-icon
              v-show="itemStateMap[item.name] !== false"
              :path="mdiFolderOpen"
              :size="18"
              class="inline"
            />
          </template>

          <mdi-icon
            v-if="item.type === 'song'"
            :path="mdiMusicNote"
            :size="18"
            class="inline"
          />

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
import { onBeforeMount, ref } from 'vue';
import { mdiYoutube, mdiFolder, mdiFolderOpen, mdiMusicNote } from '@mdi/js';
import { Collection, Folder, Song } from '../types';
import MdiIcon from './MdiIcon.vue';

const props = withDefaults(
  defineProps<{ items: Collection; depth?: number }>(),
  { depth: 0 },
);

const itemStateMap = ref<Record<string, boolean>>({});

onBeforeMount(() => {
  if (props.depth !== 1) {
    return;
  }

  props.items
    .filter((item) => item.type === 'folder')
    .forEach((item) => {
      itemStateMap.value[item.name] = false;
    });
});

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
  @apply border-l-2 border-pink-200 fill-slate-300 font-medium text-slate-300;

  &.first {
    padding-right: 16px;
    margin-right: 16px;
  }

  padding: 10px 0 6px 8px;
  margin: 0 0 0 12px;

  &:last-child:not(.first) {
    padding-bottom: 8px;
  }

  text-align: start;
}

.folder {
  @apply cursor-pointer border-l-2 border-slate-400 border-pink-200 font-bold shadow-xl;

  &.first {
    @apply border-transparent;
  }

  > .item-name {
    @apply sticky z-10 fill-pink-200 p-1 capitalize text-pink-200;

    &:hover {
      @apply fill-pink-300 text-pink-300;
    }

    top: 81px;
    @screen md {
      top: 120px;
    }
  }
}

.song {
  cursor: default;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .item-name {
    @apply pl-1;
  }
}
</style>
