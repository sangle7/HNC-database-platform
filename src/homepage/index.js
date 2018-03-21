import React from 'react'
import style from './home.less'
import {Link } from 'react-router-dom'

const Homepage = () => {
  return (
  <div className={style.wrapper}>
  <div className={style.textwrapper}>
    <h1>HNC database</h1>
    <h2>这里是介绍词，介绍介绍介绍</h2>
    <Link className={style.button} to="/Gene">start here</Link>
  </div>
  </div>
  )
}


export default Homepage
