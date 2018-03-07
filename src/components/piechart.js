import React from 'react'
import ColorHash from 'color-hash'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { COLORS } from '../const'
const colorHash = new ColorHash()

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

const Chart = props => {
  const { dataSource } = props
  return (<PieChart width={300} height={300}>
    <Pie
      isAnimationActive
      data={dataSource}
      cx={150}
      cy={150}
      outerRadius={80}
      fill="#333"
      label
    >
      {dataSource.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)}
    </Pie>
    <Tooltip />
  </PieChart>
  )
}

export default Chart
