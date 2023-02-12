<template>
  <div class="sticky top-0 z-20 bg-slate-900 p-4 py-5 sm:py-10">
    <input
      v-model="query"
      type="search"
      name="search"
      placeholder="Search"
      aria-label="Search"
      class="w-full max-w-[300px] rounded-md bg-slate-500 p-2 text-slate-900 placeholder:text-slate-800 focus:border-transparent focus:bg-slate-400 focus:ring-1 focus:ring-pink-300"
    />
  </div>
  <FileTree :items="filteredItems" class="file-tree sticky rounded-lg" />
  <span v-show="!resultsCount" class="text-pink-400"
    >We don't have that song... yet.</span
  >

  <footer class="text-shadow px-2 py-4 text-pink-200">
    Last update: {{ createdAt }}
  </footer>
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

// start count at 1 to hide message on first load
const resultsCount = ref(1);

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

    if (item.isVisible) {
      resultsCount.value += 1;
    }
  });

  if (parent) {
    // eslint-disable-next-line no-param-reassign
    parent.isVisible = items.some((item) => item.isVisible !== false);
  }
}

const debouncedFilter = debounce(filterFunction, 200);

watch(query, () => {
  resultsCount.value = 0;
  debouncedFilter(filteredItems.value);
});
</script>

<style>
.file-tree {
  max-width: 900px;
  margin: 0 auto;
}
</style>
