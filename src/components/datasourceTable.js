import React from 'react'
import classnames from 'classnames'
import { Table } from 'antd'
import style from './datasourceTable.less'

const DatasourceTable = props => {
  const { nwrap = false, columns }  = props
  return (
    <Table
      className={classnames({ [style.table]: true, [style.nwrap]: nwrap })}
      bordered

      rowKey={record  => record.id}
      {...props}   
      columns={columns}
    />
  )
}

export default DatasourceTable
