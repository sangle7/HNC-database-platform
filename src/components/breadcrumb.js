import React from 'react'

import { Breadcrumb, Icon } from 'antd'
import style from './breadcrumb.less'

const Separator = () => (
  <div className={style.separator}>
    <span className={style.arrowleft}></span>
    <span className={style.arrowright}></span>
  </div>
)

const ArrowLeft = () => (
  <div className={style.separator}>
     <span className={style.arrowleft}></span>
  </div>
)

const ArrowRight = () => (
  <div className={style.separator}>
    <span style={{opacity:0}} className={style.arrowleft}></span>
    <span className={style.arrowright}></span>
  </div>
)

const bc = ({ path, handleClick }) => {
  const arr = path.split('/')
  return (
  <div className={style.breadcrumb} >
    <ArrowRight />
    <div className={style.item}> Home </div>
    {arr.map((elem, index) => 
    [<div className={style.item} key={elem} onClick={() => handleClick(index)} >{elem}</div>,
      index === arr.length-1 ?<ArrowLeft />:<Separator />
    ])}
  </div>
)}

// const bc = ({ path, handleClick }) => (
//   <Breadcrumb className={style.breadcrumb} separator={null}>
//     <Breadcrumb.Item className={style.item}> Home </Breadcrumb.Item>
//     {path.split('/').map((elem, index) => 
//     [<Breadcrumb.Item className={style.item} key={elem} onClick={() => handleClick(index)} >{elem}</Breadcrumb.Item>,
//       <Separator />
//     ])}
//   </Breadcrumb>
// )

export default bc
