<template>
  <div class="container">
    <Menu />
    <div class="context">
      <div class="top">
        <Top />
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Top from '@/components/top/index.vue';
import Menu from "@/components/menu/index.vue";
// import home from "./pages/home/index.vue";
</script>
<style scoped lang="scss">
.container {
  display: flex;

  .context {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .top {
      box-shadow: 0px 12px 8px -12px #000;
    }

    .main {
      background: #f9f9f9;
      flex: 1;
      overflow-y: scroll;
    }
  }
}
</style>
