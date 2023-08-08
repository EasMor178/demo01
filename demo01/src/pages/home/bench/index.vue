<template>
    <div class="bench">
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="hover"> 1234567890</el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover"> 1234567890</el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover"> 1234567890</el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="12">
                <el-card shadow="hover"> 1234567890</el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover"> 1234567890</el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.bench {
    width: 1000px;

}
</style>
