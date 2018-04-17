import React from 'react'
import queryString from 'query-string'
import { Icon, Button } from 'antd'
import Wrapper from '../wrapper'
import { Breadcrumb, HeatMapTable, Header,Tabs, DatasourceTable, Search, Download, Card } from '../../components'


class WithSearch extends React.Component {
  state = {
    filter: '',
  }
  onSearch = v => {
    this.setState({
      filter: v,
    })
  }
  render () {
    const { location, history, dataSource, loading, pagination, url } = this.props
    const { filter } = this.state

    const SearchProps = {
      title: <Icon type="search" />,
      placeholder: 'Search id/hgncid/symbol',
      onKeyUp:v => {this.onSearch(v.target.value)},
      onSearch:v => {this.onSearch(v)},
    }

    const HeatmapProps = {
      url: '/cgi/gene/heatmap',
      filter,
      t: this.props.t,
      onCellClick: (gene, c, t) => {
        history.push(`/statistics?t=${t}&geneId=${gene}&caseId=${c}`)      
      },
    }

    return [<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '.2rem' }}>
      <Search {...SearchProps} />
    </div>, <HeatMapTable {...HeatmapProps} />]
  }
}


const GeneList = props => {
  const TabProps = {
    transform: false,
    tabs: [{
      key: 'hpv',
      title: 'hpv positive & negative',
      content: <WithSearch t="hpv" {...props} />,
    }, {
      key: 'tumor',
      title: 'Tumor vs Normal/Disease',
      content: <WithSearch t="tumor" {...props} />,
    }],
    onChange (key) {
      console.log(key)
    },
  }

  return (
    <Card title={<div><i className="fa fa-th fa-fw fa-lg"></i><span>Data Heat Map</span></div>}>
      <Tabs {...TabProps} />
    </Card>
  )
}

export default GeneList
