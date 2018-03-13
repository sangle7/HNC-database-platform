import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Select, Form, Button } from 'antd'
import { DatasourceTable, ScatterChart, Breadcrumb } from '../../components'
import style from './style.less'

const FormItem = Form.Item;
const Option = Select.Option
const Diff = props => {
  const {
    form, loading, dataSource, location, history
  } = props

  const onChange = t => {
    history.push(`${location.pathname}?type=${t}`)
  }

  const BreadcrumbProps = {
    path: location.pathname,
    handleClick (index) {
      const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
      if (newpath !== location.pathname) {
        history.push(newpath)
      }
    },
  }

  const type = queryString.parse(location.search).type || 'HPV'

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        history.push(`${location.pathname}?${queryString.stringify(values)}`)
      }
    });
  }

  const TableProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Sample ID',
      dataIndex: 'id',
    }, {
      title: type,
      dataIndex: type,
    }, {
      title: 'Expr.log2',
      dataIndex: 'Expr.log2',
    }],
  }

  const { getFieldDecorator } = form
  return (
    <div>
      <Breadcrumb {...BreadcrumbProps} />
      <main>
        <div className={style.select}>
        <Form layout="inline" onSubmit={handleSubmit}>
          <FormItem
            label="Select an object category"
          >
            {getFieldDecorator('type', {
              initialValue: 'HPV',
              rules: [{ type: 'string', required: true, message: 'Please select your habitual residence!' }],
            })(
              <Select style={{width:120}}>
                <Option value="HPV">HPV</Option>
                <Option value="Age">Age</Option>
                <Option value="Gender">Gender</Option>
                <Option value="Alcohol">Alcohol</Option>
                <Option value="Smoke">Smoke</Option>
                <Option value="Drug">Drug</Option>
                <Option value="Grade">Grade</Option>
                <Option value="Stage">Stage</Option>
                <Option value="Prognosis">Prognosis</Option>
                <Option value="Metastasis">Metastasis</Option>
                <Option value="Recurrence">Recurrence</Option>
                <Option value="Differentiation">Differentiation</Option>
                <Option value="Radiotherapy">Radiotherapy</Option>
                <Option value="Chemotherapy">Chemotherapy</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label="Select Gene object category"
          >
            {getFieldDecorator('genetype', {
              initialValue: 'coding',
              rules: [{ type: 'string', required: true, message: 'Please select your habitual residence!' }],
            })(
              <Select style={{width:120}}>
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
              Get!
            </Button>
          </FormItem>
        </Form>
        </div>
        <div className={style.container}>
          <DatasourceTable {...TableProps} />
          <ScatterChart />
        </div>
      </main>
    </div>
    )
}

Diff.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default Form.create()(Diff)
