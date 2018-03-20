import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Breadcrumb, DatasourceTable, Search, Download } from '../../components'

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

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Breadcrumb {...BreadcrumbProps} />
        <Search {...SearchProps} />
      </div>
      <Download query={location.search} url={url}/>      
      <DatasourceTable {...TableProps} />
    </div>
  )
}

GeneList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default GeneList
