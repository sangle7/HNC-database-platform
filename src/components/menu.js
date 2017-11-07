import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'

const Sider = props => (
  <Menu
    onClick={props.onChange}
    style={{ width: 240, float: 'left' }}
    mode="inline"
    selectedKeys={[props.genemenu[props.highlight]]}
  >
    {props.genemenu.map(elem => (
      <Menu.Item key={elem}>
        <Icon type="mail" />{elem}
      </Menu.Item>))}
  </Menu>
)

Sider.propTypes = {
  genemenu: PropTypes.array.isRequired,
  highlight: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Sider
