<template>
  <div class="bcg">
    <el-form class="form" :model="queryParams" ref="queryForm" :inline="true" label-width="80px">
      <el-row>
        <el-col :span="6"><el-form-item label="Name" prop="datasetName">
            <el-input v-model="queryParams.datasetName" placeholder="Please input name" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item></el-col>
        <el-col :span="6"><el-form-item label="Species" prop="species">
            <el-select v-model="queryParams.species" placeholder="Select a species">
              <el-option v-for="item in speciesOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item></el-col>
        <el-col :span="6"><el-form-item label="Samples" prop="samples">
            <el-input v-model="queryParams.samples" placeholder="Please input samples" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item></el-col>
        <el-col :span="6"><el-form-item label="Features" prop="features">
            <el-input v-model="queryParams.features" placeholder="Please input features" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item></el-col>
      </el-row>

      <el-row>
        <el-col :span="6"><el-form-item label="Tags" prop="tags">
            <el-input v-model="queryParams.tags" placeholder="Please input tags" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item></el-col>
        <el-col :span="6"><el-form-item label="Label type" prop="labelType">
            <el-input v-model="queryParams.tags" placeholder="Please input label type" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item></el-col>
        <el-col :span="6"><el-form-item label="Data type" prop="dataType">
            <el-select v-model="queryParams.dataType" placeholder="Select a data type">
              <el-option v-for="item in dataTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select></el-form-item></el-col>
        <el-col :span="6"><el-form-item>
            <el-button type="primary" :icon="Search" @click="handleQuery">search</el-button>
            <el-button :icon="Refresh" @click="resetQuery">reset</el-button>
          </el-form-item></el-col>
      </el-row>
    </el-form>
    <!-- 操作部分 -->
    <el-row class="action">
      <el-col :span="3">
        <el-button type="primary" plain :icon="Plus" @click="handleAdd">Add</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" plain :icon="Delete" @click="handleDelete">Delete</el-button>
      </el-col>
      <!-- <el-col :span="3">
        <el-button type="warning" plain :icon="Edit" :disabled="multiple" @click="handleUpdate">Edit</el-button>
      </el-col> -->
      <el-col :span="3">
        <el-button type="info" plain :icon="Download" :disabled="multiple" @click="handleDownload">Download</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="info" plain :icon="Download" @click="handleDownloadTemplate">Template
          Download</el-button>
      </el-col>
    </el-row>
    <!-- 表格部分 -->
    <el-table class="table" v-loading="tableLoading" :data="datasetsList" @selection-change="handleSelectionChange"
      border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="Name" align="center" prop="datasetName" />
      <el-table-column label="Species" align="center" prop="species" />
      <el-table-column label="Samples" align="center" prop="samples" />
      <el-table-column label="Features" align="center" prop="features" />
      <el-table-column label="Tags" align="center" prop="tags" />
      <el-table-column label="Label type" align="center" prop="labelType" />
      <el-table-column label="Data type" align="center" prop="dataType">
        <template #default="scope">
          {{ dataType[scope.row.dataType] }}
        </template>
      </el-table-column>
      <el-table-column label="Create time" align="center" prop="createTime" width="160">
        <template #default="scope">
          {{ parseTime(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center" width="300" class-name="small-padding fixed-width" fixed="right">
        <template #default="scope">
          <el-button link type="primary" :icon="View" @click="openDrawer(scope.row)">details
          </el-button>
          <el-button link type="danger" :icon="Document" @click="handleDelete(scope.row)">delete
          </el-button>
          <!-- <el-button type="text" :icon="Edit" @click="handleUpdate(scope.row)">edit</el-button> -->
          <el-button link type="info" :icon="Download" @click="handleDownload(scope.row)">download</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 对话框部分 -->
    <el-dialog :title="textMap[dialogStatus]" v-model="dialogFormVisible" center draggable append-to-body width="50%">
      <el-form ref="form" :rules="rules" :model="datasetsForm" label-position="left" label-width="100px">
        <el-form-item label="Name" prop="datasetName">
          <el-input v-model="datasetsForm.datasetName" placeholder="Please input name" />
        </el-form-item>
        <el-form-item label="Species" prop="species">
          <el-select v-model="datasetsForm.species" placeholder="Select a species">
            <el-option v-for="item in speciesOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Samples" prop="samples">
          <el-input v-model="datasetsForm.samples" placeholder="Please input samples" />
        </el-form-item>
        <el-form-item label="Features" prop="features">
          <el-input v-model="datasetsForm.features" placeholder="Please input features" />
        </el-form-item>
        <el-form-item label="Tags" prop="tags">
          <el-input v-model="datasetsForm.tags" placeholder="Please input tags" />
        </el-form-item>
        <el-form-item label="Label type" prop="labelType">
          <el-input v-model="datasetsForm.labelType" placeholder="Please input label type" />
        </el-form-item>
        <el-form-item label="Data type" prop="dataType">
          <el-select v-model="datasetsForm.dataType" placeholder="Select a data type">
            <el-option v-for="item in dataTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传文件" prop="file" v-show="dialogStatus === 'create'">
          <el-upload v-model:file-list="fileList" class="upload-demo" ref="upload" :limit="1" accept=".xlsx"
            :action="uploadUrl" :auto-upload="false" :data="datasetsForm" :on-error="uploadFileError"
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
import { Plus, Delete, Edit, Download, Document, Search, Refresh, View } from '@element-plus/icons-vue';
import ShowCSVTable from '@/views/datasets/ShowCSVTable.vue';
import { listDataset, delDatasets, addDataset, } from '@/api/datasets';
import { dataType } from '@/utils/parse';
import { parseTime } from '@/utils/ruoyi';

// vue示例工具
const { proxy: { $modal, $download } } = getCurrentInstance();
// 表格加载
const tableLoading = ref(false);

// 查询相关
const total = ref(2);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  datasetName: '',
  species: '',
  samples: '',
  features: '',
  tags: '',
  labelType: '',
  dataType: ''
});
const resetQuery = () => {
  queryParams.pageNum = 1;
  queryParams.pageSize = 10;
  queryParams.datasetName = '';
  queryParams.species = '';
  queryParams.samples = '';
  queryParams.features = '';
  queryParams.tags = '';
  queryParams.labelType = '';
  queryParams.dataType = '';
};

// 表单参数
const datasetsForm = reactive({
  datasetName: '',
  species: '',
  samples: '',
  features: '',
  tags: '',
  labelType: '',
  dataType: ''
});
const queryForm = ref(null); // 查询表单dom元素
const handleQuery = async () => {  // 查询回调
  getList();
};

// datasets表格
const datasetsList = ref([]); // 列表
const ids = ref([]); // 选中数组
const multiple = ref(false); /// 是否多选

// 对话框
const dialogFormVisible = ref(false);
const dialogStatus = ref('create');
const textMap = {
  create: 'Add dataset',
  update: 'Edit dataset'
};

const fileList = ref(); // 文件列表

// 打开添加datasets对话框
function handleAdd() {
  dialogStatus.value = 'create';
  resetForm();
  dialogFormVisible.value = true;
}
// 删除dataset
function handleDelete(row) {
  let idArr = row.datasetId ? [row.datasetId] : ids.value;
  $modal.confirm('Confirm output of this item?').then(() => {
    delDatasets(idArr).then(res => {
      getList();
    }).catch(err => {
      $modal.msgError('Deletion failed');
    });
  });
}

// 请求dataset列表
function getList() {
  tableLoading.value = true;
  listDataset(queryParams).then(res => {
    tableLoading.value = false;
    datasetsList.value = res.rows;
    total.value = res.total;
  }).catch(err => {
    tableLoading.value = false;
    $modal.msgError('Failed to retrieve the list');
  });
}

const downloadUrl = ref('') // 选中的下载项

// 选择dataset项
function handleSelectionChange(selection) {
  if (selection.length !== 1) {
    multiple.value = true;
  } else {
    multiple.value = false;
    downloadUrl.value = selection[0].datasetUrl
  }
  selection.forEach(item => {
    ids.value.push(item.datasetId);
  });
}
// 下载datasets
function handleDownload(row) {
  $download.resource(row.datasetUrl??downloadUrl.value);
}

// 下载dataset模板
function handleDownloadTemplate(row) {
  // $download.resource(?)
  // console.log('download template');
}

// 表单实例
const form = ref();

// 校验规则
const rules = reactive({
  datasetName: [
    { required: true, message: 'Please input name', trigger: 'blur' }
  ],
  species: [
    { required: true, message: 'Please input species', trigger: 'blur' }
  ],
  samples: [
    { required: true, message: 'Please input samples', trigger: 'blur' }
  ],
  features: [
    { required: true, message: 'Please input features', trigger: 'blur' }
  ],
  tags: [
    { required: true, message: 'Please input tags', trigger: 'blur' }
  ],
  labelType: [
    { required: true, message: 'Please input label type', trigger: 'blur' }
  ],
  dataType: [
    { required: true, message: 'Please select a data type', trigger: 'change' }
  ],
});


const drawer = ref(false); // dataset详情窗口开启状态
const name = ref(''); // 选中dataset名
const curDatasetUrl = ref('');

// 开启文件详情窗口
async function openDrawer(row) {
  name.value = row.datasetName;
  curDatasetUrl.value = row.url;
  drawer.value = true;
}

// 上传实例
const upload = ref(null);
// 文件上传
const uploadUrl = ref('');

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
  const datasetUrl = response.url;
  upload.value.clearFiles();
  await addDataset({ ...datasetsForm, datasetUrl });
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
  upload.value?.handleStart(file);
}

// 文件修改
async function updateData() {
  form.value.validate(valid => {
    if (valid) {
      tableLoading.value = true;
      updateFile({ ...datasetsForm, dateTime: parseTime(datasetsForm.dateTime) }).then(res => {
        tableLoading.value = false;
        dialogFormVisible.value = false;
        getList();
      }).catch(err => {
        loading.value = false;
        $modal.msgError('修改失败');
      });
    }
  });
}

// Species 下拉框选项
const speciesOptions = [{ label: 'maize', value: 'maize' }, { label: 'wheat', value: 'wheat' }, { label: 'cotton', value: 'cotton' }, { label: 'other', value: 'other' }];
// dataType下拉框选项
const dataTypeOptions = [{ label: dataType[0], value: 0 }, { label: dataType[1], value: 1 }, { label: dataType[2], value: 2 }];
function resetForm() {
  datasetsForm.datasetName = null;
  datasetsForm.species = null;
  datasetsForm.samples = null;
  datasetsForm.features = null;
  datasetsForm.tags = null;
  datasetsForm.labelType = null;
  datasetsForm.dataType = null;
}

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
