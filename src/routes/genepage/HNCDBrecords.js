import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, DatasourceTable, BarChart } from '../../components'
import { countFromArray } from '../../const/function'

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
      render: value => <span title={value}>{value.length > 50 ? `${value.slice(0, 50)}...` : value}</span>,
    }],
  }
  const TabProps = {
    tabs: [{
      key: 'Graph',
      title: 'Graph',
      content: <BarChart data={data} />,
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

HNCDB.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
}

export default HNCDB
