<template>
  <nav class="options">
    <span>123</span>
    <el-button @click="changeHome" type="primary">编辑/首页</el-button>
  </nav>
  <main>
    <editor v-if="!isHome"></editor>
    <home v-if="isHome"></home>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import editor from './editor.vue';
import home from './home.vue';
let isHome = ref(true);
const changeHome = () => {
  isHome.value = !isHome.value;
};
</script>
<style scoped lang="scss">
.options {
  width: 100%;
  height: 48px;
  background: #ffffff;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
