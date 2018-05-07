import React from 'react'
import style from './home.less'
import {Link } from 'react-router-dom'

const Homepage = () => {
  return (
  <div className={style.wrapper}>
    <div className={style.bg} />
    <div className={style.textwrapper}>
      <h1>HNC Database</h1>
      <h2>A comprehensive resource for the HNC community, including the related gene and medication information, provides a Genome Atlas platform to perform integrated analysis.</h2>
      <Link className={style.button} to="/Gene">start here</Link>
    </div>
  </div>
  )
}


export default Homepage
