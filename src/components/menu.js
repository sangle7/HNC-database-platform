import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import style from './menu.less'

const Sider = props => (
  <Menu
    onClick={props.onChange}
    style={{ width: 240, flexShrink: 0 }}
    mode="inline"
    selectedKeys={[props.genemenu[props.highlight]]}
    className={style.menu}
  >
    {props.genemenu.map(elem => (
      <Menu.Item key={elem}>
         {elem}
      </Menu.Item>))}
  </Menu>
)

Sider.propTypes = {
  genemenu: PropTypes.array.isRequired,
  highlight: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Sider
