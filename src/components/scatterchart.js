import React from 'react'
import echarts from 'echarts'
import { getlinearRegression } from '../const'

class SimpleScatterChart extends React.Component {

  componentDidMount () {
    const { onDotClick } = this.props
    this.myChart = echarts.init(document.getElementById('echart-scatter'));  
    this.updateChart(this.props)
    this.myChart.on('click',params => {
      if (params.seriesType === 'scatter') {
        onDotClick(params.data[2])
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    this.updateChart(nextProps)
  }

  updateChart = props => {
    const { dataSource } = props
    const { xMin, xMax, a, b } = getlinearRegression(dataSource)
    const linearExp = x => a * x + b
    const markLineOpt = {
      animation: false,
      label: {
        normal: {
          formatter: `y = ${a.toFixed(2)} * x + ${b.toFixed(2)}`,
          textStyle: {
            align: 'right'
          }
        }
      },
      lineStyle: {
        color:'#333',
      },
      tooltip: {
        formatter: `y = ${a.toFixed(2)} * x + ${b.toFixed(2)}`
      },
      data: [
        [{
          coord: [xMin, linearExp(xMin)],
          symbol: 'none'
        }, {
          coord: [xMax, linearExp(xMax)],
          symbol: 'none'
        }]
      ]
    };

    const [i, xAxis, yAxis] = Object.keys(dataSource[0])
  
    const option = {
      title: {
        text: 'Corr. Analysis Result',
        subtext: 'click on dot to remove item',
        left: 'center',
      },
      toolbox: {
        show: true,
        right: 30,
        feature: {
          saveAsImage: {
            show: true,
            pixelRatio: 2,
          },
          dataZoom:{
            show: true,
          }
        }
      },
      animation: true,
      xAxis: {name:xAxis},
      yAxis: {name:yAxis},
      tooltip: {
        formatter: '({c})'
      },
      series: [{
        symbolSize: 5,
        data: dataSource.map(e => modifyArr(Object.values(e))),
        type: 'scatter',
        markLine: markLineOpt,
      }]
    };

    this.myChart.setOption(option);
  }

  render () {
    const { size = 400 } = this.props
    return <div id="echart-scatter" style={{width:`${size}px`,height:`${size}px`}} />
  }
}
export default SimpleScatterChart


function modifyArr (array) {
  const item = array.shift()
  array.push(item)
  return array
}

