<template>
  <vue-draggable-resizable
    class-name-handle="my-handle-class"
    style="cursor: move"
  >
    <p>
      You can provide a default class name for handle using the
      <b>class-name-handle</b> prop.
    </p>
  </vue-draggable-resizable>
</template>

<script lang="ts" setup>
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue';
</script>
