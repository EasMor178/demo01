<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    active-text-color="#ffd04b"
    background-color="rgb(72,82,92)"
    :collapse="isCollapse"
    text-color="#fff"
  >
    <div class="top">
      <div>
        <img src="@/assets/images/logo.svg" alt="" />
        <span v-show="!isCollapse">Demo01</span>
      </div>
    </div>
    <div class="item">
      <el-menu-item index="1" @click="toPage('/Workbench')">
        <el-icon>
          <SuitcaseLine />
        </el-icon>
        <template #title>工作台</template>
      </el-menu-item>
      <el-menu-item index="2" @click="toPage('/Terminal')">
        <el-icon><icon-menu /></el-icon>
        <template #title>终端管理</template>
      </el-menu-item>
      <el-menu-item index="3" @click="toPage('/Strategy')">
        <el-icon>
          <document />
        </el-icon>
        <template #title>策略管理</template>
      </el-menu-item>
      <el-menu-item index="4" @click="toPage('/Section')">
        <el-icon>
          <setting />
        </el-icon>
        <template #title>部门管理</template>
      </el-menu-item>
      <el-menu-item index="5" @click="toPage('/Form')">
        <el-icon>
          <setting />
        </el-icon>
        <template #title>在线表格</template>
      </el-menu-item>
    </div>
    <div class="bottom">
      <a href="#" v-show="!isCollapse">
        <setting style="width: 20px; color: white" />
        <span style="color: white">管理后台</span>
      </a>
      <span class="button" @click="disCollapse">
        <Expand v-show="isCollapse" class="icon" />
        <Fold v-show="!isCollapse" class="icon" />
      </span>
    </div>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  SuitcaseLine,
  Setting,
  Fold,
  Expand,
} from '@element-plus/icons-vue';

const isCollapse = ref<boolean>(false);
const disCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

//路由跳转
import { useRouter } from 'vue-router';
const router = useRouter();
const toPage = (url: string) => {
  router.replace({ path: url });
  // router.push({ path: url }); //历史记录
};
</script>

<style scoped lang="scss">
.el-menu {
  height: 100vh;

  .top {
    height: 70px;
    display: flex;
    align-items: center;

    div {
      flex: 1;
      display: flex;
      margin: 10px 0;
      padding: 10px 17px;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
      }

      span {
        margin-left: 5px;
        font-size: 25px;
        color: white;
      }
    }
  }

  .item {
    height: calc(100vh - 120px);
  }

  .bottom {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    border-top: 1px solid rgb(118, 118, 118);

    a {
      display: flex;
      white-space: nowrap;
      align-items: center;
      overflow: hidden;
    }

    .button {
      height: 30px;
      width: 40px;
      border-radius: 5px;
      transition: 0.25s;
      position: relative;
      .icon {
        position: absolute;
        height: 24px;
        width: 24px;
        top: 50%;
        left: 50%;
        margin-top: -12px;
        margin-left: -12px;
        color: white;
      }

      &:hover {
        background-color: #3f3f3f;
        cursor: pointer;
      }
    }
  }
}
.el-menu-item {
  height: 50px;
  margin: 2px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  flex-shrink: 0;
}
</style>
