import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button } from 'antd'
import { Breadcrumb } from '../../components'
import style from './style.less'

const Annalysis = props => {
  const { location, history } = props
  const BreadcrumbProps = {
    path: location.pathname,
    handleClick (index) {
      const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
      if (newpath !== location.pathname) {
        history.push(newpath)
      }
    },
  }

  const Card = ({path,i}) => (
    <div className={classnames({ [style.card]: true },`bg${i}`)}>
      <h1>{path}</h1>
      <Button ghost onClick={() => history.push(`/Annalysis/${path}`)}>Get In Touch</Button>
    </div>
  )

  return (
    <div>
      <Breadcrumb {...BreadcrumbProps} />
      <div className={style.butcontainer}>
      {["Gene","Drug","Surviral","Corr","Diff"].map((el,i)=><Card path={el} i={i}/>)}
      </div>
    </div>
  )
}

Annalysis.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Annalysis
