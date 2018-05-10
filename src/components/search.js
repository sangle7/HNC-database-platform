import React from 'react'

import style from './search.less'
import { Input, Button } from 'antd'

class SearchWithState extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: null,
    }
  }
  onChange = value => {
    this.setState({
      value,
    })
  }
  render () {
    const { title, placeholder, onKeyUp } = this.props
    return (
      <div>
        <Input className={style.search} placeholder={placeholder} onKeyUp={onKeyUp} onPressEnter={() => this.props.onSearch(this.state.value)} onChange={e => this.onChange(e.target.value)} />
        <Button style={{ padding: '0 20px', borderRadius: 0 }} type="primary" onClick={() => this.props.onSearch(this.state.value)}>{title}</Button>
      </div>
    )
  }
}


export default SearchWithState
