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
import ErrorBoundary from './ErrorBoundary'
import {
  HomePage,
  Navigation,
  GeneList,
  DrugList,
  ErrorPage,
  MdPage,
  Corr,
  Diff,
  Survival,
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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/FAQ" component={MdPage} />
              <Route exact path="/Resources" component={MdPage} />
              <Route exact path="/Contact" component={MdPage} />
              <Route exact path="/Gene" component={GeneList} />
              <Route exact path="/Drug" component={DrugList} />
              <Route exact path="/Corr" component={Corr} />
              <Route exact path="/Diff" component={Diff} />
              <Route exact path="/Survival" component={Survival} />
              <Route exact path="/statistics" component={StatisticPage} />
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
