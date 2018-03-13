import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Select } from 'antd'
import { DatasourceTable, ScatterChart, Breadcrumb } from '../../components'
import style from './style.less'

const Option = Select.Option
const Diff = props => {
  const {
    loading, dataSource, location, history
  } = props

  const onChange = t => {
    history.push(`${location.pathname}?type=${t}`)
  }

  const BreadcrumbProps = {
    path: location.pathname,
    handleClick (index) {
      const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
      if (newpath !== location.pathname) {
        history.push(newpath)
      }
    },
  }

  const type = queryString.parse(location.search).type || 'HPV'

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
      <Breadcrumb {...BreadcrumbProps} />
      <main>
        <div className={style.select}>
          Select an object category
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
        </div>
        <div className={style.container}>
          <DatasourceTable {...TableProps} />
          <ScatterChart />
        </div>
      </main>
    </div>
    )
}

Diff.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default Diff
