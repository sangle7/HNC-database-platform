import React from 'react'
import { Card, DatasourceTable } from '../../components' 
import Wrapper from '../wrapper'

const env = process.env.NODE_ENV;
const prefix = env === 'production' ? '' : '/cgi'

const gData = item => {
  const arr = []
  for (let key in item) {
    arr.push({
      id: key,
      key: key,
      value: item[key] || 'N/A'
    })
  }
  return arr
}

const Casecard = props => {
  const { item, loading } = props
  const TableProps = {
    showHeader: false,
    pagination: false,
    scroll: { y: 500, x: false },
    dataSource: item ? gData(item) : [],
    columns: [{
      title: 'key',
      dataIndex: 'key',
      width: '30%'
    }, {
      title: 'value',
      dataIndex: 'value',
      width: '70%'
    }],
    loading,
  }
  return (
    <Card title={<div><i className="fa fa-medkit fa-fw fa-lg"/><span>Drug Information</span></div>}>
      <DatasourceTable {...TableProps} />
    </Card>
  )
}

const HCasecard = Wrapper(Casecard, `${prefix}/drug/item`)
export default HCasecard
