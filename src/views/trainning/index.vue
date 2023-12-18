<template>
  <div class="top_form">
    <el-form class="form" :rules="rules" ref="formRef" :model="modelsForm" label-position="right" label-width="220px">
      <div class="num_title">Select Dataset</div>
      <el-form-item label="Genomic Dataset Selection" prop="datasetGenoId" label-width="220px">
        <el-select v-model="modelsForm.datasetGenoId" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in genoOptions" :key="item.datasetId" :label="item.datasetName"
            :value="item.datasetId" />
        </el-select>
      </el-form-item>
      <el-form-item label="Phenotype Dataset Selection" prop="datasetPhenoId" label-width="220px">
        <el-select v-model="modelsForm.datasetPhenoId" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in phenoOptions" :key="item.datasetId" :label="item.datasetName"
            :value="item.datasetId" />
        </el-select>
      </el-form-item>
      <el-form-item label="Environment Dataset Selection" prop="datasetEnvirId" label-width="220px">
        <el-select v-model="modelsForm.datasetEnvirId" placeholder="Select a dataset" class="filled">
          <el-option v-for="item in environmentOptions" :key="item.datasetId" :label="item.datasetName"
            :value="item.datasetId" />
        </el-select>
      </el-form-item>
      <el-form-item label="label type" prop="labelType">
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
        <el-col :span="8"> <el-form-item label="Learning_Rate(10^(-7)-0.01)" prop="lr">
            <el-input-number :controls="false" v-model="modelsForm.lr" :precision="7" :min="Math.pow(10, -7)"
              :max="0.01" />
          </el-form-item></el-col>
        <el-col :span="8"> <el-form-item label="Drop_Out(0.2-0.5)" prop="dropout">
            <el-input-number :controls="false" v-model="modelsForm.dropout" :precision="1" :min="0.2" :max="0.5" />
          </el-form-item></el-col>
        <el-col :span="8"> <el-form-item label="Batch_Size(16-256)" prop="batch">
            <el-input-number :controls="false" v-model="modelsForm.batch" :min="16" :max="256" />
          </el-form-item></el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="Num_Layer(1-15)" prop="depth">
            <el-input-number :controls="false" v-model="modelsForm.depth" :min="1" :max="15" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Neurons1(128-512)" prop="neurons1">
            <el-input-number :controls="false" v-model="modelsForm.neurons1" :min="128" :max="512" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Neurons2(16-64)" prop="neurons2">
            <el-input-number :controls="false" v-model="modelsForm.neurons2" :min="16" :max="64" />
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
      <el-form-item label="Email Address" prop="email">
        <el-input v-model="modelsForm.email" placeholder="Please input Email Address"></el-input>
      </el-form-item>
      <div class="num_title">INPUT MODEL NAME</div>
      <el-form-item label="Model Name" prop="name">
        <el-input v-model="modelsForm.name" placeholder="Please input Model name"></el-input>
      </el-form-item>
      <el-form-item label="Action">
        <el-button type="primary" :icon="Promotion" @click="handleRun">RUN</el-button>
        <el-button type="primary" :icon="Refresh" @click="() => formRef.resetFields()">Reset</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>


<script setup name="TrainningModels">
import { ref, reactive, getCurrentInstance, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Promotion,Refresh } from '@element-plus/icons-vue';
import { getOptions } from '@/api/datasets';
import { trainningModelsRun } from '@/api/trainningModels';
import { parseModelsForm, parseRules } from '@/views/trainning/parse';

// vue示例工具
const { proxy: { $modal } } = getCurrentInstance();
// 路由实例
const router = useRouter();
const route = useRoute();

// 传递的物种参数
const species = route.params.species;

// 表单实例
const formRef = ref();

// 表单参数
const modelsForm = reactive(route.params.model ?? parseModelsForm(false));

// 表单中的一些已知和补充信息
const otherLabelType = ref('');
const genoOptions = [];
const phenoOptions = [];
const environmentOptions = [];
const algorithmOptions = [{value: 'optunaTrain',label: 'optunaTrain'}]; // 运用哪种算法

const labelType = computed(() => modelsForm.labelType === 'Other' ? otherLabelType.value : modelsForm.labelType);
// 预测
function handleRun() {
  formRef.value.validate(valid => {
    if (valid) {
      // 预测接口
      trainningModelsRun({ ...modelsForm, labelType: labelType.value }).then(() => {
        $modal.msgSuccess('success!');
        router.push(`/models/${species}`);
      });
    } else {
      $modal.msgError('submit error');
      return false;
    }
  });
}

// 校验规则
const rules = reactive({
  ...parseRules(modelsForm), name: [
    { required: true, message: 'Please input Model Name', trigger: 'blur' }
  ]
});

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


.filled {
  width: 100%;
}
</style>
