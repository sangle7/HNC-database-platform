import React from 'react'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Header, Card } from '../../components'
import HCasecard from './hoccasecard'
import HGenecard from './hocgenecard'
import HDrugcard from './hocdrugcard'
import Expression from './expression'
import HNCDB from './HNCDBrecords'

const Statistic = props => {
  const { location, history } = props

  const params = queryString.parse(location.search)

  const ExpressionProps = {
    url: 'cgi/gene/init',
    geneId: params.geneId,
    onclickcb:(e)=>{console.log(e)}
  }

  const HNCDBProps = {
    history,
    location,
    geneId: params.geneId
  }

  return (
    <div>
      <Header title={params.geneId || params.drugId || params.caseId}/>
      <Card>
        <a onClick={()=>window.history.back()}><i className="fa fa-lg fa-fw fa-arrow-left"></i>Back to previous</a>
      </Card>
      {params.geneId && [<HGenecard history={history} location={location}/>, <HNCDB {...HNCDBProps}/>, <Expression {...ExpressionProps}/>]}
      {params.drugId && <HDrugcard history={history} location={location}/>}
      {params.caseId && <HCasecard history={history} location={location}/>}
    </div>
  )
}


export default Statistic