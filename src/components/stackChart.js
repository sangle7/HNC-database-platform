import React from 'react'

import { COLORS } from '../const'
import echarts from 'echarts'

require('./mdtheme')

class Stackchart extends React.Component {
  componentDidMount () {
    const { uuid } = this.props
    this.myChart = echarts.init(document.getElementById(`echart-stack-${uuid}`), 'roma')
    this.updateChart(this.props)
  }
  
  componentWillReceiveProps (nextProps) {
    this.updateChart(nextProps)
  }  
  
  updateChart = props => {
    const { data } = props

    console.log(data[0])

    const legend =  Object.keys(data[0]).filter(e=>e!=='key')

    console.log(legend)

    const option = {
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
          data: legend,
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      yAxis : [
          {
              type : 'category',
              data : data.map(e=>e.key)
          }
      ],
      xAxis : [
          {
              type : 'value'
          }
      ],
      series : legend.map(e=>({
        name:e,
        type:'bar',
        data:data.map(item=>item[e]),
      }))
  };
  

    this.myChart.setOption(option)
  }

  render () {
    const { height = 400, uuid } = this.props
    return <div id={`echart-stack-${uuid}`} style={{ margin: '0 auto', width: '1000px', height: height + 'px' }} />
  }
}


export default Stackchart
