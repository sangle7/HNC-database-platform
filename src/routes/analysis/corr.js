import React from 'react'
import { Spin, message, Checkbox, Row, Col } from 'antd'
import { DatasourceTable, ScatterChart, Header, Card, WrappedDynamicFieldSet } from '../../components'
import style from './style.less'

const CheckboxGroup = Checkbox.Group;

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'

class Corr extends React.Component {
  state = {
    plainOptions: [],
    checkedList: [],
    indeterminate: true,
    checkAll: true,
    loading: false,
    dataSource: [],
    type: 1,
  }
  componentDidMount () {
    fetch(`${prefix}/corr/dataset`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          plainOptions:code.options,
          checkedList:code.options,
        })
      })
  }
  init = params => {
    this.setState({
      loading: true,
    })
    fetch(`${prefix}/corr/init`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checked: this.state.checkedList, ...params }),
    })
      .then(blob => blob.json())
      .then(code => {
        switch (code.ret) {
          case 200:
            this.setState({
              type: code.type,
              dataSource: code.list,
              loading: false,
            })
            break
          case 400:
            this.setState({
              dataSource: [],
              loading: false,
            })
            message.error(code.msg)
            break
          default:
        }
      })
  }
  deleteItem = name => {
    const { dataSource } = this.state
    const list = dataSource.filter(i => i[''] !== name)
    this.setState({
      dataSource: list,
    })
  }
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.state.plainOptions.length),
      checkAll: checkedList.length === this.state.plainOptions.length,
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.state.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
  render () {
    const { dataSource, loading, type } = this.state
    const { plainOptions, checkedList, indeterminate, checkAll } = this.state

    const TableProps = {
      dataSource,
      loading,
      columns: dataSource[0] ? Object.keys(dataSource[0]).map(e => ({
        title: e || 'sample',
        dataIndex: e,
        width: 100,
      })) : [],
    }
    const ChartProps = {
      dataSource,
      onDotClick: i => (this.deleteItem(i)),
      size: 600,
    }
    const optionsObj = plainOptions.sort().reduce((pre,e)=>{
          const key = e.slice(0,4)
          pre[key] = pre[key] ? [...pre[key],e]: [e]
          return pre
        },{})
        console.log(Object.values(optionsObj))
    return (
      [loading && <div className={style.spinmodal}>
      <Spin />
    </div>,
      <div>
        <Header title="Correlation analysis" />
        <Card title={<div><i className="fa fa-lg fa-fw fa-check-square-o" /><span>select gene</span></div>}>
          <WrappedDynamicFieldSet onSubmit={v => this.init(v)} />
        </Card>
        <Card title={<div><i className="fa fa-lg fa-fw fa-check-square-o" /><span>select dataset</span></div>}>
          <div style={{ margin:'.2rem .6rem' }}>
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
              <Checkbox
                indeterminate={indeterminate}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              >
               Check all
              </Checkbox>
            </div>
            <br />
            <CheckboxGroup style={{maxHeight:'190px',overflowY:'scroll'}}value={checkedList} onChange={this.onChange} >
            {Object.values(optionsObj).map(el=>{
              return [<Row style={{ borderBottom: '1px solid #E9E9E9', marginBottom: '.1rem', paddingBottom: '.1rem' }}>
                {el.map(e=><Col span={4}><Checkbox value={e}>{e}</Checkbox></Col>)}
              </Row>]
            })}
              {/* <Col span={4}><Checkbox value={e}>{e}</Checkbox></Col> */}
            </CheckboxGroup>
          </div>
        </Card>
        {(dataSource[0] || loading) && <Card title={<div><i className="fa fa-lg fa-fw fa-line-chart" /><span>analysis result</span></div>}>
          <div className={style.container}>
            {type === 2 ? <ScatterChart {...ChartProps} /> : <DatasourceTable {...TableProps} />}
          </div>
        </Card>}
      </div>]
    )
  }
}

export default Corr
