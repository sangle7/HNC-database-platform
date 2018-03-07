import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Breadcrumb, Tabs, DatasourceTable, StackedBarChart } from '../../../components'

const a = {
  "SampleID": "GSM2260037",
  "PMID": "28433800",
  "Author": "Mahimkar",
  "Year": 2017,
  "Data Type": "Expression",
  "Dataset ID": "GSE85195",
  "Patient ID": "Patient_OSCC_OC 1760",
  "molecule": "RNA",
  "Cell Type": "",
  "Cell_line": "",
  "anatomicSite": "ORAL CAVITY",
  "age": "43",
  "gender": "Male",
  "race": "",
  "Tumor/Normal": "Tumor",
  "Tgrade": "",
  "ClinicalStage": "2",
  "Tstage": "",
  "Nstage": "",
  "Mstage": "",
  "tobacco": "",
  "alcohol": "",
  "vital": "",
  "hpv": "",
  "recurrence": "",
  "followUpMonths": "",
  "survival": "",
  "OS Time": "",
  "PFS Time": "",
  "source": "GEO\r"
}

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
    columns: Object.keys(a).map((elem,i) => ({
      title: elem,
      dataIndex: elem,
      width: elem.length * 50,
      render: v =>  (i === 0 ? <span onClick={()=>goToCase(v)}>{v}</span> : v || 'N/A'),
    })),
    scroll: { x: '500%', y: 600 },
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
