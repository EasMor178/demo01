<template>
  <el-upload
    class="upload-demo"
    action=""
    drag
    style="padding: 20px"
    :auto-upload="false"
    :on-change="uploadChange"
    :limit="1"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      将 Excel 文件拖到此处，或<em>点击上传</em>
    </div>
  </el-upload>
  <main style="padding: 20px" v-if="tableData[0]">
    <el-table :data="tableData" border style="width: 100">
      <el-table-column prop="USERID" label="userId" width="80" />
      <el-table-column prop="USERNAME" label="userName" width="180" />
      <el-table-column prop="ORG" label="ore" width="180" />
      <el-table-column prop="ROLE" label="role" width="180" />
    </el-table>
  </main>
</template>

<script setup lang="ts">
import * as xlsx from 'xlsx';
const tableData = ref([]);
const uploadChange = async (e) => {
  console.log(e);

  // 判断上传的内容是不是表格
  const files = e.raw;
  if (files.length <= 0) {
    return false;
  } else if (!/\.(xls|xlsx)$/.test(files.name.toLowerCase())) {
    console.log('上传格式不正确，请上传xls或者xlsx格式');
    return false;
  }

  // 读取表格
  const fileReader = new FileReader();
  fileReader.onload = (ev) => {
    const workbook = xlsx.read(ev.target.result, {
      type: 'binary',
    });
    const wsName = workbook.SheetNames[0];

    // 转换成json的数据
    const ws = xlsx.utils.sheet_to_json(workbook.Sheets[wsName]);
    console.log(ws);
    tableData.value.push(...ws);
    console.log(tableData.value);
  };
  fileReader.readAsBinaryString(files);
};

// const dealExcel = (ws) => {
//   let keyMap = {
//     // 我们要转换的开头
//     菜名: 'dishes',
//     介绍: 'introduce',
//     配料: 'ingredients',
//     标签: 'label',
//     提示: 'tips',
//     水平: 'hor',
//     方式: 'way',
//     时间: 'time',
//     风味: 'flavor',
//     步骤: 'steps',
//   };
//   ws.forEach((sourceObj) => {
//     let arr = new Array();
//     Object.keys(sourceObj).map((keys) => {
//       if (keys.includes('步骤')) {
//         arr.push(sourceObj[keys]);
//         delete sourceObj[keys];
//       } else if (keyMap[keys]) {
//         sourceObj[keyMap[keys]] = sourceObj[keys];
//         delete sourceObj[keys];
//       }
//     });
//     sourceObj['steps'] = arr;
//   });
//   return ws;
// };
</script>
<style scoped></style>
