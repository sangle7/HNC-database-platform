import React from 'react'
import { Select, Form, Button } from 'antd'
import style from './dynamicFieldSet.less'
import classnames from 'classnames'

const FormItem = Form.Item
const Option = Select.Option
const Multiselect = props => {
  const { onSubmit, form } = props
  const { getFieldDecorator } = form
  const submit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    })
  }
  return (
    <Form
      className={classnames({ [style.form]: true })}
      layout="inline"
      onSubmit={submit}
    >
      <FormItem
        label="Select an object category"
      >
        {getFieldDecorator('type', {
          initialValue: 'HPV',
        })(
          <Select style={{ width: 200}}>
            <Option value="HPV">HPV pos vs neg</Option>
            <Option value="Tumor">Tumor vs normal</Option>
            <Option value="Tobacco">Tobacco pos vs neg</Option>
            <Option value="Recurrence">Recurrence pos vs neg</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label="Select Gene object category"
      >
        {getFieldDecorator('genetype', {
          initialValue: 'coding',
        })(
          <Select style={{ width: 100 }}>
            <Option value="coding">coding</Option>
            <Option value="lncRNA">lncRNA</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(Multiselect)
