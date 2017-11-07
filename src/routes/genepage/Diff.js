import React from 'react'
import { Select } from 'antd'
import { DatasourceTable } from '../../components'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const Option = Select.Option
const Diff = props => {
  const { loading, dataSource, type, onChange } = props


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
    <LineChart width={500} height={300} data={data}
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
    dataSource,
    loading,
    columns: [{
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
    }],
  }
  return (<div>
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
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <DatasourceTable {...TableProps} />
      <Chart />
    </div>
    </div>)
}

export default Diff
