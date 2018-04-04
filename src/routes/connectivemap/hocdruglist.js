import React from 'react'
import queryString from 'query-string'
import { Icon, Button } from 'antd'
import Wrapper from '../wrapper'
import { Breadcrumb, HeatMapTable, Header,Tabs, DatasourceTable, Search, Download, Card } from '../../components'

const Druglist = props => {
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
    }
  }

  const SearchProps = {
    title: <Icon type="search" />,
    placeholder: 'Search drug name',
    onSearch: value => {
      history.push(`/ConnectiveMap?q=${value}`)
    },
  }


  return (
    <Card title={<div><Icon type="appstore" /><span>Drug Data List</span></div>}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Search {...SearchProps} />
      </div>
      <DatasourceTable {...TableProps} />
    </Card>
  )
}

export default Wrapper(Druglist,'/cgi/drugs')
