<template>
  <main class="home" style="position: relative">
    <div
      v-for="item in homeDate"
      :style="{
        width: item.cols * gridWidth + '%',
        height: item.rows * gridHeight + '%',
        left: item.x * gridWidth + '%',
        top: item.y * gridHeight + '%',
      }"
      style="position: absolute; padding: 10px 10px 0 10px"
    >
      <div class="card">
        <div class="head">
          <h1>{{ item.title }}</h1>
        </div>
        <div class="body">
          <span v-html="item.content" v-if="item.typeID == 1"></span>
          <!-- <ProFile /> -->
          <Manage v-if="item.typeID == 2" />
          <Statistics v-if="item.typeID == 3" />
          <ProFile v-if="item.typeID == 4" />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import ProFile from './profile/index.vue';
import Manage from './manage/index.vue';
import Statistics from './statistics/index.vue';
import { useHomeStore } from '@/store/home';
const homeStore = useHomeStore();
const homeDate = homeStore.date;
const gridWidth = 100 / homeStore.MAX_X_NUMBER;
const gridHeight = 100 / homeStore.MAX_Y_NUMBER;
</script>
<style scoped lang="scss">
.home {
  height: calc(100vh - 110px);
  overflow-y: scroll;

  .card {
    height: 100%;
    border: #ddd 1px solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 20px;

    .head {
      height: 30px;
      flex-shrink: 0;
    }

    .body {
      padding: 20px 0 10px 0;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
      }
    }
  }
}
</style>
