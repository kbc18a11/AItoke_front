import React, { Component } from 'react'
import UserStore from '../../flux/user/UserStore';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {actions} from '../../flux/user/userActions';


export default class UserNavMenu extends Component {
    /**
     * ログアウト
     */
    doLogout() {
        console.log('logout');
        actions.logout();
        this.props.history.push('/');
    }

    render() {

        return (
            <NavDropdown title="" id="basic-nav-dropdown" >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.doLogout}>ログアウト</NavDropdown.Item>
            </NavDropdown>
        )
    }
}
