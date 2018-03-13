import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Select, Button } from 'antd'
import { DatasourceTable, ScatterChart, Breadcrumb } from '../../components'
import style from './style.less'


const Option = Select.Option
const Corr = props => {
  const {
    loading, dataSource, showModal, location, history
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

  const type = queryString.parse(location.search).type || 'mRNA'  

  const isChart = ['CNV', 'Surviral'].includes(type)
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
          render: (value, record) => <Button type="primary" shape="circle" onClick={() => showModal(record)} icon="search" />,
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
          render: (value, record) => <Button type="primary" shape="circle" onClick={() => showModal(record)} icon="search" />,
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
          render: (value, record) => <Button type="primary" shape="circle" onClick={() => showModal(record)} icon="search" />,
        }]
      case 'CNV':
      case 'Surviral':
        return [{
          title: 'Gene',
          dataIndex: 'Gene',
        }, {
          title: 'Sample ID',
          dataIndex: 'id',
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
  const TableProps = {
    dataSource,
    loading,
    columns: getColumn(type),
  }
  return (
    <div>
        <Breadcrumb {...BreadcrumbProps} />
        <main>
            <div className={style.select}>
                Select an object category
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
            </div>
            <div className={style.container}>
                <DatasourceTable {...TableProps} />
                { isChart ? <ScatterChart /> : null}
            </div>
        </main>
    </div>)
}
Corr.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
}

export default Corr
