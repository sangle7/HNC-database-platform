import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from '../../components'

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

  return (
    <div>
      <Breadcrumb {...BreadcrumbProps} />
      <button onClick={() => history.push('/Annalysis/Gene')}>Gene</button>
    </div>
  )
}

Annalysis.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Annalysis
