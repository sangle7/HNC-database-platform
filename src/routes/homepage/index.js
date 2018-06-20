import React from 'react'
import style from './home.less'
import { Link } from 'react-router-dom'
import { Button } from 'antd';


const Homepage = (props) => {
  const { history } = props
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
        <div onClick={()=>history.push('/Gene')}>
          <div />
          <main>
            <h3>gene information</h3>
            <p>including xxx and xxx.</p>
          </main>
        </div>

         <div onClick={()=>history.push('/ConnectiveMap')}>
          <div />
          <main>
            <h3>drug</h3>
            <p>including xxx and xxx.</p>
          </main>
        </div>

        <div>
          <div />
          <main>
            <h3>Annalysis</h3>
            <p onClick={()=>history.push('/Corr')}>Corrlation</p>
            <p onClick={()=>history.push('/Diff')}>Diff</p>
            <p onClick={()=>history.push('/Survival')}>Survival</p>
          </main>
        </div>
      </div>

    </div>
  )
}


export default Homepage
