import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Tabs, DatasourceTable, StackedBarChart } from '../../../components'
const DatasetsCases = props => {
  const { location, history } = props
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
    dataSource: [],
    columns: [{
      title: 'Case UUID',
      dataIndex: 'Case UUID',
    }, {
      title: 'TCGA',
      dataIndex: 'TCGA',
    }, {
      title: 'Gender',
      dataIndex: 'Gender',
    }, {
      title: 'Age',
      dataIndex: 'Age',
    }, {
      title: 'HPV',
      dataIndex: 'HPV',
    }, {
      title: 'Alcohol',
      dataIndex: 'Alcohol',
    }, {
      title: 'Smoke',
      dataIndex: 'Smoke',
    }, {
      title: 'Grade',
      dataIndex: 'Grade',
    }, {
      title: 'Drug',
      dataIndex: 'Drug',
    }, {
      title: 'Stage',
      dataIndex: 'Stage',
    }, {
      title: 'Prognosis',
      dataIndex: 'Prognosis',
    }, {
      title: 'Chemotherapy',
      dataIndex: 'Chemotherapy',
    }, {
      title: 'Metastasis',
      dataIndex: 'Metastasis',
    }, {
      title: 'Recurrence',
      dataIndex: 'Recurrence',
    }, {
      title: 'Differentiation',
      dataIndex: 'Differentiation',
    }, {
      title: 'Radiotherapy',
      dataIndex: 'Radiotherapy',
    }, {
      title: 'Ref. pubID',
      dataIndex: 'Ref. pubID',
    }],
  }
  const TabProps = {
    tabs: [{
      key: 'Table',
      title: 'Table',
      content: <DatasourceTable {...TableProps} />,
    }, {
      key: 'Graph',
      title: 'Graph',
      content: <StackedBarChart />,
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

DatasetsCases.propTypes = {
}

export default DatasetsCases
