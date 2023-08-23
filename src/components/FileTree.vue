<template>
  <div>
    <template v-for="item in items" :key="item.name">
      <div
        v-if="item.isVisible !== false"
        :class="{ [item.type]: true, first: depth === 0 }"
        class="item border-l-2 border-pink-200 bg-slate-800"
        :tabindex="item.type === 'folder' ? 0 : -1"
        @keyup.enter.stop="toggle(item)"
        @click.stop="toggle(item)"
      >
        <AppFolder
          v-if="item.type === 'folder'"
          :folder="item"
          :is-open="itemStateMap[item.name] !== false"
          :depth="depth"
        />
        <AppSong v-if="item.type === 'song'" :song="item" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Collection, Folder, Song } from '../types';
import AppFolder from './AppFolder.vue';
import AppSong from './AppSong.vue';

const props = withDefaults(
  defineProps<{ items: Collection; depth?: number }>(),
  { depth: 0 },
);

const itemStateMap = ref<Record<string, boolean>>({});

onBeforeMount(() => {
  if (props.depth < 1) {
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
  &.first {
    &.folder {
      @apply border-transparent;
    }

    @apply mx-0;

    @screen sm {
      margin-right: 16px;
      margin-left: 16px;
    }
    padding-right: 16px;
  }

  padding: 10px 0 6px 8px;
  margin: 0 0 0 12px;

  &:last-child:not(.first) {
    padding-bottom: 8px;
    @apply border-b-2 border-b-gray-900;
  }
}
</style>
