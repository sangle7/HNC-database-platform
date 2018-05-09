import React from 'react'

import { Col } from 'antd'
import style from './minlabel.less'

const label = ({ item }) => {
  delete item.id
  return (
    <div className={style.container}>
      {Object.entries(item).filter(e=>e[1]).map((elem, index) => (
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


export default label
