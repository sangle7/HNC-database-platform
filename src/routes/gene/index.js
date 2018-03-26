import React from 'react'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Header, Card, Tabs, Search, HeatMapTable } from '../../components'
import HGenelist from './hocgenelist'

const Gene = props => {
  const { location, history } = props

  const params = queryString.parse(location.search)

  const SearchProps = {
    title: <Icon type="search" />,
    placeholder: 'Search id/hgncid/symbol',
    onSearch: value => {
      history.push(`/Gene?q=${value}`)
    },
  }

  const HeatmapProps = {
    // dataSource,
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
      <Header title="Gene Data"/>
      <HGenelist history={history} location={location} />
      <Card title="Data Heat Map">
        <Tabs {...TabProps}/>
      </Card>
    </div>
  )
}


export default Gene
