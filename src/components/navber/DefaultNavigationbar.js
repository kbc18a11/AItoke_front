import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import AimodelSerchber from './AimodelSerchber';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export default class DefaultNavigationbar extends Component {
    render() {
        return (
            <Navbar bg="primary" expand="lg" variant="dark">
                <LinkContainer to='/'><Navbar.Brand>AIトーク！！</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to='/register'><Nav.Link>ユーザー登録</Nav.Link></LinkContainer>
                        <LinkContainer to='/login'><Nav.Link>ログイン</Nav.Link></LinkContainer>
                    </Nav>
                    <AimodelSerchber />
                </Navbar.Collapse>
            </Navbar>

        )
    }
}
