import React from 'react'
import { DatasourceTable } from '../../components'

const Drugs = props => {
  const { loading, dataSource } = props

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Drug name',
      dataIndex: 'Drug name',
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
      render:() => (<h5>hi more</h5>),
    }],
  }
  return <DatasourceTable {...TableProps} />
}

export default Drugs
