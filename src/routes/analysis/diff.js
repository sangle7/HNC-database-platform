import React from 'react'
import { Button, Icon, message } from 'antd'
import DiffModal from './diffModal'
import style from './style.less'
import { Multiselect, DatasourceTable, Header, Card, Tabs, Search } from '../../components'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'
class TabDefault extends React.Component {
  state = {
    dataSource: [],
    modalVisible: false,
    loading: false,
    subtitle: {},
    pagination: {},
  }
  hideModal = () => {
    this.setState({
      modalVisible: false,
    })
  }
  fetchData = (e, query) => {
    const { name } = this.props
    this.setState({
      loading: true,
    })
    fetch(`${prefix}/diff/table`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.replace('.heatmap.png', ''), ...query }),
    })
      .then(blob => blob.json())
      .then(code => {
        if(!code.list[0]){
          message.error('No Data!')//没有合适的基因
          this.setState({
            loading: false,
          })
        }else{
          this.setState({
            dataSource: code.list,
            loading: false,
            pagination: code.pagination,
            // modalVisible: true,
          })
        }
      })
  }
  showModal = obj => {
    this.setState({
      loading: false,
    })
    fetch(`${prefix}/diff/boxplot`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...obj, title: this.props.name.replace('.heatmap.png', '') }),
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          gene: obj.gene,
          boxPlotData: code.list,
          loading: false,
          modalVisible: true,
          subtitle: {
            'P.Value': parseFloat(code.p).toExponential(2),
            'adj.P.Val': parseFloat(code.adjp).toFixed(4),
          },
        })
      })
  }
  render () {
    const { name } = this.props
    const { dataSource, modalVisible, subtitle, pagination, gene, loading, boxPlotData } = this.state

    const ModalProps = {
      title: name.replace('.heatmap.png', ''),
      dataSource,
      boxPlotData,
      subtitle,
      gene,
      visible: modalVisible,
      onCancel: this.hideModal,
    }

    const TableProps = {
      dataSource,
      loading,
      scroll: { x: true, y: false },
      pagination,
      onChange: pag => this.fetchData(null, { pagination: pag }),
      columns: [{
        title: 'Gene',
        dataIndex: 'Gene',
        onCell: record => ({
          onClick: () => this.showModal({ gene: record.Gene, p: record['P.Value'], adjp: record['adj.P.Val'] }),
          style: { cursor: 'pointer', color: '#a9303e', fontWeight: 400 },
        }),
      }, {
        title: 'logFC',
        dataIndex: 'logFC',
        render: v => parseFloat(v).toFixed(3),
      }, {
        title: 'AveExpr',
        dataIndex: 'AveExpr',
        render: v => parseFloat(v).toFixed(3),
      }, {
        title: 'P.Value',
        dataIndex: 'P.Value',
        render: v => parseFloat(v).toExponential(2),
      }, {
        title: 'adj.P.Val',
        dataIndex: 'adj.P.Val',
        render: v => parseFloat(v).toFixed(4),
      }],
    }

    const SearchProps = {
      title: <Icon type="search" />,
      placeholder: 'Search Gene',
      onSearch: value => {
        this.fetchData(null, {genename: value})
      },
    }


    return (
      <div className={style.flexcontainer}>
        <img src={`${prefix}/public/diff/${name}`} alt="diff" height="400" />
        <DiffModal {...ModalProps} />
        {dataSource[0] ? <div style={{textAlign: 'end'}}><Search {...SearchProps}/><DatasourceTable {...TableProps} /></div> : <Button loading={loading} onClick={this.fetchData} type="primary">Show Result Table</Button>}
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
    fetch(`${prefix}/diff/init`, {
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
      tabs: list.map(elem => ({
        key: elem,
        title: elem.split('_')[0],
        content: <TabDefault name={elem} />,
      })),
    }

    return (
      <div>
        <Header title="Diff analysis" />
        <Card title={<div><i className="fa fa-lg fa-fw fa-toggle-on" /><span>select query</span></div>}>
          <Multiselect onSubmit={this.init} />
        </Card>
        { list[0] && <Card title={<div><i className="fa fa-lg fa-fw fa-line-chart" /><span>analysis result</span></div>}>
          <Tabs {...TabProps} />
        </Card> }
      </div>)
  }
}

export default Diff
