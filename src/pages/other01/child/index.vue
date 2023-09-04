<template>
  <div class="bob">
    <span>child:</span>
    <div>
      <button
        @click="
          cSubtract();
          emit('getCNum', childNum);
        "
      >
        -
      </button>
      {{ childNum }}
      <button
        @click="
          cAdd();
          emit('getCNum', childNum);
        "
      >
        +
      </button>
    </div>
    <span>fatherNum:</span>
    <div>
      <button @click="$attrs.ftSubtract">-</button>
      <button @click="emit('faSubtract')">-</button>
      {{ fNum }}
      <button @click="emit('faAdd')">+</button>
      <button @click="$attrs.ftAdd">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const childNum = ref(1);
const cAdd = () => {
  childNum.value++;
};
const cSubtract = () => {
  childNum.value--;
};
//接受父传来的数值
defineProps({ fNum: Number });
//接受父组件传来的方法
const emit = defineEmits(['getCNum', 'faAdd', 'faSubtract']);
emit('getCNum', childNum.value);
//发送数据给父组件
defineExpose({ cSubtract, cAdd });
</script>

<style scoped>
.bob {
  font-size: 50px;
}
button {
  font-size: 50px;
  width: 100px;
  margin: 0 5px;
}
</style>
