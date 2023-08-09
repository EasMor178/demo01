<template>
    <div class="container">
        <div class="top">
            <Top />
        </div>
        <div class="main">
            <Bench />
        </div>
    </div>
</template>
<script setup lang="ts">
import Top from './top/index.vue';
import Bench from './bench/index.vue';
</script>
<style scoped lang="scss">
.container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    .main {
        background: #f2f2f2;
        flex: 1;
    }
}
</style>
