import React from 'react'
import echarts from 'echarts'
echarts.dataTool = require("echarts/extension/dataTool");

const xDataMap = {
  Tumor:['Tumor','Normal'],
  HPV:['HPV positive','HPV negative'],
  Tobacco:['Tobacco positive','Tobacco negative'],
  Recurrence:['recurrence','non-recurrence'],
}

const gSubText = obj => {
  let str = ''
  for (let key in obj) {
    str += `${key}:${obj[key]}\n`
  }
  return str
}

class Boxplot extends React.Component {

  componentDidMount () {
    this.myChart = echarts.init(document.getElementById('echart-boxplot'));  
    this.updateChart(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.updateChart(nextProps)
  }

  updateChart = props => {
    
    const { gene, title, boxPlotData, subtitle } = props

    console.log(subtitle)

    var data = echarts.dataTool.prepareBoxplotData(boxPlotData);

    const xData = xDataMap[title.split('_')[1]] //GSE1722_Tumor_vs_Normal_coding
  
    const option = {
      title: [{
        text: `${title.split('_')[0]} - ${gene}`,
        left: 'center',
        subtext: gSubText(subtitle)
      }],
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
        data: xData
      },
      yAxis: {
        type: 'value',
        name: 'Expression',
        splitArea: {
          show: true
        }
      },
      toolbox: {
        show: true,
        right: 30,
        feature: {
          saveAsImage: {
            show: true,
            pixelRatio: 2,
          }
        }
      },
      series: [{
        name: 'boxplot',
        type: 'boxplot',
        data: data.boxData,
        tooltip: {
          formatter: function (param) {
            return [
              param.name + ': ',
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
    const { size = 550 } = this.props
    return <div id="echart-boxplot" style={{ margin: '0 auto', width: `${size}px`, height: `${size}px` }} />
  }
}
export default Boxplot
