import React from 'react'
import style from './home.less'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd';
import { Header, Card } from '../../components'


const Homepage = () => {
  return (
  <div>
    <header className={style.header}>
      <div className={style.container}>
        <h1>HNC Database</h1>
        <h2>A comprehensive resource for the HNC community, including the related gene and medication information, provides a Genome Atlas platform to perform integrated analysis.</h2>
        <Link className={style.button} to="/Gene">start here</Link>
      </div>
    </header>

    <div className={style.imgcontainer}>
      <div>
        <div />
        <main>
          <h3>gene information</h3>
          <p>including xxx and xxx.</p>
        </main>
      </div>

      <div>
        <div />
        <main>
          <h3>gene information</h3>
          <p>including xxx and xxx.</p>
        </main>
      </div>

      <div>
        <div />
        <main>
          <h3>gene information</h3>
          <p>including xxx and xxx.</p>
        </main>
      </div>

      <div>
        <div />
        <main>
          <h3>drug</h3>
          <p>including xxx and xxx.</p>
        </main>
      </div>
      
    </div>

  </div>
  )
}


export default Homepage
