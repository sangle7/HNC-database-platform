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
  <header className={style.header}>
    <Row>
      <Col xxl={4} xl={5} lg={5} md={6} sm={24} xs={24}>
        <img src={hncdb} alt="hncdb" style={{ height: '50px' }} onClick={()=>history.push('/')}/>
      </Col>
      <Col xxl={20} xl={19} lg={19} md={18} sm={0} xs={0}>
        <div className={style.searchbox}>
          <Icon type="search" />
        </div>
        <Menu
          id="nav"
          onClick={(e)=>history.push(e.key)}
          selectedKeys={[location.pathname]}
          mode="horizontal">
          {menuWithIcon.map(elem => <Menu.Item key={elem.src}><Icon type={elem.icon} />{elem.text}</Menu.Item>)}
          {menu.map(elem => <Menu.Item key={elem.src}>{elem.text}</Menu.Item>)}
        </Menu>
      </Col>
    </Row>
  </header>
)


Navigation.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Navigation
