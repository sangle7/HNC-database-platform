import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, DatasourceTable, LineChart, Breadcrumb } from '../../components'

const Surviral = props => {
  const { loading, dataSource, location, history } = props

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
    loading,
    columns: [{
      title: 'Mut. Gene',
      dataIndex: 'Mut. Gene',
    }, {
      title: 'Sample ID',
      dataIndex: 'id',
    }, {
      title: 'Surviral time(Mon.)',
      dataIndex: 'Surviral time',
    }, {
      title: 'Therapeutic approaches',
      dataIndex: 'Therapeutic approaches',
    }],
  }
  const TabProps = {
    transform: false,
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
  return ( <div>
    <Breadcrumb {...BreadcrumbProps} />
    <main>
      <Tabs {...TabProps} />
    </main>
  </div>)
}

Surviral.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default Surviral
