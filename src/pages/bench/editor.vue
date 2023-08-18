<template>
  <div class="big-screen">
    <div
      ref="screenContainer"
      class="big-screen-container"
      :style="{
        width: '600px',
        height: '600px',
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
          >{{ modules[0].moduleName }}</span
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
          >{{ modules[1].moduleName }}</span
        >
      </VueDraggableResizable>
      <VueDraggableResizable
        v-if="modules[2].isActive"
        class="module-class"
        :parent="true"
        :grid="[moduleGridWidth, moduleGridHeight]"
        :x="modules[2].x"
        :y="modules[2].y"
        :h="modules[2].h"
        :w="modules[2].w"
        :z="modules[2].z"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated(2)"
      >
        <span
          :style="{
            'text-align': 'center',
            'line-height': `${modules[2].h}px`,
          }"
          >{{ modules[2].moduleName }}</span
        >
      </VueDraggableResizable>
      <VueDraggableResizable
        v-if="modules[3].isActive"
        class="module-class"
        :parent="true"
        :grid="[moduleGridWidth, moduleGridHeight]"
        :x="modules[3].x"
        :y="modules[3].y"
        :h="modules[3].h"
        :w="modules[3].w"
        :z="modules[3].z"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated(3)"
      >
        <span
          :style="{
            'text-align': 'center',
            'line-height': `${modules[3].h}px`,
          }"
          >{{ modules[3].moduleName }}</span
        >
      </VueDraggableResizable>
      <VueDraggableResizable
        v-if="modules[4].isActive"
        class="module-class"
        :parent="true"
        :grid="[moduleGridWidth, moduleGridHeight]"
        :x="modules[4].x"
        :y="modules[4].y"
        :h="modules[4].h"
        :w="modules[4].w"
        :z="modules[4].z"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated(4)"
      >
        <span
          :style="{
            'text-align': 'center',
            'line-height': `${modules[4].h}px`,
          }"
          >{{ modules[4].moduleName }}</span
        >
      </VueDraggableResizable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

import { useHomeStore } from '@/store/home.ts';
const homeDate = useHomeStore().date;
let moduleGridWidth = 50;
let moduleGridHeight = 50;
let activeIndex: 0;
const modules = [
  {
    index: 1,
    isActive: homeDate[0].default,
    x: homeDate[0].x * moduleGridWidth,
    y: homeDate[0].y * moduleGridHeight,
    h: homeDate[0].rows * moduleGridHeight,
    w: homeDate[0].cols * moduleGridWidth,
    z: homeDate[0].id,
    moduleName: homeDate[0].title,
    fixTitle: '',
  },
  {
    index: 2,
    isActive: homeDate[1].default,
    x: homeDate[1].x * moduleGridWidth,
    y: homeDate[1].y * moduleGridHeight,
    h: homeDate[1].rows * moduleGridHeight,
    w: homeDate[1].cols * moduleGridWidth,
    z: homeDate[1].id,
    moduleName: homeDate[1].title,
    fixTitle: '',
  },
  {
    index: 3,
    isActive: homeDate[2].default,
    x: homeDate[2].x * moduleGridWidth,
    y: homeDate[2].y * moduleGridHeight,
    h: homeDate[2].rows * moduleGridHeight,
    w: homeDate[2].cols * moduleGridWidth,
    z: homeDate[2].id,
    moduleName: homeDate[2].title,
    fixTitle: '',
  },
  {
    index: 4,
    isActive: homeDate[3].default,
    x: homeDate[3].x * moduleGridWidth,
    y: homeDate[3].y * moduleGridHeight,
    h: homeDate[3].rows * moduleGridHeight,
    w: homeDate[3].cols * moduleGridWidth,
    z: homeDate[3].id,
    moduleName: homeDate[3].title,
    fixTitle: '',
  },
  {
    index: 5,
    isActive: homeDate[4].default,
    x: homeDate[4].x * moduleGridWidth,
    y: homeDate[4].y * moduleGridHeight,
    h: homeDate[4].rows * moduleGridHeight,
    w: homeDate[4].cols * moduleGridWidth,
    z: homeDate[4].id,
    moduleName: homeDate[4].title,
    fixTitle: '',
  },
];
const onResize = (left, top, width, height) => {
  homeDate[activeIndex].x = left / 50;
  homeDate[activeIndex].y = top / 50;
  homeDate[activeIndex].cols = width / 50;
  homeDate[activeIndex].rows = height / 50;
};
const onDrag = (left, top) => {
  homeDate[activeIndex].x = left / 50;
  homeDate[activeIndex].y = top / 50;
};
const onActivated = (index) => {
  activeIndex = index;
};
</script>
<style scoped lang="scss">
.big-screen {
  position: relative;
  display: grid;
  padding: 1em;
  height: calc(100vh - 130px);
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);

  .big-screen-container {
    display: block;
    justify-self: center;
    background-color: rgb(121, 121, 121);
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    border: 1px solid blue;
    grid-column-start: span 6;
    grid-row-start: span 6;

    .module-class {
      display: inline-grid;
      background-color: #dfdfdf;
      border: 1px solid #6c6c6c;
      color: #000000;
      font-size: 30px;
      font-weight: bold;
      font-family: YouYuan;
    }
  }
}
</style>
