import React from 'react'
import { Header, Stackchart, PieChart, Card, DatasourceTable } from '../components'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'
class Statistics extends React.Component {
  state = {
    loading: false,
    lincStats: [{}],
    lincStats2: [{}],
    pieStats: [],
    dataSource: [],
    pagination: {},
  }

  componentDidMount () {
    this.fetchData()
    this.fetchTable(1)
  }

  fetchData = () => {
    this.setState({
      loading: true,
    })
    fetch(`${prefix}/statisticscgi`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          lincStats: code.lincStats,
          lincStats2: code.lincStats2,
          pieStats: code.pieStats,
          loading: false,
        })
      })
  }


  fetchTable = (page) =>{
    this.setState({
      tbloading: true,
    })
    fetch(`${prefix}/statisticscgi/hnclinc?page=${page}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          dataSource: code.list,
          pagination: code.pagination,
          tbloading: false,
        })
      })
  }


  render () {
    const { lincStats, lincStats2, pieStats, dataSource, tbloading,  pagination } = this.state


    const TableProps = {
      dataSource,
      loading: tbloading,
      scroll: { x: true , y: 400 },
      pagination,
      onChange:(pagination)=> this.fetchTable(pagination.current),
      columns: dataSource[0] ?Object.keys(dataSource[0]).map(e=>({
        title: e,
        dataIndex: e,
        width: 100,
      })) : []
    }

    return (
      <div>
        <Header title="Statistics" />
        <Card title={<div><i className="fa fa-bar-chart fa-fw fa-lg" /><span>Overview</span></div>}>
          <Stackchart uuid={1} data={lincStats} height={300}/>
          <Stackchart uuid={2} data={lincStats2} height={300}/>
        </Card>
        <Card title={<div><i className="fa fa-bar-chart fa-fw fa-lg" /><span>Clinical Data</span></div>}>
          <div style={{ display: 'flex' ,flexWrap:'wrap'}}>
            {pieStats.map((e, i) => <PieChart obj={e} uuid={i} />)}
          </div>
        </Card>
        <Card title={<div><i className="fa fa-bar-chart fa-fw fa-lg" /><span>Clinical Data</span></div>}>
          <DatasourceTable {...TableProps}/>
        </Card>
      </div>
    )
  }
}


export default Statistics

