import React from 'react'
import classnames from 'classnames'
import { Button, Menu, Icon, Col, Row,  } from 'antd'
import style from './navigation.less'
import { menu } from '../const'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

const SubMenu = Menu.SubMenu;


// class MMM extends React.Component {
//   state = {
//     scroll: false
//   }
//   componentDidMount () {
//     /*监听滚动事件*/
//     window.addEventListener('scroll',this.listenScroll);
//   }
//   listenScroll = () => {
//     if(window.pageYOffset){
//       this.setState({
//         scroll:true
//       })
//     }else{
//       this.setState({
//         scroll:false
//       })
//     }
//   }
//   render () {
//     const { history, location } = this.props
//     return(
//       <Row className={classnames({ [style.menu]: true ,[style.scroll]: this.state.scroll})}>
//         <Menu
//           id="nav"     
//           onClick={(e)=>history.push(e.key)}
//           selectedKeys={[location.pathname]}
//           mode="horizontal">
//           {menu.map(elem => elem.child ? <SubMenu title={elem.text}>
//               {elem.child.map(e=><Menu.Item key={e.src}>{e.text}</Menu.Item>)}
//           </SubMenu> :<Menu.Item key={elem.src}>{elem.text}</Menu.Item>)}
//         </Menu>
//       </Row>
//     )
//   }
// }



const MMM = props => (<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">React-Bootstrap</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="#">
      Link
    </NavItem>
    <NavItem eventKey={2} href="#">
      Link
    </NavItem>
    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>Action</MenuItem>
      <MenuItem eventKey={3.2}>Another action</MenuItem>
      <MenuItem eventKey={3.3}>Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.4}>Separated link</MenuItem>
    </NavDropdown>
  </Nav>
</Navbar>)
export default MMM
