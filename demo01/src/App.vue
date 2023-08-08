<template>
  <div class="container">
    <Menu></Menu>
    <div class="context">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
// import home from "./pages/home/index.vue";
</script>
<style scoped lang="scss">
.container {
  display: flex;
}
</style>
