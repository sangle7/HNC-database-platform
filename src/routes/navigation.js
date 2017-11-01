import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import hncdb from '../img/hncdb.png'
import style from './navigation.less'
import { menu, menuWithIcon } from '../const'

const Navigation = ({ history, location }) => (
  <div className={style.nav} >
    <div className={style.content}>
      <img src={hncdb} style={{ height: '100px' }} alt="hncdb" />
      <div>
        {menuWithIcon.map(elem => <Button className={style.iconBtn} type={location.pathname === elem.src ? 'primary' : 'default'} icon={elem.icon} onClick={() => history.push(elem.src)}>{elem.text}</Button>)}
      </div>
      <div>
        {menu.map(elem => <Button className={style.btn} type={location.pathname === elem.src ? 'primary' : 'default'} onClick={() => history.push(elem.src)}>{elem.text}</Button>)}
      </div>
    </div>
  </div>
)

Navigation.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Navigation
