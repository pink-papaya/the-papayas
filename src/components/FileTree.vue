<template>
  <div>
    <div
      v-for="item in items"
      :key="item.name"
      :class="item.type"
      class="item"
      @click.self="toggle(item)"
    >
      <span v-if="item.type === 'folder'">📁</span>
      <span v-if="item.type === 'song'">♫</span>

      {{ item.name }}

      <div v-if="item.type === 'folder' && item.children" class="children">
         <FileTree v-show="itemStateMap[item.name]" :items="item.children" />
      </div>
    </div>
  </div>
</template>

<script setup lang=ts>
  import { ref } from 'vue';
  import { Folder, Song } from '../types';

  defineProps<{ items: (Folder|Song)[] }>()

  const itemStateMap = ref<Record<string, boolean>>({});

  function toggle(item: Folder | Song) {
    if (item.type === 'folder') {
      itemStateMap.value[item.name] = !itemStateMap.value[item.name];
    }
  }
</script>

<style lang="css">
.item  {
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
}
</style>