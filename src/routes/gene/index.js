import React from 'react'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Header, Card, Tabs, Search, HeatMapTable } from '../../components'
import HGenelist from './hocgenelist'
import HHeatmap from './hocheatmap'

const Gene = props => {
  const { location, history } = props

  const params = queryString.parse(location.search)

  return (
    <div>
      <Header title="Gene Data"/>
      <HGenelist history={history} location={location} />
      <HHeatmap history={history} location={location}/>
    </div>
  )
}


export default Gene
