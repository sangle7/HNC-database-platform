import React from 'react'
import contact from './contact.md'
import help from './help.md'
import { Header, Card } from '../../components'
import './style.less'

const mdMap = {
  Contact: contact,
  help,
}

class MdPage extends React.Component {
  constructor (props) {
    super(props)
    const mdname = this.props.location ? this.props.location.pathname.slice(1) : 'help'
    this.state = {
      data: mdMap[mdname],
    }
  }
  componentWillReceiveProps (nextProps) {
    const mdname = nextProps.location.pathname.slice(1)
    this.setState({
      data: mdMap[mdname],
    })
  }
  shouldComponentUpdate (nextProps) {
    return nextProps.location.pathname !== this.props.location.pathname
  }
  render () {
    const { data } = this.state
    return (
      <div>
        <Header title={this.props.location.pathname.slice(1)} />
        <Card>
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: data }} />
        </Card>
      </div>
    )
  }
}
export default MdPage
