import React from 'react'
import {Icon} from 'antd'
import { Card, DatasourceTable } from '../../components' 
import Wrapper from '../wrapper'

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
    dataSource: item ? gData(item) :[],
    pagination: false,
    scroll:{y:300,x:false},
    columns: [{
      title:'key',
      dataIndex:'key',
      width:'30%'
    },{
      title:'value',
      dataIndex:'value',
      width:'70%'
    }],
    loading,
  }
  return (
    <Card title={<div><i className="fa fa-table fa-fw fa-lg"/><span>Case Information</span></div>}>
      <DatasourceTable {...TableProps} />
    </Card>
  )
}

const HCasecard = Wrapper(Casecard, '/cgi/case/item')
export default HCasecard
