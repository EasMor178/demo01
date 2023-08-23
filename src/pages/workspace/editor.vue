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
          :parent="false"
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
    <div class="widget-settings">
      <div class="setting-header">
        <span style="margin-right: 20px; z-index: 1"> 组件设置 </span>
        <el-select
          v-model="selectedModuleType"
          style="width: 170px; margin-right: 5px"
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
        <el-button title="新增" @click="onAddWidget">
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
              <el-button @click.prevent="onDeleteWidget(scope.row)">
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import { Plus, Delete } from '@element-plus/icons-vue';
// import { onMounted, onBeforeUnmount, ref, nextTick, computed } from 'vue';
import { useHomeStore } from '@/store/home.ts';
const homeDate = useHomeStore().date;

let gridWidth = ref(0); //一格的宽度
let gridHeight = ref(0); //一格的高度
let designWidth = ref(0); // 定制框的宽度
let designHeight = ref(0); // 定制框的高度
let widgets = ref([]);
const minCols = 2; // 面板最小的列
const minRows = 2; // 面板最小的行
const MAX_X_NUMBER = 12; // 屏幕X轴分成12列
const MAX_Y_NUMBER = 6; // 屏幕Y轴分成6行
const DASHBOARD_WIDGET_TYPE = [
  {
    typeID: 1,
    type: 'intro',
    title: '简介',
    remark: '本系统简介',
    components: 'eDSCompCustomize',
  },
  {
    typeID: 2,
    type: 'mgr',
    title: '管理',
    remark: '系统管理功能入口',
    components: 'eDSCompCommand',
  },
  {
    typeID: 3,
    type: 'terminal-stat',
    title: '终端统计',
    remark: '终端用户数、许可使用情况统计',
    components: 'eDSCompTerminalStats',
  },
  {
    typeID: 4,
    type: 'my-task',
    title: '我的任务',
    remark: '我的待审批任务列表',
    components: 'eDSCompMyTask',
  },
  {
    typeID: 5,
    type: 'my-app',
    title: '我的申请',
    remark: '我的申请列表',
    components: 'eDSCompMyApply',
  },
];
let selectedModuleType = ref(''); // 选中的功能模块类型
let activeIndex = 0;
let ELMessage_DURATION = 3;

