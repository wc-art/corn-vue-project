// 初始化表单
export function parseModelsForm(type) {
  if(type) return {
    datasetGenoId: null,
    datasetPhenoId: null,
    datasetEnvirId: null,
    labelType: null,
    lrStart: Math.pow(10, -7),
    lrEnd: 2*Math.pow(10, -7),
    dropoutStart: 0.2,
    dropoutEnd: 0.3,
    batchStart: 16,
    batchEnd: 17,
    depthEnd: 2,
    depthStart: 1,
    neurons1Start: 128,
    neurons1End: 129,
    neurons2Start: 16,
    neurons2End: 17,
    algorithm: null,
    email: '',
  }
  else return {
    datasetGenoId: null,
    datasetPhenoId: null,
    datasetEnvirId: null,
    labelType: null,
    lr: Math.pow(10, -7),
    dropout: 0.2,
    batch: 16,
    depth: 1,
    neurons1: 128,
    neurons2: 16,
    algorithm: null,
    email: '',
    name: '',
  }
}

const validateNumRange = (form,value1,value2) => (rule, value, callback) => {
  if (form[value1]>=form[value2]) {
    callback(new Error('Please enter a valid range of numbers.'))
  }
  else  callback()
}

export function parseRules(modelsForm) {
  return {
    datasetGenoId: [
      { required: true, message: 'Please Select a dataset', trigger: 'change' }
    ],
    datasetPhenoId: [
      { required: true, message: 'Please Select a dataset', trigger: 'change' }
    ],
    datasetEnvirId: [
      { required: true, message: 'Please Select a dataset', trigger: 'change' }
    ],
    labelType: [
      { required: true, message: 'Please Select a Label type', trigger: 'change' }
    ],
    lr: [
      { validator: validateNumRange(modelsForm,'lrStart','lrEnd'), trigger: 'blur' }
    ],
    dropout: [
      { validator: validateNumRange(modelsForm,'dropoutStart','dropoutEnd'), trigger: 'blur' }
    ],
    batch: [
      { validator: validateNumRange(modelsForm,'batchStart','batchEnd'), trigger: 'blur' }
    ],
    depth: [
      { validator: validateNumRange(modelsForm,'depthStart','depthEnd'), trigger: 'blur' }
    ],
    neurons1: [
      { validator: validateNumRange(modelsForm,'neurons1Start','neurons1End'), trigger: 'blur' }
    ],
    neurons2: [
      { validator: validateNumRange(modelsForm,'neurons2Start','neurons2End'), trigger: 'blur' }
    ],
    algorithm: [
      { required: true, message: 'please select a Algorithm', trigger: 'blur' }
    ],
    email: [
      { required: true, message: 'Please input email', trigger: 'blur' },
      { type: 'email', message: 'Please input a valid email address', trigger: ['blur', 'change'] }
    ],
  }
}

export function parseStatus(status) {
  if(status===0) {
    return 'Running...'
  } else if(status ===1) {
    return 'Run successful'
  } else {
    return 'Run failed'
  }
}

