<template>
    <div class="item">
        <div>
            <el-avatar :size="35" />
        </div>
        <div class="text"><span>在线用户</span>
            <el-progress :percentage="100" :format="format" />
        </div>
    </div>
    <div class="item">
        <div>
            <el-avatar :size="35" />
        </div>
        <div class="text"><span>加密许可</span>
            <el-progress :percentage="50" :format="format" />
        </div>
    </div>
    <div class="item">
        <div>
            <el-avatar :size="35" />
        </div>
        <div class="text"><span>水印许可</span>
            <el-progress :percentage="0" :format="format" />
        </div>
    </div>
</template>
<script setup lang="ts">
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>
<style scoped lang="scss">
.item {
    display: flex;
    flex-wrap: wrap;
    height: 60px;
    margin-top: 20px;
    border-bottom: 1px solid rgb(221, 219, 219);

    .text {
        width: 64px;
        height: 24px;
        margin-top: 5px;
        margin-left: 20px;
        font-size: 16px;

        .el-progress {
            margin-top: 10px;
        }
    }

    .el-progress--line {
        margin-bottom: 15px;
        width: 300px;
    }
}
</style>
