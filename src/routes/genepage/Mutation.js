import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, DatasourceTable, NeedlePlot } from '../../components'

const Mutation = props => {
  const { loading, dataSource } = props

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Sample ID',
      dataIndex: 'id',
    }, {
      title: 'AA Change',
      dataIndex: 'AA Change',
    }, {
      title: 'Type',
      dataIndex: 'Type',
    }, {
      title: 'Copy',
      dataIndex: 'Copy',
    }, {
      title: 'Mutation assessor',
      dataIndex: 'Mutation assessor',
    }, {
      title: 'Allele Freq',
      dataIndex: 'Allele Freq',
    }, {
      title: 'Mut in sample',
      dataIndex: 'Mut in sample',
    }],
  }
  const TabProps = {
    transform: true,
    tabs: [{
      key: 'Table',
      title: 'Table',
      content: <DatasourceTable {...TableProps} />,
    }, {
      key: 'Graph',
      title: 'Graph',
      content: <NeedlePlot />,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return <Tabs {...TabProps} />
}

Mutation.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default Mutation
