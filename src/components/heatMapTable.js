import React from 'react'
import classnames from 'classnames'
import { Table } from 'antd'
import style from './heatMapTable.less'

const ColorWrapper = () => (
    <div>
        <span>Low Expression</span>
        <span className={style.colorbar}></span>
        <span>High Expression</span>
    </div>
)

const Entries = ({min,max,total}) => (
    <div>
        <span> Showing {min} to {max} of {total} entries </span>
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

const keys = ["id", "GSM2260040", "GSM2222", "GSM2223", "GSM2224", "GSM2225", "GSM2226", "GSM22w3", "GSM22e24", "GSM2243525", "GSM22f26", "GSM2bb27", "GSM22dv28", "GSM2229", "GSM2211", "GSM2212", "GSM2213", "GSM2214", "GSM2215", "GSM2216", "GSM2716", "GSM2218", "GSM2220", "GSM2444", "GSM2438", "GSM2443", "GSM21d20", "GSM2qw38", "GSMdd43", "GSM21asd0", "GSM2qee44", "GSM2q2w38"]

const DatasourceTable = props => {
  let { dataSource = [], onCellClick, t}  = props
  for(let i = 50 ;i <100;i++){
    let obj = {}
    for(let item of keys){
      obj[item] = (3-(Math.random()*6)).toFixed(4)
    }
    obj.id = `TP${i}`
    dataSource.push(obj)
  } 
  return (
    <Table
      className={classnames({ [style.table]: true })}
      simple
      rowKey={record  => record.id}
      dataSource={dataSource}
      pagination={false}
      scroll={{x:true,y:400}}
      columns={Object.keys(dataSource[0]).map(e=>({
          title:<span>{e}</span>,
          dataIndex:e,
          width:70,
          sorter:(a, b) => a[e] - b[e],
          onCell:record => ({
            onClick: () => { onCellClick(record.id , e, t); },
            style: {background: gColor(record[e])}
          })
      }))}
      footer={()=>(<Footer min={1} max={10} total={dataSource.length}/>)}
      {...props}
    />
  )
}

export default DatasourceTable
