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
          :style="{
            'z-index': activeWidget.index == index ? 1 : 0,
            'background-color':
              activeWidget.index == index
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(255, 255, 255, 0.1)',
          }"
          :parent="false"
          :grid="[gridWidth, gridHeight]"
          :x="widget.x"
          :y="widget.y"
          :h="widget.h"
          :w="widget.w"
          :z="widget.z"
          :minWidth="gridWidth * minCols"
          :minHeight="gridHeight * minRows"
          @activated="onActivated(index)"
          @dragging="onDrag"
          @resizing="onResize"
          @deactivated="onDeactivated"
        >
          <div class="widget-content">{{ widget.title }}</div>
        </VueDraggableResizable>
      </template>
    </div>
    <div class="widget-settings">
      <div class="setting-header">
        <span style="margin-right: 5px; white-space: nowrap"> 组件设置： </span>
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

const widgets = reactive([]); // 格子数组
const gridWidth = ref(0); //一格的宽度
const gridHeight = ref(0); //一格的高度
const designWidth = ref(0); // 定制框的宽度
const designHeight = ref(0); // 定制框的高度
const minCols = 2; // 面板最小的列
const minRows = 2; // 面板最小的行
const selectedModuleType = ref(''); // 选中的功能模块类型
const ELMessage_DURATION = 3;
const activeWidget = reactive({
  index: 0,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  xCols: 0,
  yRows: 0,
  cols: 0,
  rows: 0,
});

// 初始化定制框尺寸
const initSize = () => {
  const editor = document.getElementById('editor');
  const width = editor.clientWidth * 0.65;
  const height = editor.clientHeight * 0.7;

  // 修正为整数
  gridWidth.value = parseInt((width / MAX_X_NUMBER).toFixed(0));
  gridHeight.value = parseInt((height / MAX_Y_NUMBER).toFixed(0));

  designWidth.value = gridWidth.value * MAX_X_NUMBER;
  designHeight.value = gridHeight.value * MAX_Y_NUMBER;
};
// 初始化定制框的数据
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
// 初始化定制框、添加监听页面尺寸的变化
onMounted(() => {
  initSize();
  nextTick(() => {
    getInitWidgets();
  });
  window.addEventListener('resize', handleResize);
});
// 重新计算定制框尺寸（页面尺寸调整时，例：F12）
const refreshWidgetSize = () => {
  widgets.forEach((item) => {
    item.x = designWidth.value * ((1 / MAX_X_NUMBER) * item.xCols);
    item.y = designHeight.value * ((1 / MAX_Y_NUMBER) * item.yRows);
    item.w = designWidth.value * ((1 / MAX_X_NUMBER) * item.cols);
    item.h = designHeight.value * ((1 / MAX_Y_NUMBER) * item.rows);
  });
};
// 处理页面尺寸变化后的显示
const handleResize = () => {
  // 重新计算尺寸
  initSize();
  // 重新计算面板尺寸
  nextTick(() => {
    refreshWidgetSize();
  });
};

