import React from 'react'
import queryString from 'query-string'
import { Icon } from 'antd'
import Wrapper from '../wrapper'
import { DatasourceTable, Search, Card } from '../../components'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'

const Druglist = props => {
  const { location, history, dataSource, loading, pagination } = props

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
    }, {
      title: 'description',
      dataIndex: 'description',
      render: v => <span title={v}>{v.length > 100 ? `${v.slice(0, 100)}...` : v}</span>,
    }],
    dataSource,
    loading,
    pagination,
    nwrap: true,
    scroll: { x: true },
    onChange: page => {
      const search = {
        ...queryString.parse(location.search),
        page: page.current,
      }
      history.push(`/ConnectiveMap?${queryString.stringify(search)}`)
    },

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '.2rem' }}>
        <Search {...SearchProps} />
      </div>
      <DatasourceTable {...TableProps} />
    </Card>
  )
}

export default Wrapper(Druglist, `${prefix}/drugs`)
