import React from 'react'
import PropTypes from 'prop-types'
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
      <button onClick={() => history.push('/Datasets/Genes')}>Genes</button>
      <button onClick={() => history.push('/Datasets/Drugs')}>Drugs</button>
      <button onClick={() => history.push('/Datasets/Cases')}>Cases</button>
      <button onClick={() => history.push('/Datasets/ncRNA')}>ncRNA</button>
      <button onClick={() => history.push('/Datasets/Records')}>Records</button>
    </div>
  )
}

Datasets.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Datasets
