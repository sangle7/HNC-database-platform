import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { Tabs, DatasourceTable, Heatmap, BoxPlot } from '../../components'

const Expression = props => {
  const { loading, dataSource, onclickcb } = props

  const TableProps = {
    dataSource,
    loading,
    grow: false,
    columns: [{
      title: 'Sample ID',
      dataIndex: 't',
    }, {
      title: 'Value',
      dataIndex: 'v',
    }],
  }
  const TabProps = {
    transform: true,
    tabs: [{
      key: 'Table',
      title: <span><Icon type="layout" />Table</span>,
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
  return (
  <div style={{display: 'flex',justifyContent: 'space-around'}}>
    <BoxPlot dataSource={dataSource} onclickcb={onclickcb}/>
    <DatasourceTable {...TableProps} />
  </div>)
}
Expression.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default Expression
