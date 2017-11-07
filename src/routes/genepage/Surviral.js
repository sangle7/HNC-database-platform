import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, DatasourceTable, LineChart } from '../../components'

const Surviral = props => {
  const { loading, dataSource } = props

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Mut. Gene',
      dataIndex: 'Mut. Gene',
    }, {
      title: 'Sample ID',
      dataIndex: 'Sample ID',
    }, {
      title: 'Surviral time(Mon.)',
      dataIndex: 'Surviral time',
    }, {
      title: 'Therapeutic approaches',
      dataIndex: 'Therapeutic approaches',
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

Surviral.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default Surviral
