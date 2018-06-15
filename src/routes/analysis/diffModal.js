import React from 'react'
import { Modal } from 'antd'
import { BoxPlot } from '../../components'

const DiffModal = props => {
  const { gene, title, subtitle, visible, onCancel, boxPlotData } = props

  const ModalProps = {
    width: 600,
    title,
    visible,
    onCancel,
    footer: null,
  }

  const BoxPlotProps = {
    gene,
    title,
    boxPlotData,
    subtitle,
  }

  return (
    <Modal {...ModalProps}>
      <BoxPlot {...BoxPlotProps} />
    </Modal>
  )
}

export default DiffModal
