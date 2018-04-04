import React from 'react'
import classnames from 'classnames'
import { Table, Spin } from 'antd'
import style from './heatMapTable.less'

const ColorWrapper = () => (
    <div>
        <span>Low Expression</span>
        <span className={style.colorbar}></span>
        <span>High Expression</span>
    </div>
)

const Entries = ({min,max,total,filtedtotal}) => (
    <div>
        <span> Showing {min} to {max} of {filtedtotal} entries {total!== filtedtotal &&`(filtered from ${total} total entries)`}</span>
    </div>
)

const Footer = props => (
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <Entries {...props}/>
    <ColorWrapper/>
    </div>
)
const hsv2rgb = (h, s, v) => { //color range function adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v, v, v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v * (1 - s), v * (1 - s * (h - i)), v * (1 - s * (1 - (h - i)))];
    switch (i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return '#' + rgb.map(function (x) {
    return ("0" + Math.round(x * 255).toString(16)).slice(-2);
  }).join('');
}

const gColor = val => {
  if (val > 0) {
    const p = val > 2.55 ? 1 : (val / 2.55).toFixed(2)
    const v = val > 2.55 ? 0.86 : (1 - (val / 2.55) * 0.14).toFixed(2)
    // const d = val > 2.55 ? 0 :((2.55 - Math.abs(val - 1.275)) / 2.55 * 30).toFixed(0)
    return hsv2rgb(0, p, v)
  } else {
    const p = -val > 2.55 ? 0.56 : ((-val / 2.55) * 0.56).toFixed(2)
    const v = -val > 2.55 ? 0.53 : (1 - (-val / 2.55) * 0.47).toFixed(2)
    // const d = -val > 2.55 ? 0 :( -val / 2.55 * 120).toFixed(0)
    
    return hsv2rgb(221, p, v)
  }
}


class DatasourceTable extends React.Component {
  state = {
    dataSource: [],
    loading: false,
    min: 1,
    max: 10,
  }
  componentDidMount () {
    this.fetchData({})
    this.elem = document.getElementById('hmtable').getElementsByClassName('ant-table-body')[0]
    this.elem.onscroll = e => {
      if (checkIsPartialVisible(this.elem, 'test', 360)) {
        this.fetchData({
          offset: this.state.dataSource.length,
          filter: this.state.filter,
          sorter: this.state.sorter,
        })
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.setState({
        loading: true,
      })
      this.fetchData({
        offset: 0,
        filter: nextProps.filter,
        sorter: this.state.sorter,
      })
    }
  }
  onChange = (pagination, filters, sorter) => {
    this.setState({
      loading: true,
    })
    this.fetchData({
      offset:0,
      filter:this.props.filter,
      sorter:{
        columnKey:sorter.columnKey,
        order:sorter.order,
      }
    })
  }
  fetchData = params => {
    const { dataSource } = this.state
    fetch(this.props.url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          dataSource: code.reset ? code.list : [...dataSource, ...code.list],
          loading: false,
          filter: code.filter,
          sorter: code.sorter,
          total: code.total,
          filtedtotal: code.filtedtotal,
        })
      })
  }
  render () {
    let { onCellClick, t, higher = false }  = this.props
    const { dataSource, filtedtotal, min, max, total, loading }  = this.state

    const firstKey = dataSource[0] ? Object.keys(dataSource[0])[1] : null


    let list = []
    let mincol = false
    if (dataSource.length) {
      const obj = { id: '' }
      console.log(firstKey,dataSource.length,filtedtotal,dataSource.length>= filtedtotal)
      obj[firstKey] = dataSource.length >= filtedtotal ? <span><i className="fa fa-fw fa-smile-o" aria-hidden="true"></i> No More Records</span>: <Spin />
      list = [...dataSource, obj]
      mincol = Object.keys(dataSource[0]).length <= 16
    }

    return (
      <Table
        ref={t => this.hmtable = t}
        onChange = {this.onChange}
        id="hmtable"
        className={classnames({ [style.table]: true,[style.higher]: higher,[style.mincol]: mincol })}
        simple
        loading={loading}
        rowKey={record  => record.id}
        dataSource={list}
        pagination={false}
        scroll={{x:true,y:400}}
        columns={list[0] ? Object.keys(list[0]).map(e=>({
            title:<span>{e}</span>,
            dataIndex:e,
            fixed: e === 'id',
            width:e === 'id' ? 100 : 70,
            sorter:true,
            onCell:record => ({
              onClick: () => { e!=='id' && onCellClick(record.id , e, t); },
              style: {background: gColor(record[e])},
              id: (e === firstKey && record.id === '') ? 'test' : null
            }),
            render:(v,row,index) => gRender(e,v,index,list,firstKey)
            /*最后一行的id column span才为全部 */
        })) : []}
        footer={()=>(<Footer min={min} max={dataSource.length} total={total} filtedtotal={filtedtotal}/>)}
        {...this.props}
      />
    )
  }
}

export default DatasourceTable

function gRender (e, v, index, list, key) {
  if (index === list.length - 1) {
    return {
      children: e === 'id' ? null : <span id="test">{v}</span>,
      props: {
        colSpan: gColSpan(e,list, key)
      },
    }
  } else {
    return v
  }
}

function checkIsPartialVisible (a, domid, query) {
  const element = document.getElementById(domid)
  const recta = a.getBoundingClientRect()
  const rect = element.getBoundingClientRect()
  const isPartialVisible = rect.top - recta.top <= query
  return isPartialVisible
}

function gColSpan (e, list, key) {
  switch (e) {
    case key:
      return 15
      break;
    case 'id':
      return 1
      break;
    default:
      return 0
  }
}