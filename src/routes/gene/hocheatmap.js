import React from 'react'
import { Icon } from 'antd'
import { HeatMapTable, Tabs, Search, Card } from '../../components'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'

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
    const { history, t } = this.props
    const { filter } = this.state

    const SearchProps = {
      title: <Icon type="search" />,
      placeholder: 'Search Gene Name',
      onKeyUp: v => { this.onSearch(v.target.value) },
      onSearch: v => { this.onSearch(v) },
    }

    const HeatmapProps = {
      url: `${prefix}/gene/heatmap`,
      filter,
      t,
      onCellClick: (gene, c, t) => {
        history.push(`/statics?t=${t}&geneId=${gene}&caseId=${c}`)
      },
      onTitleClick: () => {},
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
      key: 'tumorcoding',
      title: 'Tumor vs Normal/Disease Coding',
      content: <WithSearch t="tumorcoding" {...props} />,
    }, {
      key: 'tumorlnc',
      title: 'Tumor vs Normal/Disease lncRNA',
      content: <WithSearch t="tumorlnc" {...props} />,

    }, {
      key: 'hpvcoding',
      title: 'HPV positive & negative Coding',
      content: <WithSearch t="hpvcoding" {...props} />,
    }, {
      key: 'hpvlnc',
      title: 'HPV positive & negative lncRNA',
      content: <WithSearch t="hpvlnc" {...props} />,
    }],
    onChange (key) {
      console.log(key)
    },
  }

  return (
    <Card title={<div><i className="fa fa-th fa-fw fa-lg" /><span>Data Heat Map</span></div>}>
      <Tabs {...TabProps} />
    </Card>
  )
}

export default GeneList
