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
      width:100,
      render: () => (drugId),
    }, {
      title: 'PMID',
      dataIndex: 'pubmed_id',
      render: v => <a href={`https://www.ncbi.nlm.nih.gov/pubmed/?term=${v}`}>{v}</a>,
      width:100,
    }, {
      title: 'Tumor Site',
      width:100,
      dataIndex: 'tumor_site',
    }, {
      title: 'Efficacy',
      width:100,
      dataIndex: 'efficacy',
    }, {
      title: 'Evidence',
      width:100,
      dataIndex: 'evidence',
    }, {
      title: 'Note',
      width:200,
      dataIndex: 'note',
      render: value => value && <span title={value}>{value.length > 50 ? `${value.slice(0, 50)}...` : value}</span>,
    }, {
      title: 'Confidence',
      width:100,
      dataIndex: 'confidence',
    }],
  }
  return (
    dataSource[0] ? <Card title={<div><i className="fa fa-bar-chart fa-lg" /><span>Drug Records</span></div>}>
      <DatasourceTable {...TableProps} />
    </Card> : null)
}

const HHNCDB = Wrapper(HNCDB, `${prefix}/drug/record`, null, { step: '1' })

export default HHNCDB
