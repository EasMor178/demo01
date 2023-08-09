<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" active-text-color="#ffd04b" background-color="#576576"
        :collapse="isCollapse" text-color="#fff">

        <el-menu-item index="1">
            <el-icon>
                <SuitcaseLine />
            </el-icon>
            <template #title>工作台</template>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>终端管理</template>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon>
                <document />
            </el-icon>
            <template #title>策略管理</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>审批管理</template>
        </el-menu-item>
        <div class="changeState">
            <el-button @click="isCollapse = !isCollapse">
                <el-icon>
                    <Fold />
                </el-icon>
            </el-button>
        </div>


    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
    Document,
    Menu as IconMenu,
    SuitcaseLine,
    Setting,
    Fold,
    // Expand
} from '@element-plus/icons-vue';
let isCollapse = ref(false);

</script>

<style>
.el-menu-vertical-demo {
    height: 100vh;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    flex-shrink: 0;
}

.changeState {
    float: right;
    margin-right: 10px;
}
</style>