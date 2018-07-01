import React from 'react'
import queryString from 'query-string'
import { Header, Card } from '../../components'
import HCasecard from './hoccasecard'
import HGenecard from './hocgenecard'
import HDrugcard from './hocdrugcard'
import Expression from './expression'
import HNCDB from './HNCDBrecords'
import HDrugrecords from './drugRecords'

const staticPage = props => {
  const { location, history } = props

  const params = queryString.parse(location.search)

  const ExpressionProps = {
    url: 'cgi/gene/init',
    caseId: params.caseId.trim(),
    geneId: params.geneId.trim(),
    type: params.t,
    onclickcb: e => { console.log(e) },
  }

  const HNCDBProps = {
    history,
    location,
    geneId: params.geneId.trim(),
  }

  const HDrugProps = {
    history,
    location,
    drugId: params.drugId.trim(),
  }


  return (
    <div>
      <Header title={gTitle(params.drugId, params.geneId, params.caseId)} />
      <Card>
        <a onClick={() => window.history.back()}><i className="fa fa-lg fa-fw fa-arrow-left" />Back to previous</a>
      </Card>
      {params.drugId && [<HDrugcard history={history} location={location} />, <HDrugrecords {...HDrugProps}/>]}
      {params.geneId && [<HGenecard history={history} location={location} />, <HNCDB {...HNCDBProps} />, <Expression {...ExpressionProps} />]}
      {params.caseId && <HCasecard history={history} location={location} />}
    </div>
  )
}


export default staticPage


function gTitle (...values) {
  const arr = values.filter(e => e).map(e=>e.trim())
  const result = arr.join(' - ')
  return result
}
