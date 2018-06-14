import React from 'react'
import { message } from 'antd'
import queryString from 'query-string'
import { Header, Card, WrappedDynamicFieldSet } from '../../components'
import style from './style.less'

const env = process.env.NODE_ENV;
const prefix = env === 'production' ? '' : '/cgi'
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
    fetch(`${prefix}/survival/init`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gene }),
    })
      .then(blob => blob.json())
      .then(code => {
        if (code.gene) {
          this.setState({
            gene: code.gene,
          })
        } else {
          message.error(code.msg)
        }
      })
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
              <img src={`${prefix}/public/survival/GSE27020_PFS/${gene}.png`} />
              <p>{gene} - GSE27020_PFS</p>
            </div>
            <div>  
              <img src={`${prefix}/public/survival/GSE31056_PFS/${gene}.png`}/>
              <p>{gene} - GSE31056_PFS</p>              
            </div>
            <div>
              <img src={`${prefix}/public/survival/GSE41613_OS/${gene}.png`} />
              <p>{gene} - GSE41613_OS</p>              
            </div>
          </div>
        </Card> }
    </div>)
  }
}

export default Survival
