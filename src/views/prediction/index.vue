<template>
  <div class="top_form">
    <el-form class="form" ref="formRef" :rules="rules" :model="predictionForm" label-position="left" label-width="200px">
      <div class="num_title">SELECT MODEL</div>
      <el-form-item label="Model Selection" prop="model">
        <el-select v-model="predictionForm.model" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <div class="num_title">SELECT DATASET</div>
      <el-form-item label="Genomic Dataset Selection" prop="datasetGenoId">
        <el-select v-model="predictionForm.datasetGenoId" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in genoOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Phenotype Dataset Selection" prop="datasetPhenoId">
        <el-select v-model="predictionForm.datasetPhenoId" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in phenoOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Environment Dataset Selection" prop="datasetEnvirId">
        <el-select v-model="predictionForm.datasetEnvirId" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in environmentOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <div class="num_title">INPUT EMAIL</div>
      <el-form-item label="Email Address" prop="email">
        <el-input v-model="predictionForm.email" placeholder="Please input Email Address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Promotion" @click="handleRun">RUN</el-button>
      </el-form-item>
    </el-form>

  </div>

  <el-dialog title="Edit" v-model="dialogFormVisible" center draggable width="50%">
    <el-form ref="form" :rules="rules" :model="predictionForm" label-position="left" label-width="100px">
      <el-form-item label="Species" prop="species">
        <el-select v-model="predictionForm.species" placeholder="Select a species">
          <el-option v-for="item in speciesOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="predictionForm.email" placeholder="Please input Email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitEdit">
          save
        </el-button>
        <el-button @click="dialogFormVisible = false">cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 表格部分 -->
  <el-table class="table" v-loading="tableLoading" :data="predictionList" @selection-change="handleSelectionChange"
    border>
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column label="TaskID" width="100" align="center" prop="taskId" />
    <el-table-column label="Species" width="100" align="center" prop="taskId" />
    <el-table-column label="Genomic dataset" width="150" align="center" prop="datasetGenoName" />
    <el-table-column label="Phenotype dataset" width="160" align="center" prop="datasetPhenoName" />
    <el-table-column label="Environment dataset" width="170" align="center" prop="datasetEnvirName" />
    <el-table-column label="Model" width="100" align="center" prop="model" />
    <el-table-column label="Status" width="100" align="center" prop="status">
      <template #default="scope">
        {{ parseStatus(scope.row.status) }}
      </template>
    </el-table-column>
    <el-table-column label="Email" width="100" align="center" prop="email" />
    <el-table-column label="Create time" width="150" align="center" prop="createTime">
      <template #default="scope">
        {{ parseTime(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column label="Result" width="100" align="center" prop="result" />
    <el-table-column label="Action" width="200" align="center" class-name="small-padding fixed-width" fixed="right">
      <template #default="scope">
        <el-button link type="danger" :icon="Delete" @click="handleDelete(scope.row)">delete</el-button>
        <!-- <el-button link type="warning" :icon="Edit" @click="handleEdit(scope.row)">Edit</el-button> -->
        <el-button link type="info" :icon="Select" @click="handleDownload(scope.row)">Download</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination class="page" v-show="total > 0" :total="total" v-model:currentPage="queryParams.pageNum"
    v-model:page-size="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" @size-change="getList"
    @current-change="getList" :background="false" />
</template>


<script setup name="Prediction">
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Select, Delete, Promotion, Edit } from '@element-plus/icons-vue';
import { parseHPOMode } from '@/utils/parse.js';
import { parseTime } from '@/utils/ruoyi';
import { delPrediction, predictionRun, updatePrediction, listPrediction } from '@/api/prediction';
import { getOptions } from '@/api/datasets';
import { parseStatus } from '@/views/trainning/parse';

// vue示例工具
const { proxy: { $modal, $download } } = getCurrentInstance();
// 表格加载
const tableLoading = ref(false);
// 路由实例
const router = useRouter();
const route = useRoute();

// 传递的物种参数
const species = route.params.species;

// 查询相关
const total = ref(1);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10
});

// 表单参数
const predictionForm = reactive({
  datasetGenoId: null,
  datasetPhenoId: null,
  datasetEnvirId: null,
  species: '',
  model: null,
  email: ''
});

// 表单中的一些已知和补充信息
const speciesOptions = [];
const genoOptions = [];
const phenoOptions = [];
const environmentOptions = [];
const modelOptions = [];

// prediction表格
const predictionList = ref([]); // 列表
const ids = ref([]); // 选中数组
const multiple = ref(false); /// 是否多选

// 表单实例
const formRef = ref();

// 预测
function handleRun() {
  formRef.value.validate(valid => {
    if (valid) {
      // 预测接口调用
      predictionRun(predictionForm).then(() => {
        $modal.msgSuccess('success!');
      });
    } else {
      $modal.msgError('sumbit error');
      return false;
    }
  });
}

// 删除model
function handleDelete(row) {
  $modal.confirm('Confirm output of this item?').then(() => {
    delPrediction(row.taskId).then(res => {
      getList();
    }).catch(err => {
      $modal.msgError('Deletion failed');
    });
  });
}

// 对话框可见
const dialogFormVisible = ref(false);

// 修改表格项
function handleEdit() {
  dialogFormVisible.value = true;
}

// 表单实例
const form = ref();

// 确认修改
function submitEdit() {
  form.value.validate(valid => {
    if (valid) {
      // 提交修改数据
      updatePrediction(predictionForm).then(() => {
        dialogFormVisible.value = false;
        $modal.msgSuccess('update success!');
        getList()
      });
    } else {
      $modal.msgError('submit error');
      return false;
    }
  });
}

// model预测
function handleDownload(row) {
  // 下载
  $download.resource();
}

// 请求model列表
function getList() {
  tableLoading.value = true;
  listPrediction(queryParams).then(res => {
    tableLoading.value = false;
    predictionList.value = res.rows;
    total.value = res.total;
  }).catch(err => {
    tableLoading.value = false;
    $modal.msgError('Failed to retrieve the list');
  });
}
// 选择model项
function handleSelectionChange(selection) {
  if (selection.length !== 1) {
    multiple.value = true;
  } else {
    multiple.value = false;
  }
  selection.forEach(item => {
    ids.value.push(item.taskId);
  });
}

// 校验规则
const rules = reactive({
  model: [
    { required: true, message: 'Please Select a model', trigger: 'change' }
  ],
  datasetGenoId: [
    { required: true, message: 'Please Select a dataset', trigger: 'change' }
  ],
  datasetEnvirId: [
    { required: true, message: 'Please Select a dataset', trigger: 'change' }
  ],
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input a valid email address', trigger: ['blur', 'change'] }
  ]
});

onMounted(async () => {
  getList()
  const data = await getOptions(species);
  genoOptions.value = data[0];
  phenoOptions.value = data[1];
  environmentOptions.value = data[2];
});
</script>

<style scoped>
.top_form {
  width: 80vw;
  margin: 0 auto;
}

.form {
  padding-top: 30px;
}

.num_title {
  width: 80vw;
  text-align: center;
  font-size: large;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  padding: 15px 0;
}

.action {
  padding-top: 20px;
  padding-left: 40px;
  padding-bottom: 40px;
}

.page {
  padding-top: 10px;
  width: 80vw;
  margin: 0 auto;
}

.table {
  width: 80vw;
  margin: 0 auto;
}

.filled {
  width: 100%;
}
</style>
