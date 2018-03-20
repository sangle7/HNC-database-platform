import React from 'react'
import queryString from 'query-string'
import { Button } from 'antd'

class Download extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      downloadURL: null
    }
  }
  render () {
    const { url = '/cgi/genes', query } = this.props

    const handleClick = () => {
      const params = {
        download: '1',
        ...queryString.parse(query)
      }
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then(blob => blob.json())
        .then(code => {
          if (code.downloadURL) {
            this.setState({
              downloadURL: code.downloadURL
            }, () => this.a.click())
            // downloadFile('111', '/static/main-dev.js')
          }
        })
    }
    return [<Button type = "dashed" icon = "download" onClick ={handleClick}>Download</Button>,
      <a ref={a=>this.a=a} download="111" href={this.state.downloadURL}></a>]
  }
}

export default Download