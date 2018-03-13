import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Text } from 'recharts'
import { COLORS } from '../const'

const CustomBarLabel = (props) => {
  const { x, y, value, width, height } = props
  return <Text x={x + width + 5} y={y} fill="#666" textAnchor="start" verticalAnchor="middle" dy={height / 2}>{`${value}`}</Text>;
}

const chart = ({ data }) =>{
  const dateSource = data.filter(el=>el.name)
  return (<BarChart layout="vertical"
    width={800}
    height={300}
    data={dateSource}
    barCategoryGap="20%"
    barSize={40}
    margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
    <XAxis type="number" />
    <YAxis dataKey="name" type="category" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Bar dataKey="count" label={<CustomBarLabel />}>
      {dateSource.map((entry, index) => (<Cell fill={COLORS[index % COLORS.length]} />))}
    </Bar>
  </BarChart>
)}

chart.propTypes = {
  data: PropTypes.array.isRequired,
}

export default chart
