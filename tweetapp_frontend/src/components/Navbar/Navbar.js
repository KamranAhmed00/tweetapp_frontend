import { NavLink as Link } from "react-router-dom";
import logo from "../images/logo.png"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import React, { useState } from "react";
import { currentUser, isLoggedIn } from "../Util/Operations";
import BackgroundLetterAvatars from "../Util/AvatarAlgo";
const CustomNavbar = (props) => {
  console.log(isLoggedIn());
  // const [userName, setUserName] = useState('');
  let userName='';
  if (isLoggedIn()) {
    userName=currentUser().userDto;
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="" >
        <NavbarBrand tag={Link} to="/" >
          <img width={20} height={20} src={logo}/>tweetBuddy</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {isLoggedIn() ? <NavItem>
              <NavLink tag={Link} to="/">Home</NavLink>
            </NavItem> : ""}
            <NavItem>
              {!isLoggedIn() ? <NavLink tag={Link} to="/">
                Login
              </NavLink> : <NavLink tag={Link} to="/tweets">
                Tweet
              </NavLink>}
            </NavItem>
            <NavItem>
              {!isLoggedIn() ? <NavLink tag={Link} to="/signup">
                Signup
              </NavLink> : <NavLink tag={Link} to="/users">
                User
              </NavLink>}
            </NavItem>
            {/* <NavItem>
                <NavLink tag={Link} to="/about">About</NavLink>
              </NavItem> */}
          </Nav>
         {isLoggedIn() ? <><Nav navbar>
            <NavItem>
              <NavLink tag={Link} onClick={props.logout} to="/">Logout</NavLink></NavItem></Nav><div>|</div>
          <BackgroundLetterAvatars first={userName.firstName} last={userName.lastName} /></>:""}
        </Collapse>
      </Navbar>
    </div>
  );
};
export default CustomNavbar;
