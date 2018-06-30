import React from 'react'
import { Card, BoxPlot, DatasourceTable, SurvivalCard } from '../../components'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'

const typeMap = {
  tumorcoding: 'Tumor_vs_Normal_coding',
  tumorlnc: 'Tumor_vs_Normal_lncRNA',
  hpvcoding: 'HPV_positive_vs_HPV_negative_coding',
  hpvlnc: 'HPV_positive_vs_HPV_negative_lncRNA',
}
const gTitle = (caseId, type) => {
  const typeStr = typeMap[type] || ''
  return `${caseId}_${typeStr}`
}
class Expression extends React.Component {
  state = {
    boxPlotData: [],
    loading: false,
    dataSource: [],
  }
  componentDidMount () {
    const { caseId, type, geneId } = this.props
    this.setState({
      loading: true,
    })
    if (caseId) {
      fetch(`${prefix}/diff/boxplot`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gene: geneId, title: gTitle(caseId, type) }),
      })
        .then(blob => blob.json())
        .then(code => {
          this.setState({
            boxPlotData: code.list,
            loading: false,
          })
        })
    } else {
      fetch(`${prefix}/diff/table`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ geneId }),
      })
        .then(blob => blob.json())
        .then(code => {
          this.setState({
            dataSource: code.list,
            loading: false,
          })
        })
    }
  }
  render () {
    const { caseId, type, geneId } = this.props
    const { boxPlotData, dataSource } = this.state

    const BoxPlotProps = {
      gene: geneId,
      title: gTitle(caseId, type),
      boxPlotData,
    }

    const TableProps = {
      dataSource,
      scroll: {
        x: true,
        y: 300,
      },
      pagination: false,
      columns: [{
        title: 'Gene',
        width:100,
        dataIndex: 'Gene',
      }, {
        title: 'dataset',
        width:100,
        dataIndex: 'dataset',
      }, {
        title: 'data type',
        width:200,
        dataIndex: 'data_type',
      },{
        title: 'logFC',
        dataIndex: 'logFC',
        width:100,
        render: v => parseFloat(v).toFixed(4),
      }, {
        title: 'AveExpr',
        dataIndex: 'AveExpr',
        width:100,
        render: v => parseFloat(v).toFixed(4),
      }, {
        title: 'P.Value',
        width:100,
        dataIndex: 'P.Value',
        render: v => parseFloat(v).toExponential(2),
      }, {
        title: 'adj.P.Val',
        dataIndex: 'adj.P.Val',
        width:100,
        render: v => parseFloat(v).toFixed(4),
      }],
    }

    return [
      <Card title={<div><i className="fa fa-table fa-fw fa-lg" /><span>Gene Expression</span></div>}>
        <div>
          {caseId ? <BoxPlot {...BoxPlotProps} /> : <DatasourceTable {...TableProps} />}
        </div>
      </Card>,
      <SurvivalCard gene={geneId}/>,
    ]
  }
}
export default Expression
