import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import { Breadcrumb, Tabs, DatasourceTable, PieChart } from '../../../components'

const DatasetsDrugs = props => {
  const { location, history, dataSource,pagination, loading } = props
  const BreadcrumbProps = {
    path: location.pathname,
    handleClick (index) {
      const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
      if (newpath !== location.pathname) {
        history.push(newpath)
      }
    },
  }


  const TableProps = {
    loading,
    pagination,    
    dataSource,
    columns: [{
      title: 'Drug name',
      dataIndex: 'drug_name',
    }, {
      title: 'PMID',
      dataIndex: 'pmid',
    }, {
      title: 'Target gene',
      dataIndex: 'target_gene',
    }, {
      title: 'Interaction',
      dataIndex: 'interaction',
    }, {
      title: 'Regulation',
      dataIndex: 'regulation',
    }, {
      title: 'Efficacy',
      dataIndex: 'efficacy',
    },{
      title: 'Evidence',
      dataIndex: 'evidence',
    },{
      title: 'Tumor Site',
      dataIndex: 'tumor_site',
    }],
    expandedRowRender: record => record.note ? <span>{record.note}</span> : null,
    expandRowByClick: true,
    onChange: page => {
      const search = {
        ...queryString.parse(location.search),
        page: page.current,
      }
      props.history.push(`/Datasets/Drugs?${queryString.stringify(search)}`)
    },
  }
  const TabProps = {
    tabs: [{
      key: 'Table',
      title: 'Table',
      content: <DatasourceTable {...TableProps} />,
    }, {
      key: 'Graph',
      title: 'Graph',
      content: <div style={{ display: 'flex', flexWrap: 'wrap' }}><PieChart /><PieChart /><PieChart /><PieChart /><PieChart /></div>,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return (
    <div>
      <Breadcrumb {...BreadcrumbProps} />
      <Tabs {...TabProps} />
    </div>
  )
}

DatasetsDrugs.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default DatasetsDrugs
