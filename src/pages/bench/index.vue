<template>
  <div class="big-screen">
    <div
      ref="screenContainer"
      class="big-screen-container"
      :style="{
        width: '1200px',
        height: '80vh',
        'background-size': `${moduleGridWidth}px ${moduleGridHeight}px`,
      }"
    >
      <VueDraggableResizable
        v-if="modules[0].isActive"
        class="module-class"
        :parent="true"
        :grid="[moduleGridWidth, moduleGridHeight]"
        :x="modules[0].x"
        :y="modules[0].y"
        :h="modules[0].h"
        :w="modules[0].w"
        :z="modules[0].z"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated(0)"
      >
        <span
          :style="{
            'text-align': 'center',
            'line-height': `${modules[0].h}px`,
          }"
          >{{ 1 }}</span
        >
      </VueDraggableResizable>
      <VueDraggableResizable
        v-if="modules[1].isActive"
        class="module-class"
        :parent="true"
        :grid="[moduleGridWidth, moduleGridHeight]"
        :x="modules[1].x"
        :y="modules[1].y"
        :h="modules[1].h"
        :w="modules[1].w"
        :z="modules[1].z"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated(1)"
      >
        <span
          :style="{
            'text-align': 'center',
            'line-height': `${modules[1].h}px`,
          }"
          >{{ 2 }}</span
        >
      </VueDraggableResizable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
//default styles
// import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
// console.log('1234')

let moduleGridWidth = 50;
let moduleGridHeight = 50;
let activeIndex: 0;
// let screenWidth: 0; // 屏幕设置的宽度(画板的宽度)
// let screenHeight: 0; // 屏幕设置的高度
// let firstScreenHeight: 100;
// let userScreenWidth: 100;
// let userScreenHeight: 10;
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
  {
    index: 2,
    isActive: true,
    x: 200,
    y: 0,
    h: 200,
    w: 200,
    z: 12,
    moduleName: '',
    fixTitle: '',
  },
];
function onResize(left, top, width, height) {
  modules[activeIndex].x = left;
  modules[activeIndex].y = top;
  modules[activeIndex].w = width;
  modules[activeIndex].h = height;
}
function onDrag(left, top) {
  modules[activeIndex].x = left;
  modules[activeIndex].y = top;
}
function onActivated(index) {
  activeIndex = index;
  // if (index < 3) {
  //     this.$refs.singleTable.bodyWrapper.scrollTop = 0
  // } else {
  //     this.$refs.singleTable.bodyWrapper.scrollTop = (index - 1) * 57
  // }
  // // 标记被选中的行
  // this.$refs.singleTable.setCurrentRow(this.modules[index])
}
</script>
<style scoped lang="scss">
.parent {
  width: 80%;
  height: 80%;
  position: absolute;
  border: 1px solid #000;
  user-select: none;
}

.moduleSpan {
  align-self: center;
  justify-self: center;
}

.big-screen {
  position: relative;
  display: grid;
  padding: 1em;
  height: calc(100vh - 130px);
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: repeat(10, 10%);

  .big-screen-container {
    display: block;
    justify-self: center;
    background-color: rgb(121, 121, 121);
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    border: 1px solid blue;
    grid-column-start: span 4;
    grid-row-start: span 6;

    .module-class {
      display: inline-grid;
      background-color: #808080;
      border: 1px solid #000;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      font-family: YouYuan;
    }
  }

  .setting-table {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 8;
    grid-row-end: 11;
  }

  .module-settings {
    display: flex;
    grid-column-start: span 4;
    justify-content: space-between;
    padding-top: 1em;
    font-size: 20px;
  }

  .screen-button {
    grid-column-start: 4;
    padding-top: 1em;
  }

  .dl-icon {
    font-size: 20px;
  }

  &.screenfull {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background-color: #f0f2f5;
    overflow: auto;
  }
}
</style>
