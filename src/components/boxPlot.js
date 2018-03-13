import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import exploding_boxplot from 'd3_exploding_boxplot'

const generateBoxPlot = ({dataSource,onclickcb}) => {
  // chart(data,aes)
  // aesthetic :
  // y : point's value on y axis
  // group : how to group data on x axis
  // color : color of the point / boxplot
  // label : displayed text in toolbox
  const chart = exploding_boxplot(dataSource, {
    y: 'v',
    group: 'g',
    color: 'g',
    label: 't'
  },onclickcb)

  //call chart on a div
  chart('#chartContainer')
}

export default class BoxPlot extends React.Component {
  componentDidMount () {
    generateBoxPlot({dataSource: this.props.dataSource, onclickcb: this.props.onclickcb})
  }
  render () {
    return <div id="chartContainer" />
  }
}
