export function parseHPOMode(row) {
  return ''+row.lr+row.dropout+row.neurons1+row.neurons2+row.batch+row.depth
}

export const dataType = ['genotype_data','phenotype_data','environmental_data']