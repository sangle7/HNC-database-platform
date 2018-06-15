import React from 'react'
import queryString from 'query-string'
import { Icon } from 'antd'
import Wrapper from '../wrapper'
import { DatasourceTable, Search, Card } from '../../components'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'

const GeneList = props => {
  const { location, history, dataSource, loading, pagination } = props

  const TableProps = {
    columns: [{
      title: 'id',
      dataIndex: 'id',
    }, {
      title: 'hgncID',
      dataIndex: 'hgncid',
      render: v => <a href={`https://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id=${v}`}>{v}</a>,
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
    nwrap: true,
    scroll: { x: true },
    onChange: page => {
      const search = {
        ...queryString.parse(location.search),
        page: page.current,
        download: 0,
      }
      history.push(`/Gene?${queryString.stringify(search)}`)
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
    <Card title={<div><i className="fa fa-lg fa-fw fa-list-alt" /><span>Gene Data List</span></div>}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '.2rem' }}>
        <Search {...SearchProps} />
      </div>
      <DatasourceTable {...TableProps} />
    </Card>
  )
}

export default Wrapper(GeneList, `${prefix}/genes`)
