import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const SimpleScatterChart = ({dataSource}) => {
  dataSource = dataSource.slice(0,10)
  return (
  <ScatterChart width={800}
    height={800}
    margin={{
 top: 20, right: 20, bottom: 20, left: 20,
}}>
    <XAxis dataKey="AA06" name="基因1" unit="cm" />
    <YAxis dataKey="TP53TG1" name="基因2" unit="kg" />
    <CartesianGrid />
    <Scatter name="A school" data={dataSource} fill="#8884d8" lineType="fitting"  line={{stroke: 'red', strokeWidth: 2}}/>
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
  </ScatterChart>
)}
export default SimpleScatterChart
