import { defineStore } from 'pinia';

export const useHomeStore = defineStore('home', {
  state: () => {
    return {
      date: [
        {
          id: 1,
          createdAt: '2023-02-03T09:42:35.407+08:00',
          updatedAt: '2023-07-13T11:45:45.699+08:00',
          dashBoardID: 1,
          typeID: 1,
          type: 'intro',
          title: '简介',
          remark: '本系统简介',
          content:
            '\u003cp\u003e\u003cspan style="color: rgb(51, 51, 51);"\u003e 欢迎使用 GS-EDS\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan style="color: rgb(51, 51, 51);"\u003e\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;GS-EDS 数络电子文档安全管理系统是国家公安部和国家保密局指定的计算机信息系统专用安全产品。GS-EDS系统汲取了ISO27001和ISO17799的信息安全管理思想，运用密码技术和访问控制技术并举的原理，遵循计算机信息安全保护等级标准，全面实施计算机图文档（电子文件）的安全保护。GS-EDS 系统加密手段强，控制力度高，是保护用户知识产权和商业机密的有力武器和便捷工具。\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan style="color: rgb(51, 51, 51);"\u003e查看 \u003c/span\u003e\u003ca href="https://www.hzdatalink.com/" rel="noopener noreferrer" target="_blank"\u003e杭州数络信息技术有限公司\u003c/a\u003e\u003cspan style="color: rgb(51, 51, 51);"\u003e官网了解更多信息。\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan style="color: rgb(51, 51, 51);"\u003esdsadsadsadasd\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan style="color: rgb(51, 51, 51);"\u003efsadfdsafdsaf\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e',
          cols: 4,
          rows: 3,
          minCols: 2,
          minRows: 2,
          x: 0,
          y: 0,
          default: true,
        },
        {
          id: 2,
          createdAt: '2023-02-03T09:42:35.411+08:00',
          updatedAt: '2023-02-03T09:42:35.411+08:00',
          dashBoardID: 1,
          typeID: 2,
          type: 'mgr',
          title: '管理',
          remark: '系统管理功能入口',
          content:
            '[{"name":"终端管理","id":"terminal-mgr"},{"name":"部门管理","id":"org-mgr"},{"name":"策略管理","id":"stg-mgr"},{"name":"审批管理","id":"flow-mgr"},{"name":"分发管理","id":"disp-mgr"},{"name":"统计分析","id":"sys-stat"},{"name":"报警服务","id":"alarm-mgr"},{"name":"系统监控","id":"sys-mon"},{"name":"系统设置","id":"sys-settings"}]',
          cols: 4,
          rows: 3,
          minCols: 2,
          minRows: 2,
          x: 4,
          y: 0,
          default: true,
        },
        {
          id: 3,
          createdAt: '2023-02-03T09:42:35.415+08:00',
          updatedAt: '2023-02-03T09:42:35.415+08:00',
          dashBoardID: 1,
          typeID: 3,
          type: 'terminal-stat',
          title: '终端统计',
          remark: '终端用户数、许可使用情况统计',
          content:
            '[{"name":"在线用户","id":"online-user-stat"},{"name":"加密许可","id":"eds-lic-stat"},{"name":"水印许可","id":"wms-lic-stat"}]',
          cols: 4,
          rows: 3,
          minCols: 2,
          minRows: 2,
          x: 8,
          y: 0,
          default: true,
        },
        {
          id: 4,
          createdAt: '2023-02-03T09:42:35.418+08:00',
          updatedAt: '2023-02-03T09:42:35.418+08:00',
          dashBoardID: 1,
          typeID: 4,
          type: 'my-task',
          title: '我的任务',
          remark: '我的待审批任务列表',
          content: '',
          cols: 6,
          rows: 4,
          minCols: 3,
          minRows: 2,
          x: 0,
          y: 3,
          default: true,
        },
        {
          id: 5,
          createdAt: '2023-02-03T09:42:35.422+08:00',
          updatedAt: '2023-02-03T09:42:35.422+08:00',
          dashBoardID: 1,
          typeID: 5,
          type: 'my-app',
          title: '我的申请',
          remark: '我的申请列表',
          content: '',
          cols: 6,
          rows: 4,
          minCols: 3,
          minRows: 2,
          x: 6,
          y: 3,
          default: true,
        },
      ],
      DASHBOARD_WIDGET_TYPE: [
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
      ],
      MAX_X_NUMBER: 12, // 屏幕X轴分成12列
      MAX_Y_NUMBER: 6, // 屏幕Y轴分成6行
    };
  },
  actions: {
    addParams(addParams) {
      this.date.push({
        id: addParams.id,
        createdAt: '2023-02-03T09:42:35.422+08:00',
        updatedAt: '2023-02-03T09:42:35.422+08:00',
        dashBoardID: 1,
        typeID: addParams.data.typeID,
        type: addParams.data.type,
        title: addParams.data.title,
        remark: addParams.data.remark,
        content: '',
        cols: addParams.data.cols,
        rows: addParams.data.rows,
        minCols: addParams.data.minCols,
        minRows: addParams.data.minRows,
        x: addParams.data.x,
        y: addParams.data.y,
        default: true,
      });
    },
    updateParams(updateParams) {
      let a = this.date.findIndex((item) => item.id === updateParams.id);
      this.date[a].x = updateParams.data.x;
      this.date[a].y = updateParams.data.y;
      this.date[a].cols = updateParams.data.cols;
      this.date[a].rows = updateParams.data.rows;
    },
    deleteParams(deleteParams) {
      this.date.splice(
        this.date.findIndex((item) => item.id === deleteParams.id),
        1
      );
    },
  },
  getters: {},
});
