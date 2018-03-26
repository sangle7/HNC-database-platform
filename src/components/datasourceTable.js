import React from 'react'
import classnames from 'classnames'
import { Table } from 'antd'
import style from './datasourceTable.less'

const DatasourceTable = props => {
  const { grow = true,columns }  = props
  return (
    <Table
      className={classnames({ [style.table]: true, [style.grow]: grow })}
      bordered

      rowKey={record  => record.id}
      {...props}   
      columns={columns}
    />
  )
}

export default DatasourceTable
