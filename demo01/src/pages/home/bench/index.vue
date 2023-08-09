<template>
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

    .card {
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        background: #fff;
        flex: 1;
        height: 400px;
        margin: 5px 5px;

        .head {
            height: 40px;
            flex-shrink: 0;
            padding: 15px 0 0 20px;
        }

        .body {
            flex: 1;
            margin: 10px;
            padding: 12px 15px;

        }
    }

    .el-card {
        flex: 1;
        max-width: 33%;
        height: 400px;
        margin: 5px 5px;
        display: flex;
        flex-direction: column;

        .card-header {

            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-main {}
    }
}
</style>
