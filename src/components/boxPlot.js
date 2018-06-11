import React from 'react'
import echarts from 'echarts'
echarts.dataTool = require("echarts/extension/dataTool");

class Boxplot extends React.Component {

  componentDidMount () {
    this.myChart = echarts.init(document.getElementById('echart-boxplot'));  
    this.updateChart(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.updateChart(nextProps)
  }

  updateChart = props => {
    const { title, boxPlotData } = props

    console.log(boxPlotData)

    var data = echarts.dataTool.prepareBoxplotData(boxPlotData);
  
    const option = {
      title: [{
            text: title,
            left: 'center',
          }
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: data.axisData,
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false
          },
          axisLabel: {
            formatter: 'expr {value}'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: 'Expression',
          splitArea: {
            show: true
          }
        },
        series: [{
            name: 'boxplot',
            type: 'boxplot',
            data: data.boxData,
            tooltip: {
              formatter: function (param) {
                return [
                  'Experiment ' + param.name + ': ',
                  'upper: ' + param.data[5],
                  'Q3: ' + param.data[4],
                  'median: ' + param.data[3],
                  'Q1: ' + param.data[2],
                  'lower: ' + param.data[1]
                ].join('<br/>')
              }
            }
          },
          {
            name: 'outlier',
            type: 'scatter',
            data: data.outliers
          }
        ]
    };

    this.myChart.setOption(option);
  }

  render () {
    const { size = 400 } = this.props
    return <div id="echart-boxplot" style={{width:`${size}px`,height:`${size}px`}} />
  }
}
export default Boxplot
