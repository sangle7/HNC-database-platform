import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Tabs, DatasourceTable, PieChart } from '../../../components'

const DatasetsDrugs = props => {
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
      title: 'Drug name',
      dataIndex: 'Drug name',
    }, {
      title: 'Ref. No.',
      dataIndex: 'Ref. No.',
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
      content: <div style={{display: 'flex',flexWrap: 'wrap'}}><PieChart /><PieChart /><PieChart /><PieChart /><PieChart /></div>,
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
}

export default DatasetsDrugs
