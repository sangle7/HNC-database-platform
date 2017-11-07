import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Icon } from 'antd'
import { Breadcrumb, DatasourceTable, Search } from '../../components'

class GeneList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      loading: false,
      pagination: { 
        current: 1,
        total: 100,
      }
    }
  }
  componentDidMount () {
    this.getData(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.getData(nextProps)
  }
  getData = props => {
    const params = queryString.parse(props.location.search)
    this.setState({
      loading: true,
    })
    fetch('/gene/info', {
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
          pagination: code.pagination,
        })
      })
  }
  render () {
    const { location, history } = this.props
    const { dataSource, loading, pagination } = this.state
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
      columns: [{
        title: 'id',
        dataIndex: 'id',
      }, {
        title: 'hgncid',
        dataIndex: 'hgncid',
      }, {
        title: 'symbol',
        dataIndex: 'symbol',
      }, {
        title: 'description',
        dataIndex: 'description',
      }],
      dataSource,
      loading,
      pagination,
      onChange: page => {
        const search = {
          ...queryString.parse(location.search),
          page: page.current,
        }
        this.props.history.push(`/Annalysis/Gene?${queryString.stringify(search)}`)
      },
      onRowClick: record => {
        this.props.history.push(`/Annalysis/Gene/${record.symbol}`)
      },
    }

    const SearchProps = {
      title: <Icon type="search" />,
      placeholder:'Search id/hgncid/symbol',
      onSearch: value => {
        history.push(`/Annalysis/Gene?q=${value}`)
      },
    }

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Breadcrumb {...BreadcrumbProps} />
          <Search {...SearchProps} />
        </div>
        <DatasourceTable {...TableProps} />
      </div>
    )
  }
}

GeneList.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default GeneList
