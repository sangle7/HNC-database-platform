import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom'
import style from './index.less'
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
  staticPage,
  Statistics,
} from './routes'

if (module.hot) {
  module.hot.accept()
}

class ScrollToTop extends React.Component {
  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return this.props.children
  }
}
const WScrollToTop = withRouter(ScrollToTop)

const footerstyle = {
  position: 'absolute',
  width: '100%',
  bottom: 0,
  height: '48px',
  lineHeight: '48px',
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
              <Navigation location={location} history={history} />
              <Switch location={location}>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/help" component={MdPage} />
                <Route exact path="/Contact" component={MdPage} />
                <Route exact path="/Gene" component={GeneList} />
                <Route exact path="/ConnectiveMap" component={DrugList} />
                <Route exact path="/Corr" component={Corr} />
                <Route exact path="/Diff" component={Diff} />
                <Route exact path="/Survival" component={Survival} />
                <Route exact path="/statics" component={staticPage} />
                <Route exact path="/statistics" component={Statistics} />
                <Route exact path="/404" component={ErrorPage} />
                <Route render={() => (<Redirect to="/404" />)} />
              </Switch>
              <footer style={footerstyle}>HNC Database © 2018 SYSUCC. All Rights Reserved</footer>
            </main>
          )}
        />
      </WScrollToTop>
    </Router>
    <BackTop />
  </ErrorBoundary>
  , document.getElementById('root'),
)
