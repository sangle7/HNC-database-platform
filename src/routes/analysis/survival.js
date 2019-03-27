import React from 'react'
import { message } from 'antd'
import { Header, Card, SurvivalCard, WrappedDynamicFieldSet, WrappedDynamicFieldSet2 } from '../../components'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'
class Survival extends React.Component {
  state = {
    loading: false,
    gene: null,
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
      body: JSON.stringify({ gene: gene.toUpperCase() }),
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
  multi = params1 => {
    const { names1 } = params1
    const gene = names[0]
    fetch(`${prefix}/survival/multi`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gene: gene.toUpperCase() }),
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
        <Header title="Survival analysis" />
        <Card title={<div><i className="fa fa-lg fa-fw fa-check-square-o" /><span>select gene</span></div>}>
          <WrappedDynamicFieldSet cgi="survivalsug" max={1} onSubmit={v => this.init(v)} />
        </Card>
	<Card title={<div><i className="fa fa-lg fa-fw fa-check-square-o" /><span>Multi gene input</span></div>}>
          <WrappedDynamicFieldSet2 cgi="survivalsug" max={1} onSubmit={v => this.multi(v)} />
        </Card>
        {gene && <SurvivalCard gene={gene}/> }
      </div>)
  }
}

export default Survival
