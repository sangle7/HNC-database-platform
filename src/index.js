import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
  StatisticPage,
} from './routes'

if (module.hot) {
  module.hot.accept()
}

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `translateX(${styles.translateX})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    translateX: '-1000px',
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: 0,
    translateX: '1000px',
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: 1,
    translateX: 0,
  },
};

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <Route
        render={({ location, history }) => (
          <main className={style.main}>
            <Navigation location={location} history={history}/>
            <Switch location={location}>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/FAQ" component={MdPage} />
              <Route exact path="/Resources" component={MdPage} />
              <Route exact path="/Contact" component={MdPage} />
              <Route exact path="/Gene" component={GeneList} />
              <Route exact path="/Drug" component={DrugList} />
              <Route exact path="/Corr" component={AnnalysisCorr} />
              <Route exact path="/Diff" component={AnnalysisDiff} />
              <Route exact path="/Surviral" component={AnnalysisSurviral} />
              <Route exact path="/statistics" component={StatisticPage} />

              <Route exact path="/Annalysis" component={Annalysis} />
              <Route path="/Annalysis/Drug/:drugId" component={DrugPage} />
              <Route path="/Annalysis/Gene/:geneId" component={GenePage} />
              <Route exact path="/Datasets" component={Datasets} />
              <Route exact path="/Datasets/Genes" component={DatasetsGenes} />
              <Route exact path="/Datasets/Drugs" component={DatasetsDrugs} />
              <Route exact path="/Datasets/Cases" component={DatasetsCases} />
              <Route exact path="/Datasets/Cases/:caseId" component={CasePage} />
              <Route exact path="/Datasets/Records" component={DatasetsRecords} />
              <Route exact path="/Datasets/ncRNA" component={DatasetsNCRNA} />
              <Route exact path="/404" component={ErrorPage}/>
              <Route render={() => (<Redirect to="/404"/>)}/>
            </Switch>
            <footer>lnCAR © 2018 The Ren Lab. All Rights Reserved</footer>
          </main>
        )}
    />
    </Router>
    <BackTop />
  </ErrorBoundary>
  , document.getElementById('root'),
)
