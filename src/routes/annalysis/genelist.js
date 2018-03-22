import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Icon, Button } from 'antd'
import { Breadcrumb, HeatMapTable, Header, DatasourceTable, Search, Download, Card } from '../../components'

const GeneList = props => {
  const { location, history, dataSource, loading, pagination, url } = props
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
    columns: [{
      title: 'id',
      dataIndex: 'id',
    }, {
      title: 'hgncid',
      dataIndex: 'hgncid',
    }, {
      title: 'symbol',
      dataIndex: 'symbol',
    }, {
      title: 'description',
      dataIndex: 'description',
    }],
    dataSource,
    loading,
    pagination,
    onChange: page => {
      const search = {
        ...queryString.parse(location.search),
        page: page.current,
        download: 0,
      }
      history.push(`/Gene?${queryString.stringify(search)}`)
    },
    onRowClick: record => {
      history.push(`/Gene/${record.symbol}`)
    },
  }

  const SearchProps = {
    title: <Icon type="search" />,
    placeholder: 'Search id/hgncid/symbol',
    onSearch: value => {
      history.push(`/Gene?q=${value}`)
    },
  }

  const HeatmapProps = {
    // dataSource,
    loading
  }


  return (
    <div>
      <Header title="gene data"/>
      <Card title={<div><Icon type="appstore" /><span>Gene Data List</span></div>}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Search {...SearchProps} />
        </div>
        <DatasourceTable {...TableProps} />
      </Card>
      <Card title="Data Heat Map">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Search {...SearchProps} />
        </div>
        <HeatMapTable {...HeatmapProps} />
      </Card>
    </div>
  )
}

GeneList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default GeneList
