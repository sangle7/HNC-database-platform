import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
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
      <Button onClick={() => history.push('/Annalysis/Gene')}>Gene</Button>
      <Button onClick={() => history.push('/Annalysis/Drug')}>Drug</Button>
      <Button onClick={() => history.push('/Annalysis/Surviral')}>Surviral</Button>
      <Button onClick={() => history.push('/Annalysis/Corr')}>Corr. annalysis</Button>
      <Button onClick={() => history.push('/Annalysis/Diff')}>Diff. annalysis</Button>
    </div>
  )
}

Annalysis.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Annalysis
