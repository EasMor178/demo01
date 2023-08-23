<template>
  <nav>
    <span>这是一个测试页</span>
    <div class="rightHome" v-if="isHome">
      <el-button @click="changeHome" type="primary">
        <el-icon :size="20" style="margin-right: 5px"> <Edit /> </el-icon>
        编辑
      </el-button>
      <el-button type="primary">
        <el-icon :size="20" style="margin-right: 5px"><MagicStick /></el-icon
        >刷新
      </el-button>
    </div>
    <div class="rightSetting" v-if="!isHome">
      <el-button @click="onSaveWidgets" type="primary">
        <el-icon :size="20" style="margin-right: 5px"> <Check /> </el-icon>
        保存
      </el-button>
      <el-button @click="changeHome" type="primary">
        <el-icon :size="20" style="margin-right: 5px"><Close /></el-icon>
        取消
      </el-button>
    </div>
  </nav>
  <main>
    <editor v-if="!isHome"></editor>
    <home v-if="isHome"></home>
  </main>
</template>
<script setup lang="ts">
import { Edit, MagicStick, Check, Close } from '@element-plus/icons-vue';
import editor from './editor.vue';
import home from './home.vue';
let isHome = ref(true);
const changeHome = () => {
  isHome.value = !isHome.value;
};

const onSaveWidgets = () => {
  ElMessageBox.confirm(
    '确定保存修改?',
    // 'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      // type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '修改成功！！！',
      });
      changeHome();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改！！！',
      });
    });
};
</script>
<style scoped lang="scss">
nav {
  width: 100%;
  height: 48px;
  background: #ffffff;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .el-button {
    margin-left: 20px;
  }
}
main {
  height: 100%;
  width: 100%;
  padding: 5px;
  overflow: hidden;
}
</style>
