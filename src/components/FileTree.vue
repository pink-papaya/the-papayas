<template>
  <div>
    <template v-for="item in items" :key="item.name">
      <div
        v-if="item.isVisible !== false"
        :class="item.type"
        class="item"
        tabindex="0"
        @keyup.enter="toggle(item)"
        @click.self="toggle(item)"
      >
        <div>
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
            title="Search song name on youtube"
          >
            <mdi-icon :path="mdiYoutube" size="18" />
          </a>
        </div>
        <div v-if="item.type === 'folder' && item.children" class="children">
          <FileTree
            v-show="itemStateMap[item.name] !== false"
            :items="item.children"
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

defineProps<{ items: Collection }>();

const itemStateMap = ref<Record<string, boolean>>({});

function toggle(item: Folder | Song) {
  if (item.type === 'folder') {
    const currentState = itemStateMap.value[item.name];

    itemStateMap.value[item.name] =
      currentState === undefined ? false : !currentState;
  }
}
</script>

<style lang="css">
.item {
  padding: 8px;
  margin: 8px;

  text-align: start;

  border: 1px solid #ccc;
}

.folder {
  background: lightcoral;
  cursor: pointer;
}

.song {
  cursor: default;
  background: lightpink;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
