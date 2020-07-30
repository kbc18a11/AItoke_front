import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavMenu from './UserNavMenu';
import userStore from '../../flux/user/UserStore';
import '../../css/userIcon.css';
import { _S3URL } from '../../apiURL/s3';

export default class NowLoginNavigationbar extends Component {
    render() {
        return (
            <Navbar bg="primary" expand="lg" variant="dark">
                <Navbar.Brand href="/">AIトーク！！</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/aimodel/create">AIモデル新規登録</Nav.Link>
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
