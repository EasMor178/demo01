<template>
  <div class="bob">
    <span>father:</span>
    <div>
      <button @click="fSubtract">-</button>
      {{ fatherNum }}
      <button @click="fAdd">+</button>
    </div>
    <span>childNum:</span>
    <div>
      <button @click="cNum.cSubtract">-</button>
      <!-- <span v-if="cNum.childNum">
        {{ cNum.childNum }}
      </span> -->
      <button @click="cNum.cAdd">+</button>
    </div>
  </div>
  <hr />
  <child
    ref="cNum"
    @getCNum="getChildNum"
    @faAdd="fAdd"
    @faSubtract="fSubtract"
    data="123"
    :fNum="fatherNum"
    :ftAdd="fAdd"
    :ftSubtract="fSubtract"
  ></child>
</template>

<script setup lang="ts">
import child from './child/index.vue';

const fatherNum = ref(1);
const childNum = ref(1);
const fAdd = () => {
  fatherNum.value++;
};
const fSubtract = () => {
  fatherNum.value--;
};
const getChildNum = (num: number) => {
  childNum.value = num;
};
const cNum = ref();
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
