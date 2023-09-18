<template>
  <div class="left-container">
    <span class="title">可拖动数组</span>
    <div class="draggable">
      <Draggable :list="list"></Draggable>
    </div>
  </div>
</template>
<script setup lang="ts">
import Draggable from '@/components/Draggable/index.vue';

const list = [
  { name: 'AAA', id: 0 },
  { name: 'BBB', id: 1 },
  { name: 'CCC', id: 2 },
  { name: 'DDD', id: 3 },
];
</script>
<style scoped lang="scss">
.left-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  .title {
    line-height: 30px;
  }
  .draggable {
    padding-top: 20px;
  }
}
</style>
