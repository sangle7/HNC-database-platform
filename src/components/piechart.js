import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { COLORS } from '../const'

const data01 = [
  {
    name: 'Group A',
    value: 400,
  }, {
    name: 'Group B',
    value: 300,
  }, {
    name: 'Group C',
    value: 300,
  }, {
    name: 'Group D',
    value: 200,
  }, {
    name: 'Group E',
    value: 278,
  }, {
    name: 'Group F',
    value: 189,
  },
]

const Chart = () => (
  <PieChart width={300} height={300}>
    <Pie
      isAnimationActive
      data={data01}
      cx={150}
      cy={150}
      outerRadius={80}
      fill="#333"
      label
    >
      {data01.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)}
    </Pie>
  </PieChart>
)

export default Chart
