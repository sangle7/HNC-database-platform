import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
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
      render: (value, record) => (<Link to={`/Annalysis/Drug/${record.name}`}><Icon type="arrow-right" /></Link>),
    }],
  }
  return <DatasourceTable {...TableProps} />
}

Drugs.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default Drugs
