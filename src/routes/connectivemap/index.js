import React from 'react'
import { Header, Card } from '../../components'
import HHeatmap from './hocheatmap'
import instruction from './instruction.md'


const ConnectiveMap = props => {
  const { location, history } = props

  return (
    <div>
      <Header title="Connective Map"/>
      <Card title={<div><i className="fa fa-lg fa-fw fa-list-alt"></i><span>Tutorial</span></div>}>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: instruction }} />
      </Card>
      <HHeatmap history={history} location={location}/>
    </div>
  )
}


export default ConnectiveMap
