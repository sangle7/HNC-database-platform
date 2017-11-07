import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import { COLORS } from '../const'


const chart = ({ data }) => (
  <BarChart layout='vertical' width={800} height={300} data={data}
    barCategoryGap="20%" barSize={40}
    margin={{top: 5, right: 30, left: 50, bottom: 5}}>
    <XAxis type="number" /> 
    <YAxis dataKey="name" type="category" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Bar dataKey="count" >
      {data.map((entry, index) => (<Cell fill={COLORS[index % COLORS.length]} />))}
    </Bar>
  </BarChart>
)
export default chart
