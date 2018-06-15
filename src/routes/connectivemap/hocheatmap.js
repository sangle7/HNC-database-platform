import React from 'react'
import queryString from 'query-string'
import { Icon } from 'antd'
import { HeatMapTable, Search, Card } from '../../components'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'

class GeneList extends React.Component {
  state = {
    filter: '', // gene=value1&drug=value
  }
  onSearch = (v, key) => {
    const { filter } = this.state
    const obj = queryString.parse(filter)
    obj[key] = v
    const str = queryString.stringify(obj)

    this.setState({
      filter: str,
    })
  }
  render () {
    const { history } = this.props
    const { filter } = this.state

    const SearchProps = {
      title: <Icon type="search" />,
      placeholder: 'Search Gene Name',
      onKeyUp: v => { this.onSearch(v.target.value, 'gene') },
      onSearch: v => { this.onSearch(v, 'gene') },
    }

    const Search2Props = {
      title: <Icon type="medicine-box" />,
      placeholder: 'Search Drug Name',
      onKeyUp: v => { this.onSearch(v.target.value, 'drug') },
      onSearch: v => { this.onSearch(v, 'drug') },
    }

    const HeatmapProps = {
      url: `${prefix}/drug/heatmap`,
      filter,
      onCellClick: (gene, c, t) => {
        history.push(`/statics?t=${t}&geneId=${gene}&drugId=${c}`)
      },
    }

    return (
      <Card title={<div><i className="fa fa-th fa-fw fa-lg" /><span>Data Heat Map</span></div>}>
        <div className="flexdc">
          <Search {...Search2Props} />
          <Search {...SearchProps} />
        </div>
        <HeatMapTable higher {...HeatmapProps} />
      </Card>
    )
  }
}

export default GeneList
