import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Breadcrumb, Tabs, DatasourceTable, StackedBarChart } from '../../../components'

const DatasetsCases = props => {
  const { location, history, dataSource, pagination, loading, chartSource } = props
  const BreadcrumbProps = {
    path: location.pathname,
    handleClick (index) {
      const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
      if (newpath !== location.pathname) {
        history.push(newpath)
      }
    },
  }

  const goToCase = v => props.history.push(`/Datasets/Cases/${v}`)

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      "title": "ID",
      "dataIndex": "SampleID",
      "width": 130,
      render: v => <span onClick = {() => goToCase(v)}>{v}</span>,      
    }, {
      "title": "PMID",
      "dataIndex": "PMID",
      "width": 130
    }, {
      "title": "Author",
      "dataIndex": "Author",
      "width": 130
    }, {
      "title": "Year",
      "dataIndex": "Year",
      "width": 100
    }, {
      "title": "Data Type",
      "dataIndex": "Data Type",
      "width": 150
    }, {
      "title": "Dataset ID",
      "dataIndex": "Dataset ID",
      "width": 150
    }, {
      "title": "Patient ID",
      "dataIndex": "Patient ID",
      "width": 150
    }, {
      "title": "molecule",
      "dataIndex": "molecule",
      "width": 150
    }, {
      "title": "Cell Type",
      "dataIndex": "Cell Type",
      "width": 130
    }, {
      "title": "Cell_line",
      "dataIndex": "Cell_line",
      "width": 150
    }, {
      "title": "anatomicSite",
      "dataIndex": "anatomicSite",
      "width": 170
    }, {
      "title": "age",
      "dataIndex": "age",
      "width": 100
    }, {
      "title": "gender",
      "dataIndex": "gender",
      "width": 120
    }, {
      "title": "race",
      "dataIndex": "race",
      "width": 130
    }, {
      "title": "Tumor",
      "dataIndex": "Tumor/Normal",
      "width": 120
    }, {
      "title": "Tgrade",
      "dataIndex": "Tgrade",
      "width": 120
    }, {
      "title": "C",
      "dataIndex": "ClinicalStage",
      "width": 100
    }, {
      "title": "T",
      "dataIndex": "Tstage",
      "width": 80
    }, {
      "title": "N",
      "dataIndex": "Nstage",
      "width": 80
    }, {
      "title": "M",
      "dataIndex": "Mstage",
      "width": 80
    }, {
      "title": "tobacco",
      "dataIndex": "tobacco",
      "width": 120
    }, {
      "title": "alcohol",
      "dataIndex": "alcohol",
      "width": 120
    }, {
      "title": "vital",
      "dataIndex": "vital",
      "width": 120
    }, {
      "title": "hpv",
      "dataIndex": "hpv",
      "width": 120
    }, {
      "title": "recurrence",
      "dataIndex": "recurrence",
      "width": 150
    }, {
      "title": "followUpMonths",
      "dataIndex": "followUpMonths",
      "width": 200
    }, {
      "title": "survival",
      "dataIndex": "survival",
      "width": 120
    }, {
      "title": "OS Time",
      "dataIndex": "OS Time",
      "width": 120
    }, {
      "title": "PFS Time",
      "dataIndex": "PFS Time",
      "width": 130
    }, {
      "title": "source",
      "dataIndex": "source",
      "width": 120
    }],
    scroll: { x: '300%', y: 600 },
    pagination,
    onChange: page => {
      const search = {
        ...queryString.parse(location.search),
        page: page.current,
      }
      props.history.push(`/Datasets/Cases?${queryString.stringify(search)}`)
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
      content: <StackedBarChart chartSource={chartSource}/>,
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
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default DatasetsCases
