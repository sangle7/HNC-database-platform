import React from 'react'
import PropTypes from 'prop-types'
import style from './label.less'

const label = ({ item }) => {
  return (
    <div className={style.container}>
      {Object.entries(item).map((elem, index) => (
        <div className={style.item}>
          <span className={index % 2 === 0 ? style.labelG : style.labelY}>{elem[0]}:</span>
          {elem[1]}
        </div>
       ))}
    </div>
  )
}

label.propTypes = {
  item: PropTypes.object.isRequired,
}

export default label
