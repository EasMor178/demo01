<template>
  <div class="editor" id="editer">
    <div
      id="designContainer"
      class="design-container"
      :style="{
        'background-size': `${gridWidth}px ${gridHeight}px`,
      }"
    >
      <template v-for="(widget, index) in widgets" :key="widget.index">
        <VueDraggableResizable
          v-if="widget.handleFlag != 'delete'"
          class="widget-container"
          :parent="true"
          :grid="[gridWidth, gridHeight]"
          :x="widget.x"
          :y="widget.y"
          :h="widget.h"
          :w="widget.w"
          :z="widget.z"
          :minWidth="gridWidth * minCols"
          :minHeight="gridHeight * minRows"
          @dragging="onDrag"
          @resizing="onResize"
          @activated="onActivated(index)"
        >
          <div class="widget-content">{{ widget.title }}</div>
        </VueDraggableResizable>
      </template>
    </div>
    <!-- <div class="widget-settings">
      <div class="setting-header">
        <span style="margin-right: 15px; z-index: 1">组件设置 </span>
        <el-select
          v-model="selectedModuleType"
          style="width: 150px; margin-right: 2px"
          placeholder="组件类型"
          clearable
        >
          <el-option
            v-for="item in DASHBOARD_WIDGET_TYPE"
            :key="item.type"
            :label="item.title"
            :value="item.type"
          />
        </el-select>
        <el-button title="新增" text style="border: none" @click="onAddWidget">
          <el-icon>
            <Plus />
          </el-icon>
        </el-button>
      </div>
      <div class="setting-table">
        <el-table
          ref="widgetTableRef"
          :data="designWidgets"
          style="width: 400px"
          height="100%"
          highlight-current-row
          :header-cell-style="{ background: 'RGB(236,246,215)' }"
          border
          @row-click="onTableRowClick"
        >
          <el-table-column type="index" width="50" />
          <el-table-column
            :show-overflow-tooltip="true"
            prop="title"
            label="功能模块"
            min-width="100"
          >
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button @click.native.prevent="onDeleteWidget(scope.row)">
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import { onMounted, ref } from 'vue';
import { useHomeStore } from '@/store/home.ts';
const homeDate = useHomeStore().date;

let gridWidth = ref(62); //一格的宽度
let gridHeight = ref(50); //一格的高度
const minCols = 2; // 面板最小的列
let minRows = 2; // 面板最小的行;
let widgets = [];
const MAX_X_NUMBER = 12; // 屏幕X轴分成12列
const MAX_Y_NUMBER = 6; // 屏幕Y轴分成6行
let designWidth = ref(0); // 定制框的宽度
let designHeight = ref(0); // 定制框的高度

// 初始化;
// const editor = document.getElementById('editor');
const initSize = () => {
  const designContainer = document.getElementById('designContainer');
  designWidth.value = designContainer.clientWidth;
  designHeight.value = designContainer.clientHeight;
  gridWidth.value = parseInt((designWidth.value / MAX_X_NUMBER).toFixed(0));
  gridHeight.value = parseInt((designHeight.value / MAX_Y_NUMBER).toFixed(0));
  console.log(gridWidth.value);
  // 修正为整数
  designWidth.value = gridWidth.value * MAX_X_NUMBER;
  designHeight.value = gridHeight.value * MAX_Y_NUMBER;
};
const getInitWidgets = () => {
  if (homeDate) {
    homeDate.forEach((item) => {
      widgets.push({
        handleFlag: 'update',
        id: item.id,
        title: item.title,
        xCols: item.x,
        yRows: item.y,
        cols: item.cols,
        rows: item.rows,
        x: designWidth.value * ((1 / MAX_X_NUMBER) * item.x),
        y: designHeight.value * ((1 / MAX_Y_NUMBER) * item.y),
        w: designWidth.value * ((1 / MAX_X_NUMBER) * item.cols),
        h: designHeight.value * ((1 / MAX_Y_NUMBER) * item.rows),
        z: 0,
        dashBoardID: item.dashBoardID,
        type: item.type,
        typeID: item.typeID,
      });
    });
  }
};
onMounted(() => {
  initSize();
  getInitWidgets();
  console.log(widgets);
});

// const DASHBOARD_WIDGET_TYPE = [
//   {
//     typeID: 1,
//     type: 'intro',
//     title: '简介',
//     remark: '本系统简介',
//     components: 'eDSCompCustomize',
//   },
//   {
//     typeID: 2,
//     type: 'mgr',
//     title: '管理',
//     remark: '系统管理功能入口',
//     components: 'eDSCompCommand',
//   },
//   {
//     typeID: 3,
//     type: 'terminal-stat',
//     title: '终端统计',
//     remark: '终端用户数、许可使用情况统计',
//     components: 'eDSCompTerminalStats',
//   },
//   {
//     typeID: 4,
//     type: 'my-task',
//     title: '我的任务',
//     remark: '我的待审批任务列表',
//     components: 'eDSCompMyTask',
//   },
//   {
//     typeID: 5,
//     type: 'my-app',
//     title: '我的申请',
//     remark: '我的申请列表',
//     components: 'eDSCompMyApply',
//   },
// ];

// let selectedModuleType = ''; // 选中的功能模块类型
// const onAddWidget = () => {};

//移动
let activeIndex = 0;
const onResize = (left: number, top: number, width: number, height: number) => {
  homeDate[activeIndex].x = left / gridWidth.value;
  homeDate[activeIndex].y = top / gridHeight.value;
  homeDate[activeIndex].cols = width / gridWidth.value;
  homeDate[activeIndex].rows = height / gridHeight.value;
};
const onDrag = (left: number, top: number) => {
  homeDate[activeIndex].x = left / gridWidth.value;
  homeDate[activeIndex].y = top / gridHeight.value;
};
const onActivated = (index: number) => {
  activeIndex = index;
};
</script>
<style scoped lang="scss">
.editor {
  width: 100%;
  height: calc(100vh - 100px);
  display: grid;
  // overflow-y: scroll;
  grid-template-columns: 75% 25%;
  grid-template-rows: repeat(20, 5%);

  .design-container {
    overflow-y: hidden;
    max-height: 2000px;

    grid-column: 1;
    grid-row: 2/21;
    width: 80%;
    height: 80%;
    justify-self: center;
    border: 1px solid #808080;
    display: block;
    background-color: rgb(121, 121, 121);
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    .widget-container {
      display: inline-grid;
      background-color: #999999;
      border: 1px solid #000;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      font-family: YouYuan;
      .widget-content {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .widget-settings {
    display: flex;
    flex-direction: column;

    grid-column: 2;
    grid-row: 2/21;
    // background: #999999;
    .setting-header {
      height: 60px;
    }
  }
}
</style>
