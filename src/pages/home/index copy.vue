<template>
  <nav class="options"></nav>
  <main class="home">
    <div class="card" id="card1">
      <div class="head">
        <h1>简介</h1>
      </div>
      <div class="body">
        <ProFile />
      </div>
    </div>
    <div class="card" id="card2">
      <div class="head">
        <h1>管理</h1>
      </div>
      <div class="body">
        <Manage />
      </div>
    </div>
    <div class="card" id="card3">
      <div class="head">
        <h1>终端统计</h1>
      </div>
      <div class="body">
        <Statistics />
      </div>
    </div>
    <div class="card" id="card4">
      <div class="head">
        <h1>Others</h1>
      </div>
      <div class="body">
        <ProFile />
      </div>
    </div>
    <div class="card" id="card5">
      <div class="head">
        <h1>Others</h1>
      </div>
      <div class="body">
        <ProFile />
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
console.log(homeDate);
</script>
<style scoped lang="scss">
.options {
  width: 100%;
  height: 48px;
  background: #ffffff;
  border-bottom: 1px solid #eee;
}

.home {
  display: grid;
  grid-template-columns: repeat(12, 1pr);
  grid-template-rows: repeat(6, 1pr);
  gap: 10px;
  height: 100%;

  .card {
    border: #ddd 1px solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background: #fff;
    flex: 1;
    max-height: 400px;
    padding: 20px;

    .head {
      height: 30px;
      flex-shrink: 0;
      // padding: 15px 0 0 0;
    }

    .body {
      flex: 1;
      padding: 12px 0;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
      }
    }
  }
  #card1 {
    grid-column: 1/5;
    grid-row: 1/4;
  }
  #card2 {
    grid-column: 5/9;
    grid-row: 1/4;
  }
  #card3 {
    grid-column: 9/13;
    grid-row: 1/4;
  }
  #card4 {
    grid-column: 1/7;
    grid-row: 4/8;
  }
  #card5 {
    grid-column: 7/13;
    grid-row: 4/7;
  }
}
</style>
