import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Tabs, DatasourceTable } from '../../../components'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

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

  const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
  const Chart = () =>(
    <LineChart width={600} height={300} data={data}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
<XAxis dataKey="name"/>
<YAxis/>
<CartesianGrid strokeDasharray="3 3"/>
<Tooltip/>
<Legend />
<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
</LineChart>
  )

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
      key: 'Graph',
      title: 'Graph',
      content: <Chart />,
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

DatasetsCases.propTypes = {
}

export default DatasetsCases
