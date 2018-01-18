import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, DatasourceTable, Heatmap, PieChart } from '../../components'

const CNV = props => {
  const { loading, dataSource } = props

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Sample ID',
      dataIndex: 'id',
    }, {
      title: 'Gene',
      dataIndex: 'Gene',
    }, {
      title: 'Copy number',
      dataIndex: 'Copy number',
    }, {
      title: 'Segment Mean',
      dataIndex: 'Segment Mean',
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
      content: <div style={{display: 'flex', flexDirection:'column'}}><div style={{display: 'flex'}}><div /><PieChart /></div><Heatmap /></div>,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return <Tabs {...TabProps} />
}
CNV.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default CNV
