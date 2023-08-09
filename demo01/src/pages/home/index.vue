<template>
    <div>
        <el-container>
            <el-header>
                <Top />
            </el-header>
            <el-main>
                <Bench />
            </el-main>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import Top from './top/index.vue';
import Bench from './bench/index.vue';
</script>
<style scoped lang="scss">
.el-container {
    min-height: 100vh;
}

.el-main {
    background: #f2f2f2;
}
</style>