// 修改定制框中的格子
// 激活某个格子的控制
const onActivated = (index: number) => {
  activeWidget.index = index;
  activeWidget.x = widgets[index].x;
  activeWidget.y = widgets[index].y;
  activeWidget.w = widgets[index].w;
  activeWidget.h = widgets[index].h;
  activeWidget.xCols = widgets[index].xCols;
  activeWidget.yRows = widgets[index].yRows;
  activeWidget.cols = widgets[index].cols;
  activeWidget.rows = widgets[index].rows;
};
// 拖拽某个格子
const onDrag = (x: number, y: number) => {
  // 互换位置
  const switchPlaces = (a: number) => {
    for (let n = 0; n < widgets.length; n++) {
      if (
        widgets[n].x === x &&
        widgets[n].y === y &&
        widgets[n].w === widgets[a].w &&
        widgets[n].h === widgets[a].h
      ) {
        [widgets[n].x, widgets[a].x] = [widgets[a].x, widgets[n].x];
        [widgets[n].y, widgets[a].y] = [widgets[a].y, widgets[n].y];
        [widgets[n].xCols, widgets[a].xCols] = [
          widgets[a].xCols,
          widgets[n].xCols,
        ];
        [widgets[n].yRows, widgets[a].yRows] = [
          widgets[a].yRows,
          widgets[n].yRows,
        ];
      }
    }
  };
  switchPlaces(activeWidget.index);
  activeWidget.x = x;
  activeWidget.y = y;
  activeWidget.xCols = x / gridWidth.value;
  activeWidget.yRows = y / gridHeight.value;
};
// 停用某个格子的控制
const onDeactivated = () => {
  const widget = widgets[activeWidget.index];
  let flag = false;
  for (let n = 0; n < widgets.length; n++) {
    if (
      widgets[n].yRows < activeWidget.yRows + widget.rows &&
      activeWidget.yRows < widgets[n].yRows + widgets[n].rows &&
      widgets[n].xCols < activeWidget.xCols + widget.cols &&
      activeWidget.xCols < widgets[n].xCols + widgets[n].cols &&
      !(n === activeWidget.index)
    ) {
      flag = true;
    }
  }
  if (flag) {
    ElMessage({
      message: '存在冲突！！！',
      type: 'warning',
      duration: 1000,
    });
  } else {
    widget.x = activeWidget.x;
    widget.y = activeWidget.y;
    widget.w = activeWidget.w;
    widget.h = activeWidget.h;
    widget.xCols = activeWidget.xCols;
    widget.yRows = activeWidget.yRows;
    widget.cols = activeWidget.cols;
    widget.rows = activeWidget.rows;
  }
};
// 放大缩小某个格子
const onResize = (x: number, y: number, width: number, height: number) => {
  const widget = widgets[activeWidget.index];
  widget.x = activeWidget.x = x;
  widget.y = activeWidget.y = y;
  widget.w = activeWidget.w = width;
  widget.h = activeWidget.h = height;
  widget.xCols = activeWidget.xCols = x / gridWidth.value;
  widget.yRows = activeWidget.yRows = y / gridHeight.value;
  widget.cols = activeWidget.cols = width / gridWidth.value;
  widget.rows = activeWidget.rows = height / gridHeight.value;
  // 将其他格子向下推
  const pushDown = (a: number) => {
    for (let n = 0; n < widgets.length; n++) {
      if (
        widgets[n].yRows === widgets[a].yRows + widgets[a].rows - 1 &&
        !(
          widgets[n].xCols > widgets[a].xCols + widgets[a].cols - 1 ||
          widgets[n].cols + widgets[n].xCols - 1 < widgets[a].xCols
        )
      ) {
        widgets[n].y += gridHeight.value;
        widgets[n].yRows += 1;
        pushDown(n);
      }
    }
  };
  // 将其他格子向上推
  const pushUp = (a: number) => {
    for (let n = 0; n < widgets.length; n++) {
      if (
        widgets[n].yRows + widgets[n].rows - 1 === widgets[a].yRows &&
        !(
          widgets[n].xCols > widgets[a].xCols + widgets[a].cols - 1 ||
          widgets[n].cols + widgets[n].xCols - 1 < widgets[a].xCols
        )
      ) {
        widgets[n].y -= gridHeight.value;
        widgets[n].yRows -= 1;
        pushUp(n);
      }
    }
  };
  // 将其他格子向左推
  const pushLeft = (a: number) => {
    for (let n = 0; n < widgets.length; n++) {
      if (
        widgets[n].xCols + widgets[n].cols - 1 === widgets[a].xCols &&
        !(
          widgets[n].yRows > widgets[a].yRows + widgets[a].rows - 1 ||
          widgets[n].yRows + widgets[n].rows - 1 < widgets[a].yRows
        )
      ) {
        widgets[n].x -= gridWidth.value;
        widgets[n].xCols -= 1;
        pushLeft(n);
      }
    }
  };
  // 将其他格子向右推
  const pushRight = (a: number) => {
    for (let n = 0; n < widgets.length; n++) {
      if (
        widgets[n].xCols === widgets[a].xCols + widgets[a].cols - 1 &&
        !(
          widgets[n].yRows > widgets[a].yRows + widgets[a].rows - 1 ||
          widgets[n].yRows + widgets[n].rows - 1 < widgets[a].yRows
        )
      ) {
        widgets[n].x += gridWidth.value;
        widgets[n].xCols += 1;
        pushRight(n);
      }
    }
  };
  pushDown(activeWidget.index);
  pushUp(activeWidget.index);
  pushLeft(activeWidget.index);
  pushRight(activeWidget.index);
};
// 保存修改（外部页面调用）
const onSaveWidgets = () => {
  widgets.forEach((item) => {
    // 逐个保存面板信息
    switch (item.handleFlag) {
      case 'add':
        // 新建保存
        const addWidgetInfo = {
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
        const addParamsTitle = {
          id: item.id,
          data: addWidgetInfo,
        };
        homeStore.addParams(addParamsTitle);

        break;
      case 'update':
        // 修改保存
        const updateWidgetInfo = {
          x: item.xCols,
          y: item.yRows,
          cols: item.cols,
          rows: item.rows,
        };
        const updateParamsTitle = {
          id: item.id,
          data: updateWidgetInfo,
        };
        homeStore.updateParams(updateParamsTitle);

        break;
      case 'delete':
        // 删除保存
        const deleteParamsTitle = {
          id: item.id,
          wid: item.id,
        };
        homeStore.deleteParams(deleteParamsTitle);

        break;
    }
  });
  emit('changeHome');
};

// 表格
// 在表格中选择某个格子
const onTableRowClick = (row) => {
  activeWidget.index = widgets.findIndex((item) => item.type == row.type);
};

// 添加某个格子
const onAddWidget = () => {
  if (selectedModuleType.value == '') {
    ElMessage({
      message: '请选择添加的功能模块',
      type: 'error',
      duration: ELMessage_DURATION,
    });
  } else {
    // 判断相同类型模块是否已经存在
    const index = widgets.findIndex(
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
      const index = DASHBOARD_WIDGET_TYPE.findIndex(
        (item) => item.type == selectedModuleType.value
      );
      const selectedModule = DASHBOARD_WIDGET_TYPE[index];
      let maxID = Math.max(...homeDate.map((x) => x.id));
      widgets.push({
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
      activeWidget.index = widgets.length - 1;
    }
  }
};
// 删除某个格子
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
          const index = widgets.findIndex((item) => item.type == widget.type);
          widgets.splice(index, 1);
          break;
        }
      }
    })
    .catch(() => {});
};

