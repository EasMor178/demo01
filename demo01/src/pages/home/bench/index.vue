<template>
    <div class="bench">
        <el-row :gutter="12">
            <el-card class="box-card" v-for="o in 6" :key="o">
                <template #header>
                    <div class="card-header">
                        <span>{{ 'Card ' + o }}</span>
                        <el-button class="button" text>Operation button</el-button>
                    </div>
                </template>
                <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
            </el-card>
        </el-row>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.el-card {
    margin: 10px 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 360px;
}
</style>
