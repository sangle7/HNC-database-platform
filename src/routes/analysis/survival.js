import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Button, Icon, Spin } from 'antd'
import { Header, Card, WrappedDynamicFieldSet } from '../../components'
import style from './style.less'

class Survival extends React.Component {
  state = {
    loading: false,
    dataSource: [],
  }
  init = params => {
    this.setState({
      loading: true,
    })
    fetch('/cgi/survival/init', {
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

    return (
      <div>
      <Header title="Survival analysis"/>
        <Card title={<div><i className="fa fa-lg fa-fw fa-check-square-o" /><span>select gene</span></div>}>
          <WrappedDynamicFieldSet max={1} onSubmit={v=>this.init(v)}/>
        </Card>
        <Card title={<div><i className="fa fa-lg fa-fw fa-line-chart" /><span>analysis result</span></div>}>
          
        </Card>
    </div>)
  }
}

export default Survival
