import React from 'react'
import { Card, DatasourceTable } from '../../components' 
import Wrapper from '../wrapper'

const env = process.env.NODE_ENV;
const prefix = env === 'production' ? '' : '/cgi'

const gArray = item => {
  const arr = []
  for (let key in item) {
    arr.push({
      id: key,
      key: key,
      value: item[key].join(', ') || 'N/A'
    })
  }
  return arr
}

const gData = list => {
  console.log(list)
  return list.reduce((pre,elem) => {
    for (let key in elem) {
      pre[key] = pre[key] || []
      pre[key].push(elem[key])
      pre[key] = Array.from(new Set(pre[key]))
    }
    return pre
  }, {})
}

const Casecard = props => {
  const { dataSource, loading } = props // list:[{}]

  const TableProps = {
    showHeader: false,
    dataSource: gArray(gData(dataSource)),
    pagination: false,
    scroll: { y: 300, x: false },
    columns: [{
      title: 'key',
      dataIndex: 'key',
      width: '30%'
    }, {
      title: 'value',
      dataIndex: 'value',
      width: '70%',
      render:(v,record) => record.key === 'PMID' ? <a href={`https://www.ncbi.nlm.nih.gov/pubmed/?term=${v}`}>{v}</a> : v
    }],
    loading,
  }
  return (
    <Card title={<div><i className="fa fa-table fa-fw fa-lg"/><span>Dataset Information</span></div>}>
      <DatasourceTable {...TableProps} />
    </Card>
  )
}

const HCasecard = Wrapper(Casecard, `${prefix}/case/item`)
export default HCasecard
