import React from 'react'
import queryString from 'query-string'
import { Header, Card } from '../../components'
import HGenelist from './hocgenelist'
import HHeatmap from './hocheatmap'

const Gene = props => {
  const { location, history } = props

  const params = queryString.parse(location.search)

  return (
    <div>
      <Header title="Gene Data"/>
      {/* <HGenelist history={history} location={location} /> */}
      <Card title={<div><i className="fa fa-lg fa-fw fa-list-alt"></i><span>Tutorial</span></div>}>
        <div className="markdown-body">
          <p>1. switch between the tabs to select dataset</p>
          <p>2. search for specific gene</p>
          <p>3. click on the cell to see further information</p>       
        </div> 
      </Card>
      <HHeatmap history={history} location={location}/>
    </div>
  )
}


export default Gene