// 展示表格里面的数据
const designWidgets = computed(() => {
  return widgets.filter((item) => item.handleFlag != 'delete');
});

// 清除监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
// 暴露保存按钮的方法
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
    grid-row: 3/21;
    justify-self: center;
    border: 1px solid #808080;
    display: block;
    background-color: rgb(121, 121, 121);
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    .widget-container {
      display: inline-grid;
      border: 1.5px solid #222222;
      color: #000000;
      font-size: 20px;
      font-weight: bold;
      font-family: YouYuan;

      .widget-content {
        padding: 20px;
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
    grid-row: 3/21;
    // background: #999999;
    .setting-header {
      display: flex;
      align-items: center;
      height: 60px;
    }
  }
}

// 方块处理
.my-handle-class {
  position: absolute;
  -webkit-transition: all 300ms linear;
  -ms-transition: all 300ms linear;
  transition: all 300ms linear;
}

.my-handle-class-tl {
  height: 20px;
  width: 20px;
  top: 0;
  left: 0;
  z-index: 100;
  cursor: nw-resize;
}

.my-handle-class-tm {
  height: 20px;
  width: 100%;
  top: 0;
  left: 0;
  cursor: n-resize;
}

.my-handle-class-tr {
  height: 20px;
  width: 20px;
  top: 0;
  right: 0;
  z-index: 100;
  cursor: ne-resize;
}

.my-handle-class-ml {
  height: 100%;
  width: 20px;
  top: 0;
  left: 0;
  cursor: w-resize;
}

.my-handle-class-mr {
  height: 100%;
  width: 20px;
  top: 0;
  right: 0;
  cursor: e-resize;
}

.my-handle-class-bl {
  height: 20px;
  width: 20px;
  bottom: 0;
  left: 0;
  z-index: 100;
  cursor: sw-resize;
}

.my-handle-class-bm {
  height: 20px;
  width: 100%;
  bottom: 0;
  left: 0;
  cursor: s-resize;
}

.my-handle-class-br {
  height: 20px;
  width: 20px;
  bottom: 0;
  right: 0;
  z-index: 100;
  cursor: se-resize;
}
</style>
