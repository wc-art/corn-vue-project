<template>
  <div class="top_form">
    <el-form class="form" :rules="rules" ref="formRef" :model="modelsForm" label-position="right" label-width="220px">
      <div class="num_title">SELECT DATASET</div>
      <el-form-item label="Genomic Dataset Selection" prop="datasetGenoId" label-width="220px">
        <el-select v-model="modelsForm.datasetGenoId" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in genoOptions" :key="item.datasetId" :label="item.datasetName" :value="item.datasetId" />
        </el-select>
      </el-form-item>
      <el-form-item label="Phenotype Dataset Selection" prop="datasetPhenoId" label-width="220px">
        <el-select v-model="modelsForm.datasetPhenoId" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in phenoOptions" :key="item.datasetId" :label="item.datasetName" :value="item.datasetId" />
        </el-select>
      </el-form-item>
      <el-form-item label="Environment Dataset Selection" prop="datasetEnvirId" label-width="220px">
        <el-select v-model="modelsForm.datasetEnvirId" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in environmentOptions" :key="item.datasetId" :label="item.datasetName" :value="item.datasetId" />
        </el-select>
      </el-form-item>
      <el-form-item label="label type" prop="labelType" label-width="220px">
        <el-radio-group v-model="modelsForm.labelType">
          <el-radio label="DTA" />
          <el-radio label="EW" />
          <el-radio label="PH" />
          <el-radio label="Other">
            <template #default>
              Other<el-input v-model="otherLabelType" placeholder="Please input other label type" />
            </template>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="num_title">Hyperparameter Optimization</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Learning_Rate(10^(-7)-0.01)" prop="lr" label-width="220px">
            <el-input-number :controls="false" v-model="modelsForm.lrStart" :precision="7" :min="Math.pow(10, -7)"
              :max="0.01" />
            ——<el-input-number :controls="false" v-model="modelsForm.lrEnd" :precision="7" :min="Math.pow(10, -7)"
              :max="0.01" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Drop_Out(0.2-0.5)" prop="dropout" label-width="135px">
            <el-input-number :controls="false" v-model="modelsForm.dropoutStart" :precision="1" :min="0.2" :max="0.5" />
            ——<el-input-number :controls="false" v-model="modelsForm.dropoutEnd" :precision="1" :min="0.2" :max="0.5" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12"><el-form-item label="Batch_Size(16-256)" prop="batch" label-width="220px">
            <el-input-number :controls="false" v-model="modelsForm.batchStart" :min="16" :max="256" />
            ——<el-input-number :controls="false" v-model="modelsForm.batchEnd" :min="16" :max="256" />
          </el-form-item></el-col>
        <el-col :span="12"><el-form-item label="Num_Layer(1-15)" prop="depth" label-width="135px">
            <el-input-number :controls="false" v-model="modelsForm.depthStart" :min="1" :max="15" />
            ——<el-input-number :controls="false" v-model="modelsForm.depthEnd" :min="1" :max="15" />
          </el-form-item></el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Neurons1(128-512)" prop="neurons1" label-width="220px">
            <el-input-number :controls="false" v-model="modelsForm.neurons1Start" :min="128" :max="512" />
            ——<el-input-number :controls="false" v-model="modelsForm.neurons1End" :min="128" :max="512" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Neurons2(16-64)" prop="neurons2" label-width="135px">
            <el-input-number :controls="false" v-model="modelsForm.neurons2Start" :min="16" :max="64" />
            ——<el-input-number :controls="false" v-model="modelsForm.neurons2End" :min="16" :max="64" />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="num_title">SELECT ALGORITHM</div>
      <el-form-item label="Algorithm" prop="algorithm">
        <el-select v-model="modelsForm.algorithm" placeholder="Select a algorithm" class="filled">
          <el-option v-for="item in algorithmOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <div class="num_title">INPUT EMAIL</div>
      <el-form-item label="Email" prop="email">
        <el-input v-model="modelsForm.email" placeholder="Please input Email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Promotion" @click="handleRun">RUN</el-button>
        <el-button type="primary" :icon="Refresh" @click="() => formRef.resetFields()">Reset</el-button>
        <el-button type="primary" :icon="Link" @click="handleTrainning">To Trainning</el-button>
      </el-form-item>
    </el-form>

  </div>
  <!-- 表格部分 -->
  <el-table class="table" v-loading="tableLoading" :data="modelList" @selection-change="handleSelectionChange" border>
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column label="TaskID" width="100" align="center" prop="taskId" />
    <el-table-column label="Genomic dataset" width="150" align="center" prop="datasetGenoName" />
    <el-table-column label="Phenotype dataset" width="160" align="center" prop="datasetPhenoName" />
    <el-table-column label="Environment dataset" width="200" align="center" prop="datasetEnvirName" />
    <el-table-column label="Label type" width="100" align="center" prop="labelType" />
    <el-table-column label="Hyperparameter Mode" width="200" align="center">
      <template #default="scope">
        {{ parseHPOMode(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center" prop="status" >
      <template #default="scope">
        {{ parseStatus(scope.row.status) }}
      </template>
    </el-table-column>
    <el-table-column label="Email" width="100" align="center" prop="email" />
    <el-table-column label="Create_time" width="100" align="center" prop="create_time" />
    <el-table-column label="Create_by" width="100" align="center" prop="create_by" />
    <el-table-column label="Result" width="100" align="center" prop="result" />
    <el-table-column label="Action" width="200" align="center" class-name="small-padding fixed-width" fixed="right">
      <template #default="scope">
        <el-button link type="danger" :icon="Delete" @click="handleDelete(scope.row)">delete</el-button>
        <el-button link type="primary" :icon="Select" @click="handlePredict(scope.row)">Predict</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination class="page" v-show="total > 0" :total="total" v-model:currentPage="queryParams.pageNum"
    v-model:page-size="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" @size-change="getList"
    @current-change="getList" :background="false" />
</template>


<script setup name="HPO">
import { ref, reactive, getCurrentInstance, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Select, Delete, Promotion, Link,Refresh } from '@element-plus/icons-vue';
import { parseHPOMode,parseResult } from '@/utils/parse.js';
import {getOptions,getDatasetDetails} from '@/api/datasets'
import { listHPO, delHPO, HPORun } from '@/api/trainningHPO';
import { parseModelsForm, parseRules,parseStatus } from '@/views/trainning/parse';

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

// 表单实例
const formRef = ref();

// 表单参数
const modelsForm = reactive(parseModelsForm(true));

// 表单中的一些已知和补充信息
const otherLabelType = ref(''); // 自定义选项
const genoOptions = ref([]);  // 基因型数据库选项
const phenoOptions = ref([]); // 表型数据库选项
const environmentOptions = ref([]); // 环境数据库选项
const algorithmOptions = [{value: 'optunaTrain',label: 'optunaTrain'}]; // 运用哪种算法

// model表格
const modelList = ref([]); // 列表
const ids = ref([]); // 选中数组
const multiple = ref(false); /// 是否多选

// 记录labelType的值
const labelType = computed(() => modelsForm.labelType === 'Other' ? otherLabelType.value : modelsForm.labelType);

// 参数优化
async function handleRun() {
  formRef.value.validate(valid => {
    if (valid) {
      // 超参数优化接口调用
      HPORun({ ...modelsForm, labelType: labelType.value,species }).then(() => {
        $modal.msgSuccess('success!');
        getList()
      });
    } else {
      $modal.msgError('params error');
      return false;
    }
  });
}

// 删除model
function handleDelete(row) {
  const idArr = row.taskId ? [row.taskId] : ids.value;
  $modal.confirm('Confirm output of this item?').then(() => {
    delHPO(idArr).then(res => {
      getList();
    }).catch(err => {
      $modal.msgError('Deletion failed');
    });
  });
}

// 直接跳转
function handleTrainning() {
  // 直接进入预测页面
  router.push({ path: `/trainningmodels/${species}` });
}

// model预测
function handlePredict(row) {
  // 进入预测页面
  router.push({ path: `/trainningmodels/${species}`,query:{id:row.taskId} });
}

// 请求model列表
function getList() {
  tableLoading.value = true;
  listHPO({...queryParams,species}).then(res => {
    tableLoading.value = false;
    modelList.value = res.rows;
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
const rules = reactive(parseRules(modelsForm));

onMounted(async () => {
  getList()
  const data = await getOptions(species)
  genoOptions.value = data[0]
  phenoOptions.value = data[1]
  environmentOptions.value = data[2]
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
  margin: 0 auto;
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
  padding-bottom: 2rem;
}

.table {
  width: 80vw;
  margin: 0 auto;
}

.filled {
  width: 100%;
}
</style>
