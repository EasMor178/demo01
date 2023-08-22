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
      <el-menu-item index="1" @click="goWorkspace">
        <el-icon>
          <SuitcaseLine />
        </el-icon>
        <template #title>工作台</template>
      </el-menu-item>
      <el-menu-item index="2" @click="goWorkspace">
        <el-icon><icon-menu /></el-icon>
        <template #title>管理</template>
      </el-menu-item>
      <el-menu-item index="3" @click="goOther01">
        <el-icon>
          <document />
        </el-icon>
        <template #title>策略管理</template>
      </el-menu-item>
      <el-menu-item index="4" @click="goOther02">
        <el-icon>
          <setting />
        </el-icon>
        <template #title>审批管理</template>
      </el-menu-item>
    </div>
    <div>
      <el-menu-item index="5" v-show="isCollapse">
        <el-icon>
          <setting />
        </el-icon>
        <template #title>管理后台</template>
      </el-menu-item>
      <el-menu-item index="6" @click="disCollapse" v-show="isCollapse">
        <el-icon>
          <Fold />
        </el-icon>
        <template #title>隐藏</template>
      </el-menu-item>
    </div>
    <div class="bottom" v-show="!isCollapse">
      <a href="#">
        <setting style="width: 20px; color: white" />
        <span style="color: white">管理后台</span>
      </a>
      <span class="button" @click="disCollapse" v-show="!isCollapse">
        <!-- <el-icon> -->
        <!-- <Expand v-show="isCollapse" style="width: 20px; color: white;" /> -->
        <Fold style="width: 20px; color: white" />
        <!-- </el-icon> -->
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
  // Expand
} from '@element-plus/icons-vue';

import { ref } from 'vue';
const isCollapse = ref<boolean>(false);
const disCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

import { useRouter } from 'vue-router';
let $router = useRouter();

const goWorkspace = () => {
  $router.push({ path: '/workspace' });
};
const goOther01 = () => {
  $router.push({ path: '/other01' });
};
const goOther02 = () => {
  $router.push({ path: '/other02' });
};
</script>

<style scoped lang="scss">
.el-menu {
  display: flex;
  flex-direction: column;

  height: 100vh;

  .top {
    height: 72px;
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
    flex: 1;
  }

  .bottom {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    border-top: 1px solid rgb(118, 118, 118);

    a {
      display: flex;
      // max-height: 0px;
      white-space: nowrap;
      align-items: center;
      overflow: hidden;
    }

    .button {
      height: 30px;
      width: 30px;
      // float: right;
      // margin: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      &:hover {
        background-color: #3f3f3f;
      }
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  flex-shrink: 0;
}
</style>
