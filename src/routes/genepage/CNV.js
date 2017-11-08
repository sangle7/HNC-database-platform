import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, DatasourceTable, LineChart } from '../../components'

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
    tabs: [{
      key: 'Table',
      title: 'Table',
      content: <DatasourceTable {...TableProps} />,
    }, {
      key: 'Graph',
      title: 'Graph',
      content: <LineChart />,
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
