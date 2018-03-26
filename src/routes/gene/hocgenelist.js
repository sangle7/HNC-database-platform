import React from 'react'
import queryString from 'query-string'
import { Icon, Button } from 'antd'
import Wrapper from '../wrapper'
import { Breadcrumb, HeatMapTable, Header,Tabs, DatasourceTable, Search, Download, Card } from '../../components'

const GeneList = props => {
  const { location, history, dataSource, loading, pagination, url } = props

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


  return (
    <Card title={<div><Icon type="appstore" /><span>Gene Data List</span></div>}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Search {...SearchProps} />
      </div>
      <DatasourceTable {...TableProps} />
    </Card>
  )
}

export default Wrapper(GeneList,'/cgi/genes')
