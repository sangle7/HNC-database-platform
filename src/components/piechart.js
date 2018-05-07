import React from 'react'
import PropTypes from 'prop-types'
import { COLORS } from '../const'
import echarts from 'echarts'

class PieChart extends React.Component {

  componentDidMount () {
    const { uuid } = this.props
    this.myChart = echarts.init(document.getElementById(`echart-Pie-${uuid}`));  
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
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      title: {
        text: `${obj.key} in HNClinc`,
        left: 'center',
        bottom:0,
      },
      legend: {},
      series: [{
        name: obj.key,
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: obj.value,
      }]
    };

    this.myChart.setOption(option);
  }

  render () {
    const { size = 400, uuid } = this.props
    return <div id={`echart-Pie-${uuid}`} style={{margin:'0 auto',width:'500px',height:'400px'}} />
  }
}


export default PieChart
