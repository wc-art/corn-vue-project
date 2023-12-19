export function parseHPOMode(row) {
  return `${row.lr},${row.dropout},${row.neurons1},${row.neurons2},${row.batch},${row.depth}`
}


// 返回接口返回值
export async function parseResult(func,...params) {
  let res = await func(...params)
  res = res.data??res
  return res
}

export const dataType = ['genotype_data','phenotype_data','environmental_data']

// 将数字变成字符
export function parseString(form) {
  // let {batch,batchStart,batchEnd,lr,lrStart,lrEnd,depthStart,depthEnd,depth,neurons1Start,neurons1End,neurons1,neurons2Start,neurons2End,neurons2,dropoutStart,dropoutEnd,dropout} = form
  // batch = batch ?? ''+form.batch
  // batchStart = batchStart
}