import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Spin, Icon } from 'antd'
import { DatasourceTable, ScatterChart, Header, Card } from '../../components'
import style from './style.less'
import Multiselect from '../../components/multiselect';

class Diff extends React.Component {
  state = {
    loading: false,
    dataSource: [],
  }
  init = params => {
    this.setState({
      loading: true,
    })
    fetch('/cgi/diff/init', {
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
        title: e,
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
        <Header title="Diff annalysis"/>
        <Card title={<div><Icon type="edit" /><span>select query</span></div>}>
          <Multiselect onSubmit={this.init}/>
        </Card>
        <Card title="annalysis result">
          <div className={style.container}>
            {loading ? <Spin /> : dataSource[0] && <ScatterChart />}
            {!loading && <DatasourceTable {...TableProps} />}
          </div>
        </Card>
    </div>)
  }
}

export default Diff
