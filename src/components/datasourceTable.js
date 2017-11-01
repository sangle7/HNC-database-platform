import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import style from './datasourceTable.less'
import { Table } from 'antd'

const DatasourceTable = props => {

  return (
    <Table
      className={classnames({ [style.table]: true })}
      bordered
      simple
      rowKey={record => record.id}
      {...props}
    /> 
  )
}

DatasourceTable.propTypes = {
  
}

export default DatasourceTable
