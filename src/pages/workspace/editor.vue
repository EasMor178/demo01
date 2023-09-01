<template>
  <div class="editor" id="editor">
    <div
      id="designContainer"
      class="design-container"
      :style="{
        width: `${designWidth}px`,
        height: `${designHeight}px`,
        'background-size': `${gridWidth}px ${gridHeight}px`,
      }"
    >
      <template v-for="(widget, index) in widgets">
        <VueDraggableResizable
          v-if="widget.handleFlag != 'delete'"
          class="widget-container"
          class-name-handle="my-handle-class"
          :style="{ 'z-index': activeIndex == index ? 1 : 0 }"
          :active="activeIndex == index"
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
        <span> 组件设置 </span>
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
import { useHomeStore } from '@/store/home.ts';
const homeStore = useHomeStore();
const homeDate = homeStore.date;
const MAX_X_NUMBER = homeStore.MAX_X_NUMBER;
const MAX_Y_NUMBER = homeStore.MAX_Y_NUMBER;
const DASHBOARD_WIDGET_TYPE = homeStore.DASHBOARD_WIDGET_TYPE;

const emit = defineEmits(['changeHome']);

let widgets = ref([]);
let gridWidth = ref(0); //一格的宽度
let gridHeight = ref(0); //一格的高度
let designWidth = ref(0); // 定制框的宽度
let designHeight = ref(0); // 定制框的高度
const minCols = 2; // 面板最小的列
const minRows = 2; // 面板最小的行
let selectedModuleType = ref(''); // 选中的功能模块类型
let activeIndex = 0;
let ELMessage_DURATION = 3;

// 初始计算尺寸
const initSize = () => {
  const editor = document.getElementById('editor');
  const width = editor.clientWidth * 0.65;
  const height = editor.clientHeight * 0.8;

  // 修正为整数
  gridWidth.value = parseInt((width / MAX_X_NUMBER).toFixed(0));
  gridHeight.value = parseInt((height / MAX_Y_NUMBER).toFixed(0));

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
const onDrag = (x: number, y: number) => {
  let widget = widgets.value[activeIndex];
  widget.x = x;
  widget.y = y;
  widget.xCols = x / gridWidth.value;
  widget.yRows = y / gridHeight.value;
};
// 放大缩小面板
const onResize = (x: number, y: number, width: number, height: number) => {
  let widget = widgets.value[activeIndex];
  widget.x = x;
  widget.y = y;
  widget.w = width;
  widget.h = height;
  widget.cols = width / gridWidth.value;
  widget.rows = height / gridHeight.value;
};
const onActivated = (index: number) => {
  activeIndex = index;
};

const onTableRowClick = (row) => {
  activeIndex = widgets.value.findIndex((item) => item.type == row.type);
};
// 添加模块
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
      let maxID = Math.max(...homeDate.map((x) => x.id));
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
        id: ++maxID,
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
// 删除模块
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
const onSaveWidgets = () => {
  widgets.value.forEach((item) => {
    // 逐个保存面板信息
    switch (item.handleFlag) {
      case 'add':
        // 新建保存
        let addWidgetInfo = {
          x: item.xCols,
          y: item.yRows,
          cols: item.cols,
          rows: item.rows,
          title: item.title,
          remark: item.remark,
          dashBoardID: item.dashBoardID,
          type: item.type,
          typeID: item.typeID,
          minCols: item.minCols,
          minRows: item.minRows,
        };
        let addParamsTitle = {
          id: item.id,
          data: addWidgetInfo,
        };
        homeStore.addParams(addParamsTitle);

        break;
      case 'update':
        // 修改保存
        let updateWidgetInfo = {
          x: item.xCols,
          y: item.yRows,
          cols: item.cols,
          rows: item.rows,
        };
        let updateParamsTitle = {
          id: item.id,
          data: updateWidgetInfo,
        };
        homeStore.updateParams(updateParamsTitle);

        break;
      case 'delete':
        // 删除保存
        let deleteParamsTitle = {
          id: item.id,
          wid: item.id,
        };
        homeStore.deleteParams(deleteParamsTitle);

        break;
    }
  });
  emit('changeHome');
};

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
  nextTick(() => {
    getInitWidgets();
  });
  window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

defineExpose({
  onSaveWidgets,
});
</script>
<style lang="scss">
.editor {
  width: 100%;
  height: calc(100vh - 100px);
  display: grid;
  // overflow-y: scroll;
  grid-template-columns: 75% 25%;
  grid-template-rows: repeat(20, 5%);

  .design-container {
    max-height: 2000px;
    grid-column: 1;
    grid-row: 2/21;
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
        padding: 14px;
        cursor: move;
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
      display: flex;
      align-items: center;
      height: 60px;
      span {
        margin-right: 20px;
        white-space: nowrap;
      }
    }
  }
}
.my-handle-class {
  position: absolute;
  -webkit-transition: all 300ms linear;
  -ms-transition: all 300ms linear;
  transition: all 300ms linear;
}

.my-handle-class-tl {
  height: 14px;
  width: 14px;
  top: 0;
  left: 0;
  z-index: 100;
  cursor: nw-resize;
}

.my-handle-class-tm {
  height: 14px;
  width: 100%;
  top: 0;
  left: 0;
  cursor: n-resize;
}

.my-handle-class-tr {
  height: 14px;
  width: 14px;
  top: 0;
  right: 0;
  z-index: 100;
  cursor: ne-resize;
}

.my-handle-class-ml {
  height: 100%;
  width: 14px;
  top: 0;
  left: 0;
  cursor: w-resize;
}

.my-handle-class-mr {
  height: 100%;
  width: 14px;
  top: 0;
  right: 0;
  cursor: e-resize;
}

.my-handle-class-bl {
  height: 14px;
  width: 14px;
  bottom: 0;
  left: 0;
  z-index: 100;
  cursor: sw-resize;
}

.my-handle-class-bm {
  height: 14px;
  width: 100%;
  bottom: 0;
  left: 0;
  cursor: s-resize;
}

.my-handle-class-br {
  height: 14px;
  width: 14px;
  bottom: 0;
  right: 0;
  z-index: 100;
  cursor: se-resize;
}
</style>
