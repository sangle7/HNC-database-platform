import React from 'react'
import { Menu, Icon } from 'antd'
import style from './menu.less'

const Sider = props => (
  <Menu
    onClick={props.onChange}
    style={{ width: 240 , float: 'left' }}
    mode="inline"
    selectedKeys={[props.genemenu[props.highlight]]}
  >
    {props.genemenu.map(elem => (<Menu.Item key={elem}>
      <Icon type="mail" />{elem}
      </Menu.Item>))}
  </Menu>
)
export default Sider
