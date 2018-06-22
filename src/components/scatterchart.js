import React from 'react'
import echarts from 'echarts'
import { getlinearRegression } from '../const'
import { WSATYPE_NOT_FOUND } from 'constants';
import { isArray } from 'util';

class SimpleScatterChart extends React.Component {
  componentDidMount () {
    const { onDotClick } = this.props
    this.myChart = echarts.init(document.getElementById('echart-scatter'))
    this.updateChart(this.props)
    this.myChart.on('click', params => {
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
    const { xMin, xMax, a, b, result } = getlinearRegression(dataSource)
    const linearExp = x => a * x + b
    const markLineOpt = {
      animation: false,
      label: {
        normal: {
          formatter: `y = ${a.toFixed(2)} * x + ${b.toFixed(2)} \n r = ${result.toFixed(4)}`,
          textStyle: {
            align: 'right',
          },
        },
      },
      lineStyle: {
        color: '#333',
      },
      tooltip: {
        formatter: `y = ${a.toFixed(2)} * x + ${b.toFixed(2)} <br /> r = ${result.toFixed(4)}`,
      },
      data: [
        [{
          coord: [xMin, linearExp(xMin)],
          symbol: 'none',
        }, {
          coord: [xMax, linearExp(xMax)],
          symbol: 'none',
        }],
      ],
    }

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
          dataZoom: {
            show: true,
          },
        },
      },
      animation: true,
      xAxis: { name: xAxis, nameGap: 5 },
      yAxis: { name: yAxis },
      tooltip: {
        formatter: (params, ticket, callback) => {
          const { value } = params
          // return isArray(value)
          const arr = value.map(e=>{
            switch (typeof(e)) {
              case 'number':
                return e.toFixed(2)
              case 'string':
                return /\./.test(e)? e.split('.')[0] : e
              default:
                return e
            }
          })
          return `${arr.join('<br />')}`;
        },
      },
      series: [{
        symbolSize: 5,
        data: dataSource.map(e => modifyArr(Object.values(e))),
        type: 'scatter',
        markLine: markLineOpt,
      }],
    }

    this.myChart.setOption(option)
  }

  render () {
    const { size = 400 } = this.props
    return <div id="echart-scatter" style={{ width: `${size}px`, height: `${size}px` }} />
  }
}
export default SimpleScatterChart


function modifyArr (array) {
  const item = array.shift()
  array.push(item)
  return array
}

