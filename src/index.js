import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import style from './index.less'

import ErrorBoundary from './ErrorBoundary'
import Homepage from './homepage'
import { GenePage, Navigation, Annalysis, GeneList, Datasets, DrugPage, DatasetsGenes, DatasetsDrugs, DatasetsCases, DatasetsRecords, DatasetsNCRNA, CasePage } from './routes'

const FAQ = () => (<h1>FAQ</h1>)
const Resources = () => (<h1>Resources</h1>)
const Contact = () => (<h1>Contact</h1>)

const Error = () => (<h1>404 ERROR</h1>)
if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
<ErrorBoundary>
  <Router>
    <main className={style.main}>
      <Route path="/" component={Navigation} />
      <div className={style.container}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/FAQ" component={FAQ} />
          <Route exact path="/Resources" component={Resources} />
          <Route exact path="/Contact" component={Contact} />
          <Route exact path="/Annalysis" component={Annalysis} />
          <Route exact path="/Annalysis/Gene" component={GeneList} />
          <Route path="/Annalysis/Gene/:geneId" component={GenePage} />
          <Route exact path="/Datasets" component={Datasets} />
          <Route exact path="/Datasets/Genes" component={DatasetsGenes} />
          <Route exact path="/Datasets/Drugs" component={DatasetsDrugs} />
          <Route exact path="/Datasets/Drugs/:drugId" component={DrugPage} />
          <Route exact path="/Datasets/Cases" component={DatasetsCases} />
          <Route exact path="/Datasets/Cases/:caseId" component={CasePage} />
          <Route exact path="/Datasets/Records" component={DatasetsRecords} />
          <Route exact path="/Datasets/ncRNA" component={DatasetsNCRNA} />
          <Route component={Error} />
        </Switch>
      </div>
    </main>
  </Router>
  </ErrorBoundary>
  , document.getElementById('root'),
)
