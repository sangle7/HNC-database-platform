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
