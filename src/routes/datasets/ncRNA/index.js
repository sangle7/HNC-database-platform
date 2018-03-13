import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Menu, Breadcrumb, PieChart, Tabs, DatasourceTable } from '../../../components'

const genemenu = ['IncRNA', 'miRNA', 'piRNA', 'snoRNA', 'cirRNA']
class GenePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      loading: false,
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
    this.setState({
      loading: true,
    })
    fetch('/cgi/datasets/ncRNA', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          dataSource: code.list,
          step: code.step,
          loading: false,
        })
      })
  }
  render () {
    const { location, history, match } = this.props
    const { dataSource, loading, step } = this.state
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

    const TableProps = {
      dataSource,
      loading,
      columns: [{
        title: `${genemenu[step]} ID`,
        dataIndex: 'id',
      }, {
        title: 'Ref.pubID',
        dataIndex: 'Ref.pubID',
      }, {
        title: 'Tumer Expr.',
        dataIndex: 'Tumer Expr.',
      }, {
        title: 'Sample number',
        dataIndex: 'Sample number',
      }, {
        title: 'Annotation',
        dataIndex: 'Annotation',
      }, {
        title: 'Over/Nearest gene ID',
        dataIndex: 'Over/Nearest gene ID',
      }, {
        title: 'Distance/bp',
        dataIndex: 'Distance',
      }],
    }

    const TabProps = {
      tabs: [{
        key: 'Table',
        title: <span><Icon type="layout" />Table</span>,
        content: <DatasourceTable {...TableProps} />,
      }, {
        key: 'Graph',
        title: <span><Icon type="pie-chart" />Graph</span>,
        content: <div style={{ display: 'flex', flexWrap: 'wrap' }}><PieChart /><PieChart /><PieChart /></div>,
      }],
      onChange (key) {
        console.log(key)
      },
    }

    return (
      <div>
        <Breadcrumb {...BreadcrumbProps} />
        <main>
          <h1>{match.params.geneId}</h1>
          <Menu {...MenuProps} />
          <Tabs {...TabProps} />
        </main>
      </div>
    )
  }
}


GenePage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default GenePage
