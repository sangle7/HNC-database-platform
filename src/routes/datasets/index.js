import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { Breadcrumb } from '../../components'

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

  return (
    <div>
      <Breadcrumb {...BreadcrumbProps} />
      <Button onClick={() => history.push('/Datasets/Genes')}>Genes</Button>
      <Button onClick={() => history.push('/Datasets/Drugs')}>Drugs</Button>
      <Button onClick={() => history.push('/Datasets/Cases')}>Cases</Button>
      <Button onClick={() => history.push('/Datasets/ncRNA')}>ncRNA</Button>
      <Button onClick={() => history.push('/Datasets/Records')}>Records</Button>
    </div>
  )
}

Datasets.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Datasets
