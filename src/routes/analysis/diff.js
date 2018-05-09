import React from 'react'

import queryString from 'query-string'
import { Spin, Icon, Button, Modal } from 'antd'
import DiffModal from './diffModal'
import { DatasourceTable, ScatterChart, Header, Card, Tabs } from '../../components'
import style from './style.less'
import Multiselect from '../../components/multiselect';

class TabDefault extends React.Component {
  state = {
    dataSource : [],
    modalVisible: false,
    loading: false,
  }
  hideModal = () => {
    this.setState({
      modalVisible: false,
    })
  }
  fetchData = () => {
    const { name } = this.props
    const tablename = name.replace('heatmap.png','table.csv')
    this.setState({
      loading: true,
    })
    fetch('/cgi/diff/table', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tablename }),
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          dataSource: code.list,
          loading: false,
          // modalVisible: true,
        })
      })
  }
  showModal = () => {
    this.setState({
      modalVisible: true,
    })
  }
  render () {
    const { name } = this.props
    const { dataSource, modalVisible, loading } = this.state

    const ModalProps = {
      title: name,
      dataSource,
      visible: modalVisible,
      onCancel: this.hideModal
    }

    const TableProps = {
      dataSource,
      scroll: { x:true, y: 300 },
      pagination: false,
      columns: [{
        title: 'Gene',
        dataIndex: 'Gene',
        onCell: record => ({
          onClick: () => this.showModal(),
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


    return (
      <div style={{display:'flex',alignItems:'center'}}>
        <img src={`/cgi/public/diff/${name}`} alt="diff" height="400" style={{margin:'0 auto'}}/>
        <DiffModal {...ModalProps}/>
        {dataSource[0] ? <DatasourceTable {...TableProps} /> : <Button loading={loading} onClick={this.fetchData} type="primary">Get Origin Data</Button>}
      </div>
    )
  }
}

class Diff extends React.Component {
  state = {
    loading: false,
    list: [],
  }
  init = params => {
    this.setState({
      loading: true,
    })
    fetch('/cgi/diff/init', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          list: code.list,
          loading: false,
        })
      })
  }
  render () {
    const { showModal, location, history } = this.props
    const { list, loading } = this.state

    const TabProps = {
      transform: false,
      tabs: list.map(elem=>({
        key: elem,
        title: elem.split('_')[0],
        content: <TabDefault name={elem}/>,
      })),
      onChange:(v)=>{
        console.log(v)
      }
    }

    return (
      <div>
        <Header title="Diff analysis"/>
        <Card title={<div><i className="fa fa-lg fa-fw fa-toggle-on" /><span>select query</span></div>}>
          <Multiselect onSubmit={this.init}/>
        </Card>
        { list[0] && <Card title={<div><i className="fa fa-lg fa-fw fa-line-chart" /><span>analysis result</span></div>}>
           <Tabs {...TabProps} />}
        </Card> }
    </div>)
  }
}

export default Diff
