import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import style from './style.less'
import { Menu, Breadcrumb } from '../../components'
import HNCDBrecords from './HNCDBrecords'
import Drugs from './Drugs'

const genemenu = ['General Information','HNCDB record','Drugs','Expression','Mutation','CNV','Epigenetic modification','Surviral','Corr. annalysis','Diff. annalysis']
class GenePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      loading: false,
      item: {},
      step: 0,
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
    console.log(params)
    this.setState({
      loading: true,
    })
    fetch('/test/init', {
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
        })
      })
  }
  render () {
    const { location, history, match } = this.props
    const { dataSource, loading, graphData, step, item } = this.state
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

    let itemByStep
    switch (step) {
      case 0:
        itemByStep = <pre>{JSON.stringify(item,null,4)}</pre>
        break
      case 1:
        itemByStep = <HNCDBrecords {...HNCDBrecordsProps} />
        break
      case 2:
        itemByStep = <Drugs {...DrugsProps} />
        break
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
