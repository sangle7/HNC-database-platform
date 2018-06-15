import React from 'react'
import { Header, Card } from '../../components'
import HHeatmap from './hocheatmap'
import geneInstruction from './geneInstruction.md'

const Gene = props => {
  const { location, history } = props

  return (
    <div>
      <Header title="Gene Data"/>
      {/* <HGenelist history={history} location={location} /> */}
      <Card title={<div><i className="fa fa-lg fa-fw fa-list-alt"></i><span>Tutorial</span></div>}>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: geneInstruction }} />
      </Card>
      <HHeatmap history={history} location={location}/>
    </div>
  )
}


export default Gene
