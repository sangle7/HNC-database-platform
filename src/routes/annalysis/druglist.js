import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Header, Card, HeatMapTable, DatasourceTable, Search } from '../../components'

const GeneList = props => {
  const { location, history, dataSource, loading, pagination, url } = props

  const TableProps = {
    columns: [{
      title: 'dbid',
      dataIndex: 'dbid',
    }, {
      title: 'name',
      dataIndex: 'name',
    }, {
      title: 'category',
      dataIndex: 'category',
    },{
      title: 'description',
      dataIndex: 'description',
      render:v=><span title={v}>{v.length > 100 ? v.slice(0,100)+'...' : v}</span>
    }],
    dataSource,
    loading,
    pagination,
    onChange: page => {
      const search = {
        ...queryString.parse(location.search),
        page: page.current,
      }
      history.push(`/Annalysis/Drug?${queryString.stringify(search)}`)
    },
    onRowClick: record => {
      history.push(`/Annalysis/Drug/${record.name}`)
    },
  }

  const SearchProps = {
    title: <Icon type="search" />,
    placeholder: 'Search dbid/name',
    onSearch: value => {
      history.push(`/Annalysis/Drug?q=${value}`)
    },
  }

  const HeatmapProps = {
    // dataSource,
    loading
  }

  return (
    <div>
      <Header title="drug data"/>
      <Card title={<div><Icon type="appstore" /><span>Drug Data List</span></div>}>
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
