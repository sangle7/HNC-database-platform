import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import { Breadcrumb, Tabs, DatasourceTable, PieChart } from '../../../components'

const DatasetsDrugs = props => {
  const { location, history, dataSource } = props
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
    dataSource,
    columns: [{
      title: 'Drug name',
      dataIndex: 'Drug name',
    }, {
      title: 'Ref. No.',
      dataIndex: 'id',
    }, {
      title: 'Target genes',
      dataIndex: 'Target genes',
    }, {
      title: 'Interaction',
      dataIndex: 'Interaction',
    }, {
      title: 'Regulation',
      dataIndex: 'Regulation',
    }, {
      title: 'Efficacy',
      dataIndex: 'Efficacy',
    }, {
      title: 'More',
      dataIndex: 'More',
      render: (value, record) => (<Link to={`/Datasets/drugs/${record.name}`}><Icon type="arrow-right" /></Link>),
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
