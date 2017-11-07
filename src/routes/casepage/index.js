import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Breadcrumb, Label } from '../../components'

class DrugPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {},
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
    params.caseId = props.match.params.caseId
    fetch('/case/item', {
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
        })
      })
  }
  render () {
    const { location, history } = this.props
    const { item } = this.state
    const BreadcrumbProps = {
      path: location.pathname,
      handleClick (index) {
        const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
        if (newpath !== location.pathname) {
          history.push(newpath)
        }
      },
    }
    return (
      <div>
        <Breadcrumb {...BreadcrumbProps} />
        <Label item={item} />
      </div>
    )
  }
}

DrugPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default DrugPage
