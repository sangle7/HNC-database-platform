import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Button } from 'antd'
import { DatasourceTable, ScatterChart, Breadcrumb, WrappedDynamicFieldSet } from '../../components'
import style from './style.less'

class Corr extends React.Component {
  state = {
    loading: false,
    dataSource: [],
  }
  init = params => {
    this.setState({
      loading: true,
    })
    fetch('/cgi/corr/init', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(blob => blob.json())
      .then(code => {
        this.setState({
          dataSource: code.list,
          loading: false,
        })
      })
  }
  render () {
    const { showModal, location, history } = this.props
    const { dataSource, loading } = this.state

    const BreadcrumbProps = {
      path: location.pathname,
      handleClick (index) {
        const newpath = location.pathname.split('/').slice(0, index + 1).join('/')
        if (newpath !== location.pathname) {
          history.push(newpath)
        }
      },
    }
    const TableProps = {
      dataSource,
      loading,
      columns: [{
        title: 'Gene',
        dataIndex: 'Gene',
      }, {
        title: 'Corr.IncRNA',
        dataIndex: 'Corr.IncRNA',
      }, {
        title: 'r(Pearson)',
        dataIndex: 'r',
      }, {
        title: 'P-value',
        dataIndex: 'P-value',
      }, {
        title: 'Plot',
        dataIndex: 'Plot',
        render: (value, record) => <Button type="primary" shape="circle" onClick={() => showModal(record)} icon="search" />,
      }],
    }
    const ChartProps = {
      dataSource,
    }
    return (
      <div>
          <Breadcrumb {...BreadcrumbProps} />
          <main>
            <WrappedDynamicFieldSet onSubmit={v=>this.init(v)}/>
            <div className={style.container}>
              <DatasourceTable {...TableProps} />
              <ScatterChart {...ChartProps}/>
            </div>
          </main>
      </div>)
  }
}

export default Corr
