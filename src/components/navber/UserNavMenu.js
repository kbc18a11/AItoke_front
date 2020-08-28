import React, { Component } from 'react'
import { NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap';

export default class UserNavMenu extends Component {
    render() {

        return (
            <NavDropdown title="" id="basic-nav-dropdown" >
                <LinkContainer to='/userupdate'><NavDropdown.Item>ユーザー情報更新</NavDropdown.Item></LinkContainer>
                <LinkContainer to='/favorite/aimode'><NavDropdown.Item>いいねしたAIモデル</NavDropdown.Item></LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to='/logout'><NavDropdown.Item>ログアウト</NavDropdown.Item></LinkContainer>
            </NavDropdown>
        )
    }
}
