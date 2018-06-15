import React from 'react'
import style from './header.less'

const Card = props => {
  const { title } = props
  return (
    <header className={style.header}>
      <div className={style.container}><h1>{title}</h1></div>
    </header>
  )
}

export default Card
