import React from 'react'
import classnames from 'classnames'
import style from './navigation.less'
import { menu } from '../const'
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'


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
    // return(
    //   <Row className={classnames({ [style.menu]: true ,[style.scroll]: this.state.scroll})}>
    //     <Menu
    //       id="nav"     
    //       onClick={(e)=>history.push(e.key)}
    //       selectedKeys={[location.pathname]}
    //       mode="horizontal">
    //       {menu.map(elem => elem.child ? <SubMenu title={elem.text}>
    //           {elem.child.map(e=><Menu.Item key={e.src}>{e.text}</Menu.Item>)}
    //       </SubMenu> :<Menu.Item key={elem.src}>{elem.text}</Menu.Item>)}
    //     </Menu>
    //   </Row>
    // )
    return (<Navbar className={classnames({ [style.menu]: true ,[style.scroll]: this.state.scroll})} collapseOnSelect onSelect={e=> history.push(e)}>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">HNC Database</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight activeKey={location.pathname}>
        {menu.map(elem => elem.child ? <NavDropdown title={elem.text}>
          {elem.child.map(e=><MenuItem eventKey={e.src}>{e.text}</MenuItem>)}
        </NavDropdown> :<NavItem eventKey={elem.src}>{elem.text}</NavItem>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
  }
}

export default MMM
