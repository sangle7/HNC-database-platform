import React from 'react'
import style from './card.less'

const Card = props => {
    const {title} = props
    return (
        <div className={style.card}>
            <div className={style.cardtitle}>{title}</div>
            {props.children}
        </div>
    )
}

export default Card