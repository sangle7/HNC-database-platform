import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { DatasourceTable, ScatterChart } from '../../components'

const Option = Select.Option
const Diff = props => {
  const { loading, dataSource, onChange, type } = props

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Sample ID',
      dataIndex: 'id',
    }, {
      title: type,
      dataIndex: type,
    }, {
      title: 'Expr.log2',
      dataIndex: 'Expr.log2',
    }],
  }
  return (
    <div>
      <Select defaultValue="HPV" style={{ width: 120 }} onChange={key => onChange(key)}>
        <Option value="HPV">HPV</Option>
        <Option value="Age">Age</Option>
        <Option value="Gender">Gender</Option>
        <Option value="Alcohol">Alcohol</Option>
        <Option value="Smoke">Smoke</Option>
        <Option value="Drug">Drug</Option>
        <Option value="Grade">Grade</Option>
        <Option value="Stage">Stage</Option>
        <Option value="Prognosis">Prognosis</Option>
        <Option value="Metastasis">Metastasis</Option>
        <Option value="Recurrence">Recurrence</Option>
        <Option value="Differentiation">Differentiation</Option>
        <Option value="Radiotherapy">Radiotherapy</Option>
        <Option value="Chemotherapy">Chemotherapy</Option>
      </Select>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DatasourceTable {...TableProps} />
        <ScatterChart />
      </div>
    </div>)
}

Diff.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default Diff
