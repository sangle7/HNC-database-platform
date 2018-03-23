import React from 'react'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Header, Card } from '../components'
import HCasecard from './statistic/hoccasecard'
import HGenecard from './statistic/hocgenecard'

const Statistic = props => {
  const { location, history, dataSource, pagination, loading, chartSource } = props

  const params = queryString.parse(location.search)

  return (
    <div>
      <Header title={params.geneId}/>
      <Card>
        <a onClick={()=>window.history.back()}><i className="fa fa-arrow-left"></i>Back to previous</a>
      </Card>
      <HGenecard history={history} location={location}/>
      <HCasecard history={history} location={location}/>
    </div>
  )
}


export default Statistic
