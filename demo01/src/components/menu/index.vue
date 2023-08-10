<template>
    <el-menu default-active="1" class="el-menu-vertical-demo" active-text-color="#ffd04b" background-color="#576576"
        :collapse="isCollapse" text-color="#fff">
        <div class="top">
            <div>
                <img src="@/assets/images/logo.svg" alt="">
                <span v-show="!isCollapse">Demo01</span>
            </div>
        </div>
        <div class="item">
            <el-menu-item index="1" @click="this.$router.push('/home')">
                <el-icon>
                    <SuitcaseLine />
                </el-icon>
                <template #title>首页</template>
            </el-menu-item>
            <el-menu-item index="2" @click="this.$router.push('/bench')">
                <el-icon><icon-menu /></el-icon>
                <template #title>工作台</template>
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
        </div>
        <div class="bottom">
            <div class="button " @click=" isCollapse = !isCollapse">
                <!-- <el-icon> -->
                <icon-menu style="width: 20px; color: white;" />
                <!-- </el-icon> -->
            </div>
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
    // Fold,
    // Expand
} from '@element-plus/icons-vue';
let isCollapse = ref(false);

</script>

<style scoped lang="scss">
.el-menu {

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

    .bottom {


        .button {
            height: 30px;
            width: 30px;
            float: right;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;

            &:hover {
                background-color: #ccc;
            }
        }
    }
}



.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    flex-shrink: 0;
}
</style>