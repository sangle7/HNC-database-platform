import React from 'react'
import { Card, BoxPlot, DatasourceTable } from '../../components'
import style from './style.less'

const env = process.env.NODE_ENV;
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
    const { caseId, type,geneId } = this.props
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
        dataIndex: 'Gene',
      }, {
        title: 'dataset',
        dataIndex: 'dataset',
      }, {
        title: 'logFC',
        dataIndex: 'logFC',
        render: v => parseFloat(v).toFixed(4)
      }, {
        title: 'AveExpr',
        dataIndex: 'AveExpr',
        render: v => parseFloat(v).toFixed(4)
      }, {
        title: 'P.Value',
        dataIndex: 'P.Value',
        render: v => parseFloat(v).toExponential(2)
      }, {
        title: 'adj.P.Val',
        dataIndex: 'adj.P.Val',
        render: v => parseFloat(v).toFixed(4)
      }]
    }

    return [
      <Card title={<div><i className="fa fa-table fa-fw fa-lg"/><span>Gene Expression</span></div>}>
        <div>
          {caseId ? <BoxPlot {...BoxPlotProps}/> : <DatasourceTable {...TableProps}/>}        
        </div>
      </Card>,
      <Card title={<div><i className="fa fa-area-chart fa-lg"/><span>Survival Chart</span></div>}>
        <div className={style.imgcontainer}>
          <div>        
            <img src={`${prefix}/public/survival/GSE27020_PFS/${geneId}.png`} />
            <p>{geneId} - GSE27020 PFS </p>  
          </div>
          <div>  
            <img src={`${prefix}/public/survival/GSE31056_PFS/${geneId}.png`}/>
            <p>{geneId} - GSE31056 PFS </p>              
          </div>
          <div>
            <img src={`${prefix}/public/survival/GSE41613_OS/${geneId}.png`} />
            <p>{geneId} - GSE41613 OS </p>              
          </div>
        </div>
      </Card>
    ]
  }
}
export default Expression
