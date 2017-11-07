import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, DatasourceTable, LineChart } from '../../components'

const Expression = props => {
  const { loading, dataSource } = props

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Annotation',
      dataIndex: 'Annotation',
    }, {
      title: 'Sample ID',
      dataIndex: 'Sample ID',
    }, {
      title: 'Gender',
      dataIndex: 'Gender',
    }, {
      title: 'Project',
      dataIndex: 'Project',
    }, {
      title: 'Expr.(log2)',
      dataIndex: 'Expr',
    }],
  }
  const TabProps = {
    tabs: [{
      key: 'Graph',
      title: 'Graph',
      content: <LineChart />,
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
Expression.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default Expression
