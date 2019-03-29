import React from 'react'
import { message } from 'antd'
import { Header, Card, SurvivalCard, SurvivalCardmulti, WrappedDynamicFieldSet, WrappedDynamicFieldSet2 } from '../../components'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'
class Survival extends React.Component {
  state = {
    loading: false,
    gene: null,
    nameslist: "",
    md5String: "",
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
  multiinput = multiparams => {
    const nameslist  = multiparams.names.replace(/\s/g,",")
    /*this.setState({
      loading: true,
    })*/
    fetch(`${prefix}/multisurvival/multiinput`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nameslist: nameslist.toUpperCase() }),
    })
    .then(blob => blob.json())
    .then(code => {
      if (code.nameslist) {
        this.setState({
          nameslist: code.nameslist,
          md5String: code.md5String,
        })
      } else {
        message.error(code.msg)
      }
    })
  }

  render () {
    const { gene, nameslist, md5String } = this.state
    return (
      <div>
        <Header title="Survival analysis" />
        <Card title={<div><i className="fa fa-lg fa-fw fa-check-square-o" /><span>select gene</span></div>}>
          <WrappedDynamicFieldSet cgi="survivalsug" max={1} onSubmit={v => this.init(v)} />
        </Card>
      	<Card title={<div><i className="fa fa-lg fa-fw fa-check-square-o" /><span>Multi gene input</span></div>}>
          <WrappedDynamicFieldSet2 onSubmit={v => this.multiinput(v)} />
        </Card>
        {gene && <SurvivalCard gene={gene}/> }
        {nameslist && <SurvivalCardmulti nameslist={nameslist} md5String={md5String}/>}
      </div>)
  }
}

export default Survival
