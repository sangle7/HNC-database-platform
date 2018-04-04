import React from 'react'
import queryString from 'query-string'
import { Icon, Button } from 'antd'
import Wrapper from '../wrapper'
import { Breadcrumb, HeatMapTable, Header,Tabs, DatasourceTable, Search, Download, Card } from '../../components'

class GeneList extends React.Component {
  state = {
    filter:'', //gene=value1&drug=value
  }
  onSearch = (v,key) => {
    const { filter } = this.state
    const obj = queryString.parse(filter)
    obj[key] = v
    const str = queryString.stringify(obj)

    this.setState({
      filter:str
    })
  }
  render () {
    const { location, history, dataSource, loading, pagination, url } = this.props
    const { filter } = this.state

    const SearchProps = {
      title: <Icon type="search" />,
      placeholder: 'Search Gene Name',
      onKeyUp:v => {this.onSearch(v.target.value,'gene')},
      onSearch:v => {this.onSearch(v,'gene')},
    }

    const Search2Props = {
      title: <Icon type="medicine-box" />,
      placeholder: 'Search Drug Name',
      onKeyUp:v => {this.onSearch(v.target.value,'drug')},
      onSearch:v => {this.onSearch(v,'drug')},
    }

    const HeatmapProps = {
      url: '/cgi/drug/heatmap',
      filter,
      onCellClick: (gene, c, t) => {
        history.push(`/statistics?t=${t}&geneId=${gene}&drugId=${c}`)      
      },
    }
    
    return (
      <Card title={<div><i className="fa fa-th fa-fw fa-lg"></i><span>Data Heat Map</span></div>}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Search {...Search2Props} />
          <Search {...SearchProps} />
        </div>
        <HeatMapTable higher {...HeatmapProps} />
      </Card>
    )
  }
}

export default GeneList
