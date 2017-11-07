import React from 'react'
import { Link } from 'react-router-dom'
import { DatasourceTable } from '../../components'

const Drugs = props => {
  const { loading, dataSource } = props

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Drug name',
      dataIndex: 'name',
    }, {
      title: 'PMID',
      dataIndex: 'pubmed_id',
    }, {
      title: 'Evidence',
      dataIndex: 'evidence',
    }, {
      title: 'Efficacy',
      dataIndex: 'efficacy',
    }, {
      title: 'More',
      dataIndex: 'more',
      render:(value,record) => (<Link to={`/Datasets/drugs/${record.name}`}>more</Link>),
    }],
  }
  return <DatasourceTable {...TableProps} />
}

export default Drugs
