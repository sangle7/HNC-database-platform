import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Button, Icon, Spin, message } from 'antd'
import { DatasourceTable, ScatterChart, Header, Card, Breadcrumb, WrappedDynamicFieldSet } from '../../components'
import style from './style.less'

class Corr extends React.Component {
  state = {
    loading: false,
    dataSource: [],
    type: 1,
  }
  init = params => {
    this.setState({
      loading: true,
    })
    fetch('/cgi/corr/init', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(blob => blob.json())
      .then(code => {
        switch (code.ret) {
          case 200:
            this.setState({
              type: code.type,
              dataSource: code.list,
              loading: false,
            })
            break
          case 400:
            this.setState({
              dataSource: [],              
              loading: false,
            })
            message.error(code.msg)
            break
          default:
        }
      })
  }
  deleteItem = name => {
    const { dataSource } = this.state
    const list = dataSource.filter(i=>i['']!==name)
    this.setState({
      dataSource: list
    })
  }
  render () {
    const { showModal, location, history } = this.props
    const { dataSource, loading, type } = this.state

    const TableProps = {
      dataSource,
      loading,
      columns: dataSource[0] ? Object.keys(dataSource[0]).map(e => ({
        title: e || 'sample',
        dataIndex: e,
        width: 100
      })) : [],
    }
    const ChartProps = {
      dataSource,
      onDotClick:(i)=>(this.deleteItem(i)),
      size: 600,
    }
    return (
      <div>
      <Header title="Corr analysis"/>
        <Card title={<div><i className="fa fa-lg fa-fw fa-check-square-o" /><span>select gene</span></div>}>
          <WrappedDynamicFieldSet onSubmit={v=>this.init(v)}/>
        </Card>
        <Card title={<div><i className="fa fa-lg fa-fw fa-line-chart" /><span>analysis result</span></div>}>
          <div className={style.container}>
            {loading ? <Spin /> : type === 2 ? <ScatterChart {...ChartProps}/> : <DatasourceTable {...TableProps} />}
          </div>
        </Card>
    </div>)
  }
}

export default Corr
