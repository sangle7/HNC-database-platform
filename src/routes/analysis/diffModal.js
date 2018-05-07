import React from 'react'
import { Modal } from 'antd'
import { DatasourceTable, BoxPlot } from '../../components'


class DiffModal extends React.Component {
  state = {
    gene: null,
    loading : false,
    imgData: [],
  }

  getImgData = gene => {
    const type = this.props.title.split('_')[1]
    this.setState({
      loading: false,
    })
    fetch('/cgi/diff/boxplot', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gene, type }),
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          gene,
          imgData: code.list,
          loading: false,
        })
    })
  }

  render () {
    const { title, visible, dataSource, onCancel } = this.props

    const { imgData, loading, gene } = this.state

    const TableProps = {
      dataSource,
      scroll: { x:true, y: 500 },
      pagination: false,
      columns: [{
        title: 'Gene',
        dataIndex: 'Gene',
        onCell: record => ({
          onClick: () => this.getImgData(record.Gene),
        }),
      },{
        title: 'logFC',
        dataIndex: 'logFC',
        render:v => parseFloat(v).toFixed(4)
      },{
        title: 'AveExpr',
        dataIndex: 'AveExpr',
        render:v => parseFloat(v).toFixed(4)        
      },{
        title: 'P.Value',
        dataIndex: 'P.Value',
        render:v => parseFloat(v).toExponential(2)        
      },{
        title: 'adj.P.Val',
        dataIndex: 'adj.P.Val',
        render:v => parseFloat(v).toFixed(4)        
      }]
    }

    const ModalProps = {
      width: 1200,
      title,
      visible,
      onCancel,
      footer:null,
    }

    const BoxPlotProps = {
      title: gene,
      imgData,
    }

    return (
      <Modal {...ModalProps}>
        <div style={{display: 'flex',justifyContent:'space-between'}}>
          <DatasourceTable {...TableProps}/> 
          {imgData[0]? <BoxPlot {...BoxPlotProps}/>: <div>
            Click on Gene to generate picture here.
          </div>}
        </div>
      </Modal>
    )
  }
}

export default DiffModal