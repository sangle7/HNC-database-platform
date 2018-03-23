import React from 'react'
import classnames from 'classnames'
import { Table } from 'antd'
import style from './datasourceTable.less'

const DatasourceTable = props => {
  const { grow = true }  = props
  return (
    <Table
      className={classnames({ [style.table]: true, [style.grow]: grow })}
      bordered

      rowKey={record  => record.id}
      {...props}   
      columns={
        props.columns.map((elem,index)=>{
          elem.title = <span className={index%2===0?style.labelG:style.labelY}>{elem.title}</span>
          return elem
        })
      }
    />
  )
}

export default DatasourceTable
