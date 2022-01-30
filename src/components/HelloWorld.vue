<template>
  <input
    v-model="query"
    type="search"
    name="search"
    placeholder="search"
    aria-label="search"
    class="search-input"
  />

  <FileTree :items="filteredItems" class="file-tree" />

  <div>Last update: {{ createdAt }}</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import { format } from 'date-fns';
import FileTree from './FileTree.vue';
import songData from '../assets/songs.json';
import { Folder, Collection } from '../types';

const query = ref('');

const createdAt = format(songData.createdAt, 'dd-MM-yyyy HH:mm:ss');

const filteredItems = ref(cloneDeep(songData.data as Collection));

function filterFunction(items: Collection, parent?: Folder) {
  items.forEach((item) => {
    if (item.type === 'folder') {
      filterFunction(item.children, item);
      return;
    }

    // eslint-disable-next-line no-param-reassign
    item.isVisible = item.name
      .toLowerCase()
      .includes(query.value.toLowerCase());
  });

  if (parent) {
    // eslint-disable-next-line no-param-reassign
    parent.isVisible = items.some((item) => item.isVisible !== false);
  }
}

const debouncedFilter = debounce(filterFunction, 200);

watch(query, () => {
  debouncedFilter(filteredItems.value);
});
</script>

<style>
.search-input {
  padding: 8px;
  max-width: 300px;
  width: 100%;
}

.file-tree {
  max-width: 900px;
  margin: 0 auto;
}
</style>
