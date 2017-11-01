import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import style from './breadcrumb.less'

const bc = ({ path, handleClick }) => (
  <Breadcrumb className={style.breadcrumb} separator={<Icon type="right" />}>
    <Breadcrumb.Item className={style.item}> Home </Breadcrumb.Item>
    {path.split('/').map((elem, index) => <Breadcrumb.Item className={style.item} key={elem} onClick={() => handleClick(index)} >{elem}</Breadcrumb.Item>)}
  </Breadcrumb>
)

bc.propTypes = {
  path: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default bc
