import React from 'react'
import ColorHash from 'color-hash'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const colorHash = new ColorHash()

const StackedBarChart = props => {
  const { chartSource } = props
  let arr = []
  for (let elem of chartSource){
    arr = [...arr,...Object.keys(elem)]
  }
  const arr2 = Array.from(new Set(arr)).slice(1)
  const bars = arr2.map(e=><Bar dataKey={e} stackId="a" fill={colorHash.hex(e)} />)
  return (
    <BarChart width={600}
      height={300}
      data={chartSource}
      margin={{
  top: 20, right: 30, left: 20, bottom: 5,
  }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {bars}
    </BarChart>)
}
export default StackedBarChart
