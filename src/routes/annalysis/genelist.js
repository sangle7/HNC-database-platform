import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Breadcrumb, DatasourceTable, Search } from '../../components'

const GeneList = props => {
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
      }
      history.push(`/Annalysis/Gene?${queryString.stringify(search)}`)
    },
    onRowClick: record => {
      history.push(`/Annalysis/Gene/${record.symbol}`)
    },
  }

  const SearchProps = {
    title: <Icon type="search" />,
    placeholder: 'Search id/hgncid/symbol',
    onSearch: value => {
      history.push(`/Annalysis/Gene?q=${value}`)
    },
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Breadcrumb {...BreadcrumbProps} />
        <Search {...SearchProps} />
      </div>
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