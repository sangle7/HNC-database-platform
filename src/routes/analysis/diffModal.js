import React from 'react'
import { Modal } from 'antd'
import { DatasourceTable, BoxPlot } from '../../components'

const env = process.env.NODE_ENV;
const prefix = env === 'production' ? '' : '/cgi'

const DiffModal = props =>{ 
  const { gene, title, subtitle, visible, dataSource, onCancel, boxPlotData } = props

  const ModalProps = {
    width: 600,
    title,
    visible,
    onCancel,
    footer:null,
  }

  const BoxPlotProps = {
    gene,
    title,
    boxPlotData,
    subtitle,
  } 

  return (
    <Modal {...ModalProps}>
      <BoxPlot {...BoxPlotProps}/>
    </Modal>
  )
}

export default DiffModal
