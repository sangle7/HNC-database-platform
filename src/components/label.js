import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'antd'
import style from './label.less'

const label = ({ item }) => {
  delete item.id
  return (
    <div className={style.container}>
      {Object.entries(item).map((elem, index) => (
        <Col span={12}>
        <div className={style.item}>
          <span className={index % 2 === 0 ? style.labelG : style.labelY}>{elem[0]}:</span>
          <span> {elem[1]} </span>
        </div>
        </Col>
       ))}
    </div>
  )
}

label.propTypes = {
  item: PropTypes.object.isRequired,
}

export default label
