import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import hncdb from '../img/hncdb.png'
import style from './navigation.less'
import { menu, menuWithIcon } from '../const'

const generateType = (path, url) => {
  switch (url) {
    case '/':
      return path === '/' ? 'primary' : 'default'
    default:
      return path.indexOf(url) === 0 ? 'primary' : 'default'
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

Navigation.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Navigation
