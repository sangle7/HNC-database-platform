import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, DatasourceTable, Heatmap, BoxPlot } from '../../components'

const Expression = props => {
  const { loading, dataSource, onclickcb } = props

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Annotation',
      dataIndex: 'Annotation',
    }, {
      title: 'Sample ID',
      dataIndex: 'id',
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
    transform: true,
    tabs: [{
      key: 'Table',
      title: 'Table',
      content: <DatasourceTable {...TableProps} />,
    }, {
      key: 'Graph',
      title: 'Graph',
      content: <div style={{display: 'flex'}}><Heatmap /><BoxPlot/></div>,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return <BoxPlot dataSource={dataSource} onclickcb={onclickcb}/>
}
Expression.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default Expression
