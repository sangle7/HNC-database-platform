import React from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, Button, Dropdown, Menu } from 'antd'

const searchStyle = {
  width: 200,
}
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
    const menu = array => {
      return (
        <Menu onClick={e => this.props.onSearch(e.key, this.state.value)} >
          {array.map((elem, index) => <Menu.Item key={String(index)}>{elem}</Menu.Item>)}
        </Menu>)
    }
    return (
      <div>
        <Input style={searchStyle} placeholder={placeholder} onKeyUp={onKeyUp} onPressEnter={() => this.props.onSearch(this.state.value)} onChange={e => this.onChange(e.target.value)} />
        {Array.isArray(title) ? <Dropdown overlay={menu(title)}><Button type="primary" style={{ padding: '0 20px', borderRadius: 0 }}>搜索 <Icon type="down" /></Button></Dropdown> : <Button style={{ padding: '0 20px', borderRadius: 0 }} type="primary" onClick={() => this.props.onSearch(this.state.value)}>{title}</Button>}
      </div>
    )
  }
}


SearchWithState.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
}

export default SearchWithState
