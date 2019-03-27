import React from 'react'
import classnames from 'classnames'
import { Table, Spin } from 'antd'
import style from './heatMapTable.less'
import ReactDOM from 'react-dom'

const ColorWrapper = props => (
  <div>
    <span>Low {props.colorMax === 2.55 ? `Fold change` :`Score` }</span>
    <span className={ props.half ? style.colorbarhalf : style.colorbar } />
    <span>High {props.colorMax === 2.55 ? `Fold change` :`Score` }</span>
  </div>
)

const Entries = ({ min, max, total, filtedtotal }) => (
  <div>
    <span> Showing {min} to {max} of {filtedtotal} entries {total !== filtedtotal && `(filtered from ${total} total entries)`}</span>
  </div>
)

const Footer = props => (
  <div className={style.footer}>
    <Entries {...props} />
    <ColorWrapper {...props}/>
  </div>
)

class DatasourceTable extends React.Component {
  state = {
    dataSource: [{}],
    loading: false,
    min: 1,
    max: 10,
  }
  componentDidMount () {
    this.fetchData({
      t: this.props.t,
    })
    this.elem = ReactDOM.findDOMNode(this.hmtable).getElementsByClassName('ant-table-body')[0]
    this.elem.onscroll = e => {
      this.scrolltag = this.elem.getElementsByClassName('scrolltag')[0]
      console.log('visible', checkIsPartialVisible(this.elem, this.scrolltag, 360))
      if (checkIsPartialVisible(this.elem, this.scrolltag, 360)) {
        this.fetchData({
          t: this.props.t,
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
        t: nextProps.t,
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
      offset: 0,
      filter: this.props.filter,
      t: this.props.t,
      sorter: {
        columnKey: sorter.columnKey,
        order: sorter.order,
      },
    })
  }
  fetchData = params => {
    const { dataSource } = this.state
    fetch(this.props.url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
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

  gRender (e, v, index, list, key) {
    if (v === 0) {
      return '-'
    } else if (index === list.length - 1) {
      return {
        children: e === 'id' ? null : <span className="scrolltag">{v}</span>,
        props: {
          colSpan: gColSpan(e, list, key),
        },
      }
    }
    return v
  }

  render () {
    const { onCellClick, onTitleClick, onGeneClick, t, higher = false, colorMax = 2.55 } = this.props
    const { dataSource, filtedtotal, min, max, total, loading } = this.state
    const half = this.props.half


    const gFirstKey = (obj) => {
      const arr = Object.keys(obj)
      console.log(arr)
      let result
      if(arr[1]!=='score' && arr[1]!=='pubmed evidence'){
        result =  arr[1]
      }else{
        result = arr[2]
      }
      console.log(result)
      return result
    }

    const firstKey = dataSource[0] ? gFirstKey(dataSource[0]) : null



    let list = []
    let mincol = false
    if (dataSource.length) {
      const obj = { id: '' }
      // console.log(firstKey, dataSource.length, filtedtotal, dataSource.length >= filtedtotal)
      obj[firstKey] = dataSource.length >= filtedtotal ? <span><i className="fa fa-fw fa-smile-o" aria-hidden="true" /> No More Records</span> : <Spin />
      list = [...dataSource, obj]
      mincol = Object.keys(dataSource[0]).length <= 16
    }

    const tempnum = list[0] ? Object.keys(list[0]).length : 1

    return (
      <Table
        ref={t => this.hmtable = t}
        onChange={this.onChange}
        className={classnames({ [style.table]: true, [style.higher]: higher, [style.mincol]: mincol })}
        simple
        loading={loading}
        rowKey={record => record.id}
        dataSource={list}
        pagination={false}
        scroll={{ x:  80 * tempnum + 40, y: 300 }}
        columns={list[0] ? [...Object.keys(list[0]), 'last'].map(e => ({
          title: <span onClick={()=>{e !== 'id' && e !== 'score' && e !== 'pubmed evidence' && onTitleClick(e)}}>{e}</span>,
          dataIndex: e,
          fixed: e === 'id' || e === 'score'  || e === 'pubmed evidence' ,
          width: e === 'id' ? 120 : 80,
          sorter: e !== 'id',
          onHeaderCell: column => ({
            onScroll:()=>{console.log(scrollheader)},
            className: column.dataIndex !=='id' && column.dataIndex !=='score' && column.dataIndex !== 'pubmed evidence' && 'scrollheader',
          }),
          onCell: record => ({
            onClick: () => { (record.id !== 'pubmed evidence' && e !== 'id' &&  e !== 'pubmed evidence' && e !== 'score' && onCellClick(record.id, e, t)) || (record.id === 'pubmed evidence'  && e !== 'pubmed evidence' && e !== 'id'&& e !== 'score' && onTitleClick(e)) ||  (record.id !== 'pubmed evidence'  && e === 'pubmed evidence'  && onGeneClick(record.id))},
            style: gStyle(e, record[e], record, colorMax,half), //xingyang
            className: (e === firstKey && record.id === '') && 'scrolltag',
          }),
          render: (v, row, index) => this.gRender(e, v, index, list, firstKey),
          /* 最后一行的id column span才为全部 */
        })) : []}
        footer={() => (<Footer half={half} colorMax={colorMax} min={min} max={dataSource.length} total={total} filtedtotal={filtedtotal} />)}
        {...this.props}
      />
    )
  }
}

export default DatasourceTable


function checkIsPartialVisible (a, element, query) {
  const recta = a.getBoundingClientRect()
  const rect = element.getBoundingClientRect()
  const isPartialVisible = rect.top - recta.top <= query
  return isPartialVisible
}

function gColSpan (e, list, key) {
  switch (e) {
    case key:
      return 15
      break
    case 'id':
      return 1
      break
    default:
      return 0
  }
}

function hsv2rgb (h, s, v) { // color range function adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
  let rgb,
    i,
    data = []
  if (s === 0) {
    rgb = [v, v, v]
  } else {
    h /= 60
    i = Math.floor(h)
    data = [v * (1 - s), v * (1 - s * (h - i)), v * (1 - s * (1 - (h - i)))]
    switch (i) {
      case 0:
        rgb = [v, data[2], data[0]]
        break
      case 1:
        rgb = [data[1], v, data[0]]
        break
      case 2:
        rgb = [data[0], v, data[2]]
        break
      case 3:
        rgb = [data[0], data[1], v]
        break
      case 4:
        rgb = [data[2], data[0], v]
        break
      default:
        rgb = [v, data[0], data[1]]
        break
    }
  }
  return `#${rgb.map(x => {
    return (`0${ Math.round(x * 255).toString(16)}`).slice(-2)
  }).join('')}`
}

function gStyle (key, val, record, max, half) { //xingyang
  let p=0, v=0;
  if(key === 'score' ||  key === 'pubmed evidence'){
    return {
      background: 'rgb(255,255,255)',
      color: 'black'
    }
  }
  if (key === 'last') {
    return {
      display: 'none',
    }
  }
  try {
    if(record.id === 'pubmed evidence'){
      return {
        background: 'rgb(255,255,255)',
      }
    }else if (val === 0) {
      return {
        background: 'rgb(241,241,241)',
      }
    } else if (val > 0) {
      p = val > max ? 1 : (val / max).toFixed(2)
      v = val > max ? 0.86 : (1 - (val / max) * 0.14).toFixed(2)
      // const d = val > max ? 0 :((max - Math.abs(val - 1.275)) / max * 30).toFixed(0)
      return {
        background: hsv2rgb(0, p, v),
        color: val > max * 0.7 ? 'rgb(230,230,230)' : 'black'
      }
    } else if (half === true){ //xingyang
      return{	 
         background: 'rgb(255, 255, 255)',
         color:  'black'
      }
    } else {//xingyang
        p = -val > max ? 0.56 : ((-val / max) * 0.56).toFixed(2)
        v = -val > max ? 0.53 : (1 - (-val / max) * 0.47).toFixed(2)
    // const d = -val > 2.55 ? 0 :( -val / 2.55 * 120).toFixed(0)
    }
    return {
      background: hsv2rgb(221, p, v),
      color: -val > max * 0.7 ? 'rgb(230,230,230)' : 'black'
    }
  } catch (error) {
    return {
      background: '#FFFFFF',
    }
  }
}
