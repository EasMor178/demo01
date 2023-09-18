<template>
  <div class="manage">
    <div v-for="o in 100" :key="o" class="item">
      <div class="button">
        <icon-menu style="width: 30px; color: #ff9797" />
      </div>
      <span>终端管理</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Menu as IconMenu } from '@element-plus/icons-vue';
</script>
<style scoped lang="scss">
.manage {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  // align-items: center;
  overflow-y: auto;
  justify-content: center;

  .item {
    min-width: 25%;
    margin: 5px 10px 20px 10px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .button {
      height: 60px;
      width: 60px;
      float: right;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #eee;
      border-radius: 8px;

      &:hover {
        background-color: #ccc;
      }
    }

    span {
      margin-top: 5px;
    }
  }
}
.manage::-webkit-scrollbar {
  display: none;
}
</style>
