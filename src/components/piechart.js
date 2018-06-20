import React from 'react'

import { COLORS } from '../const'
import echarts from 'echarts'

require('./mdtheme')

class PieChart extends React.Component {
  componentDidMount () {
    const { uuid } = this.props
    this.myChart = echarts.init(document.getElementById(`echart-Pie-${uuid}`), 'roma')
    this.updateChart(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.updateChart(nextProps)
  }

  updateChart = props => {
    const { obj } = props

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
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
      title: {
        text: `${obj.key} in HNClinc`,
        left: 'center',
        bottom: 0,
      },
      legend: {
      },
      series: [{
        name: obj.key,
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center',
            formatter: '{d}%',
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold',
            },
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: obj.value,
      }],
    }

    this.myChart.setOption(option)
  }

  render () {
    const { size = 400, uuid } = this.props
    return <div id={`echart-Pie-${uuid}`} style={{ margin: '0 auto', width: '250px', height: '350px' }} />
  }
}


export default PieChart
