<template>
  <div class="section-container">
    <div class="left">
      <Left></Left>
    </div>
    <div class="right"></div>
  </div>
</template>
<script setup lang="ts">
import Left from './Left/index.vue';
</script>
<style scoped lang="scss">
.section-container {
  display: flex;
  width: 100%;
  height: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  .left {
    width: 20%;
    height: 100%;
    border-right: 2px solid #ccc;
  }
  .right {
    width: 80%;
    height: 100%;
  }
}
</style>
