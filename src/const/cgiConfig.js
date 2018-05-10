const env = process.env.NODE_ENV;
const prefix = env === 'production' ? '' : '/cgi'

const cgiConfig = {
  geneHeatmap: `${prefix}/gene/heatmap`,
  drugHeatmap: `${prefix}/drug/heatmap`,
  genes: `${prefix}/genes`,
  gene: `${prefix}/gene/init`,
  genesug: `${prefix}/gene/sug`,
  survivalsug: `${prefix}/gene/survivalsug`,
  drugs: `${prefix}/drugs`,
  drug: `${prefix}/drug/item`,
  case: `${prefix}/case/item`,
  corr: `${prefix}/corr/init`,
  diff: `${prefix}/diff/init`,
  diffboxplot: `${prefix}/diff/boxplot`,
  difftable: `${prefix}/diff/table`,
  statistics: `${prefix}/statistics`,
  public: `${prefix}/public`,
}

export default cgiConfig