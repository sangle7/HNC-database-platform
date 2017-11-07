import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Tabs, DatasourceTable, PieChart } from '../../../components'

const DatasetsGenes = props => {
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
      title: 'Offical symbol',
      dataIndex: 'Offical symbol',
    }, {
      title: 'Gene ID',
      dataIndex: 'Gene ID',
    }, {
      title: 'Trans. ID',
      dataIndex: 'Trans. ID',
    }, {
      title: 'PMID',
      dataIndex: 'PMID',
    }, {
      title: 'Tumer Expr.',
      dataIndex: 'Tumer Expr.',
    }, {
      title: 'Drugs',
      dataIndex: 'Drugs',
    }, {
      title: 'Sample Number',
      children: [{
        title: 'Total',
        dataIndex: 'Total',
      }, {
        title: 'Mutants',
        dataIndex: 'Mutants',
      }, {
        title: 'CNVs',
        dataIndex: 'CNVs',
      }, {
        title: 'Meth',
        dataIndex: 'Meth',
      }],
    }],
  }
  const TabProps = {
    tabs: [{
      key: 'Graph',
      title: 'Graph',
      content: <div style={{ display: 'flex', flexWrap: 'wrap' }}><PieChart /><PieChart /><PieChart /><PieChart /><PieChart /><PieChart /></div>,
    }, {
      key: 'Table',
      title: 'Table',
      content: <DatasourceTable {...TableProps} />,
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

DatasetsGenes.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default DatasetsGenes
