<template>
  <input
    v-model="query"
    type="search"
    name="search"
    placeholder="search"
    aria-label="search"
  />

  <FileTree :items="filteredItems" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import FileTree from './FileTree.vue';
import songs from '../assets/songs.json';
import { Folder, Collection } from '../types';

const query = ref('');

const filteredItems = ref(cloneDeep(songs as Collection));

watch(query, () => {
  function filterFunction(items: Collection, parent?: Folder) {
    items.forEach((item) => {
      if (item.type === 'folder') {
        filterFunction(item.children, item);
        return;
      }

      if (!item.name.toLowerCase().includes(query.value.toLowerCase())) {
        // eslint-disable-next-line no-param-reassign
        item.isVisible = false;
      }
    });

    if (parent) {
      // eslint-disable-next-line no-param-reassign
      parent.isVisible = items.some((item) => item.isVisible !== false);
    }
  }

  filterFunction(filteredItems.value);
});
</script>
