import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Tabs, DatasourceTable, PieChart } from '../../../components'

const DatasetsRecords = props => {
  const { location, history, dataSource } = props
  const BreadcrumbProps = {
    path: location.pathname,
    handleClick (index) {
      const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
      if (newpath !== location.pathname) {
        history.push(newpath)
      }
    },
  }

  const TableProps = {
    dataSource,
    columns: [{
      title: 'PMID',
      dataIndex: 'id',
    }, {
      title: 'Journal',
      dataIndex: 'Journal',
    }, {
      title: 'First Author',
      dataIndex: 'First Author',
    }, {
      title: 'Object',
      dataIndex: 'Object',
    }, {
      title: 'Associated data profiles',
      dataIndex: 'Associated data profiles',
    }, {
      title: 'Molecular',
      dataIndex: 'Molecular',
    }, {
      title: 'Function in HNC',
      dataIndex: 'Function in HNC',
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
      content: <div style={{ display: 'flex', flexWrap: 'wrap' }}><PieChart /><PieChart /><PieChart /></div>,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return (
    <div>
      <Breadcrumb {...BreadcrumbProps} />
      <Tabs {...TabProps} />
    </div>
  )
}

DatasetsRecords.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default DatasetsRecords
