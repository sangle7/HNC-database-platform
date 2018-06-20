import React from 'react';
import { Modal } from 'antd';
import Card from './card'
import style from './survivalcard.less'

const env = process.env.NODE_ENV
const prefix = env === 'production' ? '' : '/cgi'

class SurvivalCard extends React.Component {

    state = {
      visible: false,
      url: null,
    }

    showModal = (gene, dataset) => {
      this.setState({
        visible: true,
        url:`${prefix}/public/survival/${dataset}/${gene}.png`,
        title: `${gene} - ${dataset}`
      })
    }

    hideModal = () => {
      this.setState({
        visible: false
      })
    }

    render () {
    const { gene } = this.props
    const { visible, url, title } = this.state

    const ModalProps = {
      width: 900,
      title,
      visible,
      onCancel: this.hideModal,
      footer: null,
    }
  
    return (
      <Card title={<div><i className="fa fa-lg fa-fw fa-line-chart" /><span>Survival Charts</span></div>}>
        <div className={style.imgcontainer}>
          <div>
            <img onClick={()=>this.showModal(gene,'GSE27020_PFS')} src={`${prefix}/public/survival/GSE27020_PFS/${gene}.png`} />
            <p>{gene} - GSE27020_PFS</p>
          </div>
          <div>
            <img onClick={()=>this.showModal(gene,'GSE31056_PFS')} src={`${prefix}/public/survival/GSE31056_PFS/${gene}.png`} />
            <p>{gene} - GSE31056_PFS</p>
          </div>
          <div>
            <img onClick={()=>this.showModal(gene,'GSE41613_OS')} src={`${prefix}/public/survival/GSE41613_OS/${gene}.png`} />
            <p>{gene} - GSE41613_OS</p>
          </div>
        </div>
        <Modal {...ModalProps}>
          <img src={url} />
        </Modal>
      </Card>
    )
  }
}

export default SurvivalCard
