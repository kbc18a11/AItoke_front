import React, { Component } from 'react'
import UserStore from '../../flux/user/UserStore';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import userStore from '../../flux/user/UserStore';


export default class UserNavMenu extends Component {
    render() {

        return (
            <NavDropdown title="" id="basic-nav-dropdown" >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">ログアウト</NavDropdown.Item>
            </NavDropdown>
        )
    }
}
