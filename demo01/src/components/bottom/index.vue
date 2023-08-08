<template>
    <div class="bottom">
        <div class="content">
            <div class="left">
                网页由 <span>要喝果粒C</span> 制作
            </div>
            <div class="right">
                <span>我是小陈</span>
                <span>我是小刘</span>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
</script>
  
<style scoped lang="scss">
.bottom{
    width:100%;
    height: 50px;
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    font-size: 14px;
    .content{
        width:1200px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            span{
                color: #f49960;
            }
        }
        .right{
            span{
                margin-right:10px;
            }
        }
    }
}
</style>
  