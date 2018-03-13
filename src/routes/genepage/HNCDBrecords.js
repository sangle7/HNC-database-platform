import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { Tabs, DatasourceTable, BarChart } from '../../components'
import { countFromArray } from '../../const'

const HNCDB = props => {
  const { loading, dataSource } = props

  const data = countFromArray(dataSource, 'mol_event')

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Gene Name',
      dataIndex: 'name',
      render: () => (props.match.params.geneId),
    }, {
      title: 'PMID',
      dataIndex: 'pmid',
    }, {
      title: 'Molecular Event',
      dataIndex: 'mol_event',
    }, {
      title: 'Function in HNC',
      dataIndex: 'note',
      render: value => <span title={value}>{value.length > 70 ? `${value.slice(0, 70)}...` : value}</span>,
    }],
  }
  const TabProps = {
    transform: true,
    tabs: [{
      key: 'Graph',
      title: <span><Icon type="bar-chart" />Graph</span>,
      content: <BarChart data={data} />,
    }, {
      key: 'Table',
      title: <span><Icon type="layout" />Table</span>,
      content: <DatasourceTable {...TableProps} />,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return <Tabs {...TabProps} />
}

HNCDB.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
}

export default HNCDB
