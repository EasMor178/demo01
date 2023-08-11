<template>
    <div class="top">
        <div class="content">
            <div class="left">
                <p class="logoText">TEST</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <p class="login">登录注册</p>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
</script>
  
<style scoped lang="scss">
.top {
    z-index: 999;
    width: 100%;
    height: 52px;
    background: #fff;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #eee;

    .content {
        width: 100%;
        height: 50px;
        background: #fff;
        display: flex;
        justify-content: space-between;

        .left {
            margin-left: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }

            P {
                font-size: 20px;
                color: #55a6fe;

                span {
                    font-size: 20px;
                    color: black;
                    margin-left: 5px;
                }
            }
        }

        .right {
            margin-right: 10px;
            align-items: center;
            justify-content: center;
            display: flex;
            font-size: 14px;

            .help {
                margin-right: 10px;
            }
        }
    }
}
</style>
  