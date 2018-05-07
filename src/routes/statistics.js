import React from 'react'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Header, Stackchart, PieChart,  Card } from '../components'

class Statistics extends React.Component {
  state = {
    loading: false,
    lincStats: [],
    pieStats:[]
  }

  componentDidMount () {
    this.fetchData()
  }

  fetchData = () => {
    this.setState({
      loading: true,
    })
    fetch('/cgi/statistics', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          lincStats: code.lincStats,
          pieStats: code.pieStats,
          loading: false,
        })
      })
  }

  render () {
    const { lincStats, pieStats } = this.state
    return (
      <div>
        <Header title="Statistics"/>
        <Card title={<div><i className="fa fa-bar-chart fa-fw fa-lg"></i><span>HNClinc</span></div>}>
          <Stackchart data={lincStats} />
        </Card>
        <Card title={<div><i className="fa fa-bar-chart fa-fw fa-lg"></i><span>PieChart</span></div>}>
          <div style={{display:'flex'}}>
          {pieStats.map((e,i) => <PieChart obj={e} uuid={i} /> )}
          </div>
        </Card>
      </div>
    )
  }
}


export default Statistics

