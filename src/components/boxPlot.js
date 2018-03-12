import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import exploding_boxplot from 'd3_exploding_boxplot'

const generateBoxPlot = (dataSource) => {
  const box1 = d3.range(100).map(d3.random.normal(Math.random() * 100, 5))
    .map(function (d, i) {
      return {
        v: d,
        g: 'box1',
        t: 'pt 1' + i
      }
    })


    console.log(box1)

  const box2 = d3.range(100).map(d3.random.normal(Math.random() * 100, 30))
    .map(function (d, i) {
      return {
        v: d,
        g: 'box2',
        t: 'pt 2' + i
      }
    })

  const box3 = d3.range(100).map(function () {
      return Math.random() * 100
    })
    .map(function (d, i) {
      return {
        v: d,
        g: 'box3',
        t: 'pt 3' + i
      }
    })
  // with outliers
  const box4 = d3.range(80).map(d3.random.normal(50, 5))
    .concat(d3.range(20).map(d3.random.normal(50, 25)))
    .map(function (d, i) {
      return {
        v: d,
        g: 'box4',
        t: 'pt 4' + i
      }
    })

  const data = box1.concat(box2).concat(box3).concat(box4)

  console.log(data)
  console.log(dataSource)

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
  })

  //call chart on a div
  chart('#chartContainer')
}

export default class BoxPlot extends React.Component {
  componentDidMount () {
    generateBoxPlot(this.props.dataSource)
  }
  render () {
    return <div id="chartContainer" />
  }
}
