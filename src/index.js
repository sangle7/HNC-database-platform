import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
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

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}
const WScrollToTop =  withRouter(ScrollToTop)

const footerstyle = {
  position: 'absolute',
  width: '100%',
  bottom: 0,
  height: '1rem',
  lineHeight: '1rem',
  textAlign: 'center',
  backgroundColor: '#424242',
  color: '#ffffff',
}


ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <WScrollToTop>
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
                <Route exact path="/ConnectiveMap" component={DrugList} />
                <Route exact path="/Corr" component={Corr} />
                <Route exact path="/Diff" component={Diff} />
                <Route exact path="/Survival" component={Survival} />
                <Route exact path="/statistics" component={StatisticPage} />
                <Route exact path="/404" component={ErrorPage}/>
                <Route render={() => (<Redirect to="/404"/>)}/>
              </Switch>
              <footer style={footerstyle}>lnCAR © 2018 The Ren Lab. All Rights Reserved</footer>
            </main>
          )}
      />
    </WScrollToTop>
    </Router>
    <BackTop />
  </ErrorBoundary>
  , document.getElementById('root'),
)
