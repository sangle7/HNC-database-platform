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

const Genecard = props => {
  const { item, loading } = props
  const TableProps = {
    showHeader: false,
    dataSource: item ? gData(item) :[],
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
    pagination:false,
  }
  return (
    <Card title={<div><i className="fa fa-list-alt fa-fw fa-lg"/><span>Gene Basic Information</span></div>}>
      <DatasourceTable {...TableProps} />
    </Card>
  )
}

const HGenecard = Wrapper(Genecard, '/cgi/gene/init')
export default HGenecard