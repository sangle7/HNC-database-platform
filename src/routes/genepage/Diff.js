import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { DatasourceTable, LineChart } from '../../components'

const Option = Select.Option
const Diff = props => {
  const { loading, dataSource, onChange } = props

  const TableProps = {
    dataSource,
    loading,
    columns: [{
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
    }],
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DatasourceTable {...TableProps} />
        <LineChart />
      </div>
    </div>)
}

Diff.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Diff
