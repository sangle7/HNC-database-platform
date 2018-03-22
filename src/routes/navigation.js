import React from 'react'
import classnames from 'classnames'
import { Button, Menu, Icon, Col, Row,  } from 'antd'
import style from './navigation.less'
import { menu } from '../const'

const SubMenu = Menu.SubMenu;

class MMM extends React.Component {
  state = {
    scroll: false
  }
  componentDidMount () {
    /*监听滚动事件*/
    window.addEventListener('scroll',this.listenScroll);
  }
  listenScroll = () => {
    if(window.pageYOffset){
      this.setState({
        scroll:true
      })
    }else{
      this.setState({
        scroll:false
      })
    }
  }
  render () {
    const { history, location } = this.props
    return(
      <Row className={classnames({ [style.menu]: true ,[style.scroll]: this.state.scroll})}>
        <Menu
          id="nav"     
          onClick={(e)=>history.push(e.key)}
          selectedKeys={[location.pathname]}
          mode="horizontal">
          {menu.map(elem => elem.child ? <SubMenu title={elem.text}>
              {elem.child.map(e=><Menu.Item key={e.src}>{e.text}</Menu.Item>)}
          </SubMenu> :<Menu.Item key={elem.src}>{elem.text}</Menu.Item>)}
        </Menu>
      </Row>
    )
  }
}

export default MMM
