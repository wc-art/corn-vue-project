<template>
  <el-table :data="tableData" stripe :max-height="maxCustomH" :flexible="true">
    <el-table-column v-for="item in tableColumns" :prop="item" :label="item" min-width="120" :key="item" />
  </el-table>
</template>

<script setup>
import { ref,watchEffect } from 'vue';

// const url = 'src/assets/2022-5-5-16.00.csv';
const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  maxCustomH: {
    type: String,
    default: '85vh'
  }
})

const tableColumns = ref([]); // 表格项
const tableData = ref([]);

watchEffect(() => {
  if (props.url) {
    getJsonByCSV(props.url).then(result => {
      tableColumns.value = result[0]
      tableData.value = result[1]
    })
  }
})
</script>

<style scoped>
</style>
