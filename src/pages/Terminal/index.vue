<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>全部产品</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon>
        <document />
      </el-icon>
      <span>组织产品</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <span>团队产品</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue';
</script>
<style lang="scss" scoped>
.el-menu {
  width: 200px;
  height: 100%;
}
</style>
