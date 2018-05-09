import React from 'react'

import queryString from 'query-string'
import { Button, Icon, Spin } from 'antd'
import { Header, Card, WrappedDynamicFieldSet } from '../../components'
import style from './style.less'

class Survival extends React.Component {
  state = {
    loading: false,
    gene:null,
  }
  init = params => {
    /* this.setState({
      loading: true,
    }) */
    const { names } = params
    const gene = names[0]
    this.setState({
      gene,
    })
    /* fetch('/cgi/survival/init', {
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
      }) */
  }
  render () {
    const { gene } = this.state
    return (
      <div>
      <Header title="Survival analysis"/>
        <Card title={<div><i className="fa fa-lg fa-fw fa-check-square-o" /><span>select gene</span></div>}>
          <WrappedDynamicFieldSet cgi="survivalsug" max={1} onSubmit={v=>this.init(v)}/>
        </Card>
        {gene && <Card title={<div><i className="fa fa-lg fa-fw fa-line-chart" /><span>analysis result</span></div>}>
          <div className={style.imgcontainer}>
            <div>
              <img src={`/cgi/public/survival/GSE27020_PFS/${gene}.png`} />
              <p>{gene} - GSE27020_PFS</p>
            </div>
            <div>  
              <img src={`/cgi/public/survival/GSE31056_PFS/${gene}.png`}/>
              <p>{gene} - GSE31056_PFS</p>              
            </div>
            <div>
              <img src={`/cgi/public/survival/GSE41613_OS/${gene}.png`} />
              <p>{gene} - GSE41613_OS</p>              
            </div>
          </div>
        </Card> }
    </div>)
  }
}

export default Survival
