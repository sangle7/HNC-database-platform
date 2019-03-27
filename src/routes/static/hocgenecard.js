import React from 'react'
import { Card, DatasourceTable } from '../../components'
import Wrapper from '../wrapper'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'

const gData = item => {
  const arr = []
  for (const key in item) {
    arr.push({
      id: key,
      key,
      value: item[key] || 'N/A',
    })
  }
  return arr
}


function aaa(v, record) {
  switch(record.key){
    case 'entrezid':
    return <a href ={`http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?db=gene&cmd=Retrieve&dopt=full_report&list_uids=${v}`}>{v}</ a>
    break;
    case 'omimid':
    return <a href = {`http://omim.org/entry/${v}`}>{v}</ a>
    break;
    case 'uniprotid':
    return <a href = {`http://www.uniprot.org/uniprot/${v}`}>{v}</ a>
    break;
    case 'ensemblid':
    return <a href = {`http://asia.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${v}`}>{v}</ a>
    break;
    case 'refseqid':
    return <a href = {`http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?db=Nucleotide&cmd=Search&doptcmdl=GenBank&term=${v}`}>{v}</ a>
    break;
    default:
    return v
  }
}

const Genecard = props => {
  const { item, loading } = props
  const TableProps = {
    showHeader: false,
    scroll:{y:250},
    dataSource: item ? gData(item) : [],
    columns: [{
      title: 'key',
      dataIndex: 'key',
      width: '30%',
    }, {
      title: 'value',
      dataIndex: 'value',
      width: '70%',
      render: aaa,
    }],
    loading,
    pagination: false,
  }
  return (
    <Card title={<div><i className="fa fa-list-alt fa-fw fa-lg" /><span>Gene Basic Information</span></div>}>
      <DatasourceTable {...TableProps} />
    </Card>
  )
}

const HGenecard = Wrapper(Genecard, `${prefix}/gene/init`, null, { step: '0' })
export default HGenecard
