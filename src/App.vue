<template>
  <div class="app">
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
<script setup lang="ts"></script>
<style scoped lang="scss">
.app {
  display: flex;

  .context {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    // .top {
    //   // box-shadow: 0px 12px 8px -12px #000;
    // }

    .main {
      background: #f9f9f9;
      flex: 1;
    }
  }
}
</style>
