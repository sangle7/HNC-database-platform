import React from 'react'

import { COLORS } from '../const'
import echarts from 'echarts'

require('./mdtheme')

class Stackchart extends React.Component {
  componentDidMount () {
    this.myChart = echarts.init(document.getElementById('echart-stack'), 'roma')
    this.updateChart(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.updateChart(nextProps)
  }

  updateChart = props => {
    const { data } = props

    const legend = ['male', 'female', 'positive', 'negative', 'tumor', 'normal']
    const yData = data.map(e => e.key)


    function gDataByDataAndLegend (legendname, yData, data) {
      return yData.map(e => {
        const arr = data.filter(i => i.key === e)
        return arr[0][legendname] || 0
      })
    }

    /* const option = {
      tooltip: {},
      toolbox: {
        show: true,
        right: 30,
        feature: {
          saveAsImage: {
            show: true,
            pixelRatio: 2,
          },
          magicType: {
            type: ['line', 'bar', 'stack', 'tiled'],
          },
        },
      },
      legend: {
        data: legend,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: yData,
      },
      series: legend.map(item => ({
        name: item,
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight',
          },
        },
        data: gDataByDataAndLegend(item, yData, data),
      })
      ),
    } */

    const option = {
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
          data:['Total','Related Pubmed','Related Case']
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
              data : ['Gene','Drug']
          }
      ],
      xAxis : [
          {
              type : 'value'
          }
      ],
      series : [
        {
          name:'Related Case',
          type:'bar',
          data:[4017, 4237],
        },
          {
            name:'Related Pubmed',
            type:'bar',
            data:[2614, 2361],
          },{
            name:'Total',
            type:'bar',
            data:[1253, 205]
        },
      ]
  };
  

    this.myChart.setOption(option)
  }

  render () {
    const { height = 400 } = this.props
    return <div id="echart-stack" style={{ margin: '0 auto', width: '1000px', height: height + 'px' }} />
  }
}


export default Stackchart
