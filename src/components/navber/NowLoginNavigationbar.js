import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavMenu from './UserNavMenu';
import userStore from '../../flux/user/UserStore';
import '../../css/userIcon.css';
import { _S3URL } from '../../apiURL/s3';
import { LinkContainer } from 'react-router-bootstrap';

export default class NowLoginNavigationbar extends Component {
    render() {
        return (
            <Navbar bg="primary" expand="lg" variant="dark">
                <LinkContainer to='/'><Navbar.Brand>AIトーク！！</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to='/aimodel/create'><Nav.Link>AIモデル新規登録</Nav.Link></LinkContainer>
                        <img id="userIcon" src={_S3URL + userStore.userStatus.icon} />
                        <UserNavMenu />
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
