import React, { Component } from 'react'
import { NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class UserNavMenu extends Component {
    render() {

        return (
            <NavDropdown title="" id="basic-nav-dropdown" >
                <NavDropdown.Item href="/userupdate">ユーザー情報更新</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">ログアウト</NavDropdown.Item>
            </NavDropdown>
        )
    }
}
