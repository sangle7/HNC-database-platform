import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { ScatterChart } from '../../components'

const ModalChart = ({ title, visible, handleCancel }) => (
  <Modal
    title={title}
    visible={visible}
    footer={null}
    onCancel={handleCancel}
  >
    <ScatterChart />
  </Modal>
)

export default ModalChart