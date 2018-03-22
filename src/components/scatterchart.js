import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const SimpleScatterChart = ({dataSource, size = 400}) => {
  return (
  <ScatterChart width={size}
    height={size}
    margin={{
 top: 20, right: 20, bottom: 20, left: 20,
}}>
    <XAxis dataKey="AA06" name="AA06" unit="" />
    <YAxis dataKey="TP53TG1" name="TP53TG1" unit="" />
    <CartesianGrid />
    <Scatter name="A school" data={dataSource} fill="#8884d8" lineType="fitting"  line={{stroke: 'red', strokeWidth: 2}}/>
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
  </ScatterChart>
)}
export default SimpleScatterChart
