<template>
  <!-- <nav class="options"></nav> -->
  <main class="home" style="position: relative">
    <div
      :style="{
        width: homeDate[0].cols * 8.3333 + '%',
        height: homeDate[0].rows * 16.6666 + '%',
        left: homeDate[0].x * 8.3333 + '%',
        top: homeDate[0].y * 16.6666 + '%',
      }"
      style="position: absolute; padding: 10px 10px 0 10px"
    >
      <div class="card">
        <div class="head">
          <h1>{{ homeDate[0].title }}</h1>
        </div>
        <div class="body">
          <span v-html="homeDate[0].content"></span>
          <!-- <ProFile /> -->
        </div>
      </div>
    </div>
    <div
      :style="{
        width: homeDate[1].cols * 8.3333 + '%',
        height: homeDate[1].rows * 16.6666 + '%',
        left: homeDate[1].x * 8.3333 + '%',
        top: homeDate[1].y * 16.6666 + '%',
      }"
      style="position: absolute; padding: 10px 10px 0 10px"
    >
      <div class="card">
        <div class="head">
          <h1>{{ homeDate[1].title }}</h1>
        </div>
        <div class="body">
          <Manage />
        </div>
      </div>
    </div>
    <div
      :style="{
        width: homeDate[2].cols * 8.3333 + '%',
        height: homeDate[2].rows * 16.6666 + '%',
        left: homeDate[2].x * 8.3333 + '%',
        top: homeDate[2].y * 16.6666 + '%',
      }"
      style="position: absolute; padding: 10px 10px 0 10px"
    >
      <div class="card">
        <div class="head">
          <h1>{{ homeDate[2].title }}</h1>
        </div>
        <div class="body">
          <Statistics />
        </div>
      </div>
    </div>
    <div
      :style="{
        width: homeDate[3].cols * 8.3333 + '%',
        height: homeDate[3].rows * 16.6666 + '%',
        left: homeDate[3].x * 8.3333 + '%',
        top: homeDate[3].y * 16.6666 + '%',
      }"
      style="position: absolute; padding: 10px 10px 0 10px"
    >
      <div class="card">
        <div class="head">
          <h1>{{ homeDate[3].title }}</h1>
        </div>
        <div class="body">
          <ProFile />
        </div>
      </div>
    </div>
    <div
      :style="{
        width: homeDate[4].cols * 8.3333 + '%',
        height: homeDate[4].rows * 16.6666 + '%',
        left: homeDate[4].x * 8.3333 + '%',
        top: homeDate[4].y * 16.6666 + '%',
      }"
      style="position: absolute; padding: 10px 10px 0 10px"
    >
      <div class="card">
        <div class="head">
          <h1>{{ homeDate[4].title }}</h1>
        </div>
        <div class="body">
          <ProFile />
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

const homeDate = useHomeStore().date;
</script>
<style scoped lang="scss">
.options {
  width: 100%;
  height: 48px;
  background: #ffffff;
  border-bottom: 1px solid #eee;
}

.home {
  height: calc(100vh - 53px);

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
