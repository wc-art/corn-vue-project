<template>
  <div class="bcg">
    <el-form class="form" :model="queryParams" ref="queryForm" :inline="true" label-width="150px">
      <el-form-item label="Name" prop="modelName">
        <el-input v-model="queryParams.modelName" placeholder="Please input name" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="Datasets" prop="datasets">
        <el-input v-model="queryParams.datasets" placeholder="Please input datasets" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="Phenotype name" prop="labelType">
        <el-input v-model="queryParams.labelType" placeholder="Please input Phenotype name" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleQuery">search</el-button>
        <el-button :icon="Refresh" @click="resetQuery">reset</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作部分 -->
    <el-row class="action">
      <el-col :span="3">
        <el-button type="primary" plain :icon="Plus" @click="handleAdd">Add</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" plain :icon="Delete" @click="handleDelete">Delete</el-button>
      </el-col>
    </el-row>
    <!-- 表格部分 -->
    <el-table class="table" v-loading="tableLoading" :data="modelList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="TaskID" width="100" align="center" prop="taskId" />
      <el-table-column label="Name" width="100" align="center" prop="modelName" />
      <el-table-column label="Species" width="100" align="center" prop="species" />
      <el-table-column label="Genomic dataset" width="150" align="center" prop="datasetGenoName" />
      <el-table-column label="Phenotype dataset" width="160" align="center" prop="datasetPhenoName" />
      <el-table-column label="Environment dataset" width="170" align="center" prop="datasetEnvirName" />
      <el-table-column label="Phonetype name" width="150" align="center" prop="labelType" />
      <el-table-column label="Hyperparameter Mode" width="200" align="center">
        <template #default="scope">
          {{ parseHPOMode(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100" align="center" prop="status">
        <template #default="scope">
          {{ parseStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="Email" width="100" align="center" prop="email" />
      <el-table-column label="Create time" width="120" align="center" prop="createTime">
        <template #default="scope">
          {{ parseTime(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="Result" width="100" align="center" fixed="right">
        <template #default="scope">
          <el-button link type="info" :icon="Download" @click="handleDownload(scope.row)" :disabled="scope.row.status!==1">download</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center" class-name="small-padding fixed-width" fixed="right" width="100">
        <template #default="scope">
          <el-button link type="danger" :icon="Delete" @click="handleDelete(scope.row)">delete</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 对话框部分 -->
    <el-dialog :title="textMap[dialogStatus]" v-model="dialogFormVisible" center draggable width="70%" append-to-body>
      <el-form ref="form" :rules="rules" :model="modelsForm" label-position="left" label-width="100px">
        <el-form-item label="Name" prop="modelName">
          <el-input v-model="modelsForm.modelName" placeholder="Please input name" />
        </el-form-item>
        <el-form-item label="Species" prop="species">
          <el-input v-model="modelsForm.species" placeholder="Please input species" />
        </el-form-item>
        <el-row>
          <el-col :span="10"> <el-form-item label="Learning_Rate(10^(-7)-0.01)" prop="lr" label-width="200">
              <el-input-number :controls="false" v-model="modelsForm.lr" :precision="7" :min="Math.pow(10, -7)"
                :max="0.01" />
            </el-form-item></el-col>
          <el-col :span="7"> <el-form-item label="Drop_Out(0.2-0.7)" prop="dropout" label-width="150">
              <el-input-number :controls="false" v-model="modelsForm.dropout" :precision="1" :min="0.2" :max="0.7" />
            </el-form-item></el-col>
          <el-col :span="7"> <el-form-item label="Batch_Size(16-128)" prop="batch" label-width="150">
              <el-input-number :controls="false" v-model="modelsForm.batch" :min="16" :max="128" />
            </el-form-item></el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="Num_Layer(1-12)" prop="depth" label-width="150">
              <el-input-number :controls="false" v-model="modelsForm.depth" :min="1" :max="12" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Neurons1" prop="neurons1">
              <el-input-number :controls="false" v-model="modelsForm.neurons1" :min="128" :max="512" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Neurons2" prop="neurons2">
              <el-input-number :controls="false" v-model="modelsForm.neurons2" :min="16" :max="64" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Phenotype name" prop="labelType" label-width="150">
          <el-input v-model="modelsForm.labelType" placeholder="Please input Phenotype name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="modelsForm.email" placeholder="Please input email" />
        </el-form-item>
        <el-form-item label="上传文件" prop="file" v-show="dialogStatus === 'create'">
          <el-upload v-model:file-list="fileList" class="upload-demo" ref="upload" :limit="1" accept=".pkl,.pth"
            :action="uploadUrl" :auto-upload="false" :data="{ dataType: 3 }" :on-error="uploadFileError"
            :on-success="uploadFileSuccess" :on-exceed="handleExceed">
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
              <div class="el-upload__tip">
                select a file to upload
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
            save
          </el-button>
          <el-button @click="dialogFormVisible = false">cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-pagination class="page" v-show="total > 0" :total="total" v-model:currentPage="queryParams.pageNum"
      v-model:page-size="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" @size-change="getList"
      @current-change="getList" :background="false" />
    <el-drawer v-model="drawer" :title="name" size="70%">
      <ShowCSVTable :url="curDatasetUrl" max-custom-h="85vh" />
    </el-drawer>
  </div>
</template>


<script setup name="Datasets">
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from 'vue';
import {useRoute} from 'vue-router'
import { Plus, Delete, Search, Refresh, Download } from '@element-plus/icons-vue';
import ShowCSVTable from '@/views/datasets/ShowCSVTable.vue';
import { parseHPOMode } from '@/utils/parse';
import {parseStatus} from '@/views/trainning/parse'
import { listModel, delModel, addModel } from '@/api/models';
import { parseTime } from '@/utils/ruoyi';

// vue示例工具
const { proxy: { $modal, $download } } = getCurrentInstance();
// 表格加载
const tableLoading = ref(false);

// 路由
const route = useRoute()

// 物种
const species = route.params.species

// 查询相关
const total = ref(2);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  modelName: '',
  datasets: '',
  labelType: '',
});
const resetQuery = () => {
  queryParams.pageNum = 1;
  queryParams.pageSize = 10;
  queryParams.modelName = '';
  queryParams.datasets = '';
  queryParams.labelType = '';
};

// 表单参数
const modelsForm = reactive({
  modelName: '',
  species: '',
  labelType: '',
  email: '',
  dropout: null,
  lr: null,
  batch: null,
  depth: null,
  neurons1: null,
  neurons2: null
});
// 重置表单
function resetForm() {
  modelsForm.modelName = null;
  modelsForm.species = null;
  modelsForm.labelType = null;
  modelsForm.createTime = null;
  modelsForm.depth = null;
  modelsForm.batch = null;
  modelsForm.neurons1 = null;
  modelsForm.neurons2 = null;
  modelsForm.lr = null;
  modelsForm.dropout = null;
}
const queryForm = ref(null); // 查询表单dom元素
const handleQuery = async () => {  // 查询回调
  getList();
};

// datasets表格
const modelList = ref([]); // 列表
const ids = ref([]); // 选中数组
const multiple = ref(false); /// 是否多选

// 对话框
const dialogFormVisible = ref(false);
const dialogStatus = ref('create');
const textMap = {
  create: 'Add models',
  update: 'Edit models'
};

// 打开添加datasets对话框
function handleAdd() {
  dialogStatus.value = 'create';
  modelList.value = [];
  resetForm();
  dialogFormVisible.value = true;
}


// 删除model
function handleDelete(row) {
  const idArr = row.taskId ? [row.taskId] : ids.value;
  $modal.confirm('Confirm output of this item?').then(() => {
    delModel(idArr).then(res => {
      getList();
    }).catch(err => {
      $modal.msgError('Deletion failed');
    });
  });
}

// 请求model列表
function getList() {
  tableLoading.value = true;
  listModel({...queryParams,species}).then(res => {
    tableLoading.value = false;
    modelList.value = res.rows;
    total.value = res.total;
  }).catch(err => {
    tableLoading.value = false;
    $modal.msgError('Failed to retrieve the list');
  });
}
// 选择dataset项
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
// 下载datasets
function handleDownload(row) {
  $download.resource(row.modelUrl);
}

// 校验规则
const rules = reactive({
  modelName: [
    { required: true, message: 'Please input name', trigger: 'blur' }
  ],
  species: [
    { required: true, message: 'Please input species', trigger: 'blur' }
  ],
  Label_type: [
    { required: true, message: 'Please input Label_type', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' }
  ]
});

const drawer = ref(false); // dataset详情窗口开启状态
const name = ref(''); // 选中dataset名

// 表单实例
const form = ref(null);
// 上传实例
const upload = ref(null);
// 文件上传
const uploadUrl = ref('');

const fileList = ref([]);

// 文件创建
function createData() {
  form.value.validate(valid => {
    if (valid) {
      uploadUrl.value =
        `${import.meta.env.VITE_APP_UPLOAD_URL}/maize/file/upload`;
      nextTick(async () => {
        tableLoading.value = false;
        await upload.value.submit();
        getList();
      });
    }
  });
}
// 文件上传成功回调
async function uploadFileSuccess(response) {
  const modelUrl = response.url;
  upload.value.clearFiles();
  await addModel({ ...modelsForm, modelUrl });
  $modal.msgSuccess('File uploaded successfully.');
  dialogFormVisible.value = false;
  getList();
}

// 文件上传失败回调
function uploadFileError() {
  $modal.msgError('Upload failed.');
}
// 文件替换
function handleExceed(files) {
  upload.value?.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value?.handleStart(file);
}

// Species 下拉框选项
const speciesOptions = [{ label: 'maize', value: 'maize' }, { label: 'other', value: 'other' }, { label: 'wheat', value: 'wheat' }, { label: 'cotton', value: 'cotton' }, { label: 'other', value: 'other' }];

onMounted(() => {
  getList();
});
</script>

<style scoped>
.bcg {
  background: linear-gradient(to right, rgba(43, 154, 233, 0.5), rgba(255, 255, 255, 0.5));
  ;
  border: 1px solid #000;
  transform: translateY(-5px);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  width: 98vw;
  margin: 5vh auto;
  padding-bottom: 5vh;
  height: 100%;
}

.form {
  padding-top: 30px;
  padding-bottom: 5vh;
}

.action {
  padding-top: 20px;
  padding-left: 40px;
  padding-bottom: 40px;
}

.page {
  padding-top: 10px;
}

.filled {
  width: 100%;
}
</style>