// const editor = document.getElementById('editor');
// 初始计算尺寸
const initSize = () => {
  const designContainer = document.getElementById('designContainer');
  designWidth.value = designContainer.clientWidth;
  designHeight.value = designContainer.clientHeight;
  gridWidth.value = parseInt((designWidth.value / MAX_X_NUMBER).toFixed(0));
  gridHeight.value = parseInt((designHeight.value / MAX_Y_NUMBER).toFixed(0));
  // 修正为整数
  designWidth.value = gridWidth.value * MAX_X_NUMBER;
  designHeight.value = gridHeight.value * MAX_Y_NUMBER;
};
// 获取初始面板
const getInitWidgets = () => {
  if (homeDate) {
    homeDate.forEach((item) => {
      widgets.value.push({
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
// 重新计算面板尺寸（页面尺寸调整时，例：F12）
const refreshWidgetSize = () => {
  widgets.value.forEach((item) => {
    item.x = designWidth.value * ((1 / MAX_X_NUMBER) * item.xCols);
    item.y = designHeight.value * ((1 / MAX_Y_NUMBER) * item.yRows);
    item.w = designWidth.value * ((1 / MAX_X_NUMBER) * item.cols);
    item.h = designHeight.value * ((1 / MAX_Y_NUMBER) * item.rows);
  });
};
// 拖拽面板
const onDrag = (left: number, top: number) => {
  homeDate[activeIndex].x = left / gridWidth.value;
  homeDate[activeIndex].y = top / gridHeight.value;
};
// 放大缩小面板
const onResize = (left: number, top: number, width: number, height: number) => {
  homeDate[activeIndex].x = left / gridWidth.value;
  homeDate[activeIndex].y = top / gridHeight.value;
  homeDate[activeIndex].cols = width / gridWidth.value;
  homeDate[activeIndex].rows = height / gridHeight.value;
};
const onActivated = (index: number) => {
  activeIndex = index;
};

const onTableRowClick = (row) => {
  activeIndex = widgets.value.findIndex((item) => item.type == row.type);
};
//添加模块
const onAddWidget = () => {
  if (selectedModuleType.value == '') {
    ElMessage({
      message: '请选择添加的功能模块',
      type: 'error',
      duration: ELMessage_DURATION,
    });
  } else {
    // 判断相同类型模块是否已经存在
    let index = widgets.value.findIndex(
      (item) =>
        item.type == selectedModuleType.value && item.handleFlag != 'delete'
    );
    if (index != -1) {
      ElMessage({
        message: '该功能模块已经存在',
        type: 'error',
        duration: ELMessage_DURATION,
      });
    } else {
      let index = DASHBOARD_WIDGET_TYPE.findIndex(
        (item) => item.type == selectedModuleType.value
      );
      let selectedModule = DASHBOARD_WIDGET_TYPE[index];

      widgets.value.push({
        handleFlag: 'add',
        title: selectedModule.title,
        remark: selectedModule.remark,
        xCols: 0,
        yRows: 0,
        cols: 2,
        rows: 2,
        x: 0,
        y: 0,
        h: gridHeight.value * 2,
        w: gridWidth.value * 2,
        z: 0,
        // dashBoardID: dashboardInfo.id,
        type: selectedModule.type,
        typeID: selectedModule.typeID,
        minCols: minCols,
        minRows: minRows,
      });
      // 新增的自动获取焦点
      activeIndex = widgets.value.length - 1;
    }
  }
};
//删除模块
const onDeleteWidget = (widget) => {
  ElMessageBox.confirm('确定删除【' + widget.title + '】面板', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    dangerouslyUseHTMLString: true,
  })
    .then(() => {
      switch (widget.handleFlag) {
        case 'update': {
          widget.handleFlag = 'delete';
          break;
        }
        case 'add': {
          let index = widgets.value.findIndex(
            (item) => item.type == widget.type
          );
          widgets.value.splice(index, 1);
          break;
        }
      }
    })
    .catch(() => {});
};

// 保存（外部页面调用）
// const onSaveWidgets = () => {
//   widgets.forEach((item) => {
//     // 逐个保存面板信息
//     switch (item.handleFlag) {
//       case 'add':
//         // 新建保存
//         let addWidgetInfo = {
//           x: item.xCols,
//           y: item.yRows,
//           cols: item.cols,
//           rows: item.rows,
//           title: item.title,
//           remark: item.remark,
//           dashBoardID: item.dashBoardID,
//           type: item.type,
//           typeID: item.typeID,
//           minCols: item.minCols,
//           minRows: item.minRows,
//         };
//         let addParams = {
//           id: item.dashBoardID,
//           wid: item.id,
//           data: addWidgetInfo,
//         };
//         storeDashboard()
//           .createDashboardWidget(addParams)
//           .then(
//             () => {},
//             () => {}
//           );
//         break;
//       case 'update':
//         // 修改保存
//         let updateWidgetInfo = {
//           x: item.xCols,
//           y: item.yRows,
//           cols: item.cols,
//           rows: item.rows,
//         };
//         let updateParams = {
//           id: item.dashBoardID,
//           wid: item.id,
//           data: updateWidgetInfo,
//         };
//         storeDashboard()
//           .updateDashboardWidget(updateParams)
//           .then(
//             () => {},
//             () => {}
//           );
//         break;
//       case 'delete':
//         // 删除保存
//         let deleteParams = {
//           id: item.dashBoardID,
//           wid: item.id,
//         };
//         storeDashboard()
//           .deleteDashboardWidget(deleteParams)
//           .then(
//             () => {},
//             () => {}
//           );
//         break;
//     }
//   });
// };

// 表格里面的数据
const designWidgets = computed(() => {
  return widgets.value.filter((item) => item.handleFlag != 'delete');
});

// 处理resize后的显示
const handleResize = () => {
  // 重新计算尺寸
  initSize();
  // 重新计算面板尺寸
  nextTick(() => {
    refreshWidgetSize();
  });
};

onMounted(() => {
  initSize();
  getInitWidgets();
  window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
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
