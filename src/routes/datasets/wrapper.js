import React from 'react'
import queryString from 'query-string'

const Wrapper = (Component, url) => {
  return class Wrapped extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        dataSource: [],
        loading: false,
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
            loading: false,
          })
        })
    }
    reducer = func => {
      this.setState(func)
    }
    render () {
      const { dataSource, loading } = this.state
      const ComponentProps = {
        ...this.props,
        dataSource,
        loading,
      }
      return <Component {...ComponentProps} />
    }
  }
}

export default Wrapper
