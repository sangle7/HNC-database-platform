import React from 'react'
import queryString from 'query-string'
import { Button } from 'antd'

class Download extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      downloadURL: null,
    }
  }
  render () {
    const { url, query } = this.props

    const handleClick = () => {
      const params = {
        download: true,
        ...queryString.parse(query),
      }
      fetch(`${url}${query}&download=true`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then(blob => blob.json())
        .then(code => {
          if (code.downloadURL) {
            this.setState({
              downloadURL: code.downloadURL,
            }, () => this.a.click())
          }
        })
    }
    return [<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button type="primary" icon="download" onClick={handleClick}>Download</Button>
    </div>,
      <a ref={a => this.a = a} download={url + query} href={this.state.downloadURL} />]
  }
}

export default Download
