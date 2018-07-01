import React from 'react'
import { COLORS } from '../const'
import echarts from 'echarts'

require('./mdtheme')

class Barchart extends React.Component {
  componentDidMount () {
    const { onBarClick } = this.props
    this.myChart = echarts.init(document.getElementById('echart-bar'), 'roma')
    this.updateChart(this.props)
    this.myChart.on('click', params => {
      onBarClick(params.name)
    })
  }

  componentWillReceiveProps (nextProps) {
    this.updateChart(nextProps)
  }

  updateChart = props => {
    const { data } = props
    const dateSource = data.filter(el => el.name)

    const option = {
      title: {
        show: false,
      },
      toolbox: {
        show: true,
        right: 30,
        feature: {
          saveAsImage: {
            show: true,
            pixelRatio: 2,
          },
        },
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: dateSource.map(e => e.name),
      },
      tooltip: {
        formatter: '{b}:{c}',
      },
      series: [{
        label: {
          show: true,
          position: 'right',
        },
        data: dateSource.map((obj, index) => ({
          itemStyle: {
            color: COLORS[index % COLORS.length],
          },
          ...obj,
        })),
        type: 'bar',
      }],
    }


    this.myChart.setOption(option)
  }

  render () {
    const width = Math.min(document.body.clientWidth,1000)
    return <div id="echart-bar" style={{ margin: '0 auto', width: `${width}px`, height: `${width * 0.4}px` }} />
  }
}


export default Barchart
