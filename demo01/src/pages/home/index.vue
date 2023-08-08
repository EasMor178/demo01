<template>
    <div class="common-layout">
        <el-container>
            <Aside />
            <el-aside width="200px">
            </el-aside>
            <el-main>
                <Home />
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Home from './home/index.vue';
import Aside from './aside/index.vue';
</script>