<template>
  <div class="parent">
    <Vue3DraggableResizable
      v-if="modules[0].isActive"
      class="module-class"
      :parent="true"
      :x="modules[0].x"
      :y="modules[0].y"
      :h="modules[0].h"
      :w="modules[0].w"
      :z="modules[0].z"
    >
      <div class="box">
        <span>0000000</span>
      </div>
    </Vue3DraggableResizable>
    <Vue3DraggableResizable
      v-if="modules[0].isActive"
      class="module-class"
      :parent="true"
      :x="modules[0].x"
      :y="modules[0].y"
      :h="modules[0].h"
      :w="modules[0].w"
      :z="modules[0].z"
    >
      <div class="box">
        <span>0000000</span>
      </div>
    </Vue3DraggableResizable>
  </div>
</template>

<script lang="ts" setup>
import Vue3DraggableResizable from 'vue3-draggable-resizable';
//default styles
// import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
// console.log('1234')

// const moduleGridWidth = 0, // 一格的宽度
//     moduleGridHeight = 0 // 一格的长度
const modules = [
  {
    index: 1,
    isActive: true,
    x: 0,
    y: 0,
    h: 200,
    w: 200,
    z: 11,
    moduleName: '',
    fixTitle: '',
  },
];
// function onResize(left, top, width, height) {
//     this.modules[this.activeIndex].x = left
//     this.modules[this.activeIndex].y = top
//     this.modules[this.activeIndex].w = width
//     this.modules[this.activeIndex].h = height
// }
// function onDrag(left, top) {
//     this.modules[this.activeIndex].x = left
//     this.modules[this.activeIndex].y = top
// }
// function onActivated(index) {
//     this.activeIndex = index
//     // if (index < 3) {
//     //     this.$refs.singleTable.bodyWrapper.scrollTop = 0
//     // } else {
//     //     this.$refs.singleTable.bodyWrapper.scrollTop = (index - 1) * 57
//     // }
//     // // 标记被选中的行
//     // this.$refs.singleTable.setCurrentRow(this.modules[index])
// }
</script>
<style scoped lang="scss">
.parent {
  width: 80%;
  height: 80%;
  position: absolute;
  border: 1px solid #000;
  user-select: none;

  .box {
    width: 100%;
    height: 100%;
    background: #ffcaa4;
  }
}
</style>
