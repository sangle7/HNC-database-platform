import React from 'react'
import { Icon, Button } from 'antd'
import { Card, DatasourceTable, BoxPlot } from '../../components'

class Expression extends React.Component {
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
        <div style={{display: 'flex'}}>
          <BoxPlot dataSource={list} onclickcb={onclickcb} />
          <DatasourceTable {...TableProps} />
        </div> : 
        <Button icon="clock-circle-o" loading={loading} type="primary" onClick={() => this.fetchData()}>Generate Boxplot</Button> }
      </Card>
    )
  }
}
export default Expression
