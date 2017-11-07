import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Menu, Breadcrumb } from '../../../components'

const genemenu = ['IncRNA', 'miRNA', 'piRNA', 'snoRNA', 'cirRNA']
class GenePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      loading: false,
      item: {},
      step: 0,
      type: null,
    }
  }
  componentDidMount () {
    this.init(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.init(nextProps)
  }
  init = props => {
    const params = queryString.parse(props.location.search)
    params.geneId = props.match.params.geneId
    this.setState({
      loading: true,
    })
    fetch('/gene/init', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          item: code.item,
          dataSource: code.list,
          step: code.step,
          loading: false,
          type: params.type,
        })
      })
  }
  render () {
    const { location, history, match } = this.props
    const { dataSource, loading, graphData, step, item, type } = this.state
    const BreadcrumbProps = {
      path: location.pathname,
      handleClick (index) {
        const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
        if (newpath !== location.pathname) {
          history.push(newpath)
        }
      },
    }

    const MenuProps = {
      genemenu,
      highlight: step,
      onChange (e) {
        const index = genemenu.indexOf(e.key)
        history.push(`${location.pathname}?step=${index}`)
      },
    }

    const HNCDBrecordsProps = {
      ...this.props,
      dataSource,
      loading,
      graphData,
    }

    const DrugsProps = {
      ...this.props,
      dataSource,
      loading,
    }
    
    const ExpressionProps = {

    }

    const MutationProps = {

    }

    const CNVProps = {

    }

    const EpigeneticProps = {

    }

    const SurviralProps = {

    }

    const CorrProps = {
      type,
      onChange (type) {
        history.push(`${location.pathname}?step=8&type=${type}`)
      }
    }

    const DiffProps = {
      type,
      onChange (type) {
        history.push(`${location.pathname}?step=9&type=${type}`)
      }
    }

    let itemByStep
    switch (step) {
      default:
        itemByStep = <h1> 还没写完呢- -</h1>
    }
    return (
      <div>
        <Breadcrumb {...BreadcrumbProps} />
        <main>
          <h1>{match.params.geneId}</h1>
          <Menu {...MenuProps} />
          {itemByStep}
        </main>
      </div>
    )
  }
}


GenePage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default GenePage
