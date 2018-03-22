import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Button, Icon, Spin } from 'antd'
import { DatasourceTable, ScatterChart, Header, Card, Breadcrumb, WrappedDynamicFieldSet } from '../../components'
import style from './style.less'

class Corr extends React.Component {
  state = {
    loading: false,
    dataSource: [],
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
        this.setState({
          dataSource: code.list,
          loading: false,
        })
      })
  }
  render () {
    const { showModal, location, history } = this.props
    const { dataSource, loading } = this.state

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
      size:1000,
    }
    return (
      <div>
      <Header title="Corr annalysis"/>
        <Card title={<div><Icon type="edit" /><span>select gene</span></div>}>
          <WrappedDynamicFieldSet onSubmit={v=>this.init(v)}/>
        </Card>
        <Card title="annalysis result">
          <div className={style.container}>
            {loading ? <Spin /> : dataSource[0] && <ScatterChart {...ChartProps}/>}
            {!loading && <DatasourceTable {...TableProps} />}
          </div>
        </Card>
    </div>)
  }
}

export default Corr
