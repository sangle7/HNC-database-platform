import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { Breadcrumb, Tabs, DatasourceTable, PieChart } from '../../../components'

const DatasetsRecords = props => {
  const { location, history, dataSource, loading, pagination } = props
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
      title: 'PMID',
      dataIndex: 'pmid',
      width:60,
    },{
      title: 'Date',
      dataIndex: 'date',
      width:60,
    },{
      title: 'Author',
      dataIndex: 'author',
      width:200,
    },{
      title: 'Journal',
      dataIndex: 'journal',
      width:100
    },{
      title: 'Journal Abbv',
      dataIndex: 'journal_abbv',
      width:70
    },{
      title: 'Vol.',
      dataIndex: 'volume',
      width:50
    },{
      title: 'Issue',
      dataIndex: 'issue',
      width:50
    },{
      title: 'Title',
      dataIndex: 'title',
      width:300
    }],
    scroll: { x: 2000, y: 600 },
    pagination,
    expandedRowRender:record => record.abstract,
    onChange: page => {
      const search = {
        ...queryString.parse(location.search),
        page: page.current,
      }
      props.history.push(`/Datasets/Records?${queryString.stringify(search)}`)
    },
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
