import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button } from 'antd'
import { Breadcrumb } from '../../components'
import style from '../annalysis/style.less'

const Datasets = props => {
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
      <Button ghost onClick={() => history.push(`/Datasets/${path}`)}>Get In Touch</Button>
    </div>
  )

  return (
    <div>
      <Breadcrumb {...BreadcrumbProps} />
      <div className={style.butcontainer}>
      {["Genes","Drugs","Cases","ncRNA","Records"].map((el,i)=><Card path={el} i={i}/>)}
      </div>
    </div>
  )
}

Datasets.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Datasets
