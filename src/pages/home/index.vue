<template>
  <div class="options"></div>
  <div class="bench">
    <div class="card">
      <div class="head">
        <h1>简介</h1>
      </div>
      <div class="body">
        <ProFile />
      </div>
    </div>
    <div class="card">
      <div class="head">
        <h1>管理</h1>
      </div>
      <div class="body">
        <Manage />
      </div>
    </div>
    <div class="card">
      <div class="head">
        <h1>终端统计</h1>
      </div>
      <div class="body">
        <Statistics />
      </div>
    </div>
    <div class="card">
      <div class="head">
        <h1>Others</h1>
      </div>
      <div class="body">
        <ProFile />
      </div>
    </div>
    <div class="card">
      <div class="head">
        <h1>Others</h1>
      </div>
      <div class="body">
        <ProFile />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProFile from './profile/index.vue';
import Manage from './manage/index.vue';
import Statistics from './statistics/index.vue';
</script>
<style scoped lang="scss">
.options {
  width: 100%;
  height: 48px;
  background: #ffffff;
  border-bottom: 1px solid #eee;
}

.bench {
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  .card {
    border: #ddd 1px solid;
    min-width: 25%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background: #fff;
    flex: 1;
    height: 400px;
    margin: 5px 5px;
    padding: 10px 20px 20px 20px;

    .head {
      height: 40px;
      flex-shrink: 0;
      padding: 15px 0 0 0;
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
}
</style>
