import React from 'react'
import classnames from 'classnames'
import { Button, Form, Icon } from 'antd'
import SearchInput from './searchInput'
import style from './dynamicFieldSet.less'

const FormItem = Form.Item

let uuid = 1
class DynamicFieldSet extends React.Component {
  state = {
    names: [],
  }

  onChange= (v, i) => {
    const names = this.state.names
    names[i] = v
    this.setState({
      names,
    })
  }

  remove = (k, i) => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const names = this.state.names
    names.splice(i, 1)
    // We need at least one passenger
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
    this.setState({
      names,
    })
  }

  add = () => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(uuid)
    uuid++
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    })
  }


  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render () {
    const { max = 2, cgi } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    getFieldDecorator('keys', { initialValue: [0,1] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => (
      <FormItem
        label={index === 0 ? 'Gene' : ''}
        required={false}
        key={k}
      >
        <SearchInput cgi={cgi} onChange={v => this.onChange(v, index)} placeholder="input gene here" style={{ width: 200 }} />
        {keys.length > 2 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k, index)}
          />
        ) : null}
      </FormItem>
    ))
    return (
      <Form
        className={classnames({ [style.form]: true })}
        onSubmit={this.handleSubmit}
        layout="inline"
      >
        {formItems}
        { keys.length <= (max - 1) && <FormItem>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>}
        <FormItem>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet)

export default WrappedDynamicFieldSet
