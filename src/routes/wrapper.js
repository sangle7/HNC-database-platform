import React from 'react'
import queryString from 'query-string'

const Wrapper = (Component, url, charturl) => {
  return class Wrapped extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        dataSource: [],
        chartSource: [],
        md5String: null,
        loading: false,
      }
    }
    componentDidMount () {
      this.init(this.props)
      charturl && this.fetchChart(charturl)
    }
    componentWillReceiveProps (nextProps) {
      this.init(nextProps)
    }
    init = props => {
      const params = queryString.parse(props.location.search)
      this.setState({
        loading: true,
      })
      fetch(url, {
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
            pagination: code.pagination,
            md5String: code.md5String,
            loading: false,
          })
        })
    }
    fetchChart = x => {
      this.setState({
        loading: true,
      })
      fetch(x, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(blob => blob.json())
        .then(code => {
          this.setState({
            chartSource: code.chart,
            loading: false,
          })
        })

    }
    reducer = func => {
      this.setState(func)
    }
    render () {
      const { dataSource, loading, pagination, chartSource } = this.state
      const ComponentProps = {
        ...this.props,
        dataSource,
        loading,
        pagination,
        chartSource,
      }
      return <Component {...ComponentProps} />
    }
  }
}

export default Wrapper
