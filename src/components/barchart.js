import React from 'react'
import { COLORS } from '../const'
import echarts from 'echarts'

require('./mdtheme')

class Barchart extends React.Component {
  componentDidMount () {
    this.myChart = echarts.init(document.getElementById('echart-bar'), 'roma')
    this.updateChart(this.props)
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
    const { size = 400 } = this.props
    return <div id="echart-bar" style={{ margin: '0 auto', width: '1000px', height: '400px' }} />
  }
}


export default Barchart
