<template>
  <input
    v-model="query"
    type="search"
    name="search"
    placeholder="search"
    aria-label="search"
  />

  <FileTree :items="items" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import FileTree from './FileTree.vue';
import songs from '../assets/songs.json';
import { Song, Folder, Collection } from '../types';

const query = ref('');

const items = computed(() => {
  const filteredItems = cloneDeep(songs as Collection);

  function filterFunction(items: Collection, parent?: Folder) {
    items.forEach((item, index) => {
      if (item.type === 'folder') {
        return filterFunction(item.children, item);
      }

      if (!item.name.toLowerCase().includes(query.value.toLowerCase())) {
        item.isVisible = false;
      }
    });

    if (parent) {
      parent.isVisible = items.some(item => item.isVisible !== false);
    }
  }

  filterFunction(filteredItems);

  return filteredItems;
});
</script>
