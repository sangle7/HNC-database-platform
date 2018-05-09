import React from 'react'
import { Icon, Button } from 'antd'
import { Card, DatasourceTable, BoxPlot } from '../../components'

/* class Expression extends React.Component {
  state = {
    list: [],
    isShow: false,
    loading: false,
  }

  fetchData = () => {
    this.setState({
      loading: true,
    })
    fetch(`${this.props.url}?geneId=${this.props.geneId}&step=3`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          list: code.list,
          isShow: true,
          loading: false,
        })
      })
  }

  render () {
    const { loading, isShow, list } = this.state
    const { onclickcb } = this.props

    const BoxPlotProps = {
      dataSource: list,
      onclickcb,
      width: Math.min(Math.floor(document.body.clientWidth * 0.85),600)
    }

    const TableProps = {
      dataSource: list,
      showHeader: false,
      pagination: false,
      scroll:{y:440,x:false},
      columns: [{
        title: 'Sample ID',
        dataIndex: 't',
      }, {
        title: 'Value',
        dataIndex: 'v',
      }],
    }
    return (
      <Card title={<div><i className="fa fa-table fa-fw fa-lg"/><span>Gene Expression</span></div>}>
        {isShow ? 
        <div className='flexdc'>
          <BoxPlot {...BoxPlotProps}/>
          <DatasourceTable {...TableProps} />
        </div> : 
        <Button icon="clock-circle-o" loading={loading} type="primary" onClick={() => this.fetchData()}>Generate Boxplot</Button> }
      </Card>
    )
  }
} */

const Expression = props => {
  const { geneId } = props
  return (
    <Card title={<div><i className="fa fa-table fa-fw fa-lg"/><span>Gene Expression</span></div>}>
    <div className="testtesttest">
      <div>
        <img src={`/cgi/public/diff/gene_boxplot/TP53.png`} />
        <p>GSE1722 - Tumor vs Normal - Coding - TP53</p>              
      </div>
      <div>
        <img src={`/cgi/public/survival/GSE27020_PFS/TP53.png`} />
        <p>TP53 - GSE27020_PFS - survival</p>
      </div>
      <div>  
        <img src={`/cgi/public/survival/GSE31056_PFS/TP53.png`}/>
        <p>TP53 - GSE31056_PFS - survival</p>              
      </div>
      <div>
        <img src={`/cgi/public/survival/GSE41613_OS/TP53.png`} />
        <p>TP53 - GSE41613_OS - survival</p>              
      </div>
    </div>
    </Card>
  )
}
export default Expression
