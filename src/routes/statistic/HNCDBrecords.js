import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { Tabs, Card,  DatasourceTable, BarChart } from '../../components'
import { countFromArray } from '../../const'
import Wrapper from '../wrapper'


const HNCDB = props => {
  const { loading, dataSource, geneId } = props

  const data = countFromArray(dataSource, 'mol_event')

  const TableProps = {
    dataSource,
    loading,
    pagination:false,
    scroll:{y:330,x:false},
    columns: [{
      title: 'Gene Name',
      dataIndex: 'name',
      render: () => (geneId),
      width:'10%',
    }, {
      title: 'PMID',
      dataIndex: 'pmid',
      width:'10%',
      render:v => <a href={`https://www.ncbi.nlm.nih.gov/pubmed/?term=${v}`}>{v}</a>
    }, {
      title: 'Molecular Event',
      dataIndex: 'mol_event',
      width:'25%',
    }, {
      title: 'Function in HNC',
      dataIndex: 'note',
      width:'55%',
      render: value => <span title={value}>{value.length > 80 ? `${value.slice(0, 80)}...` : value}</span>,
    }],
  }
  const TabProps = {
    tabs: [{
      key: 'Graph',
      title: <span><Icon type="bar-chart" />Graph</span>,
      content: <BarChart data={data} />,
    }, {
      key: 'Table',
      title: <span><Icon type="layout" />Table</span>,
      content: <DatasourceTable {...TableProps} />,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return (
  <Card title={<div><i className="fa fa-table fa-fw fa-lg"/><span>Gene Records</span></div>}>
    <Tabs {...TabProps} />
  </Card>)
}

const HHNCDB = Wrapper(HNCDB, '/cgi/gene/init', null, { step: '1' })

export default HHNCDB
