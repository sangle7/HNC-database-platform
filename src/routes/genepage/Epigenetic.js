import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { Tabs, DatasourceTable, LineChart } from '../../components'

const Epigenetic = props => {
  const { loading, dataSource } = props

  const MethylationProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Mut.Gene',
      dataIndex: 'Mut.Gene',
    }, {
      title: 'Sample ID',
      dataIndex: 'id',
    }, {
      title: 'Methylation site',
      dataIndex: 'Methylation site',
    }],
  }

  const m6AProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Mut.Gene',
      dataIndex: 'Mut.Gene',
    }, {
      title: 'Sample ID',
      dataIndex: 'id',
    }, {
      title: 'm6A site',
      dataIndex: 'm6A site',
    }],
  }

  const phosphorylationProps = {
    dataSource,
    loading,
    columns: [{
      title: 'Mut.Gene',
      dataIndex: 'Mut.Gene',
    }, {
      title: 'Sample ID',
      dataIndex: 'id',
    }, {
      title: 'Phosphorylation site',
      dataIndex: 'Phosphorylation site',
    }],
  }
  const TabProps = {
    transform: true,
    tabs: [{
      key: 'Methylation',
      title: 'Methylation',
      content: <DatasourceTable {...MethylationProps} />,
    }, {
      key: 'm6A',
      title: 'm6A',
      content: <DatasourceTable {...m6AProps} />,
    }, {
      key: 'Phosphorylation',
      title: 'Phosphorylation',
      content: <DatasourceTable {...phosphorylationProps} />,
    }, {
      key: 'Graph',
      title: 'Graph',
      content: <LineChart />,
    }],
    onChange (key) {
      console.log(key)
    },
  }
  return <Tabs {...TabProps} />
}

Epigenetic.propTypes = {
  loading: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
}

export default Epigenetic
