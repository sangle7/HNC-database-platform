import React from 'react'
import { Tabs, DatasourceTable } from '../../components'
import { countFromArray } from '../../const/function'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const HNCDB = props => {
  const { loading, dataSource } = props

  const data = countFromArray(dataSource, 'mol_event')
  const Chart = () =>(<BarChart layout='vertical' width={800} height={300} data={data}
    barCategoryGap="20%" barSize={40}
    margin={{top: 5, right: 30, left: 50, bottom: 5}}>
    <XAxis type="number" /> 
    <YAxis dataKey="name" type="category" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Bar dataKey="count" fill="#8884d8" />
  </BarChart>)

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Gene Name',
      dataIndex: 'name',
      render: () => (props.match.params.geneId),
    }, {
      title: 'PMID',
      dataIndex: 'pmid',
    }, {
      title: 'Molecular Event',
      dataIndex: 'mol_event',
    }, {
      title: 'Function in HNC',
      dataIndex: 'func',
    }],
  }
  const TabProps = {
    tabs: [{
      key: 'Graph',
      title: 'Graph',
      content: <Chart />,
    }, {
      key: 'Table',
      title: 'Table',
      content: <DatasourceTable {...TableProps} />,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return <Tabs {...TabProps} />
}

export default HNCDB
