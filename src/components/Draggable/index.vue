<template>
  <div class="draggable-container">
    <draggable
      tag="ul"
      :list="list"
      class="list-group"
      handle=".handle"
      item-key="name"
    >
      <template #item="{ element }">
        <div class="handle">
          <span class="text">{{ element.name }} </span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
defineProps({ list: Array });
</script>
<style scoped lang="scss">
.draggable-container {
  width: 100%;
  height: 100%;
  .list-group {
    .handle {
      margin-bottom: 10px;
    }
  }
}
</style>
