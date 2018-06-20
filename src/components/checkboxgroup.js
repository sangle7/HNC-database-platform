import React from 'react'
import { Checkbox, Row, Col} from 'antd';
const CheckboxGroup = Checkbox.Group;

class App extends React.Component {
  state = {
    plainOptions: [],
    checkedList: [],
    indeterminate: true,
    checkAll: true,
  }
  componentDidMount () {
    fetch(this.props.url, {
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
  render() {
    const { plainOptions, checkedList, indeterminate, checkAll } = this.state
    return (
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
        <CheckboxGroup value={checkedList} onChange={this.onChange} >
          <Row>
            {plainOptions.map(e=><Col span={4}><Checkbox value={e}>{e}</Checkbox></Col>)}
          </Row>
        </CheckboxGroup>
      </div>
    );
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
}

export default App
