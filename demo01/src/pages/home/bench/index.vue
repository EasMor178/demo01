<template>
    <div class="bench">
        <el-card shadow="never">
            <div class="card-header">
                <h1>简介</h1>
                <el-button class="button" text>--</el-button>
            </div>
            <ProFile />
        </el-card>
        <el-card shadow="never">
            <div class="card-header">
                <h1>管理</h1>
                <el-button class="button" text>--</el-button>
            </div>
            <Manage />
        </el-card>
        <el-card shadow="never">
            <div class="card-header">
                <h1>终端统计</h1>
                <el-button class="button" text>--</el-button>
            </div>
            <Statistics />
        </el-card>
    </div>
</template>
<script setup lang="ts">
import ProFile from "./profile/index.vue";
import Manage from "./manage/index.vue";
import Statistics from "./statistics/index.vue";
</script>
<style scoped lang="scss">
.bench {
    display: flex;
    flex-wrap: wrap;

    .el-card {
        flex: 1;
        height: 400px;
        margin: 5px 5px;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
