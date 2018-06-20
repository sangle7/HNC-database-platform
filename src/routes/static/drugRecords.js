import React from 'react'
import { Card, DatasourceTable } from '../../components'
import Wrapper from '../wrapper'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'

const HNCDB = props => {
  const { loading, dataSource = [], drugId } = props

  const TableProps = {
    dataSource,
    loading,
    pagination: false,
    scroll: { y: 330, x: true },
    columns: [{
      title: 'Drug Name',
      dataIndex: 'name',
      render: () => (drugId),
    }, {
      title: 'PMID',
      dataIndex: 'pubmed_id',
      render: v => <a href={`https://www.ncbi.nlm.nih.gov/pubmed/?term=${v}`}>{v}</a>,
    }, {
      title: 'Tumor Site',
      dataIndex: 'tumor_site',
    }, {
      title: 'Efficacy',
      dataIndex: 'efficacy',
    }, {
      title: 'Evidence',
      dataIndex: 'evidence',
    }, {
      title: 'Note',
      dataIndex: 'note',
      render: value => <span title={value}>{value.length > 80 ? `${value.slice(0, 50)}...` : value}</span>,
    }, {
      title: 'Confidence',
      dataIndex: 'confidence',
    }],
  }
  return (
    <Card title={<div><i className="fa fa-bar-chart fa-lg" /><span>Drug Records</span></div>}>
      <DatasourceTable {...TableProps} />
    </Card>)
}

const HHNCDB = Wrapper(HNCDB, `${prefix}/drug/record`, null, { step: '1' })

export default HHNCDB
