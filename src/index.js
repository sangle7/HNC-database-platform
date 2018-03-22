import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import style from './index.less'
import '../node_modules/react-vis/dist/style.css'
import { BackTop } from 'antd'
import { spring, AnimatedSwitch } from 'react-router-transition'
import ErrorBoundary from './ErrorBoundary'
import Homepage from './homepage'
import {
  GenePage,
  Navigation,
  Annalysis,
  GeneList,
  DrugList,
  Datasets,
  DrugPage,
  DatasetsGenes,
  DatasetsDrugs,
  DatasetsCases,
  DatasetsRecords,
  DatasetsNCRNA,
  CasePage,
  ErrorPage,
  MdPage,
  AnnalysisCorr,
  AnnalysisDiff,
  AnnalysisSurviral,
} from './routes'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <main className={style.main}>
        <Switch>
          <Route exact path="/404" component={ErrorPage}/>
          <Route path="/" component={Navigation} />
        </Switch>
        <div className={style.container}>
          <Switch>
            <Route exact path="/Gene" component={GeneList} />
            <Route exact path="/" component={Homepage} />
            <Route exact path="/FAQ" component={MdPage} />
            <Route exact path="/Resources" component={MdPage} />
            <Route exact path="/Contact" component={MdPage} />
            <Route exact path="/Annalysis" component={Annalysis} />
            <Route exact path="/Annalysis/Gene" component={GeneList} />
            <Route exact path="/Annalysis/Drug" component={DrugList} />
            <Route path="/Annalysis/Drug/:drugId" component={DrugPage} />
            <Route path="/Annalysis/Gene/:geneId" component={GenePage} />
            <Route exact path="/Annalysis/Surviral" component={AnnalysisSurviral} />
            <Route exact path="/Corr" component={AnnalysisCorr} />
            <Route exact path="/Diff" component={AnnalysisDiff} />
            <Route exact path="/Datasets" component={Datasets} />
            <Route exact path="/Datasets/Genes" component={DatasetsGenes} />
            <Route exact path="/Datasets/Drugs" component={DatasetsDrugs} />
            <Route exact path="/Datasets/Cases" component={DatasetsCases} />
            <Route exact path="/Datasets/Cases/:caseId" component={CasePage} />
            <Route exact path="/Datasets/Records" component={DatasetsRecords} />
            <Route exact path="/Datasets/ncRNA" component={DatasetsNCRNA} />
            <Route render={() => (<Redirect to="/404"/>)}/>
          </Switch>
        </div>
        <BackTop />
      </main>
    </Router>
  </ErrorBoundary>
  , document.getElementById('root'),
)
