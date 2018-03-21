import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, Icon, Col, Row } from 'antd'
import hncdb from '../img/hncdb.png'
import style from './navigation.less'
import { menu, menuWithIcon } from '../const'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const generateType = (path, url) => {
  switch (url) {
    case '/':
      return path === '/' ? 'primary' : 'default'
    default:
      return path.toLowerCase().indexOf(url.toLowerCase()) === 0 ? 'primary' : 'default'
  }
}
const Navigation = ({ history, location }) => (
  <div className={style.nav} >
    <div className={style.content}>
      <img src={hncdb} style={{ height: '100px' }} alt="hncdb" />
      <div>
        {menuWithIcon.map(elem => <Button className={style.iconBtn} type={generateType(location.pathname, elem.src)} icon={elem.icon} onClick={() => history.push(elem.src)}>{elem.text}</Button>)}
      </div>
      <div>
        {menu.map(elem => <Button className={style.btn} type={generateType(location.pathname, elem.src)} onClick={() => history.push(elem.src)}>{elem.text}</Button>)}
      </div>
    </div>
  </div>
)

const MMM = ({history,location}) => (
  <Row>
    <Menu
      id="nav"
      onClick={(e)=>history.push(e.key)}
      selectedKeys={[location.pathname]}
      mode="horizontal">
      {menuWithIcon.map(elem => <Menu.Item key={elem.src}>{elem.text}</Menu.Item>)}
      {menu.map(elem => <Menu.Item key={elem.src}>{elem.text}</Menu.Item>)}
    </Menu>
  </Row>
)


Navigation.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default MMM
