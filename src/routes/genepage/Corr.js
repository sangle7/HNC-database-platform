import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { DatasourceTable } from '../../components'

const getColumn = _type => {
  switch (_type) {
    case 'mRNA':
      return [{
        title: 'Gene',
        dataIndex: 'Gene',
      }, {
        title: 'Corr.Gene',
        dataIndex: 'Corr.Gene',
      }, {
        title: 'r(Pearson)',
        dataIndex: 'r',
      }, {
        title: 'P-value',
        dataIndex: 'P-value',
      }, {
        title: 'Plot',
        dataIndex: 'Plot',
      }]
    case 'IncRNA':
      return [{
        title: 'Gene',
        dataIndex: 'Gene',
      }, {
        title: 'Corr.IncRNA',
        dataIndex: 'Corr.IncRNA',
      }, {
        title: 'r(Pearson)',
        dataIndex: 'r',
      }, {
        title: 'P-value',
        dataIndex: 'P-value',
      }, {
        title: 'Plot',
        dataIndex: 'Plot',
      }]
    case 'miRNA':
      return [{
        title: 'Gene',
        dataIndex: 'Gene',
      }, {
        title: 'Corr.miRNA',
        dataIndex: 'Corr.miRNA',
      }, {
        title: 'r(Pearson)',
        dataIndex: 'r',
      }, {
        title: 'P-value',
        dataIndex: 'P-value',
      }, {
        title: 'Plot',
        dataIndex: 'Plot',
      }]
    case 'CNV':
    case 'Surviral':
      return [{
        title: 'Gene',
        dataIndex: 'Gene',
      }, {
        title: 'Sample ID',
        dataIndex: 'Sample ID',
      }, {
        title: 'log2RPKM',
        dataIndex: 'log2RPKM',
      }, {
        title: 'Segment mean',
        dataIndex: 'Segment mean',
      }]
    default:
      return []
  }
}

const Option = Select.Option
const Corr = props => {
  const {
    loading, dataSource, type, onChange,
  } = props
  const TableProps = {
    dataSource,
    loading,
    columns: getColumn(type),
  }
  return (
    <div>
      <Select defaultValue="mRNA" style={{ width: 120 }} onChange={key => onChange(key)}>
        <Option value="mRNA">mRNA</Option>
        <Option value="IncRNA">IncRNA</Option>
        <Option value="miRNA">miRNA</Option>
        <Option value="CNV">CNV</Option>
        <Option value="Surviral">Surviral</Option>
        <Option value="Methylation">Methylation</Option>
        <Option value="m6A">m6A</Option>
        <Option value="Phosphorylation">Phosphorylation</Option>
      </Select>
      <DatasourceTable {...TableProps} />
    </div>)
}
Corr.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Corr
