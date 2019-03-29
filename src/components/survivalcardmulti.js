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

    showModal = (nameslist, dataset, md5String) => {
      this.setState({
        visible: true,
        url:`${prefix}/public/multisurvival/${md5String}.${dataset}.png`,
        title: `${nameslist} - ${dataset}`
      })
    }
    
    hideModal = () => {
      this.setState({
        visible: false
      })
    }

    render () {
    const { nameslist , md5String} = this.props
    const { visible, url, title } = this.state
    console.log(url)
    const ModalProps = {
      width: 900,
      title,
      visible,
      onCancel: this.hideModal,
      footer: null,
    }
    
    return (
      <Card title={<div><i className="fa fa-lg fa-fw fa-line-chart" /><span>Survival Charts for multi gene</span></div>}>
        <div className={style.imgcontainer}>
          <div>
            <img onClick={()=>this.showModal(nameslist,'GSE27020_PFS')} src={`${prefix}/public/multisurvival/${md5String}.GSE27020_PFS.png`} />
            <p>{nameslist} - GSE27020_PFS</p>
          </div>
          <div>
            <img onClick={()=>this.showModal(nameslist,'GSE31056_PFS')} src={`${prefix}/public/multisurvival/${md5String}.GSE31056_PFS.png`} />
            <p>{nameslist} - GSE31056_PFS</p>
          </div>
          <div>
            <img onClick={()=>this.showModal(nameslist,'GSE41613_OS')} src={`${prefix}/public/multisurvival/${md5String}.GSE41613_OS.png`} />
            <p>{nameslist} - GSE41613_OS</p>
          </div>
          <div>
            <img onClick={()=>this.showModal(nameslist,'TCGA_OS')} src={`${prefix}/public/multisurvival/${md5String}.TCGA_OS.png`} onError={(e)=>{e.target.src=`${prefix}/public/default.jpg`}} />
            <p>{nameslist} - TCGA_OS</p>
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
