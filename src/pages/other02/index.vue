<template>
  <div v-for="(item, index) in items">
    <vue-draggable-resizable
      class-name-handle="my-handle-class"
      style="cursor: move"
      @activated="onActivated(index)"
      @deactivated="onDeactivated(index)"
    >
      <p>
        You can provide a default class name for handle using the
        <b>class-name-handle</b> prop.
        {{ item }}
      </p>
    </vue-draggable-resizable>
  </div>
</template>

<script lang="ts" setup>
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue';
const items = [{ id: 1 }, { id: 2 }];
const onActivated = (index: number) => {
  console.log('Activated', index);
};
const onDeactivated = (index: number) => {
  console.log('Deactivated', index);
};
</script>
