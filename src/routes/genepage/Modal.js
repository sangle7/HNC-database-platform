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

ModalChart.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
}


export default ModalChart
