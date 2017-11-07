import React from 'react'
import classnames from 'classnames'
import { Table } from 'antd'
import style from './datasourceTable.less'

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

export default DatasourceTable
