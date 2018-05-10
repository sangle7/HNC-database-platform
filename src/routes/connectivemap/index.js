import React from 'react'
import queryString from 'query-string'
import { Header, Card, Tabs, Search, HeatMapTable } from '../../components'
import HDruglist from './hocdruglist'
import HHeatmap from './hocheatmap'

const ConnectiveMap = props => {
  const { location, history } = props

  const params = queryString.parse(location.search)

  return (
    <div>
      <Header title="Connective Map"/>
      {/* <HDruglist history={history} location={location} /> */}
      <Card title={<div><i className="fa fa-lg fa-fw fa-list-alt"></i><span>Tutorial</span></div>}>
      </Card>
      <HHeatmap history={history} location={location}/>
    </div>
  )
}


export default ConnectiveMap
