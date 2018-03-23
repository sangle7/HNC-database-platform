import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Icon, Button } from 'antd'
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

  const HeatmapProps = {
    // dataSource,
    loading,
    onCellClick: (gene, c, t) => {
      history.push(`/statistics?t=${t}&geneId=${gene}&caseId=${c}`)      
    },
  }

  const TabProps = {
    transform: false,
    tabs: [{
      key: 'tab1',
      title: 'tab1',
      content: [
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Search {...SearchProps} />
      </div>,<HeatMapTable t={'tab1'} {...HeatmapProps} />],
    }, {
      key: 'Graph',
      title: 'tab2',
      content: [
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Search {...SearchProps} />
      </div>,<HeatMapTable t={'tab2'} {...HeatmapProps} />],
    }],
    onChange (key) {
      console.log(key)
    },
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
        <Tabs {...TabProps}/>
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
